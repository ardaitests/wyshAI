const Airtable = require('airtable');
const rateLimit = require('express-rate-limit');
const validator = require('validator');

// Configure rate limiting - 4 requests per minute per IP
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 4, // Limit each IP to 4 requests per windowMs
  keyGenerator: (req) => {
    return req.headers['x-nf-client-connection-ip'] || 'unknown-ip';
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Allowed domains - replace with your production domain
const ALLOWED_ORIGINS = [
  'https://wyshai.com',
  'https://www.wyshai.com',
  'http://localhost:3000',
  'http://localhost:8888'
];

// Log environment variables (except sensitive ones) for debugging
console.log('Environment variables:', {
  AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID_SMS ? '***SET***' : '***MISSING***',
  AIRTABLE_TABLE_NAME: process.env.AIRTABLE_TABLE_NAME_SMS || '***MISSING***',
  NODE_ENV: process.env.NODE_ENV || 'development'
});

// Helper function to create response with CORS headers
const createResponse = (statusCode, body, origin = null) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Origin': origin || ALLOWED_ORIGINS[0],
    'Vary': 'Origin' // Important for caching
  };

  return {
    statusCode,
    headers,
    body: JSON.stringify(body)
  };
};

// Input validation and sanitization
const validateAndSanitizeInput = (data) => {
  const errors = [];
  const sanitized = {
    firstName: (data.firstName || '').trim().substring(0, 100),
    lastName: (data.lastName || '').trim().substring(0, 100),
    phone: (data.phone || '').trim()
  };

  // Validate name fields
  if (!sanitized.firstName) errors.push('First name is required');
  if (!sanitized.lastName) errors.push('Last name is required');
  
  // Validate and format phone number
  const phoneDigits = sanitized.phone.replace(/\D/g, '');
  if (phoneDigits.length < 10) {
    errors.push('Please enter a valid 10-digit phone number');
  } else {
    sanitized.phone = `+1${phoneDigits.slice(-10)}`; // Format as E.164
  }

  return {
    isValid: errors.length === 0,
    errors,
    data: sanitized
  };
};

exports.handler = async (event, context) => {
  // Get origin from headers and validate against allowed origins
  const origin = event.headers.origin || event.headers.Origin || '';
  const isAllowedOrigin = ALLOWED_ORIGINS.includes(origin) || 
                         process.env.NODE_ENV === 'development';
  
  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return createResponse(200, {}, isAllowedOrigin ? origin : ALLOWED_ORIGINS[0]);
  }

  // Enforce CORS
  if (!isAllowedOrigin) {
    console.warn('Blocked request from unauthorized origin:', origin);
    return createResponse(403, { error: 'Forbidden' });
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return createResponse(405, { error: 'Method not allowed' });
  }

  try {
    // Apply rate limiting
    const ip = event.headers['x-nf-client-connection-ip'] || 
              event.headers['client-ip'] || 
              'unknown-ip';
              
    const rateLimitCheck = await new Promise((resolve) => {
      limiter({
        ip,
        headers: event.headers,
        method: event.httpMethod,
        path: event.path,
        query: {},
        connection: { remoteAddress: ip }
      }, {}, (rateLimitError) => {
        if (rateLimitError) {
          console.warn('Rate limit exceeded:', rateLimitError);
          resolve({ statusCode: 429, message: 'Too many requests, please try again in a minute.' });
        } else {
          resolve(null);
        }
      });
    });
    
    if (rateLimitCheck) {
      return createResponse(rateLimitCheck.statusCode, { 
        error: 'Too many requests',
        message: rateLimitCheck.message
      }, origin);
    }

    console.log('Received request from:', origin);
    
    // Parse and validate the form data
    let data;
    try {
      data = JSON.parse(event.body);
      console.log('Received data:', { 
        hasFirstName: !!data.firstName,
        hasLastName: !!data.lastName,
        hasPhone: !!data.phone,
        hasMessagingConsent: !!data.messagingConsent
      });
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return createResponse(400, { 
        error: 'Invalid request',
        message: 'Could not parse request body'
      }, origin);
    }

    // Validate and sanitize input
    const { isValid, errors, data: sanitizedData } = validateAndSanitizeInput(data);
    if (!isValid) {
      console.warn('Validation failed:', errors);
      return createResponse(400, { 
        error: 'Validation failed',
        message: 'Please check your input',
        details: errors
      }, origin);
    }
    
    // Initialize Airtable with environment variables from Netlify
    const apiKey = process.env.AIRTABLE_PersonalAccessToken_SMS;
    const baseId = process.env.AIRTABLE_BASE_ID_SMS;
    const tableName = process.env.AIRTABLE_TABLE_NAME_SMS;

    console.log('Airtable Config:', {
      baseId: baseId ? '***SET***' : '***MISSING***',
      tableName: tableName || '***MISSING***',
      hasApiKey: !!apiKey
    });
    
    if (!apiKey) {
      console.error('Missing AIRTABLE_PersonalAccessToken_SMS environment variable');
      return createResponse(500, { error: 'Server configuration error: Missing API key' });
    }
    if (!baseId) {
      console.error('Missing AIRTABLE_BASE_ID_SMS environment variable');
      return createResponse(500, { error: 'Server configuration error: Missing Base ID' });
    }
    if (!tableName) {
      console.error('Missing AIRTABLE_TABLE_NAME_SMS environment variable');
      return createResponse(500, { error: 'Server configuration error: Missing Table Name' });
    }
    
    console.log('Initializing Airtable with base:', baseId);
    const base = new Airtable({
      apiKey: apiKey
    }).base(baseId);

    // Create record in Airtable with exact field names from the API
    console.log('Creating record in table:', tableName);
    const recordData = {
      fields: {
        'First name': sanitizedData.firstName,
        'Last name': sanitizedData.lastName,
        'Phone number': sanitizedData.phone,
        'Messaging consent': true,  // Always set to true for the opt-in form
        'Terms accepted': true,  // Also set this to true as it's a required field
        'Source': 'Web Form',
        'IP Address': event.headers['x-nf-client-connection-ip'] || 'unknown',
        'User Agent': event.headers['user-agent'] || 'unknown'
      }
    };
    
    console.log('Record data:', JSON.stringify(recordData, null, 2));
    
    try {
      const result = await base(tableName).create([recordData]);
      console.log('Airtable response:', JSON.stringify(result, null, 2));
      return createResponse(200, { 
        success: true, 
        message: 'Thank you! Your submission was successful. You will now receive SMS messages from Wysh AI. Reply STOP to opt out.' 
      });
    } catch (airtableError) {
      console.error('Airtable API Error:', airtableError);
      return createResponse(500, { 
        error: 'Failed to save to database',
        details: airtableError.message 
      });
    }
  } catch (error) {
    console.error('Unhandled Error:', error);
    return createResponse(500, { 
      error: 'An unexpected error occurred',
      message: error.message 
    });
  }
};

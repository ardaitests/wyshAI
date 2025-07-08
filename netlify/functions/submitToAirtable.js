const Airtable = require('airtable');

// Log environment variables (except sensitive ones) for debugging
console.log('Environment variables:', {
  AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID_SMS ? '***SET***' : '***MISSING***',
  AIRTABLE_TABLE_NAME: process.env.AIRTABLE_TABLE_NAME_SMS || '***MISSING***',
  NODE_ENV: process.env.NODE_ENV || 'development'
});

// Helper function to create response with CORS headers
const createResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
});

exports.handler = async function(event, context) {
  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return createResponse(200, {});
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return createResponse(405, { error: 'Method not allowed' });
  }

  try {
    console.log('Received request with body:', event.body);
    
    // Parse the form data
    let data;
    try {
      data = JSON.parse(event.body);
      console.log('Parsed data:', JSON.stringify(data, null, 2));
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      throw new Error('Invalid request body');
    }
    
    // Validate required fields
    if (!data.firstName?.trim() || !data.lastName?.trim() || !data.phone?.trim()) {
      throw new Error('Missing required fields');
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
        'First name': data.firstName.trim(),
        'Last name': data.lastName.trim(),
        'Phone number': data.phone.trim(),
        'Submission date': new Date().toISOString(),
        'Marketing consent': Boolean(data.marketingConsent),
        'Terms accepted': Boolean(data.termsConsent)
      }
    };
    
    console.log('Record data:', JSON.stringify(recordData, null, 2));
    
    try {
      const result = await base(tableName).create([recordData]);
      console.log('Airtable response:', JSON.stringify(result, null, 2));
      return createResponse(200, { 
        success: true, 
        message: 'Thank you! Your submission was successful.' 
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

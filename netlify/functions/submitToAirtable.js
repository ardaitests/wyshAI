const Airtable = require('airtable');

// Log environment variables (except sensitive ones) for debugging
console.log('Environment variables:', {
  AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID ? '***SET***' : '***MISSING***',
  AIRTABLE_TABLE_NAME: process.env.AIRTABLE_TABLE_NAME || '***MISSING***',
  NODE_ENV: process.env.NODE_ENV || 'development'
});

exports.handler = async function(event, context) {
  // Set CORS headers for preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
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
    
    // Initialize Airtable
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = process.env.AIRTABLE_TABLE_NAME;
    
    if (!apiKey || !baseId || !tableName) {
      console.error('Missing required environment variables');
      throw new Error('Server configuration error');
    }
    
    console.log('Initializing Airtable with base:', baseId);
    const base = new Airtable({
      apiKey: apiKey
    }).base(baseId);

    // Create record in Airtable
    console.log('Creating record in table:', tableName);
    const recordData = {
      fields: {
        'First Name': data.firstName.trim(),
        'Last Name': data.lastName.trim(),
        'Phone Number': data.phone.trim(),
        'Marketing Consent': Boolean(data.marketingConsent),
        'Terms Accepted': Boolean(data.termsConsent),
        'Submission Date': new Date().toISOString()
      }
    };
    
    console.log('Record data:', JSON.stringify(recordData, null, 2));
    
    const result = await base(tableName).create([recordData]);
    console.log('Airtable response:', JSON.stringify(result, null, 2));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ message: 'Successfully submitted to Airtable' }),
    };
  } catch (error) {
    console.error('Error submitting to Airtable:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ 
        error: 'Failed to submit form',
        details: error.message 
      }),
    };
  }
};

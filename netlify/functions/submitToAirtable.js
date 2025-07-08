const Airtable = require('airtable');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse the form data
    const data = JSON.parse(event.body);
    
    // Initialize Airtable
    const base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY
    }).base(process.env.AIRTABLE_BASE_ID);

    // Create record in Airtable
    await base(process.env.AIRTABLE_TABLE_NAME).create([
      {
        fields: {
          'First Name': data.firstName,
          'Last Name': data.lastName,
          'Phone Number': data.phone,
          'Marketing Consent': data.marketingConsent || false,
          'Terms Accepted': data.termsConsent || false,
          'Submission Date': new Date().toISOString()
        }
      }
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Successfully submitted to Airtable' }),
    };
  } catch (error) {
    console.error('Error submitting to Airtable:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to submit form',
        details: error.message 
      }),
    };
  }
};

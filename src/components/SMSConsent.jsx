import React, { useState } from 'react';

const SMSConsent = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    messagingConsent: false,
    termsConsent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: null, message: '' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validatePhoneNumber = (phone) => {
    // Remove all non-digit characters except leading +
    const digitsOnly = phone.replace(/\D/g, '');
    
    // Check if the cleaned number has at least 10 digits
    if (digitsOnly.length < 10) {
      throw new Error('Please enter a valid phone number with area code');
    }
    
    // Format as E.164 standard (e.g., +11234567890)
    const formatted = `+1${digitsOnly.slice(-10)}`;
    return formatted;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: null, message: 'Submitting...' });

    try {
      // Validate and format phone number
      const formattedPhone = validatePhoneNumber(formData.phone);
      
      // Create a copy of form data with the formatted phone number
      const submissionData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formattedPhone,
        messagingConsent: formData.messagingConsent,
        termsConsent: formData.termsConsent
      };
      
      console.log('Submitting form data:', submissionData);
      
      // Use the full URL for local development
      const functionUrl = import.meta.env.DEV
        ? 'http://localhost:8888/.netlify/functions/submitToAirtable'
        : '/.netlify/functions/submitToAirtable';
      
      console.log('Calling function URL:', functionUrl);
      
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      let data;
      try {
        data = await response.json();
        console.log('Response data:', data);
      } catch (jsonError) {
        console.error('Error parsing JSON response:', jsonError);
        const text = await response.text();
        console.error('Raw response text:', text);
        throw new Error('Invalid response from server');
      }
      
      if (!response.ok) {
        console.error('Server error:', {
          status: response.status,
          statusText: response.statusText,
          data: data,
          headers: Object.fromEntries(response.headers.entries())
        });
        
        // Handle specific error cases
        if (response.status === 500 && data?.error) {
          if (data.error.includes('Missing API key')) {
            throw new Error('Server configuration error. Please contact support.');
          } else if (data.error.includes('Missing Base ID') || data.error.includes('Missing Table Name')) {
            throw new Error('Server configuration error. Please contact support.');
          } else if (data.error.includes('Failed to save to database')) {
            throw new Error('Failed to save your information. Please try again.');
          }
        }
        
        throw new Error(data?.error || data?.message || `Server error: ${response.status} ${response.statusText}`);
      }
      
      // Use the success message from the server response
      setSubmitStatus({ 
        success: true, 
        message: data.message
      });
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        messagingConsent: false,
        termsConsent: false
      });
      
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus({ 
        success: false, 
        message: error.message || 'Failed to submit form. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-swiss-coffee-lightest w-full flex items-center justify-center py-12">
      <div className="w-full max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">
            Stay Connected with us via SMS
          </h1>
          <p className="mt-3 text-xl text-muted-foreground-darker">
            Consent to receiving SMS messages using the form below.
          </p>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-foreground/90 mb-1">
                  First Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  autoComplete="given-name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  placeholder="First name"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-foreground/90 mb-1">
                  Last Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  autoComplete="family-name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Last name"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground/90 mb-1">
                  Phone Number (for SMS) <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  autoComplete="tel"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  placeholder="(123) 456-7890"
                  pattern="^[0-9\s\-\(\)\.\+]{10,20}$"
                  title="Please enter a valid phone number (e.g., (123) 456-7890 or 123-456-7890)"
                  disabled={isSubmitting}
                />
              </div>

              {/* <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground/90 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  placeholder="your.email@example.com"
                />
              </div> */}

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="messaging-consent"
                      name="messagingConsent"
                      type="checkbox"
                      checked={formData.messagingConsent}
                      onChange={handleChange}
                      required
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      disabled={isSubmitting} />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="messaging-consent" className="text-foreground/90">
                      I agree to receive marketing, customer support, and alert SMS messages from Wysh AI at the phone number provided. Message frequency may vary. Message and data rates may apply. Reply HELP for help or STOP to unsubscribe. Consent is not a condition of purchase. See our <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-500 underline">
                        Terms of Service
                      </a>
                      {' '} & {' '}
                      <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-500 underline">
                        Privacy Policy 
                      </a>.
                      <span className="text-red-600"> *</span>
                    </label>
                  </div>
                </div>

                {/* <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms-consent"
                      name="termsConsent"
                      type="checkbox"
                      checked={formData.termsConsent}
                      onChange={handleChange}
                      required
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      disabled={isSubmitting} />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms-consent" className="text-foreground/90">
                      I accept the {' '}
                      <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-500 underline">
                        Terms of Service
                      </a>
                      {' '} & {' '}
                      <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-500 underline">
                        Privacy Policy 
                      </a>
                      <span className="text-red-600"> *</span>
                    </label>
                  </div>
                </div> */}
              </div>

              {/* <p className="text-xs text-muted-foreground-darker mb-4 leading-relaxed">
                Message frequency may vary. Message and data rates may apply. Reply HELP for help or STOP to unsubscribe. Consent is not a condition of purchase. See our <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-500 underline">
                        Terms of Service
                      </a>
                      {' '} & {' '}
                      <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-500 underline">
                        Privacy Policy 
                      </a>.
              </p> */}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-6 rounded-md text-base font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-sm transition-colors"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
                {submitStatus.message && (
                  <div className={`mt-4 p-3 rounded-md bg-opacity-10 text-sm ${submitStatus.success ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'} border border-opacity-20 ${submitStatus.success ? 'border-green-200' : 'border-red-200'}`}>
                    <p className="whitespace-pre-wrap">{submitStatus.message}</p>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SMSConsent;

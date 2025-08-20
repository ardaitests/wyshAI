import React, { useState, useRef } from 'react';

const SMSOptIn = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    messagingConsent: false
  });
  const [submitStatus, setSubmitStatus] = useState({ success: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitLock = useRef(false);

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
    
    // Prevent multiple submissions
    if (submitLock.current) return;
    
    submitLock.current = true;
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
        messagingConsent: formData.messagingConsent
      };
      
      console.log('Submitting form data:', submissionData);
      
      // Use the full URL for local development
      const baseUrl = import.meta.env.DEV
        ? 'http://localhost:8888'  // Make sure this matches your Netlify Dev server port
        : '';
      
      const functionUrl = `${baseUrl}/.netlify/functions/submitToAirtable`;
      
      console.log('Calling function URL:', functionUrl);
      
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(submissionData),
        credentials: 'same-origin',
      });
      
      console.log('Response status:', response.status, response.statusText);

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
        message: data.message || 'Successfully subscribed to SMS updates!'
      });
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        messagingConsent: false
      });
      
    } catch (error) {
      console.error('Submission error:', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
      
      let errorMessage = error.message || 'Failed to submit form. Please try again.';
      
      // Handle network errors
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        errorMessage = 'Unable to connect to the server. Please check your internet connection and try again.';
      }
      
      setSubmitStatus({ 
        success: false, 
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
      submitLock.current = false;
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-swiss-coffee-lightest w-full flex items-center justify-center py-12">
      <div className="w-full max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">
            Stay Connected with us via SMS
          </h1>
          <p className="mt-3 text-base text-muted-foreground-darker">
            Opt-in to receive text messages using the form below.
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

              {/* <div className="mt-4 text-sm text-foreground/70">
              By providing your phone number and clicking 'Submit,' you agree to receive SMS service updates from Wysh AI. Message frequency may vary. Standard Message and Data Rates may apply. Reply STOP to opt out. Reply HELP for help. Consent is not a condition of purchase. Your mobile information will not be sold or shared with third parties for promotional or marketing purposes. View our <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-500 underline">Terms of Service</a> and <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-500 underline">Privacy Policy</a>.
              </div> */}

              <div className="mt-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="messaging-consent"
                      name="messagingConsent"
                      type="checkbox"
                      checked={formData.messagingConsent}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="messaging-consent" className="text-foreground/90">
                      By providing your phone number and clicking 'Submit,' you agree to receive SMS service updates from Wysh AI. Message frequency may vary. Standard Message and Data Rates may apply. Reply STOP to opt out. Reply HELP for help. Consent is not a condition of purchase. Your mobile information will not be sold or shared with third parties for promotional or marketing purposes. View our <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-500 underline">Terms of Service</a> and <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-500 underline">Privacy Policy</a>.
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-6 rounded-md text-base font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-sm transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
                {submitStatus.message && (
                  <div className={`mt-4 p-3 rounded-md bg-opacity-10 text-sm ${submitStatus.success ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'} border border-opacity-20 ${submitStatus.success ? 'border-green-200' : 'border-red-200'}`}>
                    <p className="whitespace-pre-wrap">{submitStatus.message}</p>
                  </div>
                )}
                <p className="mt-4 text-xs text-foreground/70">
                  <span className="text-red-600">*</span> Fields marked with an asterisk are required.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SMSOptIn;

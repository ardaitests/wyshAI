/**
 * Chat Widget v2
 * Reusable chat widget implementation for v2 (Rescheduler style)
 */

class ChatWidget {
  constructor(config = {}) {
    // Default configuration with comprehensive options
    this.config = {
      // API configuration
      api: {
        endpoint: '',
        route: 'general',
        version: 'v2',
        ...(config.api || {})
      },
      
      // Branding
      branding: {
        logo: 'images/chat-logo.png',
        name: 'AI Assistant',
        welcomeText: 'Hello! How can I help you today?',
        poweredBy: {
          text: 'Powered by WyshAI',
          link: 'https://wyshai.com',
          show: true
        },
        ...(config.branding || {})
      },
      
      // Styling
      style: {
        theme: 'modern',
        primaryColor: '#0f766e',  // Teal as default for v2
        secondaryColor: '#0d9488',
        backgroundColor: '#ffffff',
        fontColor: '#1f2937',
        position: 'right',
        buttonIcon: 'fas fa-comment-dots',
        buttonText: 'Chat with us',
        buttonWidth: 'auto',
        buttonHeight: '60px',
        buttonPadding: '0 24px',
        buttonRadius: '30px',
        buttonShadow: '0 4px 12px rgba(15, 118, 110, 0.2)',
        ...(config.style || {})
      },
      
      // Behavior
      behavior: {
        autoOpen: false,
        showHeader: true,
        showWelcomeMessage: true,
        enableNotifications: true,
        ...(config.behavior || {})
      },
      
      // Merge any additional config at the root level
      ...config
    };
    
    this.initialize();
  }

  initialize() {
    // Will be implemented in the actual widget code
    console.log('Initializing Chat Widget v2 with config:', this.config);
  }

  // Public API methods
  open() {
    console.log('Opening chat widget v2');
  }

  close() {
    console.log('Closing chat widget v2');
  }

  sendMessage(message) {
    console.log('Sending message (v2):', message);
  }
}

// Export for different environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ChatWidget;
} else if (typeof define === 'function' && define.amd) {
  define([], () => ChatWidget);
} else {
  window.ChatWidget = window.ChatWidget || {};
  window.ChatWidget.v2 = ChatWidget;
}

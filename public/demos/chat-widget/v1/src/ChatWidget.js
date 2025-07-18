/**
 * Chat Widget v1
 * Reusable chat widget implementation for v1 (CRM/Treehouse style)
 */

// Import styles
import './styles/n8n-chat.css';

class ChatWidget {
  constructor(config = {}) {
    // Default configuration with comprehensive options
    this.config = {
      // Webhook configuration
      webhook: {
        url: '',
        route: 'general',
        ...(config.webhook || {})
      },
      
      // Branding
      branding: {
        logo: 'images/chat-logo.png',
        name: 'AI Assistant',
        welcomeText: 'Hello! How can I help you today?',
        poweredBy: {
          text: 'Powered by WyshAI',
          link: 'https://wyshai.com'
        },
        ...(config.branding || {})
      },
      
      // Styling
      style: {
        primaryColor: '#4f46e5',
        secondaryColor: '#4338ca',
        backgroundColor: '#ffffff',
        fontColor: '#1f2937',
        position: 'right',
        buttonIcon: 'fas fa-comment-dots',
        buttonText: 'Chat with us',
        buttonWidth: 'auto',
        buttonHeight: '60px',
        buttonPadding: '0 24px',
        buttonRadius: '30px',
        buttonShadow: '0 4px 12px rgba(79, 70, 229, 0.2)',
        ...(config.style || {})
      },
      
      // Behavior
      behavior: {
        autoOpen: false,
        showHeader: true,
        showPoweredBy: true,
        ...(config.behavior || {})
      },
      
      // Merge any additional config at the root level
      ...config
    };
    
    // Flatten the config for easier access
    this.initialize();
  }

  initialize() {
    // Will be implemented in the actual widget code
    console.log('Initializing Chat Widget v1 with config:', this.config);
  }

  // Public API methods
  open() {
    console.log('Opening chat widget v1');
  }

  close() {
    console.log('Closing chat widget v1');
  }

  sendMessage(message) {
    console.log('Sending message (v1):', message);
  }
}

// Export for different environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ChatWidget;
} else if (typeof define === 'function' && define.amd) {
  define([], () => ChatWidget);
} else {
  window.ChatWidget = window.ChatWidget || {};
  window.ChatWidget.v1 = ChatWidget;
}

// Chat Widget Script with enhanced accessibility and error handling
(function() {
  'use strict';
  
  // Only initialize once
  if (window.chatWidgetInitialized) {
    console.log('Chat widget already initialized');
    return;
  }
  window.chatWidgetInitialized = true;
  
  console.log('Initializing chat widget...');
  
  try {
    // Get config or use defaults
    const config = window.ChatWidgetConfig || {
      style: {
        primaryColor: '#4f46e5',
        position: 'right' // 'left' or 'right'
      },
      branding: {
        name: 'wyshAI Assistant',
        welcomeText: 'Hello! How can I help you today?',
        responseTimeText: 'We\'ll get back to you as soon as possible',
        poweredBy: {
          text: 'Powered by wyshAI',
          link: 'https://wyshai.com'
        },
        logo: '/src/assets/demos/Icon-wyshAI-dark.png'
      },
      webhookUrl: 'https://areed.app.n8n.cloud/webhook/f406671e-c954-4691-b39a-66c90aa2f103/chat'
    };
    
    console.log('Chat widget config:', config);
    
    // Create styles
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      .n8n-chat-widget {
        --primary-color: ${config.style.primaryColor || '#4f46e5'};
        --chat-bg: #ffffff;
        --chat-text: #333333;
        --chat-border: #e5e7eb;
        --chat-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      
      .n8n-chat-container {
        position: fixed;
        ${config.style.position === 'left' ? 'left: 20px;' : 'right: 20px;'}
        bottom: 20px;
        width: 380px;
        max-width: 90vw;
        height: 600px;
        max-height: 80vh;
        background: var(--chat-bg);
        border-radius: 12px;
        box-shadow: var(--chat-shadow);
        display: none;
        flex-direction: column;
        z-index: 10000;
        overflow: hidden;
      }
      
      .n8n-chat-container.open {
        display: flex;
      }
      
      .n8n-chat-header {
        padding: 16px;
        background: var(--primary-color);
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
      }
      
      .n8n-chat-title {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
      }
      
      .n8n-chat-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 4px;
      }
      
      .n8n-chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
      }
      
      .n8n-chat-input-container {
        padding: 12px 16px;
        border-top: 1px solid var(--chat-border);
        display: flex;
        gap: 8px;
      }
      
      .n8n-chat-input {
        flex: 1;
        padding: 10px 12px;
        border: 1px solid var(--chat-border);
        border-radius: 6px;
        font-size: 14px;
        outline: none;
      }
      
      .n8n-chat-input:focus {
        border-color: var(--primary-color);
      }
      
      .n8n-chat-send {
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 6px;
        padding: 0 16px;
        font-weight: 500;
        cursor: pointer;
        transition: opacity 0.2s;
      }
      
      .n8n-chat-send:hover {
        opacity: 0.9;
      }
      
      .n8n-chat-message {
        margin-bottom: 16px;
        max-width: 80%;
        padding: 10px 14px;
        border-radius: 12px;
        font-size: 14px;
        line-height: 1.5;
      }
      
      .n8n-chat-message.user {
        background: var(--primary-color);
        color: white;
        margin-left: auto;
        border-bottom-right-radius: 4px;
      }
      
      .n8n-chat-message.bot {
        background: #f3f4f6;
        color: var(--chat-text);
        margin-right: auto;
        border-bottom-left-radius: 4px;
      }
      
      .n8n-chat-toggle {
        position: fixed;
        ${config.style.position === 'left' ? 'left: 20px;' : 'right: 20px;'}
        bottom: 20px;
        width: 60px;
        height: 60px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      
      .n8n-chat-toggle:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
      }
    `;
    
    // Add styles to head
    document.head.appendChild(styleEl);
    
    // Create chat container
    const chatContainer = document.createElement('div');
    chatContainer.className = 'n8n-chat-container';
    
    // Create header
    const header = document.createElement('div');
    header.className = 'n8n-chat-header';
    
    const title = document.createElement('h3');
    title.className = 'n8n-chat-title';
    title.textContent = config.branding.name || 'Chat Assistant';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'n8n-chat-close';
    closeButton.innerHTML = '&times;';
    closeButton.setAttribute('aria-label', 'Close chat');
    
    header.appendChild(title);
    header.appendChild(closeButton);
    
    // Create messages container
    const messages = document.createElement('div');
    messages.className = 'n8n-chat-messages';
    
    // Create input container
    const inputContainer = document.createElement('div');
    inputContainer.className = 'n8n-chat-input-container';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'n8n-chat-input';
    input.placeholder = 'Type your message...';
    
    const sendButton = document.createElement('button');
    sendButton.className = 'n8n-chat-send';
    sendButton.textContent = 'Send';
    
    inputContainer.appendChild(input);
    inputContainer.appendChild(sendButton);
    
    // Assemble chat container
    chatContainer.appendChild(header);
    chatContainer.appendChild(messages);
    chatContainer.appendChild(inputContainer);
    
    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'n8n-chat-toggle';
    toggleButton.innerHTML = '💬';
    toggleButton.setAttribute('aria-label', 'Open chat');
    
    // Add elements to body
    document.body.appendChild(chatContainer);
    document.body.appendChild(toggleButton);
    
    // Add welcome message
    function addWelcomeMessage() {
      const welcomeMsg = document.createElement('div');
      welcomeMsg.className = 'n8n-chat-message bot';
      welcomeMsg.textContent = config.branding.welcomeText || 'Hello! How can I help you today?';
      messages.appendChild(welcomeMsg);
      messages.scrollTop = messages.scrollHeight;
    }
    
    // Toggle chat function
    function toggleChat(isOpen) {
      if (isOpen) {
        chatContainer.classList.add('open');
        input.focus();
      } else {
        chatContainer.classList.remove('open');
      }
    }
    
    // Send message function
    function sendMessage() {
      const message = input.value.trim();
      if (!message) return;
      
      // Add user message to chat
      const userMsg = document.createElement('div');
      userMsg.className = 'n8n-chat-message user';
      userMsg.textContent = message;
      messages.appendChild(userMsg);
      
      // Clear input
      input.value = '';
      
      // Scroll to bottom
      messages.scrollTop = messages.scrollHeight;
      
      // Show typing indicator
      const typingIndicator = document.createElement('div');
      typingIndicator.className = 'n8n-chat-message bot';
      typingIndicator.textContent = '...';
      messages.appendChild(typingIndicator);
      messages.scrollTop = messages.scrollHeight;
      
      // Send message to webhook
      fetch(config.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          sessionId: window.chatSessionId || (window.chatSessionId = Date.now().toString())
        })
      })
      .then(response => response.json())
      .then(data => {
        // Remove typing indicator
        messages.removeChild(typingIndicator);
        
        // Add bot response
        const botMsg = document.createElement('div');
        botMsg.className = 'n8n-chat-message bot';
        botMsg.textContent = data.response || 'Sorry, I had trouble understanding that.';
        messages.appendChild(botMsg);
        messages.scrollTop = messages.scrollHeight;
      })
      .catch(error => {
        console.error('Error:', error);
        // Remove typing indicator
        messages.removeChild(typingIndicator);
        
        // Show error message
        const errorMsg = document.createElement('div');
        errorMsg.className = 'n8n-chat-message bot';
        errorMsg.textContent = 'Sorry, there was an error processing your message. Please try again.';
        messages.appendChild(errorMsg);
        messages.scrollTop = messages.scrollHeight;
      });
    }
    
    // Event listeners
    toggleButton.addEventListener('click', () => {
      const isOpen = chatContainer.classList.contains('open');
      toggleChat(!isOpen);
    });
    
    closeButton.addEventListener('click', () => {
      toggleChat(false);
    });
    
    sendButton.addEventListener('click', sendMessage);
    
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
    
    // Add welcome message
    addWelcomeMessage();
    
    // Expose public methods
    window.ChatWidget = {
      open: () => toggleChat(true),
      close: () => toggleChat(false),
      sendMessage: (message) => {
        if (typeof message === 'string' && message.trim()) {
          input.value = message;
          sendMessage();
        }
      }
    };
    
    console.log('Chat widget initialized successfully');
    
  } catch (error) {
    console.error('Failed to initialize chat widget:', error);
  }
})();

// Chat Widget Script with enhanced styling and functionality
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
        secondaryColor: '#4338ca',
        position: 'right', // 'left' or 'right'
        backgroundColor: '#ffffff',
        fontColor: '#333333'
      },
      branding: {
        name: 'wyshAI Assistant',
        welcomeText: 'Hello! How can I help you today?',
        responseTimeText: 'We\'ll get back to you as soon as possible',
        poweredBy: {
          text: 'Powered by wyshAI',
          link: 'https://wyshai.com'
        },
        logo: '/demos/images/Icon-wyshAI-dark.png'
      },
      webhookUrl: 'https://areed.app.n8n.cloud/webhook/f406671e-c954-4691-b39a-66c90aa2f103/chat'
    };
    
    console.log('Chat widget config:', config);
    
    // Create styles
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
      @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
      
      .n8n-chat-widget {
        --chat--color-primary: ${config.style.primaryColor || '#4f46e5'};
        --chat--color-secondary: ${config.style.secondaryColor || '#4338ca'};
        --chat--color-background: ${config.style.backgroundColor || '#ffffff'};
        --chat--color-font: ${config.style.fontColor || '#333333'};
        --chat--color-border: #e5e7eb;
        --chat--color-message-bot: #f3f4f6;
        --chat--color-message-user: #4f46e5;
        --chat--color-message-text: #1f2937;
        --chat--color-input-bg: #f9fafb;
        --chat--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        --chat--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        --chat--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        --chat--radius-sm: 0.375rem;
        --chat--radius-md: 0.5rem;
        --chat--radius-lg: 0.75rem;
        --chat--spacing-xs: 0.25rem;
        --chat--spacing-sm: 0.5rem;
        --chat--spacing-md: 1rem;
        --chat--spacing-lg: 1.5rem;
        --chat--spacing-xl: 2rem;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 16px;
        line-height: 1.5;
        color: var(--chat--color-font);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      /* Chat Container */
      .n8n-chat-container {
        position: fixed;
        ${config.style.position === 'left' ? 'left: 20px;' : 'right: 20px;'}
        bottom: 20px;
        width: 380px;
        max-width: calc(100vw - 40px);
        height: 600px;
        max-height: 80vh;
        background: var(--chat--color-background);
        border-radius: var(--chat--radius-lg);
        box-shadow: var(--chat--shadow-lg);
        display: none;
        flex-direction: column;
        z-index: 10000;
        overflow: hidden;
        transition: all 0.3s ease;
      }
      
      .n8n-chat-container.open {
        display: flex;
        opacity: 1;
        transform: translateY(0);
      }
      
      /* Header */
      .n8n-chat-header {
        padding: var(--chat--spacing-md) var(--chat--spacing-lg);
        background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
        color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      
      .n8n-chat-brand {
        display: flex;
        align-items: center;
        gap: var(--chat--spacing-sm);
      }
      
      .n8n-chat-logo {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
      }
      
      .n8n-chat-title {
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
        color: white;
      }
      
      .n8n-chat-close {
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.8);
        font-size: 1.25rem;
        cursor: pointer;
        padding: var(--chat--spacing-xs);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
      }
      
      .n8n-chat-close:hover {
        background: rgba(255, 255, 255, 0.1);
        color: white;
      }
      
      /* Messages */
      .n8n-chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: var(--chat--spacing-md);
        display: flex;
        flex-direction: column;
        gap: var(--chat--spacing-md);
      }
      
      .n8n-chat-message {
        max-width: 85%;
        padding: var(--chat--spacing-sm) var(--chat--spacing-md);
        border-radius: var(--chat--radius-md);
        font-size: 0.9375rem;
        line-height: 1.4;
        position: relative;
        animation: messageIn 0.2s ease-out;
      }
      
      @keyframes messageIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .n8n-chat-message.bot {
        background: var(--chat--color-message-bot);
        color: var(--chat--color-message-text);
        border-top-left-radius: var(--chat--radius-sm);
        align-self: flex-start;
      }
      
      .n8n-chat-message.user {
        background: var(--chat--color-message-user);
        color: white;
        border-top-right-radius: var(--chat--radius-sm);
        align-self: flex-end;
      }
      
      /* Input */
      .n8n-chat-input-container {
        padding: var(--chat--spacing-md);
        border-top: 1px solid var(--chat--color-border);
        background: var(--chat--color-background);
        display: flex;
        gap: var(--chat--spacing-sm);
      }
      
      .n8n-chat-input {
        flex: 1;
        padding: 0.75rem var(--chat--spacing-md);
        border: 1px solid var(--chat--color-border);
        border-radius: var(--chat--radius-md);
        font-family: inherit;
        font-size: 0.9375rem;
        line-height: 1.4;
        background: var(--chat--color-input-bg);
        transition: all 0.2s ease;
      }
      
      .n8n-chat-input:focus {
        outline: none;
        border-color: var(--chat--color-primary);
        box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
      }
      
      .n8n-chat-send {
        background: var(--chat--color-primary);
        color: white;
        border: none;
        border-radius: var(--chat--radius-md);
        padding: 0 var(--chat--spacing-md);
        font-weight: 500;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
      }
      
      .n8n-chat-send:hover {
        background: var(--chat--color-secondary);
        transform: translateY(-1px);
      }
      
      .n8n-chat-send:active {
        transform: translateY(0);
      }
      
      /* Toggle Button */
      .n8n-chat-toggle {
        position: fixed;
        ${config.style.position === 'left' ? 'left: 20px;' : 'right: 20px;'}
        bottom: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
        color: white;
        border: none;
        box-shadow: var(--chat--shadow-lg);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 9999;
        transition: all 0.3s ease;
        font-size: 1.5rem;
      }
      
      .n8n-chat-toggle:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
      }
      
      .n8n-chat-toggle:active {
        transform: translateY(-1px);
      }
      
      /* Typing indicator */
      .typing-indicator {
        display: flex;
        gap: 4px;
        padding: 10px 16px;
        background: var(--chat--color-message-bot);
        border-radius: var(--chat--radius-md);
        width: fit-content;
      }
      
      .typing-dot {
        width: 8px;
        height: 8px;
        background: #9ca3af;
        border-radius: 50%;
        animation: typing 1.4s infinite ease-in-out;
      }
      
      .typing-dot:nth-child(1) { animation-delay: 0s; }
      .typing-dot:nth-child(2) { animation-delay: 0.2s; }
      .typing-dot:nth-child(3) { animation-delay: 0.4s; }
      
      @keyframes typing {
        0%, 60%, 100% { transform: translateY(0); }
        30% { transform: translateY(-4px); }
      }
      
      /* Responsive adjustments */
      @media (max-width: 480px) {
        .n8n-chat-container {
          width: 100%;
          max-width: 100%;
          height: 100%;
          max-height: 100%;
          bottom: 0;
          ${config.style.position === 'left' ? 'left: 0;' : 'right: 0;'}
          border-radius: 0;
        }
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
    
    const brand = document.createElement('div');
    brand.className = 'n8n-chat-brand';
    
    const logo = document.createElement('img');
    logo.className = 'n8n-chat-logo';
    logo.src = config.branding.logo;
    logo.alt = config.branding.name + ' Logo';
    
    const title = document.createElement('h3');
    title.className = 'n8n-chat-title';
    title.textContent = config.branding.name;
    
    const closeButton = document.createElement('button');
    closeButton.className = 'n8n-chat-close';
    closeButton.innerHTML = '&times;';
    closeButton.setAttribute('aria-label', 'Close chat');
    
    brand.appendChild(logo);
    brand.appendChild(title);
    header.appendChild(brand);
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
    input.setAttribute('aria-label', 'Type your message');
    
    const sendButton = document.createElement('button');
    sendButton.className = 'n8n-chat-send';
    sendButton.innerHTML = '<i class="fas fa-paper-plane"></i>';
    sendButton.setAttribute('aria-label', 'Send message');
    
    inputContainer.appendChild(input);
    inputContainer.appendChild(sendButton);
    
    // Assemble chat container
    chatContainer.appendChild(header);
    chatContainer.appendChild(messages);
    chatContainer.appendChild(inputContainer);
    
    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'n8n-chat-toggle';
    toggleButton.innerHTML = '<i class="fas fa-comment"></i>';
    toggleButton.setAttribute('aria-label', 'Open chat');
    
    // Add elements to body
    document.body.appendChild(chatContainer);
    document.body.appendChild(toggleButton);
    
    // Add welcome message
    function addWelcomeMessage() {
      const welcomeMsg = document.createElement('div');
      welcomeMsg.className = 'n8n-chat-message bot';
      welcomeMsg.innerHTML = `
        <div style="margin-bottom: 8px;">${config.branding.welcomeText}</div>
        <div style="font-size: 0.8125rem; color: #6b7280;">${config.branding.responseTimeText}</div>
      `;
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
    
    // Show typing indicator
    function showTypingIndicator() {
      const typingEl = document.createElement('div');
      typingEl.className = 'typing-indicator';
      typingEl.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      `;
      typingEl.id = 'typing-indicator';
      messages.appendChild(typingEl);
      messages.scrollTop = messages.scrollHeight;
      return typingEl;
    }
    
    // Hide typing indicator
    function hideTypingIndicator() {
      const typingEl = document.getElementById('typing-indicator');
      if (typingEl) {
        typingEl.remove();
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
      const typingEl = showTypingIndicator();
      
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
        hideTypingIndicator();
        
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
        hideTypingIndicator();
        
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
    
    // Close chat when clicking outside
    document.addEventListener('click', (e) => {
      if (!chatContainer.contains(e.target) && !toggleButton.contains(e.target)) {
        toggleChat(false);
      }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && chatContainer.classList.contains('open')) {
        toggleChat(false);
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

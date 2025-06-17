// Chat Widget Script with enhanced accessibility and error handling
(function() {
  'use strict';
  
  // Only initialize once
  if (window.chatWidgetInitialized) return;
  window.chatWidgetInitialized = true;
  
  try {
    // Get config or use defaults
    const config = window.ChatWidgetConfig || {
      style: {
        primaryColor: '#4f46e5',
        position: 'right' // 'left' or 'right'
      },
      branding: {
        name: 'Chat Assistant',
        welcomeText: 'Hello! How can I help you today?'
      },
      webhookUrl: 'https://areed.app.n8n.cloud/webhook/f406671e-c954-4691-b39a-66c90aa2f103/chat'
    };
    
    // Apply config defaults
    config.style = { ...config.style };
    config.branding = { ...config.branding };
    
    // Create styles
    const styles = `
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
        height: 600px;
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: var(--primary-color);
        color: white;
      }
      
      .n8n-chat-title {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 600;
      }
      
      .n8n-close-button {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 4px;
        line-height: 1;
      }
      
      .n8n-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
      }
      
      .n8n-message {
        margin: 8px 0;
        padding: 10px 12px;
        border-radius: 4px;
        max-width: 80%;
      }
      
      .n8n-message.bot {
        background: #f5f5f5;
        align-self: flex-start;
      }
      
      .n8n-message.user {
        background: var(--primary-color);
        color: white;
        align-self: flex-end;
      }
      
      .n8n-input-area {
        padding: 16px;
        border-top: 1px solid var(--chat-border);
        display: flex;
        gap: 8px;
      }
      
      .n8n-input {
        flex: 1;
        padding: 10px 12px;
        border: 1px solid var(--chat-border);
        border-radius: 4px;
        outline: none;
      }
      
      .n8n-send-button {
        padding: 10px 20px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      
      .n8n-chat-button {
        position: fixed;
        ${config.style.position === 'left' ? 'left: 30px;' : 'right: 30px;'}
        bottom: 30px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: var(--primary-color);
        border: none;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: transform 0.2s, opacity 0.2s;
        opacity: 0;
        transform: scale(0.9);
      }
      
      .n8n-chat-button.visible {
        opacity: 1;
        transform: scale(1);
      }
      
      .n8n-chat-icon {
        color: white;
        font-size: 24px;
      }
    `;
    
    // Add styles to document
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
    
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
    closeButton.className = 'n8n-close-button';
    closeButton.innerHTML = '&times;';
    closeButton.setAttribute('aria-label', 'Close chat');
    
    header.appendChild(title);
    header.appendChild(closeButton);
    
    // Create messages container
    const messagesContainer = document.createElement('div');
    messagesContainer.className = 'n8n-messages';
    
    // Create input area
    const inputArea = document.createElement('div');
    inputArea.className = 'n8n-input-area';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'n8n-input';
    input.placeholder = 'Type your message...';
    
    const sendButton = document.createElement('button');
    sendButton.className = 'n8n-send-button';
    sendButton.textContent = 'Send';
    
    inputArea.appendChild(input);
    inputArea.appendChild(sendButton);
    
    // Assemble chat container
    chatContainer.appendChild(header);
    chatContainer.appendChild(messagesContainer);
    chatContainer.appendChild(inputArea);
    
    // Create chat button
    const chatButton = document.createElement('button');
    chatButton.className = 'n8n-chat-button';
    chatButton.setAttribute('aria-label', 'Open chat');
    chatButton.setAttribute('aria-expanded', 'false');
    
    const chatIcon = document.createElement('i');
    chatIcon.className = 'fas fa-comment-dots n8n-chat-icon';
    chatButton.appendChild(chatIcon);
    
    // Add elements to document
    document.body.appendChild(chatContainer);
    document.body.appendChild(chatButton);
    
    // Add welcome message
    function addWelcomeMessage() {
      const welcomeMsg = document.createElement('div');
      welcomeMsg.className = 'n8n-message bot';
      welcomeMsg.textContent = config.branding.welcomeText || 'Hello! How can I help you today?';
      messagesContainer.appendChild(welcomeMsg);
    }
    
    // Toggle chat function
    function toggleChat(isOpen) {
      if (isOpen) {
        chatContainer.classList.add('open');
        chatButton.setAttribute('aria-expanded', 'true');
        input.focus();
      } else {
        chatContainer.classList.remove('open');
        chatButton.setAttribute('aria-expanded', 'false');
      }
    }
    
    // Send message function
    function sendMessage() {
      const message = input.value.trim();
      if (!message) return;
      
      // Add user message
      const userMsg = document.createElement('div');
      userMsg.className = 'n8n-message user';
      userMsg.textContent = message;
      messagesContainer.appendChild(userMsg);
      
      // Clear input
      input.value = '';
      
      // Scroll to bottom
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      
      // Simulate bot response
      setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'n8n-message bot';
        botMsg.textContent = 'Thanks for your message! A real implementation would connect to a backend service.';
        messagesContainer.appendChild(botMsg);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }, 1000);
    }
    
    // Event listeners
    chatButton.addEventListener('click', () => {
      const isOpen = chatContainer.classList.contains('open');
      toggleChat(!isOpen);
    });
    
    closeButton.addEventListener('click', () => toggleChat(false));
    
    sendButton.addEventListener('click', sendMessage);
    
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
    
    // Close chat when clicking outside
    document.addEventListener('click', (e) => {
      if (!chatContainer.contains(e.target) && !chatButton.contains(e.target)) {
        toggleChat(false);
      }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && chatContainer.classList.contains('open')) {
        toggleChat(false);
      }
    });
    
    // Show chat button after a short delay
    setTimeout(() => {
      chatButton.classList.add('visible');
    }, 1000);
    
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
    
    // Create and inject styles
    const styles = `
        .n8n-chat-widget {
            --chat--color-primary: var(--n8n-chat-primary-color, #854fff);
            --chat--color-secondary: var(--n8n-chat-secondary-color, #6b3fd4);
            --chat--color-background: var(--n8n-chat-background-color, #ffffff);
            --chat--color-font: var(--n8n-chat-font-color, #333333);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .n8n-chat-widget .chat-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            display: none;
            width: 380px;
            height: 600px;
            background: var(--chat--color-background);
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(133, 79, 255, 0.15);
            border: 1px solid rgba(133, 79, 255, 0.2);
            overflow: hidden;
            font-family: inherit;
        }

        .n8n-chat-widget .chat-container.position-left {
            right: auto;
            left: 20px;
        }

        .n8n-chat-widget .chat-container.open {
            display: flex;
            flex-direction: column;
        }

        .n8n-chat-widget .brand-header {
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 12px;
            border-bottom: 1px solid rgba(133, 79, 255, 0.1);
            position: relative;
        }

        .n8n-chat-widget .close-button {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--chat--color-font);
            cursor: pointer;
            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.2s;
            font-size: 20px;
            opacity: 0.6;
        }

        .n8n-chat-widget .close-button:hover {
            opacity: 1;
        }

        .n8n-chat-widget .brand-header img {
            width: 32px;
            height: 32px;
        }

        .n8n-chat-widget .brand-header span {
            font-size: 18px;
            font-weight: 500;
            color: var(--chat--color-font);
        }

        .n8n-chat-widget .new-conversation {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 20px;
            text-align: center;
            width: 100%;
            max-width: 300px;
        }

        .n8n-chat-widget .welcome-text {
            font-size: 24px;
            font-weight: 600;
            color: var(--chat--color-font);
            margin-bottom: 24px;
            line-height: 1.3;
        }

        .n8n-chat-widget .new-chat-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
            padding: 16px 24px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            transition: transform 0.3s;
            font-weight: 500;
            font-family: inherit;
            margin-bottom: 12px;
        }

        .n8n-chat-widget .new-chat-btn:hover {
            transform: scale(1.02);
        }

        .n8n-chat-widget .message-icon {
            width: 20px;
            height: 20px;
        }

        .n8n-chat-widget .response-text {
            font-size: 14px;
            color: var(--chat--color-font);
            opacity: 0.7;
            margin: 0;
        }

        .n8n-chat-widget .chat-interface {
            display: none;
            flex-direction: column;
            height: 100%;
        }

        .n8n-chat-widget .chat-interface.active {
            display: flex;
        }

        .n8n-chat-widget .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: var(--chat--color-background);
            display: flex;
            flex-direction: column;
        }

        .n8n-chat-widget .chat-message {
            padding: 12px 16px;
            margin: 8px 0;
            border-radius: 12px;
            max-width: 80%;
            word-wrap: break-word;
            font-size: 14px;
            line-height: 1.5;
        }

        .n8n-chat-widget .chat-message.user {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            align-self: flex-end;
            box-shadow: 0 4px 12px rgba(133, 79, 255, 0.2);
            border: none;
        }

        .n8n-chat-widget .chat-message.bot {
            background: var(--chat--color-background);
            border: 1px solid rgba(133, 79, 255, 0.2);
            color: var(--chat--color-font);
            align-self: flex-start;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .n8n-chat-widget .chat-input {
            padding: 16px;
            background: var(--chat--color-background);
            border-top: 1px solid rgba(133, 79, 255, 0.1);
            display: flex;
            gap: 8px;
        }

        .n8n-chat-widget .chat-input textarea {
            flex: 1;
            padding: 12px;
            border: 1px solid rgba(133, 79, 255, 0.2);
            border-radius: 8px;
            background: var(--chat--color-background);
            color: var(--chat--color-font);
            resize: none;
            font-family: inherit;
            font-size: 14px;
        }

        .n8n-chat-widget .chat-input textarea::placeholder {
            color: var(--chat--color-font);
            opacity: 0.6;
        }

        .n8n-chat-widget .chat-input button {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 0 20px;
            cursor: pointer;
            transition: transform 0.2s;
            font-family: inherit;
            font-weight: 500;
        }

        .n8n-chat-widget .chat-input button:hover {
            transform: scale(1.05);
        }

        .n8n-chat-widget .chat-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 30px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(133, 79, 255, 0.3);
            z-index: 999;
            transition: transform 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .n8n-chat-widget .chat-toggle.position-left {
            right: auto;
            left: 20px;
        }

        .n8n-chat-widget .chat-toggle:hover {
            transform: scale(1.05);
        }

        .n8n-chat-widget .chat-toggle svg {
            width: 24px;
            height: 24px;
            fill: currentColor;
        }

        .n8n-chat-widget .chat-footer {
            padding: 8px;
            text-align: center;
            background: var(--chat--color-background);
            border-top: 1px solid rgba(133, 79, 255, 0.1);
        }

        .n8n-chat-widget .chat-footer a {
            color: var(--chat--color-primary);
            text-decoration: none;
            font-size: 12px;
            opacity: 0.8;
            transition: opacity 0.2s;
            font-family: inherit;
        }

        .n8n-chat-widget .chat-footer a:hover {
            opacity: 1;
        }
    `;

    // Load Inter font with error handling
    const loadFont = () => {
      try {
        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
        fontLink.onerror = () => {
          console.warn('Failed to load Inter font, using system fonts as fallback');
        };
        document.head.appendChild(fontLink);
      } catch (e) {
        console.error('Error loading font:', e);
      }
    };
    
    // Load font if not already loaded
    if (!document.querySelector('link[href*="fonts.googleapis.com/css2?family=Inter"]')) {
      loadFont();
    }

    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Default configuration
    const defaultConfig = {
        webhook: {
            url: '',
            route: ''
        },
        branding: {
            logo: '',
            name: '',
            welcomeText: '',
            responseTimeText: '',
            poweredBy: {
                text: 'Powered by wyshAI',
                link: 'https://wyshai.com'
            }
        },
        style: {
            primaryColor: '',
            secondaryColor: '',
            position: 'right',
            backgroundColor: '#ffffff',
            fontColor: '#333333'
        }
    };

    // Merge user config with defaults
    const config = window.ChatWidgetConfig ?
        {
            webhook: { ...defaultConfig.webhook, ...window.ChatWidgetConfig.webhook },
            branding: { ...defaultConfig.branding, ...window.ChatWidgetConfig.branding },
            style: { ...defaultConfig.style, ...window.ChatWidgetConfig.style }
        } : defaultConfig;

    // Prevent multiple initializations
    if (window.N8NChatWidgetInitialized) return;
    window.N8NChatWidgetInitialized = true;

    let currentSessionId = '';

    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'n8n-chat-widget';

    // Set CSS variables for colors
    widgetContainer.style.setProperty('--n8n-chat-primary-color', config.style.primaryColor);
    widgetContainer.style.setProperty('--n8n-chat-secondary-color', config.style.secondaryColor);
    widgetContainer.style.setProperty('--n8n-chat-background-color', config.style.backgroundColor);
    widgetContainer.style.setProperty('--n8n-chat-font-color', config.style.fontColor);

    const chatContainer = document.createElement('div');
    chatContainer.className = `chat-container${config.style.position === 'left' ? ' position-left' : ''}`;

    const newConversationHTML = `
        <div class="brand-header">
            <img src="${config.branding.logo}" alt="${config.branding.name}">
            <span>${config.branding.name}</span>
            <button class="close-button">×</button>
        </div>
        <div class="new-conversation">
            <h2 class="welcome-text">${config.branding.welcomeText}</h2>
            <button class="new-chat-btn">
                <svg class="message-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
                </svg>
                Send a message
            </button>
            <p class="response-text">${config.branding.responseTimeText}</p>
        </div>
    `;

    const chatInterfaceHTML = `
        <div class="chat-interface">
            <div class="brand-header">
                <img src="${config.branding.logo}" alt="${config.branding.name}">
                <span>${config.branding.name}</span>
                <button class="close-button">×</button>
            </div>
            <div class="chat-messages"></div>
            <div class="chat-input">
                <textarea placeholder="Type your message here..." rows="1"></textarea>
                <button type="submit">Send</button>
            </div>
            <div class="chat-footer">
                <a href="${config.branding.poweredBy.link}" target="_blank">${config.branding.poweredBy.text}</a>
            </div>
        </div>
    `;

    chatContainer.innerHTML = newConversationHTML + chatInterfaceHTML;

    // Handle window resize with debounce
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        try {
          if (window.innerWidth <= 768) {
            chatContainer.style.width = '100%';
            chatContainer.style.height = '100%';
            chatContainer.style.borderRadius = '0';
          } else {
            chatContainer.style.width = '380px';
            chatContainer.style.height = '600px';
            chatContainer.style.borderRadius = '12px';
          }
        } catch (e) {
          console.error('Error during resize handling:', e);
        }
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Initial setup
    handleResize();

    const toggleButton = document.createElement('button');
    toggleButton.className = `chat-toggle${config.style.position === 'left' ? ' position-left' : ''}`;
    toggleButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
        </svg>`;

    widgetContainer.appendChild(chatContainer);
    widgetContainer.appendChild(toggleButton);
    document.body.appendChild(widgetContainer);

    const newChatBtn = chatContainer.querySelector('.new-chat-btn');
    const chatInterface = chatContainer.querySelector('.chat-interface');
    const messagesContainer = chatContainer.querySelector('.chat-messages');
    const textarea = chatContainer.querySelector('textarea');
    const sendButton = chatContainer.querySelector('button[type="submit"]');

    function generateUUID() {
        return crypto.randomUUID();
    }

    async function startNewConversation() {
        currentSessionId = generateUUID();
        const data = [{
            action: "loadPreviousSession",
            sessionId: currentSessionId,
            route: config.webhook.route,
            metadata: {
                userId: ""
            }
        }];

        try {
            const response = await fetch(config.webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();
            chatContainer.querySelector('.brand-header').style.display = 'none';
            chatContainer.querySelector('.new-conversation').style.display = 'none';
            chatInterface.classList.add('active');

            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'chat-message bot';
            botMessageDiv.textContent = Array.isArray(responseData) ? responseData[0].output : responseData.output;
            messagesContainer.appendChild(botMessageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function sendMessage(message) {
        const messageData = {
            action: "sendMessage",
            sessionId: currentSessionId,
            route: config.webhook.route,
            chatInput: message,
            metadata: {
                userId: ""
            }
        };

        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'chat-message user';
        userMessageDiv.textContent = message;
        messagesContainer.appendChild(userMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        try {
            const response = await fetch(config.webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageData)
            });

            const data = await response.json();

            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'chat-message bot';
            botMessageDiv.textContent = Array.isArray(data) ? data[0].output : data.output;
            messagesContainer.appendChild(botMessageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    newChatBtn.addEventListener('click', startNewConversation);

    sendButton.addEventListener('click', () => {
        const message = textarea.value.trim();
        if (message) {
            sendMessage(message);
            textarea.value = '';
        }
    });

    textarea.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const message = textarea.value.trim();
            if (message) {
                sendMessage(message);
                textarea.value = '';
            }
        }
    });

    toggleButton.addEventListener('click', () => {
        chatContainer.classList.toggle('open');
    });

    // Add close button handlers
    const closeButtons = chatContainer.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            chatContainer.classList.remove('open');
        });
    });

    // Create chat button with enhanced accessibility
    const chatButton = document.createElement('button');
    chatButton.className = 'n8n-chat-widget-button';
    chatButton.setAttribute('aria-label', 'Open chat for home valuation');
    chatButton.setAttribute('aria-expanded', 'false');
    chatButton.setAttribute('aria-controls', 'n8n-chat-container');
    chatButton.setAttribute('aria-haspopup', 'dialog');
    chatButton.setAttribute('role', 'button');
    chatButton.setAttribute('tabindex', '0');
    
    // Add screen reader text
    const srText = document.createElement('span');
    srText.className = 'sr-only';
    srText.textContent = 'Open chat for home valuation';
    
    // Add icon with aria-hidden
    const icon = document.createElement('i');
    icon.className = 'fas fa-comment-dots';
    icon.setAttribute('aria-hidden', 'true');
    
    chatButton.appendChild(srText);
    chatButton.appendChild(icon);

    // Create chat container
    const chatContainer = document.createElement('div');
    chatContainer.className = `n8n-chat-widget ${config.style.position === 'left' ? 'position-left' : ''}`;
    
    // Set initial styles
    chatContainer.style.display = 'none';
    chatContainer.style.position = 'fixed';
    chatContainer.style.bottom = '20px';
    chatContainer.style.right = '20px';
    chatContainer.style.zIndex = '10000';
    chatContainer.style.width = '380px';
    chatContainer.style.height = '600px';
    chatContainer.style.backgroundColor = '#ffffff';
    chatContainer.style.borderRadius = '12px';
    chatContainer.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
    chatContainer.style.overflow = 'hidden';
    chatContainer.style.flexDirection = 'column';
    
    // Create chat header
    const header = document.createElement('div');
    header.className = 'chat-header';
    header.style.padding = '16px';
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    header.style.borderBottom = '1px solid #f0f0f0';
    
    const title = document.createElement('h3');
    title.textContent = config.branding?.name || 'Chat Assistant';
    title.style.margin = '0';
    title.style.fontSize = '1.1rem';
    title.style.fontWeight = '600';
    
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.className = 'close-button';
    closeButton.setAttribute('aria-label', 'Close chat');
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.fontSize = '1.5rem';
    closeButton.style.cursor = 'pointer';
    closeButton.style.padding = '0 8px';
    closeButton.style.lineHeight = '1';
    
    header.appendChild(title);
    header.appendChild(closeButton);
    
    // Create chat messages container
    const messagesContainer = document.createElement('div');
    messagesContainer.className = 'chat-messages';
    messagesContainer.style.flex = '1';
    messagesContainer.style.overflowY = 'auto';
    messagesContainer.style.padding = '16px';
    
    // Create input area
    const inputArea = document.createElement('div');
    inputArea.className = 'chat-input';
    inputArea.style.padding = '16px';
    inputArea.style.borderTop = '1px solid #f0f0f0';
    inputArea.style.display = 'flex';
    inputArea.style.gap = '8px';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type your message...';
    input.style.flex = '1';
    input.style.padding = '10px 12px';
    input.style.border = '1px solid #ddd';
    input.style.borderRadius = '4px';
    input.style.outline = 'none';
    
    const sendBtn = document.createElement('button');
    sendBtn.textContent = 'Send';
    sendButton.style.padding = '10px 20px';
    sendButton.style.background = config.style?.primaryColor || '#4f46e5';
    sendButton.style.color = 'white';
    sendButton.style.border = 'none';
    sendButton.style.borderRadius = '4px';
    sendButton.style.cursor = 'pointer';
    
    // Add welcome message
    if (config.branding?.welcomeText) {
      const welcomeMsg = document.createElement('div');
      welcomeMsg.className = 'chat-message bot';
      welcomeMsg.textContent = config.branding.welcomeText;
      welcomeMsg.style.margin = '8px 0';
      welcomeMsg.style.padding = '10px 12px';
      welcomeMsg.style.background = '#f5f5f5';
      welcomeMsg.style.borderRadius = '4px';
      welcomeMsg.style.maxWidth = '80%';
      welcomeMsg.style.alignSelf = 'flex-start';
      messagesContainer.appendChild(welcomeMsg);
    }
    
    // Assemble the chat UI
    inputArea.appendChild(input);
    inputArea.appendChild(sendButton);
    
    chatContainer.appendChild(header);
    chatContainer.appendChild(messagesContainer);
    chatContainer.appendChild(inputArea);
    
    // Add to document
    document.body.appendChild(chatContainer);
    
    // Create chat button
    const chatBtn = document.createElement('button');
    chatBtn.className = 'n8n-chat-widget-button';
    chatButton.style.position = 'fixed';
    chatButton.style.bottom = '30px';
    chatButton.style.right = '30px';
    chatButton.style.width = '60px';
    chatButton.style.height = '60px';
    chatButton.style.borderRadius = '50%';
    chatButton.style.background = config.style?.primaryColor || '#4f46e5';
    chatButton.style.border = 'none';
    chatButton.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    chatButton.style.cursor = 'pointer';
    chatButton.style.display = 'flex';
    chatButton.style.justifyContent = 'center';
    chatButton.style.alignItems = 'center';
    chatButton.setAttribute('aria-label', 'Open chat');
    chatButton.setAttribute('aria-expanded', 'false');
    
    const icon = document.createElement('i');
    icon.className = 'fas fa-comment-dots';
    icon.style.color = 'white';
    icon.style.fontSize = '24px';
    chatButton.appendChild(icon);
    
    document.body.appendChild(chatButton);
    
    // Toggle chat function
    const toggleChat = (isOpen) => {
      chatContainer.style.display = isOpen ? 'flex' : 'none';
      chatBtn.setAttribute('aria-expanded', isOpen.toString());
      
      if (isOpen) {
        input.focus();
      }
    };
    
    // Event listeners
    chatBtn.addEventListener('click', () => {
      const isOpen = chatContainer.style.display === 'flex';
      toggleChat(!isOpen);
    });
    
    closeButton.addEventListener('click', () => toggleChat(false));
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && chatContainer.style.display === 'flex') {
        toggleChat(false);
      }
    });
    
    // Handle sending messages
    function sendMessage() {
      const message = input.value.trim();
      if (!message) return;
      
      // Add user message
      const userMsg = document.createElement('div');
      userMsg.className = 'chat-message user';
      userMsg.textContent = message;
      userMsg.style.margin = '8px 0';
      userMsg.style.padding = '10px 12px';
      userMsg.style.background = config.style.primaryColor || '#4f46e5';
      userMsg.style.color = 'white';
      userMsg.style.borderRadius = '4px';
      userMsg.style.maxWidth = '80%';
      userMsg.style.alignSelf = 'flex-end';
      messagesContainer.appendChild(userMsg);
      
      // Clear input
      input.value = '';
      
      // Scroll to bottom
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      
      // Here you would typically send the message to your backend
      // For now, we'll just simulate a response
      setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-message bot';
        botMsg.textContent = config.branding.welcomeText || 'Thanks for your message! How can I help you today?';
        botMsg.style.margin = '8px 0';
        botMsg.style.padding = '10px 12px';
        botMsg.style.background = '#f5f5f5';
        botMsg.style.borderRadius = '4px';
        botMsg.style.maxWidth = '80%';
        botMsg.style.alignSelf = 'flex-start';
        messagesContainer.appendChild(botMsg);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }, 1000);
    }
    
    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
    
    // Show the chat button after a short delay
    setTimeout(() => {
      chatBtn.style.opacity = '1';
      chatBtn.style.transform = 'scale(1)';
    }, 1000);
    
    // Apply position from config
    if (config.style.position === 'left') {
      chatBtn.style.right = 'auto';
      chatBtn.style.left = '30px';
    }
      
    } catch (e) {
      console.error('Failed to initialize chat widget:', e);
      // Show error message to user
      const errorMsg = document.createElement('div');
      errorMsg.style.cssText = 'position: fixed; bottom: 20px; right: 20px; background: #fef2f2; color: #dc2626; padding: 1rem; border-radius: 4px; max-width: 300px; z-index: 10000;';
      errorMsg.textContent = 'Sorry, we\'re having trouble loading the chat. Please refresh the page.';
      document.body.appendChild(errorMsg);
      
      // Log to error tracking service if available
      if (window.trackJs) {
        window.trackJs.track(e);
      }
    }
  } catch (e) {
    console.error('Chat widget initialization failed:', e);
    // Fallback error handling
    const errorMsg = document.createElement('div');
    errorMsg.style.cssText = 'position: fixed; bottom: 20px; right: 20px; background: #fef2f2; color: #dc2626; padding: 1rem; border-radius: 4px; max-width: 300px; z-index: 10000;';
    errorMsg.textContent = 'We apologize, but we\'re experiencing technical difficulties. Please try again later.';
    document.body.appendChild(errorMsg);
  }
})();

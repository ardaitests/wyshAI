/**
 * WyshAI Chat Widget for CRM Demo
 * 
 * This chat widget integrates with an n8n webhook to provide AI-powered chat functionality.
 * It's designed to match the behavior of the main WyshAI website's chat.
 * 
 * ===== N8N WEBHOOK INTEGRATION =====
 * 
 * REQUEST FORMAT (sent to webhook):
 * {
 *   message: string,           // The user's message or empty string for conversation start
 *   conversationId: string,    // Unique ID for the conversation session
 *   metadata: {
 *     source: string,          // "chat-widget" for this implementation
 *     timestamp: string,       // ISO 8601 timestamp
 *     pageUrl: string,         // URL of the current page
 *     userAgent: string,       // User's browser user agent
 *     chatStep: string         // Current step in chat flow ("initial" or "chatting")
 *   }
 * }
 * 
 * RESPONSE FORMAT (expected from webhook):
 * {
 *   output: string,            // The bot's response text (primary field)
 *   response?: string,         // Alternative field for response text
 *   message?: string,          // Another alternative field for response text
 *   chatStep?: string,         // Optional: Next step in chat flow
 *   userData?: object          // Optional: Additional user data
 * }
 * 
 * The webhook should return a 200 status code with the response object.
 * If the response cannot be parsed as JSON, an error will be shown to the user.
 * 
 * ===== END OF WEBHOOK DOCUMENTATION =====
 */

// Chat Widget Script - Original Version
(function() {
    // Create and inject styles
    const styles = `
        .n8n-chat-widget {
            --chat--color-primary: var(--n8n-chat-primary-color, #4f46e5);
            --chat--color-secondary: var(--n8n-chat-secondary-color, #4338ca);
            --chat--color-background: var(--n8n-chat-background-color, #ffffff);
            --chat--color-font: var(--n8n-chat-font-color, #1f2937);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .chat-widget-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(167, 139, 250, 0.8); /* Electric violet light with 80% opacity */
            z-index: 999;
            backdrop-filter: blur(2px);
        }
        
        .n8n-chat-widget .chat-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            left: 20px;
            z-index: 1000;
            display: none;
            width: auto;
            max-width: 380px;
            height: 600px;
            background: var(--chat--color-background);
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(133, 79, 255, 0.15);
            border: 1px solid rgba(133, 79, 255, 0.2);
            overflow: hidden;
            font-family: inherit;
            margin: 0 auto;
        }
        
        @media (min-width: 420px) {
            .n8n-chat-widget .chat-container {
                left: auto;
                right: 20px;
                width: 380px;
            }
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

        .n8n-chat-widget .typing-indicator {
            display: flex;
            align-items: center;
            padding: 12px 16px;
            margin: 8px 0;
            border-radius: 12px;
            max-width: 80%;
            background: var(--chat--color-background);
            border: 1px solid rgba(133, 79, 255, 0.2);
            align-self: flex-start;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .n8n-chat-widget .typing-indicator span {
            height: 8px;
            width: 8px;
            margin: 0 2px;
            background-color: var(--chat--color-primary);
            border-radius: 50%;
            display: inline-block;
            opacity: 0.4;
        }

        .n8n-chat-widget .typing-indicator span:nth-child(1) {
            animation: 1s pulse infinite;
        }

        .n8n-chat-widget .typing-indicator span:nth-child(2) {
            animation: 1s pulse infinite 0.2s;
        }

        .n8n-chat-widget .typing-indicator span:nth-child(3) {
            animation: 1s pulse infinite 0.4s;
        }

        @keyframes pulse {
            0% {
                opacity: 0.4;
                transform: scale(1);
            }
            50% {
                opacity: 1;
                transform: scale(1.2);
            }
            100% {
                opacity: 0.4;
                transform: scale(1);
            }
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
            font-size: 16px; /* Prevents iOS zoom */
            -webkit-text-size-adjust: 100%; /* Prevents text size adjustment on rotation */
            min-height: 44px; /* Minimum touch target size for better accessibility */
            line-height: 1.4; /* Better text readability */
            -webkit-appearance: none; /* Removes inner shadow on iOS */
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

    // Using Inter font which is already loaded in the main HTML
    // No need to load any additional fonts

    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Default configuration
    const defaultConfig = {
        webhook: {
            // n8n CLOUD HOSTED WEBHOOK URL
            // url: 'https://areed.app.n8n.cloud/webhook/chat-webhook',   
            // Hostinger VPS HOSTED WEBHOOK URL
            url: 'https://n8n.srv893741.hstgr.cloud/webhook/chat-webhook',
            route: 'general',
            allowFileUpload: true  // Set to true to allow file uploads
        },
        branding: {
            logo: '/demos/images/Icon-wyshAI-dark.png',
            name: 'wyshAI Assistant',
            welcomeText: 'Hello! How can I help you today?',
            poweredBy: {
                text: 'Powered by wyshAI',
                link: 'https://wyshai.com'
            }
        },
        style: {
            primaryColor: '#4f46e5',
            secondaryColor: '#4338ca',
            position: 'right',
            backgroundColor: '#ffffff',
            fontColor: '#333333'
        }
    };

    // Merge user config with defaults
    const config = window.ChatWidgetConfig ?
        {
            webhook: { ...defaultConfig.webhook, ...(window.ChatWidgetConfig.webhook || {}) },
            branding: { ...defaultConfig.branding, ...(window.ChatWidgetConfig.branding || {}) },
            style: { ...defaultConfig.style, ...(window.ChatWidgetConfig.style || {}) }
        } : defaultConfig;

    // Prevent multiple initializations
    if (window.N8NChatWidgetInitialized) return;
    window.N8NChatWidgetInitialized = true;

    let currentSessionId = '';

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'chat-widget-overlay';
    
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

    // No new conversation screen - we'll show the chat interface immediately

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

    chatContainer.innerHTML = chatInterfaceHTML;

    const toggleButton = document.createElement('button');
    toggleButton.className = `chat-toggle${config.style.position === 'left' ? ' position-left' : ''}`;
    toggleButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" fill="currentColor"/>
        </svg>`;

    widgetContainer.appendChild(chatContainer);
    widgetContainer.appendChild(toggleButton);
    document.body.appendChild(overlay);
    document.body.appendChild(widgetContainer);


    const chatInterface = chatContainer.querySelector('.chat-interface');
    const messagesContainer = chatContainer.querySelector('.chat-messages');
    const textarea = chatContainer.querySelector('textarea');
    const sendButton = chatContainer.querySelector('button[type="submit"]');

    function generateUUID() {
        return crypto.randomUUID();
    }

    function startNewConversation() {
        currentSessionId = `conv_${Date.now()}`; // Use timestamp-based ID to match main chat
        
        // Show welcome message without making a webhook call
        const welcomeMessage = config.branding.welcomeText || 'Hello! How can I help you today?';
        
        const botMessageDiv = document.createElement('div');
        botMessageDiv.className = 'chat-message bot';
        botMessageDiv.textContent = welcomeMessage;
        
        // Clear any previous messages and add welcome message
        messagesContainer.innerHTML = '';
        messagesContainer.appendChild(botMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    async function sendMessage(message) {
        // Match main website's format
        const messageData = {
            message: message,
            conversationId: currentSessionId,
            metadata: {
                source: "chat-widget",
                timestamp: new Date().toISOString(),
                pageUrl: window.location.href,
                userAgent: navigator.userAgent,
                chatStep: "chatting"
            }
        };

        // Add user message to chat
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'chat-message user';
        userMessageDiv.textContent = message;
        messagesContainer.appendChild(userMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        messagesContainer.appendChild(typingIndicator);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        try {
            const response = await fetch(config.webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(messageData)
            });

            // Remove typing indicator
            messagesContainer.removeChild(typingIndicator);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            let responseText = await response.text();
            let responseData;
            
            console.log('Raw response text:', responseText); // Log raw response
            console.log('Response headers:', Object.fromEntries([...response.headers])); // Log response headers
            
            try {
                // Try to parse as JSON
                responseData = responseText ? JSON.parse(responseText) : null;
                console.log('Parsed response data:', responseData);
            } catch (e) {
                console.error('Failed to parse JSON response. Error:', e);
                console.error('Response content type:', response.headers.get('content-type'));
                console.error('Response status:', response.status, response.statusText);
                throw new Error('Received invalid JSON response from server: ' + e.message);
            }
            
            // Debug log the response
            console.log('Raw response data:', responseData);
            
            // Handle both array and object responses
            let botResponse;
            if (Array.isArray(responseData)) {
                botResponse = responseData[0]?.response || 
                             responseData[0]?.output || 
                             responseData[0]?.message ||
                             'I apologize, but I encountered an error processing your request.';
            } else if (typeof responseData === 'object' && responseData !== null) {
                botResponse = responseData.response || 
                             responseData.output || 
                             responseData.message ||
                             (typeof responseData === 'string' ? responseData : 'I apologize, but I encountered an error processing your request.');
            } else if (typeof responseData === 'string') {
                botResponse = responseData;
            } else {
                botResponse = 'I apologize, but I received an unexpected response format.';
            }

            // Add bot response to chat
            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'chat-message bot';
            botMessageDiv.textContent = botResponse;
            messagesContainer.appendChild(botMessageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Event Listeners
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

    // Function to toggle chat
    const toggleChat = (isOpening) => {
        chatContainer.classList.toggle('open', isOpening);
        overlay.style.display = isOpening ? 'block' : 'none';
        document.body.style.overflow = isOpening ? 'hidden' : '';
        
        if (isOpening) {
            // Show chat interface immediately
            chatInterface.classList.add('active');
            textarea.focus();
            
            // Only start a new conversation if we haven't already
            if (messagesContainer.children.length === 0) {
                startNewConversation();
            }
        }
    };
    
    // Toggle chat on button click
    toggleButton.addEventListener('click', () => {
        const isOpening = !chatContainer.classList.contains('open');
        toggleChat(isOpening);
    });
    
    // Close chat when clicking overlay
    overlay.addEventListener('click', () => {
        toggleChat(false);
    });

    // Add close button handlers
    const closeButtons = chatContainer.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleChat(false);
        });
    });

    // Expose public API
    window.ChatWidget = {
        open: () => {
            const isOpening = !chatContainer.classList.contains('open');
            toggleChat(true);
        },
        close: () => {
            toggleChat(false);
        },
        sendMessage: (message) => {
            if (typeof message === 'string' && message.trim()) {
                if (!chatInterface.classList.contains('active')) {
                    chatInterface.classList.add('active');
                    startNewConversation().then(() => {
                        // Wait for the welcome message before sending the user's message
                        setTimeout(() => sendMessage(message), 100);
                    });
                } else {
                    sendMessage(message);
                }
            }
        }
    };
    
    // Alias for backward compatibility
    window.openChatWidget = window.ChatWidget.open;
})();

// Initialize chat widget when document is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('Chat widget initialized');
    });
} else {
    console.log('Chat widget initialized (document already ready)');
}

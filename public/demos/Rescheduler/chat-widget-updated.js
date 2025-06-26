// Chat Widget Script - Updated to match wyshai.com implementation
(function() {
    // Configuration
    const config = window.ChatWidgetConfig || {};
    const webhookUrl = config.webhook?.url || '';
    
    // State
    let currentConversationId = localStorage.getItem('wysh_conversation_id');
    let isSending = false;
    
    // DOM Elements
    let chatContainer, messagesContainer, textarea, sendButton, toggleButton;
    
    // Initialize the chat widget
    function initChatWidget() {
        createChatInterface();
        setupEventListeners();
        
        // Expose public methods
        window.ChatWidget = {
            open: openChat,
            close: closeChat,
            sendMessage: sendChatMessage
        };
    }
    
    // Create the chat interface
    function createChatInterface() {
        // Create container if it doesn't exist
        if (!document.getElementById('chat-widget-container')) {
            const container = document.createElement('div');
            container.id = 'chat-widget-container';
            container.className = 'chat-widget-container';
            container.innerHTML = `
                <div class="chat-widget-toggle" id="chat-widget-toggle">
                    <i class="fas fa-comment-dots"></i>
                    <span>Chat with us</span>
                </div>
                <div class="chat-widget-window" id="chat-widget-window">
                    <div class="chat-widget-header">
                        <div class="chat-widget-brand">
                            <img src="${config.branding?.logo || ''}" alt="${config.branding?.name || 'Chat'}">
                            <span>${config.branding?.name || 'Chat Assistant'}</span>
                        </div>
                        <button class="chat-widget-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="chat-widget-messages" id="chat-widget-messages">
                        <div class="chat-message message-system">
                            <p>${config.branding?.welcomeText || 'Hello! How can I help you today?'}</p>
                        </div>
                    </div>
                    <div class="chat-widget-input">
                        <textarea 
                            id="chat-widget-textarea" 
                            placeholder="Type your message..." 
                            rows="1"
                        ></textarea>
                        <button id="chat-widget-send">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(container);
            
            // Cache DOM elements
            chatContainer = document.getElementById('chat-widget-container');
            messagesContainer = document.getElementById('chat-widget-messages');
            textarea = document.getElementById('chat-widget-textarea');
            sendButton = document.getElementById('chat-widget-send');
            toggleButton = document.getElementById('chat-widget-toggle');
            
            // Apply custom styles
            applyCustomStyles();
        }
    }
    
    // Apply custom styles based on config
    function applyCustomStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes typing-animation {
                0%, 60%, 100% { transform: translateY(0); }
                30% { transform: translateY(-5px); }
            }

            .chat-widget-container {
                --primary-color: #7c3aed;  /* Medium purple */
                --primary-light: #8b5cf6;  /* Lighter purple */
                --primary-dark: #5b21b6;   /* Darker purple */
                --secondary-color: #6d28d9;  /* Slightly darker purple */
                --gradient-start: #7c3aed;  /* Start of gradient */
                --gradient-end: #5b21b6;   /* End of gradient */
                --hover-gradient-start: #8b5cf6;  /* Start of hover gradient */
                --hover-gradient-end: #7c3aed;   /* End of hover gradient */
                --background-color: #ffffff;  /* White background */
                --message-bg: #f9fafb;  /* Light gray for assistant messages */
                --user-message-bg: #7c3aed;  /* Purple for user messages */
                --font-color: #1f2937;  /* Dark gray for text */
                --border-radius: 12px;
                --shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
                --border-color: #e5e7eb;  /* Light gray for borders */
            }
            
            .chat-widget-toggle {
                position: fixed !important;
                bottom: 20px !important;
                right: 20px !important;
                background: var(--primary-color) !important;
                background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%) !important;
                color: white !important;
                border: none !important;
                border-radius: 30px !important;
                padding: 12px 24px !important;
                display: flex !important;
                align-items: center !important;
                gap: 8px !important;
                cursor: pointer !important;
                box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3) !important;
                z-index: 9999 !important;
                font-weight: 600 !important;
                transition: all 0.2s ease !important;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
                font-size: 14px !important;
            }
            
            .chat-widget-toggle:hover {
                transform: translateY(-2px) !important;
                box-shadow: 0 6px 20px rgba(124, 58, 237, 0.4) !important;
                background: linear-gradient(135deg, var(--hover-gradient-start) 0%, var(--hover-gradient-end) 100%) !important;
            }
            
            .chat-widget-window {
                position: fixed;
                bottom: 80px;
                right: 20px;
                width: 380px;
                height: 600px;
                background: #ffffff;
                border-radius: 16px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
                display: flex;
                flex-direction: column;
                overflow: hidden;
                z-index: 9998;
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                visibility: hidden;
                border: 1px solid #e5e7eb;
            }
            
            .chat-widget-messages {
                flex: 1;
                padding: 16px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 12px;
                background: #ffffff;
            }
            
            .chat-message {
                max-width: 80%;
                padding: 12px 16px;
                border-radius: 16px;
                line-height: 1.4;
                position: relative;
                animation: messageAppear 0.2s ease-out;
            }
            
            .message-user {
                align-self: flex-end;
                background: var(--user-message-bg);
                color: white;
                border-bottom-right-radius: 4px;
                margin-left: auto;
            }
            
            .message-assistant {
                align-self: flex-start;
                background: var(--message-bg);
                color: var(--font-color);
                border-bottom-left-radius: 4px;
                margin-right: auto;
            }
            
            .message-system {
                align-self: center;
                background: var(--message-bg);
                color: var(--font-color);
                border-radius: 16px;
                font-size: 0.9em;
                padding: 8px 12px;
                text-align: center;
                max-width: 90%;
            }
            
            .message-content {
                word-wrap: break-word;
            }
            
            @keyframes messageAppear {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .chat-widget-window.visible {
                opacity: 1;
                transform: translateY(0);
                visibility: visible;
            }
            
            .chat-widget-header {
                padding: 16px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            }
            
            .chat-widget-brand {
                display: flex;
                align-items: center;
                gap: 10px;
                font-weight: 600;
                font-size: 16px;
                color: var(--font-color);
            }
            
            .chat-widget-brand img {
                width: 24px;
                height: 24px;
                border-radius: 4px;
            }
            
            .chat-widget-close {
                background: none;
                border: none;
                color: var(--font-color);
                opacity: 0.6;
                cursor: pointer;
                padding: 4px;
                font-size: 18px;
                transition: opacity 0.2s;
            }
            
            .chat-widget-close:hover {
                opacity: 1;
            }
            
            .chat-widget-messages {
                flex: 1;
                padding: 16px;
                overflow-y: auto;
                background: #ffffff;
                color: var(--font-color);
                font-size: 14px;
                line-height: 1.5;
            }
            
            .message-bot {
                align-self: flex-start;
                background: var(--message-bg);
                color: var(--font-color);
                border-radius: 18px 18px 18px 4px;
                margin-right: auto;
                border: 1px solid var(--border-color);
                font-size: 14px;
                line-height: 1.5;
                max-width: 85%;
            }
            
            .typing-indicator {
                display: flex;
                padding: 12px 16px;
                background: var(--message-bg);
                border-radius: 18px 18px 18px 4px;
                width: fit-content;
                margin: 4px 0;
                align-items: center;
                height: 48px;
                gap: 6px;
            }
            
            .typing-indicator .typing-dot {
                display: inline-block;
                width: 8px;
                height: 8px;
                background-color: var(--primary-color);
                border-radius: 50%;
                opacity: 0.7;
                transform: translateY(0);
            }
            
            @keyframes typing-animation {
                0%, 60%, 100% { transform: translateY(0); }
                30% { transform: translateY(-5px); }
            }
            
            .chat-widget-input {
                padding: 12px 16px;
                border-top: 1px solid rgba(0, 0, 0, 0.05);
                display: flex;
                gap: 8px;
                align-items: flex-end;
            }
            
            .chat-widget-input textarea {
                flex: 1;
                border: 1px solid #e5e7eb;
                border-radius: 20px;
                padding: 10px 16px;
                font-family: inherit;
                font-size: 14px;
                resize: none;
                max-height: 120px;
                outline: none;
                transition: all 0.2s;
            }
            
            .chat-widget-input textarea:focus {
                border-color: var(--primary-color);
                box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
            }
            
            #chat-widget-send {
                background: var(--gradient-start) !important;
                background: linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-end) 100%) !important;
                color: white !important;
                border: none !important;
                width: 40px !important;
                height: 40px !important;
                border-radius: 12px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                cursor: pointer !important;
                transition: all 0.2s !important;
                flex-shrink: 0 !important;
                margin-left: 8px !important;
            }
            
            #chat-widget-send:hover {
                background: var(--hover-gradient-start) !important;
                background: linear-gradient(135deg, var(--hover-gradient-start) 0%, var(--hover-gradient-end) 100%) !important;
                transform: translateY(-1px) !important;
                box-shadow: 0 2px 8px rgba(124, 58, 237, 0.2) !important;
            }
            
            #chat-widget-send:disabled {
                opacity: 0.5;
                cursor: not-allowed;
                transform: none;
            }
            
            @media (max-width: 480px) {
                .chat-widget-window {
                    width: 100%;
                    height: 100%;
                    bottom: 0;
                    right: 0;
                    border-radius: 0;
                    z-index: 10000; /* Ensure window is above toggle */
                }
                
                .chat-widget-toggle {
                    bottom: 20px;
                    right: 20px;
                    z-index: 9999; /* Below window when open */
                    transition: opacity 0.3s ease;
                }
                
                /* Hide toggle when chat is open on mobile */
                .chat-widget-window.visible + .chat-widget-toggle {
                    opacity: 0;
                    pointer-events: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Set up event listeners
    function setupEventListeners() {
        // Toggle chat window
        toggleButton?.addEventListener('click', toggleChat);
        
        // Close button
        document.querySelector('.chat-widget-close')?.addEventListener('click', closeChat);
        
        // Send message on button click
        sendButton?.addEventListener('click', handleSendMessage);
        
        // Send message on Enter (but allow Shift+Enter for new line)
        textarea?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
            }
        });
        
        // Auto-resize textarea
        textarea?.addEventListener('input', () => {
            textarea.style.height = 'auto';
            textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
        });
    }
    
    // Toggle chat window
    function toggleChat() {
        const chatWindow = document.getElementById('chat-widget-window');
        if (chatWindow) {
            const isOpening = !chatWindow.classList.contains('visible');
            chatWindow.classList.toggle('visible');
            if (isOpening) {
                textarea.focus();
                // Track chat opened event
                if (typeof gtag === 'function') {
                    gtag('event', 'chat_open', {
                        'event_category': 'engagement',
                        'event_label': 'Chat Widget',
                        'non_interaction': false
                    });
                } else if (window.dataLayer) {
                    window.dataLayer.push({
                        'event': 'chat_open',
                        'event_category': 'engagement',
                        'event_label': 'Chat Widget'
                    });
                }
            }
        }
    }
    
    // Open chat window
    function openChat() {
        const chatWindow = document.getElementById('chat-widget-window');
        if (chatWindow && !chatWindow.classList.contains('visible')) {
            chatWindow.classList.add('visible');
            textarea.focus();
            // Track chat opened event
            if (typeof gtag === 'function') {
                gtag('event', 'chat_open', {
                    'event_category': 'engagement',
                    'event_label': 'Chat Widget',
                    'non_interaction': false
                });
            } else if (window.dataLayer) {
                window.dataLayer.push({
                    'event': 'chat_open',
                    'event_category': 'engagement',
                    'event_label': 'Chat Widget'
                });
            }
        }
    }
    
    // Close chat window
    function closeChat() {
        const chatWindow = document.getElementById('chat-widget-window');
        if (chatWindow) {
            chatWindow.classList.remove('visible');
        }
    }
    
    // Handle sending a message
    async function handleSendMessage() {
        const message = textarea.value.trim();
        if (!message || isSending) return;
        
        // Add user message to chat
        addMessage('user', message);
        textarea.value = '';
        textarea.style.height = 'auto';
        
        // Show typing indicator
        const typingId = showTypingIndicator();
        isSending = true;
        
        try {
            // Get or create conversation ID
            if (!currentConversationId) {
                currentConversationId = `conv_${Date.now()}`;
                localStorage.setItem('wysh_conversation_id', currentConversationId);
            }
            
            // Prepare request data with only the required fields
            const requestData = {
                message: message,
                conversationId: currentConversationId
            };
            
            console.log('Sending message:', requestData);
            
            // Send to webhook
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Response:', data);
            
            // Handle response - check for output in the response
            if (data && data.output) {
                addMessage('bot', data.output);
            } else {
                console.error('Unexpected response format:', data);
                throw new Error('Invalid response format - missing output');
            }
            
        } catch (error) {
            console.error('Error sending message:', error);
            addMessage('bot', 'Sorry, I encountered an error. Please try again later.');
        } finally {
            // Remove typing indicator and re-enable input
            hideTypingIndicator(typingId);
            isSending = false;
        }
    }
    
    // Add a message to the chat
    function addMessage(sender, content) {
        const messagesContainer = document.getElementById('chat-widget-messages');
        if (!messagesContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message message-${sender}`;
        
        // Create message content with proper HTML structure
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = content;
        
        messageDiv.appendChild(messageContent);
        messagesContainer.appendChild(messageDiv);
        
        // Auto-scroll to bottom
        messagesContainer.scrollTo({
            top: messagesContainer.scrollHeight,
            behavior: 'smooth'
        });
    }
    
    // Show typing indicator with animation
    function showTypingIndicator() {
        const typingId = 'typing-' + Date.now();
        const typingDiv = document.createElement('div');
        typingDiv.id = typingId;
        typingDiv.className = 'chat-message message-bot';
        typingDiv.innerHTML = `
            <div class="typing-indicator">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            </div>
        `;
        
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Add animation class after a small delay to ensure the element is rendered
        setTimeout(() => {
            const dots = typingDiv.querySelectorAll('.typing-dot');
            dots.forEach((dot, index) => {
                dot.style.animation = `typing-animation 1.4s infinite ease-in-out ${index * 0.16}s`;
            });
        }, 10);
        
        return typingId;
    }
    
    // Hide typing indicator
    function hideTypingIndicator(id) {
        const typingElement = document.getElementById(id);
        if (typingElement) {
            typingElement.remove();
        }
    }
    
    // Send message programmatically
    function sendChatMessage(message) {
        if (typeof message === 'string' && message.trim()) {
            textarea.value = message.trim();
            handleSendMessage();
        }
    }
    
    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChatWidget);
    } else {
        initChatWidget();
    }
    
    // Expose init function
    window.initChatWidget = initChatWidget;
})();

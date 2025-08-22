// Chat Widget Script - Updated to match wyshai.com implementation
(function() {
    // Configuration
    const config = window.ChatWidgetConfig || {};
    const webhookUrl = 'https://areed.app.n8n.cloud/webhook/chat-webhook';
    
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
                        <div class="chat-widget-welcome">
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
                --background-color: ${config.style?.backgroundColor || '#ffffff'};
                --message-bg: #f9fafb;
                --user-message-bg: #7c3aed;
                /* Enable hardware acceleration for better performance */
                -webkit-transform: translateZ(0);
                transform: translateZ(0);
                /* Ensure proper touch handling */
                touch-action: manipulation;
                --font-color: ${config.style?.fontColor || '#1f2937'};
                --border-radius: 12px;
                --shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
                --border-color: #e5e7eb;
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                top: auto;
                width: 100%;
                max-width: 100%;
                height: auto;
                max-height: 100%;
                border-radius: 0;
                margin: 0;
                z-index: 1000;
            }
            
            /* Only apply pointer-events to the container when chat is closed */
            .chat-widget-container:not(.chat-visible) {
                pointer-events: none;
            }
            
            /* Ensure the chat window and its children always receive pointer events */
            /* Ensure chat window and its contents are interactive */
            .chat-widget-window {
                pointer-events: auto;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                -webkit-touch-callout: none;
                z-index: 1001; /* Ensure it's above any overlays */
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 80%;
                max-height: 600px;
                background: var(--background-color);
                border-radius: 12px 12px 0 0;
                box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.15);
                display: flex;
                flex-direction: column;
                overflow: hidden;
                opacity: 0;
                transform: translateY(100%);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                visibility: hidden;
                border: 1px solid var(--border-color);
                pointer-events: auto;
            }
            
            /* Make text input and textarea fully interactive */
            .chat-widget-input textarea,
            .chat-widget-input input[type="text"],
            .chat-widget-input button {
                pointer-events: auto !important;
                position: relative;
                z-index: 1002;
            }
            
            /* Make messages selectable */
            .chat-widget-messages,
            .chat-widget-messages * {
                user-select: text;
                -webkit-user-select: text;
                pointer-events: auto;
            }
            
            /* Improve button tap targets for mobile */
            .chat-widget-close,
            #chat-widget-send,
            #chat-widget-toggle {
                min-height: 44px;
                min-width: 44px;
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
                z-index: 1001 !important;
                font-weight: 600 !important;
                transition: all 0.2s ease !important;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
                font-size: 14px !important;
                pointer-events: auto !important;
            }
            
            .chat-widget-window.visible {
                opacity: 1;
                transform: translateY(0);
                visibility: visible;
            }
            
            .chat-widget-container .chat-widget-window.visible {
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
                background: var(--user-message-bg);
                background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
                color: white;
                border-radius: 18px 18px 4px 18px;
                margin-left: auto;
                box-shadow: 0 2px 8px rgba(124, 58, 237, 0.15);
                font-size: 14px;
                line-height: 1.5;
                max-width: 85%;
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
                position: relative;
                z-index: 9990;
                background: white;
                pointer-events: auto;
            }
            
            .chat-widget-container .chat-widget-input textarea {
                flex: 1;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                padding: 12px 16px;
                font-size: 16px;
                resize: none;
                outline: none;
                transition: border-color 0.2s;
                -webkit-text-size-adjust: 100%;
                min-height: 44px;
                line-height: 1.4;
                -webkit-appearance: none;
                transition: all 0.2s;
                background: white;
                position: relative;
                z-index: 9991;
                pointer-events: auto !important;
                -webkit-user-select: text;
                user-select: text;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
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
            
            @media (min-width: 420px) {
                .chat-widget-container {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    left: auto;
                    width: 380px;
                    height: 600px;
                    max-height: none;
                    border-radius: 12px;
                }
                
                .chat-widget-container .chat-widget-window {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    left: auto;
                    width: 100%;
                    height: 100%;
                    max-height: 100%;
                    border-radius: 12px;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Set up event listeners
    function setupEventListeners() {
        // Toggle chat window - handle both click and touch events
        if (toggleButton) {
            toggleButton.addEventListener('click', toggleChat);
            toggleButton.addEventListener('touchend', (e) => {
                e.preventDefault();
                toggleChat();
            }, { passive: false });
        }
        
        // Handle all interactions with event delegation
        const handleInteraction = (e) => {
            const target = e.target;
            
            // Handle touch events
            if (e.type === 'touchend') {
                e.preventDefault();
            }
            
            // Close button
            if (target.closest('.chat-widget-close')) {
                closeChat();
                return;
            }
            
            // Send button
            if (target.closest('#chat-widget-send')) {
                handleSendMessage();
                return;
            }
            
            // Click outside to close (only for click events, not touch)
            if (e.type === 'click') {
                const chatWindow = document.querySelector('.chat-widget-window');
                if (chatWindow && chatWindow.classList.contains('visible') && 
                    !target.closest('.chat-widget-window') && 
                    !target.closest('#chat-widget-toggle')) {
                    closeChat();
                }
            }
        };
        
        // Add event listeners for both click and touch events
        document.addEventListener('click', handleInteraction);
        document.addEventListener('touchend', handleInteraction, { passive: false });
        
        // Handle text input
        if (textarea) {
            // Send message on Enter (but allow Shift+Enter for new line)
            textarea.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                }
            });
            
            // Auto-resize textarea
            textarea.addEventListener('input', () => {
                textarea.style.height = 'auto';
                textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
            });
            
            // Prevent iOS zoom on focus
            textarea.addEventListener('touchstart', (e) => {
                e.stopPropagation();
            }, { passive: true });
        }
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeChat();
            }
        });
    }
    
    // Toggle chat window
    function toggleChat() {
        const chatWindow = document.getElementById('chat-widget-window');
        if (!chatWindow) return;
        
        const isOpening = !chatWindow.classList.contains('visible');
        chatWindow.classList.toggle('visible');
        
        if (isOpening) {
            // Focus the textarea when opening
            if (textarea) {
                textarea.focus();
            }
            
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
        messageDiv.textContent = content;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
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
    
    // Expose the chat widget to the window object
    window.ChatWidget = {
        open: openChat,
        close: closeChat,
        sendMessage: sendChatMessage
    };
    
    // Alias for backward compatibility
    window.openChatWidget = openChat;
    
    // Expose init function
    window.initChatWidget = initChatWidget;
})();

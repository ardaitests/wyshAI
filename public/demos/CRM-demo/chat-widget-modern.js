// Modern Chat Widget with Webhook Support
const WyshChat = (function() {
    // DOM Elements
    let container;
    let widget;
    let toggleButton;
    let closeButton;
    let minimizeButton;
    let messagesContainer;
    let inputForm;
    let inputField;
    let sendButton;
    let typingIndicator;
    
    // State
    const state = {
        isOpen: false,
        isMinimized: false,
        isTyping: false,
        messages: []
    };
    
    // Configuration
    const config = {
        webhookUrl: window.ChatWidgetConfig?.webhook?.url || '',
        webhookRoute: window.ChatWidgetConfig?.webhook?.route || 'crm-demo',
        welcomeText: window.ChatWidgetConfig?.branding?.welcomeText || 'Hello! How can I help you today?',
        buttonText: window.ChatWidgetConfig?.branding?.buttonText || 'Chat with us',
        primaryColor: window.ChatWidgetConfig?.style?.primaryColor || 'hsl(256 56% 48%)',
        secondaryColor: window.ChatWidgetConfig?.style?.secondaryColor || 'hsl(256 84% 72%)',
        primaryLight: window.ChatWidgetConfig?.style?.primaryLight || 'hsl(256 92% 92%)',
        primaryLightest: window.ChatWidgetConfig?.style?.primaryLightest || 'hsl(256 92% 96%)',
        position: window.ChatWidgetConfig?.style?.position || 'right'
    };
    
    // Initialize the chat widget
    function init() {
        createElements();
        setupEventListeners();
        render();
        return WyshChat; // For method chaining
    }
    
    // Create DOM elements
    function createElements() {
        // Main container
        container = document.createElement('div');
        container.className = 'wysh-chat-container';
        container.style.setProperty('--primary-color', config.primaryColor);
        container.style.setProperty('--secondary-color', config.secondaryColor);
        container.style.setProperty('--position', config.position);
        
        // Toggle button (always visible)
        toggleButton = document.createElement('button');
        toggleButton.className = 'wysh-chat-toggle';
        toggleButton.setAttribute('aria-label', 'Open chat');
        toggleButton.innerHTML = '<i class="fas fa-comment-dots"></i>';
        
        // Chat widget
        widget = document.createElement('div');
        widget.className = 'wysh-chat-widget';
        widget.setAttribute('aria-hidden', 'true');
        
        // Header
        const header = document.createElement('div');
        header.className = 'wysh-chat-header';
        
        const title = document.createElement('h3');
        title.className = 'wysh-chat-title';
        title.textContent = config.buttonText;
        
        minimizeButton = document.createElement('button');
        minimizeButton.className = 'wysh-chat-minimize';
        minimizeButton.setAttribute('aria-label', 'Minimize chat');
        minimizeButton.innerHTML = '−';
        
        closeButton = document.createElement('button');
        closeButton.className = 'wysh-chat-close';
        closeButton.setAttribute('aria-label', 'Close chat');
        closeButton.innerHTML = '×';
        
        header.appendChild(title);
        header.appendChild(minimizeButton);
        header.appendChild(closeButton);
        
        // Messages container
        messagesContainer = document.createElement('div');
        messagesContainer.className = 'wysh-chat-messages';
        
        // Typing indicator
        typingIndicator = document.createElement('div');
        typingIndicator.className = 'wysh-chat-typing';
        typingIndicator.innerHTML = '• • •';
        typingIndicator.style.display = 'none';
        
        // Input area
        inputForm = document.createElement('form');
        inputForm.className = 'wysh-chat-form';
        
        const inputWrapper = document.createElement('div');
        inputWrapper.className = 'wysh-chat-input-wrapper';
        
        inputField = document.createElement('textarea');
        inputField.className = 'wysh-chat-input';
        inputField.placeholder = 'Type your message...';
        inputField.rows = 1;
        inputField.setAttribute('aria-label', 'Type your message');
        
        sendButton = document.createElement('button');
        sendButton.type = 'submit';
        sendButton.className = 'wysh-chat-send';
        sendButton.setAttribute('aria-label', 'Send message');
        sendButton.innerHTML = '<i class="fas fa-paper-plane"></i>';
        sendButton.disabled = true;
        
        inputWrapper.appendChild(inputField);
        inputWrapper.appendChild(sendButton);
        inputForm.appendChild(inputWrapper);
        
        // Assemble widget
        widget.appendChild(header);
        widget.appendChild(messagesContainer);
        widget.appendChild(typingIndicator);
        widget.appendChild(inputForm);
        
        container.appendChild(toggleButton);
        container.appendChild(widget);
        
        // Add to body
        document.body.appendChild(container);
    }
    
    // Set up event listeners
    function setupEventListeners() {
        // Toggle chat
        toggleButton.addEventListener('click', toggle);
        
        // Close button
        closeButton.addEventListener('click', close);
        
        // Minimize button
        minimizeButton.addEventListener('click', minimize);
        
        // Form submission
        inputForm.addEventListener('submit', handleSubmit);
        
        // Input field events
        inputField.addEventListener('input', handleInput);
        inputField.addEventListener('keydown', handleKeyDown);
        
        // Close on click outside
        document.addEventListener('click', handleClickOutside);
        
        // Handle window resize
        window.addEventListener('resize', handleResize);
    }
    
    // Event handlers
    function handleSubmit(e) {
        e.preventDefault();
        const message = inputField.value.trim();
        if (message) {
            addMessage('user', message);
            inputField.value = '';
            sendButton.disabled = true;
            adjustInputHeight();
            
            // Show typing indicator
            showTyping(true);
            
            // Simulate bot response after a delay
            if (config.webhookUrl) {
                sendToWebhook(message);
            } else {
                setTimeout(() => {
                    showTyping(false);
                    addMessage('bot', 'Thanks for your message! This is an automated response.');
                }, 1000);
            }
        }
    }
    
    function handleInput() {
        adjustInputHeight();
        sendButton.disabled = !inputField.value.trim();
    }
    
    function handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            inputForm.dispatchEvent(new Event('submit'));
        }
    }
    
    function handleClickOutside(e) {
        if (state.isOpen && !widget.contains(e.target) && !toggleButton.contains(e.target)) {
            minimize();
        }
    }
    
    function handleResize() {
        if (state.isOpen && !state.isMinimized) {
            scrollToBottom();
        }
    }
    
    // Webhook integration
    async function sendToWebhook(message) {
        try {
            const response = await fetch(config.webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message,
                    route: config.webhookRoute,
                    sessionId: getSessionId()
                })
            });
            
            const data = await response.json();
            showTyping(false);
            
            if (data.response) {
                addMessage('bot', data.response);
            } else {
                addMessage('bot', 'I received your message. How can I help you further?');
            }
        } catch (error) {
            console.error('Error sending message to webhook:', error);
            showTyping(false);
            addMessage('bot', 'Sorry, I encountered an error. Please try again later.');
        }
    }
    
    // Helper functions
    function getSessionId() {
        let sessionId = localStorage.getItem('wysh_chat_session_id');
        if (!sessionId) {
            sessionId = 'session-' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('wysh_chat_session_id', sessionId);
        }
        return sessionId;
    }
    
    function adjustInputHeight() {
        inputField.style.height = 'auto';
        inputField.style.height = Math.min(inputField.scrollHeight, 120) + 'px';
    }
    
    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    function showTyping(isTyping) {
        state.isTyping = isTyping;
        typingIndicator.style.display = isTyping ? 'block' : 'none';
        if (isTyping) {
            scrollToBottom();
        }
    }
    
    // Public methods
    function open() {
        state.isOpen = true;
        state.isMinimized = false;
        render();
        inputField.focus();
        
        // Add welcome message if first time
        if (!localStorage.getItem('wysh_chat_welcomed')) {
            localStorage.setItem('wysh_chat_welcomed', 'true');
            addMessage('bot', config.welcomeText);
        }
    }
    
    function close() {
        state.isOpen = false;
        render();
    }
    
    function toggle() {
        if (state.isOpen) {
            if (state.isMinimized) {
                state.isMinimized = false;
                render();
                inputField.focus();
            } else {
                minimize();
            }
        } else {
            open();
        }
    }
    
    function minimize() {
        if (state.isOpen) {
            state.isMinimized = !state.isMinimized;
            render();
        }
    }
    
    function addMessage(sender, content) {
        const messageElement = document.createElement('div');
        messageElement.className = `wysh-chat-message wysh-chat-message-${sender}`;
        messageElement.textContent = content;
        
        messagesContainer.appendChild(messageElement);
        state.messages.push({ sender, content, timestamp: new Date().toISOString() });
        
        if (state.isOpen && !state.isMinimized) {
            scrollToBottom();
        }
    }
    
    // Update the UI based on state
    function render() {
        // Update toggle button
        toggleButton.setAttribute('aria-expanded', state.isOpen && !state.isMinimized);
        
        // Update widget visibility
        widget.setAttribute('aria-hidden', !state.isOpen);
        widget.style.display = state.isOpen ? 'flex' : 'none';
        
        // Update minimized state
        if (state.isMinimized) {
            widget.classList.add('wysh-chat-minimized');
            messagesContainer.style.display = 'none';
            inputForm.style.display = 'none';
            typingIndicator.style.display = 'none';
        } else {
            widget.classList.remove('wysh-chat-minimized');
            messagesContainer.style.display = 'block';
            inputForm.style.display = 'block';
            if (state.isTyping) {
                typingIndicator.style.display = 'block';
            }
            scrollToBottom();
        }
    }
    
    // Public API
    return {
        init,
        open,
        close,
        toggle,
        minimize,
        addMessage
    };
})();

// Auto-initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => WyshChat.init());
} else {
    WyshChat.init();
}

// Configuration
const CONFIG = {
    API: {
        CLIENT_WEBHOOK: 'https://areed.app.n8n.cloud/webhook/scheduler-google',
        ADMIN_WEBHOOK: 'https://example.com/api/admin-webhook', // Replace with actual admin webhook URL
        TIMEOUT: 30000 // 30 seconds
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const chatTabs = document.querySelectorAll('.chat-tab');
    const chatWindow = document.getElementById('chat-window');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const typingIndicator = document.getElementById('typing-indicator');

    // Ensure all required elements exist
    if (!chatWindow || !chatMessages || !chatInput || !sendButton || !typingIndicator) {
        console.error('Required chat elements not found');
        return;
    }

    // Session management
    const sessionId = sessionStorage.getItem('chatSessionId') || `sess_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('chatSessionId', sessionId);

    // Chat state
    let activeChat = 'client';
    const chatHistory = {
        client: [],
        admin: []
    };

    // Welcome messages
    const welcomeMessages = {
        client: "Hello! I'm Preston's scheduling assistant. How can I help you today?",
        admin: "Hi Preston. You can manage and view calendar changes here."
    };

    // Initialize chats
    function initChats() {
        // Hide typing indicator by default
        typingIndicator.style.display = 'none';
        
        // Load chat history from localStorage if available
        const savedChats = localStorage.getItem('wyshaiChatHistory');
        if (savedChats) {
            try {
                const parsedChats = JSON.parse(savedChats);
                Object.assign(chatHistory, parsedChats);
            } catch (e) {
                console.error('Error parsing chat history:', e);
                // Initialize with welcome messages if there's an error
                addMessage('client', 'bot', welcomeMessages.client);
                addMessage('admin', 'bot', welcomeMessages.admin);
            }
        } else {
            // Add welcome messages
            addMessage('client', 'bot', welcomeMessages.client);
            addMessage('admin', 'bot', welcomeMessages.admin);
        }
        
        // Render the active chat
        renderChatHistory(activeChat);
        
        // Ensure input is focused
        chatInput.focus();
    }

    // Toggle between customer and admin chat
    function toggleChat(chatType) {
        if (chatType === activeChat) return;
        
        // Update active tab
        chatTabs.forEach(tab => {
            if (tab.dataset.tab === chatType) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        // Update active chat and re-render
        activeChat = chatType;
        renderChatHistory(chatType);
        
        // Update input placeholder based on active chat
        updateInputPlaceholder();
        
        // Focus the input
        chatInput.focus();
    }
    
    // Update input placeholder based on active chat
    function updateInputPlaceholder() {
        chatInput.placeholder = 'Your message...';
    }

    // Add a new message to the chat
    function addMessage(chatType, sender, text) {
        const message = {
            id: Date.now(),
            sender,
            text,
            timestamp: new Date().toISOString()
        };
        
        chatHistory[chatType].push(message);
        
        // If this is a user message in client chat, also add it to admin chat
        if (chatType === 'client' && sender === 'user') {
            const adminMessage = { ...message, isClientMessage: true };
            chatHistory.admin.push(adminMessage);
        }
        
        // Save to localStorage
        saveChatHistory();
        
        // If the message is for the currently active chat, render it
        if (chatType === activeChat) {
            renderMessage(message);
            scrollToBottom();
        }
        
        return message;
    }
    
    // Render a single message
    function renderMessage(message) {
        if (!message || !chatMessages) return null;
        
        try {
            // Create message element
            const messageElement = document.createElement('div');
            const isBot = message.sender === 'bot';
            messageElement.className = `message ${isBot ? 'message-bot' : 'message-user'}`;
            
            // Format the time
            const timeString = new Date(message.timestamp).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true
            });
            
            // Set the message HTML
            messageElement.innerHTML = `
                <div class="message-content">
                    <div class="message-text">${formatMessage(message.text || '')}</div>
                    <div class="message-time">${timeString}</div>
                </div>
            `;
            
            // Add to the messages container
            chatMessages.appendChild(messageElement);
            
            // Scroll to bottom after adding message
            setTimeout(scrollToBottom, 10);
            
            return messageElement;
        } catch (error) {
            console.error('Error rendering message:', error);
            return null;
        }
    }
    
    // Render chat history for the specified chat type
    function renderChatHistory(chatType) {
        if (!chatMessages) return;
        
        // Clear the messages container
        chatMessages.innerHTML = '';
        
        // Get messages for the current chat type
        const messages = chatHistory[chatType] || [];
        
        // If no messages, add welcome message
        if (messages.length === 0) {
            const welcomeMessage = {
                id: Date.now(),
                sender: 'bot',
                text: welcomeMessages[chatType],
                timestamp: new Date().toISOString()
            };
            messages.push(welcomeMessage);
            chatHistory[chatType] = messages;
            saveChatHistory();
        }
        
        // Render all messages
        messages.forEach(message => {
            renderMessage(message);
        });
        
        // Ensure we scroll to bottom after rendering
        setTimeout(scrollToBottom, 50);
    }
    
    // Save chat history to localStorage
    function saveChatHistory() {
        localStorage.setItem('wyshaiChatHistory', JSON.stringify(chatHistory));
    }
    
    // Format message text (simple markdown)
    function formatMessage(text) {
        // Convert URLs to clickable links
        let formattedText = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
        
        // Simple markdown for bold and italic
        formattedText = formattedText
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // **bold**
            .replace(/\*(.*?)\*/g, '<em>$1</em>')              // *italic*
            .replace(/\n/g, '<br>');                           // Preserve line breaks
            
        return formattedText;
    }
    
    // Scroll to bottom of the chat
    function scrollToBottom() {
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
            // Force reflow to ensure scrolling works
            chatMessages.scrollIntoView(false);
        }
    }
    
    // Handle typing indicator state
    function setTyping(isTyping) {
        // This is a no-op since we're using loading bubbles instead
        // Keeping the function to prevent errors
    }
    
    // Get a random response for the bot
    function getRandomResponse(chatType) {
        if (chatType === 'customer') {
            const responses = [
                "I'll help you with that. What specific information do you need?",
                "Thanks for your message! I'm looking into this for you.",
                "I can help with that. Could you provide a few more details?",
                "I understand. Let me check the best way to assist you.",
                "Thanks for reaching out! I'll get back to you shortly with more information."
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        } else {
            return "Message received. How can I assist you further?";
        }
    }
    
    // Create a loading message bubble
    function createLoadingBubble() {
        const loadingId = 'loading-' + Date.now();
        const loadingElement = document.createElement('div');
        loadingElement.id = loadingId;
        loadingElement.className = 'message message-bot';
        loadingElement.innerHTML = `
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span>
                    <span style="animation-delay: 0.2s"></span>
                    <span style="animation-delay: 0.4s"></span>
                </div>
            </div>
        `;
        chatMessages.appendChild(loadingElement);
        scrollToBottom();
        return loadingId;
    }

    // Remove loading bubble
    function removeLoadingBubble(loadingId) {
        const loadingElement = document.getElementById(loadingId);
        if (loadingElement) {
            loadingElement.remove();
        }
    }

    // Send message to the appropriate API based on chat type
    async function sendToAPI(message, chatType = 'client') {
        let loadingId = null;
        
        try {
            // Show loading bubble
            loadingId = createLoadingBubble();
            
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), CONFIG.API.TIMEOUT);
            
            // Determine which webhook URL to use based on chat type
            const webhookUrl = chatType === 'client' 
                ? CONFIG.API.CLIENT_WEBHOOK 
                : CONFIG.API.ADMIN_WEBHOOK;
            
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                signal: controller.signal,
                body: JSON.stringify({
                    message: message.text,  // Using 'message' field for both client and admin
                    sessionId: sessionId,
                    timestamp: new Date().toISOString(),
                    chatType: chatType      // Include chat type in the payload
                })
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            
            const data = await response.json();
            
            // Remove loading bubble
            if (loadingId) removeLoadingBubble(loadingId);
            
            // Handle different response formats
            let responseMessage = 'I received your message.';
            
            if (typeof data === 'string') {
                // If the response is a string, use it directly
                responseMessage = data;
            } else if (data.response) {
                // If there's a response property, use that
                responseMessage = data.response;
            } else if (data.message) {
                // If there's a message property, use that
                responseMessage = data.message;
            } else if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
                // Handle OpenAI-style response format
                responseMessage = data.choices[0].message.content;
            } else if (data.answer) {
                // Some APIs use 'answer' for the response
                responseMessage = data.answer;
            } else if (data.text) {
                // Some APIs use 'text' for the response
                responseMessage = data.text;
            }
            
            // Add the bot's response to the chat
            addMessage(chatType, 'bot', responseMessage);
            
            return data;
            
        } catch (error) {
            console.error(`Error sending ${chatType} message to API:`, error);
            // Remove loading bubble on error
            if (loadingId) removeLoadingBubble(loadingId);
            
            // Add error message to the appropriate chat
            const errorMessage = error.name === 'AbortError'
                ? 'Request timed out. Please try again.'
                : 'Sorry, I encountered an error. Please try again.';
                
            addMessage(chatType, 'bot', errorMessage);
            throw error; // Re-throw to allow handling in the calling function
        } finally {
            setTyping(false);
        }
    }

    // Send message
    async function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;
        
        // Add user message to the active chat
        const userMessage = addMessage(activeChat, 'user', text);
        
        // Clear input
        chatInput.value = '';
        
        try {
            // For admin chat, simulate a response if no webhook is configured
            if (activeChat === 'admin' && CONFIG.API.ADMIN_WEBHOOK.includes('example.com')) {
                // Simulate admin response
                setTimeout(() => {
                    const response = getRandomResponse('admin');
                    addMessage('admin', 'bot', response);
                }, 1000);
                return;
            }
            
            // Send to API - the response handling is managed within sendToAPI
            await sendToAPI(userMessage, activeChat);
            
        } catch (error) {
            // Error message is already handled in sendToAPI
            console.error('Error in sendMessage:', error);
        } finally {
            setTyping(false);
        }
    }
    
    // Initialize event listeners
    function initEventListeners() {
        // Tab click handlers
        chatTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabType = tab.dataset.tab;
                if (tabType) {
                    toggleChat(tabType);
                }
            });
        });
        
        // Send button click handler
        sendButton.addEventListener('click', sendMessage);
        
        // Input keydown handler (Enter to send, Shift+Enter for new line)
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
        
        // Focus input when clicking on chat area
        chatWindow.addEventListener('click', () => {
            chatInput.focus();
        });
        
        // Handle window resize to ensure proper scrolling
        window.addEventListener('resize', scrollToBottom);
        
        // Initialize input placeholder
        updateInputPlaceholder();
    }
    
    // Initialize the app
    function init() {
        try {
            // Initialize chat functionality
            initChats();
            initEventListeners();
            
            // Set focus to chat input by default
            chatInput.focus();
            
            // Ensure messages are visible and scrolled to bottom
            setTimeout(() => {
                renderChatHistory(activeChat);
                scrollToBottom();
            }, 100);
            
            // Debug: Log initialization
            console.log('Chat initialized with active tab:', activeChat);
        } catch (error) {
            console.error('Error initializing chat:', error);
        }
    }
    
    // Start the app
    init();
});

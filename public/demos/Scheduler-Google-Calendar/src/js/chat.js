// Configuration
const CONFIG = {
    API: {
        CLIENT_WEBHOOK: 'https://n8n.srv893741.hstgr.cloud/webhook/scheduler-google-client',
        ADMIN_WEBHOOK: 'https://n8n.srv893741.hstgr.cloud/webhook/scheduler-google-admin',
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
    let sessionId = sessionStorage.getItem('chatSessionId') || `sess_${Math.random().toString(36).substr(2, 9)}`;
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

    // Add welcome messages if chat history is empty
    function addWelcomeMessages() {
        // Check if we already have welcome messages
        const hasClientWelcome = chatHistory.client.some(msg => 
            msg.sender === 'bot' && msg.text === welcomeMessages.client
        );
        const hasAdminWelcome = chatHistory.admin.some(msg => 
            msg.sender === 'bot' && msg.text === welcomeMessages.admin
        );
        
        // Only add welcome messages if they don't already exist
        if (!hasClientWelcome) {
            const welcomeMsg = {
                id: `welcome_${Date.now()}`,
                sender: 'bot',
                text: welcomeMessages.client,
                timestamp: new Date().toISOString(),
                formattedText: formatMessage(welcomeMessages.client)
            };
            chatHistory.client.unshift(welcomeMsg);
        }
        
        if (!hasAdminWelcome) {
            const welcomeMsg = {
                id: `welcome_admin_${Date.now()}`,
                sender: 'bot',
                text: welcomeMessages.admin,
                timestamp: new Date().toISOString(),
                formattedText: formatMessage(welcomeMessages.admin)
            };
            chatHistory.admin.unshift(welcomeMsg);
        }
        
        // Save after adding welcome messages
        saveChatHistory();
    }

    // Initialize chats
    function initChats() {
        // Hide typing indicator by default
        typingIndicator.style.display = 'none';
        
        // Load chat history from localStorage if available
        const savedChats = localStorage.getItem('wyshaiChatHistory');
        if (savedChats) {
            try {
                const parsedChats = JSON.parse(savedChats);
                // Only assign if we have valid data
                if (Array.isArray(parsedChats.client) && Array.isArray(parsedChats.admin)) {
                    chatHistory.client = parsedChats.client;
                    chatHistory.admin = parsedChats.admin;
                }
            } catch (e) {
                console.error('Error parsing chat history:', e);
                // Clear invalid data
                localStorage.removeItem('wyshaiChatHistory');
            }
        }
        
        // Add welcome messages if needed
        addWelcomeMessages();
        
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
    function addMessage(chatType, sender, text, skipSave = false) {
        const timestamp = new Date().toISOString();
        const message = {
            id: `msg_${Date.now()}`,
            sender,
            text,
            timestamp,
            formattedText: formatMessage(text)
        };
        
        // Add to chat history
        chatHistory[chatType].push(message);
        
        // Save to localStorage unless skipped (for initial messages)
        if (!skipSave) {
            saveChatHistory();
        }
        
        // If this is the active chat, render the message
        if (chatType === activeChat) {
            const messageElement = renderMessage(message);
            chatMessages.appendChild(messageElement);
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
    
    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Debounced save chat history to localStorage
    const saveChatHistory = debounce(() => {
        try {
            localStorage.setItem('wyshaiChatHistory', JSON.stringify(chatHistory));
        } catch (e) {
            console.error('Error saving chat history:', e);
        }
    }, 500); // 500ms debounce time
    
    // Format message text with basic XSS protection
    function formatMessage(text) {
        if (typeof text !== 'string') return '';
        
        // Basic HTML escaping
        const escapeHtml = (unsafe) => {
            return unsafe
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        };
        
        // First escape all HTML
        let safeText = escapeHtml(text);
        
        // Then process markdown patterns (only after escaping)
        safeText = safeText
            .replace(/\*\*([^*]+?)\*\*/g, '<strong>$1</strong>')  // **bold**
            .replace(/\*([^*]+?)\*/g, '<em>$1</em>')              // *italic*
            .replace(/\n/g, '<br>')                               // Preserve line breaks
            .replace(/(https?:\/\/[^\s<]+)/g, (url) => {           // Convert URLs to links
                // Only allow http/https protocols
                if (url.match(/^https?:\/\//)) {
                    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
                }
                return url;
            });
            
        return safeText;
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

    // Get a mock response for development
    function getMockResponse(chatType) {
        const responses = MOCK_RESPONSES[chatType] || MOCK_RESPONSES.client;
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Send message to the appropriate API based on chat type
    async function sendToAPI(message, chatType = 'client') {
        let loadingId = null;
        
        try {
            // Show loading bubble
            loadingId = createLoadingBubble();
            
            // Use mock response in development
            if (CONFIG.API.USE_MOCK || !CONFIG.API.CLIENT_WEBHOOK) {
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
                const responseText = getMockResponse(chatType);
                
                // Remove loading bubble
                if (loadingId) removeLoadingBubble(loadingId);
                
                // Add bot response
                addMessage(chatType, 'bot', responseText);
                return;
            }
            
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), CONFIG.API.TIMEOUT);
            
            // Determine which webhook URL to use based on chat type
            const webhookUrl = chatType === 'client' 
                ? CONFIG.API.CLIENT_WEBHOOK 
                : CONFIG.API.ADMIN_WEBHOOK;
            
            if (!webhookUrl) {
                throw new Error('No webhook URL configured for ' + chatType + ' chat');
            }
            
            console.log('Sending request to:', webhookUrl);
            const requestData = {
                message: message.text,
                sessionId: sessionId,
                timestamp: new Date().toISOString(),
                chatType: chatType
            };
            console.log('Request data:', JSON.stringify(requestData, null, 2));
            
            // Validate webhook URL
            if (!webhookUrl || !webhookUrl.startsWith('http')) {
                throw new Error(`Invalid webhook URL: ${webhookUrl}`);
            }
            
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                signal: controller.signal,
                body: JSON.stringify(requestData)
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API request failed with status ${response.status}: ${errorText}`);
            }
            
            // Get the raw response text
            const responseText = await response.text();
            console.log('Raw response:', responseText);
            
            // Check for empty response
            if (!responseText || responseText.trim() === '') {
                if (loadingId) removeLoadingBubble(loadingId);
                addMessage(chatType, 'bot', "I'm sorry. I didn't understand. Please be more specific.");
                return { response: "I'm sorry. I didn't understand. Please be more specific." };
            }
            
            // Try to parse the response as JSON, but handle non-JSON responses
            let data;
            try {
                data = JSON.parse(responseText);
                console.log('Parsed response data:', data);
            } catch (e) {
                console.warn('Response was not valid JSON, using as plain text');
                // If it's not JSON, use the raw text as the response
                if (loadingId) removeLoadingBubble(loadingId);
                addMessage(chatType, 'bot', responseText);
                return { response: responseText };
            }
            
            // Remove loading bubble
            if (loadingId) removeLoadingBubble(loadingId);
            
            // Handle different response formats
            let responseMessage = 'Thank you for your message. I\'ll get back to you shortly.';
            
            if (typeof data === 'string') {
                console.log('Using string response');
                responseMessage = data;
            } else if (data && typeof data === 'object') {
                console.log('Processing object response:', Object.keys(data));
                
                if (data.response) {
                    console.log('Found response in data.response');
                    responseMessage = data.response;
                } else if (data.message) {
                    console.log('Found response in data.message');
                    responseMessage = data.message;
                } else if (data.choices?.[0]?.message?.content) {
                    console.log('Found OpenAI-style response');
                    responseMessage = data.choices[0].message.content;
                } else if (data.answer) {
                    console.log('Found response in data.answer');
                    responseMessage = data.answer;
                } else if (data.text) {
                    console.log('Found response in data.text');
                    responseMessage = data.text;
                } else {
                    console.log('No recognized response format, using default message');
                    console.log('Available keys:', Object.keys(data));
                }
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
                : `Error: ${error.message || 'Failed to send message'}`;
                
            addMessage(chatType, 'bot', errorMessage);
            throw error;
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
    
        // Function to reset session
    function resetSession() {
        // Generate new session ID
        const newSessionId = `sess_${Math.random().toString(36).substr(2, 9)}`;
        sessionId = newSessionId;
        
        // Clear chat history
        chatHistory.client = [];
        chatHistory.admin = [];
        
        // Clear localStorage
        localStorage.removeItem('wyshaiChatHistory');
        
        // Add welcome messages
        addWelcomeMessages();
        
        // Reset UI
        renderChatHistory(activeChat);
        
        console.log('Session reset with new ID:', newSessionId);
    }

    // Make resetSession available globally
    window.resetChatSession = resetSession;
    
    // Start the app
    init();
});

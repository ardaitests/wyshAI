// Mock responses for development
const MOCK_RESPONSES = {
    client: [
        "I can help you schedule an appointment. What date works best for you?",
        "I have availability on Monday at 2 PM or Wednesday at 11 AM. Which would you prefer?",
        "Your appointment has been scheduled for Wednesday at 11 AM. You'll receive a confirmation email shortly.",
        "Is there anything else I can help you with today?"
    ],
    admin: [
        "As an admin, you can manage appointments and settings. What would you like to do?",
        "Here are the upcoming appointments for this week: [Appointment List]",
        "The settings have been updated successfully.",
        "Is there anything else you'd like to manage?"
    ]
};

// Configuration
const CONFIG = {
    API: {
        // Always use the production webhook URL
        CLIENT_WEBHOOK: 'https://n8n.srv893741.hstgr.cloud/webhook/scheduler-google-client',
        ADMIN_WEBHOOK: 'https://n8n.srv893741.hstgr.cloud/webhook/scheduler-google-admin',
            
        TIMEOUT: 30000, // 30 seconds
        
        // Always use real API (disable mock responses)
        IS_DEVELOPMENT: false,
        USE_MOCK: false
    }
};

// Log configuration for debugging
console.log('API Configuration:', {
    CLIENT_WEBHOOK: CONFIG.API.CLIENT_WEBHOOK,
    ADMIN_WEBHOOK: CONFIG.API.ADMIN_WEBHOOK,
    IS_DEVELOPMENT: CONFIG.API.IS_DEVELOPMENT,
    USE_MOCK: CONFIG.API.USE_MOCK
});

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
        
        // Store current scroll position
        const previousScroll = window.scrollY;
        
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
        
        // Restore scroll position
        window.scrollTo(0, previousScroll);
        
        // Focus the input after a small delay
        setTimeout(() => {
            chatInput.focus();
            
            // For mobile viewport adjustment
            if ('virtualKeyboard' in navigator) {
                // For browsers that support the VirtualKeyboard API
                navigator.virtualKeyboard.show();
            }
        }, 10);
    }
    
    // Update input placeholder based on active chat
    function updateInputPlaceholder() {
        chatInput.placeholder = 'Your message...';
    }

    // Add a new message to the chat
    function addMessage(chatType, sender, text, skipSave = false) {
        if (!text || !chatType) return;
        
        // Create message object
        const message = {
            id: Date.now(),
            sender: sender,
            text: text,
            timestamp: new Date().toISOString()
        };
        
        // Add to chat history
        if (!chatHistory[chatType]) {
            chatHistory[chatType] = [];
        }
        chatHistory[chatType].push(message);
        
        // Save to localStorage (debounced)
        if (!skipSave) {
            saveChatHistory();
        }
        
        // If this is the active chat, render the message
        if (chatType === activeChat && chatMessages) {
            const messageElement = renderMessage(message);
            if (messageElement) {
                chatMessages.appendChild(messageElement);
                
                // Always scroll to show new messages, with a slight delay to allow rendering
                setTimeout(() => {
                    scrollToBottom('smooth');
                    
                    // Additional check after a short delay to ensure the message is fully rendered
                    setTimeout(() => {
                        const messageBottom = messageElement.offsetTop + messageElement.offsetHeight;
                        const messagesBottom = chatMessages.scrollTop + chatMessages.clientHeight;
                        
                        // If the message is not fully visible, scroll to show it
                        if (messageBottom > messagesBottom) {
                            chatMessages.scrollTop = messageBottom - chatMessages.clientHeight + 80; // Add some extra space
                        }
                    }, 50);
                }, 10);
            }
        }
        
        return message;
    }
    
    // Render a single message
    function renderMessage(message) {
        if (!message) return null;
        
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
            
            return messageElement;
        } catch (error) {
            console.error('Error rendering message:', error);
            return null;
        }
    }
    
    // Render chat history for the specified chat type
    function renderChatHistory(chatType) {
        if (!chatMessages) return;
        
        // Store scroll position if we're just adding new messages
        const wasNearBottom = chatMessages.scrollHeight - chatMessages.clientHeight <= chatMessages.scrollTop + 200;
        
        // Clear current messages
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
        
        // Create a document fragment for better performance
        const fragment = document.createDocumentFragment();
        
        // Render all messages into the fragment
        messages.forEach(message => {
            const messageElement = renderMessage(message);
            if (messageElement) {
                fragment.appendChild(messageElement);
            }
        });
        
        // Append all messages at once
        chatMessages.appendChild(fragment);
        
        // Only scroll to bottom if we were near the bottom before rendering
        // or if this is a new chat with just a few messages
        if (wasNearBottom || messages.length < 5) {
            // Use smooth scrolling when loading chat history
            setTimeout(() => scrollToBottom('smooth'), 10);
        }
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
    function scrollToBottom(behavior = 'smooth') {
        if (!chatMessages) return;
        
        requestAnimationFrame(() => {
            try {
                // Calculate the target scroll position to show the full message
                const targetScroll = chatMessages.scrollHeight - chatMessages.clientHeight;
                const currentScroll = chatMessages.scrollTop;
                const scrollDistance = Math.abs(targetScroll - currentScroll);
                
                // Only animate if we're not already at the bottom
                if (scrollDistance > 100) {
                    chatMessages.scrollTo({
                        top: targetScroll,
                        behavior: behavior === 'smooth' ? 'smooth' : 'auto'
                    });
                } else {
                    // If we're close to the bottom, just snap to it without animation
                    chatMessages.scrollTop = targetScroll;
                }

                // On mobile, ensure the input is visible when keyboard is open
                const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                if (isMobile && chatInput) {
                    const inputRect = chatInput.getBoundingClientRect();
                    const isInputVisible = (
                        inputRect.top >= 0 &&
                        inputRect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
                    );
                    
                    if (!isInputVisible) {
                        // Scroll the window to make the input visible, with some padding
                        const scrollTo = Math.max(0, inputRect.top + window.scrollY - 20);
                        window.scrollTo({ 
                            top: scrollTo, 
                            behavior: behavior === 'smooth' ? 'smooth' : 'auto' 
                        });
                    }
                }
            } catch (error) {
                console.error('Error scrolling to bottom:', error);
                if (chatMessages) {
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }
            }
        });
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
        try {
            // Default to client responses if chatType is not found
            const defaultType = 'client';
            const responses = MOCK_RESPONSES[chatType] || MOCK_RESPONSES[defaultType];
            
            if (!responses || !Array.isArray(responses) || responses.length === 0) {
                console.warn(`No mock responses found for chat type: ${chatType}, using default`);
                return "I'm here to help! How can I assist you today?";
            }
            
            // Get a random response from the available ones
            const randomIndex = Math.floor(Math.random() * responses.length);
            return responses[randomIndex];
        } catch (error) {
            console.error('Error getting mock response:', error);
            return "I'm here to help! How can I assist you today?";
        }
    }

    // Show or hide the typing indicator
    function setTyping(isTyping) {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.style.display = isTyping ? 'flex' : 'none';
            if (isTyping) {
                // Scroll to bottom when typing starts to ensure indicator is visible
                setTimeout(() => scrollToBottom(), 100);
            }
        }
    }

    // Send message to the appropriate API based on chat type
    async function sendToAPI(message, chatType = 'client') {
        let loadingId = null;
        
        try {
            // Show loading bubble
            loadingId = createLoadingBubble();
            
            // Use mock response if configured
            if (CONFIG.API.USE_MOCK) {
                console.log('Using mock response as configured');
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
                chatType: chatType,
                source: 'wyshai-scheduler-demo',
                version: '1.0.0'
            };
            console.log('Request data:', JSON.stringify(requestData, null, 2));
            
            // Validate webhook URL
            if (!webhookUrl || !webhookUrl.startsWith('http')) {
                throw new Error(`Invalid webhook URL: ${webhookUrl}`);
            }
            
            // Prepare headers for the request
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Add any required CORS headers
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            };
            
            // Prepare fetch options
            const fetchOptions = {
                method: 'POST',
                headers: headers,
                mode: 'cors', // This is important for CORS requests
                cache: 'no-cache',
                credentials: 'omit', // Changed from 'same-origin' to 'omit' for CORS
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                signal: controller.signal,
                body: JSON.stringify(requestData)
            };
            
            console.log('Sending request with options:', JSON.stringify(fetchOptions, null, 2));
            
            let response;
            try {
                console.log('Sending request to:', webhookUrl);
                console.log('Request options:', JSON.stringify(fetchOptions, null, 2));
                
                // First, try a preflight OPTIONS request to check CORS
                try {
                    const preflightResponse = await fetch(webhookUrl, {
                        method: 'OPTIONS',
                        headers: {
                            'Access-Control-Request-Method': 'POST',
                            'Access-Control-Request-Headers': 'content-type',
                            'Origin': window.location.origin
                        },
                        mode: 'cors'
                    });
                    console.log('Preflight response status:', preflightResponse.status);
                } catch (preflightError) {
                    console.warn('Preflight request failed, but continuing with actual request:', preflightError);
                }
                
                // Make the actual request
                response = await fetch(webhookUrl, fetchOptions);
                clearTimeout(timeoutId);
                
                if (!response.ok) {
                    let errorText;
                    try {
                        errorText = await response.text();
                        console.error('API request failed with status:', response.status, 'Response:', errorText);
                    } catch (e) {
                        errorText = 'Could not parse error response';
                        console.error('API request failed with status:', response.status, 'Could not parse response');
                    }
                    
                    // Special handling for CORS errors
                    if (response.status === 0) {
                        throw new Error('CORS error: The request was blocked. Please check the server CORS configuration.');
                    }
                    
                    throw new Error(`API request failed with status ${response.status}: ${errorText}`);
                }
            } catch (error) {
                console.error('Error making API request:', error);
                if (loadingId) removeLoadingBubble(loadingId);
                
                let errorMessage = "I'm having trouble connecting to the server. ";
                
                // Provide more specific error messages for common issues
                if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                    errorMessage += "This might be due to a network issue or CORS restrictions. ";
                } else if (error.message.includes('CORS error')) {
                    errorMessage = error.message + " "; // Use the specific CORS error message
                }
                
                errorMessage += "Please try again in a moment or contact support if the problem persists.";
                
                addMessage(chatType, 'bot', errorMessage);
                return { error: error.message, details: error.stack };
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
            tab.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default anchor behavior
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
    
    // Helper function to format date and time
    function formatDateTime(dateTimeString) {
        if (!dateTimeString) return 'N/A';
        
        const date = new Date(dateTimeString);
        return date.toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
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

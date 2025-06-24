// Chat Widget with Image Upload - Simplified Version
(function() {
    'use strict';

    // Prevent multiple initializations
    if (window.__CHAT_WIDGET_LOADED) return;
    window.__CHAT_WIDGET_LOADED = true;

    console.log('Chat widget script loaded');

    // Configuration
    const config = window.ChatWidgetConfig || {
        webhook: {
            url: 'https://areed.app.n8n.cloud/webhook/f406671e-c954-4691-b39a-66c90aa2f103/chat',
            route: 'general'
        },
        branding: {
            logo: '/demos/images/Icon-wyshAI-dark.png',
            name: 'Treehouse Financial',
            welcomeText: 'Hi there! Let\'s find out how much your house is worth.',
            poweredBy: {
                text: 'Powered by Wysh AI',
                link: 'https://wyshai.com'
            }
        },
        style: {
            primaryColor: '#6D3BF7',
            secondaryColor: '#5D2BE6',
            position: 'right',
            backgroundColor: '#ffffff',
            fontColor: '#333333'
        }
    };

    // State
    let isOpen = false;
    let currentFile = null;
    let isLoading = false;

    // Create widget container
    const widget = document.createElement('div');
    widget.className = 'chat-widget';
    widget.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif;
        --primary: ${config.style.primaryColor};
        --secondary: ${config.style.secondaryColor};
        --bg: ${config.style.backgroundColor};
        --text: ${config.style.fontColor};
    `;

    // Toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'chat-toggle';
    toggleButton.innerHTML = '💬';
    toggleButton.style.cssText = `
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    // Chat container
    const chatContainer = document.createElement('div');
    chatContainer.className = 'chat-container';
    chatContainer.style.cssText = `
        position: absolute;
        bottom: 80px;
        right: 0;
        width: 360px;
        height: 600px;
        background: var(--bg);
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        display: ${isOpen ? 'flex' : 'none'};
        flex-direction: column;
        overflow: hidden;
    `;

    // Chat header
    const header = document.createElement('div');
    header.style.cssText = `
        padding: 16px;
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
    `;
    
    const headerTitle = document.createElement('div');
    headerTitle.textContent = config.branding.name;
    headerTitle.style.fontWeight = 'bold';
    
    const closeButton = document.createElement('button');
    closeButton.textContent = '×';
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    header.appendChild(headerTitle);
    header.appendChild(closeButton);

    // Messages container
    const messages = document.createElement('div');
    messages.className = 'messages';
    messages.style.cssText = `
        flex: 1;
        padding: 16px;
        overflow-y: auto;
    `;

    // Input area
    const inputArea = document.createElement('div');
    inputArea.style.cssText = `
        padding: 12px;
        border-top: 1px solid #eee;
        background: var(--bg);
    `;

    const messageInput = document.createElement('textarea');
    messageInput.placeholder = 'Type your message...';
    messageInput.style.cssText = `
        width: 100%;
        min-height: 44px;
        max-height: 120px;
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 8px;
        resize: none;
        margin-bottom: 8px;
        font-family: inherit;
    `;

    const buttonRow = document.createElement('div');
    buttonRow.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';

    const fileButton = document.createElement('button');
    fileButton.innerHTML = '📎';
    fileButton.style.cssText = `
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        padding: 4px 8px;
    `;

    const sendButton = document.createElement('button');
    sendButton.textContent = 'Send';
    sendButton.style.cssText = `
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        color: white;
        border: none;
        border-radius: 8px;
        padding: 8px 16px;
        cursor: pointer;
        font-weight: 500;
    `;

    // File preview
    const filePreview = document.createElement('div');
    filePreview.style.cssText = `
        margin-top: 8px;
        display: none;
    `;

    // Assemble the UI
    buttonRow.appendChild(fileButton);
    buttonRow.appendChild(sendButton);
    inputArea.appendChild(messageInput);
    inputArea.appendChild(buttonRow);
    inputArea.appendChild(filePreview);
    
    chatContainer.appendChild(header);
    chatContainer.appendChild(messages);
    chatContainer.appendChild(inputArea);
    
    widget.appendChild(chatContainer);
    widget.appendChild(toggleButton);
    
    // Add to body
    document.body.appendChild(widget);
    
    // Event Listeners
    toggleButton.addEventListener('click', toggleChat);
    closeButton.addEventListener('click', closeChat);
    sendButton.addEventListener('click', sendMessage);
    fileButton.addEventListener('click', () => fileInput.click());
    
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    fileInput.addEventListener('change', handleFileSelect);

    // Functions
    function toggleChat() {
        isOpen = !isOpen;
        chatContainer.style.display = isOpen ? 'flex' : 'none';
    }
    
    function closeChat() {
        isOpen = false;
        chatContainer.style.display = 'none';
    }
    
    function openChat() {
        isOpen = true;
        chatContainer.style.display = 'flex';
    }
    
    function addMessage(text, isUser = true) {
        const message = document.createElement('div');
        message.style.cssText = `
            margin-bottom: 12px;
            max-width: 80%;
            padding: 8px 12px;
            border-radius: 12px;
            word-wrap: break-word;
            align-self: ${isUser ? 'flex-end' : 'flex-start'};
            background: ${isUser ? 'var(--primary)' : '#f0f0f0'};
            color: ${isUser ? 'white' : 'var(--text)'};
        `;
        message.textContent = text;
        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;
    }
    
    function handleFileSelect(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        if (!file.type.match('image.*')) {
            alert('Please select an image file');
            return;
        }
        
        currentFile = file;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            filePreview.innerHTML = `
                <div style="position: relative; display: inline-block;">
                    <img src="${e.target.result}" style="max-width: 100%; max-height: 150px; border-radius: 4px;">
                    <button style="
                        position: absolute;
                        top: -10px;
                        right: -10px;
                        background: #ff4444;
                        color: white;
                        border: none;
                        border-radius: 50%;
                        width: 24px;
                        height: 24px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        padding: 0;
                        font-size: 14px;
                    " onclick="this.parentNode.remove(); currentFile = null;">×</button>
                </div>
            `;
            filePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
    
    async function sendMessage() {
        const text = messageInput.value.trim();
        if ((!text && !currentFile) || isLoading) return;
        
        // Add user message
        if (text) {
            addMessage(text, true);
            messageInput.value = '';
        }
        
        // Show loading state
        const loadingMessage = addMessage('Sending message...', false);
        
        try {
            const formData = new FormData();
            
            // Add text message if exists
            if (text) {
                formData.append('message', text);
            }
            
            // Add file if exists
            if (currentFile) {
                formData.append('file', currentFile);
                
                // Add image preview
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.maxWidth = '100%';
                    img.style.maxHeight = '200px';
                    img.style.borderRadius = '4px';
                    img.style.marginTop = '8px';
                    
                    const message = document.createElement('div');
                    message.style.cssText = `
                        margin-bottom: 12px;
                        max-width: 80%;
                        padding: 8px 12px;
                        border-radius: 12px;
                        word-wrap: break-word;
                        align-self: flex-end;
                        background: var(--primary);
                        color: white;
                    `;
                    message.appendChild(img);
                    messages.insertBefore(message, loadingMessage);
                    
                    // Clear file preview
                    filePreview.innerHTML = '';
                    filePreview.style.display = 'none';
                    fileInput.value = '';
                };
                reader.readAsDataURL(currentFile);
            }
            
            // Add route if exists
            if (config.webhook.route) {
                formData.append('route', config.webhook.route);
            }
            
            // Send to webhook
            const response = await fetch(config.webhook.url, {
                method: 'POST',
                body: formData,
                // Don't set Content-Type header - let the browser set it with the correct boundary
                headers: {}
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Remove loading message
            if (loadingMessage && loadingMessage.parentNode) {
                loadingMessage.parentNode.removeChild(loadingMessage);
            }
            
            // Add bot response
            if (data.response) {
                addMessage(data.response, false);
            } else {
                addMessage('Thank you for your message! How can I assist you further?', false);
            }
            
        } catch (error) {
            console.error('Error sending message:', error);
            
            // Update loading message to show error
            if (loadingMessage) {
                loadingMessage.textContent = 'Sorry, something went wrong. Please try again.';
                loadingMessage.style.color = '#ef4444';
                loadingMessage.style.fontStyle = 'italic';
                
                // Add retry button
                const retryButton = document.createElement('button');
                retryButton.textContent = 'Retry';
                retryButton.style.cssText = `
                    margin-top: 8px;
                    padding: 4px 12px;
                    background: var(--primary);
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                `;
                retryButton.onclick = sendMessage;
                loadingMessage.appendChild(document.createElement('br'));
                loadingMessage.appendChild(retryButton);
            }
        } finally {
            currentFile = null;
            isLoading = false;
        }
    }
    
    // Public API
    window.ChatWidget = {
        open: openChat,
        close: closeChat,
        isInitialized: () => true
    };
    
    // Auto-initialize
    console.log('Chat widget initialized');
    
})();

// Generate a unique session ID if one doesn't exist in sessionStorage
if (!sessionStorage.getItem('sessionId')) {
    sessionStorage.setItem('sessionId', 'sess_' + Math.random().toString(36).substr(2, 9));
}

const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sessionId = sessionStorage.getItem('sessionId');

// Simple Markdown parser for basic formatting
function parseMarkdown(text) {
    if (!text) return '';
    
    // Convert **bold** to <strong>bold</strong>
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert *italic* to <em>italic</em>
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Convert `code` to <code>code</code>
    text = text.replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>');
    
    // Convert URLs to links
    text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" class="text-primary-600 hover:underline">$1</a>');
    
    // Convert newlines to <br> tags
    text = text.replace(/\n/g, '<br>');
    
    return text;
}

// Function to scroll chat to bottom
function scrollToBottom() {
    const chatContainer = document.getElementById('chat-container');
    if (!chatContainer) return;
    
    // Function to perform the scroll
    const scroll = () => {
        try {
            // First try smooth scrolling
            chatContainer.scrollTo({
                top: chatContainer.scrollHeight,
                behavior: 'smooth'
            });
        } catch (e) {
            // Fallback to instant scroll
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    };
    
    // Try scrolling immediately
    scroll();
    
    // Try again after a short delay to ensure it works
    setTimeout(scroll, 50);
    
    // One more try after everything should be settled
    setTimeout(scroll, 200);
}

// Initialize chat when the page loads
window.addEventListener('DOMContentLoaded', () => {
    // Load session ID or create a new one
    if (!sessionStorage.getItem('sessionId')) {
        sessionStorage.setItem('sessionId', 'session-' + Date.now());
    }
    
    // Set focus to input field
    const input = document.getElementById('user-input');
    if (input) input.focus();
    
    // Initial scroll to bottom
    const scrollToBottomNow = () => {
        const chatContainer = document.getElementById('chat-container');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    };
    
    // Initial attempts to scroll to bottom
    scrollToBottomNow();
    setTimeout(scrollToBottomNow, 100);
    
    // Also scroll when window is resized
    window.addEventListener('resize', scrollToBottomNow);
});

// Initial greeting message
addMessage("Hello! I'm Preston's scheduling assistant. How can I help you today?", false);

function addMessage(message, isUser) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    const chatContainer = document.getElementById('chat-container');
    if (!chatContainer) return;
    
    // Always assume we want to scroll to bottom when adding a new message
    const wasAtBottom = true;
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `flex ${isUser ? 'justify-end' : 'justify-start'} w-full`;
    
    const messageBubble = document.createElement('div');
    messageBubble.className = `message p-4 rounded-xl shadow-md ${
        isUser 
            ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white' 
            : 'bg-white text-gray-700 border border-gray-100'
    }`;
    
    // Let the bubble size to its content with a reasonable max width
    messageBubble.style.display = 'inline-block';
    messageBubble.style.maxWidth = 'min(100%, 28rem)';
    
    const messageText = document.createElement('div');
    messageText.className = 'text-sm';
    messageText.innerHTML = parseMarkdown(message);
    
    messageBubble.appendChild(messageText);
    messageDiv.appendChild(messageBubble);    // Add to DOM
    chatMessages.appendChild(messageDiv);
    
    // Always scroll to bottom when adding a new message
    scrollToBottom();
    
    // Additional scroll attempts to ensure it works
    setTimeout(scrollToBottom, 50);
    setTimeout(scrollToBottom, 200);
}

function showTypingIndicator(show) {
    if (show) {
        // Scroll when showing typing indicator
        setTimeout(scrollToBottom, 10);
    }
    // Remove any existing typing indicator
    const existingTyping = document.getElementById('typing-indicator');
    if (existingTyping) {
        existingTyping.remove();
    }

    if (show) {
        // Create and show typing indicator in the chat flow
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'flex justify-start';
        
        const typingBubble = document.createElement('div');
        typingBubble.className = 'message bg-white p-4 rounded-xl shadow-md border border-gray-100';
        typingBubble.style.display = 'inline-block';
        typingBubble.style.minWidth = '4rem'; // Ensure it's not too narrow
        
        const typingContent = document.createElement('div');
        typingContent.className = 'typing-indicator flex space-x-1';
        typingContent.innerHTML = `
            <span class="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 0s"></span>
            <span class="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 0.2s"></span>
            <span class="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 0.4s"></span>
        `;
        
        typingBubble.appendChild(typingContent);
        typingDiv.appendChild(typingBubble);
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Add user message to chat
    addMessage(message, true);
    userInput.value = '';
    showTypingIndicator(true);

    try {
        // Send message with session ID
        const response = await fetch('https://areed.app.n8n.cloud/webhook/scheduler-google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                message,
                sessionId: sessionId,
                timestamp: new Date().toISOString()
            })
        });

        const data = await response.json();
        showTypingIndicator(false);
        
        if (data.message) {
            addMessage(data.message, false);
        } else {
            addMessage("I'm sorry, I couldn't process your request. Please try again.", false);
        }
    } catch (error) {
        console.error('Error:', error);
        showTypingIndicator(false);
        addMessage("I'm having trouble connecting to the server. Please check your connection and try again.", false);
    }
}

// Event Listeners
document.getElementById('send-button').addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

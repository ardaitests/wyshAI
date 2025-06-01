// ✅ WORKING CHAT WIDGET SCRIPT
(function () {
  // Load styles and font
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://cdn.jsdelivr.net/npm/geist@1.0.0/dist/fonts/geist-sans/style.css';
  document.head.appendChild(fontLink);

  const widgetContainer = document.createElement('div');
  widgetContainer.className = 'n8n-chat-widget';

  const chatContainer = document.createElement('div');
  chatContainer.className = 'chat-container';

  const chatInterfaceHTML = `
    <div class="new-conversation">
      <button class="new-chat-btn">Start a conversation</button>
    </div>
    <div class="chat-interface">
      <div class="chat-messages"></div>
      <div class="chat-input">
        <textarea placeholder="Type your message here..."></textarea>
        <button type="submit">Send</button>
      </div>
    </div>
  `;

  chatContainer.innerHTML = chatInterfaceHTML;
  widgetContainer.appendChild(chatContainer);
  document.body.appendChild(widgetContainer);

  const newChatBtn = chatContainer.querySelector('.new-chat-btn');
  const chatInterface = chatContainer.querySelector('.chat-interface');
  const messagesContainer = chatContainer.querySelector('.chat-messages');
  const textarea = chatContainer.querySelector('textarea');
  const sendButton = chatContainer.querySelector('button[type="submit"]');

  const WEBHOOK_URL = 'https://areed.app.n8n.cloud/webhook/603bd278-1f00-4963-8e24-34349b573ce4/chat';
  let currentSessionId = '';

  function generateSessionId() {
    return [...Array(32)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
  }

  async function startNewConversation() {
    currentSessionId = generateSessionId();
    const data = [{
      action: "loadPreviousSession",
      sessionId: currentSessionId,
      route: "general",
      metadata: { userId: "" }
    }];

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const raw = await response.text();
      let parsed;
      try {
        parsed = JSON.parse(raw);
      } catch (err) {
        console.error('❌ JSON parse failed:', err.message, raw);
        return;
      }

      chatInterface.classList.add('active');
      chatContainer.querySelector('.new-conversation').style.display = 'none';

      const msg = document.createElement('div');
      msg.className = 'chat-message bot';
      msg.textContent = Array.isArray(parsed) ? parsed[0].output : parsed.output;
      messagesContainer.appendChild(msg);
    } catch (err) {
      console.error('⚠️ Fetch error:', err);
    }
  }

  async function sendMessage(message) {
    const data = {
      action: "sendMessage",
      sessionId: currentSessionId,
      route: "general",
      chatInput: message,
      metadata: { userId: "" }
    };

    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message user';
    userMsg.textContent = message;
    messagesContainer.appendChild(userMsg);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      const botMsg = document.createElement('div');
      botMsg.className = 'chat-message bot';
      botMsg.textContent = Array.isArray(result) ? result[0].output : result.output;
      messagesContainer.appendChild(botMsg);
    } catch (err) {
      console.error('⚠️ Send message error:', err);
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
})();

import React, { useEffect } from 'react';
import ChatbotUI from '@/components/chatbot/ChatbotUI.minimal.jsx';
import useChatLogic from '@/components/chatbot/useChatLogic.jsx';
import { trackChatOpen } from '@/utils/analytics';

const Chatbot = () => {
  const chatLogic = useChatLogic();
  
  // Track when chat is opened
  useEffect(() => {
    if (chatLogic.isOpen) {
      const currentPath = window.location.pathname + window.location.search + window.location.hash;
      trackChatOpen(currentPath);
    }
  }, [chatLogic.isOpen]);
  
  return <ChatbotUI {...chatLogic} />;
};

export default Chatbot;
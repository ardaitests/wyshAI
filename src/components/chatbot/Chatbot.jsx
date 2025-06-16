import React from 'react';
import ChatbotUI from '@/components/chatbot/ChatbotUI.minimal.jsx';
import useChatLogic from '@/components/chatbot/useChatLogic.jsx';

const Chatbot = () => {
  const chatLogic = useChatLogic();
  return <ChatbotUI {...chatLogic} />;
};

export default Chatbot;
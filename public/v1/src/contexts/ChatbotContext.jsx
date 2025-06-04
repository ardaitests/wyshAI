
import React, { createContext, useContext, useState, useCallback } from 'react';

const ChatbotContext = createContext(null);

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};

export const ChatbotProvider = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialMessage, setChatInitialMessage] = useState("Hello! I'm the Wysh AI assistant. I can help you get started. What's your name?");
  const [chatInitialStep, setChatInitialStep] = useState('getName');

  const openChat = useCallback((options = {}) => {
    if (options.initialMessage) {
      setChatInitialMessage(options.initialMessage);
    } else {
      setChatInitialMessage("Hello! I'm the Wysh AI assistant. I can help you get started. What's your name?");
    }
    if (options.initialStep) {
      setChatInitialStep(options.initialStep);
    } else {
      setChatInitialStep('getName');
    }
    setIsChatOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsChatOpen(false);
  }, []);

  return (
    <ChatbotContext.Provider value={{ isChatOpen, openChat, closeChat, setIsChatOpen, chatInitialMessage, chatInitialStep }}>
      {children}
    </ChatbotContext.Provider>
  );
};

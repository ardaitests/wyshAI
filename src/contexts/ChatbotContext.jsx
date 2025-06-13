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
  const [chatInitialMessage, setChatInitialMessage] = useState("Hello! I'm the Wysh AI assistant. How can we make AI work for you?");
  const [chatInitialStep, setChatInitialStep] = useState('initial');

  const openChat = useCallback((options = {}) => {
    if (options.initialMessage) {
      setChatInitialMessage(options.initialMessage);
    } else {
      setChatInitialMessage("Hello! I'm the Wysh AI assistant. How can we make AI work for you?");
    }
    if (options.initialStep) {
      setChatInitialStep(options.initialStep);
    } else {
      setChatInitialStep('initial');
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
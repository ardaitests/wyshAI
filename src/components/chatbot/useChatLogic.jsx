import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast.jsx';
// Supabase operations are now handled by n8n
import { useChatbot } from '@/contexts/ChatbotContext.jsx';

const useChatLogic = () => {
  const { isChatOpen, setIsChatOpen, chatInitialMessage, chatInitialStep, openChat: openChatContext } = useChatbot();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [chatStep, setChatStep] = useState('initial');
  const [userData, setUserData] = useState({ name: '', email: '', query: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef(null);
  const { toast } = useToast();

  const scrollToBottom = useCallback((behavior = 'smooth') => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ 
        behavior,
        block: 'end',
        inline: 'nearest'
      });
    }, 0);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom('auto');
    }
  }, [messages, scrollToBottom]);
  
  // Smooth scroll to bottom when the chat is opened
  useEffect(() => {
    if (isChatOpen) {
      setTimeout(() => {
        scrollToBottom('smooth');
      }, 100);
    }
  }, [isChatOpen, scrollToBottom]);

  const addMessage = useCallback((text, sender) => {
    setMessages(prev => [...prev, { text, sender, id: Date.now() }]);
  }, []);

  const addBotMessage = useCallback((text) => {
    addMessage(text, 'bot');
  }, [addMessage]);

  const addUserMessage = useCallback((text) => {
    addMessage(text, 'user');
  }, [addMessage]);
  
  useEffect(() => {
    if (isChatOpen) {
      const storedMessages = localStorage.getItem('wyshAI_chatMessages');
      const storedUserData = localStorage.getItem('wyshAI_userData');
      const storedChatStep = localStorage.getItem('wyshAI_chatStep');

      if (storedMessages && storedUserData && storedChatStep && chatStep !== 'completed_then_reopened') {
        const parsedMessages = JSON.parse(storedMessages);
        const parsedUserData = JSON.parse(storedUserData);
        
        if (parsedMessages.length > 0 && parsedUserData.name && storedChatStep !== 'completed') {
            setMessages(parsedMessages);
            setUserData(parsedUserData);
            setChatStep(storedChatStep);
            return; 
        }
      }
      
      setMessages([]);
      addBotMessage(chatInitialMessage);
      setChatStep(chatInitialStep);
      setUserData({ name: '', email: '', query: '' });
    }
  }, [isChatOpen, addBotMessage, chatInitialMessage, chatInitialStep]);


  useEffect(() => {
    if (messages.length > 0) { // Only save if there are messages
        localStorage.setItem('wyshAI_chatMessages', JSON.stringify(messages));
        localStorage.setItem('wyshAI_userData', JSON.stringify(userData));
        localStorage.setItem('wyshAI_chatStep', chatStep);
    }
  }, [messages, userData, chatStep]);


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Database operations are handled by n8n workflow
  const processUserInput = useCallback(async (input) => {
    // Add user message to chat
    const userMessage = {
      text: input,
      sender: 'user',
      id: `user-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    
    // Update messages with user message
    setMessages(prev => [...prev, userMessage]);
    
    // Show typing indicator
    const typingMessageId = `typing-${Date.now()}`;
    setMessages(prev => [...prev, { 
      text: '...', 
      sender: 'bot', 
      id: typingMessageId,
      isTyping: true,
      timestamp: new Date().toISOString()
    }]);

    try {
      // Get or create conversation ID
      let conversationId = localStorage.getItem('wysh_conversation_id');
      if (!conversationId) {
        conversationId = `conv_${Date.now()}`;
        localStorage.setItem('wysh_conversation_id', conversationId);
      }

      // Send to n8n webhook
      const response = await fetch('https://areed.app.n8n.cloud/webhook/chat-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          conversationId: conversationId,
          metadata: {
            pageUrl: window.location.href,
            userAgent: navigator.userAgent,
            chatStep: chatStep,
            userData: userData
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      // Remove typing indicator and add bot's response
      setMessages(prev => {
        const newMessages = prev.filter(msg => msg.id !== typingMessageId);
        if (data.output) {
          return [...newMessages, {
            text: data.output,
            sender: 'bot',
            id: `bot-${Date.now()}`,
            timestamp: new Date().toISOString()
          }];
        }
        return newMessages;
      });
      
      // Update chat step based on response if needed
      if (data.chatStep) {
        setChatStep(data.chatStep);
      }
      
      // Update user data if provided
      if (data.userData) {
        setUserData(prev => ({
          ...prev,
          ...data.userData
        }));
      }
      
      // If no output, add a default message
      if (!data.output) {
        addBotMessage("I'm not sure how to respond to that. Could you rephrase?");
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Remove typing indicator
      setMessages(prev => prev.filter(msg => msg.id !== typingMessageId));
      // Show error message
      addBotMessage("Sorry, I'm having trouble connecting to the server. Please try again later.");
    }
  }, [chatStep, userData, addBotMessage, addUserMessage]);

  const handleSendMessage = useCallback(() => {
    if (inputValue.trim() === '' || isSubmitting) return;
    processUserInput(inputValue);
    setInputValue('');
  }, [inputValue, isSubmitting, processUserInput]);

  return {
    isOpen: isChatOpen,
    onOpenChange: setIsChatOpen,
    messages,
    inputValue,
    handleInputChange,
    handleSendMessage,
    isSubmitting,
    chatStep,
    messagesEndRef,
    openChat: openChatContext, // Expose the context's openChat
  };
};

export default useChatLogic;
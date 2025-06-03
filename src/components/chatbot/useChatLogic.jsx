import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast.jsx';
import { supabase } from '@/lib/supabaseClient.jsx';
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

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(scrollToBottom, [messages, scrollToBottom]);

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

  const saveLeadToSupabase = async (leadData) => {
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('customer_leads')
        .insert([leadData]);

      if (error) {
        throw error;
      }
      
      toast({
        title: "Information Saved!",
        description: "Your details have been successfully recorded.",
        variant: "default",
      });
      return data;

    } catch (error) {
      console.error('Error saving lead to Supabase:', error);
      toast({
        title: "Submission Error",
        description: "Could not save your information. Please try again later.",
        variant: "destructive",
      });
      addBotMessage("I encountered an issue trying to save your information. Please try again in a bit, or contact us directly if the problem persists.");
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  const processUserInput = useCallback(async (input) => {
    switch (chatStep) {
      case 'getName':
        setUserData(prev => ({ ...prev, name: input }));
        addBotMessage(`Nice to meet you, ${input}! What's your email address?`);
        setChatStep('getEmail');
        break;
      case 'getEmail':
        if (!/^\S+@\S+\.\S+$/.test(input)) {
          addBotMessage("That doesn't look like a valid email. Could you please try again?");
          return;
        }
        setUserData(prev => ({ ...prev, email: input }));
        addBotMessage("Great! And briefly, how can Wysh AI help you or your business today?");
        setChatStep('getQuery');
        break;
      case 'getQuery':
        const currentQuery = input;
        const currentName = userData.name || "there"; 
        const currentEmail = userData.email;

        setUserData(prev => ({ ...prev, query: currentQuery }));
        addBotMessage(`Thanks, ${currentName}! We've received your information. Someone from our team will review your query: "${currentQuery}" and get back to you at ${currentEmail} soon. Saving your details...`);
        
        const leadData = {
          name: currentName,
          email: currentEmail,
          query: currentQuery,
        };
        
        const success = await saveLeadToSupabase(leadData);
        if (success) {
          addBotMessage("Your information has been saved. Is there anything else I can help with for now? (Yes/No)");
          setChatStep('completed');
        } else {
           addBotMessage("I wasn't able to save your information. Please try telling me your query again, or contact us through other channels.");
        }
        break;
      case 'completed':
        if (input.toLowerCase().startsWith('yes')) {
            addBotMessage("Okay, what else can I assist you with?");
            setChatStep('getQuery'); 
        } else {
            addBotMessage("Alright! Have a great day. Feel free to reach out if anything else comes up.");
            // Optionally clear local storage here or set a flag to clear on next open
            localStorage.removeItem('wyshAI_chatMessages');
            localStorage.removeItem('wyshAI_userData');
            localStorage.removeItem('wyshAI_chatStep');
        }
        break;
      default:
        addBotMessage("I'm not sure how to handle that right now. Can you rephrase?");
    }
  }, [chatStep, addBotMessage, userData.name, userData.email, toast]);

  const handleSendMessage = useCallback(() => {
    if (inputValue.trim() === '' || isSubmitting) return;
    addUserMessage(inputValue);
    processUserInput(inputValue);
    setInputValue('');
  }, [inputValue, isSubmitting, addUserMessage, processUserInput]);

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
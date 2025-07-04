import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog.jsx';
import { MessageSquare, Send, User, X, Loader2 } from 'lucide-react';
import logoIcon from '@/assets/wyshAI-Icon-Light-June-2025.svg';

const ChatbotUI = ({
  isOpen,
  onOpenChange,
  messages,
  inputValue,
  handleInputChange: originalHandleInputChange,
  handleSendMessage,
  isSubmitting,
  chatStep,
  messagesEndRef,
  openChat
}) => {
  const inputRef = useRef(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if the device is iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
               (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    setIsIOS(iOS);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto-focus input when dialog opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isSubmitting, messagesEndRef]);

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ delay: 1, duration: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
      >
        <Button
          size="lg"
          className="rounded-full p-4 shadow-xl bg-gradient-to-r from-primary to-accent text-primary-foreground w-16 h-16"
          onClick={() => openChat()}
        >
          <MessageSquare className="h-8 w-8" />
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent 
              className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-[450px] max-h-[90vh] flex flex-col p-0 glassmorphic-card border-0 rounded-2xl overflow-hidden ${
                isIOS ? 'bottom-0 top-auto -translate-y-0' : ''
              }`}
              style={{
                height: isIOS ? '90%' : '70vh',
                maxHeight: '90vh',
                margin: 0
              }}
            >
              <DialogHeader className="relative p-4 pr-12 border-b border-border/20 bg-background/90 backdrop-blur-sm z-10">
                <DialogTitle className="flex items-center text-xl font-montserrat">
                  <img 
                    src={logoIcon} 
                    alt="Wysh AI Logo" 
                    className="h-7 w-7 mr-2" 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMCAxOGMtNC40MSAwLTgtMy41OS04LThzMy41OS04IDgtOCA4IDMuNTkgOCA4LTMuNTkgOC04IDh6Ii8+PC9zdmc+';
                      e.target.alt = 'Wysh AI Logo - Placeholder';
                    }}
                  /> Wysh AI Assistant
                </DialogTitle>
                <DialogClose asChild>
                  <button 
                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                    onClick={() => onOpenChange(false)}
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                  </button>
                </DialogClose>
              </DialogHeader>
              
              <div 
                className="flex-grow overflow-y-auto p-4 space-y-4 bg-background/10 pb-0" 
                style={{
                  maxHeight: 'calc(100vh - 200px)',
                  WebkitOverflowScrolling: 'touch',
                  paddingBottom: 'env(safe-area-inset-bottom, 0)'
                }}
              >
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-end max-w-[80%] p-3 rounded-xl ${
                      msg.sender === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-br-none' 
                        : 'bg-secondary text-secondary-foreground rounded-bl-none'
                    }`}>
                      {msg.sender === 'bot' && (
                        <img 
                          src={logoIcon} 
                          alt="" 
                          className="h-6 w-6 mr-2 self-start flex-shrink-0"
                          aria-hidden="true"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMCAxOGMtNC40MSAwLTgtMy41OS04LThzMy41OS04IDgtOCA4IDMuNTkgOCA4LTMuNTkgOC04IDh6Ii8+PC9zdmc+';
                          }}
                        />
                      )}
                      <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                      {msg.sender === 'user' && <User className="h-6 w-6 ml-2 self-start flex-shrink-0 text-primary-foreground/80" />}
                    </div>
                  </motion.div>
                ))}
                {isSubmitting && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-end max-w-[80%] p-3 rounded-xl bg-secondary text-secondary-foreground rounded-bl-none">
                      <img src={logoIcon} alt="Wysh AI" className="h-6 w-6 mr-2 self-start flex-shrink-0" />
                      <div className="flex items-center">
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        <p className="text-sm">Saving your details...</p>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div 
                className="sticky bottom-0 p-4 border-t border-border/20 bg-background/90 backdrop-blur-sm pt-3" 
                style={{
                  paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0))'
                }}
              >
                <div className="flex w-full items-center space-x-2">
                  <Input
                    type="text"
                    placeholder={isSubmitting ? "Processing..." : "Type your message..."}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="flex-grow bg-input/70 focus:ring-primary"
                    disabled={isSubmitting}
                    autoFocus
                    ref={inputRef}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    onClick={handleSendMessage}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={inputValue.trim() === '' || isSubmitting}
                  >
                    {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotUI;

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog.jsx';
import { MessageSquare, Send, User, X, Loader2 } from 'lucide-react';
import logoIcon from '@/assets/wyshAI-Icon-Light-June-2025.svg';

const ChatbotUI = ({
  isOpen,
  onOpenChange,
  messages = [],
  inputValue = '',
  handleInputChange = () => {},
  handleSendMessage = () => {},
  isSubmitting = false,
  openChat = () => {}
}) => {
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) || 
             (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  return (
    <>
      <motion.div 
        className="fixed bottom-6 right-6 z-40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          size="lg"
          className="rounded-full p-4 shadow-xl bg-gradient-to-r from-primary to-accent text-primary-foreground w-16 h-16 hover:shadow-2xl transition-all duration-300"
          onClick={openChat}
        >
          <MessageSquare className="h-8 w-8" />
        </Button>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent 
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-[450px] h-[70vh] max-h-[90vh] flex flex-col p-0 rounded-2xl overflow-hidden glassmorphic-card border-0"
          style={{
            '--tw-bg-opacity': 0.8,
            '--tw-backdrop-blur': 'blur(20px)'
          }}
        >
          <DialogHeader className="p-4 pr-12 border-b border-border/20 bg-background/90 backdrop-blur-sm">
            <DialogTitle className="flex items-center text-lg font-medium">
              <img 
                src={logoIcon} 
                alt="Wysh AI" 
                className="h-6 w-6 mr-2"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMCAxOGMtNC40MSAwLTgtMy41OS04LThzMy41OS04IDgtOCA4IDMuNTkgOCA4LTMuNTkgOC04IDh6Ii8+PC9zdmc+';
                }}
              />
              Wysh AI Assistant
            </DialogTitle>
          </DialogHeader>
          
          <div 
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/10 scrollbar-hide"
            style={{
              WebkitOverflowScrolling: 'touch',
              paddingBottom: 'env(safe-area-inset-bottom, 1rem)',
              overscrollBehavior: 'contain',
              scrollBehavior: 'smooth',
              scrollPaddingBottom: '1rem'
            }}
            ref={(el) => {
              // This helps ensure we're scrolling the right container
              if (el) {
                // Small delay to ensure the message is rendered
                setTimeout(() => {
                  el.scrollTop = el.scrollHeight;
                }, 50);
              }
            }}
          >
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`flex items-start max-w-[85%] p-3 rounded-xl ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-br-none' 
                      : 'bg-secondary text-secondary-foreground rounded-bl-none'
                  }`}
                >
                  {msg.sender === 'bot' && (
                    <img 
                      src={logoIcon} 
                      alt="" 
                      className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    />
                  )}
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  {msg.sender === 'user' && (
                    <User className="h-5 w-5 ml-2 mt-0.5 flex-shrink-0 text-primary-foreground/80" />
                  )}
                </div>
              </motion.div>
            ))}
            {isSubmitting && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center p-3 rounded-xl bg-secondary text-secondary-foreground self-start max-w-[85%]"
              >
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <span className="text-sm">Thinking...</span>
              </motion.div>
            )}
            <div 
              ref={messagesEndRef} 
              style={{
                height: '1px',
                width: '100%',
                paddingTop: '0.5rem'
              }}
            />
          </div>

          <div className="p-4 border-t border-border/20 bg-background/90 backdrop-blur-sm">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={isSubmitting ? 'Please wait...' : 'Type your message...'}
                disabled={isSubmitting}
                className="flex-1 bg-background/70 border-border/50 focus-visible:ring-1 focus-visible:ring-ring"
              />
              <Button 
                size="icon"
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isSubmitting}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatbotUI;

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog.jsx';
import { MessageSquare, Send, User, Loader2 } from 'lucide-react';
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
  const [isMobile, setIsMobile] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const chatContainerRef = useRef(null);
  const inputContainerRef = useRef(null);

  // Detect mobile devices
  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                 (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isAndroid = /Android/.test(navigator.userAgent);
    setIsMobile(isIOS || isAndroid);

    // Prevent zooming on input focus on mobile
    const viewportMeta = document.querySelector('meta[name=viewport]');
    if (viewportMeta && isMobile) {
      const originalContent = viewportMeta.getAttribute('content');
      viewportMeta.setAttribute('content', `${originalContent}, maximum-scale=1.0, user-scalable=no`);
      
      return () => {
        if (originalContent) {
          viewportMeta.setAttribute('content', originalContent);
        }
      };
    }
  }, [isMobile]);

  // Handle keyboard show/hide
  useEffect(() => {
    if (!isMobile) return;

    const handleResize = () => {
      // Calculate keyboard height based on viewport changes
      const visualViewport = window.visualViewport;
      if (visualViewport) {
        const newKeyboardHeight = Math.max(0, window.innerHeight - visualViewport.height);
        setKeyboardHeight(newKeyboardHeight);
        
        // Scroll to bottom when keyboard appears
        if (newKeyboardHeight > 0 && chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      }
    };
  }, [isMobile]);

  // Auto-scroll to bottom when messages change or chat opens
  useEffect(() => {
    if (!chatContainerRef.current) return;
    
    const scrollToBottom = () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    };

    // Scroll after a small delay to ensure content is rendered
    const timer = setTimeout(scrollToBottom, 100);
    
    // Also scroll when the keyboard appears
    if (isMobile) {
      const handleResize = () => {
        scrollToBottom();
      };
      
      window.addEventListener('resize', handleResize);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', handleResize);
      };
    }
    
    return () => clearTimeout(timer);
  }, [messages, isOpen, isMobile]);

  // Handle input focus on mobile
  const handleInputFocus = useCallback(() => {
    if (!isMobile) return;
    
    // Small delay to ensure keyboard is shown
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 300);
  }, [isMobile]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Initial scroll to bottom when chat opens
  useEffect(() => {
    if (isOpen && chatContainerRef.current) {
      // Small delay to ensure content is rendered
      const timer = setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, 100);
      
      return () => clearTimeout(timer);
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
          aria-label="Chat with WyshAI Assistant"
          className="rounded-full p-4 shadow-xl bg-gradient-to-r from-primary to-accent text-primary-foreground w-16 h-16 hover:shadow-2xl transition-all duration-300"
          onClick={openChat}
        >
          <MessageSquare className="h-8 w-8" />
          <span className="sr-only">Chat with WyshAI Assistant</span>
        </Button>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent 
          className={`fixed left-1/2 -translate-x-1/2 w-[calc(100%-1rem)] max-w-[450px] ${
            isMobile ? 'top-4 h-[50vh]' : 'top-1/2 -translate-y-1/2 h-[70vh] max-h-[90vh]'
          } flex flex-col p-0 rounded-2xl overflow-hidden border-0 transition-all duration-200 bg-background`}
          style={{
            '--tw-bg-opacity': 1,
            '--tw-backdrop-blur': 'blur(20px)',
            ...(isMobile && {
              transform: 'translateX(-50%)',
              height: '50vh',
              maxHeight: 'none',
              top: '1rem',
              bottom: 'auto',
              position: 'fixed',
              transform: 'translateX(-50%)'
            })
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
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/10 scrollbar-hide"
            style={{
              WebkitOverflowScrolling: 'touch',
              paddingBottom: 'env(safe-area-inset-bottom, 1rem)',
              overscrollBehavior: 'contain',
              scrollBehavior: 'smooth',
              scrollPaddingBottom: '1rem',
              WebkitTransform: 'translateZ(0)', // Hardware acceleration
              position: 'relative',
              overflowAnchor: 'none' // Prevent browser's auto-scrolling
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

          <div 
            ref={inputContainerRef}
            className="sticky bottom-0 p-4 border-t border-border/20 bg-background/90 backdrop-blur-sm"
            style={{
              paddingBottom: `calc(1rem + env(safe-area-inset-bottom, 0))`,
              ...(isMobile && {
                paddingBottom: `calc(1rem + env(safe-area-inset-bottom, 1rem))`,
                position: 'sticky',
                bottom: 0,
                zIndex: 10
              })
            }}
          >
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={handleInputFocus}
                inputMode={isMobile ? 'text' : undefined}
                enterKeyHint="send"
                autoComplete="off"
                autoCorrect="on"
                autoCapitalize="sentences"
                spellCheck={true}
                placeholder={isSubmitting ? 'Please wait...' : 'Type your message...'}
                disabled={isSubmitting}
                className="flex-1 bg-background/70 border-border/50 focus-visible:ring-1 focus-visible:ring-ring text-base"
                style={{
                  WebkitAppearance: 'none',
                  WebkitTapHighlightColor: 'transparent',
                  fontSize: '1rem',
                  lineHeight: '1.5rem',
                  minHeight: '2.5rem'
                }}
              />
              <Button 
                size="icon"
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isSubmitting}
                className="bg-purple-600 hover:bg-purple-700 text-white"
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
      <style>{`
        [data-radix-dialog-overlay] {
          background-color: rgba(20, 8, 40, 0.8) !important;
          backdrop-filter: blur(20px);
        }
      `}</style>
      </Dialog>
    </>
  );
};

export default ChatbotUI;

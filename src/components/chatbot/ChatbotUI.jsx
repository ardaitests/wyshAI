import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog.jsx';
import { MessageSquare, Send, User, X, Loader2 } from 'lucide-react';
import logoIcon from '@/assets/wyshAI-Icon-Light-June-2025.svg';

const ChatbotUI = ({
  isOpen,
  onOpenChange,
  messages,
  inputValue,
  handleInputChange,
  handleSendMessage,
  isSubmitting,
  chatStep,
  messagesEndRef,
  openChat
}) => {
  // Debug log to check chat step and input state
  console.log('Chat Step:', chatStep, 'Input Disabled:', isSubmitting || (chatStep !== 'initial' && chatStep !== 'getName' && chatStep !== 'getEmail' && chatStep !== 'getQuery' && chatStep !== 'completed'));

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
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
            <DialogContent className="fixed sm:max-w-[450px] w-full h-[calc(100%-2rem)] sm:h-[70vh] max-h-[90vh] bottom-0 sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 flex flex-col p-0 glassmorphic-card border-0 rounded-none sm:rounded-2xl overflow-hidden">
              <DialogHeader className="relative p-4 pr-12 border-b border-border/20 sticky top-0 bg-background/90 backdrop-blur-sm z-10">
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
              
              <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-background/10 pb-0">
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

               <div className="sticky bottom-0 p-4 border-t border-border/20 bg-background/90 backdrop-blur-sm pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
                <div className="flex w-full items-center space-x-2">
                  <Input
                    type="text"
                    placeholder={isSubmitting ? "Processing..." : "Type your message..."}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-grow bg-input/70 focus:ring-primary"
                    disabled={isSubmitting}
                    autoFocus
                    ref={(input) => isOpen && input?.focus()}
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
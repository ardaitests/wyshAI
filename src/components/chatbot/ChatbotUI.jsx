import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog.jsx';
import { MessageSquare, Send, User, X, Loader2 } from 'lucide-react';

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
            <DialogContent className="sm:max-w-[450px] h-[70vh] flex flex-col p-0 glassmorphic-card border-primary/50">
              <DialogHeader className="p-4 border-b border-border/50">
                <DialogTitle className="flex items-center text-xl font-montserrat">
                  <img src="/images/wyshAI-Icon-Light-June-2025.svg" alt="wyshAI" className="h-7 w-7 mr-2" /> wyshAI Assistant
                </DialogTitle>
              </DialogHeader>
              
              <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-background/30">
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
                      {msg.sender === 'bot' && <img src="/images/wyshAI-Icon-Light-June-2025.svg" alt="wyshAI" className="h-6 w-6 mr-2 self-start flex-shrink-0" />}
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
                      <img src="/images/wyshAI-Icon-Light-June-2025.svg" alt="wyshAI" className="h-6 w-6 mr-2 self-start flex-shrink-0" />
                      <div className="flex items-center">
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        <p className="text-sm">Saving your details...</p>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

               <DialogFooter className="p-4 border-t border-border/50 bg-background/50">
                <div className="flex w-full items-center space-x-2">
                  <Input
                    type="text"
                    placeholder={isSubmitting ? "Processing..." : "Type your message..."}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-grow bg-input/70 focus:ring-primary"
                    disabled={isSubmitting}
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
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotUI;
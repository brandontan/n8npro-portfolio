import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Minimize2,
  Maximize2,
  Sparkles
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your AI automation assistant. I can help you understand my services, discuss your automation needs, or answer questions about workflow optimization. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    "What services do you offer?",
    "How much do you charge?",
    "Can you help with my workflow?",
    "Show me your portfolio",
    "Schedule a consultation"
  ];

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('service') || message.includes('what do you')) {
      return "I specialize in AI workflow automation, helping businesses streamline their processes. My services include:\n\n• Custom workflow development\n• API integrations\n• Process optimization\n• Training & consultation\n• Ongoing maintenance\n\nWould you like to know more about any specific service?";
    }
    
    if (message.includes('price') || message.includes('cost') || message.includes('charge')) {
              return "My pricing is flexible based on project complexity:\n\n• Free 30-min consultation\n• $30/hour for development\n• Custom pricing for complete solutions\n\nI'd be happy to provide a custom quote after understanding your specific needs. Would you like to schedule a consultation?";
    }
    
    if (message.includes('portfolio') || message.includes('example') || message.includes('work')) {
      return "I would love to learn more about your current workflow. Please send me a message via contact form. Thanks!";
    }
    
    if (message.includes('consultation') || message.includes('schedule') || message.includes('meeting')) {
      return "I'd love to discuss your automation needs! You can:\n\n• Fill out the contact form above\n• Email me at brandon@aiflows.help\n• Schedule directly through my calendar\n\nI typically respond within 24 hours. What's the best way to reach you?";
    }
    
    if (message.includes('workflow') || message.includes('automation') || message.includes('help')) {
      return "I can definitely help optimize your workflows! Common automation opportunities include:\n\n• Data synchronization between apps\n• Automated notifications & alerts\n• Report generation\n• Lead qualification\n• Customer onboarding\n\nWhat specific process are you looking to automate?";
    }
    
    return "That's a great question! I'd love to discuss this in more detail. Feel free to use the contact form above or email me directly at brandon@aiflows.help for a personalized response. Is there anything else about AI automation I can help clarify?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    handleSendMessage();
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="glass-button h-14 w-14 rounded-full p-0 shadow-2xl hover:shadow-primary/20 group"
        >
          <MessageCircle className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
          <div className="absolute -top-2 -right-2">
            <div className="h-4 w-4 bg-accent rounded-full animate-pulse-glow">
              <Sparkles className="h-3 w-3 text-white absolute top-0.5 left-0.5" />
            </div>
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`glass-card border-border/50 shadow-2xl transition-all duration-500 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-accent p-0.5">
                <div className="h-full w-full rounded-full bg-background flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-background"></div>
            </div>
            <div>
              <h3 className="font-semibold text-sm">AI Assistant</h3>
              <p className="text-xs text-white">Always here to help</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 p-0 hover:bg-muted/50"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0 hover:bg-muted/50"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <CardContent className="flex-1 p-0 overflow-hidden">
              <div className="h-[440px] overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'bot' && (
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-accent p-0.5 flex-shrink-0">
                        <div className="h-full w-full rounded-full bg-background flex items-center justify-center">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                    )}
                    
                    <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-1' : ''}`}>
                      <div
                        className={`p-3 rounded-2xl text-sm whitespace-pre-line ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground ml-auto'
                            : 'glass-card border border-border/50'
                        }`}
                      >
                        {message.content}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 px-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>

                    {message.sender === 'user' && (
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Quick Replies - Show after initial bot message */}
                {messages.length === 1 && (
                  <div className="flex flex-wrap gap-2 mt-6 mb-8">
                    {quickReplies.slice(0, 3).map((reply, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary/10 hover:border-primary/50 text-xs py-1"
                        onClick={() => handleQuickReply(reply)}
                      >
                        {reply}
                      </Badge>
                    ))}
                  </div>
                )}

                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-accent p-0.5 flex-shrink-0">
                      <div className="h-full w-full rounded-full bg-background flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    <div className="glass-card border border-border/50 p-3 rounded-2xl">
                      <div className="flex gap-1">
                        <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            {/* Input */}
            <div className="p-4 border-t border-border/50">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me about AI automation..."
                  className="flex-1 glass-card border-border/50 focus:border-primary/50"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="glass-button h-10 w-10 p-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}; 
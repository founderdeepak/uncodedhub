import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, CheckCircle2, Zap } from 'lucide-react';
import { supabase } from '../../lib/supabase';

type Message = {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  isAction?: boolean;
};

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Form states before chat
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', businessType: '', message: '' });

  // Bot state machine
  const [chatStep, setChatStep] = useState(0);
  const [qAnswers, setQAnswers] = useState({ q1: '', q2: '', q3: '' });

  const [messages, setMessages] = useState<Message[]>([]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isFormSubmitted]);

  const startChatFlow = () => {
    setIsFormSubmitted(true);
    setMessages([
      { id: 'usr-1', sender: 'user', text: formData.message || 'Started chat.' },
      { id: 'bot-1', sender: 'bot', text: `Hi ${formData.name || 'there'}! Thanks for reaching out. Let me ask you 3 quick questions to understand your coaching practice.` },
      { id: 'bot-2', sender: 'bot', text: "Question 1: What type of coaching or consulting do you provide?" }
    ]);
  };

  const handleBotReply = (userMsg: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let botResponse = '';
      let nextStep = chatStep;
      let newQAnswers = { ...qAnswers };

      if (chatStep === 0) {
        newQAnswers.q1 = userMsg;
        botResponse = "Got it. Question 2: What's the #1 challenge you're facing in getting new clients online right now?";
        nextStep = 1;
      } else if (chatStep === 1) {
        newQAnswers.q2 = userMsg;
        botResponse = "Understood. Question 3: Are you ready to invest in a world-class website that books high-ticket clients on autopilot?";
        nextStep = 2;
      } else if (chatStep === 2) {
        newQAnswers.q3 = userMsg;
        botResponse = `Thanks! To summarize: Niche: ${newQAnswers.q1}, Challenge: ${newQAnswers.q2}, Ready: ${userMsg}. Our team will review this and contact you soon!`;
        nextStep = 3;
        
        // Save to Supabase asynchronously
        supabase.from('chatbot_leads').insert({ 
          name: formData.name, 
          email: formData.email, 
          department: formData.businessType, // Saving as department column in DB based on prior schema
          initial_message: formData.message,
          q1_answer: newQAnswers.q1,
          q2_answer: newQAnswers.q2,
          q3_answer: userMsg
        }).then(({ error }) => {
          if (error) console.error('Supabase Error:', error);
        });
      } else {
        botResponse = "If you need anything else, just let us know!";
      }

      setQAnswers(newQAnswers);
      setChatStep(nextStep);

      setMessages(prev => [
        ...prev,
        { id: Date.now().toString(), sender: 'bot', text: botResponse }
      ]);
      setIsTyping(false);
    }, 1200); // 1.2s typing delay
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;
    
    const newUserMsg = inputValue.trim();
    
    // Add user message
    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), sender: 'user', text: newUserMsg }
    ]);
    
    setInputValue('');
    
    // Trigger bot reply logic
    if (chatStep < 3) {
      handleBotReply(newUserMsg);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 sm:w-[350px] bg-[#0B0E23] border border-cyan/30 rounded-2xl shadow-2xl shadow-cyan/20 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 flex flex-col h-[550px] max-h-[85vh]">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#00F0FF] to-[#B026FF] p-4 flex justify-between items-center text-white shrink-0 shadow-md z-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                <Bot size={18} fill="currentColor" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-wide font-sans">Chat with us now</h3>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-white/70 transition-colors">
              <X size={20} />
            </button>
          </div>
          
          {!isFormSubmitted ? (
            /* Pre-Chat Form View */
            <div className="flex-1 overflow-y-auto p-5 bg-midnight/90 relative flex flex-col gap-4">
              <form onSubmit={(e) => { e.preventDefault(); startChatFlow(); }} className="flex flex-col gap-4 text-white">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-steel">Your Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Enter your name" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-midnight/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-steel">Email Address <span className="text-red-500">*</span></label>
                  <input 
                    type="email" 
                    required 
                    placeholder="Enter your email address" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-midnight/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-steel">Coaching Niche <span className="text-red-500">*</span></label>
                  <select 
                    required
                    value={formData.businessType}
                    onChange={e => setFormData({...formData, businessType: e.target.value})}
                    className="w-full bg-midnight/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-all cursor-pointer"
                  >
                    <option className="bg-midnight text-white" value="" disabled>Select your niche</option>
                    <option className="bg-midnight text-white" value="Life">Life Coaching</option>
                    <option className="bg-midnight text-white" value="Business">Business / Executive</option>
                    <option className="bg-midnight text-white" value="Health">Health / Fitness</option>
                    <option className="bg-midnight text-white" value="Financial">Financial / Wealth</option>
                    <option className="bg-midnight text-white" value="Relationship">Relationship Coaching</option>
                    <option className="bg-midnight text-white" value="Spiritual">Spiritual / Mindset</option>
                    <option className="bg-midnight text-white" value="Career">Career Coaching</option>
                    <option className="bg-midnight text-white" value="Other">Other Consulting</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-steel">Message</label>
                  <textarea 
                    rows={4} 
                    placeholder="Type your message and hit 'Start Chat'" 
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-midnight/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-all resize-none"
                  ></textarea>
                </div>
                <button type="submit" className="cyan-energy-btn w-full mt-2 flex items-center justify-center gap-2">
                  <Send size={16} /> Start Chat
                </button>
              </form>
              <div className="mt-auto pt-4 text-center text-[10px] text-steel border-t border-white/5 flex items-center justify-center gap-1.5 opacity-70">
                <Zap size={10} className="text-cyan fill-cyan" />
                Powered By uncodedhub.com
              </div>
            </div>
          ) : (
            /* Ongoing Chat View */
            <div className="flex-1 flex flex-col min-h-0 bg-midnight/90">
              <div className="flex-1 overflow-y-auto p-4 relative flex flex-col gap-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                    <div className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-md ${
                      msg.sender === 'user' 
                        ? 'bg-gradient-to-br from-cyan/20 to-magenta/20 border border-cyan/30 text-white rounded-tr-sm' 
                        : 'bg-[#11142A] border border-white/5 text-gray-200 rounded-tl-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start animate-in fade-in">
                    <div className="bg-[#11142A] border border-white/5 p-3 rounded-2xl rounded-tl-sm flex gap-1 h-10 items-center">
                      <div className="w-2 h-2 bg-cyan rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 bg-cyan rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-cyan rounded-full animate-bounce"></div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              {/* Input Area */}
              <div className="p-3 bg-[#0B0E23] border-t border-white/10 shrink-0">
                <form onSubmit={handleSend} className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={chatStep === 3 ? "Chat ended." : "Type your message..."}
                    disabled={chatStep === 3}
                    className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-all disabled:opacity-50"
                  />
                  <button 
                    type="submit" 
                    disabled={!inputValue.trim() || chatStep === 3}
                    className="w-10 h-10 bg-gradient-to-br from-[#00F0FF] to-[#B026FF] text-white rounded-full flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                    aria-label="Send"
                  >
                    <Send size={16} className="-ml-1 mt-1" />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`w-14 h-14 bg-gradient-to-tr from-[#00F0FF] to-[#B026FF] text-white rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:scale-110 transition-all outline-none animate-bounce-slow z-50`}
          aria-label="Open AI Chat"
        >
          <MessageCircle size={30} fill="currentColor" className="text-white" />
        </button>
      )}
    </div>
  );
}

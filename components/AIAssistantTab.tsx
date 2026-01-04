
import React, { useState, useRef, useEffect } from 'react';
import { generateSecurityResponse, generateEmergencyDocument } from '../services/geminiService';
import { Message } from '../types';
import { Send, Bot, User, FileText, Presentation, Download, Loader2 } from 'lucide-react';

const AIAssistantTab: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello! I am your Sentinel AI Assistant. How can I help with your physical security or emergency preparedness today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingDoc, setIsGeneratingDoc] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    const response = await generateSecurityResponse(userMessage);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  const handleQuickDoc = async (topic: string, format: string) => {
    setIsGeneratingDoc(true);
    const docText = await generateEmergencyDocument(topic, format);
    setMessages(prev => [...prev, { role: 'model', text: `Here is the ${format} plan for ${topic}:\n\n${docText}` }]);
    setIsGeneratingDoc(false);
  };

  return (
    <div className="p-4 flex flex-col h-[calc(100vh-10rem)] animate-in slide-in-from-bottom duration-300">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 scrollbar-hide">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${m.role === 'user' ? 'bg-blue-600' : 'bg-slate-800 border border-slate-700'}`}>
                {m.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5 text-blue-500" />}
              </div>
              <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-slate-900 border border-slate-800 text-slate-300 rounded-tl-none'
              }`}>
                {m.text.split('\n').map((line, idx) => (
                  <p key={idx} className={line.trim() === '' ? 'h-2' : 'mb-1'}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl rounded-tl-none">
              <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Doc Generation Quick Actions */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
        <QuickAction 
          icon={<FileText className="w-4 h-4" />} 
          label="SOP Plan" 
          onClick={() => handleQuickDoc('Fire Safety', 'Standard Operating Procedure')}
          disabled={isGeneratingDoc}
        />
        <QuickAction 
          icon={<Presentation className="w-4 h-4" />} 
          label="Flood Prep" 
          onClick={() => handleQuickDoc('Flood Preparedness', 'Presentation Deck')}
          disabled={isGeneratingDoc}
        />
        <QuickAction 
          icon={<Download className="w-4 h-4" />} 
          label="Drill Report" 
          onClick={() => handleQuickDoc('Evacuation Drill Results', 'Analysis Report')}
          disabled={isGeneratingDoc}
        />
      </div>

      {/* Input Area */}
      <div className="relative">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about security or safety..."
          className="w-full bg-slate-900 border border-slate-800 rounded-full py-4 pl-6 pr-14 text-sm focus:outline-none focus:border-blue-500 transition-colors shadow-2xl"
        />
        <button 
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="absolute right-2 top-2 p-2 bg-blue-600 rounded-full text-white shadow-lg active:scale-90 transition-transform disabled:opacity-50 disabled:bg-slate-800"
        >
          <Send className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const QuickAction: React.FC<QuickActionProps> = ({ icon, label, onClick, disabled }) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-full text-xs font-bold text-slate-300 hover:border-blue-500 hover:text-blue-400 transition-all whitespace-nowrap disabled:opacity-50"
  >
    {icon}
    {label}
  </button>
);

export default AIAssistantTab;

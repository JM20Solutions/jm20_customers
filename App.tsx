
import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { 
  Globe, ArrowRight, ShoppingBag, Leaf, Sparkles, MessageSquare, 
  Info, Shield, Heart, Zap, CheckCircle2, CreditCard, Truck, 
  RefreshCcw, Cpu, ChevronRight, X, Headphones
} from 'lucide-react';
import { CONTENT } from './constants';
import { Language, AIAgent } from './types';

interface ChatMsg {
  id: string;
  role: 'user' | 'agent' | 'system';
  text: string;
}

const IconMap: Record<string, React.FC<any>> = {
  CreditCard,
  Truck,
  RefreshCcw,
  Cpu,
  Shield,
  MessageSquare
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('EN');
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeAgentId, setActiveAgentId] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEscalated, setIsEscalated] = useState(false);
  const [sessionId] = useState(() => 'ses-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5));
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const t = CONTENT[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLang(prev => prev === 'EN' ? 'ES' : 'EN');
  }, []);

  const activeAgent = useMemo(() => 
    t.support.agents.find(a => a.id === activeAgentId) || null,
  [t.support.agents, activeAgentId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  /**
   * WEBHOOK URLS — Replace with your n8n Chat Trigger webhook URLs
   */
  const webhooks: Record<string, string> = {
    billing: "https://gpixie.app.n8n.cloud/webhook/4514dc5f-f55e-4a7e-8c19-91f4c0a1fcfd/chat",
    orders: "PASTE_YOUR_ORDERS_WEBHOOK_HERE",
    refunds: "PASTE_YOUR_REFUNDS_WEBHOOK_HERE",
    tech: "PASTE_YOUR_TECH_WEBHOOK_HERE",
    policy: "PASTE_YOUR_POLICY_WEBHOOK_HERE"
  };

  const handleSelectAgent = (agentId: string) => {
    setActiveAgentId(agentId);
    setMessages([]);
    setIsEscalated(false);
    const agent = t.support.agents.find(a => a.id === agentId);
    if (agent) {
      setMessages([{
        id: 'greeting',
        role: 'agent',
        text: `Hi! I'm your ${agent.title.toLowerCase()} assistant. How can I help you?`
      }]);
    }
  };

  const handleSendMessage = async () => {
    if (!activeAgentId || !inputMessage.trim() || isLoading || isEscalated) return;

    const userText = inputMessage.trim();
    const targetUrl = webhooks[activeAgentId];

    // Add user message
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: userText }]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sendMessage',
          sessionId: sessionId,
          chatInput: userText
        })
      });

      const data = await response.json();
      const reply = data.output || data.text || data.response || data.message || JSON.stringify(data);

      // Check for escalation
      const escalated = reply.includes('[ESCALATE]');
      const cleanReply = escalated ? reply.split('[ESCALATE]')[0].trim() : reply;

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'agent', text: cleanReply }]);

      if (escalated) {
        setIsEscalated(true);
        setMessages(prev => [...prev, {
          id: (Date.now() + 2).toString(),
          role: 'system',
          text: "I'm connecting you with a human representative. Our team has been notified and will follow up shortly."
        }]);
      }

    } catch (err) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'system',
        text: 'Connection error. Please try again.'
      }]);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-black selection:bg-green-100 scroll-smooth font-sans">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-700 ${scrolled ? 'bg-white/90 backdrop-blur-2xl border-b border-black/5 py-3 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-2xl font-bold tracking-tight text-black cursor-pointer group">
            <Leaf className="w-6 h-6 text-green-600 transition-transform duration-500 group-hover:rotate-12" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-600">{t.nav.logo}</span>
          </div>
          <div className="flex items-center gap-8 md:gap-10">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-black transition-all"
            >
              <Globe className="w-4 h-4" />
              <span className="tracking-widest uppercase text-[10px] hidden sm:inline">{t.nav.langLabel}</span>
            </button>
            <button className="p-2.5 hover:bg-black/5 rounded-full transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-green-600 rounded-full border-2 border-white" />
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-56 pb-40 px-6 max-w-5xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[0.4em] text-green-600 uppercase mb-8 flex items-center justify-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <Sparkles className="w-4 h-4" />
            {t.hero.tagline}
          </p>
          <h1 className="text-7xl md:text-9xl font-bold mb-12 leading-[1] tracking-tighter text-gradient animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {t.hero.headline}
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 font-light max-w-3xl mx-auto mb-16 leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000">
            {t.hero.subheadline}
          </p>
          <div className="flex items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <button className="px-12 py-5 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all shadow-2xl flex items-center gap-3 group">
              {t.hero.cta}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
            </button>
          </div>
        </section>

        {/* Categories Bento Grid */}
        <section className="max-w-7xl mx-auto px-6 mb-48">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 group relative overflow-hidden rounded-[3.5rem] bg-gray-200 h-[600px] shadow-sm">
              <img src={t.categories.seasonal.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-14 text-white">
                <span className="text-xs font-bold tracking-[0.3em] uppercase mb-4 block text-white/60">{t.categories.seasonal.subtitle}</span>
                <h3 className="text-5xl font-bold mb-6 tracking-tight">{t.categories.seasonal.title}</h3>
                <p className="max-w-md text-xl text-white/80 font-light leading-relaxed">{t.categories.seasonal.description}</p>
              </div>
            </div>

            <div className="md:col-span-4 group relative overflow-hidden rounded-[3.5rem] bg-stone-100 h-[600px] shadow-sm">
              <img src={t.categories.artisan.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-700" />
              <div className="absolute top-0 left-0 p-12 text-white drop-shadow-2xl">
                <span className="text-xs font-bold tracking-[0.3em] uppercase mb-3 block">{t.categories.artisan.subtitle}</span>
                <h3 className="text-4xl font-bold tracking-tight leading-none">{t.categories.artisan.title}</h3>
              </div>
            </div>

            {[t.categories.wellness, t.categories.eco, t.categories.subscription].map((cat, idx) => (
              <div key={idx} className="md:col-span-4 group glass-card overflow-hidden rounded-[3.5rem] p-8 flex flex-col h-[520px] bg-white border border-black/[0.03]">
                <div className="flex-1 overflow-hidden rounded-[2.5rem] relative mb-10 shadow-inner bg-gray-50">
                  <img src={cat.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={cat.title} />
                </div>
                <div className="px-4 pb-4">
                  <h3 className="text-3xl font-bold mb-4 tracking-tight">{cat.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-lg">{cat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Impact Section - Refined for better alignment and smaller image */}
        <section className="bg-white text-black py-48 px-6 border-y border-black/5 relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            {/* Smaller, Aligned Left Image */}
            <div className="lg:col-span-5 relative h-[520px] rounded-[3rem] overflow-hidden shadow-xl group">
              <img 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                alt="Impact" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 right-10 text-white">
                <h3 className="text-2xl font-bold mb-2 tracking-tight">Regenerating our Home.</h3>
                <p className="text-white/70 text-sm font-light leading-relaxed">Sustaining the future of our climate through better farming.</p>
              </div>
            </div>
            
            {/* Prominent Stats Section */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-xs font-bold tracking-[0.5em] uppercase text-green-600 mb-8">{t.impact.title}</span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-12 leading-[1.1]">The Progress we Lead.</h2>
              <div className="space-y-10">
                {t.impact.stats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-10">
                    <div className="text-5xl md:text-6xl font-bold tracking-tighter tabular-nums w-40 text-right shrink-0">{stat.value}</div>
                    <div className="h-10 w-px bg-black/10 hidden md:block" />
                    <div>
                      <div className="text-xs font-bold tracking-[0.5em] uppercase text-gray-400 mb-1">{stat.label}</div>
                      <p className="text-gray-500 text-sm font-medium">Environmental impact metric</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="bg-white py-64 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold mb-32 text-center tracking-tighter leading-tight max-w-4xl mx-auto">{t.process.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
              {t.process.steps.map((step, i) => (
                <div key={i} className="text-center group px-4">
                  <div className="w-28 h-28 bg-[#F8F9F8] rounded-[2.5rem] flex items-center justify-center text-green-800 mx-auto mb-12 transform group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-700 shadow-sm border border-green-50">
                    {i === 0 ? <Leaf className="w-12 h-12" /> : i === 1 ? <Shield className="w-12 h-12" /> : <Zap className="w-12 h-12" />}
                  </div>
                  <h4 className="text-3xl font-bold mb-6 tracking-tight">{step.title}</h4>
                  <p className="text-gray-500 leading-relaxed text-lg">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-24 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6 text-center sm:text-left">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-20 mb-32">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center justify-center sm:justify-start gap-3 text-3xl font-bold tracking-tight mb-10">
                <Leaf className="w-8 h-8 text-green-600" />
                {t.nav.logo}
              </div>
              <p className="text-gray-400 max-w-sm mx-auto sm:mx-0 mb-12 text-lg leading-relaxed font-light">
                Premium organic harvests driven by technology. Experience the future of ethical commerce.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-10 uppercase tracking-widest text-xs text-black/40">Shop</h5>
              <ul className="space-y-6 text-gray-500 text-lg">
                <li className="hover:text-black cursor-pointer transition-colors">Seasonal</li>
                <li className="hover:text-black cursor-pointer transition-colors">Artisan</li>
                <li className="hover:text-black cursor-pointer transition-colors">Wellness</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-10 uppercase tracking-widest text-xs text-black/40">Company</h5>
              <ul className="space-y-6 text-gray-500 text-lg">
                <li className="hover:text-black cursor-pointer transition-colors">Mission</li>
                <li className="hover:text-black cursor-pointer transition-colors">Impact</li>
                <li className="hover:text-black cursor-pointer transition-colors">Transparency</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-16 border-t border-black/5 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-6">
              <span className="text-black font-bold uppercase tracking-widest text-xs">jm20</span>
              <span>{t.footer.copyright}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING AI HUB - OPTIMIZED FOR RESPONSIVENESS AND PROPER SIZE */}
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] flex flex-col items-end gap-4 pointer-events-none">
        {isWidgetOpen && (
          <div className="w-[calc(100vw-48px)] sm:w-[320px] md:w-[380px] pointer-events-auto glass-card rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-8 duration-500 border border-black/5 bg-white/95 backdrop-blur-3xl flex flex-col max-h-[70vh] md:max-h-[600px]">
            {/* Header - Compact */}
            <div className="bg-[#0A0B0A] text-white p-6 md:p-8 flex justify-between items-center relative overflow-hidden shrink-0">
               <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-3xl rounded-full translate-x-12 -translate-y-12" />
               <div className="relative z-10">
                <h4 className="font-bold text-lg md:text-xl flex items-center gap-2">
                   <Sparkles className="w-4 h-4 text-green-500" />
                   jm20 Support
                </h4>
                <p className="text-[9px] text-white/40 tracking-[0.3em] uppercase font-bold mt-1">AI Service Hub</p>
              </div>
              <button 
                onClick={() => { setIsWidgetOpen(false); setActiveAgentId(null); setMessages([]); setIsEscalated(false); }}
                className="hover:bg-white/10 transition-all p-2 rounded-full relative z-10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body - Scrollable */}
            <div className="flex-grow overflow-y-auto scrollbar-hide">
              {activeAgent ? (
                // Interaction State
                <div className="p-6 md:p-8 animate-in fade-in slide-in-from-right-4 duration-400 flex flex-col h-full">
                  <button 
                    onClick={() => { setActiveAgentId(null); setMessages([]); setIsEscalated(false); }}
                    className="flex items-center gap-2 text-[10px] font-bold text-gray-400 mb-4 hover:text-black transition-colors shrink-0"
                  >
                    <ArrowRight className="w-3 h-3 rotate-180" />
                    SELECT AGENT
                  </button>
                  <div className="flex items-center gap-4 mb-4 shrink-0">
                    <div className="w-12 h-12 bg-green-950 rounded-xl flex items-center justify-center text-white">
                      {React.createElement(IconMap[activeAgent.icon] || MessageSquare, { className: "w-6 h-6" })}
                    </div>
                    <div>
                      <h5 className="font-bold text-base tracking-tight leading-none">{activeAgent.title}</h5>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className={`w-1 h-1 rounded-full ${isEscalated ? 'bg-amber-500' : 'bg-green-500 animate-pulse'}`} />
                        <span className={`text-[9px] font-bold uppercase tracking-widest ${isEscalated ? 'text-amber-600' : 'text-green-600'}`}>
                          {isEscalated ? 'Escalated' : 'Active'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 min-h-0 pr-1" style={{scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,0,0,0.1) transparent'}}>
                    {messages.map((m) => (
                      <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed rounded-[1.5rem] ${
                          m.role === 'user'
                            ? 'bg-black text-white rounded-tr-none'
                            : m.role === 'system'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200 w-full text-center italic text-xs'
                            : 'bg-gray-50 text-gray-700 rounded-tl-none border border-black/5'
                        }`}>
                          {m.text}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-50 rounded-[1.5rem] rounded-tl-none px-5 py-3 border border-black/5">
                          <div className="flex space-x-1.5">
                            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Agent Selection State
                <div className="p-5 md:p-6 animate-in fade-in duration-500">
                  <p className="text-[9px] font-bold text-gray-400 mb-6 uppercase tracking-[0.2em] px-2">
                    {t.widget.greeting}
                  </p>
                  
                  <div className="space-y-2">
                    {t.support.agents.map((agent) => {
                      const IconComp = IconMap[agent.icon] || MessageSquare;
                      return (
                        <button 
                          key={agent.id}
                          onClick={() => handleSelectAgent(agent.id)}
                          className="w-full flex items-center gap-4 p-4 rounded-[1.5rem] bg-white border border-black/[0.03] hover:border-black/[0.08] hover:bg-gray-50 transition-all duration-300 group text-left relative overflow-hidden"
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-green-600 transition-colors" />
                          <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-black group-hover:scale-105 transition-transform">
                            <IconComp className="w-5 h-5" />
                          </div>
                          <div className="flex-grow min-w-0">
                            <h6 className="font-bold text-sm tracking-tight mb-0.5">
                              {agent.title}
                            </h6>
                            <p className="text-[11px] text-gray-400 truncate">
                              {agent.description.join(' • ')}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Input - Only if agent selected */}
            {activeAgent && !isEscalated && (
              <div className="p-4 md:p-6 bg-white border-t border-black/5 shrink-0">
                <div className="flex items-center gap-2 bg-black/5 rounded-full p-1.5 focus-within:bg-white focus-within:ring-1 focus-within:ring-black/5 transition-all">
                   <input 
                    type="text" 
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={t.widget.placeholder}
                    disabled={isLoading}
                    className="flex-grow bg-transparent border-none py-2 px-4 text-sm outline-none disabled:opacity-50"
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputMessage.trim()}
                    className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center shadow hover:bg-gray-900 transition-colors shrink-0 disabled:opacity-40"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {activeAgent && isEscalated && (
              <div className="p-4 md:p-6 bg-amber-50 border-t border-amber-200 shrink-0 text-center">
                <p className="text-amber-700 text-xs font-medium">Escalated to our team. We'll follow up shortly.</p>
              </div>
            )}
            
            {!activeAgent && (
              <div className="px-6 py-4 bg-black/[0.02] border-t border-black/[0.03] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 text-[8px] text-gray-400 font-bold uppercase tracking-widest">
                  <Shield className="w-3 h-3 text-green-600" />
                  E2EE Protected
                </div>
                <div className="text-[8px] font-bold text-gray-300 uppercase tracking-widest">v4.5</div>
              </div>
            )}
          </div>
        )}

        {/* Floating Trigger - Fixed Presence */}
        <button 
          onClick={() => { setIsWidgetOpen(!isWidgetOpen); if (isWidgetOpen) { setActiveAgentId(null); setMessages([]); setIsEscalated(false); } }}
          className={`pointer-events-auto w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-[0_15px_40px_rgba(0,0,0,0.2)] transition-all duration-500 transform hover:scale-105 active:scale-90 group relative overflow-hidden ${isWidgetOpen ? 'bg-black text-white' : 'bg-green-950 text-white'}`}
        >
          <MessageSquare className={`w-6 h-6 md:w-7 md:h-7 absolute transition-all duration-500 ${isWidgetOpen ? 'opacity-0 scale-50 rotate-90' : 'opacity-100 scale-100 rotate-0'}`} />
          <X className={`w-6 h-6 md:w-7 md:h-7 absolute transition-all duration-500 ${isWidgetOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90'}`} />
          {!isWidgetOpen && (
            <span className="absolute top-3.5 right-3.5 w-3 h-3 bg-green-500 rounded-full border-[3px] border-[#0F220E] shadow-sm animate-pulse" />
          )}
        </button>
      </div>

    </div>
  );
};

export default App;

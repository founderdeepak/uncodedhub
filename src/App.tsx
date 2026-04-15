import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import HoverFooter from './components/ui/hover-footer';
import { ExpandableTabs } from './components/ui/expandable-tabs';
import { FloatingWhatsApp } from './components/ui/floating-whatsapp';
import { Menu, X, Info, MessageCircle, Laptop, Briefcase, ChevronRight, BookOpen, CheckCircle, Calendar } from 'lucide-react';
import { supabase } from './lib/supabase';
import { PopupModal } from 'react-calendly';

/* Pages */
import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Contact from './pages/Contact';
import Blogs from './pages/Blogs';
import BlogView from './pages/BlogView';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSuccess, setIsModalSuccess] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', countryCode: '+91' });
  
  const navigate = useNavigate();
  const location = useLocation();

  const navTabs = [
    { title: "Services", icon: Laptop, path: "/services" },
    { title: "Portfolio", icon: Briefcase, path: "/portfolio" },
    { title: "Blog", icon: BookOpen, path: "/blog" },
    { title: "About", icon: Info, path: "/about" },
    { title: "Contact", icon: MessageCircle, path: "/contact" },
  ];

  /* Match active tab based on route */
  const currentTabIndex = navTabs.findIndex(t => location.pathname.startsWith(t.path));

  const handleNavChange = (index: number | null) => {
    if (index !== null) {
      navigate(navTabs[index].path);
    }
  };

  const handleWhatsAppSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to Supabase
    try {
      await supabase.from('leads_backup').insert({ 
        name: formData.name, 
        email: formData.email, 
        phone: `${formData.countryCode} ${formData.phone}`, 
        project_details: 'Contact Form - Start Project Modal',
        business_type: 'Unknown',
        submitted_at: new Date().toISOString()
      });
    } catch (err) {
      console.error('Supabase Error:', err);
    }
    // Instead of jumping to WhatsApp instantly, show world-class success flow
    setIsModalSuccess(true);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-midnight text-white selection:bg-magenta/30 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto glass-panel rounded-2xl px-6 py-3 flex items-center justify-between relative shadow-lg">
          <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-3 z-50 group hover:opacity-80 transition-opacity">
            <svg width="36" height="36" viewBox="0 0 100 100" className="overflow-visible">
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00F0FF" />
                  <stop offset="100%" stopColor="#B026FF" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <g stroke="url(#logoGrad)" strokeWidth="2" fill="none">
                <circle cx="50" cy="50" r="40" />
                <circle cx="50" cy="50" r="20" />
                <line x1="50" y1="10" x2="50" y2="90" />
                <line x1="10" y1="50" x2="90" y2="50" />
                <line x1="21.7" y1="21.7" x2="78.3" y2="78.3" />
                <line x1="21.7" y1="78.3" x2="78.3" y2="21.7" />
                <ellipse cx="50" cy="50" rx="40" ry="15" />
                <ellipse cx="50" cy="50" rx="15" ry="40" />
              </g>
              <g fill="url(#logoGrad)">
                <circle cx="50" cy="10" r="3" />
                <circle cx="50" cy="90" r="3" />
                <circle cx="10" cy="50" r="3" />
                <circle cx="90" cy="50" r="3" />
                <circle cx="21.7" cy="21.7" r="3" />
                <circle cx="78.3" cy="78.3" r="3" />
                <circle cx="21.7" cy="78.3" r="3" />
                <circle cx="78.3" cy="21.7" r="3" />
                <circle cx="50" cy="30" r="2.5" />
                <circle cx="50" cy="70" r="2.5" />
                <circle cx="30" cy="50" r="2.5" />
                <circle cx="70" cy="50" r="2.5" />
                <circle cx="35.8" cy="35.8" r="2.5" />
                <circle cx="64.2" cy="64.2" r="2.5" />
                <circle cx="35.8" cy="64.2" r="2.5" />
                <circle cx="64.2" cy="35.8" r="2.5" />
              </g>
              <circle cx="50" cy="50" r="4" fill="#00F0FF" filter="url(#glow)" />
            </svg>
            <span className="font-display font-bold text-xl tracking-widest uppercase relative z-50">Uncoded Hub</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <ExpandableTabs tabs={navTabs} onChange={handleNavChange} activeTabIndex={currentTabIndex === -1 ? null : currentTabIndex} />
            <button onClick={() => setIsModalOpen(true)} className="cyan-energy-btn !py-2.5 !px-6 !text-sm !font-medium shrink-0 ml-2">
              Start Project
            </button>
          </div>

          <div className="flex md:hidden items-center gap-4 z-50">
            <button onClick={() => setIsModalOpen(true)} className="cyan-energy-btn !py-1.5 !px-4 !text-xs !font-medium shrink-0 rounded-lg">
              Start
            </button>
            <button aria-expanded={isMobileMenuOpen} aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white hover:text-cyan transition-colors">
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          <div className={`absolute top-full left-0 right-0 mt-2 glass-panel rounded-2xl p-4 flex flex-col gap-4 text-center transition-all origin-top duration-300 md:hidden ${isMobileMenuOpen ? 'scale-y-100 opacity-100 visible' : 'scale-y-0 opacity-0 invisible'}`}>
             <Link to="/services" onClick={closeMobileMenu} className="text-lg font-semibold py-2 hover:text-cyan border-b border-white/5">SERVICES</Link>
             <Link to="/portfolio" onClick={closeMobileMenu} className="text-lg font-semibold py-2 hover:text-cyan border-b border-white/5">PORTFOLIO</Link>
             <Link to="/blog" onClick={closeMobileMenu} className="text-lg font-semibold py-2 hover:text-cyan border-b border-white/5">BLOG</Link>
             <Link to="/about" onClick={closeMobileMenu} className="text-lg font-semibold py-2 hover:text-cyan border-b border-white/5">ABOUT</Link>
             <Link to="/contact" onClick={closeMobileMenu} className="text-lg font-semibold py-2 hover:text-cyan border-b border-white/5">CONTACT</Link>
             <button onClick={() => { setIsModalOpen(true); closeMobileMenu(); }} className="text-lg font-semibold py-2 text-cyan">START A PROJECT</button>
          </div>
        </div>
      </nav>

      {/* Pages Router */}
      <Routes>
        <Route path="/" element={<Home onOpenModal={() => setIsModalOpen(true)} />} />
        <Route path="/services" element={<Services onOpenModal={() => setIsModalOpen(true)} />} />
        <Route path="/portfolio" element={<Portfolio onOpenModal={() => setIsModalOpen(true)} />} />
        <Route path="/about" element={<About onOpenModal={() => setIsModalOpen(true)} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/blog/:slug" element={<BlogView />} />
      </Routes>

      {/* Footer */}
      <HoverFooter />

      {/* WhatsApp Chatbot */}
      <FloatingWhatsApp />

      {/* Global Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-midnight/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="frosted-glass relative z-10 w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
            <button aria-label="Close modal" onClick={() => { setIsModalOpen(false); setIsModalSuccess(false); }} className="absolute top-4 right-4 text-white hover:text-cyan transition-colors z-50">
              <X className="w-6 h-6" />
            </button>
            
            {isModalSuccess ? (
              <div className="flex flex-col items-center text-center py-6 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-cyan/10 rounded-full flex items-center justify-center mb-6 border border-cyan/20">
                  <CheckCircle className="w-10 h-10 text-cyan" />
                </div>
                <h2 className="font-display text-3xl font-bold mb-4 text-white leading-tight">Request<br/>Received</h2>
                <p className="text-steel text-sm mb-8 px-4 leading-relaxed">
                  We'll prepare a custom strategy for <strong className="text-white">{formData.name}</strong>. Pick a time below for your 1-on-1 discovery call.
                </p>
                <button 
                  onClick={(e) => { 
                    e.preventDefault();
                    setIsModalOpen(false); 
                    setIsCalendlyOpen(true); 
                  }}
                  className="cyan-energy-btn w-full flex items-center justify-center gap-2 !py-4 !text-lg"
                >
                  <Calendar className="w-5 h-5"/> Schedule Discovery Call
                </button>
                <button onClick={() => setIsModalOpen(false)} className="mt-4 text-xs text-steel hover:text-white transition-colors">
                  I'll do this later
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-display text-2xl font-bold mb-2 text-white">Let's Build It.</h2>
                <p className="text-steel text-sm mb-6">Drop your details below and our team will prepare a custom proposal.</p>
                
                <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-steel uppercase tracking-wider mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-midnight/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-steel uppercase tracking-wider mb-2">Phone Number</label>
                <div className="flex gap-2">
                  <select 
                    value={formData.countryCode}
                    onChange={(e) => setFormData({...formData, countryCode: e.target.value})}
                    className="w-[110px] bg-midnight/50 border border-white/10 rounded-xl px-3 py-3 text-white focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-all cursor-pointer"
                  >
                    <option value="+1">+1 (US)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+91">+91 (IN)</option>
                    <option value="+971">+971 (AE)</option>
                    <option value="+61">+61 (AU)</option>
                  </select>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-midnight/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-all"
                    placeholder="8660819023"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-steel uppercase tracking-wider mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-midnight/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-all"
                  placeholder="john@example.com"
                />
              </div>
              
                <button type="submit" className="cyan-energy-btn w-full mt-6 flex items-center justify-center gap-2">
                  Apply for Project <ChevronRight className="w-5 h-5"/>
                </button>
              </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Calendly World-Class Modal Integration */}
      <PopupModal
        url="https://calendly.com/uncodedhub"
        onModalClose={() => setIsCalendlyOpen(false)}
        open={isCalendlyOpen}
        rootElement={document.getElementById("root") as HTMLElement}
      />
    </div>
  );
}

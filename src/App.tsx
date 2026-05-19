import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import HoverFooter from './components/ui/hover-footer';
import { ExpandableTabs } from './components/ui/expandable-tabs';
import { FloatingWhatsApp } from './components/ui/floating-whatsapp';
import { Menu, X, Info, MessageCircle, Laptop, Briefcase, ChevronRight, BookOpen, CheckCircle, Calendar, Home as HomeIcon } from 'lucide-react';
import { supabase } from './lib/supabase';
import { BookingModal } from './components/ui/booking-modal';

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
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', countryCode: '+91' });
  
  const navigate = useNavigate();
  const location = useLocation();

  const navTabs = [
    { title: "Home", icon: HomeIcon, path: "/" },
    { title: "Services", icon: Laptop, path: "/services" },
    { title: "Portfolio", icon: Briefcase, path: "/portfolio" },
    { title: "Blog", icon: BookOpen, path: "/blog" },
    { title: "About", icon: Info, path: "/about" },
    { title: "Contact", icon: MessageCircle, path: "/contact" },
  ];

  /* Match active tab based on route */
  /* Exact or startsWith match algorithm depending on if it's the root path */
  const currentTabIndex = navTabs.findIndex(t => 
    t.path === '/' ? location.pathname === '/' : location.pathname.startsWith(t.path)
  );

  const handleOpenModal = () => {
    navigate('/contact');
    setTimeout(() => {
      const formEl = document.getElementById('contact-form-section');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    }, 200);
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
          
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-1 bg-midnight/80 rounded-2xl p-1.5 border border-white/5">
              {navTabs.map((tab, idx) => {
                const isActive = currentTabIndex === idx;
                const Icon = tab.icon;
                return (
                  <Link
                    key={tab.path}
                    to={tab.path}
                    className={`flex items-center px-4 md:px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 ${
                      isActive 
                        ? 'bg-white/10 text-white shadow-sm' 
                        : 'text-steel hover:text-cyan hover:bg-cyan/5'
                    }`}
                  >
                    <span className={isActive ? 'text-white' : ''}>{tab.title}</span>
                  </Link>
                );
              })}
            </div>
            <button onClick={handleOpenModal} className="cyan-energy-btn !py-2.5 !px-6 !text-sm !font-medium shrink-0 ml-2">
              Start Project
            </button>
          </div>

          <div className="flex lg:hidden items-center gap-3 z-50">
            <button onClick={handleOpenModal} className="cyan-energy-btn !py-1.5 !px-4 !text-xs !font-medium shrink-0 rounded-lg">
              Start
            </button>
            <button aria-expanded={isMobileMenuOpen} aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white hover:text-cyan transition-colors">
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          <div className={`absolute top-full left-4 right-4 mt-2 bg-midnight/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex flex-col gap-1 shadow-2xl transition-all origin-top duration-300 lg:hidden ${isMobileMenuOpen ? 'scale-y-100 opacity-100 visible' : 'scale-y-0 opacity-0 invisible'}`}>
             <Link to="/" onClick={closeMobileMenu} className="text-sm font-semibold tracking-wide py-3 px-4 rounded-xl hover:bg-white/5 hover:text-cyan text-steel transition-colors flex items-center justify-between">HOME <ChevronRight className="w-4 h-4 opacity-30" /></Link>
             <Link to="/services" onClick={closeMobileMenu} className="text-sm font-semibold tracking-wide py-3 px-4 rounded-xl hover:bg-white/5 hover:text-cyan text-steel transition-colors flex items-center justify-between">SERVICES <ChevronRight className="w-4 h-4 opacity-30" /></Link>
             <Link to="/portfolio" onClick={closeMobileMenu} className="text-sm font-semibold tracking-wide py-3 px-4 rounded-xl hover:bg-white/5 hover:text-cyan text-steel transition-colors flex items-center justify-between">PORTFOLIO <ChevronRight className="w-4 h-4 opacity-30" /></Link>
             <Link to="/blog" onClick={closeMobileMenu} className="text-sm font-semibold tracking-wide py-3 px-4 rounded-xl hover:bg-white/5 hover:text-cyan text-steel transition-colors flex items-center justify-between">BLOG <ChevronRight className="w-4 h-4 opacity-30" /></Link>
             <Link to="/about" onClick={closeMobileMenu} className="text-sm font-semibold tracking-wide py-3 px-4 rounded-xl hover:bg-white/5 hover:text-cyan text-steel transition-colors flex items-center justify-between">ABOUT <ChevronRight className="w-4 h-4 opacity-30" /></Link>
             <Link to="/contact" onClick={closeMobileMenu} className="text-sm font-semibold tracking-wide py-3 px-4 rounded-xl hover:bg-white/5 hover:text-cyan text-steel transition-colors flex items-center justify-between">CONTACT <ChevronRight className="w-4 h-4 opacity-30" /></Link>
             <div className="pt-2 px-2 pb-2 mt-1 border-t border-white/5">
                <button onClick={() => { handleOpenModal(); closeMobileMenu(); }} className="w-full text-sm font-bold py-3.5 px-4 rounded-xl text-white bg-gradient-to-r from-[#00F0FF] to-[#B026FF] shadow-lg shadow-cyan/20 transition-all hover:scale-[1.02]">START A PROJECT</button>
             </div>
          </div>
        </div>
      </nav>

      {/* Pages Router */}
      <Routes>
        <Route path="/" element={<Home onOpenModal={handleOpenModal} />} />
        <Route path="/services" element={<Services onOpenModal={handleOpenModal} />} />
        <Route path="/portfolio" element={<Portfolio onOpenModal={handleOpenModal} />} />
        <Route path="/about" element={<About onOpenModal={handleOpenModal} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/blog/:slug" element={<BlogView />} />
      </Routes>

      {/* Footer */}
      <HoverFooter />

      {/* WhatsApp Chatbot */}
      <FloatingWhatsApp />



      {/* Custom Google Meet Booking Modal */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </div>
  );
}

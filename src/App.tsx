import React, { useRef } from 'react';
import WireframeSphere from './components/WireframeSphere';
import { ArrowRight, Code2, Zap, Cpu, CheckCircle2, ChevronRight, Star, ShieldCheck, TrendingUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const philosophyRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Hero Entrance
    if (heroRef.current) {
      const heroElements = heroRef.current.querySelectorAll('.hero-anim');
      gsap.from(heroElements, {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
      });
    }

    // Process Timeline
    if (processRef.current) {
      const steps = processRef.current.querySelectorAll('.process-step');
      gsap.from(steps, {
        scrollTrigger: {
          trigger: processRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
      });
    }

    // Philosophies
    philosophyRefs.current.forEach((el) => {
      if (el) {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
          },
          opacity: 0,
          duration: 1.5,
          ease: 'power2.inOut',
        });
      }
    });
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !philosophyRefs.current.includes(el)) {
      philosophyRefs.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-midnight text-white selection:bg-magenta/30 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto glass-panel rounded-2xl px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
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
                {/* Outer Sphere */}
                <circle cx="50" cy="50" r="40" />
                {/* Inner Sphere */}
                <circle cx="50" cy="50" r="20" />
                
                {/* Radiating Lines */}
                <line x1="50" y1="10" x2="50" y2="90" />
                <line x1="10" y1="50" x2="90" y2="50" />
                <line x1="21.7" y1="21.7" x2="78.3" y2="78.3" />
                <line x1="21.7" y1="78.3" x2="78.3" y2="21.7" />
                
                {/* Curves (Latitudes/Longitudes approximation) */}
                <ellipse cx="50" cy="50" rx="40" ry="15" />
                <ellipse cx="50" cy="50" rx="15" ry="40" />
              </g>

              {/* Nodes */}
              <g fill="url(#logoGrad)">
                {/* Outer nodes */}
                <circle cx="50" cy="10" r="3" />
                <circle cx="50" cy="90" r="3" />
                <circle cx="10" cy="50" r="3" />
                <circle cx="90" cy="50" r="3" />
                <circle cx="21.7" cy="21.7" r="3" />
                <circle cx="78.3" cy="78.3" r="3" />
                <circle cx="21.7" cy="78.3" r="3" />
                <circle cx="78.3" cy="21.7" r="3" />
                
                {/* Inner nodes */}
                <circle cx="50" cy="30" r="2.5" />
                <circle cx="50" cy="70" r="2.5" />
                <circle cx="30" cy="50" r="2.5" />
                <circle cx="70" cy="50" r="2.5" />
                <circle cx="35.8" cy="35.8" r="2.5" />
                <circle cx="64.2" cy="64.2" r="2.5" />
                <circle cx="35.8" cy="64.2" r="2.5" />
                <circle cx="64.2" cy="35.8" r="2.5" />
              </g>
              
              {/* Center Node */}
              <circle cx="50" cy="50" r="4" fill="#00F0FF" filter="url(#glow)" />
            </svg>
            <span className="font-display font-bold text-xl tracking-widest uppercase">Uncoded Hub</span>
          </div>
          <button className="bg-magenta text-white px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 btn-hover">
            Start a Project <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* SECTION 1: HERO - THE HOOK */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden min-h-[90vh] flex items-center">
        {/* Background Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-magenta/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-cyan/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10" ref={heroRef}>
          <div className="space-y-8">
            <h1 className="hero-anim font-display text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight">
              Your Business Deserves to be Online. <br/>
              <span className="text-gradient">We Make it Happen in 5 Days.</span>
            </h1>
            
            <p className="hero-anim text-lg md:text-xl text-steel max-w-xl leading-relaxed">
              Stop losing customers to competitors who have a website. Get a fully functional, professional digital storefront built for revenue, not just looks.
            </p>
            
            <div className="hero-anim flex flex-col items-start gap-4 pt-4">
              <button className="bg-magenta text-white px-8 py-4 rounded-xl font-medium flex items-center gap-2 text-lg btn-hover">
                Claim Your 5-Day Build <ChevronRight className="w-5 h-5" />
              </button>
              
              <div className="mt-6 border-l-2 border-cyan/30 pl-4" ref={addToRefs}>
                <p className="italic text-steel/80 text-sm max-w-md">
                  "A business without a website is a business that sleeps. Your website is the only salesman that works 24/7, 365 days a year without asking for a raise."
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative h-[500px] lg:h-[600px] w-full">
            <WireframeSphere />
          </div>
        </div>
      </section>

      {/* SECTION 2: THE PROCESS - 5-DAY DELIVERY PROMISE */}
      <section className="py-24 px-6 relative z-10 bg-cyber/30 border-t border-white/5">
        <div className="max-w-4xl mx-auto" ref={processRef}>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">From Idea to Live in 120 Hours.</h2>
            <p className="text-steel text-lg">Here is How:</p>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan via-magenta to-transparent md:-translate-x-1/2"></div>

            <div className="space-y-12">
              {[
                { day: "1", title: "Strategy & Architecture", desc: "We learn your business and map the blueprint." },
                { day: "2-3", title: "Design & Development", desc: "We build the engine and design the interface." },
                { day: "4", title: "Review & Refine", desc: "You review, we perfect it." },
                { day: "5", title: "Launch & Handover", desc: "You go live to the world." }
              ].map((step, index) => (
                <div key={step.day} className={`process-step relative flex flex-col md:flex-row items-start md:items-center gap-8 group ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Timeline Node */}
                  <div className="absolute left-0 md:left-1/2 w-14 h-14 rounded-full bg-midnight border-2 border-cyber flex items-center justify-center md:-translate-x-1/2 z-10 group-hover:border-cyan transition-colors duration-300 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                    <span className="font-mono font-bold text-sm text-white group-hover:text-cyan transition-colors">D{step.day}</span>
                  </div>
                  
                  {/* Content */}
                  <div className={`ml-20 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16 md:text-right'}`}>
                    <div className="bg-cyber/50 p-6 rounded-2xl border border-white/5 group-hover:border-white/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                      <h4 className="font-display text-xl font-bold mb-2 text-steel group-hover:text-white transition-colors duration-300">Day {step.day}: {step.title}</h4>
                      <p className="text-steel/80 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-20 max-w-2xl mx-auto text-center" ref={addToRefs}>
            <div className="bg-cyber/40 border border-white/10 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan to-magenta"></div>
              <p className="font-display text-xl md:text-2xl italic text-white/90 leading-relaxed">
                "Speed is the currency of modern business. While your competitors spend months debating colors, you could be closing sales."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: PORTFOLIO - HIGHLY EFFICIENT DESIGN SAMPLES */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Built to Convert. Designed to Impress.</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="portfolio-card rounded-2xl border border-white/10 bg-cyber/50 group cursor-pointer">
              <div className="h-48 overflow-hidden relative">
                <img src="https://picsum.photos/seed/retail/600/400" alt="Local Retail & Services" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-midnight/20 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold mb-2">Local Retail & Services</h3>
                <p className="text-steel text-sm">Optimized for local SEO and foot traffic conversion.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="portfolio-card rounded-2xl border border-white/10 bg-cyber/50 group cursor-pointer">
              <div className="h-48 overflow-hidden relative">
                <img src="https://picsum.photos/seed/portfolio/600/400" alt="Professional Portfolios" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-midnight/20 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold mb-2">Professional Portfolios</h3>
                <p className="text-steel text-sm">Sleek, authoritative designs that build instant trust.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="portfolio-card rounded-2xl border border-white/10 bg-cyber/50 group cursor-pointer">
              <div className="h-48 overflow-hidden relative">
                <img src="https://picsum.photos/seed/ecommerce/600/400" alt="E-commerce Hubs" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-midnight/20 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold mb-2">E-commerce Hubs</h3>
                <p className="text-steel text-sm">Frictionless checkout experiences designed to sell.</p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center" ref={addToRefs}>
            <p className="italic text-steel text-lg max-w-3xl mx-auto">
              "Design isn’t just how it looks; it’s how it converts. A confused visitor leaves, but a guided visitor buys."
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE ADVANTAGE - NO-CODE SKILLS */}
      <section className="py-24 px-6 relative z-10 bg-cyber/30 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">The Uncoded Advantage.</h2>
            <p className="text-steel text-lg leading-relaxed mb-8">
              We utilize advanced no-code architecture. What does that mean for you? Zero bloated code, lightning-fast load times, and a website you can easily understand and manage without hiring an expensive IT team.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-white/90">
                <Zap className="w-5 h-5 text-cyan" /> Lightning-fast load times
              </li>
              <li className="flex items-center gap-3 text-white/90">
                <Code2 className="w-5 h-5 text-magenta" /> Zero bloated code
              </li>
              <li className="flex items-center gap-3 text-white/90">
                <ShieldCheck className="w-5 h-5 text-cyan" /> Easy to manage & secure
              </li>
            </ul>
          </div>
          
          <div ref={addToRefs} className="bg-midnight p-8 rounded-3xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-magenta/10 rounded-full blur-[50px]"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan/10 rounded-full blur-[50px]"></div>
            <p className="font-display text-2xl italic text-white/90 leading-relaxed relative z-10">
              "Complexity kills progress. The best technology is the kind that gets out of your way and lets you run your business."
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: SOCIAL PROOF & RETENTION */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Real Results & Our Growth Partnership</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Testimonial 1 */}
            <div className="bg-cyber/50 p-8 rounded-2xl border border-white/5">
              <div className="flex text-cyan mb-4">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-lg text-white/90 mb-6">"They delivered exactly what they promised in 5 days. Our conversion rate doubled in the first month."</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10"></div>
                <div>
                  <p className="font-bold text-sm">Sarah J.</p>
                  <p className="text-steel text-xs">Local Retail Owner</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-cyber/50 p-8 rounded-2xl border border-white/5">
              <div className="flex text-cyan mb-4">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-lg text-white/90 mb-6">"The speed is unmatched. I didn't have to wait months to get my portfolio online. Highly recommended."</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10"></div>
                <div>
                  <p className="font-bold text-sm">David M.</p>
                  <p className="text-steel text-xs">Consultant</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyber to-midnight p-8 md:p-12 rounded-3xl border border-white/10 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
              <TrendingUp className="w-8 h-8 text-magenta" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold mb-3">The Partnership Pitch</h3>
              <p className="text-steel leading-relaxed">
                We don't just hand you the keys and leave. With our monthly Growth & Security Partnership, we maintain, secure, and update your site so you can focus entirely on your customers.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center" ref={addToRefs}>
            <p className="italic text-steel text-lg max-w-3xl mx-auto">
              "The cost of a professional website is an investment. The cost of a bad website—or no website at all—is every customer who couldn't find you."
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: FINAL CTA - URGENCY */}
      <section className="py-24 px-6 relative z-10 bg-cyber/80 border-t border-white/5 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-magenta/10 via-midnight to-midnight pointer-events-none"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-8">Ready to digitize your business this week?</h2>
          <button className="bg-magenta text-white px-10 py-5 rounded-xl font-bold text-xl flex items-center gap-3 mx-auto btn-hover">
            Book Your Strategy Call Now <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 text-center border-t border-white/5 text-steel font-mono text-sm bg-midnight relative z-10">
        <p>&copy; {new Date().getFullYear()} Uncoded Hub. All systems operational.</p>
      </footer>
    </div>
  );
}


import React, { useRef } from 'react';
import WireframeSphere from '../components/WireframeSphere';
import { FaqAccordion } from '../components/ui/faq-accordion';
import { ArrowRight, Code2, Zap, ShieldCheck, ChevronRight, Star, TrendingUp, XCircle, CheckCircle2, MessageCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function Home({ onOpenModal }: { onOpenModal: () => void }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const philosophyRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      if (heroRef.current) {
        gsap.from(heroRef.current.querySelectorAll('.hero-anim'), {
          y: 30, opacity: 0, stagger: 0.2, duration: 1, ease: 'power3.out', delay: 0.2
        });
      }
      if (processRef.current) {
        gsap.from(processRef.current.querySelectorAll('.process-step'), {
          scrollTrigger: { trigger: processRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          y: 40, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out'
        });
      }
      philosophyRefs.current.forEach((el) => {
        if (el) {
          gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 90%' }, opacity: 0, duration: 1.5, ease: 'power2.inOut' });
        }
      });
    });

    mm.add("(max-width: 767px)", () => {
      if (heroRef.current) {
        gsap.from(heroRef.current.querySelectorAll('.hero-anim'), {
          y: 20, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out', delay: 0.1
        });
      }
      if (processRef.current) {
        gsap.from(processRef.current.querySelectorAll('.process-step'), {
          scrollTrigger: { trigger: processRef.current, start: 'top 90%', toggleActions: 'play none none none' },
          y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out'
        });
      }
      philosophyRefs.current.forEach((el) => {
        if (el) {
          gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 90%' }, opacity: 0, duration: 1.0, ease: 'power2.inOut' });
        }
      });
    });
    return () => mm.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !philosophyRefs.current.includes(el)) philosophyRefs.current.push(el);
  };

  return (
    <>
      <Helmet>
        <title>Uncoded Hub | Professional No-Code Website Development in 7 Days</title>
        <meta name="description" content="Get a premium, high-converting business website built in just 7 days. World-class no-code development. E-commerce, medical, spa, restaurant websites. Free consultation and custom quote." />
        <meta name="keywords" content="no-code website development, webflow developer India, website development Bengaluru, affordable website design, 7-day website delivery, professional website India, small business website, startup website" />
        <link rel="canonical" href="https://uncodedhub.com/" />
      </Helmet>
      
      <main>
        {/* SECTION 1: HERO */}
        <section className="relative pt-40 pb-24 px-6 overflow-hidden min-h-[90vh] flex items-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-magenta/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-cyan/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center relative z-10 w-full min-h-[600px]" ref={heroRef}>
            <div className="w-full lg:w-[55%] space-y-8 relative z-20 pt-10 lg:pt-0">
              <h1 className="hero-anim font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-2xl">
                Get More Coaching Clients With a Website That Works While You Sleep
              </h1>
              <p className="hero-anim text-lg md:text-xl text-steel max-w-xl leading-relaxed drop-shadow-md">
                We build world-class coaching websites in 7 days — complete with AI chatbot, SEO setup, and Google My Business. Your coaching practice deserves a digital presence that attracts premium clients 24/7. Guaranteed delivery or you pay nothing.
              </p>
              
              <div className="hero-anim flex flex-col items-start gap-4 pt-4">
                <div className="flex flex-wrap gap-4">
                  <button onClick={onOpenModal} className="cyan-energy-btn !text-lg !px-8 !py-4">
                    Start Your Project <ChevronRight className="w-5 h-5" />
                  </button>
                  <Link to="/portfolio" className="flex items-center gap-2 text-white border border-white/20 hover:bg-white/5 transition-colors px-8 py-4 rounded-xl font-medium">
                    View Our Work
                  </Link>
                </div>
                
                <div className="mt-8 flex flex-wrap gap-3" ref={addToRefs}>
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs font-mono text-cyan backdrop-blur-sm">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 7-Day Delivery Guarantee
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs font-mono text-cyan backdrop-blur-sm">
                    <CheckCircle2 className="w-3.5 h-3.5" /> AI-Powered Websites
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs font-mono text-cyan backdrop-blur-sm">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Built for Coaches
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs font-mono text-cyan backdrop-blur-sm">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Free Discovery Call
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute top-0 right-0 w-full h-[350px] md:h-[500px] opacity-30 -z-10 lg:relative lg:w-[50%] lg:h-[700px] lg:opacity-100 lg:z-10 lg:-ml-[5%] pointer-events-none flex justify-center items-center">
              <WireframeSphere />
            </div>
          </div>
        </section>

        {/* SECTION 1.5: THE PAIN POINT / PARADIGM SHIFT */}
        <section className="py-24 px-6 relative z-10 border-t border-white/5 bg-midnight">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 max-w-3xl mx-auto" ref={addToRefs}>
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">Is Your Coaching Practice <span className="text-magenta">Invisible Online?</span></h2>
              <p className="text-steel text-lg leading-relaxed">
                Let's be direct. Right now, potential coaching clients are searching for someone exactly like you online. If your website doesn't exist or doesn't build instant trust — they're booking with another coach. A world-class website fixes this permanently.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8" ref={addToRefs}>
              {/* The Invisible Business (Pain) */}
              <div className="bg-red-500/5 border border-red-500/20 p-8 md:p-10 rounded-3xl relative overflow-hidden transition-all hover:bg-red-500/10 duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-[50px] pointer-events-none"></div>
                <h3 className="font-display text-2xl font-bold mb-8 text-white flex items-center gap-3">
                  <XCircle className="w-8 h-8 text-red-500" /> The Invisible Business
                </h3>
                <ul className="space-y-8">
                  <li className="flex gap-4 items-start">
                    <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white mb-1.5 text-lg">Losing clients to coaches with better online presence</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white mb-1.5 text-lg">Spending hours explaining your expertise on every call</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white mb-1.5 text-lg">No automated way to capture leads while you sleep</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* The Uncoded Hub Partner (Solution) */}
              <div className="bg-cyan/5 border border-cyan/20 p-8 md:p-10 rounded-3xl relative overflow-hidden transition-all hover:bg-cyan/10 duration-500 shadow-[0_0_30px_rgba(0,229,255,0.05)]">
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan/10 rounded-full blur-[50px] pointer-events-none"></div>
                <h3 className="font-display text-2xl font-bold mb-8 text-white flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-cyan" /> The Uncoded Hub Standard
                </h3>
                <ul className="space-y-8">
                  <li className="flex gap-4 items-start">
                    <CheckCircle2 className="w-6 h-6 text-cyan shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white mb-1.5 text-lg">A website that positions you as the top coach in your field</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <CheckCircle2 className="w-6 h-6 text-cyan shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white mb-1.5 text-lg">Clients arrive pre-sold on your expertise before the first call</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <CheckCircle2 className="w-6 h-6 text-cyan shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white mb-1.5 text-lg">AI chatbot captures and qualifies leads 24 hours a day</p>
                    </div>
                  </li>
                </ul>
                <div className="mt-8 pt-6 border-t border-cyan/10 flex items-center justify-between">
                  <p className="font-mono text-cyan text-sm font-bold tracking-wider uppercase">Solved in exactly 7 Days.</p>
                  <button onClick={onOpenModal} className="text-sm font-bold text-white hover:text-cyan transition-colors flex items-center gap-2 group">
                    Fix this now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: VALUE PROPOSITION */}
        <section className="py-24 px-6 relative z-10 bg-cyber/30 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">What Makes Us Unique in the Industry</h2>
              <p className="text-steel text-lg">Building trust through extraordinary readability and user experience</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl frosted-glass border border-white/10 hover:border-cyan/30 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center text-cyan"><Zap className="w-6 h-6" /></div>
                  <div className="font-mono text-cyan text-sm font-bold tracking-wider">Unmatched Trust</div>
                </div>
                <h3 className="font-display text-2xl font-bold mb-4">Readability & Trust</h3>
                <p className="text-steel leading-relaxed">We don't just build websites; we engineer trust. By mastering readability, spacing, and modern kinetic typography, your digital presence instantly signals premium authority to every visitor.</p>
              </div>
              <div className="p-8 rounded-3xl frosted-glass border border-white/10 hover:border-magenta/30 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-magenta/10 flex items-center justify-center text-magenta"><TrendingUp className="w-6 h-6" /></div>
                  <div className="font-mono text-magenta text-sm font-bold tracking-wider">Zero Bloat</div>
                </div>
                <h3 className="font-display text-2xl font-bold mb-4">Bespoke Scalability</h3>
                <p className="text-steel leading-relaxed">No expensive agency bloat. You get custom, high-end digital solutions powered by cutting-edge no-code technology—ensuring maximum flexibility without the archaic development barriers.</p>
              </div>
              <div className="p-8 rounded-3xl frosted-glass border border-white/10 hover:border-white/30 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white"><Star className="w-6 h-6" /></div>
                  <div className="font-mono text-white text-sm font-bold tracking-wider">Lightning Deployment</div>
                </div>
                <h3 className="font-display text-2xl font-bold mb-4">7-Day Live Execution</h3>
                <p className="text-steel leading-relaxed">Get your fully functional, visually striking website live in just 7 days. Say goodbye to months of waiting—capture your target market immediately.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: HOW IT WORKS */}
        <section className="py-24 px-6 relative z-10 border-t border-white/5">
          <div className="max-w-4xl mx-auto" ref={processRef}>
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">From Idea to Launch in 4 Simple Steps</h2>
              <p className="text-steel text-lg">Our proven process delivers results, on time, every time</p>
            </div>
            <div className="relative">
              <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan via-magenta to-transparent md:-translate-x-1/2"></div>
              <div className="space-y-12">
                {[
                  { step: "1", time: "Days 1-2", title: "Discovery & Strategy", desc: "Deep-dive consultation to understand your coaching business, goals, and target audience. We nail down your offer and positioning." },
                  { step: "2", time: "Days 3-4", title: "Design & Identity", desc: "Our designers create stunning mockups that bring your vision to life. See exactly how your site will look before we build. Rapid iteration rounds." },
                  { step: "3", time: "Days 5-6", title: "Development & Systems", desc: "We transform designs into a high-performance website. Chatbots, booking forms, and automations are connected and tested to perfection." },
                  { step: "4", time: "Day 7", title: "Launch & Support", desc: "Domain connection, SSL certificate, final testing, and launch. Plus, you get training and 30 days of free support to ensure everything is smooth." }
                ].map((s, index) => (
                  <div key={s.step} className={`process-step relative flex flex-col md:flex-row items-start md:items-center gap-8 group ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="absolute left-0 md:left-1/2 w-14 h-14 rounded-full bg-midnight border-2 border-cyber flex items-center justify-center md:-translate-x-1/2 z-10 group-hover:border-cyan transition-colors duration-300 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                      <span className="font-mono font-bold text-sm text-white group-hover:text-cyan transition-colors">S{s.step}</span>
                    </div>
                    <div className={`ml-20 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16 md:text-right'}`}>
                      <div className="frosted-glass p-6 rounded-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_15px_40px_rgba(0,229,255,0.1)] group-hover:border-white/30">
                        <div className="text-cyan text-sm font-mono mb-2">{s.time}</div>
                        <h3 className="font-display text-xl font-bold mb-2 text-white group-hover:text-cyan transition-colors duration-300">{s.title}</h3>
                        <p className="text-white/80 text-sm leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-20 text-center">
               <Link to="/services" className="cyan-energy-btn !py-3 !px-8">Explore Our Services</Link>
            </div>
          </div>
        </section>

        {/* SECTION 6: WHY NO-CODE? */}
        <section className="py-24 px-6 relative z-10 bg-cyber/30 border-t border-white/5">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">The Smarter Way to Build Your Coaching Website</h2>
              <p className="text-steel text-lg leading-relaxed mb-6">
                The old way of building websites takes months, costs a fortune, and leaves you waiting while your competitors grow. We changed that completely. Using cutting-edge AI-powered development tools, we build sophisticated, professional coaching websites that would take traditional agencies 3 months — delivered in 7 days flat.
              </p>
              <p className="text-steel text-lg leading-relaxed mb-8">
                The result? A world-class coaching website that positions you as the premium choice in your market — at a fraction of what agencies charge.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-white/90">
                  <Zap className="w-5 h-5 text-cyan" /> 7 Days Exact Delivery — or you pay nothing
                </li>
                <li className="flex items-center gap-3 text-white/90">
                  <MessageCircle className="w-5 h-5 text-magenta" /> AI Chatbot included — captures leads while you sleep
                </li>
                <li className="flex items-center gap-3 text-white/90">
                  <ShieldCheck className="w-5 h-5 text-cyan" /> Transparent fixed pricing — no hidden fees, ever
                </li>
              </ul>
            </div>
            
            <div ref={addToRefs} className="bg-midnight p-8 rounded-3xl border border-white/10 relative overflow-hidden h-fit">
              <div className="absolute top-0 right-0 w-32 h-32 bg-magenta/10 rounded-full blur-[50px]"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan/10 rounded-full blur-[50px]"></div>
              
              <h3 className="font-display text-2xl font-bold mb-6 text-white text-center">Traditional Agency vs Uncoded Hub</h3>
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-steel">Timeline</span>
                  <div className="text-right">
                    <span className="line-through text-white/30 text-sm mr-2 block text-right">2-3 months</span>
                    <span className="text-cyan font-bold block">7 days ⚡</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-steel">Pricing</span>
                  <div className="text-right">
                    <span className="line-through text-white/30 text-sm mr-2 block text-right">Hidden fees</span>
                    <span className="text-magenta font-bold block">Fixed upfront 💰</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-steel">Support</span>
                  <div className="text-right">
                    <span className="line-through text-white/30 text-sm mr-2 block text-right">Expensive add-on</span>
                    <span className="text-white font-bold block">Included ✨</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: ABOUT PREVIEW */}
        <section className="py-24 px-6 relative z-10">
          <div className="max-w-7xl mx-auto bg-gradient-to-br from-cyber to-midnight p-8 md:p-14 rounded-3xl border border-white/10 flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
               <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">Meet Your Digital Partners</h2>
               <p className="text-steel text-lg leading-relaxed mb-8">
                 Hi! We're Deepak and Geetha — two siblings who built Uncoded Hub with one mission: give coaches and consultants a world-class online presence that actually brings them clients. We've seen too many talented coaches lose business simply because their website didn't reflect the quality of their work. We're changing that, one coach at a time.
               </p>
               <Link to="/about" className="cyan-energy-btn !py-3 !px-8">Learn Our Story</Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
               <div className="relative">
                 <div className="absolute inset-0 bg-cyan/20 blur-[50px] rounded-full"></div>
                 <div className="aspect-square w-64 md:w-80 rounded-full border-2 border-white/10 overflow-hidden relative z-10 bg-midnight flex flex-col justify-center items-center">
                    {/* Placeholder for Photo */}
                    <span className="text-white/50 font-display text-xl text-center px-6">Deepak & Geetha</span>
                 </div>
               </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 relative z-10 bg-midnight border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-steel text-lg">Quick answers about our 7-day delivery promise.</p>
            </div>
            <FaqAccordion />
          </div>
        </section>

        {/* SECTION 10: FINAL CTA */}
        <section className="py-24 px-6 relative z-10 bg-cyber/80 border-t border-white/5 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-magenta/10 via-midnight to-midnight pointer-events-none"></div>
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">Ready to Attract More Coaching Clients Online?</h2>
            <p className="text-steel text-lg mb-10">Book a free 15-minute discovery call. We'll show you exactly what your coaching website should look like.</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button onClick={onOpenModal} className="cyan-energy-btn !px-10 !py-5 !text-xl w-full md:w-auto">
                Book Your Strategy Call
              </button>
              <Link to="/contact" className="px-10 py-4 rounded-xl border border-white/20 text-white font-medium hover:bg-white/5 transition-colors text-xl w-full md:w-auto">
                Fill Quick Form
              </Link>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-steel">
              <span>✓ Free consultation</span>
              <span>✓ Response within 2 hours</span>
              <span>✓ 100% privacy</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

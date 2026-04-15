import React, { useRef } from 'react';
import WireframeSphere from '../components/WireframeSphere';
import { FaqAccordion } from '../components/ui/faq-accordion';
import { ArrowRight, Code2, Zap, ShieldCheck, ChevronRight, Star, TrendingUp, XCircle, CheckCircle2 } from 'lucide-react';
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
        <title>Uncoded Hub | Professional No-Code Website Development in 5 Days</title>
        <meta name="description" content="Get a premium, high-converting business website built in just 5 days. World-class no-code development. E-commerce, medical, spa, restaurant websites. Free consultation and custom quote." />
        <meta name="keywords" content="no-code website development, webflow developer India, website development Bengaluru, affordable website design, 5-day website delivery, professional website India, small business website, startup website" />
        <link rel="canonical" href="https://uncodedhub.com/" />
      </Helmet>
      
      <main>
        {/* SECTION 1: HERO */}
        <section className="relative pt-40 pb-24 px-6 overflow-hidden min-h-[90vh] flex items-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-magenta/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-cyan/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center relative z-10 w-full min-h-[600px]" ref={heroRef}>
            <div className="w-full lg:w-[55%] space-y-8 relative z-20 pt-10 lg:pt-0">
              <h1 className="hero-anim font-display text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-2xl">
                Build Digital Trust <br/>
                <span className="text-gradient">Without Code.</span>
              </h1>
              <p className="hero-anim text-lg md:text-xl text-steel max-w-xl leading-relaxed drop-shadow-md">
                Professional, world-class websites delivered in 5 days. We craft digital experiences that instantly build trust with your audience. No technical knowledge needed—zero compromise on quality. Turn your vision into an industry-leading standard.
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
                
                <div className="mt-6 border-l-2 border-cyan/30 pl-4" ref={addToRefs}>
                  <p className="text-steel/90 text-sm max-w-md drop-shadow-md font-mono">
                    ✓ 100+ Brands Scaled | ✓ Unmatched Readability | ✓ 5-Day Delivery | ✓ Free Consultation
                  </p>
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
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">Is Your Business <span className="text-magenta">Losing Customers</span> While You Sleep?</h2>
              <p className="text-steel text-lg leading-relaxed">
                Let's be brutally honest. In today's digital-first world, if a customer cannot find your business online instantly, they are going to your competitor. Foot traffic and word of mouth alone are no longer enough to scale.
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
                      <p className="font-bold text-white mb-1.5 text-lg">Revenue limited by physical hours</p>
                      <p className="text-sm text-steel leading-relaxed">When you close shop at 8 PM, your sales completely stop until the next morning.</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white mb-1.5 text-lg">Bleeding leads to local competitors</p>
                      <p className="text-sm text-steel leading-relaxed">Customers searching online instantly choose the competitor who has a professional digital storefront.</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white mb-1.5 text-lg">Constant manual interruptions</p>
                      <p className="text-sm text-steel leading-relaxed">You spend hours every day answering the same basic questions over phone calls.</p>
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
                      <p className="font-bold text-white mb-1.5 text-lg">24/7 Digital Sales Machine</p>
                      <p className="text-sm text-steel leading-relaxed">Your website acts as your best salesperson, generating trust, leads, and sales even while you are asleep.</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <CheckCircle2 className="w-6 h-6 text-cyan shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white mb-1.5 text-lg">Dominate Industry Authority</p>
                      <p className="text-sm text-steel leading-relaxed">A stunning, world-class design instantly positions you as the premium, trustworthy leader in your market.</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <CheckCircle2 className="w-6 h-6 text-cyan shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white mb-1.5 text-lg">Automated Systems & Freedom</p>
                      <p className="text-sm text-steel leading-relaxed">Customers book calls, fill forms, and read FAQs on their own, giving you back critical hours of your day.</p>
                    </div>
                  </li>
                </ul>
                <div className="mt-8 pt-6 border-t border-cyan/10 flex items-center justify-between">
                  <p className="font-mono text-cyan text-sm font-bold tracking-wider uppercase">Solved in exactly 5 Days.</p>
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
                <h3 className="font-display text-2xl font-bold mb-4">5-Day Live Execution</h3>
                <p className="text-steel leading-relaxed">Get your fully functional, visually striking website live in just 5 days. Say goodbye to months of waiting—capture your target market immediately.</p>
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
                  { step: "1", time: "Day 1", title: "Discovery & Vision", desc: "Deep-dive consultation to understand your business, goals, and target audience. Share your ideas, competitors you admire, and must-have features." },
                  { step: "2", time: "Day 2", title: "Design & Identity", desc: "Our designers create stunning mockups that bring your vision to life. See exactly how your site will look before we build. Rapid iteration rounds." },
                  { step: "3", time: "Days 3-4", title: "Development", desc: "We transform designs into a high-performance website. Every button, form, and animation is tested to perfection. You get daily progress updates." },
                  { step: "4", time: "Day 5", title: "Launch & Support", desc: "Domain connection, SSL certificate, final testing, and launch. Plus, you get training and 30 days of free support to ensure everything is smooth." }
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
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">The Future of Web Development is Here</h2>
              <p className="text-steel text-lg leading-relaxed mb-6">
                No-code platforms like Webflow, Framer, and Bubble have revolutionized web development. They allow us to build sophisticated, professional websites without writing complex code—which means faster delivery, lower costs, and easier maintenance for you.
              </p>
              <p className="text-steel text-lg leading-relaxed mb-8">
                The result? You get the same quality website that would cost ₹2 lakhs+ from a traditional agency, delivered in a fraction of the time and cost.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-white/90">
                  <Zap className="w-5 h-5 text-cyan" /> 5 Days Exact Delivery Time (vs months)
                </li>
                <li className="flex items-center gap-3 text-white/90">
                  <Code2 className="w-5 h-5 text-magenta" /> Transparent Project-Based Quoting
                </li>
                <li className="flex items-center gap-3 text-white/90">
                  <ShieldCheck className="w-5 h-5 text-cyan" /> Secure, scalable & extremely readable
                </li>
              </ul>
            </div>
            
            <div ref={addToRefs} className="bg-midnight p-8 rounded-3xl border border-white/10 relative overflow-hidden h-fit">
              <div className="absolute top-0 right-0 w-32 h-32 bg-magenta/10 rounded-full blur-[50px]"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan/10 rounded-full blur-[50px]"></div>
              
              <h3 className="font-display text-2xl font-bold mb-6 text-white text-center">Traditional vs. No-Code</h3>
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-steel">Timeline</span>
                  <div className="text-right">
                    <span className="line-through text-white/30 text-sm mr-2 block text-right">2-3 months</span>
                    <span className="text-cyan font-bold block">5-10 days ⚡</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-steel">Cost Transparency</span>
                  <div className="text-right">
                    <span className="line-through text-white/30 text-sm mr-2 block text-right">Hidden Fees</span>
                    <span className="text-magenta font-bold block">100% Upfront Quote 💰</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-steel">Changes</span>
                  <div className="text-right">
                    <span className="line-through text-white/30 text-sm mr-2 block text-right">Expensive/Slow</span>
                    <span className="text-white font-bold block">Quick & Affordable ✨</span>
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
               <p className="text-steel text-lg leading-relaxed mb-4">
                 Hi! We're Deepak and Geetha, the founding team behind Uncoded Hub. We started this agency with a simple mission: make professional web development accessible to every business, regardless of size or budget.
               </p>
               <p className="text-steel text-lg leading-relaxed mb-8">
                 We've helped over 100 businesses establish their online presence, from medical clinics and spas to restaurants and e-commerce stores. We're not satisfied until you're absolutely thrilled with your website. Let's build something amazing together.
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
              <p className="text-steel text-lg">Quick answers about our 5-day delivery promise.</p>
            </div>
            <FaqAccordion />
          </div>
        </section>

        {/* SECTION 10: FINAL CTA */}
        <section className="py-24 px-6 relative z-10 bg-cyber/80 border-t border-white/5 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-magenta/10 via-midnight to-midnight pointer-events-none"></div>
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">Ready to Transform Your Business Online?</h2>
            <p className="text-steel text-lg mb-10">Join 100+ successful businesses. Get your free consultation today.</p>
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

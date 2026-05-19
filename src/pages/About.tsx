import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Target, Zap, Gem, BookOpen, HeartHandshake, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About({ onOpenModal }: { onOpenModal: () => void }) {
  const values = [
    { icon: <Zap />, title: "Speed Without Compromise", desc: "Fast delivery doesn't mean rushed work. We've perfected our process to deliver professional websites in 7 days." },
    { icon: <Gem />, title: "Transparency & Honesty", desc: "No hidden costs. No vague timelines. No technical jargon to confuse you. We believe in clear communication." },
    { icon: <Target />, title: "Results Over Aesthetics", desc: "Beautiful design is our starting point. Every element we create serves a purpose: to convert visitors into customers." },
    { icon: <BookOpen />, title: "Continuous Learning", desc: "The web evolves fast, and so do we. We're constantly learning new platforms to give our clients the edge." },
    { icon: <HeartHandshake />, title: "Partnership, Not Transactions", desc: "We're your digital partners. Your success is our success. We celebrate your wins and troubleshoot challenges." },
    { icon: <Globe />, title: "Accessibility for All", desc: "Every business deserves a professional online presence. We make quality web development accessible." }
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Meet Deepak & Geetha | Uncoded Hub</title>
        <meta name="description" content="Meet the team behind Uncoded Hub. Passionate about democratizing web development through no-code technology. Learn our story, values, and mission to help businesses succeed online." />
        <meta name="keywords" content="about uncoded hub, web development team, no-code experts Bengaluru, Deepak Geetha founders, professional web developers India" />
        <link rel="canonical" href="https://uncodedhub.com/about" />
      </Helmet>
      
      <main className="pt-32 pb-24 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-steel/60 text-sm mb-12 font-mono">
            Home &gt; <span className="text-cyan">About Us</span>
          </div>

          <div className="text-center mb-24">
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">Built by Two Siblings. <br className="hidden md:block"/> <span className="text-gradient">Built for Coaches.</span></h1>
            <p className="text-steel text-xl max-w-2xl mx-auto leading-relaxed mb-6">
              Meet the passionate team behind Uncoded Hub
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-32 bg-cyber/30 p-8 md:p-14 rounded-3xl border border-white/5">
            <div>
              <h2 className="font-display text-4xl font-bold text-white mb-6">How Uncoded Hub Began</h2>
              <div className="space-y-4 text-steel leading-relaxed">
                <p>Every business deserves a professional website. That's the belief that started Uncoded Hub.</p>
                <p>We're Deepak and Geetha — two siblings from Bengaluru who built Uncoded Hub from scratch. We started after seeing talented coaches lose potential clients every day simply because their online presence didn't reflect the quality of their work. A great coach with a bad website loses to a mediocre coach with a great one. We decided to fix that.</p>
                <p>We knew there had to be a better way.</p>
                <p>That's when we discovered the power of no-code development. Platforms like Webflow, Framer, and Bubble were revolutionizing how websites could be built—faster, more affordably, and with the same professional quality.</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-magenta/20 blur-[80px] rounded-full"></div>
              <div className="aspect-[4/3] rounded-3xl border border-white/10 overflow-hidden relative z-10 bg-midnight flex justify-center items-center">
                 <span className="text-white/40 text-sm font-mono tracking-widest uppercase">Deepak & Geetha</span>
              </div>
            </div>
          </div>

          <div className="mb-32">
            <h2 className="font-display text-4xl font-bold text-white mb-12 text-center">Meet Your Digital Partners</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="frosted-glass p-8 md:p-10 rounded-3xl border border-cyan/20 bg-cyber/20 hover:border-cyan/50 transition-colors">
                <div className="w-24 h-24 rounded-full bg-cyan/10 border border-cyan/30 flex items-center justify-center mb-6">
                  <span className="font-bold text-cyan text-xl">D</span>
                </div>
                <h3 className="font-display text-3xl font-bold text-white mb-2">Deepak</h3>
                <h4 className="text-cyan font-mono text-sm tracking-wider uppercase mb-6">Co-Founder & Lead Developer</h4>
                <p className="text-steel leading-relaxed mb-6">
                  Deepak handles client strategy, sales, and the technical architecture behind every website. With a background in AI engineering and web development, he brings a systems-thinking approach to every coaching website we build. He is obsessed with one thing: making sure your website actually gets you clients.
                </p>
                <div className="bg-midnight/50 p-4 rounded-xl border border-white/5">
                  <span className="text-white/60 font-mono text-xs block mb-1">FUN FACT</span>
                  <p className="text-white text-sm">🧘 Climbed Velliangiri mountain alone and slept on the hill. Believes the best ideas come from silence.</p>
                </div>
              </div>

              <div className="frosted-glass p-8 md:p-10 rounded-3xl border border-magenta/20 bg-cyber/20 hover:border-magenta/50 transition-colors">
                <div className="w-24 h-24 rounded-full bg-magenta/10 border border-magenta/30 flex items-center justify-center mb-6">
                  <span className="font-bold text-magenta text-xl">G</span>
                </div>
                <h3 className="font-display text-3xl font-bold text-white mb-2">Geetha</h3>
                <h4 className="text-magenta font-mono text-sm tracking-wider uppercase mb-6">Co-Founder & Creative Director</h4>
                <p className="text-steel leading-relaxed mb-6">
                  Geetha leads design and delivery at Uncoded Hub. She has a sharp eye for the visual details that make a coaching website feel premium and trustworthy. Every website she builds is crafted to make visitors think: this coach is exactly who I need.
                </p>
                <div className="bg-midnight/50 p-4 rounded-xl border border-white/5">
                  <span className="text-white/60 font-mono text-xs block mb-1">FUN FACT</span>
                  <p className="text-white text-sm">🎨 Has a collection of 500+ font pairings and can identify fonts just by looking at them</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-32">
            <h2 className="font-display text-4xl font-bold text-white mb-12 text-center">What We Stand For</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((v, i) => (
                <div key={i} className="bg-cyber/30 p-8 rounded-3xl border border-white/5 hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-cyan mb-6 border border-white/10">
                    {v.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 font-display">{v.title}</h3>
                  <p className="text-steel leading-relaxed text-sm">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-24 text-center bg-gradient-to-br from-cyber to-midnight p-12 rounded-3xl border border-white/10">
            <h2 className="font-display text-4xl font-bold mb-6">Ready to Work Together?</h2>
            <p className="text-steel text-lg mb-8 max-w-2xl mx-auto">Let's create something amazing for your business.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button onClick={onOpenModal} className="cyan-energy-btn !py-4 !px-10">Start Your Project</button>
              <Link to="/contact" className="px-10 py-4 rounded-xl border border-white/20 text-white font-medium hover:bg-white/5 transition-colors">Schedule Free Consultation</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

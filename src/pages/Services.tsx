import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Laptop, ShoppingCart, PenTool, BarChart3, Wrench, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <>
      <Helmet>
        <title>The Coach Authority System | Uncoded Hub</title>
        <meta name="description" content="One complete package. Built exclusively for coaches and consultants. Delivered in 7 days." />
        <link rel="canonical" href="https://uncodedhub.com/services" />
      </Helmet>
      
      <main className="pt-32 pb-24 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-steel/60 text-sm mb-12 font-mono">
            Home &gt; <span className="text-cyan">Services</span>
          </div>

          <div className="text-center mb-16">
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">The Coach Authority System <br className="hidden md:block"/> <span className="text-gradient">Everything You Need to Dominate Online</span></h1>
            <p className="text-steel text-xl max-w-3xl mx-auto leading-relaxed mb-6">
              One complete package. Built exclusively for coaches and consultants. Delivered in 7 days. Backed by a guarantee that makes saying no feel impossible.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-16">
            {/* Main Offer */}
            <div className="bg-cyber/30 p-8 md:p-12 rounded-3xl border border-cyan/30 shadow-[0_0_30px_rgba(0,240,255,0.1)] relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-cyan text-midnight font-bold px-6 py-2 rounded-bl-3xl">Most Popular</div>
              <h2 className="font-display text-4xl font-bold text-white mb-4">The Coach Authority System</h2>
              <p className="text-steel text-lg mb-10">A world-class coaching website — live in 7 days — with everything you need to attract premium clients online.</p>
              
              <div className="border border-white/10 rounded-2xl overflow-hidden mb-10">
                <div className="grid grid-cols-4 bg-midnight/80 p-4 border-b border-white/10 font-bold text-white">
                  <div className="col-span-3">What You Get</div>
                  <div className="text-right">Value</div>
                </div>
                <div className="divide-y divide-white/5 bg-cyber/10">
                  <div className="grid grid-cols-4 p-4 items-center">
                    <div className="col-span-3 text-white">World-class coaching website — AI-powered, SEO optimised, mobile perfect</div>
                    <div className="text-right text-steel">$500</div>
                  </div>
                  <div className="grid grid-cols-4 p-4 items-center">
                    <div className="col-span-3 text-cyan flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 shrink-0" /> BONUS 1: AI Chatbot — captures and qualifies leads 24/7</div>
                    <div className="text-right text-steel">$300</div>
                  </div>
                  <div className="grid grid-cols-4 p-4 items-center">
                    <div className="col-span-3 text-cyan flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 shrink-0" /> BONUS 2: SEO Setup & Optimisation — rank on Google</div>
                    <div className="text-right text-steel">$200</div>
                  </div>
                  <div className="grid grid-cols-4 p-4 items-center">
                    <div className="col-span-3 text-cyan flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 shrink-0" /> BONUS 3: Google My Business Setup</div>
                    <div className="text-right text-steel">$150</div>
                  </div>
                  <div className="grid grid-cols-4 p-4 items-center">
                    <div className="col-span-3 text-cyan flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 shrink-0" /> BONUS 4: Competitor Analysis Report</div>
                    <div className="text-right text-steel">$150</div>
                  </div>
                  <div className="grid grid-cols-4 p-4 items-center">
                    <div className="col-span-3 text-cyan flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 shrink-0" /> BONUS 5: Personal Brand Audit & Recommendations</div>
                    <div className="text-right text-steel">$100</div>
                  </div>
                  <div className="grid grid-cols-4 p-4 items-center">
                    <div className="col-span-3 text-cyan flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 shrink-0" /> BONUS 6: Client Magnet Copywriting — homepage & about page written for you</div>
                    <div className="text-right text-steel">$200</div>
                  </div>
                  <div className="grid grid-cols-4 p-4 items-center">
                    <div className="col-span-3 text-cyan flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 shrink-0" /> BONUS 7: WhatsApp Inquiry Widget</div>
                    <div className="text-right text-steel">$100</div>
                  </div>
                  <div className="grid grid-cols-4 p-4 items-center">
                    <div className="col-span-3 text-cyan flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 shrink-0" /> BONUS 8: Business Development PDF Guide</div>
                    <div className="text-right text-steel">$75</div>
                  </div>
                  <div className="grid grid-cols-4 p-4 items-center">
                    <div className="col-span-3 text-cyan flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 shrink-0" /> BONUS 9: 1-on-1 Strategy Call (60 minutes)</div>
                    <div className="text-right text-steel">$150</div>
                  </div>
                  <div className="grid grid-cols-4 p-4 items-center">
                    <div className="col-span-3 text-cyan flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 shrink-0" /> BONUS 10: 30-Day Performance Check-in Call</div>
                    <div className="text-right text-steel">$100</div>
                  </div>
                </div>
                <div className="grid grid-cols-4 bg-midnight p-4 border-t border-white/10">
                  <div className="col-span-3 text-right text-steel font-medium pr-4">Total Value</div>
                  <div className="text-right text-steel line-through">$2,025</div>
                </div>
                <div className="grid grid-cols-4 bg-cyan/10 p-6 border-t border-cyan/30">
                  <div className="col-span-3 text-right text-cyan text-2xl font-bold pr-4">Your Investment</div>
                  <div className="text-right text-white text-3xl font-bold">$1,500</div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="frosted-glass p-8 rounded-2xl border border-magenta/30 bg-midnight/50 mb-8">
                <h3 className="font-display text-2xl font-bold text-white mb-6 text-center">Our Triple Guarantee</h3>
                <ul className="space-y-4">
                  <li className="flex gap-4 items-start">
                    <CheckCircle2 className="w-6 h-6 text-magenta shrink-0" />
                    <span className="text-white text-lg">Live in 7 days — or you pay nothing</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <CheckCircle2 className="w-6 h-6 text-magenta shrink-0" />
                    <span className="text-white text-lg">Unlimited design revisions — we don't launch until you are 100% in love with it</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <CheckCircle2 className="w-6 h-6 text-magenta shrink-0" />
                    <span className="text-white text-lg">You love the design — or we redesign until you do</span>
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <button onClick={onOpenModal} className="cyan-energy-btn !py-4 !px-10 !text-lg w-full md:w-auto inline-flex items-center justify-center gap-2">
                  Claim This Offer <ArrowRight className="w-5 h-5"/>
                </button>
              </div>
            </div>

            <p className="text-center text-steel text-sm">
              Website maintenance is available after delivery at $200–$300/month. This covers security updates, content changes, performance monitoring, and priority support.
            </p>
          </div>

          <div className="mt-24 text-center bg-gradient-to-br from-cyber to-midnight p-12 rounded-3xl border border-white/10">
            <h2 className="font-display text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-steel text-lg mb-8 max-w-2xl mx-auto">Book your free consultation and get a custom quote for your project. No obligations.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button onClick={onOpenModal} className="cyan-energy-btn !py-4 !px-10">Schedule Call</button>
              <Link to="/contact" className="px-10 py-4 rounded-xl border border-white/20 text-white hover:bg-white/5 transition-colors font-medium">Quick Estimate Page</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

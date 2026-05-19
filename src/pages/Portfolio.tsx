import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Portfolio({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <>
      <Helmet>
        <title>Our Work | Uncoded Hub</title>
        <meta name="description" content="We are currently accepting 3 coaches for a complimentary website build as part of our launch case study programme." />
        <link rel="canonical" href="https://uncodedhub.com/portfolio" />
      </Helmet>
      
      <main className="pt-32 pb-24 px-6 min-h-screen flex flex-col justify-center">
        <div className="max-w-4xl mx-auto text-center">
          {/* Breadcrumb */}
          <div className="text-steel/60 text-sm mb-12 font-mono">
            Home &gt; <span className="text-cyan">Portfolio</span>
          </div>

          <div className="bg-cyber/30 p-12 md:p-16 rounded-3xl border border-white/5 shadow-[0_0_50px_rgba(0,240,255,0.05)] relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan/10 rounded-full blur-[80px] pointer-events-none"></div>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 text-white leading-tight relative z-10">
              Our Work <br className="hidden md:block"/> <span className="text-gradient">Is Coming</span>
            </h1>
            
            <p className="text-steel text-xl max-w-2xl mx-auto leading-relaxed mb-6 relative z-10">
              We are currently accepting 3 coaches for a complimentary website build as part of our launch case study programme. In exchange, we document the project and share the results publicly.
            </p>
            
            <p className="text-white/90 text-lg mb-12 max-w-2xl mx-auto relative z-10">
              If you would like to be one of our first featured case studies, book a free discovery call today.
            </p>
            
            <div className="relative z-10">
              <button onClick={onOpenModal} className="cyan-energy-btn !py-4 !px-10 !text-lg">
                Book My Free Call
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

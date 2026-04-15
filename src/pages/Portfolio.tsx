import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ExternalLink, Star } from 'lucide-react';

export default function Portfolio({ onOpenModal }: { onOpenModal: () => void }) {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Healthcare', 'Spa & Wellness', 'Restaurants', 'E-commerce', 'Professional Services'];

  const projects = [
    {
       name: "Dr. Sharma's Dental Clinic",
       industry: "Healthcare",
       description: "Professional dental practice website with online appointment booking, treatment information, and patient testimonials.",
       features: ["Online appointment system", "Before/after gallery", "Insurance information pages"],
       image: "https://picsum.photos/seed/dentist/600/400"
    },
    {
       name: "Serenity Spa & Wellness",
       industry: "Spa & Wellness",
       description: "Luxury spa website featuring service menus, therapist profiles, and integrated online booking.",
       features: ["Beautiful service menu", "Online booking integration", "Membership program signup"],
       image: "https://picsum.photos/seed/spa/600/400"
    },
    {
       name: "Spice Route Restaurant",
       industry: "Restaurants",
       description: "Mouth-watering restaurant website with online ordering, digital menu, and table reservations.",
       features: ["Online food ordering", "Interactive digital menu", "Table reservation system"],
       image: "https://picsum.photos/seed/restaurant/600/400"
    },
    {
       name: "FitGear Pro",
       industry: "E-commerce",
       description: "Complete e-commerce store for fitness equipment with 100+ products, secure checkout, and inventory management.",
       features: ["100+ product catalog", "Secure payment gateway", "Real-time inventory"],
       image: "https://picsum.photos/seed/ecommerce2/600/400"
    },
    {
       name: "Legal Associates LLP",
       industry: "Professional Services",
       description: "Corporate law firm website with practice areas, attorney profiles, and case studies. Delivered in 8 days.",
       features: ["Attorney profile pages", "Practice descriptions", "Encrypted contact form"],
       image: "https://picsum.photos/seed/law/600/400"
    },
    {
       name: "Dr. Priya's Pediatric Clinic",
       industry: "Healthcare",
       description: "Modern, mobile-first website with integrated appointment booking system and doctor profiles.",
       features: ["Appointment booking", "Patient portal", "Health tips blog"],
       image: "https://picsum.photos/seed/pediatric/600/400"
    }
  ];

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.industry === filter);

  return (
    <>
      <Helmet>
        <title>Our Portfolio | 50+ Website Examples | Uncoded Hub</title>
        <meta name="description" content="View our portfolio of 50+ professional websites built for healthcare, spa, restaurant, and e-commerce businesses across India. See real examples, case studies, and client results." />
        <meta name="keywords" content="website portfolio India, webflow examples, no-code websites, healthcare website examples, spa website portfolio, restaurant website designs, e-commerce sites India" />
        <link rel="canonical" href="https://uncodedhub.com/portfolio" />
      </Helmet>
      
      <main className="pt-32 pb-24 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-steel/60 text-sm mb-12 font-mono">
            Home &gt; <span className="text-cyan">Portfolio</span>
          </div>

          <div className="text-center mb-16">
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">Our Work <span className="text-gradient">Speaks for Itself</span></h1>
            <p className="text-steel text-xl max-w-2xl mx-auto leading-relaxed mb-6">
              50+ websites built. 50+ businesses transformed. See what we can do for you.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-white/50 font-mono text-sm max-w-lg mx-auto border border-white/5 bg-cyber/30 p-4 rounded-xl">
               <span className="flex-1 text-center border-r border-white/5 pr-4">100+ Delivered</span>
               <span className="flex-1 text-center border-r border-white/5 pr-4">95% Satisfaction</span>
               <span className="flex-1 text-center flex items-center justify-center gap-1"><Star className="w-4 h-4 text-cyan fill-current"/> 4.9/5 Rating</span>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {filters.map(f => (
              <button 
                 key={f} 
                 onClick={() => setFilter(f)}
                 className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${filter === f ? 'bg-cyan text-midnight border-cyan shadow-[0_0_15px_rgba(0,240,255,0.4)]' : 'bg-transparent text-steel border-white/10 hover:border-cyan hover:text-white'}`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 transition-all duration-500">
            {filteredProjects.map((p, idx) => (
               <div key={idx} className="frosted-glass rounded-3xl overflow-hidden border border-white/5 group hover:-translate-y-2 hover:border-cyan/30 transition-all duration-300 flex flex-col h-full bg-cyber/30">
                  <div className="h-56 relative overflow-hidden">
                     <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                     <div className="absolute top-4 left-4 bg-midnight/80 backdrop-blur-sm border border-white/10 text-xs text-white px-3 py-1 rounded-full">{p.industry}</div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                     <h3 className="font-display font-bold text-2xl text-white mb-3">{p.name}</h3>
                     <p className="text-steel text-sm leading-relaxed mb-6 flex-1">{p.description}</p>
                     <ul className="space-y-2 mb-6 text-sm text-steel">
                        {p.features.map((ft,i) => (
                           <li key={i} className="flex gap-2 items-start"><span className="text-magenta shrink-0">✓</span> {ft}</li>
                        ))}
                     </ul>
                     <button className="flex items-center gap-2 text-cyan font-semibold hover:text-white transition-colors mt-auto">
                        View Details <ExternalLink className="w-4 h-4"/>
                     </button>
                  </div>
               </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-cyber to-midnight p-12 rounded-3xl border border-white/10 text-center">
            <h2 className="font-display text-4xl font-bold mb-6">Want to Be Our Next Success Story?</h2>
            <p className="text-steel text-lg mb-8 max-w-2xl mx-auto">Let's create something amazing for your business.</p>
            <button onClick={onOpenModal} className="cyan-energy-btn !py-4 !px-10">Start Your Project</button>
          </div>
        </div>
      </main>
    </>
  );
}

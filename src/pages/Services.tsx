import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Laptop, ShoppingCart, PenTool, BarChart3, Wrench, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services({ onOpenModal }: { onOpenModal: () => void }) {
  const services = [
    {
      id: "website",
      icon: <Laptop className="w-10 h-10 text-cyan" />,
      title: "Professional Website Development",
      subtitle: "Custom websites that look amazing, load fast, and convert visitors into customers",
      description: "Your website is often the first impression customers have of your business. We create stunning, high-performance websites that reflect your brand's unique personality and drive real business results.",
      highlights: ["Mobile-first design", "Under 2-second load times", "SEO-ready", "Easy to manage"],
      packages: [
        { name: "Basic", features: ["5-7 pages", "Template-based", "Contact form", "Basic SEO setup"] },
        { name: "Professional", features: ["10-15 pages", "Custom design", "Booking system", "WhatsApp widget", "Complete SEO"] }
      ]
    },
    {
      id: "ecommerce",
      icon: <ShoppingCart className="w-10 h-10 text-magenta" />,
      title: "Complete E-commerce Solutions",
      subtitle: "Start selling online within a week. Complete store setup with payments, inventory, and orders.",
      description: "Transform your business into a 24/7 sales machine. We build beautiful, conversion-optimized online stores that make shopping easy for your customers and order management simple for you.",
      highlights: ["Razorpay / Instamojo integration", "Real-time stock management", "Automated notifications", "Customer Accounts"],
      packages: [
        { name: "Starter Store", features: ["Up to 50 products", "1 payment gateway", "Basic shipping options", "Essential features"] },
        { name: "Pro Store", features: ["Up to 100 products", "Multiple payment gateways", "Advanced shipping", "Marketing integrations"] }
      ]
    },
    {
      id: "maintenance",
      icon: <Wrench className="w-10 h-10 text-white" />,
      title: "Website Maintenance & Support",
      subtitle: "Keep your website fresh, secure, and performing at its best—hassle-free",
      description: "Your website needs ongoing care to stay secure, fast, and effective. Our maintenance plans ensure your site stays up-to-date with fresh content, optimal performance, and immediate support.",
      highlights: ["Unlimited updates", "Security monitoring", "Backup management", "Priority support"],
      packages: [
        { name: "Basic Plan", features: ["2 hrs updates/mo", "Security monitoring", "Monthly backups", "Email support"] },
        { name: "Pro Plan", features: ["5 hrs updates/mo", "Weekly backups", "Performance monitoring", "WhatsApp support"] }
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Our Services | Website Development & E-commerce | Uncoded Hub</title>
        <meta name="description" content="Professional web development services in India. Custom website design, e-commerce stores, and ongoing maintenance. Request a custom quote today." />
        <meta name="keywords" content="website development services, webflow development, e-commerce website India, website maintenance, web services Bengaluru" />
        <link rel="canonical" href="https://uncodedhub.com/services" />
      </Helmet>
      
      <main className="pt-32 pb-24 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-steel/60 text-sm mb-12 font-mono">
            Home &gt; <span className="text-cyan">Services</span>
          </div>

          <div className="text-center mb-16">
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">Complete Digital Solutions <br className="hidden md:block"/> <span className="text-gradient">For Modern Businesses</span></h1>
            <p className="text-steel text-xl max-w-3xl mx-auto leading-relaxed mb-6">
              From concept to launch to growth—everything you need to succeed online.
            </p>
            <p className="text-white/80 max-w-2xl mx-auto">
              Whether you're launching your first website, building an online store, or upgrading your digital presence, we've got you covered with high-performance digital solutions tailored to your business goals.
            </p>
          </div>

          <div className="space-y-24">
            {services.map((svc, idx) => (
              <div key={svc.id} className="grid md:grid-cols-2 gap-12 items-start bg-cyber/30 p-8 md:p-12 rounded-3xl border border-white/5">
                <div>
                  <div className="mb-6">{svc.icon}</div>
                  <h2 className="font-display text-3xl font-bold text-white mb-2">{svc.title}</h2>
                  <h3 className="text-cyan text-lg mb-6">{svc.subtitle}</h3>
                  <p className="text-steel leading-relaxed mb-8">{svc.description}</p>
                  
                  <ul className="space-y-3 mb-10">
                    {svc.highlights.map((hlt, i) => (
                      <li key={i} className="flex items-center gap-3 text-white/90">
                        <CheckCircle2 className="w-5 h-5 text-magenta" /> {hlt}
                      </li>
                    ))}
                  </ul>

                  <button onClick={onOpenModal} className="cyan-energy-btn !py-3 !px-8 hidden md:inline-flex items-center gap-2">
                    Request Custom Quote <ArrowRight className="w-5 h-5"/>
                  </button>
                </div>

                <div className="space-y-6">
                  {svc.packages.map((pkg, i) => (
                    <div key={i} className="frosted-glass p-6 rounded-2xl border border-white/10 hover:border-cyan/30 transition-all duration-300">
                      <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
                        <h4 className="font-bold text-xl">{pkg.name}</h4>
                      </div>
                      <ul className="space-y-3">
                        {pkg.features.map((feat, ix) => (
                          <li key={ix} className="text-steel text-sm flex gap-2">
                             <span className="text-cyan shrink-0">✓</span> {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <button onClick={onOpenModal} className="cyan-energy-btn !py-3 !px-8 w-full md:hidden flex items-center justify-center gap-2 mt-6">
                    Request Quote <ArrowRight className="w-5 h-5"/>
                  </button>
                </div>
              </div>
            ))}
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

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail, Calendar, MessageSquare, ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { PopupModal } from 'react-calendly';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', type: '', needs: '', budget: '', timeframe: '', details: '', source: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  const handleWhatsApp = () => {
    window.open(`https://wa.me/918660819023`, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');
    setErrorMsg('');

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      business_type: formData.type,
      project_details: formData.details,
    };

    try {
      // Primary save — contact_submissions
      const { error: primaryError } = await supabase
        .from('contact_submissions')
        .insert([payload]);

      // Backup save — leads_backup (never lose a lead)
      const { error: backupError } = await supabase
        .from('leads_backup')
        .insert([{ ...payload, submitted_at: new Date().toISOString() }]);

      if (primaryError && backupError) {
        throw new Error(primaryError.message);
      }

      setSubmitStatus('success');
      setSubmittedName(formData.name);
      setFormData({ name: '', phone: '', email: '', type: '', needs: '', budget: '', timeframe: '', details: '', source: '' });
    } catch (err: any) {
      console.error('Form submission error:', err);
      setErrorMsg('Something went wrong. Please try WhatsApp or email us directly.');
      setSubmitStatus('error');
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Get Free Consultation | Uncoded Hub</title>
        <meta name="description" content="Get in touch with Uncoded Hub for professional website development. Free consultation, fast response, custom quotes. WhatsApp, email, or book a call. Based in Bengaluru, serving all of India." />
        <meta name="keywords" content="contact uncoded hub, website development consultation, free quote website, web developer Bengaluru contact, hire website developer India" />
        <link rel="canonical" href="https://uncodedhub.com/contact" />
      </Helmet>
      
      <main className="pt-32 pb-24 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-steel/60 text-sm mb-12 font-mono">
            Home &gt; <span className="text-cyan">Contact</span>
          </div>

          <div className="text-center mb-16">
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">Let's Build Something <br className="hidden md:block"/> <span className="text-gradient">Amazing Together</span></h1>
            <p className="text-steel text-xl max-w-2xl mx-auto leading-relaxed">
              Get your free consultation and custom quote within 24 hours. No pressure, no obligation—just honest advice and clear next steps.
            </p>
          </div>

          {/* Contact Options */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            <div onClick={handleWhatsApp} className="frosted-glass p-8 rounded-3xl border border-cyan/20 cursor-pointer hover:-translate-y-2 transition-transform duration-300 text-center flex flex-col items-center group">
              <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex justify-center items-center mb-6 border border-[#25D366]/30 group-hover:bg-[#25D366]/20 transition-colors">
                 <MessageSquare className="w-8 h-8 text-[#25D366]" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-2">WhatsApp</h3>
              <p className="text-steel flex-1">The fastest way to connect</p>
              <span className="text-cyan font-bold mt-4">+91 8660819023</span>
              <p className="text-xs text-white/40 mt-3">Usually responds in 15 mins</p>
            </div>
            
            <a href="mailto:hello@uncodedhub.com" className="frosted-glass p-8 rounded-3xl border border-white/10 cursor-pointer hover:-translate-y-2 transition-transform duration-300 text-center flex flex-col items-center group">
              <div className="w-16 h-16 bg-magenta/10 rounded-full flex justify-center items-center mb-6 border border-magenta/30 group-hover:bg-magenta/20 transition-colors">
                 <Mail className="w-8 h-8 text-magenta" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-2">Email</h3>
              <p className="text-steel flex-1">For detailed inquiries</p>
              <span className="text-white hover:text-magenta transition-colors mt-4">hello@uncodedhub.com</span>
              <p className="text-xs text-white/40 mt-3">Usually responds in 2 hours</p>
            </a>
            
            <button 
              onClick={() => setIsCalendlyOpen(true)}
              className="frosted-glass p-8 w-full rounded-3xl border border-white/10 cursor-pointer hover:-translate-y-2 transition-transform duration-300 text-center flex flex-col items-center group appearance-none text-left"
            >
              <div className="w-16 h-16 bg-cyber/50 rounded-full flex justify-center items-center mb-6 border border-cyan/30 group-hover:bg-cyan/10 transition-colors">
                 <Calendar className="w-8 h-8 text-cyan" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-2">Book a Call</h3>
              <p className="text-steel flex-1">15-minute discovery call</p>
              <div className="cyan-energy-btn !py-2 !px-6 mt-4 !text-sm whitespace-nowrap">Schedule Now</div>
              <p className="text-xs text-white/40 mt-3">Choose your time slot</p>
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Form */}
            <div className="bg-cyber/30 p-8 md:p-12 rounded-3xl border border-white/10">
              <h3 className="font-display text-3xl font-bold mb-2">Or Fill Out This Form</h3>
              <p className="text-steel mb-8">Tell us about your project and we'll get back to you within 24 hours</p>
              
              {submitStatus === 'success' ? (
                <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                  <CheckCircle className="w-16 h-16 text-cyan" />
                  <h4 className="font-display text-2xl font-bold text-white">Message Received!</h4>
                  <p className="text-steel max-w-xs">Thanks {submittedName || 'for reaching out'}! We'll get back to you within 24 hours with a custom quote.</p>
                  <button onClick={() => setSubmitStatus('idle')} className="cyan-energy-btn !py-2 !px-6 !text-sm mt-2">Send Another Message</button>
                </div>
              ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-semibold text-steel uppercase tracking-wider mb-2 block">Your Name*</label>
                    <input type="text" required placeholder="Enter your full name" className="w-full bg-midnight/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan transition-colors" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-steel uppercase tracking-wider mb-2 block">Email Address*</label>
                    <input type="email" required placeholder="you@example.com" className="w-full bg-midnight/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan transition-colors" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-semibold text-steel uppercase tracking-wider mb-2 block">Phone Number*</label>
                    <input type="tel" required placeholder="+91 XXXXX XXXXX" className="w-full bg-midnight/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan transition-colors" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-steel uppercase tracking-wider mb-2 block">Business Type*</label>
                    <select required className="w-full bg-midnight/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan transition-colors" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                      <option value="">Select industry</option>
                      <option value="Healthcare">Healthcare / Medical</option>
                      <option value="Spa">Spa / Salon / Wellness</option>
                      <option value="Restaurant">Restaurant / Cafe</option>
                      <option value="Ecommerce">E-commerce / Retail</option>
                      <option value="Services">Professional Services</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                   <label className="text-sm font-semibold text-steel uppercase tracking-wider mb-2 block">Tell Us About Your Project*</label>
                   <textarea required rows={5} placeholder="Tell us about your business, goals, and what you're looking to achieve with your website." className="w-full bg-midnight/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan transition-colors" value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})}></textarea>
                </div>
                
                {submitStatus === 'error' && (
                  <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    {errorMsg}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className="cyan-energy-btn w-full !text-lg !py-4 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitStatus === 'loading' ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                  ) : (
                    <>Get Free Consultation <ArrowRight className="w-5 h-5" /></>
                  )}
                </button>
                <p className="text-xs text-center text-steel">We respect your privacy. Your information will never be shared.</p>
              </form>
              )}
            </div>
            
            {/* Info Side */}
            <div className="space-y-12 h-full">
              <div className="space-y-8">
                <h3 className="font-display text-3xl font-bold">What Happens Next?</h3>
                <div className="flex gap-4">
                  <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-cyan/20 flex items-center justify-center font-bold text-cyan text-sm">1</div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Instant Confirmation</h4>
                    <p className="text-steel text-sm">You'll receive an automated confirmation that we got your message.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-cyan/20 flex items-center justify-center font-bold text-cyan text-sm">2</div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Team Review</h4>
                    <p className="text-steel text-sm">Within 2 hours, we'll review your details and prepare a response.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-cyan/20 flex items-center justify-center font-bold text-cyan text-sm">3</div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Custom Quote</h4>
                    <p className="text-steel text-sm">Within 24 hours, you get a custom quote, timeline estimate, and next steps.</p>
                  </div>
                </div>
              </div>
              
              <div className="frosted-glass p-8 rounded-3xl border border-white/5 bg-midnight">
                <h3 className="font-display text-2xl font-bold mb-6">Find Us Here</h3>
                <div className="space-y-4 text-steel">
                  <p className="flex items-start gap-3"><MapPin className="text-magenta shrink-0" /> Uncoded Hub, Bengaluru, Karnataka, India - 560XXX</p>
                  <p className="flex items-center gap-3"><Phone className="text-magenta shrink-0" /> +91 8660819023</p>
                  <p className="flex items-center gap-3"><Mail className="text-magenta shrink-0" /> hello@uncodedhub.com</p>
                </div>
                <hr className="my-6 border-white/10" />
                <p className="text-sm text-steel"><strong>Business Hours:</strong> Monday - Saturday: 9:00 AM - 7:00 PM IST</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Embedded Calendly Popup */}
      <PopupModal
        url="https://calendly.com/uncodedhub"
        onModalClose={() => setIsCalendlyOpen(false)}
        open={isCalendlyOpen}
        rootElement={document.getElementById("root") as HTMLElement}
      />
    </>
  );
}

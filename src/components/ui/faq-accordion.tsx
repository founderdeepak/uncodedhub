import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "How fast can I get a custom website built for my business?",
    answer: "At UncodedHub, we design, build, and launch fully functional, high-converting websites for small businesses in exactly 7 days using advanced no-code architecture."
  },
  {
    question: "Do you specialise in coaching and consulting websites?",
    answer: "Yes — exclusively. We build websites specifically for coaches and consultants. This focus means we deeply understand what your clients look for before booking, how to position your expertise, and how to structure your website to convert visitors into paying clients."
  },
  {
    question: "Do you provide ongoing website maintenance and support?",
    answer: "Absolutely. Every website we develop comes with an optional Growth & Security Partnership. We ensure your site remains lightning-fast, secure, and fully updated without you having to lift a finger."
  },
  {
    question: "Why do you use no-code technology for web development?",
    answer: "No-code architecture allows us to eliminate bloated code and deliver ultra-fast load times. It provides a premium, highly scalable, and easily manageable website in a fraction of the time it takes traditional agencies."
  },
  {
    question: "Can I sell products directly on my website?",
    answer: "Yes! We build comprehensive e-commerce solutions. Your site can be equipped with robust inventory management, secure checkout processes, and intuitive payment gateways so you can sell seamlessly."
  },
  {
    question: "Will my website look good on mobile devices?",
    answer: "100%. We employ a strict mobile-first design philosophy. Your website will be fully responsive, ensuring a flawless and highly readable user experience across all smartphones, tablets, and desktops."
  },
  {
    question: "Is Search Engine Optimization (SEO) included in the build?",
    answer: "Yes, we integrate fundamental best practices for SEO from day one. This includes semantic HTML, lightning-fast load times, and technical on-page optimizations to help you rank higher on Google search results."
  },
  {
    question: "Can I easily update the website content myself after it launches?",
    answer: "Definitely. We integrate a highly intuitive Content Management System (CMS) that allows you to effortlessly update text, images, and new products without writing a single line of code."
  },
  {
    question: "Do you handle web hosting and domain registration?",
    answer: "Yes, we guide you through the entire process. We connect your custom domain and utilize enterprise-grade, highly secure hosting infrastructure so your website never goes down during high traffic."
  },
  {
    question: "How do we get started with our new website project?",
    answer: "It's simple! Book a free discovery call or fill out our quick estimate form. We'll discuss your vision, provide a transparent project scope, and instantly begin crafting your digital presence."
  }
];

export const FaqAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <motion.div
            key={index}
            initial={false}
            animate={{ backgroundColor: isOpen ? "rgba(0, 240, 255, 0.05)" : "rgba(30, 35, 65, 0.5)" }}
            className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${
              isOpen ? "border-cyan/30" : "border-white/10 hover:border-white/20"
            }`}
          >
            <button
              onClick={() => toggleFaq(index)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
              id={`faq-button-${index}`}
              className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
            >
              <span className={`font-display font-semibold sm:text-lg transition-colors duration-300 ${isOpen ? "text-cyan" : "text-white/90"}`}>
                {faq.question}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full ${
                  isOpen ? "bg-cyan/10 text-cyan" : "bg-white/5 text-steel"
                }`}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </button>
            
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-button-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 pt-0 text-steel leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

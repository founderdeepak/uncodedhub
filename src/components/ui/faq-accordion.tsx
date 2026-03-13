import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "How fast can I get a website built for my small business?",
    answer: "At UncodedHub, we design, build, and launch fully functional, high-converting websites for small businesses in exactly 5 days using advanced no-code architecture."
  },
  {
    question: "Who does UncodedHub build websites for?",
    answer: "We specialize in building fast, professional digital storefronts for small-scale businesses, retail shops, and service providers, with a dedicated focus on empowering the Tamil business community."
  },
  {
    question: "How much does a professional small business website cost?",
    answer: "Our simple, high-converting business websites start at an affordable price. We also build premium e-commerce hubs starting at an affordable price, allowing you to sell products directly online."
  },
  {
    question: "Do you provide ongoing website maintenance?",
    answer: "Yes. Every website we develop comes with an optional Growth & Security Partnership starting at ₹3,000 per month, ensuring your site remains fast, secure, and updated without you having to lift a finger."
  },
  {
    question: "Why do you use no-code technology?",
    answer: "No-code architecture allows us to eliminate bloated code and deliver lightning-fast load times. It provides a premium, easily manageable website in a fraction of the time it takes traditional agencies."
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

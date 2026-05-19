import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';

const blogs = [
  {
    id: 1,
    slug: 'why-every-coach-needs-professional-website-2026',
    title: 'Why Every Coach in India Needs a Professional Website in 2026',
    excerpt: 'Discover why a professional online presence is no longer optional for coaches looking to attract premium clients in 2026.',
    author: 'Deepak | Uncoded Hub',
    date: 'May 13, 2026',
    readTime: '5 min read',
    category: 'Coaching Growth',
    image: 'https://picsum.photos/seed/coach/800/500'
  }
];

export default function Blogs() {
  return (
    <>
      <Helmet>
        <title>Blog & Insights | Uncoded Hub</title>
        <meta name="description" content="Read our latest insights on web development, no-code solutions, SEO, and digital marketing strategies for small businesses." />
        <meta name="keywords" content="web development blog, no-code insights, SEO strategies, small business marketing, digital storefront, webflow guides" />
      </Helmet>
      
      <main className="pt-32 pb-24 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-steel/60 text-sm mb-12 font-mono">
            Home &gt; <span className="text-cyan">Blog</span>
          </div>

          <div className="text-center mb-16">
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
              Insights for Coaches Who <br className="hidden md:block"/> <span className="text-gradient">Want to Grow Online</span>
            </h1>
            <p className="text-steel text-xl max-w-2xl mx-auto leading-relaxed mb-6">
              Practical guides on building a coaching website that attracts premium clients and grows your practice.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-24 text-center border border-white/5 rounded-3xl bg-midnight/50 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan/5 rounded-full blur-[80px]"></div>
            <Clock className="w-16 h-16 text-cyan mb-6 animate-pulse" />
            <h2 className="font-display text-3xl font-bold text-white mb-4">We are crafting it.</h2>
            <p className="text-steel text-lg">Updates SOON. Stay tuned for high-value coaching insights.</p>
          </div>
        </div>
      </main>
    </>
  );
}

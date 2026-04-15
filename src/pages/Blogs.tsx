import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';

const blogs = [
  {
    id: 1,
    slug: 'future-of-no-code-development',
    title: 'The Future of No-Code Development in 2026',
    excerpt: 'How no-code platforms are empowering businesses to launch faster and scale efficiently without technical debt.',
    author: 'Deepak',
    date: 'April 2, 2026',
    readTime: '5 min read',
    category: 'Technology',
    image: 'https://picsum.photos/seed/blog1/800/500'
  },
  {
    id: 2,
    slug: 'essential-seo-strategies-local-business',
    title: '10 Essential SEO Strategies for Local Businesses',
    excerpt: 'A comprehensive guide to dominating local search results and driving more foot traffic to your physical store.',
    author: 'Geetha',
    date: 'March 28, 2026',
    readTime: '8 min read',
    category: 'Marketing',
    image: 'https://picsum.photos/seed/blog2/800/500'
  },
  {
    id: 3,
    slug: 'why-website-speed-matters',
    title: 'Why Website Speed is More Important Than Ever',
    excerpt: 'Core Web Vitals are changing the way Google ranks websites. Here is everything you need to know to stay ahead.',
    author: 'Deepak',
    date: 'March 15, 2026',
    readTime: '6 min read',
    category: 'Performance',
    image: 'https://picsum.photos/seed/blog3/800/500'
  }
];

export default function Blogs() {
  return (
    <>
      <Helmet>
        <title>Blog & Insights | Uncoded Hub</title>
        <meta name="description" content="Read our latest insights on web development, no-code solutions, SEO, and digital marketing strategies for small businesses." />
      </Helmet>
      
      <main className="pt-32 pb-24 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-steel/60 text-sm mb-12 font-mono">
            Home &gt; <span className="text-cyan">Blog</span>
          </div>

          <div className="text-center mb-16">
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
              Insights & <span className="text-gradient">Strategies</span>
            </h1>
            <p className="text-steel text-xl max-w-2xl mx-auto leading-relaxed mb-6">
              Expert advice on web development, no-code, and growing your digital presence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map(blog => (
              <Link to={`/blog/${blog.slug}`} key={blog.id} className="frosted-glass rounded-3xl overflow-hidden border border-white/5 group hover:-translate-y-2 hover:border-cyan/30 transition-all duration-300 flex flex-col h-full bg-cyber/30">
                <div className="h-48 relative overflow-hidden">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 bg-midnight/80 backdrop-blur-sm border border-white/10 text-xs text-white px-3 py-1 rounded-full">{blog.category}</div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display font-bold text-2xl text-white mb-3 group-hover:text-cyan transition-colors line-clamp-2">{blog.title}</h3>
                  <p className="text-steel text-sm leading-relaxed mb-6 flex-1 line-clamp-3">{blog.excerpt}</p>
                  
                  <div className="mt-auto border-t border-white/10 pt-4 flex flex-col gap-2">
                    <div className="flex items-center gap-4 text-xs text-steel">
                      <span className="flex items-center gap-1"><User size={12} /> {blog.author}</span>
                      <span className="flex items-center gap-1"><Calendar size={12} /> {blog.date}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-sm font-semibold text-cyan group-hover:text-white transition-colors">
                      <span className="flex items-center gap-1"><Clock size={14} /> {blog.readTime}</span>
                      <span className="flex items-center gap-1">Read Post <ArrowRight size={14} /></span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

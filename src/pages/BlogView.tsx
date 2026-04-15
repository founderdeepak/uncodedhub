import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, Calendar, User, Clock, ArrowLeft } from 'lucide-react';

export default function BlogView() {
  const { slug } = useParams();
  const [activeSection, setActiveSection] = useState('prerequisites');

  // Dummy blog content based on the layout structure
  const content = React.useMemo(() => ({
    title: 'Using AI within a Workflow',
    date: 'April 2, 2026',
    author: 'Deepak',
    readTime: '6 min read',
    tags: ['AI', 'Workflow', 'No-Code'],
    sections: [
      { id: 'prerequisites', title: 'Prerequisites' },
      { id: 'workflow-overview', title: 'Workflow Overview' },
      { id: 'step-1-create-workflow', title: 'Step 1: Create Your Workflow' },
      { id: 'step-2-submit-request', title: 'Step 2: Submit Request (POST)',
        subsections: [
          { id: 'add-http-request-node', title: 'Add HTTP Request Node' },
          { id: 'configure-url', title: 'Configure the URL' },
          { id: 'set-up-authentication', title: 'Set Up Authentication' },
          { id: 'configure-request-body', title: 'Configure Request Body' },
          { id: 'execute-node', title: 'Execute the Node' }
        ]
      },
      { id: 'step-3-check-status', title: 'Step 3: Check Status (GET)',
        subsections: [
          { id: 'add-second-http-request', title: 'Add Second HTTP Request Node' },
          { id: 'configure-status-url', title: 'Configure Status Check URL' },
          { id: 'set-authentication', title: 'Set Authentication' },
          { id: 'execute-node-status', title: 'Execute the Node' }
        ]
      },
      { id: 'step-4-retrieve-result', title: 'Step 4: Retrieve Result (GET)',
        subsections: [
          { id: 'add-third-http', title: 'Add Third HTTP Request Node' },
          { id: 'configure-result-url', title: 'Configure Result URL' },
          { id: 'set-authentication-result', title: 'Set Authentication' },
          { id: 'execute-node-result', title: 'Execute the Node' }
        ]
      },
      { id: 'testing-workflow', title: 'Testing Your Workflow' },
      { id: 'best-practices', title: 'Best Practices' },
      { id: 'troubleshooting', title: 'Troubleshooting' },
      { id: 'next-steps', title: 'Next Steps' }
    ]
  }), []);

  const activeParentId = React.useMemo(() => {
    const parent = content.sections.find(s => 
      s.id === activeSection || s.subsections?.some(sub => sub.id === activeSection)
    );
    return parent ? parent.id : null;
  }, [activeSection, content]);

  useEffect(() => {
    // Simple intersection observer to highlight navbar items based on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-120px 0px -60% 0px', threshold: 0 }
    );

    // Small delay to let initial layout settle before observing
    setTimeout(() => {
      const headings = document.querySelectorAll('.post-section-heading');
      headings.forEach((heading) => observer.observe(heading));
    }, 100);

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Temporarily disable the observer by removing hash update during scroll, avoiding jerks
      setActiveSection(id);
      window.history.replaceState(null, '', `#${id}`);
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <Helmet>
        <title>{content.title} | Uncoded Hub Blog</title>
      </Helmet>
      
      <main className="pt-32 pb-24 px-6 min-h-screen bg-midnight">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 relative">
          
          {/* Main Content Area */}
          <div className="lg:w-[75%] pr-0 lg:pr-8">
            <Link to="/blog" className="inline-flex items-center gap-2 text-cyan hover:text-white transition-colors mb-8 font-mono text-sm">
              <ArrowLeft size={16} /> Back to Blog
            </Link>
            
            <div className="mb-12 border-b border-white/10 pb-10">
              <div className="flex gap-2 mb-4">
                {content.tags.map(tag => (
                  <span key={tag} className="text-xs font-mono bg-cyan/10 text-cyan px-2 py-1 rounded-md border border-cyan/20">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-[1.2]">
                {content.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-steel text-sm">
                <span className="flex items-center gap-2"><User size={16} /> {content.author}</span>
                <span className="flex items-center gap-2"><Calendar size={16} /> {content.date}</span>
                <span className="flex items-center gap-2"><Clock size={16} /> {content.readTime}</span>
              </div>
            </div>

            <div className="prose prose-invert prose-cyan max-w-none text-white/80 leading-relaxed font-sans">
              <p className="text-xl leading-relaxed mb-10 text-steel">
                This is a guide to integrating AI nodes directly into your workflow automation tools, ensuring seamless data passing and generation capabilities.
              </p>

              {/* Dummy sections content matching TOC */}
              {content.sections.map((section) => (
                <div key={section.id} className="mb-12">
                  <h2 id={section.id} className="post-section-heading font-display text-3xl font-bold text-white mb-6 scroll-mt-32">
                    {section.title}
                  </h2>
                  <p className="mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  
                  {section.subsections && (
                    <div className="pl-4 md:pl-8 border-l-2 border-white/10 space-y-8 mt-8">
                      {section.subsections.map(sub => (
                        <div key={sub.id}>
                          <h3 id={sub.id} className="post-section-heading font-display text-xl font-bold text-white mb-4 scroll-mt-32">
                            {sub.title}
                          </h3>
                          <p>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                          </p>
                          <div className="bg-cyber/50 border border-white/5 rounded-xl p-6 mt-4">
                            <span className="text-cyan font-mono text-sm block mb-2">// Code Example</span>
                            <pre className="text-sm font-mono text-white/70 overflow-x-auto">
                              <code>
{`{
  "request": "trigger_workflow",
  "payload": {
    "node": "${sub.id}",
    "auth": "Bearer token"
  }
}`}
                              </code>
                            </pre>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - On This Page */}
          <div className="hidden lg:block lg:w-[25%] relative">
            <div className="sticky top-32">
              <h3 className="font-display font-bold text-white text-lg mb-6 flex items-center gap-2">
                 On this page
              </h3>
              
              <nav className="flex flex-col border-l border-white/10 text-sm font-medium">
                {content.sections.map(section => (
                  <div key={section.id} className="relative">
                    <a 
                      href={`#${section.id}`}
                      onClick={(e) => scrollToSection(e, section.id)}
                      className={`block py-1.5 pl-4 transition-colors relative border-l-2 -ml-[1px] ${activeSection === section.id ? 'border-cyan text-cyan' : 'border-transparent text-steel hover:text-white'}`}
                    >
                      {section.title}
                    </a>
                    
                    {section.subsections && activeParentId === section.id && (
                      <div className="flex flex-col ml-4 border-l border-white/5 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-300">
                        {section.subsections.map(sub => (
                          <a
                            key={sub.id}
                            href={`#${sub.id}`}
                            onClick={(e) => scrollToSection(e, sub.id)}
                            className={`block py-1.5 pl-4 transition-colors relative border-l-2 -ml-[1px] ${activeSection === sub.id ? 'border-cyan text-cyan text-xs font-bold' : 'border-transparent text-steel/60 hover:text-white text-xs font-medium'}`}
                          >
                            {sub.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
          
        </div>
      </main>
    </>
  );
}

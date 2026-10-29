import { NICHES, NicheKey } from './blog';
import { BANGALORE_LOCALITIES } from '../data/bangaloreLocalities';

const PHONE_NUMBER = '918660819023';

/**
 * Generates an intelligent, context-aware WhatsApp enquiry message
 * based on the user's active page route (niche, locality, service, or article).
 */
export function getWhatsAppMessage(pathname: string): string {
  const cleanPath = pathname.toLowerCase().replace(/\/+$/, '') || '/';
  const segments = cleanPath.split('/').filter(Boolean);

  // 1. Locality Spoke Page: /web-design/bangalore/:locality/:niche/
  if (segments[0] === 'web-design' && segments[1] === 'bangalore' && segments[2] && segments[3]) {
    const locSlug = segments[2];
    const nicheSlug = segments[3];
    const locName = BANGALORE_LOCALITIES[locSlug]?.name || locSlug.replace(/-/g, ' ');
    const nicheName = NICHES[nicheSlug as NicheKey] || nicheSlug.replace(/-/g, ' ');
    return `Hi Deepak & Geetha, I am interested in Uncoded Hub's ${nicheName} website design in ${locName}, Bangalore. I would like to discuss our project.`;
  }

  // 2. Locality Hub Page: /web-design/bangalore/:locality/
  if (segments[0] === 'web-design' && segments[1] === 'bangalore' && segments[2]) {
    const locSlug = segments[2];
    const locName = BANGALORE_LOCALITIES[locSlug]?.name || locSlug.replace(/-/g, ' ');
    return `Hi Deepak & Geetha, I am interested in Uncoded Hub's web design services in ${locName}, Bangalore. I would like to learn more about your 7-day sprint.`;
  }

  // 3. Bangalore Central Hub: /web-design/bangalore/
  if (segments[0] === 'web-design' && segments[1] === 'bangalore') {
    return `Hi Deepak & Geetha, I am interested in Uncoded Hub's Bangalore web engineering services. I would like to discuss building a website for our business.`;
  }

  // 4. Global Niche Hub: /web-design/:niche/
  if (segments[0] === 'web-design' && segments[1] && NICHES[segments[1] as NicheKey]) {
    const nicheName = NICHES[segments[1] as NicheKey];
    return `Hi Deepak & Geetha, I am interested in Uncoded Hub's web design services for ${nicheName}. I would like to learn more about the 7-day sprint.`;
  }

  // 5. Web Design Apex: /web-design/
  if (segments[0] === 'web-design' && segments.length === 1) {
    return `Hi Deepak & Geetha, I am exploring your specialized web design platforms on Uncoded Hub. I would like to discuss building a website for my business.`;
  }

  // 6. Industry Silo Blog Guides: /blog/industries/:niche/
  if (segments[0] === 'blog' && segments[1] === 'industries' && segments[2]) {
    const nicheName = NICHES[segments[2] as NicheKey] || segments[2].replace(/-/g, ' ');
    return `Hi Deepak & Geetha, I am exploring your ${nicheName} web architecture research. I am interested in working with Uncoded Hub for our website.`;
  }

  // 7. General Blog / Article: /blog/ or /blog/:slug/
  if (segments[0] === 'blog') {
    return `Hi Deepak & Geetha, I was reading your technical web architecture research on Uncoded Hub. I am interested in discussing a website sprint for our business.`;
  }

  // 8. Core Pages
  if (segments[0] === 'portfolio') {
    return `Hi Deepak & Geetha, I was reviewing your live specimen builds on Uncoded Hub's portfolio. I am interested in your 7-day sprint web design service.`;
  }
  if (segments[0] === 'services') {
    return `Hi Deepak & Geetha, I was reviewing your fixed-price web design packages on Uncoded Hub. I am interested in discussing a website sprint for my business.`;
  }
  if (segments[0] === 'audit-checklist') {
    return `Hi Deepak & Geetha, I went through the 10-Point Pre-Sold Prospects Audit on Uncoded Hub. I would like to discuss optimizing and rebuilding our website.`;
  }
  if (segments[0] === 'faq') {
    return `Hi Deepak & Geetha, I have a few questions regarding Uncoded Hub's 7-day sprint and guarantee. I would like to discuss our website requirements.`;
  }
  if (segments[0] === 'about') {
    return `Hi Deepak & Geetha, I read about your senior engineering studio on Uncoded Hub. I am interested in working together on our website.`;
  }
  if (segments[0] === 'contact') {
    return `Hi Deepak & Geetha, I am reaching out to discuss a new website project with Uncoded Hub.`;
  }

  // Default / Home
  return `Hi Deepak & Geetha, I am interested in Uncoded Hub's web design and engineering services. I would like to discuss building a high-converting website for our business.`;
}

/**
 * Returns a complete wa.me link with encoded contextual pre-filled message.
 */
export function getWhatsAppUrl(pathname: string): string {
  const message = getWhatsAppMessage(pathname);
  return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}


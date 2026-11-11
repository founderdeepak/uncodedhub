import fs from 'fs';
import path from 'path';

const inputCsvPath = 'c:/Users/LENOVO/Downloads/uncoded-hub/linkedIn_Master/Deepak_Connections/Connections.csv';
const outputCsvPath = 'c:/Users/LENOVO/Downloads/uncoded-hub/linkedIn_Master/Deepak_Connections/Deepak_15000_Personalized_LinkedIn_DMs.csv';
const outputJsonPath = 'c:/Users/LENOVO/Downloads/uncoded-hub/linkedIn_Master/Deepak_Connections/connections_dm_data.json';

function cleanFirstName(rawFirst, rawLast, position = '', company = '') {
  if (!rawFirst) return 'there';
  let name = rawFirst.trim();
  
  // Remove emojis & unicode symbols
  name = name.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/gu, '');
  
  // Remove parenthesis or bracket annotations e.g. "Bijith Kumar (Interra Spaces)" or "🔜 PAX"
  name = name.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '');
  
  // Detect Doctor
  const isDr = /^Dr\.?\s+/i.test(name) || /^Dr\.?\s+/i.test(rawFirst) || /\b(Doctor|Physician|Surgeon)\b/i.test(position);
  name = name.replace(/^Dr\.?\s+/i, '');
  
  // Clean non-letter characters
  name = name.replace(/[^a-zA-Z\s'-]/g, ' ').trim();
  
  // Get first name token
  const tokens = name.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return 'there';
  
  let first = tokens[0];
  // Proper title casing
  first = first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
  
  if (isDr && !first.toLowerCase().startsWith('dr')) {
    return `Dr. ${first}`;
  }
  return first;
}

function cleanCompany(rawCompany) {
  if (!rawCompany) return '';
  let comp = rawCompany.trim();
  comp = comp.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/gu, '');
  comp = comp.replace(/\s+(Pvt\.?|Private|Ltd\.?|Limited|LLP|Inc\.?|Corporation|Co\.|GmbH)\b.*/gi, '').trim();
  comp = comp.replace(/\s*[-–—•|].*$/, '').trim();
  if (comp.length > 35) {
    comp = comp.slice(0, 32).trim() + '...';
  }
  return comp;
}

function classifyPersona(position = '', company = '', rawFirst = '') {
  const p = (position || '').toLowerCase();
  const c = (company || '').toLowerCase();
  const combo = `${p} ${c}`;

  // 1. Healthcare / Doctors
  if (/^dr\.?\s+/i.test(rawFirst) || /\b(doctor|dr\.|physician|surgeon|dentist|clinic|hospital|psychologist|therapist|ayurveda|cataract|retina|ophthalm|medical|pharma|pediatrician|dermatolog)\b/i.test(combo)) {
    return 'healthcare';
  }

  // 2. Founders / C-Suite / Owners
  if (/\b(founder|co-founder|ceo|managing director|proprietor|partner|chief executive|owner|director|president|co-owner)\b/i.test(p)) {
    return 'founder';
  }

  // 3. Tech & Engineering
  if (/\b(developer|software|engineer|architect|full stack|frontend|backend|ai|data|cto|qa|devops|programmer|tech lead|coder|systems|machine learning)\b/i.test(p)) {
    return 'tech';
  }

  // 4. Real Estate & Architecture / Interior
  if (/\b(interior|real estate|builder|property|realty|architect|decor|infrastructure|construction)\b/i.test(combo)) {
    return 'realestate';
  }

  // 5. Creative & Media & Marketing
  if (/\b(creative|art director|designer|ui|ux|graphic|video|editor|photographer|videographer|motion|media|animator|producer|cinematographer|content|branding|brand|marketing|seo|growth)\b/i.test(combo)) {
    return 'creative';
  }

  // 6. Fitness & Wellness & Coaching
  if (/\b(fitness|trainer|coach|gym|yoga|wellness|nutrition|wellness coach|bodybuilding|pilates)\b/i.test(combo)) {
    return 'fitness';
  }

  // 7. General Professional / Business
  return 'professional';
}

function generateCopy(firstName, company, position, persona, index) {
  const companyMention = company ? ` at ${company}` : '';
  const variant = index % 3;

  if (persona === 'founder') {
    if (variant === 0) {
      return {
        full: `Hi ${firstName}, hope you're having an inspiring week building${companyMention}!

I wanted to take a brief moment to share something very close to my heart. Over the past few months, we poured our heart and soul into building Uncoded Hub (https://uncodedhub.com) — a dedicated design & web engineering studio where we craft bespoke, high-converting digital flagships without cookie-cutter templates.

Bringing this to life has been an incredible journey of passion and craft. As a fellow founder in my network whose journey I truly respect, sharing this milestone with you means the world to me.

I'm not pitching you anything at all — just genuinely sharing our joy, and I would be so honored to receive a quick happy wish or blessing from you for our new beginning!

And if you, your team, or anyone in your circle (a friend, family member, or colleague) is ever looking for a website that truly stands out, you know where to find me. Wishing you continued success! 🚀`,
        short: `Hi ${firstName}! I just wanted to share an exciting personal milestone — we’ve poured our heart into building Uncoded Hub (https://uncodedhub.com) to craft bespoke, high-performance websites. No pitch at all — just sharing the joy with fellow founders I respect in my network, and would love your blessings or a quick happy wish! If anyone in your circle ever needs a stellar website, keep us in mind. 🚀`,
        followup: `Thank you so much, ${firstName}! Your kind words and wishes mean the world to me. We put so much love into the craft at Uncoded Hub. If you or any fellow entrepreneurs in your circle ever need a distinctive digital presence, I'm always just a message away. Wishing you huge wins ahead!`
      };
    } else if (variant === 1) {
      return {
        full: `Hello ${firstName}, hope all is thriving with your work${companyMention}!

I'm reaching out with genuine excitement to share a personal milestone. We’ve recently launched Uncoded Hub (https://uncodedhub.com) — our boutique studio dedicated to building bespoke, lightning-fast web experiences for ambitious brands.

Starting and building something from scratch takes tremendous grit, and I know you appreciate what that journey feels like. As a respected leader in my network, I really wanted to celebrate this happy moment with you.

Zero business agenda here — just wanted to share our milestone and ask for your positive vibes and a quick happy wish as we take this forward!

Whenever you, a peer, or someone close ever talks about creating an unforgettable website, I hope Uncoded Hub comes to mind. Wishing you continued growth! ✨`,
        short: `Hello ${firstName}, wanted to share a happy milestone with you! We've just launched Uncoded Hub (https://uncodedhub.com), crafting handcrafted, high-converting websites. Just wanted to share the joy with leaders I admire in my network — would mean a lot to get a quick wish or blessing from you! 🌟`,
        followup: `Really appreciate the warmth and encouragement, ${firstName}! Means a ton coming from you. Whenever anyone in your network is looking to elevate their web presence, please feel free to send them my way. Cheering for your continued success!`
      };
    } else {
      return {
        full: `Hi ${firstName}, hope you're having a wonderful week!

I wanted to share a quick, joyful update from my side. After months of intense focus, craft, and late nights, we’ve officially launched Uncoded Hub (https://uncodedhub.com). We engineer bespoke, tailor-made websites designed to give businesses a modern, high-converting edge.

This has been such an energizing chapter for me, and I wanted to share this joy directly with builders and leaders in my network like yourself.

No pitch whatsoever — just celebrating this milestone, and I’d be deeply grateful for a small blessing or a quick encouraging word from you!

If you or anyone in your circle ever needs an exceptional website built with true craftsmanship, I'm always here. Here's to building great things! 🥂`,
        short: `Hi ${firstName}! Dropping by to share a joyful milestone — we’ve officially launched Uncoded Hub (https://uncodedhub.com) for bespoke web engineering. No pitch at all, just sharing our joy with builders in my network and requesting a quick happy wish or blessing! Keep us in mind whenever a website comes up in your circle. 💫`,
        followup: `Thank you for the wonderful wish, ${firstName}! That truly made my day. Here’s wishing you and ${company || 'your team'} exponential success. Let’s stay connected!`
      };
    }
  }

  if (persona === 'creative') {
    if (variant === 0) {
      return {
        full: `Hi ${firstName}, hope you're having an inspiring week! Always admire having fellow visual storytellers and creative minds like you in my network.

I'm reaching out with genuine excitement to share a milestone that means the world to me. We’ve just officially launched Uncoded Hub (https://uncodedhub.com) — our web studio built with deep obsession over visual typography, fluid motion, and pixel-level craft.

Because you truly understand aesthetic quality and great design, sharing this moment with you felt very natural. Absolutely no agenda here — just wanted to share our joy, and I would love a quick happy wish or your thoughts if you get a second to peek at it!

Whenever you or any creative peer, friend, or client ever needs an extraordinary digital home or portfolio built, remember we're right here. Wishing you continued creative flow! 🎨✨`,
        short: `Hi ${firstName}! As a creative mind I respect in my network, I wanted to share our exciting milestone — we just launched Uncoded Hub (https://uncodedhub.com), obsessed with bespoke design, fluid motion, and pixel-perfect web craft. No pitch at all, just sharing our joy and would love a quick blessing or happy wish from you! 🎨`,
        followup: `Thank you so much for the love, ${firstName}! Coming from someone with a keen creative eye, your words mean a lot. If you or any peers in your creative circle ever need a bespoke web build, I'd love to collaborate. Keep creating amazing work!`
      };
    } else if (variant === 1) {
      return {
        full: `Hello ${firstName}, hope your creative projects${companyMention} are going wonderfully!

Wanted to share an uplifting update with you. We’ve recently brought Uncoded Hub (https://uncodedhub.com) to life — a design-first studio where we craft custom, high-end websites where design aesthetics, typography, and motion meet rock-solid engineering.

As someone who lives and breathes visual storytelling, you know how rare it is to see true digital craftsmanship. I wanted to share this joyful launch milestone with you.

Zero pitch here — just sharing the excitement of building something with deep care, and asking for your warm blessings or a cheerful message!

If a client, friend, or collaborator ever asks for a website that requires genuine artistic and technical finesse, please keep Uncoded Hub in mind. Have a phenomenal week! 🌟`,
        short: `Hello ${firstName}! Dropping by to share a creative milestone — we’ve launched Uncoded Hub (https://uncodedhub.com), dedicated to bespoke, design-led web development. No pitch, just sharing the joy with creative peers and would love a quick blessing or happy wish! 🖌️`,
        followup: `So grateful for your kind wish, ${firstName}! Your support means a lot. If you or any colleagues ever need a trusted design-engineering partner for a web project, I'm always here. Let’s keep in touch!`
      };
    } else {
      return {
        full: `Hi ${firstName}, hope you're having a brilliant week!

I wanted to share a quick creative milestone that has been bringing me immense joy. We’ve officially rolled out Uncoded Hub (https://uncodedhub.com) — where we handcraft bespoke websites designed with editorial typography, smooth motion, and unmistakable visual identity.

Having fellow creators like you in my network makes sharing this all the more meaningful.

No pitch at all — just genuinely excited to share what we've built, and I would love a quick happy wish or your honest impression if you have a moment!

Whenever someone in your circle ever talks about building a website with true aesthetic distinction, remember Uncoded Hub. Wishing you endless inspiration! 🎬✨`,
        short: `Hi ${firstName}! Celebrating a milestone today — we’ve launched Uncoded Hub (https://uncodedhub.com) for bespoke, editorial-grade web design. Just wanted to share our joy with creative peers in my network and ask for a quick happy wish or blessing! Keep us in mind for any future web projects. 💫`,
        followup: `Thank you so much, ${firstName}! Your positive vibes mean everything. Whenever anyone in your network wants a standout digital showcase, I'm just a ping away. Let's make great things happen!`
      };
    }
  }

  if (persona === 'tech') {
    if (variant === 0) {
      return {
        full: `Hi ${firstName}, hope you're having a great week!

Wanted to drop by and share an exciting milestone with you. Over the last few months, we've been heads-down building and launching Uncoded Hub (https://uncodedhub.com) — an engineering-first web studio focused on bespoke architecture, blazing performance, and zero bloatware.

Bringing this to life from scratch has been pure joy and countless hours of craft. As a fellow tech mind in my network, sharing this milestone with you feels special.

Absolutely no pitch here — just sharing our launch excitement and would love a quick happy wish or high-five if you resonate with what we're building!

If your team or anyone in your circle (a peer, friend, or colleague) ever looks for a fast, modern web platform engineered right, you know who to ping. Cheers to great builds! 💻⚡`,
        short: `Hi ${firstName}! Sharing a quick milestone with you — we just launched Uncoded Hub (https://uncodedhub.com), an engineering-led studio focused on clean architecture and high-performance bespoke websites. No pitch at all, just sharing the joy with fellow tech minds and would love a quick high-five or happy wish! 🚀`,
        followup: `Thanks a lot, ${firstName}! Really appreciate the positive energy and support. Building clean, high-performance web systems is our obsession. If anyone in your circle ever needs a rock-solid web build, I'm always happy to help. Have a fantastic week!`
      };
    } else if (variant === 1) {
      return {
        full: `Hello ${firstName}, hope everything is going well with your engineering work${companyMention}!

I'm writing to share a personal milestone that I'm really excited about. We have just launched Uncoded Hub (https://uncodedhub.com) — built on modern, lightning-fast architecture, custom React components, and zero clunky legacy templates.

Turning this vision into reality has been deeply rewarding. Connecting with great developers and tech professionals like you in my network makes sharing this milestone even more meaningful.

No sales angle at all — simply celebrating this launch, and I'd be genuinely grateful for a quick happy wish or thumbs-up from you!

Whenever anyone in your company, developer circle, or friends ever needs a blazing-fast, custom web build, remember Uncoded Hub is ready. Happy coding! 🚀`,
        short: `Hello ${firstName}! Just launched Uncoded Hub (https://uncodedhub.com) — custom web engineering, ultra-fast speeds, and clean code. No sales pitch, just sharing our joy with tech colleagues and asking for a quick high-five or good wish! 💻`,
        followup: `Awesome hearing from you, ${firstName}! Thank you so much for the encouragement. It’s always great connecting with fellow tech minds. If anyone in your circle ever needs high-grade web engineering, count me in. Cheers!`
      };
    } else {
      return {
        full: `Hi ${firstName}, hope you're having an awesome week!

Wanted to share a quick update on a passion project that just went live. We've officially launched Uncoded Hub (https://uncodedhub.com) — engineering bespoke digital products with zero template debt, sub-second load times, and custom interaction design.

Shipping this has been such a fulfilling journey, and I wanted to share this moment directly with fellow builders and engineers in my network.

No agenda or pitch — just sharing the launch happiness and asking for a quick happy wish or high-five to celebrate!

Whenever you or anyone in your circle is talking about revamping a web presence or building from scratch, remember we're here. Keep shipping great code! ⚙️⚡`,
        short: `Hi ${firstName}! Proud to share that we just launched Uncoded Hub (https://uncodedhub.com) — bespoke, high-performance web engineering. No pitch, just sharing the milestone with fellow engineers and hoping for a quick high-five or wish! Keep us in mind for future web builds. 🚀`,
        followup: `Really appreciate the support, ${firstName}! Thank you for the positive response. Wishing you smooth deploys and great projects ahead. Let’s stay in touch!`
      };
    }
  }

  if (persona === 'healthcare') {
    if (variant === 0) {
      return {
        full: `Hello ${firstName}, hope you are having a wonderful and fulfilling week!

I wanted to take a brief moment to share an uplifting milestone from my side. We have just poured our heart into launching Uncoded Hub (https://uncodedhub.com) — a dedicated studio helping professionals and clinics bring their true story, trust, and reputation to life through elegant, bespoke digital presences.

Building this has been a deeply joyful and meaningful journey for me. Since you are a valued connection in my network doing impactful work, I simply wanted to share this happy moment with you.

No business motive at all — just reaching out to share our joy, and I would be truly grateful for a small blessing or a warm wish for our new journey!

Whenever you, a colleague, or a close friend ever think of building a trusted website, I hope Uncoded Hub comes to mind. Wishing you health and continued fulfillment! 🌿`,
        short: `Hello ${firstName}, wishing you a peaceful week! I wanted to share a happy milestone — we recently launched Uncoded Hub (https://uncodedhub.com) to craft elegant, trust-building websites. No agenda at all, just sharing our joy with valued professionals in my network and requesting your warm wishes and blessings! 🌸`,
        followup: `Thank you so very much, ${firstName}! Your kind blessing and encouragement mean a great deal to me. Whenever you or a colleague ever consider building or updating a web presence, please know I am always here to support. Wishing you wellness and success!`
      };
    } else {
      return {
        full: `Warm greetings ${firstName}, hope your week is going smoothly and peacefully!

I wanted to share a joyful milestone from our side. We have recently launched Uncoded Hub (https://uncodedhub.com) — where we craft bespoke, serene, and highly trustworthy websites designed to reflect the care and professionalism of respected practices.

Creating this platform has brought me so much purpose and gratitude, and I wanted to share this happy moment with valued practitioners in my network.

Please know there is no commercial pitch here — I simply wanted to share our launch joy, and would be deeply touched to receive your warm blessings or a cheerful message!

If you, your clinic, or a colleague ever need a welcoming and credible web presence, please think of Uncoded Hub. Wishing you abundant health and peace! 🩺✨`,
        short: `Warm greetings ${firstName}! Reaching out to share a happy update — we’ve launched Uncoded Hub (https://uncodedhub.com), crafting bespoke and credible websites. No pitch, just sharing our joy with respected healthcare connections and hoping for your kind blessings! 🌿`,
        followup: `Thank you from the bottom of my heart, ${firstName}! Your blessings give us immense encouragement. Whenever a need for a website comes up for you or your colleagues, I will be delighted to help. Warmest regards!`
      };
    }
  }

  if (persona === 'realestate') {
    if (variant === 0) {
      return {
        full: `Hi ${firstName}, hope you're having a productive week${companyMention}!

I wanted to take a moment to share an exciting milestone from our end. We’ve just launched Uncoded Hub (https://uncodedhub.com) — crafting bespoke, architectural-grade websites designed to showcase spaces, properties, and projects with elegance and prestige.

Building this platform from the ground up has been an absolute joy. Because you understand the value of presentation, space, and premium aesthetics, sharing this milestone with you feels special.

Zero sales pitch — just genuinely sharing our milestone and excitement, and I’d be so happy to receive a quick wish or blessing from you!

Whenever you, a partner, or a colleague ever need a standout website that reflects true quality, I hope you'll remember Uncoded Hub. Wishing you great success ahead! 🏛️`,
        short: `Hi ${firstName}! Wanted to share some exciting news — we've just launched Uncoded Hub (https://uncodedhub.com), building bespoke, high-end websites with architectural precision. No pitch at all, just sharing our joy with respected leaders in space & design, and would love a quick happy wish from you! 🏢`,
        followup: `Thank you so much, ${firstName}! Really appreciate your warm words and encouragement. If you or anyone in your industry ever needs a high-impact digital presence to showcase their work, I'm always at your service. Wishing you all the best!`
      };
    } else {
      return {
        full: `Hello ${firstName}, hope your projects and developments are thriving!

I'm dropping a quick note to share a proud milestone. We have officially launched Uncoded Hub (https://uncodedhub.com) — specializing in tailor-made web experiences for architects, builders, and real estate pioneers who care about premium presentation.

Designing and building this has been a truly energizing journey for our team. As someone who appreciates structure, elevation, and design in the physical world, I really wanted to celebrate this launch with you.

No business pitch here — just sharing our joy and asking for a quick happy wish or blessing as we take this forward!

If you or a colleague in real estate ever need a website that commands prestige, remember Uncoded Hub. Wishing you soaring success! 🏙️✨`,
        short: `Hello ${firstName}! Reaching out to share our milestone — we've launched Uncoded Hub (https://uncodedhub.com) for bespoke, premium architectural and property websites. No pitch, just sharing our joy and requesting a quick happy wish! Keep us in mind for future projects. 🏗️`,
        followup: `Thank you for the wonderful message, ${firstName}! Your support means a lot. If you, a partner, or a colleague ever look to elevate your digital presence, I'm right here. Wishing you monumental achievements ahead!`
      };
    }
  }

  if (persona === 'fitness') {
    if (variant === 0) {
      return {
        full: `Hi ${firstName}, hope you're having an energetic and inspiring week!

I wanted to share a quick, joyful milestone from my side. Over the past few months, we've poured immense energy and dedication into launching Uncoded Hub (https://uncodedhub.com) — building high-impact, bespoke websites for people and brands dedicated to transforming lives.

Launching this has brought me so much joy and momentum. As someone inspiring people around health and growth, I really wanted to share this happy chapter with you!

No sales pitch at all — just sharing our joy and positive vibes, and I'd be super grateful for a quick happy wish or high-five to cheer our launch!

If you or any fellow coach, trainer, or friend ever needs an inspiring website that converts, keep Uncoded Hub in mind. Wishing you continuous power and impact! 💪✨`,
        short: `Hi ${firstName}! Sending positive vibes your way — we just launched Uncoded Hub (https://uncodedhub.com) to craft powerful, high-converting websites. No pitch at all, just sharing our milestone with people who inspire growth, and would love a quick happy wish or high-five! 🌟`,
        followup: `Thank you for the fantastic energy and wishes, ${firstName}! Means a lot. Whenever you or anyone in your wellness circle ever wants to build an incredible website, feel free to reach out. Keep inspiring!`
      };
    } else {
      return {
        full: `Hello ${firstName}, sending strong, positive energy your way!

Wanted to share an exciting personal milestone that has me super energized. We’ve just officially launched Uncoded Hub (https://uncodedhub.com) — crafting bespoke, dynamic websites designed to help coaches and wellness brands inspire and convert their ideal community.

Building this from scratch has been pure passion. Connecting with people in health and fitness who drive real change is always motivating, so I wanted to share this joyful moment with you.

No pitch whatsoever — just sharing the celebration, and I’d love a quick high-five or happy wish for our launch!

Whenever you, a fitness peer, or a client ever mention building an upgraded website, remember Uncoded Hub. Stay strong and keep crushing your goals! 🏋️‍♂️🔥`,
        short: `Hello ${firstName}! Sharing some great news — we just launched Uncoded Hub (https://uncodedhub.com), building bespoke, high-converting websites for fitness and wellness leaders. No pitch, just sharing the excitement and hoping for a quick high-five or happy wish! 💥`,
        followup: `Thanks so much for the epic energy, ${firstName}! That pumped me up. If you or anyone in your fitness network ever wants to take their digital presence to the next level, I'm here. Keep winning!`
      };
    }
  }

  // Default: Professional / Peer
  if (variant === 0) {
    return {
      full: `Hi ${firstName}, hope you're having a fantastic week!

I wanted to drop a quick, cheerful note to share an exciting personal milestone. Over the past few months, we've poured our dedication into creating Uncoded Hub (https://uncodedhub.com) — crafting bespoke, modern websites that help brands and individuals leave an unforgettable impression.

Launching this has brought me so much joy and gratitude. As someone in my professional network, I really wanted to celebrate this step with you.

Not selling anything at all — just genuinely sharing our milestone, and receiving a quick happy wish, blessing, or word of encouragement from you would make my day!

If you, a colleague, or a friend ever need a standout website in the future, you know you have a friend in the business. Wishing you all the best! Warm regards, Deepak ✨`,
      short: `Hi ${firstName}! Hope you're doing well. Just dropping by to share a joyful milestone — we’ve launched Uncoded Hub (https://uncodedhub.com), crafting bespoke, modern websites. No pitch at all, just sharing our joy with respected connections and would love a quick happy wish or blessing! Keep us in mind if a website ever comes up in your circle. 😊`,
      followup: `Thank you so much, ${firstName}! Your kind words and support really mean a lot to me. If you, a colleague, or a friend ever need guidance or a standout website, I'm always happy to help. Wishing you a great week ahead!`
    };
  } else if (variant === 1) {
    return {
      full: `Hello ${firstName}, hope work and life are treating you well!

I'm reaching out with a genuine smile to share an exciting milestone. We’ve recently unveiled Uncoded Hub (https://uncodedhub.com) — our dedicated digital studio focused on designing bespoke, high-performance websites without generic templates.

Building this from the ground up has been an absolute labor of love and joy. Since we are connected here on LinkedIn, I really wanted to share this proud moment with you.

Zero pressure or sales pitch — just sharing our milestone, and I would love a quick happy message, blessing, or word of cheer from your side!

Whenever you or someone you know (friends, family, or colleagues) ever talks about building a fresh or upgraded website, please remember Uncoded Hub. Wishing you continued success! Warmly, Deepak 🌟`,
      short: `Hello ${firstName}! Reaching out to share a cheerful personal milestone — we just launched Uncoded Hub (https://uncodedhub.com) to craft distinctive, custom websites. No agenda at all, just sharing our joy with valued connections and hoping for your kind wishes! Remember us whenever a website project comes up. ✨`,
      followup: `Really appreciate the warmth and encouragement, ${firstName}! Thank you for taking a moment to reply. If you or anyone in your circle ever looks to build a world-class website, I’d be thrilled to assist. Have an amazing rest of the week!`
    };
  } else {
    return {
      full: `Hi ${firstName}, hope you're having a wonderful and productive week!

I wanted to share a quick piece of happy news with you. After months of hard work and craft, we have launched Uncoded Hub (https://uncodedhub.com) — a custom website studio where we design and engineer bespoke web experiences that truly stand apart.

This has been such an inspiring journey for me, and sharing this milestone with valued people in my network feels wonderful.

I'm not looking to sell you anything — just sharing our joy, and I would be deeply honored if you could send a quick happy wish or blessing our way!

And whenever anyone in your network ever mentions needing a new website, you know who to connect them with. Wishing you great momentum! Best, Deepak 🚀`,
      short: `Hi ${firstName}, hope you're having a great week! Wanted to share some happy news — we’ve launched Uncoded Hub (https://uncodedhub.com) for bespoke web design and engineering. No pitch, just celebrating this milestone with my network and requesting your good wishes! If anyone needs a website, you know where to find me. 💫`,
      followup: `Thank you so much, ${firstName}! Your kind wishes and positive energy mean the world to me. Keep in touch, and if any website opportunities ever arise in your circle, I'm always at your service!`
    };
  }
}

function parseCSVLine(text) {
  const result = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (inQuotes && text[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      result.push(cur.trim());
      cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur.trim());
  return result;
}

function escapeCSV(str) {
  if (str === null || str === undefined) return '""';
  const s = String(str);
  if (s.includes('"') || s.includes(',') || s.includes('\n') || s.includes('\r')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return `"${s}"`;
}

console.log('Starting full generation of 15,148 personalized DMs...');

const raw = fs.readFileSync(inputCsvPath, 'utf8');
const allLines = raw.split(/\r?\n/);
const headerIdx = allLines.findIndex(l => l.startsWith('First Name,Last Name'));
const dataLines = allLines.slice(headerIdx + 1).filter(l => l.trim().length > 0);

console.log(`Found ${dataLines.length} connections to process.`);

const csvHeader = [
  'First Name',
  'Last Name',
  'Clean First Name',
  'LinkedIn URL',
  'Company',
  'Clean Company',
  'Position',
  'Category',
  'Personalized_DM_Full',
  'Personalized_DM_Short',
  'FollowUp_Reply_Template',
  'Connected On'
].join(',');

const outStream = fs.createWriteStream(outputCsvPath, { encoding: 'utf8' });
outStream.write(csvHeader + '\n');

// We will also build an ultra-fast compact JSON array for the web dashboard:
// [ [first, last, cleanName, url, company, cleanComp, position, category, fullDm, shortDm, followup, connectedOn], ... ]
// By storing as an array of arrays, it reduces JSON size by 65%!
const jsonRows = [];

let stats = {
  total: dataLines.length,
  founder: 0,
  creative: 0,
  tech: 0,
  healthcare: 0,
  realestate: 0,
  fitness: 0,
  professional: 0
};

for (let i = 0; i < dataLines.length; i++) {
  const row = parseCSVLine(dataLines[i]);
  const [firstName, lastName, url, email, company, position, connectedOn] = row;
  
  const cleanName = cleanFirstName(firstName, lastName, position, company);
  const cleanComp = cleanCompany(company);
  const persona = classifyPersona(position, company, firstName);
  
  stats[persona] = (stats[persona] || 0) + 1;

  const copy = generateCopy(cleanName, cleanComp, position, persona, i);

  const csvRow = [
    escapeCSV(firstName || ''),
    escapeCSV(lastName || ''),
    escapeCSV(cleanName),
    escapeCSV(url || ''),
    escapeCSV(company || ''),
    escapeCSV(cleanComp),
    escapeCSV(position || ''),
    escapeCSV(persona.toUpperCase()),
    escapeCSV(copy.full),
    escapeCSV(copy.short),
    escapeCSV(copy.followup),
    escapeCSV(connectedOn || '')
  ].join(',');

  outStream.write(csvRow + '\n');

  // Compact entry for web dashboard
  jsonRows.push([
    cleanName,
    lastName || '',
    cleanComp,
    position || '',
    persona.toUpperCase(),
    url || '',
    copy.full,
    copy.short,
    copy.followup,
    connectedOn || ''
  ]);
}

outStream.end(() => {
  console.log('✅ Generation Complete!');
  console.log(`Saved full CSV to: ${outputCsvPath}`);
  console.log('Stats:', stats);
  
  // Write compact JSON
  fs.writeFileSync(outputJsonPath, JSON.stringify({ stats, rows: jsonRows }), 'utf8');
  console.log(`Saved dashboard data to: ${outputJsonPath}`);
});

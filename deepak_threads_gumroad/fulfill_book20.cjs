const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'ebooks', '20_the_conversation_mastery_manual.md');

// Generate 50 unique questions for Category A
const catA = [
  'What is the most chaotic purchase you’ve ever made that you don’t regret for a single second?',
  'If your personality was a cocktail, what ingredients would be in it and what warning label would it carry?',
  'What is a hill you are completely prepared to die on, no matter how ridiculous it sounds to other people?',
  'What’s the absolute worst piece of advice you’ve ever followed with total confidence?',
  'If you were forced to enter a reality TV show tomorrow, which one would you actually win?',
  'What is the most absurd conspiracy theory that you secretly kind of want to be true?',
  'What’s a food combination you love that would make a Michelin-star chef cry?',
  'If your inner monologue had a celebrity narrator, who would be doing the voice?',
  'What’s the most embarrassing phase you went through in middle school or high school?',
  'If you could ban one piece of modern small talk from existence forever, what would it be?',
  'What’s the most useless talent or party trick you possess?',
  'What movie or book title best describes your dating history up to this point?',
  'If you could commit one minor, victimless crime and never get caught, what are you doing?',
  'What is something everyone pretends to like, but you’re convinced everyone is faking?',
  'What’s the worst job you ever had that gave you the best stories?',
  'If you were arrested with no explanation, what would your best friend immediately assume you did?',
  'What’s the most ridiculous lie you were told as a child that you believed for way too long?',
  'What is your go-to karaoke song when you’re three drinks in and feeling invincible?',
  'If you had to live inside one sitcom universe for an entire year, which one are you picking?',
  'What’s the weirdest rabbit hole you’ve fallen down on YouTube or Wikipedia at 2 AM?',
  'What is the most overdramatic reaction you’ve ever had to something completely minor?',
  'If you were a ghost, how would you haunt people in a mildly inconvenient way rather than a scary way?',
  'What’s the most questionable fashion choice you defended with your entire soul five years ago?',
  'If you could swap lives with any fictional villain for 48 hours, who would it be?',
  'What’s the pettiest reason you ever refused to talk to someone or swiped left on an app?',
  'What is a trend from the 2000s or 2010s that needs an immediate, aggressive revival?',
  'If an alien civilization visited tomorrow, what is the one human custom that would be impossible to explain to them?',
  'What’s the most unhinged text you’ve ever drafted in your Notes app but luckily had the discipline not to send?',
  'What is the single best Wi-Fi network name you have ever encountered in the wild?',
  'If you were given $50,000 but had to spend it entirely within 60 minutes on non-investments, what are you buying?',
  'What’s your controversial take on pineapple on pizza, coffee vs tea, or socks with sandals?',
  'What is the most unnecessary luxury item you own that you refuse to live without?',
  'What’s the funniest rumor someone ever started about you that was wildly incorrect?',
  'If you had to be trapped in an elevator for 4 hours with one celebrity, who would keep you entertained?',
  'What is a sport or hobby that looks ridiculously easy until you actually try it?',
  'What’s the weirdest habit you have when you are completely alone in your apartment?',
  'If you had to rename yourself tomorrow with a single dramatic alias, what are you choosing?',
  'What is a guilty pleasure TV show or song that you fiercely defend against all critics?',
  'What’s the worst haircut disaster of your life and how long did you have to wear a hat?',
  'If your pet could speak fluent English for exactly 10 minutes, what’s the first question you ask them?',
  'What is something that is completely legal, but somehow always feels illegal when you do it?',
  'What’s the best road trip snack that is non-negotiable in the passenger seat?',
  'If you had to survive a zombie apocalypse, which three people in your phone contacts are you calling first?',
  'What’s the most awkward silence you’ve ever endured on a first date or job interview?',
  'What is an unpopular food opinion that would get you disowned by an entire culture?',
  'If you were a professional wrestler, what would your walkout song and signature move be?',
  'What’s the most chaotic family holiday dinner you’ve ever witnessed?',
  'What’s a modern convenience that you think has quietly made humanity slightly worse?',
  'If you could read the mind of one person in this room for 30 seconds, who would it be?',
  'What’s the most spontaneous thing you’ve ever done on a random Tuesday?'
];

// Generate 50 unique questions for Category B
const catB = [
  'What is something you could talk about for 45 minutes straight without a single slide or preparation?',
  'What’s a major risk you took in the last two years that completely reshaped your trajectory as a person?',
  'What is something you secretly want to be known for, entirely outside of your professional job title?',
  'Who in your life made you feel like you were capable of achieving anything before you even believed it yourself?',
  'What does your version of true freedom look like on an ordinary, unstructured Tuesday morning?',
  'What is an ambitious goal you have that you rarely tell people about because it sounds too audacious?',
  'What book, podcast, or essay fundamentally rewired how you view success or relationships?',
  'What is a skill you dedicated hundreds of hours to learning that completely changed your confidence?',
  'If money was completely irrelevant and all careers paid the same, what would you spend your days building?',
  'What is a boundary you set in your career or personal life that was terrifying to implement but saved your sanity?',
  'What’s the hardest lesson you’ve learned about leadership, responsibility, or entrepreneurship?',
  'When you look at your calendar over the past month, does it reflect what you actually value?',
  'What’s an area of your life where you used to tolerate mediocrity, but now demand excellence?',
  'What was the defining turning point in your 20s where you realized childhood was officially over?',
  'What is something you’ve changed your mind about completely in the last twelve months?',
  'What kind of mentor or coach has had the biggest profound impact on your worldview?',
  'If you could master one complex discipline overnight—philosophy, coding, architecture, jazz—what are you choosing?',
  'What is a question you wish people asked you more often in social or professional settings?',
  'How do you personally distinguish between productive ambition and unhealthy, exhausting perfectionism?',
  'What does personal mastery mean to you when nobody is watching or applauding?',
  'What is an environment where you feel 100% in your creative or intellectual flow state?',
  'What’s the most valuable failure of your life—the one that stung at the time but redirected you toward gold?',
  'What is a non-negotiable morning or evening habit that keeps your mental health locked in?',
  'What advice would you give your 18-year-old self that they would actually listen to and take seriously?',
  'How do you handle seasons of self-doubt or creative stagnation when momentum slows down?',
  'What is a cause, idea, or craft that you would gladly dedicate the next decade of your life to advancing?',
  'What does building real, generational wealth mean to you beyond just a bank account balance?',
  'Who is someone you admire from afar whose personal ethics and character impress you as much as their success?',
  'What is a habit you recently cut out of your life that immediately gave you back 5 hours of energy every week?',
  'If you could take a 6-month sabbatical anywhere on earth to study one topic in depth, where and what?',
  'What is the standard you hold yourself to that most people around you think is unnecessarily high?',
  'How do you protect your deep-focus time in a world designed to constantly distract you?',
  'What is something you built, created, or achieved that you are quietly the most proud of?',
  'What kind of legacy do you want your daily presence to leave on the people who interact with you?',
  'What is an uncomfortable truth about growth that most motivational content glosses over?',
  'How do you define the difference between a high-value opportunity and a shiny distraction?',
  'What is a philosophy or mental model that helps you make decisions when you have incomplete information?',
  'What’s a sacrifice you made for your future that your peers didn’t understand at the time?',
  'How do you measure whether a year was truly successful in your personal ledger?',
  'What is an intellectual curiosity you have that none of your close friends share?',
  'What does it take to truly earn your deep respect in a professional or creative partnership?',
  'How has your definition of "a good life" evolved between age 20 and right now?',
  'What is a project you are currently terrified of starting because you care so much about doing it right?',
  'What is the most empowering piece of feedback a mentor ever gave you, even if it bruised your ego?',
  'How do you recharge when your mental battery is at 5%—solitude, nature, physical intensity, or quiet reflection?',
  'What is an industry or cultural norm that you think is completely overdue for disruption?',
  'What is a promise you made to yourself that you have never broken, regardless of temptation?',
  'What does true intellectual honesty look like when your own prior assumptions are proven wrong?',
  'If you were invited to give a 15-minute speech to 10,000 ambitious young people, what is your core thesis?',
  'What is the single most important decision you make on a daily basis that shapes your future?'
];

// Generate 50 unique questions for Category C
const catC = [
  'What’s a lesson about love that took you a painful, sleepless heartbreak to finally understand?',
  'What does genuine emotional safety feel like to you inside a romantic relationship?',
  'What is a part of your personality that you used to hide or apologize for, but have learned to embrace?',
  'When was the last time you cried tears of genuine relief, gratitude, or quiet catharsis?',
  'What’s an unwritten rule in the family you grew up in that you had to consciously unlearn as an adult?',
  'What is a boundary you struggle to maintain when you really like someone and want to please them?',
  'What was the most lonely season of your life, and what did that isolation teach you about your inner strength?',
  'What is something an ex-partner said to you that took you a long time to realize wasn’t actually your fault?',
  'How do you personally react when you feel misunderstood—do you withdraw into silence or over-explain?',
  'What does it look like when someone truly "sees" you past your social charisma or defenses?',
  'What is a fear you carry about intimacy or long-term commitment that rarely gets spoken out loud?',
  'When you look back at your first serious relationship, what would you apologize for if you could?',
  'What is the difference for you between being physically attracted to someone and feeling emotionally hooked?',
  'What is an emotional need you used to expect partners to meet that you now realize you have to fulfill yourself?',
  'How do you know when you’ve crossed the line from healthy attachment into anxious codependency?',
  'What was a moment where someone gave you grace when you fully expected them to judge or condemn you?',
  'What is something you find deeply romantic that has nothing to do with expensive gifts or vacations?',
  'What does it take for you to feel comfortable enough around someone to let your social guard completely down?',
  'What’s a pattern in your past dating history that you are actively working to break right now?',
  'How do you prefer to be comforted when you are overwhelmed—physical touch, quiet presence, or verbal reassurance?',
  'What is a compliment someone gave you years ago that you still replay in your head when you doubt yourself?',
  'What was a conversation you avoided having for months because you were terrified of what the answer would be?',
  'How has your capacity to forgive people evolved as you’ve gotten older and experienced your own mistakes?',
  'What is an unspoken insecurity you have about how attractive or worthy you are to the people you desire?',
  'When in your life did you feel the most emotionally unprotected, and who helped you rebuild your foundation?',
  'What is a hard truth about yourself that a close friend had the courage to tell you to your face?',
  'What does mutual respect actually look like in day-to-day conflict between two committed partners?',
  'How do you know when a connection is dead versus when it is simply going through a temporary dry season?',
  'What is something you wish your parents understood about how they raised you that you’ve never told them?',
  'What does loyalty mean to you when circumstances become messy, uncomfortable, or inconvenient?',
  'Have you ever had to walk away from someone you were still desperately in love with because they were bad for you?',
  'What is an emotional wound you carry that you are currently in the process of healing?',
  'How do you distinguish between intuition warning you about someone and your own past trauma acting up?',
  'What is the most vulnerable thing you’ve ever confessed to someone on a late-night drive?',
  'What makes an apology feel sincere and restorative to you versus empty and manipulative?',
  'What is something you need from a partner when you are sick, exhausted, or failing at work?',
  'How do you maintain your own self-worth when someone you thought was "the one" chooses someone else?',
  'What was a moment where you realized you had outgrown a friendship or relationship that once meant the world to you?',
  'What is an aspect of modern dating culture that breaks your heart the most when you observe it?',
  'What does emotional maturity look like to you in someone’s eyes when they are angry with you?',
  'Have you ever felt completely unseen while sitting directly across a dinner table from someone you loved?',
  'What is a quality in someone that immediately makes your nervous system feel calm and grounded?',
  'What was a turning point where you decided you would never tolerate breadcrumbs of affection again?',
  'How do you handle the fear that someone will get to know the real, unvarnished you and lose interest?',
  'What is something you forgive yourself for doing in your early 20s when you didn’t know any better?',
  'What does spiritual or emotional intimacy look like to you outside of physical sexuality?',
  'What is a lesson about human nature that you learned the hard way through betrayal or broken promises?',
  'How do you communicate to someone that you need space without making them feel rejected or anxious?',
  'What is the kindest thing a partner ever did for you that cost zero dollars but meant everything?',
  'What is an emotional truth about yourself that you are finally ready to speak out loud tonight?'
];

// Generate 50 unique questions for Category D
const catD = [
  'What is something you wish people understood about your heart without you having to constantly explain it?',
  'If tonight was our absolute last night on this earth, what would you want to do with the next four hours?',
  'What makes someone feel like "home" to you, rather than just another place you visit?',
  'What is a secret dream you rarely say out loud to anyone because it feels too fragile or sacred?',
  'What do you think our souls recognized in each other in the first five minutes we met?',
  'When you look at the stars late at night, do you feel an overwhelming sense of insignificance or connection?',
  'What is a question you have been secretly hoping someone would have the depth to ask you all year?',
  'If you could revisit one specific hour of your life and live inside that feeling one more time, which one?',
  'What does peace feel like in your chest when everything around you is quiet?',
  'What is an unspoken longing you have carried since childhood that you’ve never fully articulated?',
  'If you could speak to the person you will be at age 80, what do you hope they say about your courage?',
  'What is something about the way you love that you think is rare in today’s superficial world?',
  'Have you ever felt a connection with someone that felt older than the days you’ve been alive?',
  'What is the most beautiful thing you have ever witnessed that took your breath away in complete silence?',
  'What part of your life right now feels like it’s waiting for a major, courageous transformation?',
  'If you had to describe your internal emotional landscape as a landscape—desert, ocean, forest—what is it?',
  'What is something you are still grieving that nobody around you even knows you lost?',
  'What makes someone unforgettable to you long after the conversation ends and the night is over?',
  'If we were completely stripped of our social titles, resumes, and histories, who are you at your core?',
  'What is a truth about the universe or human consciousness that keeps you awake in wonder at 3 AM?',
  'What do you think is the difference between love that consumes you and love that liberates you?',
  'When was the last time you felt a transcendent sense of awe that made goosebumps appear on your skin?',
  'What is something you know you need to let go of in order to step into the next chapter of your life?',
  'If you could leave one profound message carved into a stone that lasted for 1,000 years, what does it say?',
  'What is a promise you need to make to yourself tonight before you close your eyes and sleep?',
  'What does it feel like when someone looks past your eyes and sees directly into your soul?',
  'What is a regret that you carry that you secretly know made you a significantly more compassionate human?',
  'If love is an art form, what kind of masterpiece are you trying to paint with your life?',
  'What is a quiet intuition you’ve had recently that you know you need to stop ignoring?',
  'What makes a human being truly sacred to you in a world that treats people as disposable commodities?',
  'When you think of the word "surrender", does it feel like weakness or does it feel like immense strength?',
  'What is a part of yourself that you have kept in the shadows that is ready to step into the light?',
  'If we never spoke again after tonight, what is the one thing you would want me to remember about you?',
  'What is the most honest sentence you have ever spoken to another human being?',
  'What does unconditional love look like when the person receiving it doesn’t deserve it in that moment?',
  'What is a song that feels like it was written specifically for the deepest chamber of your heart?',
  'When you look at your hands, whose hands from your family lineage do you see in them?',
  'What is an emotion you feel deeply that doesn’t have an adequate word in the English language?',
  'What was a moment in your life where you felt completely, divinely protected from disaster?',
  'If your heart had a physical front door, what would it take for someone to be invited to knock on it?',
  'What is the most generous interpretation of your own flaws that you can offer yourself tonight?',
  'What does true stillness feel like when all the noise of validation and social approval fades away?',
  'What is a memory from your past that still brings a sudden warmth to your chest when you remember it?',
  'What do you hope someone remembers about the way you looked at them when you were in love?',
  'If you could heal one wound in the collective human heart right now, which one are you curing?',
  'What is a thought that brings you profound comfort when you are contemplating your own mortality?',
  'What do you think two people who are meant to be in each other’s lives owe to one another?',
  'What is something about this exact conversation right now that feels different from your normal life?',
  'If you could whisper one sentence into the ear of every sleeping person on earth tonight, what is it?',
  'What does it feel like to finally be sitting across from someone who actually listens to you?'
];

let body = `# The Conversation Mastery Manual
### How to Never Run Out of Things to Say: 200 Questions, Storytelling Frameworks & Infinite Banter
**By Deepak Ravi (@founderdeepak)**
**Price Tier:** $14.00 (Communication Masterclass)

---

## Introduction: The Architecture of Captivating Conversation

The fear of awkward silence is the single greatest cause of dating anxiety.

You sit across from someone you find magnetic, your nervous system spikes, your mind goes completely blank, and the silence begins to stretch. In a panic, your brain grasps for the nearest boring interview question:
- *"So... what do you do for work?"*
- *"Where did you go to school?"*
- *"Crazy weather we're having, right?"*

These questions do not spark romance—they turn a potentially electric date into a sterile corporate HR performance review.

Great conversationalists are not born with a rare genetic gift. They operate on **three foundational communication frameworks**:
1. **The Thread Expansion Technique**: Generating infinite conversational branches from a single sentence.
2. **The 200 Questions Vault**: Categorized by depth to smoothly guide conversation from playful wit to profound vulnerability.
3. **The 60-Second Storytelling Architecture**: Hooking attention and creating emotional resonance without rambling.

This manual is your complete verbal playbook. Master these frameworks, and you will never experience an awkward silence for the rest of your life.

---

## Pillar 1: The "Thread Expansion" Technique

Every sentence your conversation partner speaks contains **multiple distinct conversational threads**. Inexperienced conversationalists only pick up on the most obvious, literal thread. Masters identify the emotional threads underneath.

### The Mechanics:
Imagine your date says:
*"I had the craziest week at the hospital where I work, and I literally had to cancel my weekend trip to Austin just to sleep."*

An amateur hears: *"She's a nurse and she went to sleep."* They reply: *"Oh, what hospital do you work at?"* (Boring logistics).

A master hears **four distinct conversational threads**:
- **Thread 1 (Emotional Intensity / The Work)**: *"A hospital setting when things get chaotic must test your mental composure like nothing else. How do you stop yourself from carrying that energy home?"*
- **Thread 2 (The City / Wanderlust)**: *"Austin is incredible. Were you heading down for the music scene or were you planning to hunt down the best food trucks in the city?"*
- **Thread 3 (Self-Care / Recovery)**: *"When your battery is drained to zero like that, what is your sacred, non-negotiable comfort ritual to come back to life?"*
- **Thread 4 (Playful Teasing)**: *"You canceled an entire Austin trip for sleep? That must have been world-record, Olympic-level hibernation."*

One single sentence gave you four completely different emotional pathways! When you listen for emotional keywords instead of waiting for your turn to speak, you will never run out of things to say.

---

## Pillar 2: The 200 Questions Vault (Categorized by Depth)

### Category A: Playful, Witty & Banter Starters (Questions 1 to 50)
Use these in the first 30 minutes of a date or via text to establish lighthearted chemistry and playful tension.

` + catA.map((q, i) => `${i + 1}. *"${q}"*`).join('\n') + `

---

### Category B: Ambition, Passions & Mindset (Questions 51 to 100)
Use these when transitioning from surface banter into what drives them, how they think, and what they value.

` + catB.map((q, i) => `${i + 51}. *"${q}"*`).join('\n') + `

---

### Category C: Emotional Depth, Love & Vulnerability (Questions 101 to 150)
Use these on date two or three, or late in the evening when mutual trust and eye contact are established.

` + catC.map((q, i) => `${i + 101}. *"${q}"*`).join('\n') + `

---

### Category D: Midnight, Intimacy & Soul-Connecting Prompts (Questions 151 to 200)
Use these during late-night drives, quiet rooms, or deep moments where you want to break past all social masks.

` + catD.map((q, i) => `${i + 151}. *"${q}"*`).join('\n') + `

---

## Pillar 3: The 60-Second Storytelling Architecture

Nobody wants to listen to a 10-minute chronological lecture about the logistics of your flight delay. Great storytelling follows the **Hook-Struggle-Spark Formula**:

\`\`\`
1. The Hook (5 to 10 seconds): Grab the room with an unexpected premise.
   ▼
2. The Struggle (35 to 40 seconds): Highlight emotional vulnerability, the obstacle, or the chaos.
   ▼
3. The Spark (10 to 15 seconds): The punchline, the realization, or turning the spotlight back to them.
\`\`\`

### The Framework in Action:
- **The Hook**: *"The worst first date I ever had in my life started with a flat tire and ended with a raccoon inside my kitchen."*
- **The Struggle**: *"I picked her up, five minutes into the drive a tire blows out on the highway in pouring rain. I'm trying to look like a competent, capable man while struggling with a rusted tire iron. We finally give up, take an Uber back to my place to order Thai food, and as I open my back door, a baby raccoon had squeezed through the pet flap and was eating cereal on the counter."*
- **The Spark**: *"Instead of freaking out, she burst out laughing, named the raccoon Barnaby, and helped me herd him out with a broom. That’s when I learned that humor under pressure is the ultimate green flag. Have you ever had a night where literally everything went sideways?"*

---

## Pillar 4: The Art of High-Status Silence

Insecure conversationalists view a silence as an emergency that must be extinguished with frantic nervous chatter.

High-value individuals view a silence as **an amplifier of romantic tension**.

When a silence falls:
- Do not check your phone.
- Do not look down at the floor or fidget with your glass.
- Maintain soft, relaxed eye contact, take a slow sip of your drink, smile faintly, and let the tension hang in the air for 3 to 5 seconds.
- 90% of the time, the other person will lean in, smile, and break the silence with a more intimate, revealing comment.

> "A great conversation is not a performance where you prove how interesting you are; it is a sanctuary where you make the other person feel completely fascinated by how deeply they are being heard."

---

## 🎁 Exclusive Reader Discounts & Referral Rewards

Thank you for reading this guide! Here are your exclusive discount and sharing benefits:

* **Your Personal Reader Discount (20% Off):** Use code \`READER20\` at checkout for **20% off** any individual guide or bundle.
* **Share With a Friend (5% Off Referral):** Loved this guide? Give your friends code \`FRIEND5\` so they get an instant **5% off** their first purchase!

### 📦 Curated Bundles (Best Value & Maximum Savings)

* **[Bundle 1: The Modern Texting & Flirting Toolkit](https://founderdeepak.gumroad.com/l/bundle-texting-toolkit/READER20)** — *Books 02 + 07* ➔ **$9.00** (*Only $7.20 with code READER20*)
* **[Bundle 2: The Silent Signs & Body Language Pack](https://founderdeepak.gumroad.com/l/bundle-body-language-pack/READER20)** — *Books 01 + 08 + 09* ➔ **$14.00** (*Only $11.20 with code READER20*)
* **[Bundle 3: The High-Stakes Romance Kit](https://founderdeepak.gumroad.com/l/bundle-high-stakes-romance/READER20)** — *Books 03 + 04 + 01* ➔ **$14.00** (*Only $11.20 with code READER20*)
* **[Bundle 4: The Deep Connection & Intimacy Masterclass](https://founderdeepak.gumroad.com/l/bundle-deep-connection/READER20)** — *Books 05 + 06 + 10* ➔ **$14.00** (*Only $11.20 with code READER20*)
* **[Bundle 5: The Complete 10-Book Original Vault](https://founderdeepak.gumroad.com/l/complete-10-book-vault/READER20)** — *Books 01 through 10* ➔ **$29.00** (*Only $23.20 with code READER20*)
* **[Bundle 6: The Rapid Dating Quick-Check Pack ($5 Tier Bundle)](https://founderdeepak.gumroad.com/l/bundle-rapid-checklists/READER20)** — *All 6 of the $5 Cheatsheets (Books 27 to 32)* ➔ **$15.00** (*Only $12.00 with code READER20*)
* **[Bundle 7: The Date Night & Attraction Mastery Pack](https://founderdeepak.gumroad.com/l/bundle-date-night-attraction/READER20)** — *Books 11 + 14 + 02* ➔ **$19.00** (*Only $15.20 with code READER20*)
* **[Bundle 8: The Reconnection & Ex-Back Strategy Pack](https://founderdeepak.gumroad.com/l/bundle-ex-reconnection/READER20)** — *Books 12 + 19 + 05* ➔ **$19.00** (*Only $15.20 with code READER20*)
* **[Bundle 9: The Boundary & Self-Worth Armor Kit](https://founderdeepak.gumroad.com/l/bundle-boundaries-armor/READER20)** — *Books 13 + 10 + 15* ➔ **$19.00** (*Only $15.20 with code READER20*)
* **[Bundle 10: The 60-Day Relationship Blueprint Pack](https://founderdeepak.gumroad.com/l/bundle-60-day-relationship/READER20)** — *Books 18 + 16 + 08* ➔ **$27.00** (*Only $21.60 with code READER20*)
* **[Bundle 11: The Master Conversation & Banter Suite](https://founderdeepak.gumroad.com/l/bundle-conversation-mastery/READER20)** — *Books 20 + 06 + 02 + 07* ➔ **$27.00** (*Only $21.60 with code READER20*)
* **[Bundle 12: The Seduction & Magnetic Presence Masterclass](https://founderdeepak.gumroad.com/l/bundle-seduction-magnetic/READER20)** — *Books 17 + 19 + 09 + 05 + 26* ➔ **$34.00** (*Only $27.20 with code READER20*)
* **[Bundle 13: The Long-Term Love & Healing Double-System](https://founderdeepak.gumroad.com/l/bundle-longterm-healing/READER20)** — *Books 24 + 25* ➔ **$34.00** (*Only $27.20 with code READER20*)
* **[Bundle 14: The Executive Double-Bible Masterclass](https://founderdeepak.gumroad.com/l/bundle-executive-bibles/READER20)** — *Books 21 + 22* ➔ **$29.00** (*Only $23.20 with code READER20*)
* **[Bundle 15: The Grand 32-Book Master Lifetime Library](https://founderdeepak.gumroad.com/l/grand-32-book-library/READER20)** — *ALL 32 BOOKS (The Complete Master Codex)* ➔ **$99.00** (*Only $79.20 with code READER20*)

---

### 📚 Complete 32-Book Master Library

#### $5 Micro-Cheatsheet
* **[Book 27: The 50 Best Opening Lines for Any Dating App](https://founderdeepak.gumroad.com/l/50-dating-app-openers/READER20)** ($5)
* **[Book 28: The 30-Second Body Language Quick-Check](https://founderdeepak.gumroad.com/l/body-language-quick-check/READER20)** ($5)
* **[Book 29: The Red Flag Rapid-Screening Checklist](https://founderdeepak.gumroad.com/l/red-flag-checklist/READER20)** ($5)
* **[Book 30: The Green Flag Locator](https://founderdeepak.gumroad.com/l/green-flag-locator/READER20)** ($5)
* **[Book 31: 30 Emergency Texts When a Conversation Goes Silent](https://founderdeepak.gumroad.com/l/emergency-texts-revival/READER20)** ($5)
* **[Book 32: The Morning After & Post-Date Etiquette Guide](https://founderdeepak.gumroad.com/l/post-date-etiquette/READER20)** ($5)

#### $7 Core Foundation
* **[Book 01: The Mixed Signals Decoder](https://founderdeepak.gumroad.com/l/mixed-signals-decoder/READER20)** ($7)
* **[Book 02: The Smooth Texting Vault](https://founderdeepak.gumroad.com/l/smooth-texting-vault/READER20)** ($7)
* **[Book 03: The Coworker Attraction Code](https://founderdeepak.gumroad.com/l/coworker-attraction-code/READER20)** ($7)
* **[Book 04: More Than Friends](https://founderdeepak.gumroad.com/l/more-than-friends/READER20)** ($7)
* **[Book 05: Quiet Chemistry](https://founderdeepak.gumroad.com/l/quiet-chemistry/READER20)** ($7)
* **[Book 06: Beyond "You're Pretty"](https://founderdeepak.gumroad.com/l/beyond-youre-pretty/READER20)** ($7)
* **[Book 07: The Late-Night Texting Playbook](https://founderdeepak.gumroad.com/l/late-night-texting/READER20)** ($7)
* **[Book 08: The First Move Formula](https://founderdeepak.gumroad.com/l/first-move-formula/READER20)** ($7)
* **[Book 09: The Silent Attraction Blueprint](https://founderdeepak.gumroad.com/l/silent-attraction-blueprint/READER20)** ($7)
* **[Book 10: The Situationship Exit Plan](https://founderdeepak.gumroad.com/l/situationship-exit-plan/READER20)** ($7)

#### $9 Action Toolkit
* **[Book 11: The Date Night Masterplan](https://founderdeepak.gumroad.com/l/date-night-masterplan/READER20)** ($9)
* **[Book 12: The Ex Factor](https://founderdeepak.gumroad.com/l/the-ex-factor/READER20)** ($9)
* **[Book 13: The High-Value Boundary Playbook](https://founderdeepak.gumroad.com/l/high-value-boundary-playbook/READER20)** ($9)
* **[Book 14: The DM Attraction Protocol](https://founderdeepak.gumroad.com/l/dm-attraction-protocol/READER20)** ($9)
* **[Book 15: The Jealousy & Mixed Signals Antidote](https://founderdeepak.gumroad.com/l/jealousy-mixed-signals-antidote/READER20)** ($9)

#### $14 Relationship System
* **[Book 16: The Attachment Style Decoder](https://founderdeepak.gumroad.com/l/attachment-style-decoder/READER20)** ($14)
* **[Book 17: Modern Seduction & Magnetic Presence](https://founderdeepak.gumroad.com/l/modern-seduction-magnetic-presence/READER20)** ($14)
* **[Book 18: From First Date to Relationship in 60 Days](https://founderdeepak.gumroad.com/l/first-date-to-relationship-60-days/READER20)** ($14)
* **[Book 19: The Psychology of Making Them Miss You](https://founderdeepak.gumroad.com/l/psychology-of-making-them-miss-you/READER20)** ($14)
* **Book 20: The Conversation Mastery Manual ($14)** — *(You just finished this guide!)*

#### $19 Masterclass Bible
* **[Book 21: The Master Bible of Modern Romance](https://founderdeepak.gumroad.com/l/master-bible-modern-romance/READER20)** ($19)
* **[Book 22: The Emotional Intelligence & Charisma Bible](https://founderdeepak.gumroad.com/l/eq-charisma-bible/READER20)** ($19)
* **[Book 26: The Subconscious Attraction Trigger Matrix](https://founderdeepak.gumroad.com/l/subconscious-attraction-matrix/READER20)** ($19)

#### $24 Advanced Architecture
* **[Book 24: The Long-Term Relationship Mastery Manual](https://founderdeepak.gumroad.com/l/long-term-mastery-manual/READER20)** ($24)

#### $29 Flagship Opus
* **[Book 23: The Modern Romance Encyclopedia](https://founderdeepak.gumroad.com/l/romance-encyclopedia/READER20)** ($29)
* **[Book 25: The Breakup Recovery & Reinvention Blueprint](https://founderdeepak.gumroad.com/l/breakup-recovery-blueprint/READER20)** ($29)
`;

fs.writeFileSync(targetPath, body, 'utf8');
console.log('Book 20 completely fulfilled with all 200 questions!');

const fs = require('fs');
const path = require('path');

const booksDir = path.join(__dirname, 'ebooks');

const newPaidBooks = [
  // $29 Ebook (Book 23)
  {
    file: '23_the_modern_romance_encyclopedia.md',
    title: 'The Modern Romance Encyclopedia',
    subtitle: 'The Complete Lifetime Codex of Human Attraction, Behavioral Psychology, Flirting & Unbreakable Love',
    price: '$29.00',
    content: `## The Comprehensive Modern Dating Codex
This encyclopedia is the ultimate, all-encompassing master reference handbook for navigating modern romantic connections from the initial glance to a golden wedding anniversary.

### Volume I: The Neurochemical Engine of Desire
Attraction is governed by four distinct evolutionary neurochemicals:
1. **Dopamine (The Anticipation Spark)**: Why total predictability kills passion and how to create healthy intrigue.
2. **Norepinephrine (The Visceral Rush)**: The physiological surge of dilated pupils, butterflies, and elevated heart rate.
3. **Oxytocin (The Vulnerability Bond)**: The hormone of emotional safety, shared secrets, physical touch, and trust.
4. **Endorphins & Serotonin (The Peaceful Commitment)**: Transforming exciting infatuation into deep, lasting relational peace.

### Volume II: The Micro-Expression & Non-Verbal Code
The definitive guide to reading 50 subtle facial micro-tells, vocal inflection shifts, spatial proximity cues, and involuntary nervous system reactions.

### Volume III: The Digital Texting & Flirting Doctrine
The master taxonomy of digital communication: from high-converting opening hooks to witty teasing, deep midnight emotional disclosure, and graceful date transitions.

### Volume IV: The Situational Conflict & Attachment Compass
How to break free from the anxious-avoidant trap, set calm boundaries without guilt, disarm passive aggression, and resolve relational conflict with stoic maturity.

### Volume V: Lifelong Chemistry Maintenance
How to keep romantic passion and sexual desire electric after 5, 10, and 20 years together through intentional novelty, emotional presence, and mutual respect.`
  },

  // $24 Ebooks (Books 24 & 25)
  {
    file: '24_the_long_term_relationship_mastery_manual.md',
    title: 'The Long-Term Relationship Mastery Manual',
    subtitle: 'How to Keep Passion, Chemistry & Intimacy Alive After 1, 3, and 10 Years Together',
    price: '$24.00',
    content: `## The Myth of the "Natural" Happy Marriage
Couples who stay passionately in love for decades do not have "good luck"—they have intentional systems.

### Pillar 1: Combating the Familiarity Trap
The brain naturally stops releasing dopamine when a partner becomes 100% predictable. To reignite chemistry:
- **The Novelty Principle**: Doing new, slightly adrenaline-inducing activities together once a month (indoor rock climbing, weekend road trips to unfamiliar towns, learning a dance).
- **Maintaining Separate Worlds**: Healthy passion requires two complete individuals coming together, not two halves losing their identity.

### Pillar 2: The Gottman 5-to-1 Emotional Ratio
Dr. John Gottman discovered that lasting couples have at least 5 positive interactions for every 1 negative interaction.
- Small appreciations, morning kisses that last 6 seconds, and unexpected compliments maintain emotional liquidity in the relationship.

### Pillar 3: Conflict Without Destruction
How to fight cleanly: attack the problem, never the person's character. Eliminate the 4 Horsemen (Criticism, Contempt, Defensiveness, Stonewalling).`
  },
  {
    file: '25_the_breakup_recovery_and_reinvention_blueprint.md',
    title: 'The Breakup Recovery & Reinvention Blueprint',
    subtitle: 'The Neurological Roadmap to Heal Heartbreak in 45 Days, Rebuild Self-Worth & Attract Better Love',
    price: '$24.00',
    content: `## The Neurobiology of Heartbreak
A severe breakup activates the exact same brain regions as physical injury (the anterior cingulate cortex) and causes severe dopamine withdrawal identical to drug addiction.

### The 45-Day Protocol:
- **Days 1–10: The Dopamine Detox (Strict No-Contact)**: No texts, no checking their socials, no location tracking. Let the brain detoxify from the emotional addiction.
- **Days 11–25: Somatic Release & Emotional Catharsis**: Somatic breathwork, physical training, journaling the unprocessed grief, and auditing the relationship's genuine flaws (taking them off the pedestal).
- **Days 26–35: Rebuilding Personal Identity**: Rediscovering your abandoned passions, reconnecting with friends, upgrading your wardrobe, and re-establishing your physical vitality.
- **Days 36–45: The Sovereign Emergence**: Entering the state of detached peace where you realize that their departure was not your loss, but the clearing of space for someone who truly values you.`
  },

  // $19 Ebook (Book 26)
  {
    file: '26_the_subconscious_attraction_trigger_matrix.md',
    title: 'The Subconscious Attraction Trigger Matrix',
    subtitle: '50 Hidden Psychological Switches That Bypass Rational Skepticism and Evoke Primal Desire',
    price: '$19.00',
    content: `## The Architecture of Subconscious Desire
People do not fall in love through rational checklists. They fall in love through subconscious emotional triggers.

### 5 Core Matrix Modules:
1. **The Mirror Neuron Trigger**: Matching breathing cadence, vocal tempo, and physical postures to induce instant subconscious rapport.
2. **The Scarcity Hook**: Cultivating a thriving life that communicates high value, emotional self-sufficiency, and healthy independence.
3. **The Vulnerability Inversion**: Sharing a calibrated, genuine emotional struggle that triggers protective instincts and deep trust.
4. **The Sensory Scent Anchor**: How olfactory memory links emotional longing to specific fragrance profiles.
5. **The Unfinished Narrative (Zeigarnik Effect)**: Ending interactions on a high note, leaving them daydreaming about you until next time.`
  },

  // $5 Ebooks (Books 27 to 32)
  {
    file: '27_50_dating_app_opening_lines.md',
    title: 'The 50 Best Opening Lines for Any Dating App',
    subtitle: 'High-Converting Starters for Tinder, Hinge, Bumble & Threads',
    price: '$5.00',
    content: `## Kill the "Hey"
Standard greetings get ignored. High-converting opening lines do three things: (1) Spark curiosity, (2) Challenge playful banter, (3) Make replying frictionless.

### 10 Sample Lines from the 50:
1. *"Quick tiebreaker: my friend says X, I say Y. Please tell me you have good taste."*
2. *"I bet you five dollars you can’t describe your whole personality using only three emojis."*
3. *"Are you naturally this photogenic or did you take 400 photos for this profile?"*
4. *"Describe your ideal stress-free Sunday: couch and takeout or brunch and a hike?"*
5. *"Tell me the most chaotic thing that’s happened to you this month."*
6. *"Two truths and a lie, but you have to make the lie completely ridiculous."*
7. *"I saw your photo in [City/Spot]—tell me you tried the food there!"*
8. *"I had a productive evening planned until your profile distracted me."*
9. *"Rate your driving skills on a scale of 1 to 10 so I know if I need life insurance."*
10. *"If we were stuck in an elevator for two hours, what song would we sing?"*`
  },
  {
    file: '28_body_language_quick_check.md',
    title: 'The 30-Second Body Language Quick-Check',
    subtitle: 'The Pocket Cheat Sheet to Know If They Like You Right Now',
    price: '$5.00',
    content: `## The 30-Second Physical Scan
In any date or conversation, run this rapid physical audit:
- [ ] **Eyes**: Did their pupils flare? Do they glance down at your lips?
- [ ] **Feet**: Are their toes pointing straight toward you, even in a group?
- [ ] **Torso**: Have they removed barriers (bags, menus, pillows) from between you?
- [ ] **Voice**: Did their voice pitch drop and soften when addressing you?
- [ ] **Laughter**: Do they look at you first whenever anyone tells a joke?
- [ ] **Touch**: Did an accidental touch linger for more than half a second?

*If 4+ are checked, the green light is on.*`
  },
  {
    file: '29_red_flag_screening_checklist.md',
    title: 'The Red Flag Rapid-Screening Checklist',
    subtitle: 'Spotting Toxic, Emotionally Unavailable & Narcissistic Partners on Date 1',
    price: '$5.00',
    content: `## 10 Instant Red Flags on the First Date:
1. Treats the waiter, bartender, or driver with condescension or impatience.
2. Talks about their ex constantly (even to say how 'crazy' all their exes were).
3. Interrupts your stories repeatedly to pivot the spotlight back to their achievements.
4. Love-bombs you immediately (*"You're my soulmate"*) before knowing your last name.
5. Crosses simple boundaries (pressures you to drink more or stay out late after you said no).
6. Never asks a single genuine question about your life, values, or dreams.
7. Complains bitterly about the world and plays the victim in every past conflict.
8. Hides their phone face down and jumps nervously when notifications arrive.
9. Displays intense road rage or explosive anger over minor inconveniences.
10. Your gut nervous system feels tense, anxious, and guarded around them.`
  },
  {
    file: '30_green_flag_locator.md',
    title: 'The Green Flag Locator',
    subtitle: 'The 15 Rare Signs of an Emotionally Mature & High-Value Partner',
    price: '$5.00',
    content: `## 10 Rare Green Flags to Celebrate:
1. Words consistently match their actions; zero flaky excuses.
2. Can apologize sincerely without getting defensive or flipping the blame.
3. Gives you their undivided attention without checking their phone.
4. Has long-term friendships and speaks with kindness about past relationships.
5. Respects your boundaries with calm grace and zero guilt-tripping.
6. Makes you feel completely safe, calm, and grounded in your body.
7. Celebrates your wins and career ambitions without a shred of jealousy.
8. Communicates their feelings directly instead of playing passive-aggressive games.
9. Shows genuine empathy for vulnerable people, children, and animals.
10. Has their own passions, goals, and emotional stability.`
  },
  {
    file: '31_30_emergency_texts_silent_conversation.md',
    title: '30 Emergency Texts When a Conversation Goes Silent',
    subtitle: 'How to Revive Dead Chats Without Looking Desperate or Annoying',
    price: '$5.00',
    content: `## The Art of the Conversation Revival
When someone goes silent for 3 days, never ask *"Why didn't you text me?"* Instead, send a zero-pressure reset:

1. *"Did you get lost in an IKEA or did you just forget how to text back?"*
2. *"Proof of life required: send a photo of your coffee or a thumbs up."*
3. *"I was going to save this juicy story for tomorrow, but your lack of curiosity is deeply offensive."*
4. *"I just survived the most chaotic meeting of my life and had to tell someone who would understand."*
5. *"Look who decided to grace the world with their presence!"*
6. *"I’m drafting your missing persons report right now. Any final requests?"*
7. *"I saw this ridiculous meme and immediately thought of you."*
8. *"I forgive you for disappearing, but it’s going to cost you one chocolate croissant."*
9. *"Welcome back to civilization. What did I miss?"*
10. *"I knew you couldn’t stay away from me for too long."*`
  },
  {
    file: '32_morning_after_and_post_date_etiquette.md',
    title: 'The Morning After & Post-Date Etiquette Guide',
    subtitle: 'What to Say, When to Text & How to Lock in Date Two Smoothly',
    price: '$5.00',
    content: `## The Post-Date Protocol
Stop waiting 3 days to text. High-value dating is intentional, warm, and confident.

### The Same-Night Follow-Up (Within 60 Minutes of Leaving):
*"I had such a great time with you tonight. That Italian spot was amazing. Get home safe!"*

### The Next-Day Anchor (Mid-Afternoon):
*"Still smiling about that story you told last night. Hope your Tuesday is treating you well!"*

### Locking in Date Two (Day 2 or 3):
*"I’m going to that rooftop market/exhibit this Saturday. You should join me. What's your weekend looking like?"*`
  }
];

newPaidBooks.forEach(b => {
  const filePath = path.join(booksDir, b.file);
  const fullContent = `# ${b.title}\n### ${b.subtitle}\n**By Deepak Ravi (@founderdeepak)**\n**Price Tier:** ${b.price}\n\n---\n\n${b.content}`;
  fs.writeFileSync(filePath, fullContent, 'utf8');
  console.log(`Created new paid book: ${b.file} (${b.price})`);
});

console.log('All 10 new paid books created successfully!');

const fs = require('fs');
const path = require('path');

const booksDir = path.join(__dirname, 'ebooks');

// Book 27: The 50 Best Opening Lines for Any Dating App
const b27 = `# The 50 Best Opening Lines for Any Dating App
### High-Converting Starters for Tinder, Hinge, Bumble, Instagram & Threads
**By Deepak Ravi (@founderdeepak)**
**Price Tier:** $5.00

---

## The Death of the "Hey"

If you open a dating app conversation with *"Hey"*, *"Hi"*, *"How are you?"*, or an emoji, you have already lost. 

An attractive person on a dating app receives dozens of notifications every day. A generic greeting puts 100% of the cognitive burden on them to carry the conversation. It communicates laziness, low confidence, and a lack of original personality.

A high-converting opening line must achieve three psychological objectives in under 5 seconds:
1. **Interrupt their cognitive scroll**: Break the trance of mindless swiping with humor, curiosity, or playful friction.
2. **Make replying effortless**: Give them an easy, fun conversational hook they can answer in 10 seconds.
3. **Establish equal social status**: Never pedestalize them or compliment their appearance right away. Treat them like a fun acquaintance, not a celebrity.

Here are **50 battle-tested opening lines**, categorized by dynamic, complete with the psychological mechanics of why they work and how to follow up.

---

## Category 1: The Witty Debate & Tiebreaker Openers (1–10)
*People love sharing opinions and defending their tastes. These openers create immediate playful friction.*

1. *"Quick tiebreaker needed from a neutral third party: is it acceptable to put pineapple on pizza, or should that be classified as a felony?"*  
   - *Why it works:* Zero risk, universally understood, immediately polarizes into playful debate.
2. *"I need your honest verdict: my friend says Sunday brunch is overrated, I say it's sacred. Please tell me you’re on the right side of history."*
3. *"Important philosophical question: are you the type of person who arrives at the airport 3 hours early, or sprinting through TSA as the gate closes?"*
4. *"Let’s settle this once and for all: iced coffee in freezing winter weather—psychopathic behavior or elite mindset?"*
5. *"Two truths and a lie, but you have to make the lie completely absurd so I don’t embarrass myself guessing."*
6. *"Rate your driving skills on a scale from 'professional chauffeur' to 'needs a helmet just walking to the car'."*
7. *"I bet you five dollars you can’t describe your whole personality using only three emojis."*
8. *"If you could erase one song from human history so nobody ever has to hear it again, what are we banning?"*
9. *"Tell me the truth: do you unpack your suitcase the second you get home from a trip, or does it live on your floor for two weeks?"*
10. *"Rank these three in order of life importance: good coffee, late-night tacos, or 8 hours of uninterrupted sleep."*

---

## Category 2: Observation & Bio-Specific Openers (11–20)
*These prove you actually read their profile rather than mass-copy-pasting.*

11. *"I saw your travel photo in [City]—tell me you didn't leave without trying the street food in [Neighborhood]."*
12. *"Your dog in photo 3 looks like they have a lot of opinions about your life choices."*
13. *"You had me until I saw you like [Band/Show/Food]. We might have to fight about this on our first date."*
14. *"I see you're into [Hobby/Sport]. Please tell me you don't take it so seriously that you'll laugh at me trying it."*
15. *"Your bio says you love [Book/Author]. That book completely rewired my brain last year. What was your favorite chapter?"*
16. *"That hiking view in your second photo is unbelievable. Did you hike the full trail or take the cable car? Be honest."*
17. *"You look suspiciously competitive in that board game/sport photo. What’s your win-to-loss ratio?"*
18. *"I’m diagnosing your playlist based on photo 4: either indie melancholy or 90s hip-hop. How close am I?"*
19. *"Your coffee order in your prompt is dangerously specific. Are you an aspiring barista or just passionate about caffeine?"*
20. *"I have to respect anyone who lists [Obscure interest] in their bio. How did you get obsessed with that?"*

---

## Category 3: Playful Teasing & Bold Curiosity (21–35)

21. *"I had a very productive evening planned until your profile popped up and ruined my concentration."*
22. *"Are you naturally this photogenic, or did your best friend take 400 photos while giving you directorial commands?"*
23. *"I’m taking a poll: what’s the most chaotic purchase you’ve made in the last six months that you have zero regrets about?"*
24. *"You look like someone who is either a terrible influence or the most fun person in the room. Which one am I dealing with?"*
25. *"Tell me something you're secretly proud of that sounds completely ridiculous on a resume."*
26. *"If we were trapped in an elevator for three hours, what song are we singing at the top of our lungs to pass the time?"*
27. *"I'm going to guess your coffee order based purely on your energy in photo 1: oat milk iced latte with extra espresso. Am I a psychic?"*
28. *"What’s the worst date you’ve ever been on? I promise to make sure our first one is at least 50% better."*
29. *"You have a mischievous smile in your main photo. What trouble are you currently plotting?"*
30. *"If you were forced to compete in any reality TV show, which one are you winning and why?"*
31. *"I dare you to tell me the weirdest food combination that you swear actually tastes amazing."*
32. *"Describe your ideal Sunday: complete couch hibernation with takeout, or an 8:00 AM farmer's market adventure?"*
33. *"I’m curating a road trip playlist. Send me one song that is non-negotiable."*
34. *"I feel like you’re either an absolute angel or you roast your friends mercilessly. Tell me the truth."*
35. *"What’s a hill you are completely prepared to die on, no matter how unpopular the opinion is?"*

---

## Category 4: The Smooth Date Setup Hooks (36–50)

36. *"I’m running a quality-control test on the best dessert spots downtown this Thursday. Want to be my co-judge?"*
37. *"Texting on this app feels like passing notes in middle school. Let’s grab coffee this week and see if your banter matches in person."*
38. *"I have a craving for authentic tacos and good company. What’s your schedule looking like Wednesday night?"*
39. *"I’m checking out that new art exhibit / rooftop spot on Saturday. It would be a crime to go alone—come with me."*
40. *"Let’s make a deal: you pick the neighborhood, I’ll pick the drinks spot. Deal?"*
41. *"I’ll bet you dinner this Friday that you can't beat me at trivia/air hockey."*
42. *"My week opens up Thursday evening. Let’s do something fun—drinks or dessert?"*
43. *"You have 20 minutes to convince me not to take you out for an espresso martini this weekend."*
44. *"I’m boycotting small talk. Tell me your favorite hidden gem restaurant in the city and let’s go there."*
45. *"I have two rules for a first date: good music and zero resume talk. If you agree, drinks this Friday are on me."*
46. *"You seem entirely too interesting to stay trapped in my inbox. What's your number?"*
47. *"Are you free this weekend or am I going to have to make an official appointment with your assistant?"*
48. *"I need an excuse to take a break from my laptop tomorrow around 3 PM. Coffee run?"*
49. *"I’ll make you a promise: if the date is terrible, you can leave after 20 minutes with zero hard feelings. Friday at 7?"*
50. *"Let's skip the 3-week text marathon and grab a drink tomorrow night. You in?"*

---

## The Follow-Up Protocol: What to Do After They Reply
1. **Never send a one-word reply.** If they answer your pineapple pizza question with *"Haha definitely crime!"*, don't just say *"Same lol."* Say: *"Thank God, I was about to unmatch. What other controversial food takes are you hiding?"*
2. **Move off the app within 10 to 15 messages.** A dating app is a showroom, not a living room. Once banter is established, transition smoothly to phone number or Instagram.
3. **Always end with a forward step.** Don't let questions drift into dead ends; turn mutual laughter into a date plan.`;

// Book 28: The 30-Second Body Language Quick-Check
const b28 = `# The 30-Second Body Language Quick-Check
### The Pocket Diagnostic Guide to Decode Real-Time Attraction, Discomfort & Romantic Green Lights
**By Deepak Ravi (@founderdeepak)**
**Price Tier:** $5.00

---

## The Biological Reality of Attraction

Humans communicate across two channels simultaneously:
1. **The Verbal Channel**: Controlled by the conscious mind. It can lie, flatter, conceal, and play games.
2. **The Non-Verbal Channel**: Governed by the autonomic nervous system. It reacts to heart rate, pupil dilation, adrenaline, and blood flow. It cannot lie.

When you are sitting across from someone in a cafe, standing beside them in a bar, or walking through a park, you do not need to guess what they feel. You only need to run the **30-Second 6-Zone Diagnostic**.

This quick-check guide gives you the exact biological cues across all six physical zones, how to score the interaction, and how to respond in real time.

---

## Zone 1: The Ocular Indicators (Eyes & Gaze)
*Time to scan: 5 seconds*

- [ ] **The Pupil Flare**: When the human eye observes someone it finds sexually or romantically desirable, the sympathetic nervous system dilates the pupils by 15% to 20% to absorb more light and detail. Look for deep, dark pupils even in well-lit rooms.
- [ ] **The Eye-to-Lip Triangle**: Their gaze drops from your left eye, to your right eye, down to your mouth, and lingers there for a second. This is the universal subconscious reflex for kissing.
- [ ] **The Look-Down Smile**: They meet your eyes, smile shyly, and look downward toward their lap or hands. (Looking away sideways communicates boredom; looking down with a smile communicates sweet attraction).
- [ ] **The Blink Rate Acceleration**: A normal resting blink rate is 15–20 blinks per minute. In the presence of someone who induces romantic butterflies, the blink rate jumps to 35–45 blinks per minute.

---

## Zone 2: The Facial & Vocal Micro-Cues
*Time to scan: 5 seconds*

- [ ] **The Voice Shift (The Velvet Drop)**: Men subconsciously lower their vocal frequency by 10–15 Hz to sound deeper and more protective; women subconsciously introduce a soft, breathy cadence or slightly higher playful pitch.
- [ ] **The Throat Swallow**: A sudden dry throat caused by an adrenaline spike triggers an involuntary swallow or gentle clearing of the throat right before speaking.
- [ ] **The Suppressed Smile**: The corners of their lips twitch upward, and they press their lips together to hide how much they are enjoying your presence.
- [ ] **Facial Coloration**: A mild rosy flush across the cheeks, bridge of the nose, or collarbone due to peripheral capillary vasodilation.

---

## Zone 3: Upper Torso & Barrier Removal
*Time to scan: 5 seconds*

- [ ] **The Barrier Removal Reflex**: Watch what they do with their physical belongings. Uninterested people place barriers between you (purses, laptops, water bottles, bulky menus). Attracted people push objects aside to clear a direct physical path.
- [ ] **The Chest Orientation**: Their torso remains squared toward you rather than angled toward the room exit.
- [ ] **Self-Preening Touches**: Brushing hair behind the ear, adjusting a necklace, smoothing down a collar, or checking their watch/phone reflection.
- [ ] **The Deep Exhale**: Sitting back and letting out a long, relaxed breath. It signals that their nervous system has transitioned from guarded anxiety into deep comfort.

---

## Zone 4: Hands, Touch & Object Interaction
*Time to scan: 5 seconds*

- [ ] **Fidgeting with Stemware/Objects**: Tracing the rim of their wine glass, peeling the label off a beer bottle, or twirling a ring. It is the body burning off excess nervous adrenaline.
- [ ] **The Lingering Touch**: When passing a salt shaker, menu, or reaching for an appetizer, physical contact between your fingers lasts a beat longer than necessary.
- [ ] **Open Palm Displays**: Resting their hands on the table with palms facing upward or open toward you, an ancient evolutionary cue of trust and surrender.
- [ ] **Accidental Bumping**: Their shoulder, knee, or forearm brushes against yours, and they do not immediately jerk away or apologize.

---

## Zone 5: Lower Body & The Compass Rule (Feet & Knees)
*Time to scan: 5 seconds*

- [ ] **The Compass Rule**: The feet are the most honest part of the human body because we rarely monitor them consciously. Even if their torso is turned to speak to a waiter or friend, if their toes are pointing directly at you, you have their primary emotional interest.
- [ ] **Knee Cross Direction**: If their legs are crossed, does the top knee point toward you (open, receptive) or away from you (closed, guarded)?
- [ ] **Foot Bouncing**: Tapping their foot rapidly under the table—another release valve for excited nervous tension.

---

## Zone 6: Spatial Proximity & The Gravity Effect
*Time to scan: 5 seconds*

- [ ] **The Proximity Creep**: Over the course of the date, the physical gap between your chairs or bodies shrinks naturally without either of you announcing it.
- [ ] **Mirroring Cadence**: You take a sip of water; 5 seconds later they take a sip. You lean back; 5 seconds later they lean back. Their mirror neurons are firing in sync with yours.
- [ ] **The Doorstep Hover**: When the date concludes, their feet stay planted on the pavement instead of immediately pivoting toward their car or building.

---

## The 30-Second Scoring Matrix

Count how many boxes you checked across all 6 zones:
* **0 – 3 Checks**: **Low/Neutral Interest.** They are polite, but emotional/physical attraction has not sparked. Keep things light, do not push physical escalation, and observe.
* **4 – 7 Checks**: **Active Warm Attraction.** Chemistry is simmering. They feel comfortable and curious. Break the touch barrier gently (touch their forearm when laughing).
* **8+ Checks**: **High Romantic Tension & Desire.** Their autonomic nervous system is screaming that they want you. You have full green lights to escalate: hold their hand, lean in close, or move in for the kiss.`;

// Book 29: The Red Flag Rapid-Screening Checklist
const b29 = `# The Red Flag Rapid-Screening Checklist
### Spotting Toxic, Emotionally Unavailable, Narcissistic & Manipulative Partners in the First 3 Dates
**By Deepak Ravi (@founderdeepak)**
**Price Tier:** $5.00

---

## The High Cost of Overlooking Red Flags

The greatest mistake people make in modern dating is **falling in love with potential instead of reality**.

When you like someone's looks, humor, or charm, your brain releases dopamine and oxytocin. These chemicals physically impair your prefrontal cortex—the part of your brain responsible for critical judgment and risk assessment. You make excuses for bad behavior:
- *"They’re just busy with work."*
- *"They’ve had a really hard past."*
- *"I’m sure they’ll open up once they trust me."*

Six months later, you find yourself trapped in an emotionally draining, toxic situationship that leaves your self-esteem in ruins.

A high-value dater does not wait six months to find out who someone is. **A high-value dater screens relentlessly in the first 3 dates.**

Here are the **25 critical red flags**, categorized by psychological archetype, along with the immediate response protocol.

---

## Archetype 1: The Emotional Predator (Narcissistic & Love-Bombing Tells)

1. **Premature Soulmate Proclamations (Love-Bombing)**: Declaring on Date 2 that you are *"the love of their life,"* *"unlike anyone they've ever met,"* or talking about marriage and vacations 6 months away before knowing your last name. Real intimacy takes time to build; artificial intensity is manipulation.
2. **The "All My Exes Are Crazy" Narrative**: Every single former partner was toxic, unhinged, or abusive, and they were always the innocent victim. If someone has ten exes and all ten were "crazy," the common denominator is them.
3. **The Pity Play / Rapid Trauma Dump**: Sharing their deepest, darkest childhood trauma or past heartbreak within the first 45 minutes of meeting you. This is done to manufacture unearned intimacy and test if you have weak, caretaker boundaries.
4. **Extreme Jealousy Disguised as "Protectiveness"**: Questioning who you are texting, making passive-aggressive comments about what you wear, or acting possessive on Date 1.
5. **The Disappearing / Reappearing Act**: Intense attention for three days, followed by total silence for four days without explanation.

---

## Archetype 2: The Covert Disrespect Tells (Character & Values)

6. **Condescension to Service Staff**: Speaking rudely to waiters, bartenders, valets, or uber drivers. How someone treats people who can do nothing for them is an exact mirror of how they will treat you once the honeymoon phase ends.
7. **Chronic Lateness with Zero Communication**: Showing up 30 minutes late without a text or apology. It communicates that their time is valuable and yours is disposable.
8. **Constant Phone Fixation**: Leaving their phone face up on the table, checking notifications mid-story, or texting other people while you are speaking.
9. **Boundary Steamrolling**: You say, *"I need to head home by 10:00 PM because of an early meeting,"* and they repeatedly guilt-trip or pressure you to stay out. Anyone who disrespects small boundaries will violate major ones later.
10. **The Conversational Monopoly**: Talking for 40 minutes straight about their job, car, gym, and accolades without asking you a single question about your life.

---

## Archetype 3: The Emotionally Unavailable & Avoidant Tells

11. **The "I'm Not Good for Anyone" Warning**: When someone tells you: *"I'm really messed up right now,"* or *"I tend to break hearts,"* or *"I'm not looking for anything serious"*—**BELIEVE THEM THE FIRST TIME.** They are giving you a disclaimer so that when they hurt you later, they can say, *"I told you who I was."*
12. **Bedroom Bubble Only**: They only text after 9:30 PM, invite you straight to their apartment, and avoid public daytime dates.
13. **Allergies to Labels**: Rolling their eyes or becoming visibly irritated whenever the topic of commitment, future plans, or relationship definitions arises.
14. **The Hot-and-Cold Whiplash**: Super affectionate in private, but acting distant, cold, or embarrassed to hold your hand in front of friends or coworkers.
15. **Hiding Their Phone**: Flipping their phone over abruptly or tilting their screen away whenever you sit beside them.

---

## Archetype 4: Emotional Immaturity & Chaos

16. **Explosive Road Rage or Impatience**: Losing their temper violently over traffic, a delayed food order, or minor inconveniences. Poor emotional regulation in traffic equals poor emotional regulation in conflict.
17. **Refusal to Apologize (The Blame Flip)**: If you express a hurt feeling, they immediately turn it around on you: *"Well, if you didn't act like that, I wouldn't have said it!"*
18. **Excessive Alcohol or Substance Dependence**: Needing three cocktails just to sit through a date or speak to you without social anxiety.
19. **Financial Entitlement or Cheapness**: Expecting expensive dinners without offering to tip, or throwing a fit over splitting a \$5 coffee.
20. **Gossiping Maliciously About Close Friends**: If they tear down their best friends the moment they leave the room, they are doing the exact same thing to you when you aren't around.

---

## Archetype 5: Somatic & Gut-Check Tells

21. **The Post-Date Exhaustion**: Leaving a date feeling drained, anxious, confused, or physically sick rather than energized and peaceful.
22. **The "Walking on Eggshells" Sensation**: Feeling like you have to filter your words and laugh carefully to avoid offending their fragile ego.
23. **Inconsistency Between Words and Actions**: Promising the world over text, but failing to follow through on simple, low-stakes commitments.
24. **Excessive Flirting with Others in Front of You**: Checking out the bartender or flirting with others at the table to manufacture jealousy.
25. **The Gut Alarm**: That quiet, persistent whisper in your chest that says: *"Something about this person does not feel safe."* Never ignore your intuition.

---

## The Immediate Action Protocol
If you observe **1 minor red flag**, observe and set a clear boundary.  
If you observe **2 or more major red flags in the first 3 dates**:
- Do not attempt to "fix," "heal," or "counsel" them.
- Do not have an emotional debate.
- Send the **Graceful Exit Script**:  
  > *"I’ve enjoyed getting to know you, but I don't feel like our values and relationship goals align. I wish you the best!"*
- Block/unmatch, protect your peace, and move forward.`;

// Book 30: The Green Flag Locator
const b30 = `# The Green Flag Locator
### The 25 Rare Signs of an Emotionally Mature, Secure & High-Value Romantic Partner
**By Deepak Ravi (@founderdeepak)**
**Price Tier:** $5.00

---

## Moving Beyond Trauma & Recognizing True Health

When you have spent years navigating modern dating culture—ghosting, mixed signals, situationships, and emotional unavailability—healthy behavior can actually feel strange at first.

Many people mistake **anxiety for chemistry** and **stability for boredom**. When an emotionally mature person communicates clearly, shows up on time, and respects boundaries, anxious daters sometimes think: *"Where are the butterflies?"*

The butterflies you felt in toxic dynamics weren't butterflies—they were adrenaline and cortisol reacting to unpredictability.

**Real love feels like peace, safety, clarity, and steady warmth.**

This locator gives you the **25 rare green flags** that prove you are dealing with a person of high character, emotional maturity, and lifelong partnership material.

---

## Category 1: Emotional Consistency & Communication (1–8)

1. **Words Match Actions Flawlessly**: If they say, *"I'll call you Thursday at 7:00 PM,"* your phone rings at 7:00 PM. No excuses, no vanishing acts.
2. **Direct, Game-Free Communication**: If they like you, they say it. They don't wait 4 hours to reply to a text just to appear busy. They communicate with refreshing, calm transparency.
3. **The Sincere, Non-Defensive Apology**: When a misunderstanding happens, they don't blame-shift. They say: *"I didn't realize that made you feel that way. I'm sorry, and I'll make sure it doesn't happen again."*
4. **They Check In During Stress**: If they know you had a brutal presentation, an exam, or a doctor's appointment, you get a warm text: *"Thinking of you today! Hope it went smoothly."*
5. **They Listen to Understand, Not to Perform**: They remember small details you shared on Date 1 (your sister's name, your coffee order, your childhood dream) and bring them up naturally weeks later.
6. **Comfort with Emotional Pace**: They don't love-bomb you on Day 3, nor do they run away on Day 30. They allow the connection to unfold naturally with steady, grounded presence.
7. **They Clarify Tone Proactively**: If a text could sound cold, they add context: *"Sorry if that sounded blunt, was rushing between meetings! Talk soon."*
8. **They Express Appreciation Regularly**: Thanking you for small things—planning a date, picking up dessert, or simply being great company.

---

## Category 2: Respect, Boundaries & Conflict Resolution (9–16)

9. **Graceful Acceptance of "No"**: If you say, *"I'm exhausted tonight and need to stay home,"* they reply: *"Totally understand! Get some great rest and let’s catch up tomorrow."* (Zero guilt-tripping, zero pouting).
10. **They Fight the Problem, Never Your Character**: During disagreements, they never insult your intelligence, mock your insecurities, or yell. They focus on finding a solution as teammates.
11. **They Speak with Respect About Exes**: Even if a past relationship ended badly, they speak with mature perspective: *"We wanted different things and grew apart, but I wish them the best."*
12. **High Integrity When Nobody Is Watching**: They treat service staff, cashiers, and drivers with genuine warmth, patience, and generosity.
13. **They Have Long-Term Friendships**: Having close friendships that span 5, 10, or 15 years proves they possess the capacity for loyalty, conflict repair, and mutual care.
14. **Zero Flirtation with Others in Your Presence**: When they are with you, you have their complete, respectful attention.
15. **They Never Make You Feel Crazy for Having Feelings**: If you share an insecurity, they validate it: *"I hear you, and I want to make sure you feel completely secure with me."*
16. **They Value Your Independence**: They celebrate you spending time with your friends, hobbies, and family without feeling threatened.

---

## Category 3: Ambition, Life Balance & Emotional Health (17–25)

17. **They Have Their Own Purpose**: They have career goals, creative passions, and fitness disciplines outside of dating. They want a partner to share their life with, not a distraction to fill an empty void.
18. **They Celebrate Your Wins Sincerly**: When you get a promotion, hit a personal goal, or win an award, their eyes light up with genuine pride. Zero jealousy or competition.
19. **They Are Emotionally Regulated Under Stress**: When flights get canceled, tires go flat, or plans change, they stay calm and focus on solutions rather than having a tantrum.
20. **They Introduce You with Pride**: Introducing you to their friends, siblings, and colleagues with a smile that says: *"I'm so proud to be standing next to this person."*
21. **They Are Financially Responsible**: They live within their means, manage their commitments, and have a mature relationship with money.
22. **They Take Care of Their Health and Space**: A clean apartment, good personal hygiene, and self-respect in how they care for their body and mind.
23. **They Make Time When They Are Busy**: Even during 70-hour work weeks, they find 15 minutes to call or send a thoughtful voice note. People make time for what matters.
24. **They Are Comfortable Being Vulnerable**: They don't hide behind a toxic machismo or emotional ice wall. They can tell you when they are sad, scared, or touched.
25. **Your Nervous System Feels Safe**: The ultimate green flag: being around them makes your body feel calm, relaxed, and deeply at home.

---

## How to Reciprocate Green Flags
When you find someone who shows you these green flags:
- **Do not pull back out of fear.** Notice if your instinct is to run because healthy love feels unfamiliar.
- **Reward their consistency with your own consistency.** Be honest, show appreciation, and let yourself be loved with peace.`;

// Book 31: 30 Emergency Texts When a Conversation Goes Silent
const b31 = `# 30 Emergency Texts When a Conversation Goes Silent
### How to Revive Dead Chats, Disarm Ghosting & Spark Immediate Curiosity (Without Looking Desperate)
**By Deepak Ravi (@founderdeepak)**
**Price Tier:** $5.00

---

## The Panic of the Dying Conversation

We have all experienced the digital stomach-drop:
You had an amazing date or an electric text exchange for three days... and then silence.
- 12 hours pass.
- 24 hours pass.
- 3 days pass.

Your brain goes into catastrophic overdrive. You draft twenty different text messages in your notes app:
- *"Did I do something wrong?"* (Smells like insecurity).
- *"Hey, are you alive?"* (Passive-aggressive).
- Sending an angry paragraph demanding an explanation (Total loss of power).

If a conversation goes silent, **never ask why they didn't reply.**  
Asking why they disappeared creates shame, awkwardness, and pressure. Instead, you need a **clean conversational reset**—a message so low-pressure, playful, or intriguing that replying takes zero effort.

Here are **30 battle-tested emergency revival texts**, categorized by the duration of the silence.

---

## Category 1: The 24-to-48 Hour Reset (When the chat stalled mid-stream)

*Use these when you were talking actively and they suddenly left you on read for 1–2 days.*

1. *"I was going to save this juicy story for tomorrow, but your lack of curiosity is deeply offensive."*
2. *"Did you get lost in an IKEA or did you just forget how to text back?"*
3. *"Proof of life required: send a photo of your coffee or a thumbs up."*
4. *"I see how it is. You get busy for five minutes and forget all about the little people."*
5. *"I just survived the most chaotic meeting of my life and had to tell someone who would understand."*
6. *"Look who decided to grace the world with their presence!"* (Send when they finally pop back up).
7. *"I saw this ridiculous meme and immediately knew nobody else would understand the humor like you."*
8. *"I forgive you for disappearing, but it’s going to cost you one chocolate croissant."*
9. *"Welcome back to civilization. What did I miss?"*
10. *"I knew you couldn’t stay away from me for too long."*

---

## Category 2: The 5-to-7 Day Re-Engagement (The Clean Slate)

*Do not reference the week-long silence. Act completely unbothered and open a brand-new, high-intrigue loop.*

11. *"I just walked past that bakery/restaurant we talked about. The temptation was overwhelming."*
12. *"I have a quick dilemma and only you have the specific wisdom to solve it. Are you around?"*
13. *"I heard that song you recommended the other day. Okay fine, I admit it: you were 100% right."*
14. *"I’m not saying you ghosted, but I was about to hire a private investigator to track you down."*
15. *"Are you surviving your week, or is the week currently winning?"*
16. *"I just witnessed the funniest thing at the grocery store and immediately thought of you."*
17. *"Quick question: what was the name of that show/movie you said I had to watch?"*
18. *"Tell me one good thing that happened to you this week so I know you're doing well."*
19. *"I’m taking notes on how you managed to disappear into thin air like a ninja."*
20. *"I'm drafting your missing persons report right now. Any final requests before I file it?"*

---

## Category 3: The 3-to-4 Week "Hail Mary" Revivals

*When a month has passed and you want to test if there's still a spark without begging.*

21. *"Saw something today that screamed your name and immediately started laughing. Hope life is treating you great!"*
22. *"I know it’s been a minute, but I just tried that coffee spot you mentioned. You didn't hype it up enough."*
23. *"Random memory: remember that ridiculous conversation we had about [Topic]? Still makes me laugh."*
24. *"Happy birthday! I hope this year brings you everything you’ve been working so hard for."* (Send only on their actual birthday).
25. *"Congratulations on [Recent Milestone/Job Change]! Saw the update and wanted to send some love."*
26. *"My friend just asked for recommendations in your neighborhood and your name immediately popped up. Hope you're thriving!"*
27. *"I had a dream that you owed me a coffee. I'm just here to collect on debts."*
28. *"Are you still in [City] or did you run away to start a new life as a farmer?"*
29. *"I was curating a playlist and that artist you introduced me to came on. Hope you're doing well, stranger."*
30. *"Life has been crazy, but I was thinking about you today and wanted to say hi."*

---

## The Golden Law of Emergency Texting:
**You get ONE emergency revival text.**  
If you send one of these messages and they still ignore it or give a dry, 1-word answer: **DO NOT SEND A SECOND ONE.**  
Silence is your answer. Delete the thread, protect your dignity, and make room for someone who is excited to talk to you.`;

// Book 32: The Morning After & Post-Date Etiquette Guide
const b32 = `# The Morning After & Post-Date Etiquette Guide
### What to Say, When to Text & How to Lock in Date Two Smoothly Without Playing Games
**By Deepak Ravi (@founderdeepak)**
**Price Tier:** $5.00

---

## The Post-Date Anxiety Epidemic

The date went amazingly well. You laughed, shared stories, touched hands across the table, and maybe shared a great goodnight kiss. 

Then you wake up the next morning and the overthinking begins:
- *When should I text? Do I wait 3 days like in the old movies?*
- *Should I wait for them to text me first so I don’t look too eager?*
- *What if they were just being polite and actually hated the date?*
- *If we spent the night together, how do I exit without making it awkward?*

The "Three-Day Rule" is dead. In the modern dating era, waiting three days does not make you look mysterious—it makes you look flaky, uninterested, or emotionally unavailable.

High-value dating is defined by **intentional warmth and effortless confidence**.

This guide gives you the exact timeline, copy-paste scripts, and etiquette protocols for the morning after and locking in Date Two.

---

## Protocol 1: The Same-Night Follow-Up (Within 60 Minutes of Parting)

If you had a great date, **confirm your safety and gratitude immediately**. It relieves tension and signals emotional maturity.

### The Same-Night Texts (Choose One):
1. *"I had such a great time with you tonight. That Italian spot was amazing. Get home safe!"*
2. *"Thank you for the drinks and the laughs tonight. You are even funnier in person than over text. Sleep well!"*
3. *"Made it home! Just wanted to say tonight was wonderful. Rest easy."*
4. *"I’m still smiling from that story you told. Thanks for an incredible evening!"*

*Notice: No pressure, no demands for Date Two yet. Just pure, warm validation.*

---

## Protocol 2: The Morning-After Anchor (Next Day: 11:00 AM – 2:00 PM)

The morning after sets the tone for future momentum. Keep it light, casual, and grounded.

### If You Didn't Spend the Night:
5. *"Morning! Hope your coffee is strong and your day is treating you well after our late night."*
6. *"Still laughing about your driving confession from last night. Have a great day at work!"*
7. *"Morning! Just wanted to drop in and wish you luck on that meeting you mentioned."*

### If You Spent the Night Together (The Morning-After In-Person Etiquette):
- **Make coffee or offer water**: Simple hospitality removes morning vulnerability.
- **Do not linger for 6 hours awkwardly**: Have a clear, natural departure plan by 10:00 or 11:00 AM: *"I have to run an errand / hit the gym around 11:00, but let's grab a quick bagel before I head out."*
- **The Follow-Up Afternoon Text**:  
  *"I loved waking up next to you today. Hope the rest of your Sunday is super relaxing."*

---

## Protocol 3: Locking in Date Two (Day 2 or 3)

Never ask: *"Do you want to hang out again sometime?"* (Vague, puts the planning burden on them).  
Use the **Contextual Invitation Framework**:

8. *"You mentioned you’ve never tried Korean BBQ. There’s an amazing spot downtown—let’s go this Thursday at 7:30 PM. You in?"*
9. *"I’m checking out that new art exhibit / rooftop on Saturday afternoon. Come with me—I think you’d love it."*
10. *"I promised you a rematch at mini-golf / trivia. Let’s do drinks and games this Friday. What’s your schedule looking like?"*

---

## Protocol 4: What If the Date Was Bad? (The Graceful Decline)

Never ghost someone after a real in-person date. Ghosting is emotional cowardice. Send the **Kind & Clear Closure Script**:

> *"Hey [Name]! Thank you so much for taking the time to meet up last night. I really enjoyed talking with you, but I didn't feel the romantic spark between us. I wanted to be honest with you rather than leave you hanging. I wish you the absolute best out there!"*

They will respect your honesty, you preserve your integrity, and you close the loop cleanly.`;

// Write the expanded files
const files = [
  { name: '27_50_dating_app_opening_lines.md', content: b27 },
  { name: '28_body_language_quick_check.md', content: b28 },
  { name: '29_red_flag_screening_checklist.md', content: b29 },
  { name: '30_green_flag_locator.md', content: b30 },
  { name: '31_30_emergency_texts_silent_conversation.md', content: b31 },
  { name: '32_morning_after_and_post_date_etiquette.md', content: b32 }
];

files.forEach(f => {
  const filePath = path.join(booksDir, f.name);
  fs.writeFileSync(filePath, f.content, 'utf8');
  console.log(`Expanded $5 book with dense value: ${f.name}`);
});

console.log('All six $5 books successfully expanded with high-value content!');

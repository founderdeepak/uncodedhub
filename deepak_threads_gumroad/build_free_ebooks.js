const fs = require('fs');
const path = require('path');

const freeDir = path.join(__dirname, 'free_ebooks');

const freeBooks = [
  {
    num: '01',
    file: 'free_01_mixed_signals_primer.md',
    title: 'The 10-Minute Mixed Signals Primer',
    subtitle: 'The Top 10 Most Common Signs Someone Is Secretly Falling for You',
    upsellTarget: 'Book 01: The Mixed Signals Decoder ($7) or Bundle 02',
    content: `## The Core Dilemma
Most people think catching feelings looks like grand romantic gestures. In reality, modern attraction is subtle, clumsy, and guarded. People rarely confess when they first catch feelings—instead, their nervous system leaks involuntary clues.

## The Top 10 Involuntary Signals:
1. **The Snap-Away Glance**: Meeting your eyes across a room, then instantly jerking their head away as if caught doing something forbidden.
2. **The Reaction Compass**: When someone in a crowd tells a joke, their eyes dart to YOU first to see if you are laughing.
3. **The Voice Modulation**: Their vocal pitch drops and softens when speaking directly to you compared to the rest of the group.
4. **The Proximity Gravity**: In any social room, they somehow end up standing or sitting right beside you, even with ten empty seats elsewhere.
5. **The Detailed Memory**: Bringing up tiny offhand details you mentioned weeks ago that even your close friends forgot.
6. **The Unconscious Preening**: Fixing their hair, checking their reflection in their phone, or adjusting their collar right before you walk over.
7. **The Double-Text Clarification**: Sending a quick follow-up text to ensure you didn't misunderstand their tone or think they were being dry.
8. **The Accidental Linger**: When passing you a coffee or brushing past in a hallway, physical contact lasts half a second longer than normal.
9. **The Doorstep Pause**: Lingering at the end of a hangout with hands in their pockets, stretching the final 10 seconds into a minute.
10. **The Teasing Mask**: Playfully mocking your small habits as a safe way to flirt without exposing their vulnerability.`
  },
  {
    num: '02',
    file: 'free_02_25_texts_to_send_tonight.md',
    title: '25 Texts to Send Tonight',
    subtitle: 'Instant Copy-Paste Swipe File to Spark Chemistry and Banter',
    upsellTarget: 'Book 02: The Smooth Texting Vault ($7) or Bundle 01',
    content: `## The Law of Low-Pressure Texting
Stop sending *"Hey, how was your day?"* It puts all the burden on them to carry the conversation. Instead, send messages that are playful, low-pressure, and make it effortless to reply.

## 25 Copy-Paste Messages:
1. *"I was just thinking about that story you told earlier and caught myself smiling like an idiot on the train."*
2. *"You're actually trouble. I'm going to have to keep an eye on you."*
3. *"Stop being so distracting today, some of us are trying to be productive."*
4. *"Tell me the truth: are you a morning person or someone who hits snooze five times?"*
5. *"I just walked past that bakery we talked about. The temptation is overwhelming."*
6. *"Rate your day on a scale of 1 to 10 so I know what kind of energy I’m working with."*
7. *"I saw this meme and knew nobody else would understand the humor like you would."*
8. *"I’m officially diagnosing you with working too hard today. Take a break."*
9. *"I bet you five dollars you’re working on something stressful right now. Put the laptop away."*
10. *"You have an annoying habit of showing up in my thoughts when I least expect it."*
11. *"Quick opinion needed: coffee date on a rainy afternoon or late-night dessert drive?"*
12. *"I have a question for you, but you have to promise to be completely honest."*
13. *"I was going to wait another hour to text so I'd look mysterious, but I have zero patience today."*
14. *"My day was pretty standard until you texted."*
15. *"Careful, keep talking like that and I might actually start liking you."*
16. *"I’m curating a playlist and it desperately needs your taste."*
17. *"I just remembered that funny thing you said and laughed out loud in public. Thanks a lot."*
18. *"I’d tell you that jacket looked great on you, but I don’t want your ego getting bigger."*
19. *"Tell me one good thing that happened to you today."*
20. *"I need a tiebreaker. My friend says X, I say Y. Please tell me you’re on the right side of history."*
21. *"You looked entirely too good today. Who gave you permission?"*
22. *"Just checking in to make sure you're not missing me too much."*
23. *"Are you surviving your day or is the day winning?"*
24. *"Promise you won't judge me when I tell you what I just ate for lunch."*
25. *"Talking to you is easily the calmest part of my week."*`
  },
  {
    num: '03',
    file: 'free_03_5_coworker_attraction_signs.md',
    title: 'The 5 Subtle Signs Your Coworker Likes You',
    subtitle: 'How to Tell If Office Chemistry Is Real Without Risking Your Job',
    upsellTarget: 'Book 03: The Coworker Attraction Code ($7) or Bundle 03',
    content: `## The Workplace Dynamic
Because workplace attraction carries professional risks, coworkers rarely state their interest directly. Instead, they leak micro-clues through daily routines.

## The 5 Core Signs:
1. **The Meeting Laugh Compass**: Whenever someone in a meeting makes an awkward joke or executive slip-up, their eyes dart across the conference table to meet YOURS first.
2. **The Slack/Teams DM Migration**: Moving conversations from public group channels into private 1-on-1 direct messages about non-work banter.
3. **The Coffee Break Synchronicity**: Refilling their water bottle or visiting the kitchen within 90 seconds of you standing up from your desk.
4. **The Desk Drive-By**: Consistently taking the long, inefficient hallway route through the office just to walk past your workspace.
5. **Remembering Your Off-Work Preferences**: Knowing how you take your coffee or tea and offering to bring you one: *"I was already grabbing an iced Americano, thought you'd want one."*`
  },
  {
    num: '04',
    file: 'free_04_friend_or_lover_test.md',
    title: 'Friend or Lover? The 7-Question Litmus Test',
    subtitle: 'How to Know If Your Friend Has Secret Feelings for You',
    upsellTarget: 'Book 04: More Than Friends ($7) or Bundle 03',
    content: `## The Friends-to-Lovers Dilemma
Transitioning from friends to lovers is terrifying because nobody wants to lose the friendship. Use this 7-question litmus test:

1. **The Hug Duration**: Do their hugs linger past 3 seconds with both arms, firm pressure, and a slow release? *(Yes = Romantic)*
2. **The Group Reaction**: Do they look at your face first whenever something funny or chaotic happens in your friend circle?
3. **One-on-One Gravitation**: Have they started inviting you to hang out solo rather than with the whole group?
4. **Dating Shift**: Do they become unusually quiet, dismissive, or critical whenever you mention a new date?
5. **Physical Grooming**: Do they show up noticeably well-dressed or wearing fragrance even for casual hangouts?
6. **Touch Barrier**: Do they find subtle reasons to touch your arm, sit shoulder-to-shoulder, or lean in close?
7. **The Doorstep Linger**: Do they prolong goodbyes instead of rushing to their car?

*Score 4+ 'Yes' answers? The romantic attraction is active.*`
  },
  {
    num: '05',
    file: 'free_05_spark_immediate_curiosity.md',
    title: '3 Psychological Triggers That Spark Immediate Curiosity',
    subtitle: 'The Science of Quiet Chemistry and Magnetic Allure',
    upsellTarget: 'Book 05: Quiet Chemistry ($7) or Bundle 04',
    content: `## Loud Attraction vs. Quiet Chemistry
Loud attraction is performative; quiet chemistry is magnetic. Here are 3 psychological triggers you can use today:

1. **The Unrushed 2-Second Pause**: When asked an intimate question, don't rush to speak. Hold their gaze for two seconds, soften your smile, and answer with deliberate calm. It communicates supreme emotional poise.
2. **The Comfortable Silence**: When a lull in conversation occurs, don't scramble to fill it with nervous chatter. Relax your shoulders and let the silence sit. Being peaceful in silence creates electric intimacy.
3. **The Safe Haven Effect**: When they reveal an insecurity or strange quirk, never judge or tease harshly. React with calm acceptance: *"Honestly, that makes complete sense."* The person who makes someone feel emotionally safe wins their heart.`
  },
  {
    num: '06',
    file: 'free_06_15_deep_compliments.md',
    title: '15 Compliments That Melt Anyone\'s Heart',
    subtitle: 'Moving Past "You\'re Pretty" into Unforgettable Emotional Validation',
    upsellTarget: 'Book 06: Beyond "You\'re Pretty" ($7) or Bundle 04',
    content: `## Why Surface Compliments Fail
Telling someone they are handsome or pretty touches only their surface ego. They forget it in 30 seconds. To leave a lifelong mark, compliment their character, energy, and mind.

## 15 Deep Compliments:
1. *"You have such a calming energy. My entire nervous system relaxes whenever you're around."*
2. *"I love the way your mind works. You look at the world from an angle nobody else does."*
3. *"You have this rare ability to make people feel completely seen and understood."*
4. *"You're one of the few people who listens to understand rather than just waiting to talk."*
5. *"I don't think you realize how effortlessly funny you are."*
6. *"Talking to you feels like taking off a heavy backpack after a long day."*
7. *"I love how passionate your eyes get when you talk about something you genuinely care about."*
8. *"You have a really beautiful emotional depth. It’s so rare to meet people who aren’t superficial."*
9. *"You bring out a version of me that I genuinely really like."*
10. *"You have this quiet confidence that doesn't need to scream or prove anything to anyone."*
11. *"Your voice has this grounding warmth to it. I could listen to you talk for hours."*
12. *"You make ordinary, boring moments feel like an adventure."*
13. *"I really admire your resilience. You've walked through hard things with so much grace."*
14. *"You are remarkably authentic. You never wear a mask to impress anyone."*
15. *"You are a genuinely rare human being. I hope you never forget that."*`
  },
  {
    num: '07',
    file: 'free_07_10_bedtime_texts.md',
    title: '10 Sweet Texts to Send Before Bed',
    subtitle: 'Messages That Keep You on Their Mind Until Morning',
    upsellTarget: 'Book 07: The Late-Night Texting Playbook ($7) or Bundle 01',
    content: `## The Magic of Late-Night Texting
After 9:30 PM, psychological defenses lower and emotional receptivity triples. The text they read right before closing their eyes is the one that lingers in their subconscious.

## 10 Bedtime Messages:
1. *"Sleep well tonight. You’ve been working so hard and deserve real rest."*
2. *"I hope your mind is quiet, your bed is warm, and you get the deepest sleep tonight."*
3. *"Thinking of you right before I close my eyes. Sweet dreams."*
4. *"Put that phone away and get some sleep. The world can wait until tomorrow."*
5. *"I’m glad I got to talk to you tonight. It was the calmest part of my day."*
6. *"Rest easy tonight. Whatever is stressing you out, we’ll tackle it tomorrow."*
7. *"I hope you dream of something that makes you smile when you wake up."*
8. *"Goodnight, trouble. Don't stay up overthinking things you can't control."*
9. *"Sending you a little extra warmth wherever you are tonight. Night."*
10. *"Closing my eyes now, but you're definitely on my mind. Sleep tight."*`
  },
  {
    num: '08',
    file: 'free_08_first_move_green_lights.md',
    title: '5 Signs They Are Waiting for Your First Move',
    subtitle: 'How to Recognize the Green Light and Make Your Move with Confidence',
    upsellTarget: 'Book 08: The First Move Formula ($7) or Bundle 02',
    content: `## The Tragedy of Missed Moments
In most missed connections, both people liked each other, but both were terrified of making the first move. Look for these 5 definitive green lights:

1. **The Weekend Schedule Drop**: Mentioning unprompted: *"I don't really have any plans this Friday, just going to be relaxing at home."* (They are handing you an open calendar slot).
2. **The Eye-to-Lip Triangle**: Their gaze drops from your eyes down to your lips, lingers for a second, and returns to your eyes. This is the universal biological cue for kissing.
3. **The Doorstep Hover**: When walking them to their door or car, they linger with their keys in hand, prolonging the goodbye.
4. **Breaking the Touch Barrier First**: Lightly touching your forearm when laughing or adjusting your collar.
5. **The Unfinished Night Syndrome**: *"I can’t believe it’s already midnight, where did the time go?"* (They do not want the night to end).`
  },
  {
    num: '09',
    file: 'free_09_involuntary_body_language_tells.md',
    title: 'The 5 Involuntary Body Language Tells of Attraction',
    subtitle: 'How Biology Leaks the Truth When Words Refuse to Speak',
    upsellTarget: 'Book 09: The Silent Attraction Blueprint ($7) or Bundle 02',
    content: `## The Subconscious Never Lies
Conscious words can be polite or misleading, but autonomic nervous system reactions cannot be faked:

1. **The Double-Take Pupil Dilation**: When looking at someone you desire, your pupils involuntarily dilate by 15–20% to take in more visual information.
2. **The Rapid Blink Rate**: Listening to someone you are attracted to speeds up your blink rate due to nervous excitation.
3. **The Throat Swallow**: A sudden dry throat caused by adrenaline triggers an involuntary gulp right before speaking to you.
4. **The Mirroring Delay**: If you take a sip of your drink or cross your legs, they subconsciously do the exact same action 5 to 10 seconds later.
5. **The Compass Rule (Feet Pointing)**: Even if their torso is turned to talk to someone else in a circle, their feet remain pointed directly at you.`
  },
  {
    num: '10',
    file: 'free_10_situationship_red_flags.md',
    title: 'Situationship Red Flags: When to Stay vs. When to Run',
    subtitle: 'How to Stop Overthinking and Protect Your Self-Respect in Modern Dating',
    upsellTarget: 'Book 10: The Situationship Exit Plan ($7) or Bundle 04',
    content: `## The Trap of Undefined grey Zones
If you have been seeing someone for more than 8 weeks and there is still no clarity, you are likely in a situationship. Here is how to know if you should walk away:

## 5 Red Flags to Run From:
1. **The "Right Now" Excuse**: *"I really like you, but I'm just not in a place for a relationship right now."* (Translation: They like the benefits of having you around, but do not want the responsibility of choosing you).
2. **Bedroom Bubble Only**: They only invite you over after 9:00 PM and never take you out on real daytime dates or introduce you to friends.
3. **Hot-and-Cold Whiplash**: Loving and attentive for two days, then emotionally unavailable and distant for five.
4. **Allergies to the Future**: Changing the subject anytime plans more than three days away are mentioned.
5. **Making You Feel 'Crazy' for Wanting Clarity**: Turning your simple question about where things stand into an accusation that you are "rushing things."

*Remember: Someone who is genuinely terrified of losing you will never risk leaving you in the grey zone.*`
  }
];

function generateFreeUpsell(book) {
  let text = '\n\n---\n\n';
  text += '## 🚀 Ready to Go Deeper? Unlock the Complete Guide\n\n';
  text += `This quick primer gave you the core fundamentals, but real mastery requires the complete playbook. Check out **${book.upsellTarget}** to unlock the full frameworks, checklists, and copy-paste swipe files.\n\n`;
  text += '### 🎁 Reader Bonus: 20% Off Everything\n';
  text += '- **Use Coupon Code:** `READER20` for **20% off** any individual book or bundle!\n';
  text += '- **Want to share with a friend?** Tell them to use code `FRIEND5` at checkout for **5% off** their first purchase!\n\n';
  text += '👉 [**Browse the Complete Gumroad Romance & Texting Vault**](https://founderdeepak.gumroad.com/l/complete-romance-vault/READER20)\n\n';
  text += '---\n*Connect with Deepak Ravi on Threads: [@founderdeepak](https://threads.net/@founderdeepak)*\n';
  return text;
}

freeBooks.forEach(b => {
  const filePath = path.join(freeDir, b.file);
  const fullContent = `# ${b.title}\n### ${b.subtitle}\n**By Deepak Ravi (@founderdeepak)**\n\n---\n\n${b.content}${generateFreeUpsell(b)}`;
  fs.writeFileSync(filePath, fullContent, 'utf8');
  console.log(`Created free lead magnet: ${b.file}`);
});

console.log('All 10 Free Ebooks created successfully in free_ebooks/!');

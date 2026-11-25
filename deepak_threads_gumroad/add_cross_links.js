const fs = require('fs');
const path = require('path');

const booksDir = path.join(__dirname, 'ebooks');

const allBooks = [
  // $5 Tier (Books 27 to 32)
  { num: '27', file: '27_50_dating_app_opening_lines.md', title: 'The 50 Best Opening Lines for Any Dating App', price: '$5', slug: '50-dating-app-openers', tier: '$5 Micro-Cheatsheet' },
  { num: '28', file: '28_body_language_quick_check.md', title: 'The 30-Second Body Language Quick-Check', price: '$5', slug: 'body-language-quick-check', tier: '$5 Micro-Cheatsheet' },
  { num: '29', file: '29_red_flag_screening_checklist.md', title: 'The Red Flag Rapid-Screening Checklist', price: '$5', slug: 'red-flag-checklist', tier: '$5 Micro-Cheatsheet' },
  { num: '30', file: '30_green_flag_locator.md', title: 'The Green Flag Locator', price: '$5', slug: 'green-flag-locator', tier: '$5 Micro-Cheatsheet' },
  { num: '31', file: '31_30_emergency_texts_silent_conversation.md', title: '30 Emergency Texts When a Conversation Goes Silent', price: '$5', slug: 'emergency-texts-revival', tier: '$5 Micro-Cheatsheet' },
  { num: '32', file: '32_morning_after_and_post_date_etiquette.md', title: 'The Morning After & Post-Date Etiquette Guide', price: '$5', slug: 'post-date-etiquette', tier: '$5 Micro-Cheatsheet' },

  // $7 Tier (Books 01 to 10)
  { num: '01', file: '01_the_mixed_signals_decoder.md', title: 'The Mixed Signals Decoder', price: '$7', slug: 'mixed-signals-decoder', tier: '$7 Core Foundation' },
  { num: '02', file: '02_the_smooth_texting_vault.md', title: 'The Smooth Texting Vault', price: '$7', slug: 'smooth-texting-vault', tier: '$7 Core Foundation' },
  { num: '03', file: '03_the_coworker_attraction_code.md', title: 'The Coworker Attraction Code', price: '$7', slug: 'coworker-attraction-code', tier: '$7 Core Foundation' },
  { num: '04', file: '04_more_than_friends.md', title: 'More Than Friends', price: '$7', slug: 'more-than-friends', tier: '$7 Core Foundation' },
  { num: '05', file: '05_quiet_chemistry.md', title: 'Quiet Chemistry', price: '$7', slug: 'quiet-chemistry', tier: '$7 Core Foundation' },
  { num: '06', file: '06_beyond_youre_pretty.md', title: 'Beyond "You\'re Pretty"', price: '$7', slug: 'beyond-youre-pretty', tier: '$7 Core Foundation' },
  { num: '07', file: '07_late_night_texting_playbook.md', title: 'The Late-Night Texting Playbook', price: '$7', slug: 'late-night-texting', tier: '$7 Core Foundation' },
  { num: '08', file: '08_the_first_move_formula.md', title: 'The First Move Formula', price: '$7', slug: 'first-move-formula', tier: '$7 Core Foundation' },
  { num: '09', file: '09_the_silent_attraction_blueprint.md', title: 'The Silent Attraction Blueprint', price: '$7', slug: 'silent-attraction-blueprint', tier: '$7 Core Foundation' },
  { num: '10', file: '10_the_situationship_exit_plan.md', title: 'The Situationship Exit Plan', price: '$7', slug: 'situationship-exit-plan', tier: '$7 Core Foundation' },

  // $9 Tier (Books 11 to 15)
  { num: '11', file: '11_the_date_night_masterplan.md', title: 'The Date Night Masterplan', price: '$9', slug: 'date-night-masterplan', tier: '$9 Action Toolkit' },
  { num: '12', file: '12_the_ex_factor.md', title: 'The Ex Factor', price: '$9', slug: 'the-ex-factor', tier: '$9 Action Toolkit' },
  { num: '13', file: '13_the_high_value_boundary_playbook.md', title: 'The High-Value Boundary Playbook', price: '$9', slug: 'high-value-boundary-playbook', tier: '$9 Action Toolkit' },
  { num: '14', file: '14_the_dm_attraction_protocol.md', title: 'The DM Attraction Protocol', price: '$9', slug: 'dm-attraction-protocol', tier: '$9 Action Toolkit' },
  { num: '15', file: '15_the_jealousy_and_mixed_signals_antidote.md', title: 'The Jealousy & Mixed Signals Antidote', price: '$9', slug: 'jealousy-mixed-signals-antidote', tier: '$9 Action Toolkit' },

  // $14 Tier (Books 16 to 20)
  { num: '16', file: '16_the_attachment_style_decoder.md', title: 'The Attachment Style Decoder', price: '$14', slug: 'attachment-style-decoder', tier: '$14 Relationship System' },
  { num: '17', file: '17_modern_seduction_and_magnetic_presence.md', title: 'Modern Seduction & Magnetic Presence', price: '$14', slug: 'modern-seduction-magnetic-presence', tier: '$14 Relationship System' },
  { num: '18', file: '18_first_date_to_relationship_in_60_days.md', title: 'From First Date to Relationship in 60 Days', price: '$14', slug: 'first-date-to-relationship-60-days', tier: '$14 Relationship System' },
  { num: '19', file: '19_the_psychology_of_making_them_miss_you.md', title: 'The Psychology of Making Them Miss You', price: '$14', slug: 'psychology-of-making-them-miss-you', tier: '$14 Relationship System' },
  { num: '20', file: '20_the_conversation_mastery_manual.md', title: 'The Conversation Mastery Manual', price: '$14', slug: 'conversation-mastery-manual', tier: '$14 Relationship System' },

  // $19 Tier (Books 21, 22, 26)
  { num: '21', file: '21_the_master_bible_of_modern_romance.md', title: 'The Master Bible of Modern Romance', price: '$19', slug: 'master-bible-modern-romance', tier: '$19 Masterclass Bible' },
  { num: '22', file: '22_the_emotional_intelligence_and_charisma_bible.md', title: 'The Emotional Intelligence & Charisma Bible', price: '$19', slug: 'eq-charisma-bible', tier: '$19 Masterclass Bible' },
  { num: '26', file: '26_the_subconscious_attraction_trigger_matrix.md', title: 'The Subconscious Attraction Trigger Matrix', price: '$19', slug: 'subconscious-attraction-matrix', tier: '$19 Masterclass Bible' },

  // $24 Tier (Books 24, 25)
  { num: '24', file: '24_the_long_term_relationship_mastery_manual.md', title: 'The Long-Term Relationship Mastery Manual', price: '$24', slug: 'long-term-mastery-manual', tier: '$24 Advanced Architecture' },
  { num: '25', file: '25_the_breakup_recovery_and_reinvention_blueprint.md', title: 'The Breakup Recovery & Reinvention Blueprint', price: '$24', slug: 'breakup-reinvention-blueprint', tier: '$24 Advanced Architecture' },

  // $29 Tier (Book 23)
  { num: '23', file: '23_the_modern_romance_encyclopedia.md', title: 'The Modern Romance Encyclopedia', price: '$29', slug: 'modern-romance-encyclopedia', tier: '$29 Definitive Codex' }
];

const bundles = [
  { num: 1, name: 'The Modern Texting & Flirting Toolkit', slug: 'bundle-texting-toolkit', books: 'Books 02 + 07', price: '$9.00', withCode: '$7.20' },
  { num: 2, name: 'The Silent Signs & Body Language Pack', slug: 'bundle-body-language-pack', books: 'Books 01 + 08 + 09', price: '$14.00', withCode: '$11.20' },
  { num: 3, name: 'The High-Stakes Romance Kit', slug: 'bundle-high-stakes-romance', books: 'Books 03 + 04 + 01', price: '$14.00', withCode: '$11.20' },
  { num: 4, name: 'The Deep Connection & Intimacy Masterclass', slug: 'bundle-deep-connection', books: 'Books 05 + 06 + 10', price: '$14.00', withCode: '$11.20' },
  { num: 5, name: 'The Complete 10-Book Original Vault', slug: 'complete-10-book-vault', books: 'Books 01 through 10', price: '$29.00', withCode: '$23.20' },
  { num: 6, name: 'The Rapid Dating Quick-Check Pack ($5 Tier Bundle)', slug: 'bundle-rapid-checklists', books: 'All 6 of the $5 Cheatsheets (Books 27 to 32)', price: '$15.00', withCode: '$12.00' },
  { num: 7, name: 'The Date Night & Attraction Mastery Pack', slug: 'bundle-date-night-attraction', books: 'Books 11 + 14 + 02', price: '$19.00', withCode: '$15.20' },
  { num: 8, name: 'The Reconnection & Ex-Back Strategy Pack', slug: 'bundle-ex-reconnection', books: 'Books 12 + 19 + 05', price: '$19.00', withCode: '$15.20' },
  { num: 9, name: 'The Boundary & Self-Worth Armor Kit', slug: 'bundle-boundaries-armor', books: 'Books 13 + 10 + 15', price: '$19.00', withCode: '$15.20' },
  { num: 10, name: 'The 60-Day Relationship Blueprint Pack', slug: 'bundle-60-day-relationship', books: 'Books 18 + 16 + 08', price: '$27.00', withCode: '$21.60' },
  { num: 11, name: 'The Master Conversation & Banter Suite', slug: 'bundle-conversation-mastery', books: 'Books 20 + 06 + 02 + 07', price: '$27.00', withCode: '$21.60' },
  { num: 12, name: 'The Seduction & Magnetic Presence Masterclass', slug: 'bundle-seduction-magnetic', books: 'Books 17 + 19 + 09 + 05 + 26', price: '$34.00', withCode: '$27.20' },
  { num: 13, name: 'The Long-Term Love & Healing Double-System', slug: 'bundle-longterm-healing', books: 'Books 24 + 25', price: '$34.00', withCode: '$27.20' },
  { num: 14, name: 'The Executive Double-Bible Masterclass', slug: 'bundle-executive-bibles', books: 'Books 21 + 22', price: '$29.00', withCode: '$23.20' },
  { num: 15, name: 'The Grand 32-Book Master Lifetime Library', slug: 'grand-32-book-library', books: 'ALL 32 BOOKS (The Complete Master Codex)', price: '$99.00', withCode: '$79.20' }
];

function generateCrossSection(currentBookNum) {
  let text = '\n\n---\n\n';
  text += '## 🎁 Exclusive Reader Discounts & Referral Rewards\n\n';
  text += 'Thank you for reading this guide! Here are your exclusive discount and sharing benefits:\n\n';
  text += '* **Your Personal Reader Discount (20% Off):** Use code `READER20` at checkout for **20% off** any individual guide or bundle.\n';
  text += '* **Share With a Friend (5% Off Referral):** Loved this guide? Give your friends code `FRIEND5` so they get an instant **5% off** their first purchase!\n\n';

  text += '### 📦 Curated Bundles (Best Value & Maximum Savings)\n\n';
  bundles.forEach(b => {
    text += `* **[Bundle ${b.num}: ${b.name}](https://founderdeepak.gumroad.com/l/${b.slug}/READER20)** — *${b.books}* ➔ **${b.price}** (*Only ${b.withCode} with code READER20*)\n`;
  });

  text += '\n---\n\n';
  text += '### 📚 Complete 32-Book Master Library\n\n';
  
  const tiers = ['$5 Micro-Cheatsheet', '$7 Core Foundation', '$9 Action Toolkit', '$14 Relationship System', '$19 Masterclass Bible', '$24 Advanced Architecture', '$29 Definitive Codex'];
  
  tiers.forEach(t => {
    text += `#### ${t}\n`;
    allBooks.filter(b => b.tier === t).forEach(b => {
      if (b.num === currentBookNum) {
        text += `* **Book ${b.num}: ${b.title} (${b.price})** — *(You just finished this guide!)*\n`;
      } else {
        text += `* **[Book ${b.num}: ${b.title}](https://founderdeepak.gumroad.com/l/${b.slug}/READER20)** (${b.price})\n`;
      }
    });
    text += '\n';
  });

  text += '---\n\n';
  text += '*Connect with author Deepak Ravi on Threads for daily insights: [@founderdeepak](https://threads.net/@founderdeepak)*\n';
  return text;
}

allBooks.forEach(b => {
  const filePath = path.join(booksDir, b.file);
  if (!fs.existsSync(filePath)) {
    console.error(`File missing: ${filePath}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  const marker = '## 🎁 Exclusive Reader Bonus';
  const marker2 = '## 🎁 Exclusive Reader Discounts';
  if (content.includes(marker)) content = content.split(marker)[0].trim();
  if (content.includes(marker2)) content = content.split(marker2)[0].trim();

  const crossSection = generateCrossSection(b.num);
  fs.writeFileSync(filePath, content.trim() + crossSection, 'utf8');
  console.log(`Updated ${b.file} (${b.price})`);
});

console.log('ALL 32 PAID BOOKS SUCCESSFULLY UPDATED WITH FULL CATALOG & DISCOUNTS!');

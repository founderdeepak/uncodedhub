const fs = require('fs');
const path = require('path');

const highTicket = [
  { id: '16', file: '16_the_attachment_style_decoder.md', title: 'The Attachment Style Decoder', price: '$14' },
  { id: '17', file: '17_modern_seduction_and_magnetic_presence.md', title: 'Modern Seduction & Magnetic Presence', price: '$14' },
  { id: '18', file: '18_first_date_to_relationship_in_60_days.md', title: 'First Date to Relationship in 60 Days', price: '$14' },
  { id: '19', file: '19_the_psychology_of_making_them_miss_you.md', title: 'The Psychology of Making Them Miss You', price: '$14' },
  { id: '20', file: '20_the_conversation_mastery_manual.md', title: 'The Conversation Mastery Manual', price: '$14' },
  { id: '21', file: '21_the_master_bible_of_modern_romance.md', title: 'The Master Bible of Modern Romance', price: '$19' },
  { id: '22', file: '22_the_emotional_intelligence_and_charisma_bible.md', title: 'The Emotional Intelligence & Charisma Bible', price: '$19' },
  { id: '26', file: '26_the_subconscious_attraction_trigger_matrix.md', title: 'The Subconscious Attraction Trigger Matrix', price: '$19' },
  { id: '24', file: '24_the_long_term_relationship_mastery_manual.md', title: 'The Long-Term Relationship Mastery Manual', price: '$24' },
  { id: '23', file: '23_the_modern_romance_encyclopedia.md', title: 'The Modern Romance Encyclopedia', price: '$29' },
  { id: '25', file: '25_the_breakup_recovery_and_reinvention_blueprint.md', title: 'The Breakup Recovery & Reinvention Blueprint', price: '$29' },
];

console.log('| ID | Title | Price | Words | Lines | PDF Pages |');
console.log('|:---|:---|:---|:---|:---|:---|');
highTicket.forEach(b => {
  const content = fs.readFileSync(path.join(__dirname, 'ebooks', b.file), 'utf8');
  const words = content.trim().split(/\s+/).length;
  const lines = content.split('\n').length;
  const pdfName = b.file.replace('.md', '.pdf');
  const pdfPath = path.join(__dirname, 'compiled_pdfs', 'paid', pdfName);
  const pdfBuf = fs.readFileSync(pdfPath).toString('latin1');
  const pageMatches = (pdfBuf.match(/\/Type\s*\/Page\b/g) || []).length;
  console.log(`| Book ${b.id} | ${b.title} | ${b.price} | ${words.toLocaleString()} words | ${lines} lines | **${pageMatches} pages** |`);
});

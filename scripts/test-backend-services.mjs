// Test script to verify all backend integrations for Uncoded Hub

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://ruiimbaycfkkejwumoak.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1aWltYmF5Y2Zra2Vqd3Vtb2FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwMTU3MjksImV4cCI6MjA5MDU5MTcyOX0.2xc1ESzTWZsEHxkafcd092mIj50IQjKvxnkOVrs6EsA';
const GOOGLE_CALENDAR_URL = 'https://script.google.com/macros/s/AKfycbyX3OAhuWqclLsVXs1Wcb27s5BwfWTiyQtJxZ7s-SQ4XuGxiY81JkA5gLt68325jOIz/exec';

console.log('=== UNCODED HUB BACKEND VERIFICATION SUITE ===\n');

async function testSupabase() {
  console.log('1. Testing Supabase Health & Connection...');
  const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_submissions?select=id,created_at,name&limit=3&order=created_at.desc`, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    }
  });

  if (res.ok) {
    const data = await res.json();
    console.log('   ✅ Supabase is ONLINE (Status 200 OK)');
    console.log(`   Recent submissions count: ${data.length}`);
    if (data.length > 0) {
      console.log('   Latest record:', data[0]);
    }
  } else {
    console.error('   ❌ Supabase returned status:', res.status, res.statusText);
  }
}

async function testContactFormInsert() {
  console.log('\n2. Testing Contact Form Lead Submission into Supabase...');
  const testLead = {
    name: 'Verification Bot - Contact Form',
    email: 'verify-contact@uncodedhub.com',
    phone: '+91 98765 43210',
    business_type: 'Architecture & Design Studio',
    project_details: 'Testing 24x7 automated website form submission.'
  };

  const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_submissions`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(testLead)
  });

  if (res.ok) {
    console.log('   ✅ Contact Form write SUCCESS (Status ' + res.status + ' Created)');
  } else {
    console.error('   ❌ Contact Form write FAILED:', res.status, await res.text());
  }
}

async function testChatbotInsert() {
  console.log('\n3. Testing Chatbot Lead Submission into Supabase...');
  const testChatbotLead = {
    name: 'Verification Bot - Chatbot',
    email: 'verify-chat@uncodedhub.com',
    department: 'Sales & Onboarding',
    initial_message: 'Hi, I need an interior design website quote.',
    q1_answer: 'Interior designer in Bangalore',
    q2_answer: 'No website currently',
    q3_answer: 'As soon as possible'
  };

  const res = await fetch(`${SUPABASE_URL}/rest/v1/chatbot_leads`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(testChatbotLead)
  });

  if (res.ok) {
    console.log('   ✅ Chatbot Lead write SUCCESS (Status ' + res.status + ' Created)');
  } else {
    console.error('   ❌ Chatbot Lead write FAILED:', res.status, await res.text());
  }
}

async function testCalendarAvailability() {
  console.log('\n4. Testing Google Calendar Integration...');
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateKey = tomorrow.toISOString().split('T')[0];

  try {
    const res = await fetch(`${GOOGLE_CALENDAR_URL}?date=${dateKey}`);
    if (res.ok) {
      const data = await res.json();
      console.log('   ✅ Google Calendar availability query SUCCESS (Status 200 OK)');
      console.log(`   Busy slots on ${dateKey}:`, data.busy?.length || 0);
    } else {
      console.error('   ❌ Google Calendar query returned:', res.status);
    }
  } catch(e) {
    console.error('   ❌ Google Calendar query FAILED:', e.message);
  }
}

async function runAll() {
  await testSupabase();
  await testContactFormInsert();
  await testChatbotInsert();
  await testCalendarAvailability();
  console.log('\n=== VERIFICATION SUITE FINISHED ===');
}

runAll();

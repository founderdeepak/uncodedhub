import { createClient } from '@supabase/supabase-js';

// @ts-ignore
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ruiimbaycfkkejwumoak.supabase.co';
// @ts-ignore
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1aWltYmF5Y2Zra2Vqd3Vtb2FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwMTU3MjksImV4cCI6MjA5MDU5MTcyOX0.2xc1ESzTWZsEHxkafcd092mIj50IQjKvxnkOVrs6EsA';

export const supabase = createClient(supabaseUrl, supabaseKey);

-- ==============================================================================
-- UNCODED HUB — SUPER WEBSITE FEATURES DATABASE SCHEMA (SUPABASE / POSTGRESQL)
-- ==============================================================================
-- This schema powers the Autonomous Lead Capture, Estimator, Booking & Shared Inbox.
-- Run directly in the Supabase SQL Editor.

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. LEADS & ESTIMATOR SUBMISSIONS
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    niche_id VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    property_address TEXT,
    project_type VARCHAR(100) NOT NULL,
    project_size VARCHAR(50) NOT NULL,
    finish_level VARCHAR(50) NOT NULL,
    estimated_min NUMERIC(12, 2) NOT NULL,
    estimated_max NUMERIC(12, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'UNRESOLVED' CHECK (status IN ('UNRESOLVED', 'WAITING_ON_CUSTOMER', 'RESOLVED')),
    notes TEXT,
    assigned_to VARCHAR(100),
    source VARCHAR(50) DEFAULT 'estimator'
);

-- 2. CALENDAR BOOKINGS (WITH TRAVEL BUFFER TRACKING)
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    niche_id VARCHAR(50) NOT NULL,
    lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    property_address TEXT,
    project_type VARCHAR(100) NOT NULL,
    booking_date DATE NOT NULL,
    booking_time_slot VARCHAR(50) NOT NULL, -- e.g. "10:00 AM - 11:00 AM"
    travel_buffer_slot VARCHAR(50),         -- e.g. "11:00 AM - 12:00 PM"
    deposit_amount NUMERIC(10, 2) DEFAULT 0.00,
    deposit_status VARCHAR(50) DEFAULT 'unpaid' CHECK (deposit_status IN ('unpaid', 'paid', 'refunded')),
    payment_reference VARCHAR(255),
    status VARCHAR(50) DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'completed', 'cancelled', 'rescheduled')),
    cancellation_reason TEXT,
    staff_assigned VARCHAR(100)
);

-- 3. CONVERSATIONS & SHARED INBOX (CHAT & CONTACT FORMS)
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    niche_id VARCHAR(50) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_contact VARCHAR(255) NOT NULL, -- Phone or Email
    subject VARCHAR(255) DEFAULT 'Website Live Inquiry',
    status VARCHAR(50) DEFAULT 'UNRESOLVED' CHECK (status IN ('UNRESOLVED', 'WAITING_ON_CUSTOMER', 'RESOLVED')),
    last_message_snippet TEXT
);

-- 4. CONVERSATION MESSAGES
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    sender_type VARCHAR(20) CHECK (sender_type IN ('customer', 'staff', 'system')),
    sender_name VARCHAR(100) NOT NULL,
    content TEXT NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_leads_niche_status ON public.leads(niche_id, status);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON public.bookings(booking_date, booking_time_slot);
CREATE INDEX IF NOT EXISTS idx_conversations_status ON public.conversations(status);

-- Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (from website visitors) and authenticated staff selects/updates
CREATE POLICY "Allow public submissions for leads" ON public.leads FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public submissions for bookings" ON public.bookings FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public submissions for conversations" ON public.conversations FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public submissions for messages" ON public.messages FOR INSERT TO anon WITH CHECK (true);

-- Allow authenticated staff full access
CREATE POLICY "Staff full access to leads" ON public.leads FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff full access to bookings" ON public.bookings FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff full access to conversations" ON public.conversations FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff full access to messages" ON public.messages FOR ALL TO authenticated USING (true);

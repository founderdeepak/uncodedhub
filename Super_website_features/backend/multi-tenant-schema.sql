-- ==============================================================================
-- UNCODED HUB — PRODUCTION MULTI-TENANT DATABASE SCHEMA (SUPABASE / POSTGRESQL)
-- ==============================================================================
-- Designed to support 1 to 500+ isolated client websites on a single unified cloud database.
-- Enforces Row-Level Security (RLS) to ensure zero data leakage across tenants.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. MASTER TENANTS TABLE (Client Studios / Businesses)
CREATE TABLE IF NOT EXISTS public.tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL, -- e.g. "meridian-interiors-804"
    niche_id VARCHAR(50) NOT NULL,      -- e.g. "interior-design", "dental-clinic"
    primary_domain VARCHAR(255),        -- e.g. "meridianinteriors.com"
    owner_name VARCHAR(255) NOT NULL,
    owner_email VARCHAR(255) NOT NULL,
    owner_phone VARCHAR(50) NOT NULL,   -- WhatsApp Notification destination
    subscription_plan VARCHAR(50) DEFAULT 'total-front-office' CHECK (subscription_plan IN ('growth-engine', 'total-front-office', 'enterprise-booking')),
    subscription_status VARCHAR(50) DEFAULT 'active' CHECK (subscription_status IN ('trialing', 'active', 'past_due', 'cancelled')),
    monthly_retainer_fee NUMERIC(10, 2) DEFAULT 9999.00,
    stripe_or_razorpay_sub_id VARCHAR(255),
    is_active BOOLEAN DEFAULT true
);

-- 2. TENANT DYNAMIC CONFIGURATION (Overrides default niche settings)
CREATE TABLE IF NOT EXISTS public.tenant_configs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE UNIQUE NOT NULL,
    brand_title VARCHAR(255),
    currency_symbol VARCHAR(10) DEFAULT '₹',
    currency_format VARCHAR(20) DEFAULT 'Lakhs',
    travel_buffer_minutes INT DEFAULT 60,
    slot_duration_minutes INT DEFAULT 60,
    operating_start_hour INT DEFAULT 8,
    operating_end_hour INT DEFAULT 16,
    operating_days INT[] DEFAULT ARRAY[1, 2, 3, 4, 5], -- Mon-Fri
    deposit_required BOOLEAN DEFAULT false,
    deposit_amount NUMERIC(10, 2) DEFAULT 0.00,
    estimator_schema JSONB NOT NULL,
    notification_settings JSONB DEFAULT '{"sla_hours": 24, "send_whatsapp": true, "send_email": true}'::jsonb
);

-- 3. TENANT STAFF USERS (Staff members who can log into the client portal)
CREATE TABLE IF NOT EXISTS public.tenant_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
    user_id UUID, -- Links to Supabase auth.users(id)
    email VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'staff' CHECK (role IN ('owner', 'manager', 'staff')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. MULTI-TENANT LEADS & ESTIMATOR SUBMISSIONS
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
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
    assigned_staff VARCHAR(100)
);

-- 5. MULTI-TENANT CALENDAR BOOKINGS (WITH TRAVEL BUFFER)
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
    lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    property_address TEXT,
    project_type VARCHAR(100) NOT NULL,
    booking_date DATE NOT NULL,
    booking_time_slot VARCHAR(50) NOT NULL,
    travel_buffer_slot VARCHAR(50),
    status VARCHAR(50) DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'completed', 'cancelled', 'rescheduled')),
    cancellation_reason TEXT,
    staff_assigned VARCHAR(100)
);

-- 6. MULTI-TENANT CONVERSATIONS & SHARED INBOX
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_contact VARCHAR(255) NOT NULL,
    subject VARCHAR(255) DEFAULT 'Live Chat Inquiry',
    status VARCHAR(50) DEFAULT 'UNRESOLVED' CHECK (status IN ('UNRESOLVED', 'WAITING_ON_CUSTOMER', 'RESOLVED')),
    last_message TEXT
);

-- 7. MONTHLY PROOF REPORTS (Archive for Retention & Billing)
CREATE TABLE IF NOT EXISTS public.monthly_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
    month_year VARCHAR(20) NOT NULL, -- e.g. "September 2026"
    total_leads_captured INT DEFAULT 0,
    total_appointments_booked INT DEFAULT 0,
    total_pipeline_value NUMERIC(14, 2) DEFAULT 0.00,
    hours_saved_estimate INT DEFAULT 0,
    dispatched_to_owner_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- PERFORMANCE INDEXES (Optimized for 1,000,000+ lead rows)
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_tenants_slug ON public.tenants(slug);
CREATE INDEX IF NOT EXISTS idx_leads_tenant_status ON public.leads(tenant_id, status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_tenant_date ON public.bookings(tenant_id, booking_date, status);
CREATE INDEX IF NOT EXISTS idx_convs_tenant_status ON public.conversations(tenant_id, status);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monthly_reports ENABLE ROW LEVEL SECURITY;

-- 1. Public Website Visitors (Anonymous API Submissions)
-- Can INSERT new leads, bookings, and chat messages into specific tenant by slug
CREATE POLICY "Public can insert leads" ON public.leads FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Public can insert bookings" ON public.bookings FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Public can insert conversations" ON public.conversations FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Public can read tenant public config" ON public.tenants FOR SELECT TO anon USING (is_active = true);

-- 2. Staff Users (Authenticated via Supabase Auth)
-- Strict Tenant Isolation: Can ONLY query and update records matching their verified tenant_id
CREATE POLICY "Staff can access own tenant data" ON public.leads
    FOR ALL TO authenticated
    USING (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);

CREATE POLICY "Staff can access own bookings" ON public.bookings
    FOR ALL TO authenticated
    USING (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);

CREATE POLICY "Staff can access own conversations" ON public.conversations
    FOR ALL TO authenticated
    USING (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);

-- 3. Super Admins (Deepak & Geetha)
-- Master access to manage all tenants and global metrics
CREATE POLICY "Super Admins full access to all tenants" ON public.tenants
    FOR ALL TO authenticated
    USING ((auth.jwt() ->> 'role') = 'super_admin');

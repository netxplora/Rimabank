-- ============================================================================
-- RIMA MICROFINANCE BANK - Comprehensive Portal Persistence Migration
-- Execute this script in your Supabase SQL Editor
-- Tables: promotions, announcements, staff_users, audit_logs enhancements, contact_messages enhancements
-- ============================================================================

-- 1. PROMOTIONS TABLE
CREATE TABLE IF NOT EXISTS public.promotions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    subtitle TEXT DEFAULT '',
    badge_text TEXT DEFAULT '',
    description TEXT DEFAULT '',
    image_url TEXT DEFAULT '',
    cta_text TEXT DEFAULT 'Learn More',
    cta_link TEXT DEFAULT '/personal-banking',
    terms JSONB DEFAULT '["Standard credit verification apply."]'::jsonb,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'review', 'approved', 'published', 'scheduled', 'archived')),
    priority INTEGER NOT NULL DEFAULT 1,
    start_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    end_date TIMESTAMPTZ,
    display_mode TEXT NOT NULL DEFAULT 'standard' CHECK (display_mode IN ('standard', 'popup', 'both')),
    is_popup_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    created_by TEXT DEFAULT 'Administrator',
    approved_by TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. ANNOUNCEMENTS TABLE
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'general' CHECK (category IN ('general', 'maintenance', 'security', 'feature', 'regulatory')),
    priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    display_as_banner BOOLEAN NOT NULL DEFAULT TRUE,
    display_mode TEXT NOT NULL DEFAULT 'standard' CHECK (display_mode IN ('standard', 'popup', 'both')),
    is_popup_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    action_text TEXT DEFAULT 'Read Notice',
    action_link TEXT DEFAULT '/media',
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'review', 'approved', 'published', 'scheduled', 'archived')),
    start_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    end_date TIMESTAMPTZ,
    created_by TEXT DEFAULT 'Administrator',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. STAFF USERS TABLE
CREATE TABLE IF NOT EXISTS public.staff_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL DEFAULT 'staff' CHECK (role IN ('admin', 'staff')),
    department TEXT NOT NULL DEFAULT 'Customer Support',
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'inactive')),
    last_login TIMESTAMPTZ,
    assigned_enquiries_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT,
    user_name TEXT,
    user_role TEXT,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    resource_title TEXT,
    details TEXT,
    old_values JSONB,
    new_values JSONB,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- If audit_logs already existed with fewer columns, ensure missing columns are added:
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'audit_logs' AND column_name = 'user_name') THEN
        ALTER TABLE public.audit_logs ADD COLUMN user_name TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'audit_logs' AND column_name = 'user_role') THEN
        ALTER TABLE public.audit_logs ADD COLUMN user_role TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'audit_logs' AND column_name = 'resource_title') THEN
        ALTER TABLE public.audit_logs ADD COLUMN resource_title TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'audit_logs' AND column_name = 'details') THEN
        ALTER TABLE public.audit_logs ADD COLUMN details TEXT;
    END IF;
END $$;

-- 5. CONTACT MESSAGES ENHANCEMENTS (Threaded Responses & Notes)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'contact_messages' AND column_name = 'responses') THEN
        ALTER TABLE public.contact_messages ADD COLUMN responses JSONB DEFAULT '[]'::jsonb;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'contact_messages' AND column_name = 'internal_notes') THEN
        ALTER TABLE public.contact_messages ADD COLUMN internal_notes JSONB DEFAULT '[]'::jsonb;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'contact_messages' AND column_name = 'assigned_to') THEN
        ALTER TABLE public.contact_messages ADD COLUMN assigned_to TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'contact_messages' AND column_name = 'assigned_to_name') THEN
        ALTER TABLE public.contact_messages ADD COLUMN assigned_to_name TEXT;
    END IF;
END $$;

-- 6. INDEXES FOR HIGH PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_promotions_slug ON public.promotions(slug);
CREATE INDEX IF NOT EXISTS idx_promotions_status ON public.promotions(status);
CREATE INDEX IF NOT EXISTS idx_promotions_priority ON public.promotions(priority);
CREATE INDEX IF NOT EXISTS idx_announcements_status ON public.announcements(status);
CREATE INDEX IF NOT EXISTS idx_announcements_priority ON public.announcements(priority);
CREATE INDEX IF NOT EXISTS idx_announcements_created_at ON public.announcements(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_staff_users_email ON public.staff_users(email);
CREATE INDEX IF NOT EXISTS idx_staff_users_role ON public.staff_users(role);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at DESC);

-- 7. AUTO-UPDATE TIMESTAMPS
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_promotions_timestamp ON public.promotions;
CREATE TRIGGER update_promotions_timestamp
    BEFORE UPDATE ON public.promotions
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_announcements_timestamp ON public.announcements;
CREATE TRIGGER update_announcements_timestamp
    BEFORE UPDATE ON public.announcements
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_staff_users_timestamp ON public.staff_users;
CREATE TRIGGER update_staff_users_timestamp
    BEFORE UPDATE ON public.staff_users
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 8. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Promotions Policies
DROP POLICY IF EXISTS "Public can view active promotions" ON public.promotions;
CREATE POLICY "Public can view active promotions"
    ON public.promotions FOR SELECT
    TO anon, authenticated
    USING (status = 'published');

DROP POLICY IF EXISTS "Authenticated can manage promotions" ON public.promotions;
CREATE POLICY "Authenticated can manage promotions"
    ON public.promotions FOR ALL
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

-- Announcements Policies
DROP POLICY IF EXISTS "Public can view published announcements" ON public.announcements;
CREATE POLICY "Public can view published announcements"
    ON public.announcements FOR SELECT
    TO anon, authenticated
    USING (status = 'published');

DROP POLICY IF EXISTS "Authenticated can manage announcements" ON public.announcements;
CREATE POLICY "Authenticated can manage announcements"
    ON public.announcements FOR ALL
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

-- Staff Users Policies
DROP POLICY IF EXISTS "Staff accounts management" ON public.staff_users;
CREATE POLICY "Staff accounts management"
    ON public.staff_users FOR ALL
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

-- Audit Logs Policies
DROP POLICY IF EXISTS "Audit logs access" ON public.audit_logs;
CREATE POLICY "Audit logs access"
    ON public.audit_logs FOR ALL
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

-- 9. ENABLE SUPABASE REALTIME REPLICATION
DO $$
BEGIN
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.promotions;
    EXCEPTION WHEN duplicate_object THEN
        -- already added
    END;

    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.announcements;
    EXCEPTION WHEN duplicate_object THEN
        -- already added
    END;

    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.staff_users;
    EXCEPTION WHEN duplicate_object THEN
        -- already added
    END;

    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.audit_logs;
    EXCEPTION WHEN duplicate_object THEN
        -- already added
    END;
END $$;

-- =============================================
-- FIX: Allow admin dashboard to read all profiles
-- Run this in Supabase SQL Editor
-- =============================================

-- Option 1: Create a security-definer function that returns all profiles
-- This bypasses RLS safely by running as the function owner (postgres)
CREATE OR REPLACE FUNCTION public.get_all_profiles(
    _limit INTEGER DEFAULT 100,
    _offset INTEGER DEFAULT 0
)
RETURNS SETOF public.profiles AS $$
BEGIN
    RETURN QUERY
    SELECT * FROM public.profiles
    ORDER BY created_at DESC
    LIMIT _limit
    OFFSET _offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get profile count
CREATE OR REPLACE FUNCTION public.get_profiles_count()
RETURNS INTEGER AS $$
DECLARE
    total INTEGER;
BEGIN
    SELECT COUNT(*)::INTEGER INTO total FROM public.profiles;
    RETURN total;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute to anon and authenticated roles
GRANT EXECUTE ON FUNCTION public.get_all_profiles TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_profiles_count TO anon, authenticated;

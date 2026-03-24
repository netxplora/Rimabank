-- SQL to fix RLS for contact_messages
-- Run this in your Supabase SQL Editor

-- 1. Ensure RLS is enabled
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Anyone can submit contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Authenticated users can view contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Authenticated users can update contact messages" ON public.contact_messages;

-- 3. Create the INSERT policy (This allows the public form to work)
CREATE POLICY "Anyone can submit contact messages"
ON public.contact_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 4. Create the SELECT policy (Allows admins to see messages)
CREATE POLICY "Authenticated users can view contact messages"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (true);

-- 5. Create the UPDATE policy (Allows admins to reply/close)
CREATE POLICY "Authenticated users can update contact messages"
ON public.contact_messages
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

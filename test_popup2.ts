import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bfgjdjroeqvxacahfsky.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmZ2pkanJvZXF2eGFjYWhmc2t5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwNjQ1MDUsImV4cCI6MjA4NzY0MDUwNX0.T7lWetLHak26mRm6_TUQyNctyFSBmZP2onSSOkkMGHA';
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const payload = {
    id: crypto.randomUUID(),
    source_type: 'standalone',
    source_id: null,
    display_mode: 'popup',
    title: 'Test Popup',
    content: 'Test content',
    featured_image: null,
    cta_text: null,
    cta_url: null,
    show_close_button: true,
    start_date: new Date().toISOString(),
    end_date: null,
    trigger_type: 'delay',
    trigger_delay_seconds: 3,
    display_frequency: 'once_session',
    priority: 5,
    show_on_desktop: true,
    show_on_mobile: true,
    overlay_enabled: true,
    status: 'draft',
    created_by: 'Admin',
    created_by_id: null,
    updated_at: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from('popup_configs')
    .insert(payload)
    .select('*')
    .single();

  console.log('Error:', error);
  console.log('Data:', data);
}

test().catch(console.error);

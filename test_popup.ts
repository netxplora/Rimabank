import { SupabaseSync } from './src/services/supabaseSync.js';
import { supabase } from './src/integrations/supabase/client.js';

async function test() {
  const popup = {
    id: crypto.randomUUID(),
    sourceType: 'standalone',
    displayMode: 'popup',
    title: 'Test Popup',
    content: 'Test content',
    showCloseButton: true,
    startDate: new Date().toISOString(),
    triggerType: 'delay',
    triggerDelaySeconds: 3,
    displayFrequency: 'once_session',
    priority: 5,
    showOnDesktop: true,
    showOnMobile: true,
    overlayEnabled: true,
    status: 'draft',
    createdBy: 'Admin',
    impressions: 0,
    dismissals: 0,
    ctaClicks: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  console.log("Payload being sent:", { id: popup.id, ...SupabaseSync._buildPopupPayload(popup as any) });
  
  const res = await SupabaseSync.createPopupConfig(popup as any);
  console.log('Result:', res);
}

test().catch(console.error);

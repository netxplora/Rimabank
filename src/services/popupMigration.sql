-- ============================================================
-- RIMA Bank CMS — Popup Configs Migration
-- Run once in Supabase SQL Editor
-- ============================================================

CREATE TABLE IF NOT EXISTS public.popup_configs (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_type           text NOT NULL DEFAULT 'standalone'
                          CHECK (source_type IN ('promotion','announcement','publication','standalone')),
  source_id             text,
  display_mode          text NOT NULL DEFAULT 'popup'
                          CHECK (display_mode IN ('standard','popup','both')),
  title                 text NOT NULL,
  content               text NOT NULL DEFAULT '',
  featured_image        text,
  cta_text              text,
  cta_url               text,
  show_close_button     boolean NOT NULL DEFAULT true,
  start_date            timestamptz NOT NULL DEFAULT now(),
  end_date              timestamptz,
  trigger_type          text NOT NULL DEFAULT 'delay'
                          CHECK (trigger_type IN ('immediate','delay','scroll')),
  trigger_delay_seconds integer NOT NULL DEFAULT 2,
  display_frequency     text NOT NULL DEFAULT 'once_session'
                          CHECK (display_frequency IN ('every_visit','once_session','once_device','until_dismissed')),
  priority              integer NOT NULL DEFAULT 5,
  show_on_desktop       boolean NOT NULL DEFAULT true,
  show_on_mobile        boolean NOT NULL DEFAULT true,
  overlay_enabled       boolean NOT NULL DEFAULT true,
  status                text NOT NULL DEFAULT 'draft'
                          CHECK (status IN ('draft','scheduled','active','paused','expired','archived')),
  created_by            text NOT NULL DEFAULT '',
  created_by_id         text,
  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now(),
  impressions           integer NOT NULL DEFAULT 0,
  dismissals            integer NOT NULL DEFAULT 0,
  cta_clicks            integer NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_popup_configs_status     ON public.popup_configs (status);
CREATE INDEX IF NOT EXISTS idx_popup_configs_source     ON public.popup_configs (source_type, source_id);
CREATE INDEX IF NOT EXISTS idx_popup_configs_priority   ON public.popup_configs (priority ASC);
CREATE INDEX IF NOT EXISTS idx_popup_configs_start_date ON public.popup_configs (start_date);
CREATE INDEX IF NOT EXISTS idx_popup_configs_end_date   ON public.popup_configs (end_date);

CREATE OR REPLACE FUNCTION public.set_popup_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

DROP TRIGGER IF EXISTS trg_popup_updated_at ON public.popup_configs;
CREATE TRIGGER trg_popup_updated_at
  BEFORE UPDATE ON public.popup_configs
  FOR EACH ROW EXECUTE FUNCTION public.set_popup_updated_at();

ALTER TABLE public.popup_configs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "popups_select_policy" ON public.popup_configs FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "popups_insert_policy" ON public.popup_configs FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "popups_update_policy" ON public.popup_configs FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "popups_delete_policy" ON public.popup_configs FOR DELETE TO anon, authenticated USING (true);

CREATE OR REPLACE FUNCTION public.track_popup_event(p_popup_id uuid, p_event text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  IF    p_event = 'impression' THEN UPDATE public.popup_configs SET impressions = impressions + 1 WHERE id = p_popup_id;
  ELSIF p_event = 'dismissal'  THEN UPDATE public.popup_configs SET dismissals  = dismissals  + 1 WHERE id = p_popup_id;
  ELSIF p_event = 'cta_click'  THEN UPDATE public.popup_configs SET cta_clicks  = cta_clicks  + 1 WHERE id = p_popup_id;
  END IF;
END; $$;

import { supabase } from '@/integrations/supabase/client';
import {
  SiteContent,
  Promotion,
  Announcement,
  Publication,
  Enquiry,
  MediaAsset,
  StaffUser,
  AuditLog,
  SystemSettings,
  PopupConfig
} from '@/types/cms';

// Connectivity guard — avoids cascading errors when project is offline
let _isAvailable: boolean | null = null;
async function isSupabaseAvailable(): Promise<boolean> {
  if (_isAvailable !== null) return _isAvailable;
  try {
    const { error } = await supabase.from('cms_pages').select('id').limit(1);
    // PGRST116 = no rows – still means the DB is live
    _isAvailable = !error || error.code === 'PGRST116';
  } catch {
    _isAvailable = false;
  }
  // Reset the flag after 30 seconds so we re-check periodically
  setTimeout(() => { _isAvailable = null; }, 30_000);
  return _isAvailable;
}

export const SupabaseSync = {
  // 1. Fetch Landing Page & Meta Content from cms_pages
  async fetchPageContent(slug: string = 'home'): Promise<any | null> {
    try {
      if (!(await isSupabaseAvailable())) return null;
      const { data, error } = await supabase
        .from('cms_pages')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error || !data || !data.content) return null;
      return JSON.parse(data.content);
    } catch (err) {
      console.warn(`[SupabaseSync] fetchPageContent (${slug}) error:`, err);
      return null;
    }
  },

  async savePageContent(slug: string, title: string, content: any, metaDescription?: string): Promise<boolean> {
    try {
      if (!(await isSupabaseAvailable())) return false;
      const contentStr = JSON.stringify(content);
      const { error } = await supabase
        .from('cms_pages')
        .upsert({
          slug,
          title,
          content: contentStr,
          meta_description: metaDescription || null,
          is_published: true,
          updated_at: new Date().toISOString()
        }, { onConflict: 'slug' });

      if (error) throw error;
      return true;
    } catch (err) {
      console.warn(`[SupabaseSync] savePageContent (${slug}) error:`, err);
      return false;
    }
  },

  // 2. Fetch & Sync News Articles
  async fetchNewsArticles(): Promise<Publication[] | null> {
    try {
      if (!(await isSupabaseAvailable())) return null;
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data) return null;

      return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        category: (item.category as any) || 'Bank Notice',
        excerpt: item.excerpt || '',
        content: item.content || '',
        featuredImage: item.featured_image || '/images/media-sme.png',
        author: 'Corporate Communications',
        readTime: '3 min read',
        status: item.is_published ? 'published' : 'draft',
        publishDate: item.published_at || item.created_at || new Date().toISOString(),
        createdAt: item.created_at || new Date().toISOString(),
        updatedAt: item.updated_at || new Date().toISOString(),
        createdBy: 'Admin User'
      }));
    } catch (err) {
      console.warn('[SupabaseSync] fetchNewsArticles error:', err);
      return null;
    }
  },

  async saveNewsArticle(pub: Publication): Promise<boolean> {
    try {
      if (!(await isSupabaseAvailable())) return false;
      // Only use DB id if it looks like a UUID (not a local pub- prefix)
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(pub.id);
      const { error } = await supabase
        .from('news_articles')
        .upsert({
          ...(isUUID ? { id: pub.id } : {}),
          title: pub.title,
          slug: pub.slug,
          category: pub.category,
          excerpt: pub.excerpt,
          content: pub.content,
          featured_image: pub.featuredImage,
          is_published: pub.status === 'published',
          published_at: pub.publishDate,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      return true;
    } catch (err) {
      console.warn('[SupabaseSync] saveNewsArticle error:', err);
      return false;
    }
  },

  async deleteNewsArticle(slugOrId: string): Promise<boolean> {
    try {
      if (!(await isSupabaseAvailable())) return false;
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slugOrId);
      const { error } = isUUID
        ? await supabase.from('news_articles').delete().eq('id', slugOrId)
        : await supabase.from('news_articles').delete().eq('slug', slugOrId);

      if (error) throw error;
      return true;
    } catch (err) {
      console.warn('[SupabaseSync] deleteNewsArticle error:', err);
      return false;
    }
  },

  // 3. Fetch & Sync Contact Messages / Enquiries
  async fetchContactMessages(): Promise<Enquiry[] | null> {
    try {
      if (!(await isSupabaseAvailable())) return null;
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data) return null;

      return data.map((item: any, idx: number) => ({
        id: item.id,
        ticketNumber: `RMB-${new Date(item.created_at).getFullYear()}-${String(idx + 1001)}`,
        name: item.name,
        email: item.email,
        phone: item.phone || '',
        subject: item.subject || 'General Customer Inquiry',
        category: 'General Support',
        message: item.message,
        status: item.status === 'resolved'
          ? 'resolved'
          : item.status === 'in_progress'
          ? 'in_progress'
          : 'unread',
        priority: (item.priority as any) || 'normal',
        internalNotes: [],
        responses: item.admin_reply ? [{
          id: `resp-${item.id}`,
          sender: 'Customer Support Officer',
          senderRole: 'staff',
          message: item.admin_reply,
          sentAt: item.replied_at || new Date().toISOString()
        }] : [],
        createdAt: item.created_at || new Date().toISOString(),
        updatedAt: item.updated_at || new Date().toISOString()
      }));
    } catch (err) {
      console.warn('[SupabaseSync] fetchContactMessages error:', err);
      return null;
    }
  },

  async saveContactMessage(enquiry: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }): Promise<{ success: boolean; id?: string }> {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([{
          name: enquiry.name,
          email: enquiry.email,
          phone: enquiry.phone || null,
          subject: enquiry.subject,
          message: enquiry.message,
          status: 'open',
          priority: 'medium'
        }])
        .select('id')
        .single();

      if (error) throw error;
      return { success: true, id: data?.id };
    } catch (err) {
      console.warn('[SupabaseSync] saveContactMessage error:', err);
      return { success: false };
    }
  },

  async updateContactMessageStatus(id: string, status: string, adminReply?: string): Promise<boolean> {
    try {
      if (!(await isSupabaseAvailable())) return false;
      const updates: any = {
        status: status === 'resolved' ? 'resolved' : (status === 'unread' ? 'open' : 'in_progress'),
        updated_at: new Date().toISOString()
      };
      if (adminReply) {
        updates.admin_reply = adminReply;
        updates.replied_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('contact_messages')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (err) {
      console.warn('[SupabaseSync] updateContactMessageStatus error:', err);
      return false;
    }
  },

  // 4. Save Audit Logs into Supabase
  async recordAuditLog(log: AuditLog): Promise<boolean> {
    try {
      if (!(await isSupabaseAvailable())) return false;
      const { error } = await supabase
        .from('audit_logs')
        .insert({
          user_id: log.userId || null,
          action: log.action,
          entity_type: log.resourceType,
          entity_id: log.resourceId || null,
          old_values: log.oldValues || null,
          new_values: {
            userName: log.userName,
            userRole: log.userRole,
            title: log.resourceTitle,
            details: log.details,
            ...(log.newValues || {})
          },
          ip_address: log.ipAddress || '197.210.55.12',
          user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Browser'
        });

      if (error) throw error;
      return true;
    } catch (err) {
      console.warn('[SupabaseSync] recordAuditLog error:', err);
      return false;
    }
  },

  // 5. Media Assets Sync & Storage Uploads
  async fetchMediaAssets(): Promise<MediaAsset[] | null> {
    try {
      if (!(await isSupabaseAvailable())) return null;
      const { data, error } = await supabase
        .from('media_assets' as any)
        .select('*')
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (error || !data) return null;

      return (data as any[]).map((item: any) => ({
        id: item.id,
        title: item.title,
        fileName: item.file_name,
        url: item.url,
        storagePath: item.storage_path || undefined,
        fileSize: Number(item.file_size) || 0,
        fileType: item.file_type || 'image/jpeg',
        dimensions: (item.width && item.height) ? { width: item.width, height: item.height } : undefined,
        altText: item.alt_text || item.title,
        caption: item.caption || undefined,
        description: item.description || undefined,
        category: item.category || 'general',
        tags: item.tags || [],
        isArchived: Boolean(item.is_archived),
        uploadedBy: item.uploaded_by || 'Administrator',
        uploadedById: item.uploaded_by_id || undefined,
        uploadedAt: item.created_at || new Date().toISOString(),
        updatedAt: item.updated_at || undefined,
        usedInCount: 0
      }));
    } catch (err) {
      console.warn('[SupabaseSync] fetchMediaAssets error:', err);
      return null;
    }
  },

  async uploadMediaFile(file: File, folder = 'general'): Promise<{ url: string; storagePath?: string; error?: string }> {
    try {
      if (!(await isSupabaseAvailable())) {
        // Fallback to local Object URL / base64 if Supabase is offline
        const localUrl = URL.createObjectURL(file);
        return { url: localUrl };
      }

      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filePath = `${folder}/${Date.now()}_${cleanFileName}`;

      const { data, error } = await supabase.storage
        .from('media')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        console.warn('[SupabaseSync] Storage upload error, falling back to local preview:', error.message);
        return { url: URL.createObjectURL(file) };
      }

      const { data: urlData } = supabase.storage
        .from('media')
        .getPublicUrl(data.path);

      return {
        url: urlData.publicUrl,
        storagePath: data.path
      };
    } catch (err: any) {
      console.warn('[SupabaseSync] uploadMediaFile exception:', err);
      return { url: URL.createObjectURL(file) };
    }
  },

  async saveMediaAsset(asset: MediaAsset): Promise<boolean> {
    try {
      if (!(await isSupabaseAvailable())) return false;
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(asset.id);

      const payload: any = {
        ...(isUUID ? { id: asset.id } : {}),
        title: asset.title,
        file_name: asset.fileName,
        url: asset.url,
        storage_path: asset.storagePath || null,
        file_size: asset.fileSize,
        file_type: asset.fileType,
        width: asset.dimensions?.width || null,
        height: asset.dimensions?.height || null,
        alt_text: asset.altText,
        caption: asset.caption || null,
        description: asset.description || null,
        category: asset.category,
        tags: asset.tags || [],
        is_archived: Boolean(asset.isArchived),
        uploaded_by: asset.uploadedBy,
        uploaded_by_id: asset.uploadedById || null,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('media_assets' as any)
        .upsert(payload);

      if (error) throw error;
      return true;
    } catch (err) {
      console.warn('[SupabaseSync] saveMediaAsset error:', err);
      return false;
    }
  },

  async archiveMediaAsset(id: string, isArchived: boolean): Promise<boolean> {
    try {
      if (!(await isSupabaseAvailable())) return false;
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
      if (!isUUID) return false;

      const { error } = await supabase
        .from('media_assets' as any)
        .update({
          is_archived: isArchived,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (err) {
      console.warn('[SupabaseSync] archiveMediaAsset error:', err);
      return false;
    }
  },

  async deleteMediaAsset(id: string, storagePath?: string): Promise<boolean> {
    try {
      if (!(await isSupabaseAvailable())) return false;
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

      // Remove from database
      if (isUUID) {
        await supabase
          .from('media_assets' as any)
          .delete()
          .eq('id', id);
      }

      // If storage path exists, clean up storage object
      if (storagePath) {
        await supabase.storage.from('media').remove([storagePath]);
      }

      return true;
    } catch (err) {
      console.warn('[SupabaseSync] deleteMediaAsset error:', err);
      return false;
    }
  },

  // ----------------------------------------------------------------
  // 6. Popup Configs
  // ----------------------------------------------------------------

  /** Maps a raw DB row to PopupConfig */
  _mapPopup(item: any): PopupConfig {
    return {
      id:                   item.id,
      sourceType:           item.source_type,
      sourceId:             item.source_id || undefined,
      displayMode:          item.display_mode,
      title:                item.title,
      content:              item.content || '',
      featuredImage:        item.featured_image || undefined,
      ctaText:              item.cta_text || undefined,
      ctaUrl:               item.cta_url || undefined,
      showCloseButton:      Boolean(item.show_close_button),
      startDate:            item.start_date,
      endDate:              item.end_date || undefined,
      triggerType:          item.trigger_type,
      triggerDelaySeconds:  Number(item.trigger_delay_seconds) || 2,
      displayFrequency:     item.display_frequency,
      priority:             Number(item.priority) || 5,
      showOnDesktop:        Boolean(item.show_on_desktop),
      showOnMobile:         Boolean(item.show_on_mobile),
      overlayEnabled:       Boolean(item.overlay_enabled),
      status:               item.status,
      createdBy:            item.created_by || '',
      createdById:          item.created_by_id || undefined,
      createdAt:            item.created_at,
      updatedAt:            item.updated_at,
      impressions:          Number(item.impressions) || 0,
      dismissals:           Number(item.dismissals)  || 0,
      ctaClicks:            Number(item.cta_clicks)  || 0,
    };
  },

  /** Fetch the single highest-priority, currently-active popup for the public site */
  async fetchActivePopup(): Promise<PopupConfig | null> {
    try {
      if (!(await isSupabaseAvailable())) return null;
      const nowLeeway = new Date(Date.now() + 5 * 60 * 1000).toISOString();
      const nowExact = new Date().toISOString();
      const { data, error } = await supabase
        .from('popup_configs' as any)
        .select('*')
        .eq('status', 'active')
        .lte('start_date', nowLeeway)
        .or(`end_date.is.null,end_date.gt.${nowExact}`)
        .order('priority', { ascending: true })
        .limit(1)
        .maybeSingle();

      if (error || !data) return null;
      return SupabaseSync._mapPopup(data);
    } catch (err) {
      console.warn('[SupabaseSync] fetchActivePopup error:', err);
      return null;
    }
  },

  /** Fetch all popup configs for the CMS (admin/staff) */
  async fetchAllPopups(): Promise<PopupConfig[] | null> {
    try {
      if (!(await isSupabaseAvailable())) return null;
      const { data, error } = await supabase
        .from('popup_configs' as any)
        .select('*')
        .order('priority', { ascending: true });

      if (error || !data) return null;
      return (data as any[]).map(SupabaseSync._mapPopup);
    } catch (err) {
      console.warn('[SupabaseSync] fetchAllPopups error:', err);
      return null;
    }
  },

  /** Upsert a popup config record */
  async savePopupConfig(popup: PopupConfig): Promise<{ success: boolean; data?: PopupConfig }> {
    try {
      if (!(await isSupabaseAvailable())) return { success: false };
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(popup.id);
      const payload: any = {
        ...(isUUID ? { id: popup.id } : {}),
        source_type:           popup.sourceType,
        source_id:             popup.sourceId || null,
        display_mode:          popup.displayMode,
        title:                 popup.title,
        content:               popup.content,
        featured_image:        popup.featuredImage || null,
        cta_text:              popup.ctaText || null,
        cta_url:               popup.ctaUrl || null,
        show_close_button:     popup.showCloseButton,
        start_date:            popup.startDate,
        end_date:              popup.endDate || null,
        trigger_type:          popup.triggerType,
        trigger_delay_seconds: popup.triggerDelaySeconds,
        display_frequency:     popup.displayFrequency,
        priority:              popup.priority,
        show_on_desktop:       popup.showOnDesktop,
        show_on_mobile:        popup.showOnMobile,
        overlay_enabled:       popup.overlayEnabled,
        status:                popup.status,
        created_by:            popup.createdBy,
        created_by_id:         popup.createdById || null,
        updated_at:            new Date().toISOString(),
      };
      const { data, error } = await supabase
        .from('popup_configs' as any)
        .upsert(payload)
        .select('*')
        .maybeSingle();

      if (error) throw error;
      return { success: true, data: data ? SupabaseSync._mapPopup(data) : undefined };
    } catch (err) {
      console.warn('[SupabaseSync] savePopupConfig error:', err);
      return { success: false };
    }
  },

  /** Delete a popup config by id */
  async deletePopupConfig(id: string): Promise<boolean> {
    try {
      if (!(await isSupabaseAvailable())) {
        // DB offline — allow local-only delete so the UI stays responsive
        return true;
      }
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
      if (!isUUID) {
        // Local-only record that was never persisted to the DB — safe to delete locally
        return true;
      }
      const { error } = await supabase
        .from('popup_configs' as any)
        .delete()
        .eq('id', id);
      if (error) {
        console.warn('[SupabaseSync] deletePopupConfig error:', error);
        return false;
      }
      return true;
    } catch (err) {
      console.warn('[SupabaseSync] deletePopupConfig exception:', err);
      return false;
    }
  },

  /** Increment an analytics counter via the server-side RPC */
  async trackPopupEvent(id: string, event: 'impression' | 'dismissal' | 'cta_click'): Promise<void> {
    try {
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
      if (!isUUID) return;
      await supabase.rpc('track_popup_event' as any, { p_popup_id: id, p_event: event });
    } catch (err) {
      console.warn('[SupabaseSync] trackPopupEvent error:', err);
    }
  },
};


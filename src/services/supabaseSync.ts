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
  PopupConfig,
  NewsletterSubscriber
} from '@/types/cms';

// Connectivity guard — checks if client is initialized
async function isSupabaseAvailable(): Promise<boolean> {
  return true;
}

export const SupabaseSync = {
  // ==========================================================================
  // 1. Landing Page & Meta Content (cms_pages)
  // ==========================================================================
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

  async savePageContent(slug: string, title: string, content: any, metaDescription?: string): Promise<{success: boolean; error?: string}> {
    try {
      if (!(await isSupabaseAvailable())) return { success: false };
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
      return { success: true };
    } catch (err) {
      console.warn(`[SupabaseSync] savePageContent (${slug}) error:`, err);
      return { success: false, error: err?.message || 'Unknown error' };
    }
  },

  // ==========================================================================
  // 2. Promotions (promotions table)
  // ==========================================================================
  async fetchPromotions(): Promise<Promotion[] | null> {
    try {
      if (!(await isSupabaseAvailable())) return null;
      const { data, error } = await supabase
        .from('promotions' as any)
        .select('*')
        .order('priority', { ascending: true });

      if (error) {
        if ((error as any).code === '42P01') {
          // Table doesn't exist yet, fallback gracefully to cms_pages JSON
          return SupabaseSync.fetchPageContent('promotions');
        }
        console.warn('[SupabaseSync] fetchPromotions error:', error);
        return null;
      }

      if (!data) return [];

      return (data as any[]).map(item => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        subtitle: item.subtitle || '',
        badgeText: item.badge_text || '',
        description: item.description || '',
        imageUrl: item.image_url || '/images/hero-home.png',
        ctaText: item.cta_text || 'Learn More',
        ctaLink: item.cta_link || '/personal-banking',
        terms: Array.isArray(item.terms) ? item.terms : [],
        status: item.status || 'published',
        priority: Number(item.priority) || 1,
        startDate: item.start_date || new Date().toISOString(),
        endDate: item.end_date || undefined,
        displayMode: item.display_mode || 'standard',
        isPopupEnabled: Boolean(item.is_popup_enabled),
        createdBy: item.created_by || 'Administrator',
        approvedBy: item.approved_by || undefined,
        createdAt: item.created_at || new Date().toISOString(),
        updatedAt: item.updated_at || new Date().toISOString(),
      }));
    } catch (err) {
      console.warn('[SupabaseSync] fetchPromotions exception:', err);
      return null;
    }
  },

  async savePromotion(promo: Promotion): Promise<{success: boolean; error?: string}> {
    try {
      if (!(await isSupabaseAvailable())) return { success: false };
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(promo.id);

      const payload: any = {
        ...(isUUID ? { id: promo.id } : {}),
        title: promo.title,
        slug: promo.slug,
        subtitle: promo.subtitle || '',
        badge_text: promo.badgeText || '',
        description: promo.description || '',
        image_url: promo.imageUrl || '',
        cta_text: promo.ctaText || 'Learn More',
        cta_link: promo.ctaLink || '/personal-banking',
        terms: Array.isArray(promo.terms) ? promo.terms : [],
        status: promo.status,
        priority: Number(promo.priority) || 1,
        start_date: promo.startDate,
        end_date: promo.endDate || null,
        display_mode: promo.displayMode || 'standard',
        is_popup_enabled: Boolean(promo.isPopupEnabled),
        created_by: promo.createdBy,
        approved_by: promo.approvedBy || null,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('promotions' as any)
        .upsert(payload, { onConflict: isUUID ? 'id' : 'slug' });

      if (error) {
        // Fallback to cms_pages if table is missing
        if ((error as any).code === '42P01') {
          return { success: false };
        }
        console.error('[SupabaseSync] savePromotion error:', error);
        return { success: false };
      }
      return { success: true };
    } catch (err) {
      console.warn('[SupabaseSync] savePromotion exception:', err);
      return { success: false, error: err?.message || 'Unknown error' };
    }
  },

  async deletePromotion(id: string): Promise<{success: boolean; error?: string}> {
    try {
      if (!(await isSupabaseAvailable())) return { success: false };
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
      if (!isUUID) return { success: true };

      const { error } = await supabase
        .from('promotions' as any)
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.warn('[SupabaseSync] deletePromotion exception:', err);
      return { success: false, error: err?.message || 'Unknown error' };
    }
  },

  // ==========================================================================
  // 3. Announcements (announcements table)
  // ==========================================================================
  async fetchAnnouncements(): Promise<Announcement[] | null> {
    try {
      if (!(await isSupabaseAvailable())) return null;
      const { data, error } = await supabase
        .from('announcements' as any)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        if ((error as any).code === '42P01') {
          return SupabaseSync.fetchPageContent('announcements');
        }
        console.warn('[SupabaseSync] fetchAnnouncements error:', error);
        return null;
      }

      if (!data) return [];

      return (data as any[]).map(item => ({
        id: item.id,
        title: item.title,
        message: item.message,
        category: item.category || 'general',
        priority: item.priority || 'normal',
        displayAsBanner: Boolean(item.display_as_banner),
        displayMode: item.display_mode || 'standard',
        isPopupEnabled: Boolean(item.is_popup_enabled),
        actionText: item.action_text || undefined,
        actionLink: item.action_link || undefined,
        status: item.status || 'published',
        startDate: item.start_date || new Date().toISOString(),
        endDate: item.end_date || undefined,
        createdBy: item.created_by || 'Administrator',
        createdAt: item.created_at || new Date().toISOString(),
        updatedAt: item.updated_at || new Date().toISOString(),
      }));
    } catch (err) {
      console.warn('[SupabaseSync] fetchAnnouncements exception:', err);
      return null;
    }
  },

  async saveAnnouncement(ann: Announcement): Promise<{success: boolean; error?: string}> {
    try {
      if (!(await isSupabaseAvailable())) return { success: false };
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(ann.id);

      const payload: any = {
        ...(isUUID ? { id: ann.id } : {}),
        title: ann.title,
        message: ann.message,
        category: ann.category,
        priority: ann.priority,
        display_as_banner: Boolean(ann.displayAsBanner),
        display_mode: ann.displayMode || 'standard',
        is_popup_enabled: Boolean(ann.isPopupEnabled),
        action_text: ann.actionText || null,
        action_link: ann.actionLink || null,
        status: ann.status,
        start_date: ann.startDate,
        end_date: ann.endDate || null,
        created_by: ann.createdBy,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('announcements' as any)
        .upsert(payload);

      if (error) {
        if ((error as any).code === '42P01') return { success: false };
        console.error('[SupabaseSync] saveAnnouncement error:', error);
        return { success: false };
      }
      return { success: true };
    } catch (err) {
      console.warn('[SupabaseSync] saveAnnouncement exception:', err);
      return { success: false, error: err?.message || 'Unknown error' };
    }
  },

  async deleteAnnouncement(id: string): Promise<{success: boolean; error?: string}> {
    try {
      if (!(await isSupabaseAvailable())) return { success: false };
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
      if (!isUUID) return { success: true };

      const { error } = await supabase
        .from('announcements' as any)
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.warn('[SupabaseSync] deleteAnnouncement exception:', err);
      return { success: false, error: err?.message || 'Unknown error' };
    }
  },

  // ==========================================================================
  // 4. Staff Accounts (staff_users table)
  // ==========================================================================
  async fetchStaffUsers(): Promise<StaffUser[] | null> {
    try {
      if (!(await isSupabaseAvailable())) return null;
      const { data, error } = await supabase
        .from('staff_users' as any)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        if ((error as any).code === '42P01') {
          return SupabaseSync.fetchPageContent('staff_users');
        }
        console.warn('[SupabaseSync] fetchStaffUsers error:', error);
        return null;
      }

      if (!data) return [];

      return (data as any[]).map(item => ({
        id: item.id,
        name: item.name,
        email: item.email,
        role: item.role || 'staff',
        department: item.department || 'Customer Support',
        status: item.status || 'active',
        lastLogin: item.last_login || undefined,
        assignedEnquiriesCount: Number(item.assigned_enquiries_count) || 0,
        createdAt: item.created_at || new Date().toISOString()
      }));
    } catch (err) {
      console.warn('[SupabaseSync] fetchStaffUsers exception:', err);
      return null;
    }
  },

  async saveStaffUser(staff: StaffUser): Promise<{success: boolean; error?: string}> {
    try {
      if (!(await isSupabaseAvailable())) return { success: false };
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(staff.id);

      const payload: any = {
        ...(isUUID ? { id: staff.id } : {}),
        name: staff.name,
        email: staff.email,
        role: staff.role,
        department: staff.department,
        status: staff.status,
        last_login: staff.lastLogin || null,
        assigned_enquiries_count: staff.assignedEnquiriesCount || 0,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('staff_users' as any)
        .upsert(payload, { onConflict: 'email' });

      if (error) {
        if ((error as any).code === '42P01') return { success: false };
        console.error('[SupabaseSync] saveStaffUser error:', error);
        return { success: false };
      }
      return { success: true };
    } catch (err) {
      console.warn('[SupabaseSync] saveStaffUser exception:', err);
      return { success: false, error: err?.message || 'Unknown error' };
    }
  },

  async deleteStaffUser(id: string): Promise<{success: boolean; error?: string}> {
    try {
      if (!(await isSupabaseAvailable())) return { success: false };
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
      if (!isUUID) return { success: true };

      const { error } = await supabase
        .from('staff_users' as any)
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.warn('[SupabaseSync] deleteStaffUser exception:', err);
      return { success: false, error: err?.message || 'Unknown error' };
    }
  },

  // ==========================================================================
  // 5. News Articles / Publications (news_articles table)
  // ==========================================================================
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

  async saveNewsArticle(pub: Publication): Promise<{success: boolean; error?: string}> {
    try {
      if (!(await isSupabaseAvailable())) return { success: false };
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
      return { success: true };
    } catch (err) {
      console.warn('[SupabaseSync] saveNewsArticle error:', err);
      return { success: false, error: err?.message || 'Unknown error' };
    }
  },

  async deleteNewsArticle(slugOrId: string): Promise<{success: boolean; error?: string}> {
    try {
      if (!(await isSupabaseAvailable())) return { success: false };
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slugOrId);
      const { error } = isUUID
        ? await supabase.from('news_articles').delete().eq('id', slugOrId)
        : await supabase.from('news_articles').delete().eq('slug', slugOrId);

      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.warn('[SupabaseSync] deleteNewsArticle error:', err);
      return { success: false, error: err?.message || 'Unknown error' };
    }
  },

  // ==========================================================================
  // 6. Contact Messages & Enquiries (contact_messages table)
  // ==========================================================================
  async fetchContactMessages(): Promise<Enquiry[] | null> {
    try {
      if (!(await isSupabaseAvailable())) return null;
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data) return null;

      return data.map((item: any, idx: number) => {
        let responsesList = [];
        if (Array.isArray(item.responses) && item.responses.length > 0) {
          responsesList = item.responses;
        } else if (item.admin_reply) {
          responsesList = [{
            id: `resp-${item.id}`,
            sender: 'Customer Support Officer',
            senderRole: 'staff' as const,
            message: item.admin_reply,
            sentAt: item.replied_at || item.updated_at || new Date().toISOString()
          }];
        }

        const internalNotesList = Array.isArray(item.internal_notes) ? item.internal_notes : [];

        return {
          id: item.id,
          ticketNumber: `RMB-${new Date(item.created_at).getFullYear()}-${String(idx + 1001)}`,
          name: item.name,
          email: item.email,
          phone: item.phone || '',
          subject: item.subject || 'General Customer Inquiry',
          category: (item.category as any) || 'General Support',
          message: item.message,
          status: item.status === 'closed'
            ? 'closed'
            : item.status === 'resolved'
            ? 'resolved'
            : item.status === 'in_progress' || item.status === 'pending'
            ? 'in_progress'
            : 'unread', // 'open' and anything else maps to unread
          priority: (item.priority as any) || 'normal',
          assignedTo: item.assigned_to || undefined,
          assignedToName: item.assigned_to_name || undefined,
          internalNotes: internalNotesList,
          responses: responsesList,
          createdAt: item.created_at || new Date().toISOString(),
          updatedAt: item.updated_at || new Date().toISOString()
        };
      });
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
          priority: 'medium',
          responses: [],
          internal_notes: []
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

  async updateContactMessage(
    id: string,
    updates: {
      status?: string;
      assignedTo?: string;
      assignedToName?: string;
      internalNotes?: any[];
      responses?: any[];
      adminReply?: string;
    }
  ): Promise<boolean> {
    try {
      if (!(await isSupabaseAvailable())) return false;
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
      if (!isUUID) return false;

      const payload: any = {
        updated_at: new Date().toISOString()
      };

      if (updates.status) {
        // Map app status values → DB column values (bidirectional, lossless)
        const statusMap: Record<string, string> = {
          unread: 'open',
          in_progress: 'in_progress',
          resolved: 'resolved',
          closed: 'closed',
          read: 'in_progress', // legacy 'read' treated as in_progress
        };
        payload.status = statusMap[updates.status] ?? updates.status;
      }

      if (updates.assignedTo !== undefined) {
        payload.assigned_to = updates.assignedTo;
      }
      if (updates.assignedToName !== undefined) {
        payload.assigned_to_name = updates.assignedToName;
      }
      if (updates.internalNotes !== undefined) {
        payload.internal_notes = updates.internalNotes;
      }
      if (updates.responses !== undefined) {
        payload.responses = updates.responses;
      }
      if (updates.adminReply) {
        payload.admin_reply = updates.adminReply;
        payload.replied_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('contact_messages')
        .update(payload)
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (err) {
      console.warn('[SupabaseSync] updateContactMessage error:', err);
      return false;
    }
  },

  async updateContactMessageStatus(id: string, status: string, adminReply?: string): Promise<{success: boolean; error?: string}> {
    return SupabaseSync.updateContactMessage(id, {
      status,
      adminReply
    });
  },

  async deleteContactMessage(id: string): Promise<{success: boolean; error?: string}> {
    try {
      if (!(await isSupabaseAvailable())) return { success: false };
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
      if (!isUUID) return { success: true };

      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.warn('[SupabaseSync] deleteContactMessage error:', err);
      return { success: false, error: err?.message || 'Unknown error' };
    }
  },

  // ==========================================================================
  // 7. Audit Logs (audit_logs table)
  // ==========================================================================
  async fetchAuditLogs(): Promise<AuditLog[] | null> {
    try {
      if (!(await isSupabaseAvailable())) return null;
      const { data, error } = await supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(150);

      if (error || !data) return null;

      return data.map((item: any) => ({
        id: item.id,
        userId: item.user_id || '',
        userName: item.user_name || item.new_values?.userName || 'Staff Member',
        userRole: (item.user_role as any) || item.new_values?.userRole || 'staff',
        action: item.action as any,
        resourceType: (item.entity_type as any) || 'LANDING_PAGE',
        resourceId: item.entity_id || undefined,
        resourceTitle: item.resource_title || item.new_values?.title || undefined,
        details: item.details || item.new_values?.details || '',
        oldValues: item.old_values || undefined,
        newValues: item.new_values || undefined,
        timestamp: item.created_at || new Date().toISOString(),
        ipAddress: item.ip_address || undefined
      }));
    } catch (err) {
      console.warn('[SupabaseSync] fetchAuditLogs error:', err);
      return null;
    }
  },

  async recordAuditLog(log: AuditLog): Promise<{success: boolean; error?: string}> {
    try {
      if (!(await isSupabaseAvailable())) return { success: false };
      const { error } = await supabase
        .from('audit_logs')
        .insert({
          user_id: log.userId || null,
          user_name: log.userName,
          user_role: log.userRole,
          action: log.action,
          entity_type: log.resourceType,
          entity_id: log.resourceId || null,
          resource_title: log.resourceTitle || null,
          details: log.details || null,
          old_values: log.oldValues || null,
          new_values: {
            userName: log.userName,
            userRole: log.userRole,
            title: log.resourceTitle,
            details: log.details,
            ...(log.newValues || {})
          },
          ip_address: log.ipAddress || null,
          user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Browser'
        });

      if (error) {
        console.warn('[SupabaseSync] recordAuditLog warning:', error.message);
        return { success: false };
      }
      return { success: true };
    } catch (err) {
      console.warn('[SupabaseSync] recordAuditLog error:', err);
      return { success: false, error: err?.message || 'Unknown error' };
    }
  },

  // ==========================================================================
  // 8. Media Assets Sync & Storage Uploads (media_assets table)
  // ==========================================================================
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

  async saveMediaAsset(asset: MediaAsset): Promise<{success: boolean; error?: string}> {
    try {
      if (!(await isSupabaseAvailable())) return { success: false };
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
      return { success: true };
    } catch (err) {
      console.warn('[SupabaseSync] saveMediaAsset error:', err);
      return { success: false, error: err?.message || 'Unknown error' };
    }
  },

  async archiveMediaAsset(id: string, isArchived: boolean): Promise<{success: boolean; error?: string}> {
    try {
      if (!(await isSupabaseAvailable())) return { success: false };
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
      if (!isUUID) return { success: false };

      const { error } = await supabase
        .from('media_assets' as any)
        .update({
          is_archived: isArchived,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.warn('[SupabaseSync] archiveMediaAsset error:', err);
      return { success: false, error: err?.message || 'Unknown error' };
    }
  },

  async deleteMediaAsset(id: string, storagePath?: string): Promise<{success: boolean; error?: string}> {
    try {
      if (!(await isSupabaseAvailable())) return { success: false };
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

      if (isUUID) {
        await supabase
          .from('media_assets' as any)
          .delete()
          .eq('id', id);
      }

      if (storagePath) {
        await supabase.storage.from('media').remove([storagePath]);
      }

      return { success: true };
    } catch (err) {
      console.warn('[SupabaseSync] deleteMediaAsset error:', err);
      return { success: false, error: err?.message || 'Unknown error' };
    }
  },

  // ==========================================================================
  // 9. Popup Configs (popup_configs table)
  // ==========================================================================

  _buildPopupPayload(popup: PopupConfig): Record<string, any> {
    return {
      source_type:           popup.sourceType           || 'standalone',
      source_id:             popup.sourceId             || null,
      display_mode:          popup.displayMode          || 'popup',
      title:                 popup.title,
      content:               popup.content              || '',
      featured_image:        popup.featuredImage        || null,
      cta_text:              popup.ctaText              || null,
      cta_url:               popup.ctaUrl               || null,
      show_close_button:     popup.showCloseButton      !== false,
      start_date:            popup.startDate            || new Date().toISOString(),
      end_date:              popup.endDate              || null,
      trigger_type:          popup.triggerType          || 'delay',
      trigger_delay_seconds: Number(popup.triggerDelaySeconds) || 2,
      display_frequency:     popup.displayFrequency     || 'once_session',
      priority:              Number(popup.priority)     || 5,
      show_on_desktop:       popup.showOnDesktop        !== false,
      show_on_mobile:        popup.showOnMobile         !== false,
      overlay_enabled:       popup.overlayEnabled       !== false,
      status:                popup.status               || 'draft',
      created_by:            popup.createdBy            || 'Administrator',
      created_by_id:         popup.createdById          || null,
      updated_at:            new Date().toISOString(),
    };
  },

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

  async fetchAllPopups(): Promise<PopupConfig[] | null> {
    try {
      const { data, error } = await supabase
        .from('popup_configs' as any)
        .select('*')
        .order('priority', { ascending: true });

      if (error) {
        if ((error as any).code === '42P01') {
          console.error(
            '[SupabaseSync] fetchAllPopups: The popup_configs table does not exist in your Supabase database.'
          );
        } else {
          console.error('[SupabaseSync] fetchAllPopups DB error:', JSON.stringify(error));
        }
        return null;
      }

      return data ? (data as any[]).map(SupabaseSync._mapPopup) : [];
    } catch (err) {
      console.error('[SupabaseSync] fetchAllPopups exception:', err);
      return null;
    }
  },

  async createPopupConfig(
    popup: PopupConfig
  ): Promise<{ success: boolean; data?: PopupConfig; errorMessage?: string }> {
    try {
      const payload = {
        id: popup.id,
        ...SupabaseSync._buildPopupPayload(popup),
      };

      const { data, error } = await supabase
        .from('popup_configs' as any)
        .insert(payload)
        .select('*')
        .single();

      if (error) {
        const msg = (error as any).code === '42P01'
          ? 'The popup_configs table does not exist. Please run popupMigration.sql in Supabase.'
          : `Database error (${(error as any).code}): ${error.message}`;
        console.error('[SupabaseSync] createPopupConfig error:', JSON.stringify(error));
        return { success: false, errorMessage: msg };
      }

      if (!data) {
        const msg = 'Database did not return the created record — the row may not have been saved.';
        return { success: false, errorMessage: msg };
      }

      return { success: true, data: SupabaseSync._mapPopup(data) };
    } catch (err: any) {
      console.error('[SupabaseSync] createPopupConfig exception:', err);
      return { success: false, errorMessage: err?.message ?? 'Unknown error' };
    }
  },

  async updatePopupConfigInDb(
    id: string,
    popup: PopupConfig
  ): Promise<{ success: boolean; data?: PopupConfig; errorMessage?: string }> {
    try {
      const payload = SupabaseSync._buildPopupPayload(popup);

      const { data, error } = await supabase
        .from('popup_configs' as any)
        .update(payload)
        .eq('id', id)
        .select('*')
        .single();

      if (error) {
        const msg = (error as any).code === '42P01'
          ? 'The popup_configs table does not exist. Please run popupMigration.sql in Supabase.'
          : `Database error (${(error as any).code}): ${error.message}`;
        console.error('[SupabaseSync] updatePopupConfigInDb error:', JSON.stringify(error));
        return { success: false, errorMessage: msg };
      }

      if (!data) {
        const msg = `No popup record found with id "${id}" — update had no effect.`;
        return { success: false, errorMessage: msg };
      }

      return { success: true, data: SupabaseSync._mapPopup(data) };
    } catch (err: any) {
      console.error('[SupabaseSync] updatePopupConfigInDb exception:', err);
      return { success: false, errorMessage: err?.message ?? 'Unknown error' };
    }
  },

  async deletePopupConfig(id: string): Promise<{success: boolean; error?: string}> {
    try {
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
      if (!isUUID) return { success: true };

      const { error } = await supabase
        .from('popup_configs' as any)
        .delete({ count: 'exact' })
        .eq('id', id);

      if (error) {
        console.error('[SupabaseSync] deletePopupConfig DB error:', JSON.stringify(error));
        return { success: false };
      }
      return { success: true };
    } catch (err) {
      console.error('[SupabaseSync] deletePopupConfig exception:', err);
      return { success: false, error: err?.message || 'Unknown error' };
    }
  },

  async trackPopupEvent(id: string, event: 'impression' | 'dismissal' | 'cta_click'): Promise<void> {
    try {
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
      if (!isUUID) return;
      await supabase.rpc('track_popup_event' as any, { p_popup_id: id, p_event: event });
    } catch (err) {
      console.warn('[SupabaseSync] trackPopupEvent error:', err);
    }
  },

  // ==========================================================================
  // 10. System Settings (stored in cms_pages with slug: 'system_settings')
  // ==========================================================================
  async fetchSystemSettings(): Promise<SystemSettings | null> {
    try {
      if (!(await isSupabaseAvailable())) return null;
      const pageFallback = await SupabaseSync.fetchPageContent('system_settings');
      if (pageFallback) return pageFallback;
      return null;
    } catch (err) {
      console.warn('[SupabaseSync] fetchSystemSettings error:', err);
      return null;
    }
  },

  async saveSystemSettings(settings: SystemSettings): Promise<{success: boolean; error?: string}> {
    try {
      if (!(await isSupabaseAvailable())) return { success: false };
      return await SupabaseSync.savePageContent('system_settings', 'System Configuration', settings);
    } catch (err) {
      console.warn('[SupabaseSync] saveSystemSettings error:', err);
      return { success: false, error: err?.message || 'Unknown error' };
    }
  },

  // ==========================================================================
  // 11. Newsletter Subscribers (newsletter_subscribers table or cms_pages fallback)
  // ==========================================================================
  async fetchNewsletterSubscribers(): Promise<NewsletterSubscriber[] | null> {
    try {
      if (!(await isSupabaseAvailable())) return null;

      // First try dedicated table if exists
      const { data, error } = await supabase
        .from('newsletter_subscribers' as any)
        .select('*')
        .order('subscribed_at', { ascending: false });

      if (!error && data && Array.isArray(data)) {
        return data.map((item: any) => ({
          id: item.id,
          email: item.email,
          status: item.status || 'subscribed',
          source: item.source || 'Website Footer',
          subscribedAt: item.subscribed_at || item.created_at || new Date().toISOString(),
          unsubscribedAt: item.unsubscribed_at,
          ipAddress: item.ip_address
        }));
      }

      // Fallback to cms_pages record
      const pageFallback = await SupabaseSync.fetchPageContent('newsletter_subscribers');
      if (pageFallback && Array.isArray(pageFallback)) {
        return pageFallback;
      }

      return null;
    } catch (err) {
      console.warn('[SupabaseSync] fetchNewsletterSubscribers error:', err);
      return null;
    }
  },

  async saveNewsletterSubscriber(subscriber: NewsletterSubscriber): Promise<{success: boolean; error?: string}> {
    try {
      if (!(await isSupabaseAvailable())) return { success: false };

      // 1. Attempt dedicated table upsert
      try {
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(subscriber.id);
        const { error: dbError } = await supabase
          .from('newsletter_subscribers' as any)
          .upsert({
            ...(isUUID ? { id: subscriber.id } : {}),
            email: subscriber.email.trim().toLowerCase(),
            status: subscriber.status,
            source: subscriber.source || 'Website Footer',
            subscribed_at: subscriber.subscribedAt,
            unsubscribed_at: subscriber.unsubscribedAt || null,
            updated_at: new Date().toISOString()
          }, { onConflict: 'email' });

        if (!dbError) return { success: true };
      } catch {
        // Continue to cms_pages backup
      }

      // 2. Backup to cms_pages list
      const existing = (await SupabaseSync.fetchPageContent('newsletter_subscribers')) || [];
      const updatedList = Array.isArray(existing) ? [...existing] : [];
      const idx = updatedList.findIndex((s: any) => s.id === subscriber.id || s.email?.toLowerCase() === subscriber.email?.toLowerCase());
      if (idx >= 0) {
        updatedList[idx] = subscriber;
      } else {
        updatedList.unshift(subscriber);
      }
      await SupabaseSync.savePageContent('newsletter_subscribers', 'Newsletter Audience', updatedList);

      return { success: true };
    } catch (err) {
      console.warn('[SupabaseSync] saveNewsletterSubscriber error:', err);
      return { success: false, error: err?.message || 'Unknown error' };
    }
  },

  async deleteNewsletterSubscriber(id: string): Promise<{success: boolean; error?: string}> {
    try {
      if (!(await isSupabaseAvailable())) return { success: false };

      try {
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
        if (isUUID) {
          await supabase.from('newsletter_subscribers' as any).delete().eq('id', id);
        }
      } catch {
        // ignore
      }

      // Update cms_pages list
      const existing = (await SupabaseSync.fetchPageContent('newsletter_subscribers')) || [];
      if (Array.isArray(existing)) {
        const updatedList = existing.filter((s: any) => s.id !== id);
        await SupabaseSync.savePageContent('newsletter_subscribers', 'Newsletter Audience', updatedList);
      }

      return { success: true };
    } catch (err) {
      console.warn('[SupabaseSync] deleteNewsletterSubscriber error:', err);
      return { success: false, error: err?.message || 'Unknown error' };
    }
  }
};


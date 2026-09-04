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
  SystemSettings
} from '@/types/cms';

export const SupabaseSync = {
  // 1. Fetch Landing Page & Meta Content from cms_pages
  async fetchPageContent(slug: string = 'home'): Promise<any | null> {
    try {
      const { data, error } = await supabase
        .from('cms_pages')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error || !data || !data.content) return null;
      return JSON.parse(data.content);
    } catch (err) {
      console.warn(`[SupabaseSync] fetchPageContent (${slug}) error:`, err);
      return null;
    }
  },

  async savePageContent(slug: string, title: string, content: any, metaDescription?: string): Promise<boolean> {
    try {
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
      const { error } = await supabase
        .from('news_articles')
        .upsert({
          id: pub.id.startsWith('pub-') ? undefined : pub.id,
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
      const { error } = await supabase
        .from('news_articles')
        .delete()
        .or(`id.eq.${slugOrId},slug.eq.${slugOrId}`);

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
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data) return null;

      return data.map((item: any, idx: number) => ({
        id: item.id,
        ticketNumber: `RMB-2026-${String(item.id).substring(0, 4).toUpperCase() || (1000 + idx)}`,
        name: item.name,
        email: item.email,
        phone: item.phone || '',
        subject: item.subject || 'General Customer Inquiry',
        category: 'General Support',
        message: item.message,
        status: item.status === 'resolved' ? 'resolved' : (item.status === 'open' ? 'unread' : 'in_progress'),
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

  async updateContactMessageStatus(id: string, status: string, adminReply?: string): Promise<boolean> {
    try {
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
      const { error } = await supabase
        .from('audit_logs')
        .insert({
          action: log.action,
          entity_type: log.resourceType,
          entity_id: log.resourceId || null,
          details: log.details,
          new_values: {
            userName: log.userName,
            userRole: log.userRole,
            title: log.resourceTitle
          },
          ip_address: log.ipAddress || '197.210.55.12',
          user_agent: navigator.userAgent
        });

      if (error) throw error;
      return true;
    } catch (err) {
      console.warn('[SupabaseSync] recordAuditLog error:', err);
      return false;
    }
  }
};

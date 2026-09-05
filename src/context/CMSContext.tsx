import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  SiteContent,
  Promotion,
  Announcement,
  Publication,
  Enquiry,
  MediaAsset,
  MediaUsageReference,
  StaffUser,
  AuditLog,
  SystemSettings,
  UserRole,
  PopupConfig
} from '@/types/cms';
import {
  initialSiteContent,
  initialPromotions,
  initialAnnouncements,
  initialPublications,
  initialEnquiries,
  initialMediaAssets,
  initialStaffUsers,
  initialAuditLogs,
  initialSystemSettings
} from '@/services/cmsInitialData';
import { SupabaseSync } from '@/services/supabaseSync';
import { supabase } from '@/integrations/supabase/client';

const CMS_STORAGE_KEYS = {
  SITE_CONTENT: 'rima_cms_site_content_v1',
  PROMOTIONS: 'rima_cms_promotions_v1',
  ANNOUNCEMENTS: 'rima_cms_announcements_v1',
  PUBLICATIONS: 'rima_cms_publications_v1',
  ENQUIRIES: 'rima_cms_enquiries_v1',
  MEDIA: 'rima_cms_media_v1',
  STAFF: 'rima_cms_staff_v1',
  AUDIT_LOGS: 'rima_cms_audit_logs_v1',
  SETTINGS: 'rima_cms_settings_v1',
};

function generateUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

interface CMSContextType {
  siteContent: SiteContent;
  updateSiteContent: (newContent: Partial<SiteContent>, user: { id: string; name: string; role: UserRole }) => void;
  resetSiteContent: () => void;

  // Promotions
  promotions: Promotion[];
  addPromotion: (promo: Omit<Promotion, 'id' | 'createdAt' | 'updatedAt'>, user: { id: string; name: string; role: UserRole }) => void;
  updatePromotion: (id: string, updates: Partial<Promotion>, user: { id: string; name: string; role: UserRole }) => void;
  deletePromotion: (id: string, user: { id: string; name: string; role: UserRole }) => void;

  // Announcements
  announcements: Announcement[];
  addAnnouncement: (ann: Omit<Announcement, 'id' | 'createdAt' | 'updatedAt'>, user: { id: string; name: string; role: UserRole }) => void;
  updateAnnouncement: (id: string, updates: Partial<Announcement>, user: { id: string; name: string; role: UserRole }) => void;
  deleteAnnouncement: (id: string, user: { id: string; name: string; role: UserRole }) => void;

  // Publications
  publications: Publication[];
  addPublication: (pub: Omit<Publication, 'id' | 'createdAt' | 'updatedAt'>, user: { id: string; name: string; role: UserRole }) => void;
  updatePublication: (id: string, updates: Partial<Publication>, user: { id: string; name: string; role: UserRole }) => void;
  deletePublication: (id: string, user: { id: string; name: string; role: UserRole }) => void;

  // Enquiries
  enquiries: Enquiry[];
  addEnquiry: (enquiry: Omit<Enquiry, 'id' | 'ticketNumber' | 'createdAt' | 'updatedAt' | 'internalNotes' | 'responses'>) => void;
  updateEnquiryStatus: (id: string, status: Enquiry['status'], user: { id: string; name: string; role: UserRole }) => void;
  assignEnquiry: (id: string, staffId: string, staffName: string, user: { id: string; name: string; role: UserRole }) => void;
  addEnquiryNote: (id: string, note: string, author: string) => void;
  respondToEnquiry: (id: string, message: string, user: { id: string; name: string; role: UserRole }) => void;
  deleteEnquiry: (id: string, user: { id: string; name: string; role: UserRole }) => void;

  // Media Operations & Asset Management
  mediaAssets: MediaAsset[];
  addMediaAsset: (asset: Omit<MediaAsset, 'id' | 'uploadedAt'>, user: { id: string; name: string; role: UserRole }) => Promise<MediaAsset>;
  updateMediaAsset: (id: string, updates: Partial<MediaAsset>, user: { id: string; name: string; role: UserRole }) => Promise<void>;
  archiveMediaAsset: (id: string, user: { id: string; name: string; role: UserRole }) => Promise<void>;
  restoreMediaAsset: (id: string, user: { id: string; name: string; role: UserRole }) => Promise<void>;
  deleteMediaAsset: (id: string, user: { id: string; name: string; role: UserRole }, storagePath?: string) => Promise<void>;
  getMediaUsage: (url: string) => MediaUsageReference[];

  // Staff
  staffUsers: StaffUser[];
  addStaffUser: (user: Omit<StaffUser, 'id' | 'createdAt'>, currentUser: { id: string; name: string; role: UserRole }) => void;
  updateStaffUser: (id: string, updates: Partial<StaffUser>, currentUser: { id: string; name: string; role: UserRole }) => void;
  toggleStaffStatus: (id: string, currentUser: { id: string; name: string; role: UserRole }) => void;

  // Audit Logs
  auditLogs: AuditLog[];
  logAuditAction: (log: Omit<AuditLog, 'id' | 'timestamp'>) => void;

  // Settings
  systemSettings: SystemSettings;
  updateSystemSettings: (settings: Partial<SystemSettings>, user: { id: string; name: string; role: UserRole }) => void;

  // Popup Configs
  popupConfigs: PopupConfig[];
  addPopupConfig: (popup: Omit<PopupConfig, 'id' | 'createdAt' | 'updatedAt' | 'impressions' | 'dismissals' | 'ctaClicks'>, user: { id: string; name: string; role: UserRole }) => Promise<{ ok: boolean; error?: string }>;
  updatePopupConfig: (id: string, updates: Partial<PopupConfig>, user: { id: string; name: string; role: UserRole }) => Promise<{ ok: boolean; error?: string }>;
  deletePopupConfig: (id: string, user: { id: string; name: string; role: UserRole }) => Promise<boolean>;
  togglePopupStatus: (id: string, user: { id: string; name: string; role: UserRole }) => Promise<boolean>;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Initial State from localStorage / Defaults
  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    const saved = localStorage.getItem(CMS_STORAGE_KEYS.SITE_CONTENT);
    return saved ? JSON.parse(saved) : initialSiteContent;
  });

  const [promotions, setPromotions] = useState<Promotion[]>(() => {
    const saved = localStorage.getItem(CMS_STORAGE_KEYS.PROMOTIONS);
    return saved ? JSON.parse(saved) : initialPromotions;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem(CMS_STORAGE_KEYS.ANNOUNCEMENTS);
    return saved ? JSON.parse(saved) : initialAnnouncements;
  });

  const [publications, setPublications] = useState<Publication[]>(() => {
    const saved = localStorage.getItem(CMS_STORAGE_KEYS.PUBLICATIONS);
    return saved ? JSON.parse(saved) : initialPublications;
  });

  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    const saved = localStorage.getItem(CMS_STORAGE_KEYS.ENQUIRIES);
    return saved ? JSON.parse(saved) : initialEnquiries;
  });

  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(() => {
    const saved = localStorage.getItem(CMS_STORAGE_KEYS.MEDIA);
    return saved ? JSON.parse(saved) : initialMediaAssets;
  });

  const [staffUsers, setStaffUsers] = useState<StaffUser[]>(() => {
    const saved = localStorage.getItem(CMS_STORAGE_KEYS.STAFF);
    return saved ? JSON.parse(saved) : initialStaffUsers;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem(CMS_STORAGE_KEYS.AUDIT_LOGS);
    return saved ? JSON.parse(saved) : initialAuditLogs;
  });

  const [systemSettings, setSystemSettings] = useState<SystemSettings>(() => {
    const saved = localStorage.getItem(CMS_STORAGE_KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : initialSystemSettings;
  });

  const [popupConfigs, setPopupConfigs] = useState<PopupConfig[]>([]);

  // 2. Supabase Live Initial Sync & Real-time Subscriptions
  useEffect(() => {
    const syncFromDatabase = async () => {
      // Sync Landing Page Content
      const remotePage = await SupabaseSync.fetchPageContent('home');
      if (remotePage) {
        setSiteContent(prev => ({ ...prev, ...remotePage }));
      }

      // Sync Promotions
      const remotePromos = await SupabaseSync.fetchPromotions();
      if (remotePromos && remotePromos.length > 0) {
        setPromotions(remotePromos);
      }

      // Sync Announcements
      const remoteAnnouncements = await SupabaseSync.fetchAnnouncements();
      if (remoteAnnouncements && remoteAnnouncements.length > 0) {
        setAnnouncements(remoteAnnouncements);
      }

      // Sync Publications from news_articles
      const remoteNews = await SupabaseSync.fetchNewsArticles();
      if (remoteNews && remoteNews.length > 0) {
        setPublications(remoteNews);
      }

      // Sync Enquiries from contact_messages
      const remoteMessages = await SupabaseSync.fetchContactMessages();
      if (remoteMessages && remoteMessages.length > 0) {
        setEnquiries(remoteMessages);
      }

      // Sync Media Assets from media_assets
      const remoteMedia = await SupabaseSync.fetchMediaAssets();
      if (remoteMedia && remoteMedia.length > 0) {
        setMediaAssets(remoteMedia);
      }

      // Sync Staff Users from staff_users
      const remoteStaff = await SupabaseSync.fetchStaffUsers();
      if (remoteStaff && remoteStaff.length > 0) {
        setStaffUsers(remoteStaff);
      }

      // Sync Audit Logs from audit_logs
      const remoteLogs = await SupabaseSync.fetchAuditLogs();
      if (remoteLogs && remoteLogs.length > 0) {
        setAuditLogs(remoteLogs);
      }

      // Sync Popup Configs from popup_configs
      const remotePopups = await SupabaseSync.fetchAllPopups();
      if (remotePopups !== null) {
        const now = new Date().toISOString();
        const checked = remotePopups.map(p => {
          if (p.status === 'active' && p.endDate && p.endDate < now) {
            return { ...p, status: 'expired' as const };
          }
          return p;
        });
        setPopupConfigs(checked);
      }
    };

    syncFromDatabase();

    // Setup Supabase Real-time Subscriptions
    const promotionsChannel = supabase
      .channel('public_promotions')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'promotions' }, async () => {
        const updated = await SupabaseSync.fetchPromotions();
        if (updated) setPromotions(updated);
      })
      .subscribe();

    const announcementsChannel = supabase
      .channel('public_announcements')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'announcements' }, async () => {
        const updated = await SupabaseSync.fetchAnnouncements();
        if (updated) setAnnouncements(updated);
      })
      .subscribe();

    const staffChannel = supabase
      .channel('public_staff_users')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'staff_users' }, async () => {
        const updated = await SupabaseSync.fetchStaffUsers();
        if (updated) setStaffUsers(updated);
      })
      .subscribe();

    const auditChannel = supabase
      .channel('public_audit_logs')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'audit_logs' }, async () => {
        const updated = await SupabaseSync.fetchAuditLogs();
        if (updated) setAuditLogs(updated);
      })
      .subscribe();

    const newsChannel = supabase
      .channel('public_news_articles')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'news_articles' }, async () => {
        const updated = await SupabaseSync.fetchNewsArticles();
        if (updated) setPublications(updated);
      })
      .subscribe();

    const contactChannel = supabase
      .channel('public_contact_messages')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_messages' }, async () => {
        const updated = await SupabaseSync.fetchContactMessages();
        if (updated) setEnquiries(updated);
      })
      .subscribe();

    const pagesChannel = supabase
      .channel('public_cms_pages')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cms_pages' }, async () => {
        const remotePage = await SupabaseSync.fetchPageContent('home');
        if (remotePage) setSiteContent(prev => ({ ...prev, ...remotePage }));
      })
      .subscribe();

    const mediaChannel = supabase
      .channel('public_media_assets')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'media_assets' }, async () => {
        const updated = await SupabaseSync.fetchMediaAssets();
        if (updated) setMediaAssets(updated);
      })
      .subscribe();

    const popupsChannel = supabase
      .channel('public_popup_configs')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'popup_configs' }, async () => {
        const updated = await SupabaseSync.fetchAllPopups();
        if (updated !== null) {
          const now = new Date().toISOString();
          const checked = updated.map(p => {
            if (p.status === 'active' && p.endDate && p.endDate < now) {
              return { ...p, status: 'expired' as const };
            }
            return p;
          });
          setPopupConfigs(checked);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(promotionsChannel);
      supabase.removeChannel(announcementsChannel);
      supabase.removeChannel(staffChannel);
      supabase.removeChannel(auditChannel);
      supabase.removeChannel(newsChannel);
      supabase.removeChannel(contactChannel);
      supabase.removeChannel(pagesChannel);
      supabase.removeChannel(mediaChannel);
      supabase.removeChannel(popupsChannel);
    };
  }, []);

  // 3. Local Cache Persistence
  useEffect(() => {
    localStorage.setItem(CMS_STORAGE_KEYS.SITE_CONTENT, JSON.stringify(siteContent));
  }, [siteContent]);

  useEffect(() => {
    localStorage.setItem(CMS_STORAGE_KEYS.PROMOTIONS, JSON.stringify(promotions));
  }, [promotions]);

  useEffect(() => {
    localStorage.setItem(CMS_STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem(CMS_STORAGE_KEYS.PUBLICATIONS, JSON.stringify(publications));
  }, [publications]);

  useEffect(() => {
    localStorage.setItem(CMS_STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem(CMS_STORAGE_KEYS.MEDIA, JSON.stringify(mediaAssets));
  }, [mediaAssets]);

  useEffect(() => {
    localStorage.setItem(CMS_STORAGE_KEYS.STAFF, JSON.stringify(staffUsers));
  }, [staffUsers]);

  useEffect(() => {
    localStorage.setItem(CMS_STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem(CMS_STORAGE_KEYS.SETTINGS, JSON.stringify(systemSettings));
  }, [systemSettings]);

  // Logging Helper
  const logAuditAction = (log: Omit<AuditLog, 'id' | 'timestamp'>) => {
    const newLog: AuditLog = {
      ...log,
      id: generateUUID(),
      timestamp: new Date().toISOString(),
    };
    setAuditLogs(prev => [newLog, ...prev]);
    SupabaseSync.recordAuditLog(newLog);
  };

  // Site Content Methods
  const updateSiteContent = (newContent: Partial<SiteContent>, user: { id: string; name: string; role: UserRole }) => {
    setSiteContent(prev => {
      const updated = { ...prev, ...newContent };
      SupabaseSync.savePageContent('home', 'Rima Bank Landing Page', updated, updated.seo?.metaDescription);
      logAuditAction({
        userId: user.id,
        userName: user.name,
        userRole: user.role,
        action: 'UPDATE',
        resourceType: 'LANDING_PAGE',
        resourceTitle: 'Landing Page Content',
        details: `Updated landing page sections by ${user.name}`
      });
      return updated;
    });
  };

  const resetSiteContent = () => {
    setSiteContent(initialSiteContent);
    SupabaseSync.savePageContent('home', 'Rima Bank Landing Page', initialSiteContent);
    localStorage.setItem(CMS_STORAGE_KEYS.SITE_CONTENT, JSON.stringify(initialSiteContent));
  };

  // Promotions Methods
  const addPromotion = (promoData: Omit<Promotion, 'id' | 'createdAt' | 'updatedAt'>, user: { id: string; name: string; role: UserRole }) => {
    const id = generateUUID();
    const newPromo: Promotion = {
      ...promoData,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setPromotions(prev => [newPromo, ...prev]);
    SupabaseSync.savePromotion(newPromo);

    logAuditAction({
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      action: 'CREATE',
      resourceType: 'PROMOTION',
      resourceId: id,
      resourceTitle: newPromo.title,
      details: `Created new promotion: "${newPromo.title}" with status "${newPromo.status}"`
    });
  };

  const updatePromotion = (id: string, updates: Partial<Promotion>, user: { id: string; name: string; role: UserRole }) => {
    setPromotions(prev => prev.map(p => {
      if (p.id === id) {
        const updated = { ...p, ...updates, updatedAt: new Date().toISOString() };
        SupabaseSync.savePromotion(updated);
        logAuditAction({
          userId: user.id,
          userName: user.name,
          userRole: user.role,
          action: 'UPDATE',
          resourceType: 'PROMOTION',
          resourceId: id,
          resourceTitle: updated.title,
          details: `Updated promotion "${updated.title}"`
        });
        return updated;
      }
      return p;
    }));
  };

  const deletePromotion = (id: string, user: { id: string; name: string; role: UserRole }) => {
    const target = promotions.find(p => p.id === id);
    setPromotions(prev => prev.filter(p => p.id !== id));
    SupabaseSync.deletePromotion(id);

    if (target) {
      logAuditAction({
        userId: user.id,
        userName: user.name,
        userRole: user.role,
        action: 'DELETE',
        resourceType: 'PROMOTION',
        resourceId: id,
        resourceTitle: target.title,
        details: `Deleted promotion "${target.title}"`
      });
    }
  };

  // Announcements Methods
  const addAnnouncement = (annData: Omit<Announcement, 'id' | 'createdAt' | 'updatedAt'>, user: { id: string; name: string; role: UserRole }) => {
    const id = generateUUID();
    const newAnn: Announcement = {
      ...annData,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setAnnouncements(prev => [newAnn, ...prev]);
    SupabaseSync.saveAnnouncement(newAnn);

    logAuditAction({
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      action: 'CREATE',
      resourceType: 'ANNOUNCEMENT',
      resourceId: id,
      resourceTitle: newAnn.title,
      details: `Created announcement: "${newAnn.title}" (Priority: ${newAnn.priority})`
    });
  };

  const updateAnnouncement = (id: string, updates: Partial<Announcement>, user: { id: string; name: string; role: UserRole }) => {
    setAnnouncements(prev => prev.map(a => {
      if (a.id === id) {
        const updated = { ...a, ...updates, updatedAt: new Date().toISOString() };
        SupabaseSync.saveAnnouncement(updated);
        logAuditAction({
          userId: user.id,
          userName: user.name,
          userRole: user.role,
          action: 'UPDATE',
          resourceType: 'ANNOUNCEMENT',
          resourceId: id,
          resourceTitle: updated.title,
          details: `Updated announcement "${updated.title}"`
        });
        return updated;
      }
      return a;
    }));
  };

  const deleteAnnouncement = (id: string, user: { id: string; name: string; role: UserRole }) => {
    const target = announcements.find(a => a.id === id);
    setAnnouncements(prev => prev.filter(a => a.id !== id));
    SupabaseSync.deleteAnnouncement(id);

    if (target) {
      logAuditAction({
        userId: user.id,
        userName: user.name,
        userRole: user.role,
        action: 'DELETE',
        resourceType: 'ANNOUNCEMENT',
        resourceId: id,
        resourceTitle: target.title,
        details: `Deleted announcement "${target.title}"`
      });
    }
  };

  // Publications Methods
  const addPublication = (pubData: Omit<Publication, 'id' | 'createdAt' | 'updatedAt'>, user: { id: string; name: string; role: UserRole }) => {
    const id = generateUUID();
    const newPub: Publication = {
      ...pubData,
      id,
      viewsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setPublications(prev => [newPub, ...prev]);
    SupabaseSync.saveNewsArticle(newPub);

    logAuditAction({
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      action: 'CREATE',
      resourceType: 'PUBLICATION',
      resourceId: id,
      resourceTitle: newPub.title,
      details: `Authored publication: "${newPub.title}" (Category: ${newPub.category}, Status: ${newPub.status})`
    });
  };

  const updatePublication = (id: string, updates: Partial<Publication>, user: { id: string; name: string; role: UserRole }) => {
    setPublications(prev => prev.map(p => {
      if (p.id === id) {
        const updated = { ...p, ...updates, updatedAt: new Date().toISOString() };
        SupabaseSync.saveNewsArticle(updated);
        logAuditAction({
          userId: user.id,
          userName: user.name,
          userRole: user.role,
          action: updates.status === 'published' && p.status !== 'published' ? 'PUBLISH' : 'UPDATE',
          resourceType: 'PUBLICATION',
          resourceId: id,
          resourceTitle: updated.title,
          details: `Updated publication "${updated.title}"`
        });
        return updated;
      }
      return p;
    }));
  };

  const deletePublication = (id: string, user: { id: string; name: string; role: UserRole }) => {
    const target = publications.find(p => p.id === id);
    setPublications(prev => prev.filter(p => p.id !== id));
    SupabaseSync.deleteNewsArticle(id);
    if (target) {
      logAuditAction({
        userId: user.id,
        userName: user.name,
        userRole: user.role,
        action: 'DELETE',
        resourceType: 'PUBLICATION',
        resourceId: id,
        resourceTitle: target.title,
        details: `Deleted publication "${target.title}"`
      });
    }
  };

  // Enquiries Methods
  const addEnquiry = (enquiryData: Omit<Enquiry, 'id' | 'ticketNumber' | 'createdAt' | 'updatedAt' | 'internalNotes' | 'responses'>) => {
    const ticketNumber = `RMB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newEnq: Enquiry = {
      ...enquiryData,
      id: generateUUID(),
      ticketNumber,
      internalNotes: [],
      responses: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setEnquiries(prev => [newEnq, ...prev]);
    SupabaseSync.saveContactMessage({
      name: enquiryData.name,
      email: enquiryData.email,
      phone: enquiryData.phone,
      subject: enquiryData.subject,
      message: enquiryData.message
    });
  };

  const updateEnquiryStatus = (id: string, status: Enquiry['status'], user: { id: string; name: string; role: UserRole }) => {
    setEnquiries(prev => prev.map(e => {
      if (e.id === id) {
        const updated = { ...e, status, updatedAt: new Date().toISOString() };
        SupabaseSync.updateContactMessage(id, { status });
        logAuditAction({
          userId: user.id,
          userName: user.name,
          userRole: user.role,
          action: 'UPDATE',
          resourceType: 'ENQUIRY',
          resourceId: id,
          resourceTitle: `Ticket ${e.ticketNumber}`,
          details: `Changed enquiry status to ${status}`
        });
        return updated;
      }
      return e;
    }));
  };

  const assignEnquiry = (id: string, staffId: string, staffName: string, user: { id: string; name: string; role: UserRole }) => {
    setEnquiries(prev => prev.map(e => {
      if (e.id === id) {
        const newStatus = e.status === 'unread' ? 'in_progress' : e.status;
        const updated: Enquiry = {
          ...e,
          assignedTo: staffId,
          assignedToName: staffName,
          status: newStatus,
          updatedAt: new Date().toISOString()
        };
        SupabaseSync.updateContactMessage(id, {
          assignedTo: staffId,
          assignedToName: staffName,
          status: newStatus
        });
        logAuditAction({
          userId: user.id,
          userName: user.name,
          userRole: user.role,
          action: 'UPDATE',
          resourceType: 'ENQUIRY',
          resourceId: id,
          resourceTitle: `Ticket ${e.ticketNumber}`,
          details: `Assigned enquiry ticket ${e.ticketNumber} to ${staffName}`
        });
        return updated;
      }
      return e;
    }));
  };

  const addEnquiryNote = (id: string, note: string, author: string) => {
    setEnquiries(prev => prev.map(e => {
      if (e.id === id) {
        const newNote = {
          id: generateUUID(),
          author,
          note,
          createdAt: new Date().toISOString()
        };
        const updatedNotes = [...e.internalNotes, newNote];
        SupabaseSync.updateContactMessage(id, { internalNotes: updatedNotes });
        return {
          ...e,
          internalNotes: updatedNotes,
          updatedAt: new Date().toISOString()
        };
      }
      return e;
    }));
  };

  const respondToEnquiry = (id: string, message: string, user: { id: string; name: string; role: UserRole }) => {
    setEnquiries(prev => prev.map(e => {
      if (e.id === id) {
        const response = {
          id: generateUUID(),
          sender: user.name,
          senderRole: user.role,
          message,
          sentAt: new Date().toISOString()
        };
        const updatedResponses = [...e.responses, response];
        const updated: Enquiry = {
          ...e,
          responses: updatedResponses,
          status: 'resolved',
          updatedAt: new Date().toISOString()
        };
        SupabaseSync.updateContactMessage(id, {
          responses: updatedResponses,
          status: 'resolved',
          adminReply: message
        });
        logAuditAction({
          userId: user.id,
          userName: user.name,
          userRole: user.role,
          action: 'UPDATE',
          resourceType: 'ENQUIRY',
          resourceId: id,
          resourceTitle: `Ticket ${e.ticketNumber}`,
          details: `Sent official email reply to ${e.email} for ticket ${e.ticketNumber}`
        });
        return updated;
      }
      return e;
    }));
  };

  const deleteEnquiry = (id: string, user: { id: string; name: string; role: UserRole }) => {
    const target = enquiries.find(e => e.id === id);
    setEnquiries(prev => prev.filter(e => e.id !== id));
    SupabaseSync.deleteContactMessage(id);
    if (target) {
      logAuditAction({
        userId: user.id,
        userName: user.name,
        userRole: user.role,
        action: 'DELETE',
        resourceType: 'ENQUIRY',
        resourceId: id,
        resourceTitle: `Ticket ${target.ticketNumber}`,
        details: `Deleted customer enquiry ticket ${target.ticketNumber}`
      });
    }
  };

  // Media Methods & Usage Scanner
  const getMediaUsage = (url: string): MediaUsageReference[] => {
    if (!url) return [];
    const refs: MediaUsageReference[] = [];
    const cleanUrl = url.trim();

    if (siteContent.hero?.heroImage === cleanUrl) {
      refs.push({ type: 'landing_page', title: 'Homepage Hero Section', location: 'Hero Image' });
    }

    siteContent.testimonials?.forEach((t) => {
      if (t.avatarUrl === cleanUrl) {
        refs.push({ type: 'testimonial', title: `Testimonial: ${t.name}`, location: 'Client Portrait' });
      }
    });

    promotions.forEach((p) => {
      if (p.imageUrl === cleanUrl) {
        refs.push({ type: 'promotion', title: `Promotion: ${p.title}`, location: 'Marketing Campaign Banner' });
      }
    });

    publications.forEach((pub) => {
      if (pub.featuredImage === cleanUrl || pub.content?.includes(cleanUrl)) {
        refs.push({ type: 'publication', title: `Article: ${pub.title}`, location: 'Featured Media / Content Body' });
      }
    });

    return refs;
  };

  const addMediaAsset = async (assetData: Omit<MediaAsset, 'id' | 'uploadedAt'>, user: { id: string; name: string; role: UserRole }): Promise<MediaAsset> => {
    const id = generateUUID();
    const newAsset: MediaAsset = {
      ...assetData,
      id,
      uploadedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      uploadedBy: user.name,
      uploadedById: user.id,
      isArchived: false,
      usedInCount: getMediaUsage(assetData.url).length
    };

    setMediaAssets(prev => [newAsset, ...prev]);
    await SupabaseSync.saveMediaAsset(newAsset);

    logAuditAction({
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      action: 'CREATE',
      resourceType: 'MEDIA',
      resourceId: id,
      resourceTitle: newAsset.title,
      details: `Uploaded media asset: "${newAsset.fileName}" (${Math.round(newAsset.fileSize / 1024)} KB) into category "${newAsset.category}"`
    });

    return newAsset;
  };

  const updateMediaAsset = async (id: string, updates: Partial<MediaAsset>, user: { id: string; name: string; role: UserRole }): Promise<void> => {
    let updatedAsset: MediaAsset | null = null;
    setMediaAssets(prev => {
      const updatedList = prev.map(m => {
        if (m.id === id) {
          updatedAsset = { ...m, ...updates, updatedAt: new Date().toISOString() };
          return updatedAsset;
        }
        return m;
      });
      return updatedList;
    });

    if (updatedAsset) {
      await SupabaseSync.saveMediaAsset(updatedAsset);
      logAuditAction({
        userId: user.id,
        userName: user.name,
        userRole: user.role,
        action: 'UPDATE',
        resourceType: 'MEDIA',
        resourceId: id,
        resourceTitle: (updatedAsset as MediaAsset).title,
        details: `Updated metadata for media asset "${(updatedAsset as MediaAsset).title}"`
      });
    }
  };

  const archiveMediaAsset = async (id: string, user: { id: string; name: string; role: UserRole }): Promise<void> => {
    const target = mediaAssets.find(m => m.id === id);
    setMediaAssets(prev => prev.map(m => m.id === id ? { ...m, isArchived: true, updatedAt: new Date().toISOString() } : m));
    await SupabaseSync.archiveMediaAsset(id, true);

    if (target) {
      logAuditAction({
        userId: user.id,
        userName: user.name,
        userRole: user.role,
        action: 'UPDATE',
        resourceType: 'MEDIA',
        resourceId: id,
        resourceTitle: target.title,
        details: `Archived media asset "${target.fileName}"`
      });
    }
  };

  const restoreMediaAsset = async (id: string, user: { id: string; name: string; role: UserRole }): Promise<void> => {
    const target = mediaAssets.find(m => m.id === id);
    setMediaAssets(prev => prev.map(m => m.id === id ? { ...m, isArchived: false, updatedAt: new Date().toISOString() } : m));
    await SupabaseSync.archiveMediaAsset(id, false);

    if (target) {
      logAuditAction({
        userId: user.id,
        userName: user.name,
        userRole: user.role,
        action: 'UPDATE',
        resourceType: 'MEDIA',
        resourceId: id,
        resourceTitle: target.title,
        details: `Restored archived media asset "${target.fileName}"`
      });
    }
  };

  const deleteMediaAsset = async (id: string, user: { id: string; name: string; role: UserRole }, storagePath?: string): Promise<void> => {
    const target = mediaAssets.find(m => m.id === id);
    setMediaAssets(prev => prev.filter(m => m.id !== id));
    await SupabaseSync.deleteMediaAsset(id, storagePath || target?.storagePath);

    if (target) {
      logAuditAction({
        userId: user.id,
        userName: user.name,
        userRole: user.role,
        action: 'DELETE',
        resourceType: 'MEDIA',
        resourceId: id,
        resourceTitle: target.title,
        details: `Permanently deleted media asset "${target.fileName}"`
      });
    }
  };

  // Staff Methods
  const addStaffUser = (staffData: Omit<StaffUser, 'id' | 'createdAt'>, currentUser: { id: string; name: string; role: UserRole }) => {
    const id = generateUUID();
    const newStaff: StaffUser = {
      ...staffData,
      id,
      createdAt: new Date().toISOString(),
      assignedEnquiriesCount: 0
    };
    setStaffUsers(prev => [newStaff, ...prev]);
    SupabaseSync.saveStaffUser(newStaff);

    logAuditAction({
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      action: 'CREATE',
      resourceType: 'USER',
      resourceId: id,
      resourceTitle: newStaff.name,
      details: `Added new staff member "${newStaff.name}" with role "${newStaff.role}"`
    });
  };

  const updateStaffUser = (id: string, updates: Partial<StaffUser>, currentUser: { id: string; name: string; role: UserRole }) => {
    setStaffUsers(prev => prev.map(s => {
      if (s.id === id) {
        const updated = { ...s, ...updates };
        SupabaseSync.saveStaffUser(updated);
        logAuditAction({
          userId: currentUser.id,
          userName: currentUser.name,
          userRole: currentUser.role,
          action: updates.role && updates.role !== s.role ? 'ROLE_CHANGE' : 'UPDATE',
          resourceType: 'USER',
          resourceId: id,
          resourceTitle: updated.name,
          details: `Updated staff profile for "${updated.name}"`
        });
        return updated;
      }
      return s;
    }));
  };

  const toggleStaffStatus = (id: string, currentUser: { id: string; name: string; role: UserRole }) => {
    setStaffUsers(prev => prev.map(s => {
      if (s.id === id) {
        const newStatus = s.status === 'active' ? 'suspended' : 'active';
        const updated: StaffUser = { ...s, status: newStatus as any };
        SupabaseSync.saveStaffUser(updated);
        logAuditAction({
          userId: currentUser.id,
          userName: currentUser.name,
          userRole: currentUser.role,
          action: 'UPDATE',
          resourceType: 'USER',
          resourceId: id,
          resourceTitle: s.name,
          details: `Changed status of "${s.name}" to ${newStatus}`
        });
        return updated;
      }
      return s;
    }));
  };

  // Settings
  const updateSystemSettings = (updates: Partial<SystemSettings>, user: { id: string; name: string; role: UserRole }) => {
    setSystemSettings(prev => {
      const updated = { ...prev, ...updates };
      SupabaseSync.savePageContent('system_settings', 'System Configuration', updated);
      logAuditAction({
        userId: user.id,
        userName: user.name,
        userRole: user.role,
        action: 'SETTINGS_CHANGE',
        resourceType: 'SETTINGS',
        details: `Updated system configuration settings`
      });
      return updated;
    });
  };

  // Popup Config Methods (Database-First)
  const addPopupConfig = async (
    popupData: Omit<PopupConfig, 'id' | 'createdAt' | 'updatedAt' | 'impressions' | 'dismissals' | 'ctaClicks'>,
    user: { id: string; name: string; role: UserRole }
  ): Promise<{ ok: boolean; error?: string }> => {
    const id = generateUUID();
    const newPopup: PopupConfig = {
      ...popupData,
      id,
      impressions: 0,
      dismissals:  0,
      ctaClicks:   0,
      createdAt:   new Date().toISOString(),
      updatedAt:   new Date().toISOString(),
    };

    const res = await SupabaseSync.createPopupConfig(newPopup);

    if (!res.success) {
      console.error('[CMSContext] addPopupConfig failed:', res.errorMessage);
      return { ok: false, error: res.errorMessage ?? 'Database insert failed.' };
    }

    const saved = res.data ?? newPopup;
    setPopupConfigs(prev => [saved, ...prev.filter(p => p.id !== saved.id)]);

    logAuditAction({
      userId:        user.id,
      userName:      user.name,
      userRole:      user.role,
      action:        'CREATE',
      resourceType:  'POPUP',
      resourceId:    saved.id,
      resourceTitle: saved.title,
      details:       `Created popup "${saved.title}" (status: ${saved.status})`,
    });

    return { ok: true };
  };

  const updatePopupConfig = async (
    id: string,
    updates: Partial<PopupConfig>,
    user: { id: string; name: string; role: UserRole }
  ): Promise<{ ok: boolean; error?: string }> => {
    const currentPopup = popupConfigs.find(p => p.id === id);
    if (!currentPopup) {
      console.error('[CMSContext] updatePopupConfig: popup not found in local state, id:', id);
      return { ok: false, error: `No popup found with ID ${id}` };
    }

    const merged: PopupConfig = {
      ...currentPopup,
      ...updates,
      id,
      updatedAt: new Date().toISOString(),
    };

    const res = await SupabaseSync.updatePopupConfigInDb(id, merged);

    if (!res.success) {
      console.error('[CMSContext] updatePopupConfig failed:', res.errorMessage);
      return { ok: false, error: res.errorMessage ?? 'Database update failed.' };
    }

    const saved = res.data ?? merged;
    setPopupConfigs(prev => prev.map(p => (p.id === id ? saved : p)));

    logAuditAction({
      userId:        user.id,
      userName:      user.name,
      userRole:      user.role,
      action:        'UPDATE',
      resourceType:  'POPUP',
      resourceId:    id,
      resourceTitle: saved.title,
      details:       `Updated popup "${saved.title}"`,
    });

    return { ok: true };
  };

  const deletePopupConfig = async (id: string, user: { id: string; name: string; role: UserRole }): Promise<boolean> => {
    const target = popupConfigs.find(p => p.id === id);
    const success = await SupabaseSync.deletePopupConfig(id);

    if (!success) {
      return false;
    }

    setPopupConfigs(prev => prev.filter(p => p.id !== id));

    if (target) {
      logAuditAction({
        userId:        user.id,
        userName:      user.name,
        userRole:      user.role,
        action:        'DELETE',
        resourceType:  'POPUP',
        resourceId:    id,
        resourceTitle: target.title,
        details:       `Deleted popup "${target.title}"`,
      });
    }

    return true;
  };

  const togglePopupStatus = async (id: string, user: { id: string; name: string; role: UserRole }): Promise<boolean> => {
    const target = popupConfigs.find(p => p.id === id);
    if (!target) return false;
    const newStatus: PopupConfig['status'] = target.status === 'active' ? 'paused' : 'active';
    const res = await updatePopupConfig(id, { status: newStatus }, user);
    return res.ok;
  };

  return (
    <CMSContext.Provider
      value={{
        siteContent,
        updateSiteContent,
        resetSiteContent,
        promotions,
        addPromotion,
        updatePromotion,
        deletePromotion,
        announcements,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        publications,
        addPublication,
        updatePublication,
        deletePublication,
        enquiries,
        addEnquiry,
        updateEnquiryStatus,
        assignEnquiry,
        addEnquiryNote,
        respondToEnquiry,
        deleteEnquiry,
        mediaAssets,
        addMediaAsset,
        updateMediaAsset,
        archiveMediaAsset,
        restoreMediaAsset,
        deleteMediaAsset,
        getMediaUsage,
        staffUsers,
        addStaffUser,
        updateStaffUser,
        toggleStaffStatus,
        auditLogs,
        logAuditAction,
        systemSettings,
        updateSystemSettings,
        popupConfigs,
        addPopupConfig,
        updatePopupConfig,
        deletePopupConfig,
        togglePopupStatus,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};

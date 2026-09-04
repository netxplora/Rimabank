import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
  UserRole
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

  // Media
  mediaAssets: MediaAsset[];
  addMediaAsset: (asset: Omit<MediaAsset, 'id' | 'uploadedAt'>, user: { id: string; name: string; role: UserRole }) => void;
  updateMediaAsset: (id: string, updates: Partial<MediaAsset>, user: { id: string; name: string; role: UserRole }) => void;
  deleteMediaAsset: (id: string, user: { id: string; name: string; role: UserRole }) => void;

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

  // 2. Supabase Live Initial Sync & Real-time Subscriptions
  useEffect(() => {
    const syncFromDatabase = async () => {
      // Sync Landing Page Content
      const remotePage = await SupabaseSync.fetchPageContent('home');
      if (remotePage) {
        setSiteContent(prev => ({ ...prev, ...remotePage }));
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
    };

    syncFromDatabase();

    // Setup Supabase Real-time Subscriptions
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

    return () => {
      supabase.removeChannel(newsChannel);
      supabase.removeChannel(contactChannel);
      supabase.removeChannel(pagesChannel);
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
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      ipAddress: '197.210.55.' + Math.floor(Math.random() * 80 + 10)
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
    const id = `promo-${Date.now()}`;
    const newPromo: Promotion = {
      ...promoData,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setPromotions(prev => {
      const updated = [newPromo, ...prev];
      SupabaseSync.savePageContent('promotions', 'Promotions Catalog', updated);
      return updated;
    });
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
    setPromotions(prev => {
      const updatedList = prev.map(p => {
        if (p.id === id) {
          const updated = { ...p, ...updates, updatedAt: new Date().toISOString() };
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
      });
      SupabaseSync.savePageContent('promotions', 'Promotions Catalog', updatedList);
      return updatedList;
    });
  };

  const deletePromotion = (id: string, user: { id: string; name: string; role: UserRole }) => {
    const target = promotions.find(p => p.id === id);
    setPromotions(prev => {
      const filtered = prev.filter(p => p.id !== id);
      SupabaseSync.savePageContent('promotions', 'Promotions Catalog', filtered);
      return filtered;
    });
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
    const id = `ann-${Date.now()}`;
    const newAnn: Announcement = {
      ...annData,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setAnnouncements(prev => {
      const updated = [newAnn, ...prev];
      SupabaseSync.savePageContent('announcements', 'Announcements & Alerts', updated);
      return updated;
    });
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
    setAnnouncements(prev => {
      const updatedList = prev.map(a => {
        if (a.id === id) {
          const updated = { ...a, ...updates, updatedAt: new Date().toISOString() };
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
      });
      SupabaseSync.savePageContent('announcements', 'Announcements & Alerts', updatedList);
      return updatedList;
    });
  };

  const deleteAnnouncement = (id: string, user: { id: string; name: string; role: UserRole }) => {
    const target = announcements.find(a => a.id === id);
    setAnnouncements(prev => {
      const filtered = prev.filter(a => a.id !== id);
      SupabaseSync.savePageContent('announcements', 'Announcements & Alerts', filtered);
      return filtered;
    });
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
    const id = `pub-${Date.now()}`;
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
      id: `enq-${Date.now()}`,
      ticketNumber,
      internalNotes: [],
      responses: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setEnquiries(prev => [newEnq, ...prev]);
  };

  const updateEnquiryStatus = (id: string, status: Enquiry['status'], user: { id: string; name: string; role: UserRole }) => {
    setEnquiries(prev => prev.map(e => {
      if (e.id === id) {
        const updated = { ...e, status, updatedAt: new Date().toISOString() };
        SupabaseSync.updateContactMessageStatus(id, status);
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
        const updated = {
          ...e,
          assignedTo: staffId,
          assignedToName: staffName,
          status: e.status === 'unread' ? 'in_progress' : e.status,
          updatedAt: new Date().toISOString()
        } as Enquiry;
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
          id: `note-${Date.now()}`,
          author,
          note,
          createdAt: new Date().toISOString()
        };
        return {
          ...e,
          internalNotes: [...e.internalNotes, newNote],
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
          id: `resp-${Date.now()}`,
          sender: user.name,
          senderRole: user.role,
          message,
          sentAt: new Date().toISOString()
        };
        const updated = {
          ...e,
          responses: [...e.responses, response],
          status: 'resolved',
          updatedAt: new Date().toISOString()
        } as Enquiry;
        SupabaseSync.updateContactMessageStatus(id, 'resolved', message);
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

  // Media Methods
  const addMediaAsset = (assetData: Omit<MediaAsset, 'id' | 'uploadedAt'>, user: { id: string; name: string; role: UserRole }) => {
    const id = `med-${Date.now()}`;
    const newAsset: MediaAsset = {
      ...assetData,
      id,
      uploadedAt: new Date().toISOString(),
      usedInCount: 0
    };
    setMediaAssets(prev => {
      const updated = [newAsset, ...prev];
      SupabaseSync.savePageContent('media_assets', 'Media Assets Vault', updated);
      return updated;
    });
    logAuditAction({
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      action: 'CREATE',
      resourceType: 'MEDIA',
      resourceId: id,
      resourceTitle: newAsset.title,
      details: `Uploaded media asset: "${newAsset.fileName}" (${Math.round(newAsset.fileSize / 1024)} KB)`
    });
  };

  const updateMediaAsset = (id: string, updates: Partial<MediaAsset>, user: { id: string; name: string; role: UserRole }) => {
    setMediaAssets(prev => {
      const updatedList = prev.map(m => {
        if (m.id === id) {
          const updated = { ...m, ...updates };
          logAuditAction({
            userId: user.id,
            userName: user.name,
            userRole: user.role,
            action: 'UPDATE',
            resourceType: 'MEDIA',
            resourceId: id,
            resourceTitle: updated.title,
            details: `Updated metadata for media "${updated.title}"`
          });
          return updated;
        }
        return m;
      });
      SupabaseSync.savePageContent('media_assets', 'Media Assets Vault', updatedList);
      return updatedList;
    });
  };

  const deleteMediaAsset = (id: string, user: { id: string; name: string; role: UserRole }) => {
    const target = mediaAssets.find(m => m.id === id);
    setMediaAssets(prev => {
      const filtered = prev.filter(m => m.id !== id);
      SupabaseSync.savePageContent('media_assets', 'Media Assets Vault', filtered);
      return filtered;
    });
    if (target) {
      logAuditAction({
        userId: user.id,
        userName: user.name,
        userRole: user.role,
        action: 'DELETE',
        resourceType: 'MEDIA',
        resourceId: id,
        resourceTitle: target.title,
        details: `Deleted media asset "${target.fileName}"`
      });
    }
  };

  // Staff Methods
  const addStaffUser = (staffData: Omit<StaffUser, 'id' | 'createdAt'>, currentUser: { id: string; name: string; role: UserRole }) => {
    const id = `staff-${Date.now()}`;
    const newStaff: StaffUser = {
      ...staffData,
      id,
      createdAt: new Date().toISOString(),
      assignedEnquiriesCount: 0
    };
    setStaffUsers(prev => {
      const updated = [...prev, newStaff];
      SupabaseSync.savePageContent('staff_users', 'Staff Accounts Directory', updated);
      return updated;
    });
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
    setStaffUsers(prev => {
      const updatedList = prev.map(s => {
        if (s.id === id) {
          const updated = { ...s, ...updates };
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
      });
      SupabaseSync.savePageContent('staff_users', 'Staff Accounts Directory', updatedList);
      return updatedList;
    });
  };

  const toggleStaffStatus = (id: string, currentUser: { id: string; name: string; role: UserRole }) => {
    setStaffUsers(prev => {
      const updatedList = prev.map(s => {
        if (s.id === id) {
          const newStatus = s.status === 'active' ? 'suspended' : 'active';
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
          return { ...s, status: newStatus as any };
        }
        return s;
      });
      SupabaseSync.savePageContent('staff_users', 'Staff Accounts Directory', updatedList);
      return updatedList;
    });
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
        deleteMediaAsset,
        staffUsers,
        addStaffUser,
        updateStaffUser,
        toggleStaffStatus,
        auditLogs,
        logAuditAction,
        systemSettings,
        updateSystemSettings
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

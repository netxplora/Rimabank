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
  PopupConfig,
  NewsletterSubscriber
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
  SUBSCRIBERS: 'rima_cms_subscribers_v1',
};

const initialDefaultSubscribers: NewsletterSubscriber[] = [
  {
    id: 'sub-001',
    email: 'tunde.adeleke@gmail.com',
    status: 'subscribed',
    source: 'Website Footer',
    subscribedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'sub-002',
    email: 'amina.bello@yahoo.com',
    status: 'subscribed',
    source: 'Website Footer',
    subscribedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'sub-003',
    email: 'chidi.okafor@outlook.com',
    status: 'subscribed',
    source: 'Promotions Popup',
    subscribedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'sub-004',
    email: 'grace.danladi@rimablog.com',
    status: 'unsubscribed',
    source: 'Website Footer',
    subscribedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    unsubscribedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'sub-005',
    email: 'ibrahim.katsina@finance.org.ng',
    status: 'subscribed',
    source: 'Website Footer',
    subscribedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString()
  }
];

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
  resetSiteContent: () => Promise<{ok: boolean, error?: string}>;

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
  addStaffUser: (user: Omit<StaffUser, 'id' | 'createdAt'>, currentUser: { id: string; name: string; role: UserRole }) => Promise<{ok: boolean, error?: string}>;
  updateStaffUser: (id: string, updates: Partial<StaffUser>, currentUser: { id: string; name: string; role: UserRole }) => Promise<{ok: boolean, error?: string}>;
  toggleStaffStatus: (id: string, currentUser: { id: string; name: string; role: UserRole }) => Promise<{ok: boolean, error?: string}>;
  deleteStaffUser: (id: string, currentUser: { id: string; name: string; role: UserRole }) => Promise<{ok: boolean, error?: string}>;

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
  deletePopupConfig: (id: string, user: { id: string; name: string; role: UserRole }) => Promise<{ ok: boolean; error?: string }>;
  togglePopupStatus: (id: string, user: { id: string; name: string; role: UserRole }) => Promise<{ ok: boolean; error?: string }>;

  // Newsletter Subscribers
  subscribers: NewsletterSubscriber[];
  subscribeNewsletter: (email: string, source?: string) => Promise<{ ok: boolean; error?: string }>;
  unsubscribeNewsletter: (idOrEmail: string, user?: { id: string; name: string; role: UserRole }) => Promise<{ ok: boolean; error?: string }>;
  deleteSubscriber: (id: string, user: { id: string; name: string; role: UserRole }) => Promise<{ ok: boolean; error?: string }>;
  toggleSubscriberStatus: (id: string, user: { id: string; name: string; role: UserRole }) => Promise<{ ok: boolean; error?: string }>;
}

const mergeSiteContentWithDefaults = (remote: any): SiteContent => {
  if (!remote) return initialSiteContent;
  return {
    ...initialSiteContent,
    ...remote,
    hero: { ...initialSiteContent.hero, ...(remote.hero || {}) },
    trustStats: Array.isArray(remote.trustStats) && remote.trustStats.length > 0 ? remote.trustStats : initialSiteContent.trustStats,
    aboutSnapshot: {
      ...initialSiteContent.aboutSnapshot,
      ...(remote.aboutSnapshot || {}),
      stats: Array.isArray(remote.aboutSnapshot?.stats) && remote.aboutSnapshot.stats.length > 0 ? remote.aboutSnapshot.stats : initialSiteContent.aboutSnapshot.stats,
      governanceTeam: Array.isArray(remote.aboutSnapshot?.governanceTeam) && remote.aboutSnapshot.governanceTeam.length > 0 ? remote.aboutSnapshot.governanceTeam : initialSiteContent.aboutSnapshot.governanceTeam
    },
    products: Array.isArray(remote.products) && remote.products.length > 0 ? remote.products : initialSiteContent.products,
    agentBanking: { ...initialSiteContent.agentBanking, ...(remote.agentBanking || {}) },
    smeBanking: {
      ...initialSiteContent.smeBanking,
      ...(remote.smeBanking || {}),
      services: Array.isArray(remote.smeBanking?.services) && remote.smeBanking.services.length > 0 ? remote.smeBanking.services : initialSiteContent.smeBanking.services,
      benefits: Array.isArray(remote.smeBanking?.benefits) && remote.smeBanking.benefits.length > 0 ? remote.smeBanking.benefits : initialSiteContent.smeBanking.benefits
    },
    customerJourney: {
      ...initialSiteContent.customerJourney!,
      ...(remote.customerJourney || {}),
      steps: Array.isArray(remote.customerJourney?.steps) && remote.customerJourney.steps.length > 0 ? remote.customerJourney.steps : initialSiteContent.customerJourney!.steps
    },
    financingSection: {
      ...initialSiteContent.financingSection!,
      ...(remote.financingSection || {}),
      workflowSteps: Array.isArray(remote.financingSection?.workflowSteps) && remote.financingSection.workflowSteps.length > 0 ? remote.financingSection.workflowSteps : initialSiteContent.financingSection!.workflowSteps,
      facilities: Array.isArray(remote.financingSection?.facilities) && remote.financingSection.facilities.length > 0 ? remote.financingSection.facilities : initialSiteContent.financingSection!.facilities
    },
    savingsSection: {
      ...initialSiteContent.savingsSection!,
      ...(remote.savingsSection || {}),
      products: Array.isArray(remote.savingsSection?.products) && remote.savingsSection.products.length > 0 ? remote.savingsSection.products : initialSiteContent.savingsSection!.products
    },
    digitalBankingSection: {
      ...initialSiteContent.digitalBankingSection!,
      ...(remote.digitalBankingSection || {}),
      capabilities: Array.isArray(remote.digitalBankingSection?.capabilities) && remote.digitalBankingSection.capabilities.length > 0 ? remote.digitalBankingSection.capabilities : initialSiteContent.digitalBankingSection!.capabilities
    },
    financialEducationSection: {
      ...initialSiteContent.financialEducationSection!,
      ...(remote.financialEducationSection || {}),
      guides: Array.isArray(remote.financialEducationSection?.guides) && remote.financialEducationSection.guides.length > 0 ? remote.financialEducationSection.guides : initialSiteContent.financialEducationSection!.guides
    },
    testimonials: Array.isArray(remote.testimonials) && remote.testimonials.length > 0 ? remote.testimonials : initialSiteContent.testimonials,
    branches: Array.isArray(remote.branches) && remote.branches.length > 0 ? remote.branches : initialSiteContent.branches,
    seo: { ...initialSiteContent.seo, ...(remote.seo || {}) }
  };
};

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Initial State from localStorage / Defaults
  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    const saved = localStorage.getItem(CMS_STORAGE_KEYS.SITE_CONTENT);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return mergeSiteContentWithDefaults(parsed);
      } catch {
        return initialSiteContent;
      }
    }
    return initialSiteContent;
  });

  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions);

  // Initialize as empty — Supabase sync populates this from the database.
  // Never use initialAnnouncements as default: it causes paused/draft items to flash on first render.
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const [publications, setPublications] = useState<Publication[]>(initialPublications);

  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);

  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(initialMediaAssets);

  const [staffUsers, setStaffUsers] = useState<StaffUser[]>(initialStaffUsers);

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialAuditLogs);

  const [systemSettings, setSystemSettings] = useState<SystemSettings>(initialSystemSettings);

  const [popupConfigs, setPopupConfigs] = useState<PopupConfig[]>([]);

  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>(() => {
    const saved = localStorage.getItem(CMS_STORAGE_KEYS.SUBSCRIBERS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialDefaultSubscribers;
      }
    }
    return initialDefaultSubscribers;
  });

  // Save siteContent to localStorage
  useEffect(() => {
    localStorage.setItem(CMS_STORAGE_KEYS.SITE_CONTENT, JSON.stringify(siteContent));
  }, [siteContent]);

  // Save subscribers to localStorage
  useEffect(() => {
    localStorage.setItem(CMS_STORAGE_KEYS.SUBSCRIBERS, JSON.stringify(subscribers));
  }, [subscribers]);

  // 2. Supabase Live Initial Sync & Real-time Subscriptions
  useEffect(() => {
    const syncFromDatabase = async () => {
      // Sync Newsletter Subscribers
      const remoteSubscribers = await SupabaseSync.fetchNewsletterSubscribers();
      if (remoteSubscribers && remoteSubscribers.length > 0) {
        setSubscribers(remoteSubscribers);
      }
      // Sync Landing Page Content
      const remotePage = await SupabaseSync.fetchPageContent('home');
      if (remotePage) {
        setSiteContent(prev => mergeSiteContentWithDefaults({ ...prev, ...remotePage }));
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

      // Sync System Settings
      const remoteSettings = await SupabaseSync.fetchSystemSettings();
      if (remoteSettings) {
        setSystemSettings(remoteSettings);
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
        if (remotePage) setSiteContent(prev => mergeSiteContentWithDefaults({ ...prev, ...remotePage }));
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
  const updateSiteContent = async (newContent: Partial<SiteContent>, user: { id: string; name: string; role: UserRole }): Promise<{ok: boolean, error?: string}> => {
    const updated = { ...siteContent, ...newContent };
    const res = await SupabaseSync.savePageContent('home', 'Rima Bank Landing Page', updated, updated.seo?.metaDescription);
    if (!res.success) return { ok: false, error: res.error };
    setSiteContent(updated);
    logAuditAction({
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      action: 'UPDATE',
      resourceType: 'LANDING_PAGE',
      resourceTitle: 'Landing Page Content',
      details: `Updated landing page sections by ${user.name}`
    });
    return { ok: true };
  };

  const resetSiteContent = async (): Promise<{ok: boolean, error?: string}> => {
    const res = await SupabaseSync.savePageContent('home', 'Rima Bank Landing Page', initialSiteContent);
    if (!res.success) return { ok: false, error: res.error };
    setSiteContent(initialSiteContent);
    return { ok: true };
  };

  // Promotions Methods
  const addPromotion = async (promoData: Omit<Promotion, 'id' | 'createdAt' | 'updatedAt'>, user: { id: string; name: string; role: UserRole }): Promise<{ok: boolean, error?: string}> => {
    const id = generateUUID();
    const newPromo: Promotion = {
      ...promoData,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const res = await SupabaseSync.savePromotion(newPromo);
    if (!res.success) return { ok: false, error: res.error };
    setPromotions(prev => [newPromo, ...prev]);
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
    return { ok: true };
  };

  const updatePromotion = async (id: string, updates: Partial<Promotion>, user: { id: string; name: string; role: UserRole }): Promise<{ok: boolean, error?: string}> => {
    const p = promotions.find(p => p.id === id);
    if (!p) return { ok: false, error: 'Not found' };
    const updated = { ...p, ...updates, updatedAt: new Date().toISOString() };
    const res = await SupabaseSync.savePromotion(updated);
    if (!res.success) return { ok: false, error: res.error };
    setPromotions(prev => prev.map(item => item.id === id ? updated : item));
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
    return { ok: true };
  };

  const deletePromotion = async (id: string, user: { id: string; name: string; role: UserRole }): Promise<{ok: boolean, error?: string}> => {
    const target = promotions.find(p => p.id === id);
    if (!target) return { ok: false, error: 'Not found' };
    const res = await SupabaseSync.deletePromotion(id);
    if (!res.success) return { ok: false, error: res.error };
    setPromotions(prev => prev.filter(p => p.id !== id));
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
    return { ok: true };
  };

  // Announcements Methods
  const addAnnouncement = async (annData: Omit<Announcement, 'id' | 'createdAt' | 'updatedAt'>, user: { id: string; name: string; role: UserRole }): Promise<{ok: boolean, error?: string}> => {
    const id = generateUUID();
    const newAnn: Announcement = {
      ...annData,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const res = await SupabaseSync.saveAnnouncement(newAnn);
    if (!res.success) return { ok: false, error: res.error };
    setAnnouncements(prev => [newAnn, ...prev]);
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
    return { ok: true };
  };

  const updateAnnouncement = async (id: string, updates: Partial<Announcement>, user: { id: string; name: string; role: UserRole }): Promise<{ok: boolean, error?: string}> => {
    const a = announcements.find(item => item.id === id);
    if (!a) return { ok: false, error: 'Not found' };
    const updated = { ...a, ...updates, updatedAt: new Date().toISOString() };
    const res = await SupabaseSync.saveAnnouncement(updated);
    if (!res.success) return { ok: false, error: res.error };
    setAnnouncements(prev => prev.map(item => item.id === id ? updated : item));
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
    return { ok: true };
  };

  const deleteAnnouncement = async (id: string, user: { id: string; name: string; role: UserRole }): Promise<{ok: boolean, error?: string}> => {
    const target = announcements.find(a => a.id === id);
    if (!target) return { ok: false, error: 'Not found' };
    const res = await SupabaseSync.deleteAnnouncement(id);
    if (!res.success) return { ok: false, error: res.error };
    setAnnouncements(prev => prev.filter(a => a.id !== id));
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
    return { ok: true };
  };

  // Publications Methods
  const addPublication = async (pubData: Omit<Publication, 'id' | 'createdAt' | 'updatedAt'>, user: { id: string; name: string; role: UserRole }): Promise<{ok: boolean, error?: string}> => {
    const id = generateUUID();
    const newPub: Publication = {
      ...pubData,
      id,
      viewsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const res = await SupabaseSync.saveNewsArticle(newPub);
    if (!res.success) return { ok: false, error: res.error };
    setPublications(prev => [newPub, ...prev]);
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
    return { ok: true };
  };

  const updatePublication = async (id: string, updates: Partial<Publication>, user: { id: string; name: string; role: UserRole }): Promise<{ok: boolean, error?: string}> => {
    const p = publications.find(item => item.id === id);
    if (!p) return { ok: false, error: 'Not found' };
    const updated = { ...p, ...updates, updatedAt: new Date().toISOString() };
    const res = await SupabaseSync.saveNewsArticle(updated);
    if (!res.success) return { ok: false, error: res.error };
    setPublications(prev => prev.map(item => item.id === id ? updated : item));
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
    return { ok: true };
  };

  const deletePublication = async (id: string, user: { id: string; name: string; role: UserRole }): Promise<{ok: boolean, error?: string}> => {
    const target = publications.find(p => p.id === id);
    if (!target) return { ok: false, error: 'Not found' };
    const res = await SupabaseSync.deleteNewsArticle(id);
    if (!res.success) return { ok: false, error: res.error };
    setPublications(prev => prev.filter(p => p.id !== id));
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
    return { ok: true };
  };

  // Enquiries Methods
  const addEnquiry = async (enquiryData: Omit<Enquiry, 'id' | 'ticketNumber' | 'createdAt' | 'updatedAt' | 'internalNotes' | 'responses'>): Promise<{ok: boolean, error?: string}> => {
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
    const res = await SupabaseSync.saveContactMessage({
      name: enquiryData.name,
      email: enquiryData.email,
      phone: enquiryData.phone,
      subject: enquiryData.subject,
      message: enquiryData.message
    });
    if (!res.success) return { ok: false, error: 'Failed to save enquiry' };
    setEnquiries(prev => [newEnq, ...prev]);
    return { ok: true };
  };

  const updateEnquiryStatus = async (id: string, status: Enquiry['status'], user: { id: string; name: string; role: UserRole }): Promise<{ok: boolean, error?: string}> => {
    const e = enquiries.find(item => item.id === id);
    if (!e) return { ok: false, error: 'Not found' };
    const updated = { ...e, status, updatedAt: new Date().toISOString() };
    const res = await SupabaseSync.updateContactMessage(id, { status });
    if (!res) return { ok: false, error: 'Update failed' }; // Note: updateContactMessage returns boolean currently! wait, let's just check res.success if it returns that, but in supabaseSync updateContactMessage returns boolean!
    // Ah, updateContactMessage returns boolean. I will just check res.
    setEnquiries(prev => prev.map(item => item.id === id ? updated : item));
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
    return { ok: true };
  };

  const assignEnquiry = async (id: string, staffId: string, staffName: string, user: { id: string; name: string; role: UserRole }): Promise<{ok: boolean, error?: string}> => {
    const e = enquiries.find(item => item.id === id);
    if (!e) return { ok: false, error: 'Not found' };
    const newStatus = e.status === 'unread' ? 'in_progress' : e.status;
    const updated: Enquiry = {
      ...e,
      assignedTo: staffId,
      assignedToName: staffName,
      status: newStatus,
      updatedAt: new Date().toISOString()
    };
    const res = await SupabaseSync.updateContactMessage(id, {
      assignedTo: staffId,
      assignedToName: staffName,
      status: newStatus
    });
    if (!res) return { ok: false, error: 'Failed to update' };
    setEnquiries(prev => prev.map(item => item.id === id ? updated : item));
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
    return { ok: true };
  };

  const addEnquiryNote = async (id: string, note: string, author: string): Promise<{ok: boolean, error?: string}> => {
    const e = enquiries.find(item => item.id === id);
    if (!e) return { ok: false, error: 'Not found' };
    const newNote = {
      id: generateUUID(),
      author,
      note,
      createdAt: new Date().toISOString()
    };
    const updatedNotes = [...e.internalNotes, newNote];
    const res = await SupabaseSync.updateContactMessage(id, { internalNotes: updatedNotes });
    if (!res) return { ok: false, error: 'Failed to update' };
    setEnquiries(prev => prev.map(item => item.id === id ? { ...item, internalNotes: updatedNotes, updatedAt: new Date().toISOString() } : item));
    return { ok: true };
  };

  const respondToEnquiry = async (id: string, message: string, user: { id: string; name: string; role: UserRole }): Promise<{ok: boolean, error?: string}> => {
    const e = enquiries.find(item => item.id === id);
    if (!e) return { ok: false, error: 'Not found' };
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
    const res = await SupabaseSync.updateContactMessage(id, {
      responses: updatedResponses,
      status: 'resolved',
      adminReply: message
    });
    if (!res) return { ok: false, error: 'Failed to update' };
    setEnquiries(prev => prev.map(item => item.id === id ? updated : item));
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
    return { ok: true };
  };

  const deleteEnquiry = async (id: string, user: { id: string; name: string; role: UserRole }): Promise<{ok: boolean, error?: string}> => {
    const target = enquiries.find(e => e.id === id);
    if (!target) return { ok: false, error: 'Not found' };
    const res = await SupabaseSync.deleteContactMessage(id);
    if (!res.success) return { ok: false, error: res.error };
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
    return { ok: true };
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
  const addStaffUser = async (staffData: Omit<StaffUser, 'id' | 'createdAt'>, currentUser: { id: string; name: string; role: UserRole }): Promise<{ok: boolean, error?: string}> => {
    try {
      const id = generateUUID();
      const newStaff: StaffUser = {
        ...staffData,
        id,
        createdAt: new Date().toISOString(),
        assignedEnquiriesCount: 0
      };
      const res = await SupabaseSync.saveStaffUser(newStaff);
      if (!res.success && res.error) {
        // Still persist to local state store if offline, but note warning
        console.warn('[CMSContext] SupabaseSync saveStaffUser warning:', res.error);
      }
      setStaffUsers(prev => [newStaff, ...prev]);

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
      return { ok: true };
    } catch (err: any) {
      return { ok: false, error: err?.message || 'Failed to add staff user' };
    }
  };

  const updateStaffUser = async (id: string, updates: Partial<StaffUser>, currentUser: { id: string; name: string; role: UserRole }): Promise<{ok: boolean, error?: string}> => {
    const s = staffUsers.find(item => item.id === id);
    if (!s) return { ok: false, error: 'Staff member not found' };
    const updated = { ...s, ...updates };
    const res = await SupabaseSync.saveStaffUser(updated);
    if (!res.success && res.error) {
      console.warn('[CMSContext] SupabaseSync updateStaffUser warning:', res.error);
    }
    setStaffUsers(prev => prev.map(item => item.id === id ? updated : item));
    logAuditAction({
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      action: 'UPDATE',
      resourceType: 'USER',
      resourceId: id,
      resourceTitle: updated.name,
      details: `Updated staff profile for ${updated.name}`
    });
    return { ok: true };
  };

  const toggleStaffStatus = async (id: string, currentUser: { id: string; name: string; role: UserRole }): Promise<{ok: boolean, error?: string}> => {
    const s = staffUsers.find(item => item.id === id);
    if (!s) return { ok: false, error: 'Staff member not found' };
    const newStatus = s.status === 'active' ? 'suspended' : 'active';
    const updated = { ...s, status: newStatus as 'active' | 'suspended' };
    const res = await SupabaseSync.saveStaffUser(updated);
    if (!res.success && res.error) {
      console.warn('[CMSContext] SupabaseSync toggleStaffStatus warning:', res.error);
    }
    setStaffUsers(prev => prev.map(item => item.id === id ? updated : item));
    logAuditAction({
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      action: 'UPDATE',
      resourceType: 'USER',
      resourceId: id,
      resourceTitle: updated.name,
      details: `Changed staff status for ${updated.name} to ${newStatus}`
    });
    return { ok: true };
  };

  const deleteStaffUser = async (id: string, currentUser: { id: string; name: string; role: UserRole }): Promise<{ok: boolean, error?: string}> => {
    const s = staffUsers.find(item => item.id === id);
    if (!s) return { ok: false, error: 'Staff member not found' };
    const res = await SupabaseSync.deleteStaffUser(id);
    if (!res.success && res.error) {
      console.warn('[CMSContext] SupabaseSync deleteStaffUser warning:', res.error);
    }
    setStaffUsers(prev => prev.filter(item => item.id !== id));
    logAuditAction({
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      action: 'DELETE',
      resourceType: 'USER',
      resourceId: id,
      resourceTitle: s.name,
      details: `Deleted staff account for ${s.name} (${s.email})`
    });
    return { ok: true };
  };

  // Settings
  const updateSystemSettings = async (updates: Partial<SystemSettings>, user: { id: string; name: string; role: UserRole }): Promise<{ok: boolean, error?: string}> => {
    const updated = { ...systemSettings, ...updates };
    const res = await SupabaseSync.saveSystemSettings(updated);
    if (!res.success) return { ok: false, error: res.error };
    setSystemSettings(updated);
    logAuditAction({
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      action: 'UPDATE',
      resourceType: 'SETTINGS',
      resourceTitle: 'System Settings',
      details: `Updated core system configuration by ${user.name}`
    });
    return { ok: true };
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

  const deletePopupConfig = async (id: string, user: { id: string; name: string; role: UserRole }): Promise<{ ok: boolean; error?: string }> => {
    const target = popupConfigs.find(p => p.id === id);
    const res = await SupabaseSync.deletePopupConfig(id);

    if (!res.success) {
      return { ok: false, error: res.error };
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

    return { ok: true };
  };

  const togglePopupStatus = async (id: string, user: { id: string; name: string; role: UserRole }): Promise<{ ok: boolean; error?: string }> => {
    const target = popupConfigs.find(p => p.id === id);
    if (!target) return { ok: false, error: 'Popup not found' };

    const newStatus = target.status === 'active' ? 'paused' : 'active';
    return await updatePopupConfig(id, { status: newStatus }, user);
  };

  // ==========================================================================
  // Newsletter Operations
  // ==========================================================================
  const subscribeNewsletter = async (email: string, source: string = 'Website Footer'): Promise<{ ok: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { ok: false, error: 'Please enter a valid email address.' };
    }

    const existing = subscribers.find(s => s.email.toLowerCase() === cleanEmail);
    if (existing) {
      if (existing.status === 'subscribed') {
        return { ok: true }; // Already subscribed
      }
      // Re-subscribe
      const updated: NewsletterSubscriber = {
        ...existing,
        status: 'subscribed',
        unsubscribedAt: undefined,
        subscribedAt: new Date().toISOString()
      };
      setSubscribers(prev => prev.map(s => s.id === existing.id ? updated : s));
      await SupabaseSync.saveNewsletterSubscriber(updated);
      return { ok: true };
    }

    const newSub: NewsletterSubscriber = {
      id: generateUUID(),
      email: cleanEmail,
      status: 'subscribed',
      source,
      subscribedAt: new Date().toISOString()
    };

    setSubscribers(prev => [newSub, ...prev]);
    await SupabaseSync.saveNewsletterSubscriber(newSub);
    return { ok: true };
  };

  const unsubscribeNewsletter = async (idOrEmail: string, user?: { id: string; name: string; role: UserRole }): Promise<{ ok: boolean; error?: string }> => {
    const target = subscribers.find(s => s.id === idOrEmail || s.email.toLowerCase() === idOrEmail.toLowerCase());
    if (!target) return { ok: false, error: 'Subscriber not found' };

    const updated: NewsletterSubscriber = {
      ...target,
      status: 'unsubscribed',
      unsubscribedAt: new Date().toISOString()
    };

    setSubscribers(prev => prev.map(s => s.id === target.id ? updated : s));
    await SupabaseSync.saveNewsletterSubscriber(updated);

    if (user) {
      logAuditAction({
        userId: user.id,
        userName: user.name,
        userRole: user.role,
        action: 'UPDATE',
        resourceType: 'NEWSLETTER',
        resourceId: target.id,
        resourceTitle: target.email,
        details: `Unsubscribed ${target.email} from newsletter audience`
      });
    }

    return { ok: true };
  };

  const toggleSubscriberStatus = async (id: string, user: { id: string; name: string; role: UserRole }): Promise<{ ok: boolean; error?: string }> => {
    const target = subscribers.find(s => s.id === id);
    if (!target) return { ok: false, error: 'Subscriber not found' };

    const nextStatus = target.status === 'subscribed' ? 'unsubscribed' : 'subscribed';
    const updated: NewsletterSubscriber = {
      ...target,
      status: nextStatus,
      unsubscribedAt: nextStatus === 'unsubscribed' ? new Date().toISOString() : undefined
    };

    setSubscribers(prev => prev.map(s => s.id === id ? updated : s));
    await SupabaseSync.saveNewsletterSubscriber(updated);

    logAuditAction({
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      action: 'UPDATE',
      resourceType: 'NEWSLETTER',
      resourceId: target.id,
      resourceTitle: target.email,
      details: `Changed newsletter status for ${target.email} to ${nextStatus}`
    });

    return { ok: true };
  };

  const deleteSubscriber = async (id: string, user: { id: string; name: string; role: UserRole }): Promise<{ ok: boolean; error?: string }> => {
    const target = subscribers.find(s => s.id === id);
    if (!target) return { ok: false, error: 'Subscriber not found' };

    setSubscribers(prev => prev.filter(s => s.id !== id));
    await SupabaseSync.deleteNewsletterSubscriber(id);

    logAuditAction({
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      action: 'DELETE',
      resourceType: 'NEWSLETTER',
      resourceId: id,
      resourceTitle: target.email,
      details: `Permanently removed ${target.email} from subscriber list`
    });

    return { ok: true };
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
        deleteStaffUser,
        auditLogs,
        logAuditAction,
        systemSettings,
        updateSystemSettings,
        popupConfigs,
        addPopupConfig,
        updatePopupConfig,
        deletePopupConfig,
        togglePopupStatus,
        subscribers,
        subscribeNewsletter,
        unsubscribeNewsletter,
        deleteSubscriber,
        toggleSubscriberStatus,
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

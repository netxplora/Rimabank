export type ContentStatus = 'draft' | 'review' | 'approved' | 'published' | 'scheduled' | 'archived';
export type UserRole = 'admin' | 'staff';
export type PriorityLevel = 'low' | 'normal' | 'high' | 'urgent';

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'PUBLISH' | 'UNPUBLISH' | 'APPROVE' | 'LOGIN' | 'ROLE_CHANGE' | 'SETTINGS_CHANGE';
  resourceType: 'LANDING_PAGE' | 'PROMOTION' | 'ANNOUNCEMENT' | 'PUBLICATION' | 'ENQUIRY' | 'MEDIA' | 'USER' | 'SETTINGS';
  resourceId?: string;
  resourceTitle?: string;
  details: string;
  oldValues?: Record<string, any>;
  newValues?: Record<string, any>;
  timestamp: string;
  ipAddress?: string;
}

export interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  status: 'active' | 'suspended' | 'inactive';
  lastLogin?: string;
  createdAt: string;
  assignedEnquiriesCount?: number;
}

export interface MediaUsageReference {
  type: 'landing_page' | 'promotion' | 'publication' | 'announcement' | 'testimonial' | 'product';
  title: string;
  location: string;
}

export interface MediaAsset {
  id: string;
  title: string;
  fileName: string;
  url: string;
  storagePath?: string;
  fileSize: number; // in bytes
  fileType: string;
  dimensions?: { width: number; height: number };
  altText: string;
  caption?: string;
  description?: string;
  category: 'general' | 'banners' | 'products' | 'team' | 'documents';
  tags?: string[];
  isArchived?: boolean;
  uploadedBy: string;
  uploadedById?: string;
  uploadedAt: string;
  updatedAt?: string;
  deletedAt?: string;
  usedInCount?: number;
  usedIn?: MediaUsageReference[];
}

export interface Promotion {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  badgeText: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  terms: string[];
  status: ContentStatus;
  priority: number; // higher = higher display priority
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  approvedBy?: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  category: 'general' | 'maintenance' | 'security' | 'feature' | 'regulatory';
  priority: PriorityLevel;
  displayAsBanner: boolean; // if true, shows in the top alert banner
  actionText?: string;
  actionLink?: string;
  status: ContentStatus;
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface Publication {
  id: string;
  title: string;
  slug: string;
  category: 'News' | 'Press Release' | 'Financial Report' | 'Statement' | 'Bank Notice';
  excerpt: string;
  content: string; // HTML / Rich Text
  featuredImage: string;
  author: string;
  readTime: string;
  status: ContentStatus;
  publishDate: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  approvedBy?: string;
  viewsCount?: number;
}

export interface Enquiry {
  id: string;
  ticketNumber: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  category: 'Account Opening' | 'Loans & Credit' | 'Agent Banking' | 'Digital Banking' | 'Cards' | 'General Support' | 'Complaint';
  message: string;
  status: 'unread' | 'read' | 'in_progress' | 'resolved' | 'closed' | 'archived';
  priority: PriorityLevel;
  assignedTo?: string; // staff ID
  assignedToName?: string;
  internalNotes: {
    id: string;
    author: string;
    note: string;
    createdAt: string;
  }[];
  responses: {
    id: string;
    sender: string;
    senderRole: UserRole;
    message: string;
    sentAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface HeroContent {
  eyebrow: string;
  headingPart1: string;
  headingHighlight: string;
  headingPart2: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  supportPhone: string;
  supportEmail: string;
  heroImage: string;
  activeUsersCount: string;
  activeUsersLabel: string;
  ratingScore: string;
  ratingLabel: string;
}

export interface TrustStat {
  id: string;
  value: string;
  label: string;
  description?: string;
}

export interface ProductItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  link: string;
  badge?: string;
  highlighted?: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  avatarUrl: string;
  rating: number;
}

export interface BranchItem {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  hours: string;
  isHeadquarters?: boolean;
}

export interface SiteContent {
  hero: HeroContent;
  trustStats: TrustStat[];
  regulatoryText: string;
  aboutSnapshot: {
    eyebrow: string;
    heading: string;
    description1: string;
    description2: string;
    stats: { value: string; label: string }[];
    mission: string;
    vision: string;
  };
  agentBanking: {
    badge: string;
    heading: string;
    description: string;
    features: string[];
    ctaText: string;
    ctaLink: string;
    statValue: string;
    statLabel: string;
  };
  smeBanking: {
    badge: string;
    heading: string;
    description: string;
    benefits: string[];
    ctaText: string;
    ctaLink: string;
  };
  studentBanking: {
    badge: string;
    heading: string;
    description: string;
    benefits: string[];
    ctaText: string;
    ctaLink: string;
  };
  securitySection: {
    badge: string;
    heading: string;
    description: string;
    features: { title: string; desc: string }[];
  };
  products: ProductItem[];
  testimonials: TestimonialItem[];
  branches: BranchItem[];
  contactInfo: {
    headquarters: string;
    phone: string;
    whatsapp: string;
    email: string;
    supportHours: string;
  };
  footer: {
    description: string;
    cbnDisclaimer: string;
    ndicDisclaimer: string;
    copyrightText: string;
    facebookUrl: string;
    twitterUrl: string;
    linkedinUrl: string;
    instagramUrl: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    canonicalUrl: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    keywords: string[];
    allowIndexing: boolean;
  };
}

export interface SystemSettings {
  siteName: string;
  tagline: string;
  maintenanceMode: boolean;
  maintenanceMessage: string;
  enableAlertBanner: boolean;
  allowPublicEnquiries: boolean;
  sessionTimeoutMinutes: number;
  passwordPolicyMinLength: number;
  maxUploadSizeBytes: number; // default 5MB (5242880)
}

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

export const initialSiteContent: SiteContent = {
  hero: {
    eyebrow: "CBN Licensed Microfinance Bank • NDIC Insured",
    headingPart1: "Empowering Your",
    headingHighlight: "Financial Future",
    headingPart2: "With Modern Banking",
    description: "Experience secure, accessible, and personalized banking services designed to grow your wealth, fund your business, and simplify everyday payments.",
    primaryCtaText: "Open an Account",
    primaryCtaLink: "/contact",
    secondaryCtaText: "Explore Loan Services",
    secondaryCtaLink: "/loans",
    supportPhone: "+234 (0) 803 123 4567",
    supportEmail: "support@rimamfb.com",
    heroImage: "/images/hero-home.png",
    activeUsersCount: "50,000+",
    activeUsersLabel: "Active Accountholders",
    ratingScore: "99.8%",
    ratingLabel: "Uptime & Reliability"
  },
  trustStats: [
    { id: '1', value: '₦15B+', label: 'Deposits Protected', description: 'Safeguarded with top-tier regulatory security' },
    { id: '2', value: '25,000+', label: 'SME Businesses Funded', description: 'Driving local economic development' },
    { id: '3', value: '250+', label: 'Active Agent Outlets', description: 'Delivering banking directly to communities' },
    { id: '4', value: '99.9%', label: 'Transaction Success', description: 'Fast settlement and round-the-clock reliability' }
  ],
  regulatoryText: "Rima Microfinance Bank is fully licensed by the Central Bank of Nigeria (CBN) and all deposits are insured by the Nigeria Deposit Insurance Corporation (NDIC).",
  aboutSnapshot: {
    eyebrow: "Our Institutional Purpose",
    heading: "Building Community Prosperity Through Inclusive Financial Services",
    description1: "Rima Microfinance Bank was established with a singular vision: to democratize access to financial capital, elevate micro, small, and medium enterprises, and provide reliable savings solutions for families across Nigeria.",
    description2: "Combining strong local community relationships with contemporary digital banking technology, we ensure every artisan, merchant, entrepreneur, and student receives the attention and financial support they deserve.",
    featuredImage: "/images/hero-about.png",
    stats: [
      { value: '15+ Years', label: 'Institutional Heritage' },
      { value: '₦50M', label: 'Single Facility Capacity' },
      { value: '100%', label: 'Regulatory Compliance' }
    ],
    mission: "To provide accessible, ethical, and technology-driven financial solutions that empower grassroots entrepreneurs and enhance family livelihoods.",
    vision: "To become the benchmark microfinance institution recognized for integrity, customer-centricity, and sustainable financial inclusion.",
    governanceHeading: "Experienced executive leadership.",
    governanceSubheading: "Guided by experienced financial professionals with decades of combined commercial banking expertise, corporate governance rigor, and regulatory knowledge.",
    governanceTeam: [
      {
        id: "gov-1",
        name: "Pastor Jonathan Tobin",
        role: "Managing Director / CEO",
        bio: "With over 25 years of leadership experience in Nigerian banking, Pastor Tobin directs Rima MFB's mission of expanding financial inclusion and sustainable credit access.",
        image: "/images/team-ceo.jpg",
        linkedin: "#",
        twitter: "#"
      },
      {
        id: "gov-2",
        name: "Otonye Mac-Barango",
        role: "Group Company Secretary & Legal Adviser",
        bio: "An experienced legal counsel ensuring statutory corporate governance, compliance adherence, and regulatory alignment with Central Bank of Nigeria mandates.",
        image: "/images/secretary.jpg",
        linkedin: "#"
      },
      {
        id: "gov-3",
        name: "Sokari Josiah Monday",
        role: "Head, Internal Control & Audit",
        bio: "Enforces rigorous accountability frameworks, continuous financial risk surveillance, and operational integrity across all branch operations.",
        image: "/images/Sokari.jpg",
        linkedin: "#"
      }
    ]
  },
  agentBanking: {
    badge: "Rima Agency Network",
    heading: "Bring Banking Directly to Your Neighborhood",
    description: "Become a certified Rima MFB POS Agent and earn steady income while providing vital cash withdrawals, deposits, utility payments, and transfers to your local community.",
    features: [
      "Competitive commission structure paid promptly",
      "Reliable dual-SIM biometric POS terminal with high uptime",
      "Dedicated relationship officer and prompt dispute resolution",
      "Zero hidden maintenance charges on merchant terminals"
    ],
    ctaText: "Apply as an Agent",
    ctaLink: "/agent-banking",
    statValue: "250+",
    statLabel: "Accredited Banking Agents"
  },
  smeBanking: {
    badge: "Commercial & Business Capital",
    heading: "Structured Credit to Scale Your Enterprise",
    description: "From seasonal inventory financing to long-term equipment acquisition, our commercial facilities are tailored to your business cash flow cycles.",
    benefits: [
      "Fast 48-hour credit approval upon full documentation",
      "Flexible tenors extending up to 24 months",
      "Competitive, transparent monthly interest calculation",
      "Dedicated SME relationship manager"
    ],
    ctaText: "Explore Business Banking",
    ctaLink: "/business-banking"
  },
  studentBanking: {
    badge: "Youth & Campus Banking",
    heading: "Smart Accounts for Tomorrow's Leaders",
    description: "Designed for university and polytechnic students with zero minimum opening balance, fast digital card issuance, and zero maintenance fee charges.",
    benefits: [
      "Zero account maintenance fees",
      "Instant virtual card for campus and online transactions",
      "Special student savings club with bonus interest",
      "Easy mobile banking access anywhere"
    ],
    ctaText: "Open Student Account",
    ctaLink: "/personal-banking"
  },
  securitySection: {
    badge: "Institutional Security",
    heading: "Bank-Grade Protection for Every Naira",
    description: "We employ end-to-end encryption, multi-factor authorization, and real-time fraud monitoring to guarantee the safety of your funds.",
    features: [
      { title: "256-Bit SSL Encryption", desc: "All data transfers and digital transactions are guarded by high-grade cryptographic protocols." },
      { title: "NDIC Insurance Guarantee", desc: "Your savings and deposits are insured under the statutory provisions of the NDIC." },
      { title: "24/7 Fraud Surveillance", desc: "Automated anomaly detection immediately flags and halts suspicious transactional behavior." },
      { title: "CBN Regulatory Compliance", desc: "Operated in strict adherence to Central Bank of Nigeria prudential guidelines." }
    ]
  },
  products: [
    { id: '1', title: 'Regular Savings Account', description: 'Daily interest accrual with flexible withdrawals and zero opening restrictions.', iconName: 'PiggyBank', link: '/personal-banking', badge: 'Popular' },
    { id: '2', title: 'Target Savings Plan', description: 'Discipline-driven automated savings for school fees, rent, or capital projects with bonus yields.', iconName: 'Target', link: '/personal-banking' },
    { id: '3', title: 'Fixed Term Deposit', description: 'Lock in surplus liquidity for 30 to 365 days at competitive guaranteed return rates.', iconName: 'Lock', link: '/personal-banking' },
    { id: '4', title: 'SME Commercial Loan', description: 'Working capital financing designed for registered businesses up to ₦50 Million.', iconName: 'Briefcase', link: '/business-banking', highlighted: true },
    { id: '5', title: 'Micro-Credit Facility', description: 'Rapid, collateral-friendly credit for market traders, artisans, and small store owners.', iconName: 'Users', link: '/loans' },
    { id: '6', title: 'Agent Banking POS', description: 'Turn your retail shop into a full-service banking hub and earn monthly commissions.', iconName: 'Store', link: '/agent-banking' }
  ],
  testimonials: [
    {
      id: '1',
      name: 'Alhaji Ibrahim Danladi',
      role: 'Grain Merchant & Wholesaler',
      company: 'Danladi Agro Ventures',
      content: 'Rima MFB funded our grain warehouse expansion within 3 days of application. Their credit terms are honest, and their officers genuinely understand agribusiness.',
      avatarUrl: '/images/author-1.png',
      rating: 5
    },
    {
      id: '2',
      name: 'Mrs. Folashade Adebayo',
      role: 'Supermarket Owner',
      company: 'Grace Superstores',
      content: 'Having their POS terminal at our store eliminated settlement disputes. Transactions clear in seconds, and when we needed working capital for December, they came through.',
      avatarUrl: '/images/author-2.png',
      rating: 5
    },
    {
      id: '3',
      name: 'Engr. Chukwuma Obi',
      role: 'Director',
      company: 'Apex Logistics Ltd',
      content: 'The fixed deposit rates at Rima MFB consistently outperform commercial banks. Their customer care team is prompt, polite, and thoroughly professional.',
      avatarUrl: '/images/author-1.png',
      rating: 5
    }
  ],
  branches: [
    {
      id: '1',
      name: 'Main Headquarters & Flagship Branch',
      address: 'Plot 14, Commercial Avenue, Central Business District',
      city: 'Abuja',
      state: 'FCT',
      phone: '+234 (0) 803 123 4567',
      email: 'hq@rimamfb.com',
      hours: 'Mon - Fri: 8:00 AM - 4:00 PM',
      isHeadquarters: true
    },
    {
      id: '2',
      name: 'Wuse Commercial Branch',
      address: 'Shop 24, Zone 4 Commercial Plaza',
      city: 'Abuja',
      state: 'FCT',
      phone: '+234 (0) 803 123 4568',
      email: 'wuse@rimamfb.com',
      hours: 'Mon - Fri: 8:00 AM - 4:00 PM'
    },
    {
      id: '3',
      name: 'Garki Retail Center',
      address: '12 Herbert Macaulay Way, Garki Area 11',
      city: 'Abuja',
      state: 'FCT',
      phone: '+234 (0) 803 123 4569',
      email: 'garki@rimamfb.com',
      hours: 'Mon - Fri: 8:00 AM - 4:00 PM'
    }
  ],
  contactInfo: {
    headquarters: "Plot 14, Commercial Avenue, Central Business District, Abuja, Nigeria",
    phone: "+234 (0) 803 123 4567",
    whatsapp: "+234 803 123 4567",
    email: "contact@rimamfb.com",
    supportHours: "Monday – Friday: 8:00am – 5:00pm"
  },
  footer: {
    description: "Rima Microfinance Bank provides inclusive banking, credit facilities, and digital payment solutions to empower individuals and businesses across Nigeria.",
    cbnDisclaimer: "Licensed by the Central Bank of Nigeria (CBN).",
    ndicDisclaimer: "All deposits are fully insured by the Nigeria Deposit Insurance Corporation (NDIC).",
    copyrightText: "© 2026 Rima Microfinance Bank Limited. All rights reserved.",
    facebookUrl: "https://facebook.com/rimamfb",
    twitterUrl: "https://twitter.com/rimamfb",
    linkedinUrl: "https://linkedin.com/company/rimamfb",
    instagramUrl: "https://instagram.com/rimamfb"
  },
  seo: {
    metaTitle: "Rima Microfinance Bank | Inclusive Banking & Commercial Credit",
    metaDescription: "Licensed by CBN and insured by NDIC. Open high-yield savings accounts, access commercial SME loans, and experience trusted community banking across Nigeria.",
    canonicalUrl: "https://rimamfb.com",
    ogTitle: "Rima Microfinance Bank - Empowering Your Financial Future",
    ogDescription: "Safe, accessible, and technology-driven banking for families, entrepreneurs, and SMEs.",
    ogImage: "/images/hero-home.png",
    keywords: ["Rima Microfinance Bank", "SME Loans Nigeria", "POS Agent Banking", "CBN Licensed MFB", "Fixed Deposit Abuja"],
    allowIndexing: true
  }
};

export const initialPromotions: Promotion[] = [
  {
    id: 'promo-1',
    title: 'SME Growth Booster Loan Campaign',
    slug: 'sme-growth-booster-2026',
    subtitle: 'Access up to ₦10M with zero processing fee',
    badgeText: 'Seasonal Offer',
    description: 'Scale your business inventory with our limited-time reduced interest facility for registered trading and service businesses.',
    imageUrl: '/images/hero-home.png',
    ctaText: 'Apply for SME Loan',
    ctaLink: '/business-banking',
    terms: [
      'Applicable to registered businesses operating for at least 12 months',
      'Maximum facility tenor is 12 months with monthly repayment structure',
      'Zero application processing charges for submissions before month end',
      'Subject to standard credit bureau clearance and documentation verification'
    ],
    status: 'published',
    priority: 1,
    startDate: '2026-09-01T00:00:00Z',
    endDate: '2026-10-31T23:59:59Z',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-01T10:00:00Z',
    createdBy: 'Admin User',
    approvedBy: 'Admin User'
  },
  {
    id: 'promo-2',
    title: 'High-Yield Fixed Term Deposit Plus',
    slug: 'fixed-deposit-plus',
    subtitle: 'Earn up to 14.5% p.a. on 180-day tenors',
    badgeText: 'Investment Special',
    description: 'Maximize your idle cash returns with guaranteed yields backed by full NDIC deposit insurance protections.',
    imageUrl: '/images/hero-home.png',
    ctaText: 'Lock In Rates',
    ctaLink: '/personal-banking',
    terms: [
      'Minimum deposit amount: ₦500,000',
      'Early liquidation subject to adjusted standard savings interest rate',
      'Interest credited directly to savings account upon maturity'
    ],
    status: 'published',
    priority: 2,
    startDate: '2026-08-15T00:00:00Z',
    endDate: '2026-12-31T23:59:59Z',
    createdAt: '2026-08-15T09:00:00Z',
    updatedAt: '2026-08-15T09:00:00Z',
    createdBy: 'Admin User',
    approvedBy: 'Admin User'
  },
  {
    id: 'promo-3',
    title: 'Back-to-School Target Savings Bonus',
    slug: 'back-to-school-savings',
    subtitle: 'Extra 2% bonus yield for quarterly savers',
    badgeText: 'Education Fund',
    description: 'Automate weekly or monthly savings toward school fees and earn bonus interest with quarterly prize draws.',
    imageUrl: '/images/hero-home.png',
    ctaText: 'Start Target Plan',
    ctaLink: '/personal-banking',
    terms: [
      'Must maintain regular automated monthly deposits without withdrawals for 90 days',
      'Bonus yield calculated and credited at the end of the school term'
    ],
    status: 'draft',
    priority: 3,
    startDate: '2026-10-01T00:00:00Z',
    endDate: '2026-11-30T23:59:59Z',
    createdAt: '2026-09-03T11:00:00Z',
    updatedAt: '2026-09-03T11:00:00Z',
    createdBy: 'Staff Editor'
  }
];

export const initialAnnouncements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Scheduled Core Banking Maintenance Notice',
    message: 'We will perform scheduled system optimization on Sunday, Sept 14 between 1:00 AM and 3:30 AM. Mobile app and POS transfers may experience brief delays.',
    category: 'maintenance',
    priority: 'high',
    displayAsBanner: true,
    actionText: 'Read Notice',
    actionLink: '/media',
    status: 'published',
    startDate: '2026-09-04T00:00:00Z',
    endDate: '2026-09-15T00:00:00Z',
    createdAt: '2026-09-04T08:00:00Z',
    updatedAt: '2026-09-04T08:00:00Z',
    createdBy: 'Admin User'
  },
  {
    id: 'ann-2',
    title: 'CBN Regulatory Compliance Verification Drive',
    message: 'Accountholders are kindly reminded to ensure their BVN and NIN records are updated at any Rima MFB branch before the quarter end.',
    category: 'regulatory',
    priority: 'normal',
    displayAsBanner: false,
    actionText: 'Find Nearest Branch',
    actionLink: '/branches',
    status: 'published',
    startDate: '2026-09-01T00:00:00Z',
    endDate: '2026-09-30T23:59:59Z',
    createdAt: '2026-09-01T09:00:00Z',
    updatedAt: '2026-09-01T09:00:00Z',
    createdBy: 'Admin User'
  }
];

export const initialPublications: Publication[] = [
  {
    id: 'pub-1',
    title: 'Rima Microfinance Bank Expands Agency Network with 100 New POS Locations',
    slug: 'rima-mfb-expands-agency-network-2026',
    category: 'Bank Notice',
    excerpt: 'In line with our commitment to financial inclusion, Rima MFB has onboarded 100 new certified agency banking partners across the Federal Capital Territory.',
    content: `
      <p>Rima Microfinance Bank Limited is pleased to announce the deployment of 100 additional accredited agency banking locations. This initiative brings full banking services within walking distance for thousands of traders, artisans, and families.</p>
      <h3>Empowering Local Merchants</h3>
      <p>Each newly onboarded agent has been equipped with modern dual-SIM POS terminals capable of instant fund transfers, account opening, cash deposit processing, and utility bill settlements.</p>
      <p>Speaking on the milestone, the Managing Director noted: <em>"Financial inclusion is not merely a policy goal; it is a moral imperative. By equipping grassroots entrepreneurs with reliable banking terminals, we stimulate commerce and create sustainable jobs."</em></p>
      <h3>Security & Customer Protection</h3>
      <p>All transactions processed through the Rima Agency Network are protected with end-to-end encryption and real-time SMS notifications to ensure complete transparency.</p>
    `,
    featuredImage: '/images/hero-home.png',
    author: 'Corporate Communications',
    readTime: '3 min read',
    status: 'published',
    publishDate: '2026-09-02T10:00:00Z',
    seoTitle: 'Rima MFB Expands Agency Network with 100 New Locations',
    seoDescription: 'Rima Microfinance Bank onboarded 100 new agency banking POS outlets in Abuja to advance financial inclusion.',
    seoKeywords: ['Agency Banking', 'POS Terminal', 'Financial Inclusion', 'Rima MFB News'],
    createdAt: '2026-09-02T09:00:00Z',
    updatedAt: '2026-09-02T09:00:00Z',
    createdBy: 'Admin User',
    approvedBy: 'Admin User',
    viewsCount: 1420
  },
  {
    id: 'pub-2',
    title: 'Q2 2026 Financial Sustainability & Prudential Compliance Report',
    slug: 'q2-2026-financial-sustainability-report',
    category: 'Financial Report',
    excerpt: 'A comprehensive summary of Rima MFB capital adequacy, non-performing loan ratios, and deposit growth metrics for the second quarter of 2026.',
    content: `
      <p>Rima Microfinance Bank recorded another quarter of steady capital expansion, driven by disciplined portfolio management and strong deposit inflows from grassroots communities.</p>
      <h3>Key Performance Indicators</h3>
      <ul>
        <li><strong>Capital Adequacy Ratio (CAR):</strong> 19.4% (well above the regulatory threshold)</li>
        <li><strong>Deposit Growth:</strong> 18.2% quarter-on-quarter expansion</li>
        <li><strong>Non-Performing Loans (NPL):</strong> Maintained below 3.8%</li>
      </ul>
      <p>The Board of Directors extends sincere gratitude to our accountholders, whose trust continues to fortify our institutional standing.</p>
    `,
    featuredImage: '/images/hero-home.png',
    author: 'Finance & Risk Committee',
    readTime: '5 min read',
    status: 'published',
    publishDate: '2026-08-20T11:00:00Z',
    seoTitle: 'Q2 2026 Financial Sustainability Report | Rima MFB',
    seoDescription: 'Prudential metrics, capital adequacy, and financial growth highlights for Q2 2026.',
    seoKeywords: ['Financial Report', 'Prudential Metrics', 'Capital Adequacy', 'Rima Bank'],
    createdAt: '2026-08-20T08:00:00Z',
    updatedAt: '2026-08-20T08:00:00Z',
    createdBy: 'Admin User',
    approvedBy: 'Admin User',
    viewsCount: 890
  },
  {
    id: 'pub-3',
    title: 'Understanding Working Capital Loans for Small Retailers',
    slug: 'understanding-working-capital-loans',
    category: 'Articles',
    excerpt: 'A practical financial guide for store owners on how to calculate inventory turnover and utilize short-term credit effectively.',
    content: `
      <p>Managing inventory flow is the heartbeat of any retail enterprise. When sales surge during festive seasons or wholesale price discounts arise, having immediate access to working capital is invaluable.</p>
      <h3>When Should a Business Borrow?</h3>
      <p>Credit should always be tied to revenue-generating operational cycles. Borrowing to purchase fast-moving stock that can be liquidated within 30 to 60 days provides a healthy return on investment while comfortably covering interest costs.</p>
    `,
    featuredImage: '/images/hero-home.png',
    author: 'Credit Advisory Desk',
    readTime: '4 min read',
    status: 'draft',
    publishDate: '2026-09-08T09:00:00Z',
    seoTitle: 'Guide to Working Capital Loans for Small Retailers',
    seoDescription: 'Learn how to leverage commercial credit to expand retail inventory safely.',
    createdAt: '2026-09-03T14:00:00Z',
    updatedAt: '2026-09-03T14:00:00Z',
    createdBy: 'Staff Editor',
    viewsCount: 0
  }
];

export const initialEnquiries: Enquiry[] = [
  {
    id: 'enq-1',
    ticketNumber: 'RMB-2026-0891',
    name: 'Musa Abdullahi',
    email: 'musa.abdullahi@example.com',
    phone: '+234 802 334 5566',
    subject: 'Inquiry regarding ₦5M SME Working Capital Loan',
    category: 'Loans & Credit',
    message: 'Good day. I operate a wholesale agricultural produce business in Garki. I would like to know the required guarantor documentation and tenor options for a ₦5,000,000 facility.',
    status: 'unread',
    priority: 'high',
    internalNotes: [],
    responses: [],
    createdAt: '2026-09-04T08:15:00Z',
    updatedAt: '2026-09-04T08:15:00Z'
  },
  {
    id: 'enq-2',
    ticketNumber: 'RMB-2026-0890',
    name: 'Blessing Okon',
    email: 'blessing.okon@example.com',
    phone: '+234 813 445 6677',
    subject: 'Application to become an accredited POS Agent',
    category: 'Agent Banking',
    message: 'Hello, I have a pharmacy store in Wuse 2 with heavy pedestrian traffic. Please send me the requirements and setup fee breakdown to acquire a Rima POS terminal.',
    status: 'in_progress',
    priority: 'normal',
    assignedTo: 'staff-2',
    assignedToName: 'Sarah Danladi (Support Officer)',
    internalNotes: [
      {
        id: 'note-1',
        author: 'Sarah Danladi',
        note: 'Customer called and verified business address. Sent the Agent Onboarding PDF kit to her email.',
        createdAt: '2026-09-03T14:30:00Z'
      }
    ],
    responses: [
      {
        id: 'resp-1',
        sender: 'Sarah Danladi',
        senderRole: 'staff',
        message: 'Dear Blessing, Thank you for your interest in the Rima Agency Network. We have forwarded the onboarding brochure and terminal pricing to your email address.',
        sentAt: '2026-09-03T14:35:00Z'
      }
    ],
    createdAt: '2026-09-03T11:20:00Z',
    updatedAt: '2026-09-03T14:35:00Z'
  },
  {
    id: 'enq-3',
    ticketNumber: 'RMB-2026-0889',
    name: 'Kazeem Oladipo',
    email: 'kazeem.oladipo@example.com',
    phone: '+234 809 556 7788',
    subject: 'Corporate Fixed Deposit Rates Inquiry for NGO Funds',
    category: 'Account Opening',
    message: 'We are seeking a 12-month fixed deposit facility for institutional funds amounting to ₦20 Million. Kindly provide your current interest rate schedule.',
    status: 'resolved',
    priority: 'high',
    assignedTo: 'staff-1',
    assignedToName: 'Admin User',
    internalNotes: [
      {
        id: 'note-2',
        author: 'Admin User',
        note: 'Treasury desk quoted 15.0% for 365 days. Customer accepted and visited HQ to finalize KYC.',
        createdAt: '2026-09-02T16:00:00Z'
      }
    ],
    responses: [
      {
        id: 'resp-2',
        sender: 'Admin User',
        senderRole: 'admin',
        message: 'Dear Mr. Oladipo, Our Senior Relationship Manager has prepared a customized yield proposal for your NGO. Please find the documentation attached.',
        sentAt: '2026-09-02T15:45:00Z'
      }
    ],
    createdAt: '2026-09-02T10:00:00Z',
    updatedAt: '2026-09-02T16:00:00Z'
  }
];

export const initialMediaAssets: MediaAsset[] = [
  {
    id: 'med-1',
    title: 'Rima Bank Flagship Office & Customer Service Desk',
    fileName: 'hero-home.png',
    url: '/images/hero-home.png',
    fileSize: 1845000,
    fileType: 'image/png',
    dimensions: { width: 1920, height: 1080 },
    altText: 'Rima Bank modern banking hall and advisory desk',
    category: 'banners',
    uploadedBy: 'Admin User',
    uploadedAt: '2026-08-01T10:00:00Z',
    usedInCount: 4
  },
  {
    id: 'med-2',
    title: 'Commercial Executive Portrait 1',
    fileName: 'author-1.png',
    url: '/images/author-1.png',
    fileSize: 420000,
    fileType: 'image/png',
    dimensions: { width: 500, height: 500 },
    altText: 'Customer testimonial portrait',
    category: 'team',
    uploadedBy: 'Admin User',
    uploadedAt: '2026-08-05T12:00:00Z',
    usedInCount: 2
  },
  {
    id: 'med-3',
    title: 'Commercial Executive Portrait 2',
    fileName: 'author-2.png',
    url: '/images/author-2.png',
    fileSize: 395000,
    fileType: 'image/png',
    dimensions: { width: 500, height: 500 },
    altText: 'Customer testimonial portrait',
    category: 'team',
    uploadedBy: 'Admin User',
    uploadedAt: '2026-08-05T12:05:00Z',
    usedInCount: 1
  }
];

export const initialStaffUsers: StaffUser[] = [
  {
    id: 'staff-1',
    name: 'Admin User',
    email: 'admin@rimamfb.com',
    role: 'admin',
    department: 'Executive Administration',
    status: 'active',
    lastLogin: '2026-09-04T09:30:00Z',
    createdAt: '2026-01-15T08:00:00Z',
    assignedEnquiriesCount: 1
  },
  {
    id: 'staff-2',
    name: 'Sarah Danladi',
    email: 'sarah.danladi@rimamfb.com',
    role: 'staff',
    department: 'Customer Support & Agency Desk',
    status: 'active',
    lastLogin: '2026-09-04T08:45:00Z',
    createdAt: '2026-03-10T10:00:00Z',
    assignedEnquiriesCount: 1
  },
  {
    id: 'staff-3',
    name: 'Emeka Nwosu',
    email: 'emeka.nwosu@rimamfb.com',
    role: 'staff',
    department: 'Corporate Communications',
    status: 'active',
    lastLogin: '2026-09-03T16:20:00Z',
    createdAt: '2026-04-01T09:00:00Z',
    assignedEnquiriesCount: 0
  }
];

export const initialAuditLogs: AuditLog[] = [
  {
    id: 'log-1',
    userId: 'staff-1',
    userName: 'Admin User',
    userRole: 'admin',
    action: 'LOGIN',
    resourceType: 'USER',
    details: 'Administrator logged into RIMA Bank CMS from IP 197.210.55.12',
    timestamp: '2026-09-04T09:30:00Z',
    ipAddress: '197.210.55.12'
  },
  {
    id: 'log-2',
    userId: 'staff-1',
    userName: 'Admin User',
    userRole: 'admin',
    action: 'PUBLISH',
    resourceType: 'ANNOUNCEMENT',
    resourceId: 'ann-1',
    resourceTitle: 'Scheduled Core Banking Maintenance Notice',
    details: 'Published top-bar alert banner for scheduled Sunday maintenance',
    timestamp: '2026-09-04T08:00:00Z',
    ipAddress: '197.210.55.12'
  },
  {
    id: 'log-3',
    userId: 'staff-2',
    userName: 'Sarah Danladi',
    userRole: 'staff',
    action: 'UPDATE',
    resourceType: 'ENQUIRY',
    resourceId: 'enq-2',
    resourceTitle: 'Ticket RMB-2026-0890',
    details: 'Dispatched response to Blessing Okon regarding POS agent inquiry',
    timestamp: '2026-09-03T14:35:00Z',
    ipAddress: '197.210.55.18'
  },
  {
    id: 'log-4',
    userId: 'staff-1',
    userName: 'Admin User',
    userRole: 'admin',
    action: 'PUBLISH',
    resourceType: 'PUBLICATION',
    resourceId: 'pub-1',
    resourceTitle: 'Rima MFB Expands Agency Network with 100 New POS Locations',
    details: 'Approved and published institutional press release',
    timestamp: '2026-09-02T10:00:00Z',
    ipAddress: '197.210.55.12'
  }
];

export const initialSystemSettings: SystemSettings = {
  siteName: 'Rima Microfinance Bank',
  tagline: 'Empowering Your Financial Future With Modern Banking',
  maintenanceMode: false,
  maintenanceMessage: 'Our digital channels are currently undergoing scheduled maintenance. Please visit your nearest branch or contact customer support.',
  enableAlertBanner: true,
  allowPublicEnquiries: true,
  sessionTimeoutMinutes: 30,
  passwordPolicyMinLength: 8,
  maxUploadSizeBytes: 5242880 // 5MB
};

import { Layout } from "@/components/layout/Layout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocation } from "react-router-dom";
import { Mail, Phone, MapPin, ExternalLink, ShieldAlert, BookOpen, AlertCircle, MessageSquare } from "lucide-react";

const legalContent = {
    privacy: {
        title: "Privacy Policy",
        icon: <ShieldAlert className="h-8 w-8 text-primary mb-4" />,
        content: (
            <div className="space-y-6 text-slate-700">
                <p className="text-sm text-slate-500 font-medium pb-4 border-b">Last updated: {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</p>

                <section>
                    <p className="text-lg font-medium leading-relaxed">
                        At Rivers Microfinance Bank ("Rivers MFB", "we", "us", or "our"), safeguarding your privacy is fundamental to our service.
                        This Privacy Policy comprehensively details how we collect, use, process, and protect your personal and financial information
                        when you utilize our banking platforms, mobile applications, website, and branch services.
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 flex items-center gap-2">
                        <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                        Information We Collect
                    </h3>
                    <p className="mb-3">We collect various types of information to provide and improve our services to you:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Personal Identification:</strong> Name, Date of Birth, Gender, Marital Status, and Nationality.</li>
                        <li><strong>Contact Information:</strong> Residential Address, Email Address, and Phone Numbers.</li>
                        <li><strong>Identity Verification (KYC):</strong> Bank Verification Number (BVN), National Identity Number (NIN), Valid ID Cards (Voter's Card, Passport, Driver's License), and utility bills.</li>
                        <li><strong>Financial Data:</strong> Transaction history, account balances, loan application details, income sources, and credit history.</li>
                        <li><strong>Technical & Usage Data:</strong> IP addresses, browser types, device identifiers, login times, and interaction with our digital platforms.</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 flex items-center gap-2">
                        <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                        How We Use Your Information
                    </h3>
                    <p className="mb-3">Your information is utilized strictly for legitimate business purposes, including:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Account Management:</strong> Opening, maintaining, and administering your accounts and products.</li>
                        <li><strong>Transaction Processing:</strong> Executing transfers, deposits, withdrawals, and loan disbursements.</li>
                        <li><strong>Compliance & Regulatory:</strong> Fulfilling Anti-Money Laundering (AML) and Know Your Customer (KYC) directives as mandated by the Central Bank of Nigeria (CBN).</li>
                        <li><strong>Risk & Fraud Prevention:</strong> Detecting, preventing, and investigating fraudulent activities and unauthorized access.</li>
                        <li><strong>Service Improvement:</strong> Analyzing usage trends to optimize our digital banking interfaces and customer service.</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 flex items-center gap-2">
                        <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                        Information Sharing and Disclosure
                    </h3>
                    <p className="mb-3">We do not sell your personal data. We may share necessary information with:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Regulatory Bodies:</strong> The CBN, NDIC, NFIU, and other statutory bodies as required by law.</li>
                        <li><strong>Service Providers:</strong> Third-party vendors (e.g., payment gateways, SMS gateways, card processors) who operate under strict confidentiality agreements.</li>
                        <li><strong>Credit Bureaus:</strong> For credit reporting and loan eligibility assessments.</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 flex items-center gap-2">
                        <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
                        Data Security & Retention
                    </h3>
                    <p className="mb-3">
                        We employ enterprise-grade encryption (TLS/SSL), sophisticated firewalls, and stringent access controls to protect your data.
                        In compliance with Nigerian financial regulations, we retain your personal data and transaction records for a minimum of five (5) years
                        even after an account is closed.
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 flex items-center gap-2">
                        <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">5</span>
                        Your Rights
                    </h3>
                    <p className="mb-3">Under the Nigeria Data Protection Act (NDPA), you have the right to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Request access to your personal data held by us.</li>
                        <li>Request correction of inaccurate or incomplete data.</li>
                        <li>Object to the processing of your data for direct marketing.</li>
                        <li>Request deletion of your data (subject to legal and regulatory retention mandates).</li>
                    </ul>
                </section>

                <div className="bg-slate-50 p-6 rounded-xl mt-8 border border-slate-100">
                    <h4 className="font-bold text-slate-900 mb-2">Questions about your privacy?</h4>
                    <p className="text-sm">Contact our Data Protection Officer at <a href="mailto:dpo@riversmfb.com" className="text-primary hover:underline">dpo@riversmfb.com</a></p>
                </div>
            </div>
        )
    },
    terms: {
        title: "Terms of Service",
        icon: <BookOpen className="h-8 w-8 text-primary mb-4" />,
        content: (
            <div className="space-y-6 text-slate-700">
                <p className="text-sm text-slate-500 font-medium pb-4 border-b">Effective Date: {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</p>

                <section>
                    <p className="text-lg font-medium leading-relaxed">
                        Welcome to Rivers Microfinance Bank. By opening an account, accessing our digital platforms, or using our services,
                        you agree to be legally bound by these Terms of Service. Please read them carefully.
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 flex items-center gap-2">
                        <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                        Account Opening and Maintenance
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Eligibility:</strong> You must be at least 18 years old to open an account independently. Accounts for minors must be operated by a legal guardian.</li>
                        <li><strong>Verification:</strong> You agree to provide accurate, current, and complete information during the KYC process. Failure to do so may result in account restriction or closure.</li>
                        <li><strong>Minimum Balances:</strong> Certain accounts may require a minimum operating balance. Falling below this balance may incur maintenance fees.</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 flex items-center gap-2">
                        <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                        Digital Banking and Security
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Credential Security:</strong> You are solely responsible for keeping your PIN, passwords, and OTPs confidential. Rivers MFB will NEVER ask for your PIN or password.</li>
                        <li><strong>Unauthorized Access:</strong> You must notify us immediately if you suspect unauthorized access to your account or if your card/device is lost or stolen.</li>
                        <li><strong>Liability:</strong> We are not liable for losses resulting from your negligence in protecting your credentials.</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 flex items-center gap-2">
                        <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                        Deposits, Withdrawals, and Transfers
                    </h3>
                    <p className="mb-3">
                        All transactions are subject to limits imposed by the CBN based on your KYC Tier. We reserve the right to delay or decline
                        any transaction that violates our AML thresholds or appears suspicious.
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 flex items-center gap-2">
                        <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
                        Fees and Charges
                    </h3>
                    <p className="mb-3">
                        Our services are subject to applicable fees, commissions, and taxes (like VAT and stamp duty) as detailed in our Tariff Guide.
                        We will notify you of any changes to our fees prior to implementation.
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 flex items-center gap-2">
                        <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">5</span>
                        Account Closure and Suspension
                    </h3>
                    <p className="mb-3">We reserve the right to close, freeze, or suspend your account if:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Directed by regulatory or law enforcement agencies.</li>
                        <li>You violate these Terms of Service.</li>
                        <li>Your account is used for illegal activities, fraud, or money laundering.</li>
                        <li>Your account remains dormant with a zero balance for an extended period.</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 flex items-center gap-2">
                        <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">6</span>
                        Amendments
                    </h3>
                    <p className="mb-3">
                        We may update these terms periodically to reflect changes in regulatory requirements or business operations.
                        Continued use of our services constitutes acceptance of the amended terms.
                    </p>
                </section>
            </div>
        )
    },
    cookies: {
        title: "Cookie Policy",
        icon: <AlertCircle className="h-8 w-8 text-primary mb-4" />,
        content: (
            <div className="space-y-6 text-slate-700">
                <p className="text-sm text-slate-500 font-medium pb-4 border-b">Last updated: {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</p>

                <section>
                    <p className="text-lg font-medium leading-relaxed">
                        Rivers Microfinance Bank utilizes cookies and similar tracking technologies to ensure our website functions securely and efficiently,
                        and to provide you with a tailored browsing experience.
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 flex items-center gap-2">
                        <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                        What are Cookies?
                    </h3>
                    <p className="mb-3">
                        Cookies are small, encrypted text files stored on your computer, smartphone, or other devices by your web browser when you visit our website.
                        They help the website recognize your device on subsequent visits.
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 flex items-center gap-2">
                        <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                        Types of Cookies We Use
                    </h3>
                    <ul className="list-none space-y-4">
                        <li className="bg-slate-50 p-4 rounded-lg">
                            <strong className="text-slate-900 block mb-1">Strictly Necessary Cookies</strong>
                            These are essential for the website to function, especially for secure areas like internet banking. They cannot be switched off in our systems without compromising security.
                        </li>
                        <li className="bg-slate-50 p-4 rounded-lg">
                            <strong className="text-slate-900 block mb-1">Performance & Analytics Cookies</strong>
                            These allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are popular and see how visitors move around the site.
                        </li>
                        <li className="bg-slate-50 p-4 rounded-lg">
                            <strong className="text-slate-900 block mb-1">Functional Cookies</strong>
                            These enable the website to provide enhanced functionality and personalization, such as remembering your language preference or region.
                        </li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 flex items-center gap-2">
                        <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                        Managing Your Preferences
                    </h3>
                    <p className="mb-3">
                        You can set your browser to block or alert you about these cookies, but some parts of the site will not then work.
                        To learn more about how to manage cookies via your specific browser, please visit your browser's help center.
                    </p>
                </section>
            </div>
        )
    },
    complaints: {
        title: "Complaints & Dispute Resolution",
        icon: <MessageSquare className="h-8 w-8 text-primary mb-4" />,
        content: (
            <div className="space-y-6 text-slate-700">

                <section>
                    <p className="text-lg font-medium leading-relaxed">
                        At Rivers Microfinance Bank, your satisfaction is our priority. However, we understand that issues may occasionally arise.
                        We have established a robust, transparent, and fair complaints resolution mechanism to ensure your grievances are addressed promptly.
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 flex items-center gap-2">
                        <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">Step 1</span>
                        Filing a Complaint
                    </h3>
                    <p className="mb-3">You can log a complaint through any of the following officially recognized channels:</p>
                    <div className="grid sm:grid-cols-2 gap-4 mt-4">
                        <div className="border border-slate-200 p-4 rounded-lg flex items-start gap-4">
                            <Mail className="h-6 w-6 text-primary shrink-0" />
                            <div>
                                <h4 className="font-bold text-slate-900">Email Support</h4>
                                <p className="text-sm">complaints@riversmfb.com</p>
                            </div>
                        </div>
                        <div className="border border-slate-200 p-4 rounded-lg flex items-start gap-4">
                            <Phone className="h-6 w-6 text-primary shrink-0" />
                            <div>
                                <h4 className="font-bold text-slate-900">24/7 Call Center</h4>
                                <p className="text-sm">+234 811 947 7050</p>
                            </div>
                        </div>
                        <div className="border border-slate-200 p-4 rounded-lg flex items-start gap-4">
                            <MapPin className="h-6 w-6 text-primary shrink-0" />
                            <div>
                                <h4 className="font-bold text-slate-900">In-Branch</h4>
                                <p className="text-sm">Speak to our Customer Service Officers</p>
                            </div>
                        </div>
                        <div className="border border-slate-200 p-4 rounded-lg flex items-start gap-4">
                            <MessageSquare className="h-6 w-6 text-primary shrink-0" />
                            <div>
                                <h4 className="font-bold text-slate-900">Social Media</h4>
                                <p className="text-sm">Reach out via Twitter or Facebook DM</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 flex items-center gap-2">
                        <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">Step 2</span>
                        Our Resolution Timeline
                    </h3>
                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                        <ul className="space-y-4">
                            <li className="flex gap-4 border-b border-slate-200 pb-4">
                                <div className="font-bold text-primary min-w-24">24 Hours</div>
                                <div>Acknowledgment of your complaint and provision of a unique tracking Ticket ID.</div>
                            </li>
                            <li className="flex gap-4 border-b border-slate-200 pb-4">
                                <div className="font-bold text-primary min-w-24">48 Hours</div>
                                <div>Resolution of minor operational or electronic channel issues (e.g., failed transfers).</div>
                            </li>
                            <li className="flex gap-4">
                                <div className="font-bold text-primary min-w-24">7-14 Days</div>
                                <div>Resolution of complex issues involving third parties (e.g., dispense errors on other banks' ATMs, fraud investigations).</div>
                            </li>
                        </ul>
                    </div>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 flex items-center gap-2">
                        <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">Step 3</span>
                        Escalation (CBN/CPD)
                    </h3>
                    <p className="mb-3">
                        If you are unsatisfied with our resolution, or if your complaint is not addressed within 14 days, you have the right to escalate the matter to the Consumer Protection Department (CPD) of the Central Bank of Nigeria (CBN).
                    </p>
                    <p className="text-sm bg-blue-50 text-blue-800 p-4 rounded-lg mt-2 font-medium">
                        CBN Email: cpd@cbn.gov.ng
                    </p>
                </section>
            </div>
        )
    }
};

export default function Legal() {
    const location = useLocation();
    const path = location.pathname.split("/")[1]; // e.g., "privacy" from "/privacy"

    const content = legalContent[path as keyof typeof legalContent] || legalContent.privacy;

    return (
        <Layout>
            <div className="bg-muted/30 py-12 lg:py-24 min-h-[85vh]">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 p-8 md:p-12">
                        {content.icon}
                        <h1 className="font-display text-3xl md:text-5xl font-black mb-8 text-slate-900 tracking-tight">
                            {content.title}
                        </h1>
                        <ScrollArea className="h-[60vh] md:h-auto pr-4 md:pr-0">
                            {content.content}
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

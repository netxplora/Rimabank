import { Layout } from "@/components/layout/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Shield, CreditCard, Building2, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const accountFaqs = [
    {
        q: "What do I need to open a Savings Account?",
        a: "To open a Savings Account with Rivers MFB, you need: 1. A valid government-issued ID (NIN, Voter's Card, International Passport, or Driver's License) 2. Your Bank Verification Number (BVN) 3. A recent utility bill (not older than 3 months) 4. Two passport photographs."
    },
    {
        q: "Can I open an account online without visiting the branch?",
        a: "Yes! You can open a Tier 1 account entirely online via our portal by providing your BVN and basic details. To upgrade to higher tiers with fewer transaction limits, you will need to upload additional KYC documents like ID and utility bills."
    },
    {
        q: "Are there any fees for opening an account?",
        a: "No, opening a basic Savings or Current Account with Rivers MFB is completely free. We do not charge an account opening fee."
    },
    {
        q: "How do I upgrade my KYC Tier?",
        a: "You can upgrade your KYC Tier by logging into your dashboard and navigating to Settings > Profile. There, you can upload your scanned ID and proof of address. Our compliance team usually reviews these within 24 hours."
    }
];

const loanFaqs = [
    {
        q: "Who is eligible for a personal or SME loan?",
        a: "Any active customer who has operated an account with us for at least 3 months is eligible. For SME loans, your business must be registered and functional within Rivers State."
    },
    {
        q: "What is the interest rate on your loans?",
        a: "Our interest rates are highly competitive and are calculated based on the loan type, duration, and your credit profile. Typical rates range from 2.5% to 5% flat monthly logic."
    },
    {
        q: "How long does loan approval take?",
        a: "For personal micro-loans, approval and disbursement can happen within 48 hours of submitting all required documents. Larger SME loans may take up to 7 working days to allow for collateral assessment."
    },
    {
        q: "Can I pay off my loan early?",
        a: "Yes, you can liquidate your loan before the due date. Depending on the loan product, a small early liquidation fee may apply to cover administrative costs."
    }
];

const digitalFaqs = [
    {
        q: "How do I reset my forgotten password or PIN?",
        a: "Click on 'Forgot Password' on the login page. You will receive an OTP via your registered email or phone number to verify your identity before setting a new password. To reset a transfer PIN, go to 'Settings' inside your dashboard."
    },
    {
        q: "Is your online banking secure?",
        a: "Yes. Our platform uses 256-bit TLS encryption, stringent firewall protections, and multi-factor authentication (MFA) to ensure that your funds and data are 100% secure from unauthorized access."
    },
    {
        q: "My transfer failed but I was debited. What should I do?",
        a: "Usually, failed transactions are automatically reversed within 24 hours. If your account is not credited back within 24 hours, please log a support ticket via your dashboard or call our 24/7 support line."
    }
];

export default function FAQ() {
    return (
        <Layout>
            <div className="bg-muted/30 py-12 lg:py-24">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6 relative">
                            <HelpCircle className="h-10 w-10 text-primary" />
                            <div className="absolute -top-1 -right-1 h-4 w-4 bg-accent rounded-full animate-ping" />
                            <div className="absolute -top-1 -right-1 h-4 w-4 bg-accent rounded-full" />
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl font-black mb-6 text-slate-900 tracking-tight">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Everything you need to know about banking with Rivers MFB.
                            Can't find the answer you're looking for? Support is just a click away.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto grid md:grid-cols-12 gap-8 items-start relative">
                        {/* Sidebar links */}
                        <div className="md:col-span-4 sticky top-24 space-y-2 hidden md:block">
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 px-4">Categories</p>
                            <a href="#accounts" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white text-slate-600 hover:text-primary transition-colors font-medium hover:shadow-sm">
                                <Building2 className="h-5 w-5" /> Account Opening
                            </a>
                            <a href="#loans" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white text-slate-600 hover:text-primary transition-colors font-medium hover:shadow-sm">
                                <CreditCard className="h-5 w-5" /> Loans & Credit
                            </a>
                            <a href="#digital" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white text-slate-600 hover:text-primary transition-colors font-medium hover:shadow-sm">
                                <Smartphone className="h-5 w-5" /> Digital Banking
                            </a>
                            <a href="#security" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white text-slate-600 hover:text-primary transition-colors font-medium hover:shadow-sm">
                                <Shield className="h-5 w-5" /> Security
                            </a>
                        </div>

                        {/* Accordions */}
                        <div className="md:col-span-8 space-y-12">
                            {/* Account section */}
                            <section id="accounts">
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-900">
                                    <Building2 className="h-6 w-6 text-primary md:hidden" />
                                    Account Opening & KYC
                                </h3>
                                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2">
                                    <Accordion type="single" collapsible className="w-full">
                                        {accountFaqs.map((faq, i) => (
                                            <AccordionItem key={i} value={`account-${i}`} className="border-b-0 px-4">
                                                <AccordionTrigger className="text-left font-semibold text-slate-800 hover:text-primary py-5">
                                                    {faq.q}
                                                </AccordionTrigger>
                                                <AccordionContent className="text-slate-600 leading-relaxed pb-5">
                                                    {faq.a}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </div>
                            </section>

                            {/* Loans section */}
                            <section id="loans">
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-900 mt-12">
                                    <CreditCard className="h-6 w-6 text-primary md:hidden" />
                                    Loans & Credit Facilities
                                </h3>
                                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2">
                                    <Accordion type="single" collapsible className="w-full">
                                        {loanFaqs.map((faq, i) => (
                                            <AccordionItem key={i} value={`loan-${i}`} className="border-b-0 px-4">
                                                <AccordionTrigger className="text-left font-semibold text-slate-800 hover:text-primary py-5">
                                                    {faq.q}
                                                </AccordionTrigger>
                                                <AccordionContent className="text-slate-600 leading-relaxed pb-5">
                                                    {faq.a}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </div>
                            </section>

                            {/* Digital section */}
                            <section id="digital">
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-900 mt-12">
                                    <Smartphone className="h-6 w-6 text-primary md:hidden" />
                                    Digital Banking & Security
                                </h3>
                                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2">
                                    <Accordion type="single" collapsible className="w-full">
                                        {digitalFaqs.map((faq, i) => (
                                            <AccordionItem key={i} value={`digital-${i}`} className="border-b-0 px-4">
                                                <AccordionTrigger className="text-left font-semibold text-slate-800 hover:text-primary py-5">
                                                    {faq.q}
                                                </AccordionTrigger>
                                                <AccordionContent className="text-slate-600 leading-relaxed pb-5">
                                                    {faq.a}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="max-w-4xl mx-auto mt-20">
                        <div className="bg-primary rounded-3xl p-8 md:p-12 text-center text-primary-foreground shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-12 opacity-10">
                                <HelpCircle className="h-48 w-48" />
                            </div>
                            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 relative z-10">Still have questions?</h2>
                            <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto relative z-10">
                                Can't find the answer in our FAQ? Our support team is here to help you 24/7. Drop us a message or give us a call.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                                <Button asChild size="lg" variant="accent" className="font-bold">
                                    <Link to="/contact">Contact Support</Link>
                                </Button>
                                <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-primary font-bold">
                                    <Link to="/complaints">Log a Complaint</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

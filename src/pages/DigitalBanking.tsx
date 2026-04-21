import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import {
  Smartphone,
  Shield,
  Zap,
  Clock,
  Download,
  CheckCircle2,
  WalletCards,
  ReceiptText,
  HandCoins,
  ArrowRight,
  ShieldCheck,
  SmartphoneNfc,
  Apple
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const PlayStoreIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3.609 1.814L13.792 12 3.61 22.186c-.18.18-.313.407-.384.656L14.94 12.35 15.908 11.382l4.475-2.557c.75-.429.75-1.221 0-1.65L15.908 4.618l-.968-.968L3.226 1.158c.071.25.204.477.383.656z" />
  </svg>
);

export default function DigitalBanking() {
  return (
    <Layout>
      {/* Hero Section - Consistent with About Page */}
      <section className="relative bg-gradient-hero text-primary-foreground py-20 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-home.png"
            alt="Digital Banking Experience"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Digital Banking Solutions
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8 leading-relaxed">
              Experience precise financial management with Rima Microfinance Bank. Our digital infrastructure delivers secure, instantaneous, and comprehensive banking services tailored to your mobile environment.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="accent" size="lg" className="h-14 px-8 text-lg" asChild>
                <a href="#download" className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Get the App Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase Section - Professional App Placement */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Context Side */}
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                <Smartphone className="h-4 w-4" />
                Available on iOS & Android
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
                Financial Management, <br />
                <span className="text-primary italic">At Your Fingertips</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our mobile platform is engineered to function as your comprehensive financial command center. Developed for reliability and high-speed execution, the Rima Bank application integrates seamlessly with your daily operational requirements.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 pt-4">
                <div className="p-4 rounded-xl bg-muted/50 border border-border">
                  <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-secondary" />
                    Zero Maintenance
                  </h4>
                  <p className="text-sm text-muted-foreground">No hidden charges for digital transactions.</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 border border-border">
                  <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-secondary" />
                    Instant Support
                  </h4>
                  <p className="text-sm text-muted-foreground">In-app customer service available 24/7.</p>
                </div>
              </div>
            </div>

            {/* Visual Side */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative z-10 animate-fade-in">
                <img
                  src="/images/hero-home.png"
                  alt="Rima Bank Digital Interface"
                  className="w-full max-w-[550px] h-auto drop-shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] transform lg:rotate-2 hover:rotate-0 transition-transform duration-700 rounded-3xl"
                />
              </div>
              {/* Decorative Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[100px] -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Clean & Professional */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Advanced Digital <span className="text-primary">Capabilities</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Comprehensive tools designed to facilitate efficient capital management and financial growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: WalletCards,
                title: "Instant Fund Settlement",
                description: "Execute real-time transfers to any licensed commercial or microfinance institution nationwide.",
                color: "bg-blue-600/10 text-blue-600"
              },
              {
                icon: ReceiptText,
                title: "Utility Settlement",
                description: "Manage and settle recurring obligations including energy, data, and telecommunications.",
                color: "bg-purple-600/10 text-purple-600"
              },
              {
                icon: HandCoins,
                title: "Retail Credit Access",
                description: "Access structured micro-credit facilities based on verified transaction history.",
                color: "bg-emerald-600/10 text-emerald-600"
              },
              {
                icon: SmartphoneNfc,
                title: "Card Management",
                description: "Request, activate, or freeze your debit cards instantly through your phone.",
                color: "bg-orange-600/10 text-orange-600"
              },
              {
                icon: ShieldCheck,
                title: "Biometric Security",
                description: "Secure your funds with multi-factor authentication and biometric verification.",
                color: "bg-red-600/10 text-red-600"
              },
              {
                icon: Zap,
                title: "Spending Analytics",
                description: "Gain precise insights into your expenditure patterns with automated transaction categorization.",
                color: "bg-amber-600/10 text-amber-600"
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-none bg-background">
                <CardContent className="pt-8">
                  <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started Section - Step by Step */}
      <section className="py-24 bg-muted/50 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Onboarding <span className="text-primary italic">Process</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Initiate your digital banking relationship via our streamlined, paperless enrollment protocol.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative lg:px-12">
            {/* Step 1 */}
            <div className="relative z-10 text-center space-y-6">
              <div className="w-20 h-20 bg-background rounded-full border-4 border-primary/10 flex items-center justify-center mx-auto shadow-xl">
                <span className="text-3xl font-display font-bold text-primary">01</span>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-foreground">Download & Install</h3>
                <p className="text-muted-foreground text-sm leading-relaxed px-4">
                  Find 'Rima MFB' on the Google Play Store or Apple App Store and install it.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 text-center space-y-6">
              <div className="w-20 h-20 bg-background rounded-full border-4 border-primary/10 flex items-center justify-center mx-auto shadow-xl">
                <span className="text-3xl font-display font-bold text-primary">02</span>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-foreground">Verify Identity</h3>
                <p className="text-muted-foreground text-sm leading-relaxed px-4">
                  Enter your BVN and valid ID details. Our system verifies your information instantly.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 text-center space-y-6">
              <div className="w-20 h-20 bg-background rounded-full border-4 border-primary/10 flex items-center justify-center mx-auto shadow-xl">
                <span className="text-3xl font-display font-bold text-primary">03</span>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-foreground">Link & Fund</h3>
                <p className="text-muted-foreground text-sm leading-relaxed px-4">
                  Fund your account and commence secure financial transactions immediately.
                </p>
              </div>
            </div>

            {/* Connecting Lines (Desktop Only) */}
            <div className="hidden lg:block absolute top-10 left-[25%] right-[25%] h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent -z-0" />
          </div>
        </div>
      </section>

      {/* Bill Payments Ecosystem - Detail Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative z-10 grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <div className="p-8 rounded-3xl bg-blue-50 border border-blue-100 flex flex-col items-center text-center shadow-sm">
                    <Zap className="h-8 w-8 text-blue-600 mb-4" />
                    <h4 className="font-bold text-blue-900">Electricity</h4>
                    <p className="text-xs text-blue-700/70">Prepaid & Postpaid</p>
                  </div>
                  <div className="p-8 rounded-3xl bg-purple-50 border border-purple-100 flex flex-col items-center text-center shadow-sm">
                    <SmartphoneNfc className="h-8 w-8 text-purple-600 mb-4" />
                    <h4 className="font-bold text-purple-900">Data & Airtime</h4>
                    <p className="text-xs text-purple-700/70">All Networks</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-8 rounded-3xl bg-orange-50 border border-orange-100 flex flex-col items-center text-center shadow-sm">
                    <ReceiptText className="h-8 w-8 text-orange-600 mb-4" />
                    <h4 className="font-bold text-orange-900">Cable TV</h4>
                    <p className="text-xs text-orange-700/70">DSTV, GOTV & StarTimes</p>
                  </div>
                  <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-100 flex flex-col items-center text-center shadow-sm">
                    <CheckCircle2 className="h-8 w-8 text-emerald-600 mb-4" />
                    <h4 className="font-bold text-emerald-900">Tax & Levies</h4>
                    <p className="text-xs text-emerald-700/70">Official State Services</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
            </div>

            <div className="space-y-8 order-1 lg:order-2">
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
                Integrated Payment <br />
                <span className="text-primary italic">Ecosystem</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Maintain operational efficiency with our integrated service provider network. We facilitate seamless settlement for regional and nationwide obligations directly from your dashboard.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Scheduled Payments</h4>
                    <p className="text-sm text-muted-foreground leading-tight">Never miss a deadline. Automate your monthly bills for peace of mind.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Electronic Receipts</h4>
                    <p className="text-sm text-muted-foreground leading-tight">Generate and download official transaction confirmations for every settled obligation.</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Button variant="outline" size="lg" className="h-12 px-8" asChild>
                  <Link to="/faq" className="flex items-center gap-2">
                    Payment Status Guide
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Security Banner */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-bold uppercase tracking-widest mb-8">
              <Shield className="h-4 w-4" />
              World Class Protection
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-8">
              Bank with Absolute <span className="text-accent italic">Peace of Mind</span>
            </h2>
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="mx-auto w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-accent" />
                </div>
                <h4 className="font-bold">NDIC Insured</h4>
                <p className="text-sm text-primary-foreground/60">Your funds are protected by the NDIC.</p>
              </div>
              <div className="space-y-3">
                <div className="mx-auto w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-accent" />
                </div>
                <h4 className="font-bold">AES-256 Security</h4>
                <p className="text-sm text-primary-foreground/60">Top-tier encryption for your data.</p>
              </div>
              <div className="space-y-3">
                <div className="mx-auto w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <Zap className="h-6 w-6 text-accent" />
                </div>
                <h4 className="font-bold">2-Factor Auth</h4>
                <p className="text-sm text-primary-foreground/60">Robust double-layer security.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Tips Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl font-bold mb-12 text-center text-foreground">
              Tips for <span className="text-secondary italic">Secure Digital Banking</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-6 p-6 rounded-2xl bg-background shadow-sm border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold">Protect Your PIN</h4>
                  <p className="text-sm text-muted-foreground">Never share your transaction PIN or app password with anyone, including bank staff.</p>
                </div>
              </div>
              <div className="flex gap-6 p-6 rounded-2xl bg-background shadow-sm border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold">Use Biometrics</h4>
                  <p className="text-sm text-muted-foreground">Enable fingerprint or face recognition for an extra layer of security beyond passwords.</p>
                </div>
              </div>
              <div className="flex gap-6 p-6 rounded-2xl bg-background shadow-sm border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold">Watch for Phishing</h4>
                  <p className="text-sm text-muted-foreground">Rima MFB will never ask for your sensitive details via SMS, Email, or Phone calls.</p>
                </div>
              </div>
              <div className="flex gap-6 p-6 rounded-2xl bg-background shadow-sm border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold">Update Regularly</h4>
                  <p className="text-sm text-muted-foreground">Always ensure you are using the latest version of our app to receive critical security patches.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section - Professional Centered CTA */}
      <section id="download" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-hero rounded-[2.5rem] p-12 lg:p-16 relative overflow-hidden shadow-2xl text-primary-foreground text-center">
            <div className="absolute inset-0 bg-hero-pattern opacity-10" />
            <div className="relative z-10">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Commence Your Digital Banking Experience
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed">
                Join our established network of corporate and retail clients. Deploy the Rima Bank application to optimize your financial operations.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button variant="accent" size="xl" className="h-16 px-10 shadow-lg" asChild>
                  <a href="#" className="flex items-center gap-3">
                    <PlayStoreIcon />
                    <div className="text-left">
                      <p className="text-[10px] uppercase leading-none opacity-80 font-medium">Get it on</p>
                      <p className="text-xl font-bold leading-tight">Google Play</p>
                    </div>
                  </a>
                </Button>
                <Button variant="heroOutline" size="xl" className="h-16 px-10 border-white/40" asChild>
                  <a href="#" className="flex items-center gap-3">
                    <Apple className="h-8 w-8" />
                    <div className="text-left">
                      <p className="text-[10px] uppercase leading-none opacity-80 font-medium">Download on the</p>
                      <p className="text-xl font-bold leading-tight">App Store</p>
                    </div>
                  </a>
                </Button>
              </div>

              <div className="mt-12 flex items-center justify-center gap-8 text-primary-foreground/60">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="text-sm font-medium">4.8 App Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium">100k+ Downloads</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

const Star = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

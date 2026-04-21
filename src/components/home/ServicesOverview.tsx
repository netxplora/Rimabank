import { Link } from "react-router-dom";
import {
  Wallet,
  TrendingUp,
  Building2,
  GraduationCap,
  Users,
  Briefcase,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Wallet,
    title: "Savings & Deposits",
    description: "Secure your financial future with structured savings plans offering competitive, reliable interest yields.",
    href: "/personal-banking/savings",
    features: ["Competitive Interest Rates", "Principal Security", "On-Demand Access"],
  },
  {
    icon: TrendingUp,
    title: "Credit & Loans",
    description: "Accessible credit facilities structured to support personal expenditures and strategic business investments.",
    href: "/loans",
    features: ["Streamlined Approval", "Transparent Terms", "Flexible Repayment"],
  },
  {
    icon: Briefcase,
    title: "SME Banking",
    description: "Dedicated financial logistics and operational support for growing small and medium-sized enterprises.",
    href: "/business-banking/sme",
    features: ["Operating Accounts", "Working Capital Finance", "Payroll Services"],
  },
  {
    icon: Building2,
    title: "Corporate Finance",
    description: "Institutional-grade financial architecture for established corporations and large-scale operations.",
    href: "/business-banking/corporate",
    features: ["Trade Finance", "Cash Management", "Dedicated Coverage"],
  },
  {
    icon: Users,
    title: "Agency Banking",
    description: "Expand financial inclusion while generating reliable revenue streams as an authorized local representative.",
    href: "/agent-banking",
    features: ["Secure POS Infrastructure", "Commissions Management", "Technical Support"],
  },
  {
    icon: GraduationCap,
    title: "Youth & Student Accounts",
    description: "Foundational banking solutions designed to build financial literacy and secure early-stage capital.",
    href: "/personal-banking/student",
    features: ["Zero Maintenance Fees", "Educational Loans", "Debit Card Access"],
  },
];

export function ServicesOverview() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            Our Expertise
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            Comprehensive Banking Solutions
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Rima Microfinance Bank provides structured financial products designed to support individual wealth generation, facilitate business operations, and secure long-term capital management for our clients.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-card rounded-2xl border border-border p-8 hover:border-primary/30 hover:shadow-xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <service.icon className="h-7 w-7 text-primary-foreground" />
              </div>

              <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>

              <p className="text-muted-foreground mb-6">
                {service.description}
              </p>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to={service.href}
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
              >
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/products">
              View All Products
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";
import { Briefcase, TrendingUp, Building, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const smeServices = [
  {
    icon: Building,
    title: "Corporate Accounts",
    description: "Structured current accounts for domestic and international operations",
  },
  {
    icon: TrendingUp,
    title: "Commercial Credit",
    description: "Scalable funding solutions to accelerate business expansion",
  },
  {
    icon: BarChart3,
    title: "Trade & Supply Chain",
    description: "Comprehensive financial backing for complex supply chains",
  },
];

export function SMEBankingSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Visual */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Main Card */}
              <div className="bg-card rounded-2xl p-8 shadow-xl border border-border">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <Briefcase className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      Enterprise Support
                    </h3>
                    <p className="text-muted-foreground">Engineered for scaling businesses</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {smeServices.map((service, index) => (
                    <div 
                      key={service.title}
                      className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <service.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{service.title}</h4>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -bottom-4 -right-4 bg-gradient-secondary text-secondary-foreground p-6 rounded-xl shadow-lg hidden md:block">
                <p className="text-3xl font-bold">₦2B+</p>
                <p className="text-sm text-secondary-foreground/70">Commercial Capital Deployed</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              Commercial Banking
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-6">
              Empowering Your{" "}
              <span className="text-primary">Corporate Growth</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              From growing SMEs to established corporations, we provide the robust financial structure required to scale operations efficiently. Partner with us to access dynamic working capital, targeted trade finance, and specialized advisory services.
            </p>

            <ul className="space-y-3 mb-10">
              {[
                "Competitive commercial credit from 18% p.a.",
                "Customized funding up to ₦50 million",
                "Structured repayment timelines",
                "Dedicated relationship management teams",
                "Streamlined application and approval",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-foreground">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="default" size="lg" asChild>
                <Link to="/business-banking/sme">
                  Explore SME Solutions
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">
                  Talk to an Advisor
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

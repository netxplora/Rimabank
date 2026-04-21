import { ReactNode, useEffect } from "react";
import { Layout } from "./Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface BankingServiceLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  image: string;
  whoItIsFor: string;
  benefits: string[];
  requirements: string[];
  fees?: string;
  ctaText?: string;
  children?: ReactNode;
}

export function BankingServiceLayout({
  title,
  subtitle,
  description,
  icon: Icon,
  image,
  whoItIsFor,
  benefits,
  requirements,
  fees,
  ctaText = "Apply Now",
  children
}: BankingServiceLayoutProps) {
  useEffect(() => {
    document.title = `${title} | Rima Microfinance Bank`;
  }, [title]);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative bg-primary text-primary-foreground py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-6">
              <Icon className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium">{subtitle}</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
              {title}
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-display font-bold mb-6">Overview</h2>
                <div className="prose prose-lg text-muted-foreground max-w-none">
                  <p>{description}</p>
                  <p className="mt-4">
                    Designed specifically for <span className="text-foreground font-semibold">{whoItIsFor}</span>, 
                    this product ensures your financial goals are within reach with the support of a community-focused bank.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-display font-bold mb-6">Key Benefits</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {benefits.map((benefit, idx) => (
                    <div key={idx} className="flex gap-3 p-4 rounded-xl bg-muted/50 border border-border/50">
                      <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                      <span className="font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {children}

              <div className="p-8 md:p-12 rounded-[2rem] bg-secondary/5 border border-secondary/10">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">Ready to get started?</h3>
                    <p className="text-muted-foreground">Visit our nearest branch or contact an advisor today to open your account.</p>
                  </div>
                  <Button size="xl" className="px-10 shrink-0" asChild>
                    <Link to="/contact">
                      {ctaText}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-card border border-border rounded-2xl p-8 sticky top-24">
                <h4 className="text-xl font-bold mb-6">Requirements</h4>
                <ul className="space-y-4 mb-8">
                  {requirements.map((req, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
                
                {fees && (
                  <div className="pt-6 border-t border-border">
                    <div className="text-sm font-semibold text-foreground mb-1">Fees & Rates</div>
                    <div className="text-2xl font-bold text-primary">{fees}</div>
                  </div>
                )}

                <Button variant="outline" className="w-full mt-8" asChild>
                  <Link to="/support">Download Application Forms</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

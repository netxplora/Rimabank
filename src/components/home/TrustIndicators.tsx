import { Shield, Users, Building, Globe } from "lucide-react";

const indicators = [
  {
    icon: Building,
    label: "Years of Excellence",
    value: "25+",
    description: "Deeply rooted in the Rivers community."
  },
  {
    icon: Users,
    label: "Active Customers",
    value: "50,000+",
    description: "Empowering individuals and businesses."
  },
  {
    icon: Globe,
    label: "Branch Network",
    value: "11",
    description: "Strategic locations across the state."
  },
  {
    icon: Shield,
    label: "Regulatory Trust",
    value: "CBN",
    description: "Fully licensed and insured by NDIC."
  }
];

export function TrustIndicators() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {indicators.map((item, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border/50 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">
                {item.value}
              </div>
              <div className="text-sm font-semibold text-primary mb-2">
                {item.label}
              </div>
              <p className="text-xs text-muted-foreground italic">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

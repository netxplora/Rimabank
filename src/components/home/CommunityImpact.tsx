import { Heart, Users2, Tractor, GraduationCap } from "lucide-react";

export function CommunityImpact() {
  const impacts = [
    {
      title: "Local Business Growth",
      description: "Supporting local entrepreneurs with flexible credit facilities and business advisory.",
      icon: Users2,
      color: "bg-blue-500/10 text-blue-600"
    },
    {
      title: "Educational Support",
      description: "Tailored student loans and savings plans to secure the future of our youth.",
      icon: GraduationCap,
      color: "bg-purple-500/10 text-purple-600"
    },
    {
      title: "Agricultural Financing",
      description: "Providing farmers with the capital needed for equipment, seeds, and expansion.",
      icon: Tractor,
      color: "bg-green-500/10 text-green-600"
    },
    {
      title: "Community Outreach",
      description: "Committed to financial literacy programs across Rivers State.",
      icon: Heart,
      color: "bg-red-500/10 text-red-600"
    }
  ];

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
              More Than Just a Bank, We are Your <span className="text-primary">Neighbors</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              At Rivers MFB, we believe that when our community thrives, we all thrive. 
              Our impact initiatives are designed to reach the grassroots Level of Rivers State.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {impacts.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center ${item.color}`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1521791136064-7986c2959210?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Community Impact" 
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

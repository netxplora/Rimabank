import { useState } from "react";
import { Sparkles, ArrowRight, User, Briefcase, GraduationCap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const recommendations = [
  {
    id: "student",
    title: "Student Savings Account",
    description: "Perfect for students looking to manage their allowance and start saving early.",
    benefits: ["Zero maintenance fees", "Free debit card", "Financial literacy access"],
    icon: GraduationCap,
    match: "Student"
  },
  {
    id: "sme",
    title: "SME Business Advantage",
    description: "Designed for entrepreneurs needing high transaction limits and business support.",
    benefits: ["Business advisory", "Quick credit access", "Multi-user banking"],
    icon: Briefcase,
    match: "Entrepreneur"
  },
  {
    id: "current",
    title: "Standard Current Account",
    description: "Ideal for daily transactions with full digital banking features.",
    benefits: ["Cheque book", "Overdraft facilities", "Unlimited transactions"],
    icon: User,
    match: "Salary Earner"
  }
];

export function AccountRecommendationTool() {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState("");

  const reset = () => {
    setStep(1);
    setProfile("");
  };

  const selectedRec = recommendations.find(r => r.match === profile);

  return (
    <section className="py-20 bg-muted/50 rounded-[3rem] mt-20 overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase mb-4">
            <Sparkles className="h-3 w-3" />
            Quick Recommendation
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold">Find the Right Account for You</h2>
          <p className="text-muted-foreground mt-4">Answer one question and we'll suggest our best product for your needs.</p>
        </div>

        <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-lg min-h-[300px] flex flex-col justify-center">
          {step === 1 ? (
            <div className="space-y-8">
              <h3 className="text-xl font-semibold text-center mb-6">What best describes you today?</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {["Student", "Entrepreneur", "Salary Earner"].map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setProfile(type);
                      setStep(2);
                    }}
                    className="p-6 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left flex flex-col items-center gap-3 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10">
                      {type === "Student" && <GraduationCap className="h-6 w-6 group-hover:text-primary" />}
                      {type === "Entrepreneur" && <Briefcase className="h-6 w-6 group-hover:text-primary" />}
                      {type === "Salary Earner" && <User className="h-6 w-6 group-hover:text-primary" />}
                    </div>
                    <span className="font-bold">{type}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-fade-in text-center md:text-left">
              <div className="flex flex-col md:flex-row gap-10 items-center">
                <div className="w-32 h-32 rounded-3xl bg-primary/5 flex items-center justify-center shrink-0">
                  {selectedRec && <selectedRec.icon className="h-16 w-16 text-primary" />}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">We Recommend: {selectedRec?.title}</h3>
                  <p className="text-muted-foreground mb-6">{selectedRec?.description}</p>
                  <ul className="grid sm:grid-cols-2 gap-3 mb-8">
                    {selectedRec?.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2 text-sm justify-center md:justify-start">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="px-8" asChild>
                      <a href="/contact">Get Started Now</a>
                    </Button>
                    <Button variant="ghost" onClick={reset}>Try Again</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

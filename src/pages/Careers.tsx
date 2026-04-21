import { Layout } from "@/components/layout/Layout";
import { Briefcase, Users, Heart, GraduationCap, ArrowRight, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const jobOpenings = [
  {
    id: 1,
    title: "Relationship Manager (SME)",
    location: "Port Harcourt",
    type: "Full-time",
    description: "Seeking a passionate individual to support our local SME customers with tailored financial solutions."
  },
  {
    id: 2,
    title: "Digital Banking Officer",
    location: "Head Office",
    type: "Full-time",
    description: "Help us shape the future of digital banking in Rivers State. Experience with fintech preferred."
  },
  {
    id: 3,
    title: "Branch Teller",
    location: "Onne Branch",
    type: "Full-time",
    description: "Be the face of RIMA. Provide excellent customer service and handle financial transactions with care."
  }
];

export default function Careers() {
  return (
    <Layout>
      <section className="relative bg-gradient-hero text-primary-foreground py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-home.png"
            alt="Careers at Rima MFB"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
            Join the <span className="text-secondary italic">Rima Family</span>
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Professional excellence meets community impact. Build your career with the leading microfinance institution in Rivers State.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">Why Work with Us?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              At RIMA, we believe our people are our greatest asset. 
              We provide a supportive environment where you can grow and make a real impact.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg bg-muted/30">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Community-Focused</h3>
                <p className="text-sm text-muted-foreground">Every project we work on is designed to empower a person, business, or community in Rivers State.</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg bg-muted/30">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <GraduationCap className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold">Growth Opportunities</h3>
                <p className="text-sm text-muted-foreground">We value continuous learning and provide regular training to help you stay at the forefront of the industry.</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg bg-muted/30">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold">Diverse & Inclusive</h3>
                <p className="text-sm text-muted-foreground">We pride ourselves on our inclusive culture where every voice is heard and valued.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-display font-bold">Current Openings</h2>
                <p className="text-muted-foreground">Find your next role with us.</p>
              </div>
              <Button variant="ghost" className="text-primary hidden md:flex items-center gap-2">
                All Jobs <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-6">
              {jobOpenings.map((job) => (
                <Card key={job.id} className="hover:border-primary/50 transition-colors">
                  <CardContent className="p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">{job.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {job.location}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {job.type}</span>
                      </div>
                      <p className="text-muted-foreground text-sm mt-4">{job.description}</p>
                    </div>
                    <Button asChild>
                      <Link to="/contact?reason=job&title={job.title}">Apply Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto bg-primary text-primary-foreground p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
             <div className="relative z-10">
                <h2 className="text-3xl font-display font-bold mb-6">Don't see a fit?</h2>
                <p className="text-primary-foreground/80 mb-8">
                  We are always on the lookout for talented individuals. 
                  Send your CV to <span className="font-bold text-secondary underline">careers@riversmfb.com</span> and we'll keep you in mind for future roles.
                </p>
                <Button size="lg" variant="secondary" className="px-10" asChild>
                  <Link to="/contact">Send General CV</Link>
                </Button>
             </div>
             <Briefcase className="absolute -bottom-10 -right-10 h-64 w-64 text-white/5" />
          </div>
        </div>
      </section>
    </Layout>
  );
}

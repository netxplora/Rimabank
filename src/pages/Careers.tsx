import { Layout } from "@/components/layout/Layout";
import { Users, Heart, GraduationCap, ArrowRight, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const jobOpenings = [
  {
    id: 1,
    title: "Commercial Relationship Manager (SME)",
    location: "Port Harcourt Main Branch",
    type: "Full-time",
    description: "Manage a portfolio of SME commercial clients, structure working capital proposals, and deliver high-touch banking advisory."
  },
  {
    id: 2,
    title: "Digital Banking Operations Officer",
    location: "Head Office Operations",
    type: "Full-time",
    description: "Monitor electronic payment reconciliations, POS terminal settlements, and customer service escalation workflows."
  },
  {
    id: 3,
    title: "Branch Customer Service Officer",
    location: "Choba Campus Branch",
    type: "Full-time",
    description: "Deliver professional customer onboarding, account maintenance verification, and debit card issuance support."
  }
];

export default function Careers() {
  return (
    <Layout>
      {/* Editorial Hero */}
      <section className="relative bg-white pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-[#e2e8f0]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f0f7ff] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f7ff] border border-[#e2e8f0] text-[#0a1e3f] text-xs font-semibold uppercase tracking-wider">
              <span>Careers & Talent</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.05]">
              Build your career in <span className="text-[#0284c7]">banking</span>.
            </h1>

            <p className="text-[#0a1e3f]/80 text-base sm:text-lg leading-relaxed">
              Join a licensed financial institution dedicated to financial inclusion, professional integrity, and sustainable economic impact across Rivers State.
            </p>
          </div>
        </div>
      </section>

      {/* Workplace Culture 3-Column Grid — Open Layout */}
      <section className="py-16 md:py-20 bg-white border-b border-[#e2e8f0]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block mb-2">
              Our Workplace
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.08]">
              Why join Rima Microfinance Bank?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-[#e2e8f0]/80 pt-10">
            <div className="flex flex-col justify-start">
              <div className="w-10 h-10 rounded-xl bg-[#bcffbb] text-[#34c771] flex items-center justify-center mb-4">
                <Heart className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-base font-semibold text-[#0a1e3f] mb-1.5">Community Impact</h3>
              <p className="text-xs text-[#64748b] leading-relaxed">
                Directly support local business owners, students, and families in accessing structured banking capital.
              </p>
            </div>

            <div className="flex flex-col justify-start">
              <div className="w-10 h-10 rounded-xl bg-[#f0f7ff] text-[#0284c7] flex items-center justify-center mb-4">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-base font-semibold text-[#0a1e3f] mb-1.5">Professional Development</h3>
              <p className="text-xs text-[#64748b] leading-relaxed">
                Structured banking training, regulatory compliance certifications, and clear internal leadership pathways.
              </p>
            </div>

            <div className="flex flex-col justify-start">
              <div className="w-10 h-10 rounded-xl bg-[#e2e8f0] text-[#477ee9] flex items-center justify-center mb-4">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-base font-semibold text-[#0a1e3f] mb-1.5">Collaborative Culture</h3>
              <p className="text-xs text-[#64748b] leading-relaxed">
                Work alongside experienced banking executives in an ethical, transparent, and merit-driven environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Job Openings — Open Divided List */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#f0f7ff]/40 to-white border-b border-[#e2e8f0]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block mb-2">
              Available Positions
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[#0a1e3f] tracking-tight leading-tight">
              Current Open Roles
            </h2>
          </div>

          <div className="divide-y divide-[#e2e8f0]/80 border-t border-b border-[#e2e8f0]/80 max-w-4xl">
            {jobOpenings.map((job) => (
              <div 
                key={job.id} 
                className="py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-5"
              >
                <div className="space-y-1.5">
                  <h3 className="font-heading text-base font-semibold text-[#0a1e3f]">{job.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-[#64748b]">
                    <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#0284c7]" /> {job.location}</span>
                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-[#34c771]" /> {job.type}</span>
                  </div>
                  <p className="text-xs text-[#0a1e3f]/70 leading-relaxed pt-0.5">{job.description}</p>
                </div>
                <Button
                  variant="pill"
                  size="default"
                  className="shrink-0 bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md shadow-sky-500/20 transform hover:-translate-y-0.5 transition-all text-xs"
                  asChild
                >
                  <Link to={`/contact?subject=Career+Application+-+${encodeURIComponent(job.title)}`}>
                    Apply for Position
                    <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* General Resume Submissions */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="font-heading text-2xl font-semibold text-[#0a1e3f]">
              General Applications
            </h3>
            <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed">
              Don't see a specific opening matching your background? Send your curriculum vitae directly to our human resources desk at <span className="font-semibold text-[#0a1e3f]">careers@rimamfb.com</span>.
            </p>
            <div className="pt-2">
              <Button variant="outlineNeutral" size="lg" asChild className="rounded-full">
                <Link to="/contact">
                  Submit CV via Contact Form
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

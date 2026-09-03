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
      <section className="relative bg-white pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-[#e7dcdb]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#fdedea] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fdedea] border border-[#e7dcdb] text-[#360802] text-xs font-semibold uppercase tracking-wider">
              <span>Careers & Talent</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#360802] tracking-tight leading-[1.05]">
              Build your career in <span className="text-[#f73b20]">banking</span>.
            </h1>

            <p className="text-[#360802]/80 text-base sm:text-lg leading-relaxed">
              Join a licensed financial institution dedicated to financial inclusion, professional integrity, and sustainable economic impact across Rivers State.
            </p>
          </div>
        </div>
      </section>

      {/* Workplace Culture 3-Column Grid */}
      <section className="py-16 md:py-20 bg-white border-b border-[#e7dcdb]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#f73b20] block mb-2">
              Our Workplace
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#360802] tracking-tight leading-[1.08]">
              Why join Rima Microfinance Bank?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="card-3d p-8 rounded-2xl bg-white border border-[#e7dcdb] shadow-3d space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#bcffbb] text-[#34c771] flex items-center justify-center shadow-sm">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-[#360802]">Community Impact</h3>
              <p className="text-xs text-[#ababab] leading-relaxed">
                Directly support local business owners, students, and families in accessing structured banking capital.
              </p>
            </div>

            <div className="card-3d p-8 rounded-2xl bg-white border border-[#e7dcdb] shadow-3d space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#fdedea] text-[#f73b20] flex items-center justify-center shadow-sm">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-[#360802]">Professional Development</h3>
              <p className="text-xs text-[#ababab] leading-relaxed">
                Structured banking training, regulatory compliance certifications, and clear internal leadership pathways.
              </p>
            </div>

            <div className="card-3d p-8 rounded-2xl bg-white border border-[#e7dcdb] shadow-3d space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#e7dcdb] text-[#477ee9] flex items-center justify-center shadow-sm">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-[#360802]">Collaborative Culture</h3>
              <p className="text-xs text-[#ababab] leading-relaxed">
                Work alongside experienced banking executives in an ethical, transparent, and merit-driven environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Job Openings Grid */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#fdedea]/50 to-white border-b border-[#e7dcdb]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#f73b20] block mb-2">
              Available Positions
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-[#360802] tracking-tight leading-tight">
              Current Open Roles
            </h2>
          </div>

          <div className="space-y-4 max-w-4xl">
            {jobOpenings.map((job) => (
              <div 
                key={job.id} 
                className="card-3d p-6 md:p-8 rounded-2xl bg-white border border-[#e7dcdb] shadow-3d flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              >
                <div className="space-y-2">
                  <h3 className="font-heading text-lg font-semibold text-[#360802]">{job.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-[#ababab]">
                    <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#f73b20]" /> {job.location}</span>
                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-[#34c771]" /> {job.type}</span>
                  </div>
                  <p className="text-xs text-[#360802]/70 leading-relaxed pt-1">{job.description}</p>
                </div>
                <Button
                  variant="pill"
                  size="default"
                  className="shrink-0 bg-[#f73b20] hover:bg-[#f84d35] text-white shadow-3d-orange transform hover:-translate-y-0.5 transition-all"
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
            <h3 className="font-heading text-2xl font-semibold text-[#360802]">
              General Applications
            </h3>
            <p className="text-xs sm:text-sm text-[#ababab] leading-relaxed">
              Don't see a specific opening matching your background? Send your curriculum vitae directly to our human resources desk at <span className="font-semibold text-[#360802]">careers@rimamfb.com</span>.
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

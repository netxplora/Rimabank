import { Linkedin, Twitter } from "lucide-react";
import { useCMS } from "@/context/CMSContext";

const defaultTeam = [
  {
    id: "gov-1",
    name: "Pastor Jonathan Tobin",
    role: "Managing Director / CEO",
    bio: "With over 25 years of leadership experience in Nigerian banking, Pastor Tobin directs Rima MFB's mission of expanding financial inclusion and sustainable credit access.",
    image: "/images/team-ceo.jpg",
    linkedin: "#",
    twitter: "#"
  },
  {
    id: "gov-2",
    name: "Otonye Mac-Barango",
    role: "Group Company Secretary & Legal Adviser",
    bio: "An experienced legal counsel ensuring statutory corporate governance, compliance adherence, and regulatory alignment with Central Bank of Nigeria mandates.",
    image: "/images/secretary.jpg",
    linkedin: "#"
  },
  {
    id: "gov-3",
    name: "Sokari Josiah Monday",
    role: "Head, Internal Control & Audit",
    bio: "Enforces rigorous accountability frameworks, continuous financial risk surveillance, and operational integrity across all branch operations.",
    image: "/images/Sokari.jpg",
    linkedin: "#"
  }
];

export function LeadershipTeam() {
  const { siteContent } = useCMS();
  const team = siteContent?.aboutSnapshot?.governanceTeam?.length 
    ? siteContent.aboutSnapshot.governanceTeam 
    : defaultTeam;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 lg:gap-7">
      {team.map((member, idx) => (
        <div
          key={member.id || idx}
          className="rounded-xl sm:rounded-2xl overflow-hidden bg-white border border-[#bae6fd]/60 hover:border-[#0284c7]/40 flex flex-col justify-between group transition-all duration-200 shadow-2xs hover:shadow-xs"
        >
          <div className="aspect-[4/4.5] overflow-hidden bg-[#f0f9ff] relative">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/hero-about.png";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e3f]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="p-3 sm:p-5 flex flex-col justify-between flex-1">
            <div>
              <h3 className="font-heading text-xs sm:text-base font-bold text-[#0a1e3f] mb-0.5 group-hover:text-[#0284c7] transition-colors leading-snug">
                {member.name}
              </h3>
              <p className="text-[#0284c7] text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider mb-2">
                {member.role}
              </p>
              <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed line-clamp-3 sm:line-clamp-4">
                {member.bio}
              </p>
            </div>

            <div className="flex gap-2 pt-2.5 mt-2.5 border-t border-slate-100">
              {(member.linkedin || (member as any).social?.linkedin) && (
                <a
                  href={member.linkedin || (member as any).social?.linkedin}
                  aria-label="LinkedIn"
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#f0f7ff] text-[#0a1e3f] flex items-center justify-center hover:bg-[#0284c7] hover:text-white transition-all shadow-2xs"
                >
                  <Linkedin className="h-3 w-3" />
                </a>
              )}
              {(member.twitter || (member as any).social?.twitter) && (
                <a
                  href={member.twitter || (member as any).social?.twitter}
                  aria-label="Twitter"
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#f0f7ff] text-[#0a1e3f] flex items-center justify-center hover:bg-[#0284c7] hover:text-white transition-all shadow-2xs"
                >
                  <Twitter className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

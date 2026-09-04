import { Linkedin, Twitter } from "lucide-react";

const team = [
  {
    name: "Pastor Jonathan Tobin",
    role: "Managing Director / CEO",
    bio: "With over 25 years of leadership experience in Nigerian banking, Pastor Tobin directs Rima MFB's mission of expanding financial inclusion and sustainable credit access.",
    image: "/images/team-ceo.jpg",
    social: { linkedin: "#", twitter: "#" }
  },
  {
    name: "Otonye Mac-Barango",
    role: "Group Company Secretary & Legal Adviser",
    bio: "An experienced legal counsel ensuring statutory corporate governance, compliance adherence, and regulatory alignment with Central Bank of Nigeria mandates.",
    image: "/images/secretary.jpg",
    social: { linkedin: "#" }
  },
  {
    name: "Sokari Josiah Monday",
    role: "Head, Internal Control & Audit",
    bio: "Enforces rigorous accountability frameworks, continuous financial risk surveillance, and operational integrity across all branch operations.",
    image: "/images/Sokari.jpg",
    social: { linkedin: "#" }
  }
];

export function LeadershipTeam() {
  return (
    <>
      {/* Mobile: horizontal scroll strip */}
      <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-none -mx-4 px-4 sm:hidden">
        {team.map((member, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-52 rounded-xl overflow-hidden bg-white border border-[#e7dcdb] flex flex-col group"
          >
            <div className="h-44 overflow-hidden bg-[#fdedea] relative">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/hero-about.png";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#360802]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-3 flex flex-col gap-1.5">
              <h3 className="font-heading text-[11px] font-semibold text-[#360802] leading-snug">{member.name}</h3>
              <p className="text-[9px] font-semibold uppercase tracking-wider text-[#f73b20] leading-tight">{member.role}</p>
              <div className="flex gap-1.5 pt-2 border-t border-[#e7dcdb]/60 mt-1">
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    aria-label="LinkedIn"
                    className="w-6 h-6 rounded-full bg-[#fdedea] text-[#360802] flex items-center justify-center hover:bg-[#f73b20] hover:text-white transition-all"
                  >
                    <Linkedin className="h-3 w-3" />
                  </a>
                )}
                {member.social.twitter && (
                  <a
                    href={member.social.twitter}
                    aria-label="Twitter"
                    className="w-6 h-6 rounded-full bg-[#fdedea] text-[#360802] flex items-center justify-center hover:bg-[#f73b20] hover:text-white transition-all"
                  >
                    <Twitter className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tablet / Desktop: 3-column rich cards */}
      <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 gap-5 lg:gap-7">
        {team.map((member, idx) => (
          <div
            key={idx}
            className="rounded-2xl overflow-hidden bg-white border border-[#e7dcdb] hover:border-[#f73b20]/40 flex flex-col justify-between group transition-colors"
          >
            <div className="aspect-[4/4.5] overflow-hidden bg-[#fdedea] relative">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/hero-about.png";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#360802]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-5">
              <h3 className="font-heading text-base font-semibold text-[#360802] mb-0.5 group-hover:text-[#f73b20] transition-colors">{member.name}</h3>
              <p className="text-[#f73b20] text-[10px] font-semibold uppercase tracking-wider mb-2.5">{member.role}</p>
              <p className="text-[11px] text-[#ababab] leading-relaxed mb-4">
                {member.bio}
              </p>
              <div className="flex gap-2 pt-2.5 border-t border-[#e7dcdb]/60">
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    aria-label="LinkedIn"
                    className="w-7 h-7 rounded-full bg-[#fdedea] text-[#360802] flex items-center justify-center hover:bg-[#f73b20] hover:text-white transition-all shadow-xs"
                  >
                    <Linkedin className="h-3 w-3" />
                  </a>
                )}
                {member.social.twitter && (
                  <a
                    href={member.social.twitter}
                    aria-label="Twitter"
                    className="w-7 h-7 rounded-full bg-[#fdedea] text-[#360802] flex items-center justify-center hover:bg-[#f73b20] hover:text-white transition-all shadow-xs"
                  >
                    <Twitter className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

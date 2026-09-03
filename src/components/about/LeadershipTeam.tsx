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
    <div className="grid md:grid-cols-3 gap-8">
      {team.map((member, idx) => (
        <div 
          key={idx} 
          className="rounded-cards overflow-hidden bg-white border border-[#e7dcdb] shadow-lift hover:border-[#f73b20]/30 transition-all duration-300 flex flex-col justify-between"
        >
          <div className="aspect-[4/4.5] overflow-hidden bg-[#fdedea]">
            <img 
              src={member.image} 
              alt={member.name} 
              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
              }}
            />
          </div>
          <div className="p-6">
            <h3 className="font-heading text-lg font-semibold text-[#360802] mb-0.5">{member.name}</h3>
            <p className="text-[#f73b20] text-xs font-semibold uppercase tracking-ui mb-3">{member.role}</p>
            <p className="text-xs text-[#ababab] leading-relaxed mb-6">
              {member.bio}
            </p>
            <div className="flex gap-2 pt-3 border-t border-[#e7dcdb]/60">
              {member.social.linkedin && (
                <a 
                  href={member.social.linkedin} 
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-full bg-[#fdedea] text-[#360802] flex items-center justify-center hover:bg-[#f73b20] hover:text-white transition-colors"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                </a>
              )}
              {member.social.twitter && (
                <a 
                  href={member.social.twitter} 
                  aria-label="Twitter"
                  className="w-8 h-8 rounded-full bg-[#fdedea] text-[#360802] flex items-center justify-center hover:bg-[#f73b20] hover:text-white transition-colors"
                >
                  <Twitter className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

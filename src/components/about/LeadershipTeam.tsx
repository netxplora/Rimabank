import { Github, Linkedin, Twitter } from "lucide-react";

const team = [
  {
    name: "Pastor Jonathan Tobin",
    role: "Managing Director / CEO",
    bio: "With over 25 years of experience in the Nigerian banking sector, Pastor Tobin is dedicated to driving financial inclusion across Rivers State through innovative microfinance solutions.",
    image: "/images/team-ceo.jpg",
    social: { linkedin: "#", twitter: "#" }
  },
  {
    name: "Otonye Mac-Barango",
    role: "Group Company Secretary",
    bio: "A legal expert with a deep understanding of financial regulations, Otonye ensures Rima's commitment to compliance and corporate excellence.",
    image: "/images/secretary.jpg",
    social: { linkedin: "#" }
  },
  {
    name: "Sokari Josiah Monday",
    role: "Head Internal Control/Audit",
    bio: "Sokari brings rigorous standards of accountability and transparency to Rima, safeguarding the trust our customers place in us.",
    image: "/images/Sokari.jpg",
    social: { linkedin: "#" }
  }
];

export function LeadershipTeam() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {team.map((member, idx) => (
        <div key={idx} className="group bg-card rounded-[2.5rem] overflow-hidden border border-border/50 hover:shadow-2xl hover:border-primary/20 transition-all duration-500">
          <div className="aspect-[4/5] overflow-hidden bg-muted">
            <img 
              src={member.image} 
              alt={member.name} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
              }}
            />
          </div>
          <div className="p-8">
            <h3 className="text-xl font-bold mb-1">{member.name}</h3>
            <p className="text-primary text-sm font-semibold mb-4">{member.role}</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 h-0 group-hover:h-auto overflow-hidden">
              {member.bio}
            </p>
            <div className="flex gap-4">
              {member.social.linkedin && (
                <a href={member.social.linkedin} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
              {member.social.twitter && (
                <a href={member.social.twitter} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Twitter className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

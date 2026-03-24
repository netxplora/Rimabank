import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Emeka Nwosu",
    role: "SME Owner",
    content: "Rivers MFB provided the working capital I needed to expand my retail business. Their loan process was transparent and the support team was exceptional.",
    rating: 5,
    avatar: "/images/team-ceo.jpg"
  },
  {
    name: "Blessing Amadi",
    role: "Student",
    content: "The student banking app is so easy to use. I can pay my fees and receive money from home instantly without any hassle.",
    rating: 5,
    avatar: "/images/secretary.jpg"
  },
  {
    name: "Tari Sokari",
    role: "Market Trader",
    content: "As a trader, having a bank that understands my daily needs is vital. Rivers MFB agent banking in my neighborhood makes deposits so convenient.",
    rating: 5,
    avatar: "/images/Sokari.jpg"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 mb-6">
            Trusted by Thousands of <br />
            <span className="text-primary italic">Rivers Residents</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hear from our customers who have transformed their personal and business finances with Rivers MFB.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-lg bg-muted/30 relative overflow-hidden group hover:bg-primary transition-colors duration-500">
              <CardContent className="pt-12 pb-8 px-8">
                <Quote className="absolute top-6 left-6 h-8 w-8 text-primary/10 group-hover:text-white/20 transition-colors" />
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                  ))}
                </div>

                <p className="text-foreground group-hover:text-primary-foreground transition-colors mb-8 leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary group-hover:border-white transition-colors">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground group-hover:text-primary-foreground transition-colors">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/70 transition-colors">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

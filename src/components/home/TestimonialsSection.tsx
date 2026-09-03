import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Emeka Nwosu",
    role: "Managing Director, Delta Logistics Ltd",
    content: "Rima MFB provided the working capital we needed when purchasing new fleet trucks. The terms were transparent and our dedicated account manager was responsive throughout.",
    rating: 5,
    location: "Port Harcourt"
  },
  {
    name: "Blessing Amadi",
    role: "Undergraduate Student, UniPort",
    content: "The student account has zero maintenance charges. I receive my allowance and pay for campus books smoothly with my debit card.",
    rating: 5,
    location: "Choba"
  },
  {
    name: "Tari Sokari",
    role: "Wholesale Merchant, Mile 1 Market",
    content: "Having an agency banking terminal right in our market cluster simplifies my daily cash deposits. I no longer waste hours in transit to deposit store takings.",
    rating: 5,
    location: "Mile 1 Market"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-white border-b border-[#e7dcdb]/60">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-semibold uppercase tracking-ui text-[#f73b20] block mb-2">
            Client Experience
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-medium text-[#360802] tracking-tight leading-[1.05]">
            Trusted by business owners and individuals across the state.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="rounded-cards bg-white border border-[#e7dcdb] p-8 shadow-lift flex flex-col justify-between hover:border-[#f73b20]/30 transition-colors duration-300"
            >
              <div>
                <div className="flex items-center gap-1 text-[#f73b20] mb-6">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                <p className="text-[#360802]/90 text-sm leading-relaxed mb-8">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#e7dcdb]/60">
                <h4 className="font-heading text-sm font-semibold text-[#360802]">
                  {item.name}
                </h4>
                <p className="text-xs text-[#ababab]">
                  {item.role} &bull; {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Star, CheckCircle } from "lucide-react";

const testimonials = [
  {
    name: "Emeka Nwosu",
    role: "Managing Director, Delta Logistics Ltd",
    content: "Rima MFB provided the working capital we needed when purchasing new fleet trucks. The terms were transparent and our dedicated account manager was responsive throughout.",
    rating: 5,
    location: "Port Harcourt",
    verified: "Corporate Client"
  },
  {
    name: "Blessing Amadi",
    role: "Undergraduate Student, UniPort",
    content: "The student account has zero maintenance charges. I receive my allowance and pay for campus books smoothly with my debit card without unexpected debits.",
    rating: 5,
    location: "Choba",
    verified: "Campus Account"
  },
  {
    name: "Tari Sokari",
    role: "Wholesale Merchant, Mile 1 Market",
    content: "Having an agency banking terminal right in our market cluster simplifies my daily cash deposits. I no longer waste hours in transit to deposit store takings.",
    rating: 5,
    location: "Mile 1 Market",
    verified: "Merchant Client"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-20 bg-white border-b border-[#e2e8f0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block mb-2">
              Client Experience
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.08]">
              Trusted by business owners and individuals across Rivers State.
            </h2>
          </div>
          <p className="text-[#64748b] text-sm leading-relaxed max-w-sm md:text-right">
            Real feedback from commercial enterprises, market traders, and campus students.
          </p>
        </div>

        {/* Open Editorial Testimonials Grid (No heavy card containers) */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#e2e8f0] border-t border-b border-[#e2e8f0]">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="py-8 md:p-6 lg:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#0284c7] gap-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#10b981] bg-[#dcfce7] px-2 py-0.5 rounded-full">
                    <CheckCircle className="h-3 w-3" />
                    {item.verified}
                  </span>
                </div>

                <p className="text-[#0a1e3f]/85 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#e2e8f0] flex items-center justify-between">
                <div>
                  <h4 className="font-heading text-sm font-semibold text-[#0a1e3f]">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#64748b]">
                    {item.role}
                  </p>
                </div>
                <span className="text-[10px] font-medium text-[#64748b] bg-[#f0f7ff] px-2 py-0.5 rounded">
                  {item.location}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

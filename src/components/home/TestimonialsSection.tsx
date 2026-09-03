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
    <section className="py-12 md:py-20 bg-white border-b border-[#e7dcdb]/60">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-7 md:mb-12">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#f73b20] block mb-1.5">
              Client Experience
            </span>
            <h2 className="font-heading text-xl sm:text-3xl lg:text-5xl font-semibold text-[#360802] tracking-tight leading-[1.08]">
              Trusted by business owners and individuals across Rivers State.
            </h2>
          </div>
          <p className="text-[#ababab] text-xs leading-relaxed sm:max-w-xs hidden sm:block sm:text-right">
            Real feedback from commercial enterprises, market traders, and campus students.
          </p>
        </div>

        {/* Mobile: horizontal scroll carousel */}
        <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-none -mx-4 px-4 sm:hidden">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-72 rounded-xl bg-white border border-[#e7dcdb] p-4 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-[#f73b20] gap-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-[#34c771] bg-[#bcffbb]/40 px-2 py-0.5 rounded-full">
                    <CheckCircle className="h-2.5 w-2.5" />
                    {item.verified}
                  </span>
                </div>
                <p className="text-[#360802]/85 text-[11px] leading-relaxed italic mb-3">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>
              <div className="pt-2.5 border-t border-[#e7dcdb]/60 flex items-center justify-between">
                <div>
                  <h4 className="font-heading text-[11px] font-semibold text-[#360802]">{item.name}</h4>
                  <p className="text-[9px] text-[#ababab] leading-tight">{item.role}</p>
                </div>
                <span className="text-[9px] font-medium text-[#ababab] bg-[#fdedea] px-1.5 py-0.5 rounded">
                  {item.location}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Tablet / Desktop: 3-column card grid */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 gap-5 lg:gap-7">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="card-3d rounded-2xl bg-white border border-[#e7dcdb] p-6 shadow-3d hover:border-[#f73b20]/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#f73b20] gap-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-[#34c771] bg-[#bcffbb]/40 px-2 py-0.5 rounded-full">
                    <CheckCircle className="h-3 w-3" />
                    {item.verified}
                  </span>
                </div>
                <p className="text-[#360802]/85 text-xs leading-relaxed mb-5 italic">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>
              <div className="pt-3 border-t border-[#e7dcdb]/60 flex items-center justify-between">
                <div>
                  <h4 className="font-heading text-xs font-semibold text-[#360802]">{item.name}</h4>
                  <p className="text-[10px] text-[#ababab]">{item.role}</p>
                </div>
                <span className="text-[9px] font-medium text-[#ababab] bg-[#fdedea] px-2 py-0.5 rounded">
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

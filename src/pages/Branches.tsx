import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Clock, Search, Map as MapIcon, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";

interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string | null;
  opening_hours: string | null;
  latitude: number | null;
  longitude: number | null;
  city: string;
  state: string | null;
}

const staticBranches: Branch[] = [
  {
    id: "1",
    name: "Head Office / Main Branch",
    address: "No. 3 Evo Crescent, GRA Phase 2",
    city: "Port Harcourt",
    state: "Rivers",
    phone: "+234 811 947 7050",
    opening_hours: "Mon - Fri: 8:00 AM - 4:00 PM",
    latitude: 4.8241,
    longitude: 6.9924,
  },
  {
    id: "2",
    name: "Trans Amadi Branch",
    address: "14 Trans Amadi Industrial Layout",
    city: "Port Harcourt",
    state: "Rivers",
    phone: "+234 811 947 7050",
    opening_hours: "Mon - Fri: 8:00 AM - 4:00 PM",
    latitude: 4.8105,
    longitude: 7.0396,
  },
  {
    id: "3",
    name: "Rumuola Commercial Branch",
    address: "22 Rumuola Road",
    city: "Port Harcourt",
    state: "Rivers",
    phone: "+234 811 947 7050",
    opening_hours: "Mon - Fri: 8:00 AM - 4:00 PM",
    latitude: 4.8468,
    longitude: 6.9856,
  },
  {
    id: "4",
    name: "Abuloma Marine Branch",
    address: "Chief Opuapu Street, Abuloma",
    city: "Port Harcourt",
    state: "Rivers",
    phone: "+234 811 947 7050",
    opening_hours: "Mon - Fri: 8:00 AM - 4:00 PM",
    latitude: 4.7733,
    longitude: 7.0321,
  },
  {
    id: "5",
    name: "Choba Campus Branch",
    address: "East West Road, Near UniPort",
    city: "Choba",
    state: "Rivers",
    phone: "+234 811 947 7050",
    opening_hours: "Mon - Fri: 8:00 AM - 4:00 PM",
    latitude: 4.8941,
    longitude: 6.8953,
  }
];

export default function Branches() {
  const [branches] = useState<Branch[]>(staticBranches);
  const [activeBranchId, setActiveBranchId] = useState<string | null>("1");
  const [searchQuery, setSearchQuery] = useState("");

  const activeBranch = branches.find(b => b.id === activeBranchId);

  const filteredBranches = branches.filter(b =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewOnMap = (branchId: string) => {
    setActiveBranchId(branchId);
    const mapElement = document.getElementById('map-container');
    if (mapElement && window.innerWidth < 1024) {
      mapElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Layout>
      {/* Editorial Hero */}
      <section className="relative bg-white pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-[#e2e8f0]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f0f7ff] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f7ff] border border-[#e2e8f0] text-[#0a1e3f] text-xs font-semibold uppercase tracking-wider">
              <span>Regional Network</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.05]">
              Locate a <span className="text-[#0284c7]">Rima MFB branch</span>.
            </h1>

            <p className="text-[#0a1e3f]/80 text-base sm:text-lg leading-relaxed">
              Find your nearest full-service branch location for account origination, debit card pickup, and dedicated commercial advisory.
            </p>
          </div>
        </div>
      </section>

      {/* Branch Locator Section */}
      <section className="py-16 md:py-20 bg-white border-b border-[#e2e8f0]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 min-h-[600px]">
            
            {/* Branch List (6 cols) */}
            <div className="lg:col-span-6 space-y-5">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748b]" />
                <Input
                  placeholder="Search by street name, branch, or area..."
                  className="pl-11 h-12 bg-[#f0f7ff]/40 border-[#e2e8f0] rounded-xl text-xs text-[#0a1e3f] focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="space-y-3 max-h-[650px] overflow-y-auto pr-1">
                {filteredBranches.length === 0 ? (
                  <div className="text-center py-16 text-xs text-[#64748b]">
                    No branches found matching your search.
                  </div>
                ) : (
                  filteredBranches.map(branch => (
                    <div
                      key={branch.id}
                      onClick={() => handleViewOnMap(branch.id)}
                      className={cn(
                        "p-5 rounded-2xl border transition-all duration-200 cursor-pointer",
                        activeBranchId === branch.id
                          ? "border-[#0284c7] bg-[#f0f7ff]/40 ring-1 ring-[#0284c7]/30"
                          : "border-[#e2e8f0] bg-white hover:border-[#0284c7]/40"
                      )}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className={cn("font-heading text-base font-semibold", activeBranchId === branch.id ? "text-[#0284c7]" : "text-[#0a1e3f]")}>
                          {branch.name}
                        </h3>
                        {activeBranchId === branch.id && (
                          <span className="text-[10px] bg-[#0284c7] text-white px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                            Selected
                          </span>
                        )}
                      </div>

                      <div className="space-y-2 text-xs text-[#0a1e3f]/85">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-3.5 w-3.5 text-[#0284c7] mt-0.5 shrink-0" />
                          <span>{branch.address}, {branch.city}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-3.5 w-3.5 text-[#34c771] shrink-0" />
                          <span>{branch.phone || "+234 811 947 7050"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5 text-[#64748b] shrink-0" />
                          <span>{branch.opening_hours || "Mon - Fri: 8:00 AM - 4:00 PM"}</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#e2e8f0]/60 flex gap-3">
                        <Button
                          size="sm"
                          variant={activeBranchId === branch.id ? "pill" : "outlineNeutral"}
                          className="flex-1 text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewOnMap(branch.id);
                          }}
                        >
                          <MapIcon className="mr-1.5 h-3.5 w-3.5" />
                          View on Map
                        </Button>
                        <Button size="sm" variant="outlineNeutral" className="flex-1 text-xs rounded-full" asChild>
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.address + ", " + branch.city)}`}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Navigation className="mr-1.5 h-3.5 w-3.5 text-[#0284c7]" />
                            Directions
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Map Side (6 cols) */}
            <div id="map-container" className="lg:col-span-6">
              <div className="lg:sticky lg:top-24">
                <div className="rounded-3xl overflow-hidden h-[400px] lg:h-[650px] border border-[#e2e8f0] bg-[#f0f7ff] relative">
                  {activeBranch && activeBranch.latitude && activeBranch.longitude ? (
                    <div className="w-full h-full">
                      <iframe
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://maps.google.com/maps?q=${activeBranch.latitude},${activeBranch.longitude}&hl=en&z=15&output=embed`}
                      ></iframe>

                      {/* Map Location Badge */}
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl border border-[#e2e8f0] p-3.5 text-xs text-[#0a1e3f] max-w-xs shadow-sm">
                        <span className="font-heading font-bold text-xs block">{activeBranch.name}</span>
                        <span className="text-[11px] text-[#64748b]">{activeBranch.address}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[#64748b] p-6 text-center">
                      <MapPin className="h-8 w-8 text-[#0284c7] mb-2" />
                      <h3 className="font-heading font-semibold text-sm text-[#0a1e3f]">Select a Branch</h3>
                      <p className="text-xs text-[#64748b]">Click any branch from the list to view its map location.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}

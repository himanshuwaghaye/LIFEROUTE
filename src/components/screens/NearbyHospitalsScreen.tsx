import React, { useState } from "react";
import {
  ArrowLeft,
  Search,
  Hospital,
  MapPin,
  Clock,
  Phone,
  ChevronRight,
  ShieldCheck,
  Activity,
  Bed,
} from "lucide-react";
import { sound } from "@/lib/soundFx";

interface NearbyHospitalsScreenProps {
  onBack: () => void;
  onSelectHospital?: (hospital: any) => void;
}

const HOSPITALS_LIST = [
  {
    id: "hosp_1",
    name: "City Care Hospital",
    type: "Private",
    distance: "1.8 km",
    time: "5 min",
    status: "Available",
    phone: "+91 33 2229 4000",
    tags: ["Trauma Care", "Cardiology", "Neurology"],
    icuBeds: 4,
  },
  {
    id: "hosp_2",
    name: "Apollo Hospital",
    type: "Private",
    distance: "3.4 km",
    time: "8 min",
    status: "Available",
    phone: "+91 33 2475 1200",
    tags: ["ICU", "Emergency", "Multi-Speciality"],
    icuBeds: 6,
  },
  {
    id: "hosp_3",
    name: "Sanjeevani Hospital",
    type: "Government",
    distance: "5.2 km",
    time: "12 min",
    status: "Available",
    phone: "+91 33 2341 5000",
    tags: ["Orthopedics", "General Surgery", "ICU"],
    icuBeds: 2,
  },
  {
    id: "hosp_4",
    name: "People's Hospital",
    type: "Government",
    distance: "6.7 km",
    time: "15 min",
    status: "Available",
    phone: "+91 33 2555 8000",
    tags: ["Emergency", "Maternity", "Pediatrics"],
    icuBeds: 5,
  },
];

export const NearbyHospitalsScreen: React.FC<NearbyHospitalsScreenProps> = ({
  onBack,
  onSelectHospital,
}) => {
  const [query, setQuery] = useState("");
  const [filterType, setFilterType] = useState<"All" | "Government" | "Private" | "Specialist">("All");

  const filtered = HOSPITALS_LIST.filter((h) => {
    const matchesSearch =
      h.name.toLowerCase().includes(query.toLowerCase()) ||
      h.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    if (!matchesSearch) return false;
    if (filterType === "All") return true;
    if (filterType === "Specialist") return h.tags.includes("Cardiology") || h.tags.includes("Neurology");
    return h.type === filterType;
  });

  return (
    <div className="min-h-full flex flex-col justify-between bg-slate-50 text-slate-900 pb-6">
      <div className="space-y-3">
        {/* Top Header */}
        <div className="p-4 bg-white border-b border-slate-200/80 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="font-bold text-base text-slate-900">Nearby Hospitals</h2>
        </div>

        <div className="px-4 space-y-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search hospital or specialty"
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 text-xs font-semibold no-scrollbar">
            {(["All", "Government", "Private", "Specialist"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterType(cat)}
                className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                  filterType === cat
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Hospitals List */}
          <div className="space-y-2.5">
            {filtered.map((hospital) => (
              <div
                key={hospital.id}
                onClick={() => {
                  sound.playChime();
                  onSelectHospital?.(hospital);
                }}
                className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600 shrink-0 group-hover:scale-105 transition-transform">
                      <Hospital className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {hospital.name}
                        </h4>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{hospital.distance}</span>
                        <span>•</span>
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{hospital.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      {hospital.status}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                {/* Specialties / Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5 pt-2.5 border-t border-slate-100">
                  {hospital.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 ml-auto">
                    {hospital.icuBeds} ICU Beds Ready
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

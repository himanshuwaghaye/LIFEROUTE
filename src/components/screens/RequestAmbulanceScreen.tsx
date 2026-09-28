import React, { useState } from "react";
import {
  ArrowLeft,
  Ambulance,
  MapPin,
  CheckCircle2,
  Navigation,
  Car,
  HeartPulse,
  Flame,
  Wind,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/shared";

interface RequestAmbulanceScreenProps {
  onBack: () => void;
  onConfirm: (data: { type: string; priority: string }) => void;
}

export const RequestAmbulanceScreen: React.FC<RequestAmbulanceScreenProps> = ({
  onBack,
  onConfirm,
}) => {
  const [selectedEmergencyType, setSelectedEmergencyType] = useState<"illness" | "accident">("illness");
  const [selectedUnitType, setSelectedUnitType] = useState("ALS");

  return (
    <div className="min-h-full flex flex-col justify-between bg-slate-50 text-slate-900 pb-6">
      <div className="space-y-4">
        {/* Top Bar */}
        <div className="p-4 bg-white border-b border-slate-200/80 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="font-bold text-base text-slate-900">Request Ambulance</h2>
        </div>

        <div className="px-4 space-y-4">
          {/* Red Alert Pill */}
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-100 text-red-700 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-red-500 text-white shrink-0">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-red-800">Emergency detected</h4>
              <p className="text-[11px] text-red-600">We will find the nearest available ambulance</p>
            </div>
          </div>

          {/* Interactive Map Visual */}
          <div className="relative h-64 rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
            <svg className="w-full h-full object-cover" viewBox="0 0 400 260">
              {/* Road Grid */}
              <g stroke="#cbd5e1" strokeWidth="6" fill="none">
                <path d="M-10 60 L410 60" />
                <path d="M-10 140 L410 140" />
                <path d="M-10 210 L410 210" />
                <path d="M80 -10 L80 270" />
                <path d="M200 -10 L200 270" />
                <path d="M310 -10 L310 270" />
                <path d="M60 220 Q 200 130 340 50" stroke="#38bdf8" strokeWidth="4" strokeDasharray="6 4" />
              </g>

              {/* Patient Pin */}
              <g transform="translate(195, 135)">
                <circle r="22" fill="#3b82f6" opacity="0.25" className="animate-ping" />
                <circle r="8" fill="#2563eb" />
                <circle r="4" fill="#ffffff" />
              </g>

              {/* Nearest Ambulance Pin (Unit 08) */}
              <g transform="translate(290, 75)">
                <circle r="14" fill="#ef4444" opacity="0.2" className="animate-pulse" />
                <rect x="-12" y="-12" width="24" height="24" rx="6" fill="#dc2626" />
                <text y="3" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
                  AMB
                </text>
              </g>

              {/* Other Ambulance Units */}
              <g transform="translate(90, 85)">
                <circle r="10" fill="#64748b" opacity="0.2" />
                <rect x="-9" y="-9" width="18" height="18" rx="4" fill="#475569" />
                <text y="3" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">
                  AMB
                </text>
              </g>

              <g transform="translate(110, 195)">
                <circle r="10" fill="#64748b" opacity="0.2" />
                <rect x="-9" y="-9" width="18" height="18" rx="4" fill="#475569" />
                <text y="3" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">
                  AMB
                </text>
              </g>
            </svg>

            {/* Nearest Ambulance Tooltip Floating Card */}
            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs p-2.5 rounded-2xl shadow-md border border-slate-100 flex items-center gap-2 text-xs">
              <div className="p-1.5 rounded-xl bg-red-100 text-red-600">
                <Ambulance className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-900">Nearest Ambulance</div>
                <div className="text-[10px] text-slate-500 font-medium">1.2 km • 3 mins</div>
              </div>
            </div>
          </div>

          {/* Ambulance Found Status Card */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-600 text-white">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-emerald-900">Ambulance Found</h4>
                <p className="text-[11px] text-emerald-700">Type: ALS (Advanced Life Support)</p>
                <p className="text-[10px] text-emerald-600 mt-0.5">ETA: 3 minutes • 1.2 km away</p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full">
              Ready
            </span>
          </div>

          {/* Emergency Type Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-2">Emergency Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedEmergencyType("illness")}
                className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                  selectedEmergencyType === "illness"
                    ? "border-blue-600 bg-blue-50/80 ring-2 ring-blue-500/20"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div
                  className={`p-2 rounded-xl ${
                    selectedEmergencyType === "illness" ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600"
                  }`}
                >
                  <HeartPulse className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">Serious Illness</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedEmergencyType("accident")}
                className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                  selectedEmergencyType === "accident"
                    ? "border-blue-600 bg-blue-50/80 ring-2 ring-blue-500/20"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div
                  className={`p-2 rounded-xl ${
                    selectedEmergencyType === "accident" ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600"
                  }`}
                >
                  <Car className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">Accident / Injury</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Confirm Button */}
      <div className="p-4 pt-2">
        <button
          onClick={() =>
            onConfirm({
              type: selectedEmergencyType === "illness" ? "Serious Illness" : "Accident / Injury",
              priority: "Critical",
            })
          }
          className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Confirm & Share Location</span>
        </button>
      </div>
    </div>
  );
};

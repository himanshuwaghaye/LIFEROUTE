import React, { useState } from "react";
import {
  ArrowLeft,
  Navigation,
  Clock,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  Ambulance,
  Car,
} from "lucide-react";
import { sound } from "@/lib/soundFx";

interface AmbulanceRouteScreenProps {
  onBack: () => void;
  onStartNavigation?: () => void;
}

export const AmbulanceRouteScreen: React.FC<AmbulanceRouteScreenProps> = ({
  onBack,
  onStartNavigation,
}) => {
  const [navStarted, setNavStarted] = useState(false);

  const handleStartNav = () => {
    setNavStarted(true);
    sound.playSuccess();
    onStartNavigation?.();
  };

  return (
    <div className="min-h-full flex flex-col justify-between bg-slate-50 text-slate-900 pb-6">
      <div className="space-y-3.5">
        {/* Top Header */}
        <div className="p-4 bg-white border-b border-slate-200/80 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="font-bold text-base text-slate-900">Ambulance Route & Navigation</h2>
        </div>

        <div className="px-4 space-y-3.5">
          {/* Real-time Map Visual */}
          <div className="relative h-64 rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
            <svg className="w-full h-full object-cover" viewBox="0 0 400 260">
              <g stroke="#cbd5e1" strokeWidth="6" fill="none">
                <path d="M-10 60 L410 60" />
                <path d="M-10 140 L410 140" />
                <path d="M-10 210 L410 210" />
                <path d="M80 -10 L80 270" />
                <path d="M200 -10 L200 270" />
                <path d="M310 -10 L310 270" />
              </g>

              {/* Turn-by-turn Route Path */}
              <path
                d="M 60 210 L 190 210 L 190 140 L 310 140 L 310 60"
                fill="none"
                stroke="#2563eb"
                strokeWidth="5"
                strokeDasharray="6 4"
                className="animate-pulse"
              />

              {/* Ambulance Origin */}
              <g transform="translate(60, 210)">
                <rect x="-10" y="-10" width="20" height="20" rx="6" fill="#2563eb" />
                <text y="3" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">
                  AMB
                </text>
              </g>

              {/* Destination Hospital Marker */}
              <g transform="translate(310, 60)">
                <circle r="14" fill="#ef4444" opacity="0.25" className="animate-ping" />
                <circle r="7" fill="#dc2626" />
                <circle r="3" fill="#ffffff" />
              </g>
            </svg>

            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-xs text-[10px] font-bold text-slate-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Traffic: Moderate</span>
            </div>
          </div>

          {/* Route Summary Card */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <Navigation className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Best Route</h4>
                  <p className="text-sm font-black text-blue-600 mt-0.5">3.2 km • 8 min</p>
                </div>
              </div>

              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                Fastest
              </span>
            </div>

            <button
              onClick={handleStartNav}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-xs shadow-md shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Navigation className="w-4 h-4" />
              <span>{navStarted ? "Navigation Active (Turn-by-turn)" : "Start Navigation"}</span>
            </button>
          </div>

          {/* Live Road Traffic Updates */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Live Route Updates
            </span>

            <div className="space-y-2 text-xs">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Avoiding traffic at Main Road</span>
                </div>
                <span className="text-[10px] text-slate-400">1 min ago</span>
              </div>

              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 text-slate-700">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Road construction ahead (alternate route)</span>
                </div>
                <span className="text-[10px] text-slate-400">2 min ago</span>
              </div>

              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Road condition: Good</span>
                </div>
                <span className="text-[10px] text-slate-400">3 min ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

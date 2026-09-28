import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  X,
  Ambulance,
  Phone,
  Share2,
  Navigation,
  Clock,
  MapPin,
  CheckCircle2,
  HeartPulse,
} from "lucide-react";
import { sound } from "@/lib/soundFx";

interface LiveTrackingScreenProps {
  onBack: () => void;
  onClose: () => void;
  onViewRoute?: () => void;
  onViewHospitalPrep?: () => void;
}

export const LiveTrackingScreen: React.FC<LiveTrackingScreenProps> = ({
  onBack,
  onClose,
  onViewRoute,
  onViewHospitalPrep,
}) => {
  const [eta, setEta] = useState(3);
  const [distance, setDistance] = useState(1.2);
  const [sharedToast, setSharedToast] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setEta((prev) => (prev > 1 ? prev - 1 : 1));
      setDistance((prev) => (prev > 0.4 ? parseFloat((prev - 0.2).toFixed(1)) : 0.4));
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const handleShare = () => {
    sound.playChime();
    setSharedToast(true);
    setTimeout(() => setSharedToast(false), 3000);
  };

  const handleCall = () => {
    sound.playChime();
    window.open("tel:+919830122941");
  };

  return (
    <div className="min-h-full flex flex-col justify-between bg-slate-50 text-slate-900 pb-6">
      <div className="space-y-3">
        {/* Top Header */}
        <div className="p-4 bg-white border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="font-bold text-base text-slate-900">Live Tracking</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-4 space-y-3.5">
          {/* Top Blue ETA Bar */}
          <div className="p-4 rounded-2xl bg-blue-600 text-white flex items-center justify-between shadow-md shadow-blue-600/20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-xs">
                <Ambulance className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Ambulance Arriving</h3>
                <p className="text-sm font-black text-white mt-0.5">
                  ETA {eta} min • {distance} km
                </p>
              </div>
            </div>
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          </div>

          {/* Real-time Route Map Visual */}
          <div className="relative h-72 rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
            <svg className="w-full h-full object-cover" viewBox="0 0 400 300">
              {/* Road Network */}
              <g stroke="#cbd5e1" strokeWidth="6" fill="none">
                <path d="M-10 60 L410 60" />
                <path d="M-10 160 L410 160" />
                <path d="M-10 240 L410 240" />
                <path d="M70 -10 L70 310" />
                <path d="M190 -10 L190 310" />
                <path d="M310 -10 L310 310" />
              </g>

              {/* Animated Blue Route Path */}
              <path
                d="M 90 240 Q 140 180 230 160 T 320 70"
                fill="none"
                stroke="#2563eb"
                strokeWidth="5"
                strokeDasharray="8 6"
                className="animate-pulse"
              />

              {/* Patient Pin */}
              <g transform="translate(320, 70)">
                <circle r="16" fill="#ef4444" opacity="0.25" className="animate-ping" />
                <circle r="7" fill="#dc2626" />
                <circle r="3" fill="#ffffff" />
                <text y="-12" fill="#dc2626" fontSize="9" fontWeight="bold" textAnchor="middle">
                  You
                </text>
              </g>

              {/* Ambulance Moving Marker */}
              <g transform="translate(190, 160)">
                <circle r="18" fill="#3b82f6" opacity="0.3" className="animate-pulse" />
                <rect x="-13" y="-13" width="26" height="26" rx="7" fill="#2563eb" />
                <text y="4" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
                  AMB
                </text>
              </g>
            </svg>

            {/* Traffic Badge */}
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-full shadow-xs border border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Traffic: Moderate</span>
            </div>
          </div>

          {/* Ambulance Details Card */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Ambulance Details
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="p-2 rounded-xl bg-red-50 text-red-500">
                    <Ambulance className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">MH 12 AB 1234</h4>
                    <p className="text-xs text-slate-500">Paramedic: Rohan Sharma</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCall}
                className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center shadow-xs cursor-pointer"
                aria-label="Call crew"
              >
                <Phone className="w-5 h-5" />
              </button>
            </div>

            {/* Share & Route Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={handleShare}
                className="py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Share Live Location</span>
              </button>

              {onViewRoute && (
                <button
                  onClick={onViewRoute}
                  className="py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>View Route</span>
                </button>
              )}
            </div>
          </div>

          {/* Hospital Preparation Quick Link Card */}
          {onViewHospitalPrep && (
            <div
              onClick={onViewHospitalPrep}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 flex items-center justify-between cursor-pointer hover:shadow-xs transition-all"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-950">Hospital Triage Pre-alerted</h4>
                  <p className="text-[10px] text-emerald-700">Trauma bay & Cardiology team on standby</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700">View →</span>
            </div>
          )}
        </div>
      </div>

      {sharedToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg">
          ✓ Live GPS Tracking Link copied to clipboard!
        </div>
      )}
    </div>
  );
};

import React from "react";
import {
  Cross,
  Heart,
  ShieldCheck,
  Zap,
  ArrowRight,
  Phone,
  Sparkles,
  Ambulance,
  Hospital,
  Brain,
  CreditCard,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/shared";

interface LandingScreenProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onGetStarted, onLogin }) => {
  return (
    <div className="min-h-full flex flex-col justify-between bg-gradient-to-b from-sky-50 via-white to-blue-50/50 p-6 text-slate-800">
      {/* Top Header / Brand */}
      <div className="pt-4 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-red-500 p-0.5 shadow-xl shadow-blue-500/20 mb-4 animate-bounce duration-1000">
          <div className="w-full h-full bg-white rounded-[22px] flex items-center justify-center">
            <div className="relative">
              <Cross className="w-8 h-8 text-blue-600 stroke-[2.5]" />
              <Heart className="w-4 h-4 text-red-500 fill-red-500 absolute -bottom-1 -right-1 animate-pulse" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-black tracking-tight text-slate-900 flex items-center justify-center gap-1">
          LifeRoute<span className="text-red-500">.</span>
        </h1>
        <p className="text-sm font-semibold text-slate-600 mt-1 max-w-xs">
          Emergency Healthcare Coordination When Every Second Counts
        </p>
      </div>

      {/* Hero Visual Card */}
      <div className="my-6 relative rounded-3xl overflow-hidden shadow-2xl border border-blue-100 bg-gradient-to-br from-blue-600 via-indigo-700 to-slate-900 text-white p-6">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-44 h-44 bg-red-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-44 h-44 bg-blue-400/20 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col items-center text-center py-4">
          <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 border border-white/20 shadow-inner">
            <Heart className="w-10 h-10 text-red-400 fill-red-400 animate-pulse" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-blue-200">
            CONNECT • COORDINATE • SAVE LIVES
          </span>
          <h2 className="text-xl font-bold mt-2 text-white">
            Smarter Emergency Dispatch & Hospital Handshake
          </h2>

          <div className="mt-4 flex items-center justify-center gap-3 text-xs text-blue-100">
            <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-xs">
              <Zap className="w-3.5 h-3.5 text-amber-300" /> &lt;3 min ETA
            </span>
            <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> ER Ready
            </span>
          </div>
        </div>
      </div>

      {/* Feature Pills */}
      <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700 mb-6">
        <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white border border-slate-100 shadow-xs">
          <div className="p-1.5 rounded-xl bg-red-50 text-red-500">
            <Ambulance className="w-4 h-4" />
          </div>
          <span>Instant Dispatch</span>
        </div>
        <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white border border-slate-100 shadow-xs">
          <div className="p-1.5 rounded-xl bg-blue-50 text-blue-600">
            <Hospital className="w-4 h-4" />
          </div>
          <span>Hospital Pre-alert</span>
        </div>
        <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white border border-slate-100 shadow-xs">
          <div className="p-1.5 rounded-xl bg-purple-50 text-purple-600">
            <Brain className="w-4 h-4" />
          </div>
          <span>AI Triage Scan</span>
        </div>
        <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white border border-slate-100 shadow-xs">
          <div className="p-1.5 rounded-xl bg-emerald-50 text-emerald-600">
            <CreditCard className="w-4 h-4" />
          </div>
          <span>Digital Receipts</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5 pb-2">
        <button
          onClick={onGetStarted}
          className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-base shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={onLogin}
          className="w-full py-3 px-6 rounded-2xl bg-white hover:bg-slate-50 active:scale-[0.98] text-slate-700 font-bold text-sm border border-slate-200 shadow-xs transition-all cursor-pointer"
        >
          Login
        </button>
      </div>
    </div>
  );
};

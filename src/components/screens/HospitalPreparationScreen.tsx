import React from "react";
import {
  ArrowLeft,
  Hospital,
  CheckCircle2,
  ShieldCheck,
  User,
  HeartPulse,
  Activity,
  Phone,
  Clock,
} from "lucide-react";

interface HospitalPreparationScreenProps {
  onBack: () => void;
  onCallHospital?: () => void;
}

export const HospitalPreparationScreen: React.FC<HospitalPreparationScreenProps> = ({
  onBack,
  onCallHospital,
}) => {
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
          <h2 className="font-bold text-base text-slate-900">Hospital Preparation</h2>
        </div>

        <div className="px-4 space-y-3.5">
          {/* Green Status Alert Banner */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-600 text-white shrink-0 mt-0.5">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-emerald-950">Information shared with hospital</h4>
              <p className="text-[11px] text-emerald-700 mt-0.5">
                The hospital team is getting ready for your arrival.
              </p>
            </div>
          </div>

          {/* Patient Details Card */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Patient Details
            </span>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Name:</span>
                <span className="font-bold text-slate-900">Himanshu Waghaye</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Age / Gender:</span>
                <span className="font-semibold text-slate-800">20 / Male</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Emergency Type:</span>
                <span className="font-bold text-red-600">Suspected Cardiac Event</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">ETA:</span>
                <span className="font-bold text-emerald-600">8 min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Ambulance:</span>
                <span className="font-mono font-semibold text-slate-800">MH 12 AB 1234</span>
              </div>
            </div>
          </div>

          {/* Hospital Team Notified Checklist Card */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Hospital Team Notified
            </span>

            <div className="space-y-2 text-xs">
              {[
                { name: "Emergency Department", ready: true },
                { name: "Cardiologist", ready: true },
                { name: "Neurologist (on standby)", ready: true },
                { name: "ICU Team", ready: true },
              ].map((team, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-slate-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{team.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Security & Consent Note */}
          <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-2.5 text-[11px] text-blue-900">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p>
              Your information has been securely shared with the hospital (with your consent) to minimize ER reception delays.
            </p>
          </div>
        </div>
      </div>

      {/* Call ED Button */}
      <div className="p-4 pt-2">
        <button
          onClick={onCallHospital}
          className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Phone className="w-4 h-4" />
          <span>Call Hospital Emergency Desk</span>
        </button>
      </div>
    </div>
  );
};

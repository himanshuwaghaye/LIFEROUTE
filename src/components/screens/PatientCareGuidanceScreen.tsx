import React from "react";
import {
  ArrowLeft,
  ShieldCheck,
  Heart,
  Droplet,
  Thermometer,
  Ban,
  Activity,
  AlertCircle,
  Phone,
} from "lucide-react";

interface PatientCareGuidanceScreenProps {
  onBack: () => void;
  onCallEmergency?: () => void;
}

export const PatientCareGuidanceScreen: React.FC<PatientCareGuidanceScreenProps> = ({
  onBack,
  onCallEmergency,
}) => {
  const steps = [
    {
      icon: Heart,
      color: "text-amber-500",
      bg: "bg-amber-50",
      title: "Keep the patient calm and still.",
      desc: "Minimizing exertion reduces myocardial oxygen demand and stabilizes blood pressure.",
    },
    {
      icon: Droplet,
      color: "text-red-500",
      bg: "bg-red-50",
      title: "If bleeding, apply gentle pressure with a clean cloth.",
      desc: "Do not remove initial dressings even if soaked; layer additional sterile pads on top.",
    },
    {
      icon: Thermometer,
      color: "text-blue-500",
      bg: "bg-blue-50",
      title: "Keep the patient warm.",
      desc: "Prevent hypothermia by covering with a blanket or coat while maintaining airway patency.",
    },
    {
      icon: Ban,
      color: "text-rose-500",
      bg: "bg-rose-50",
      title: "Do not give food or drink (unless advised by a doctor).",
      desc: "Avoid aspiration risk in case surgical anesthesia or airway intubation is required.",
    },
    {
      icon: Activity,
      color: "text-purple-500",
      bg: "bg-purple-50",
      title: "Monitor breathing and consciousness.",
      desc: "Count respiratory rate and check response to verbal stimuli every 2 minutes.",
    },
  ];

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
          <h2 className="font-bold text-base text-slate-900">Patient Care Guidance</h2>
        </div>

        <div className="px-4 space-y-3.5">
          {/* Top Banner */}
          <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600 text-white shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-blue-950">While You Wait</h3>
              <p className="text-[11px] text-blue-700 mt-0.5">
                Follow these basic clinical steps until emergency responders arrive.
              </p>
            </div>
          </div>

          {/* 5 Step Guidance Cards */}
          <div className="space-y-2.5">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3"
                >
                  <div className={`p-2 rounded-xl ${step.bg} ${step.color} shrink-0 mt-0.5`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-snug">{step.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Red Alert Disclaimer */}
          <div className="p-3.5 rounded-2xl bg-red-50/80 border border-red-100 flex items-start gap-2.5 text-[11px] text-red-900">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <p>
              This is general guidance and not a substitute for professional medical care. If condition deteriorates rapidly, call emergency immediately.
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 pt-2">
        <button
          onClick={onCallEmergency}
          className="w-full py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-600/25 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Phone className="w-4 h-4" />
          <span>Call Emergency Services (112)</span>
        </button>
      </div>
    </div>
  );
};

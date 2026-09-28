import React, { useState } from "react";
import {
  ArrowLeft,
  User,
  AlertTriangle,
  Pill,
  HeartPulse,
  FileText,
  Phone,
  Edit2,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

interface MedicalHistoryScreenProps {
  onBack: () => void;
  onEditProfile?: () => void;
}

export const MedicalHistoryScreen: React.FC<MedicalHistoryScreenProps> = ({
  onBack,
  onEditProfile,
}) => {
  const [activeTab, setActiveTab] = useState<"Overview" | "Allergies" | "Medicines" | "Reports">("Overview");

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
          <h2 className="font-bold text-base text-slate-900">Medical History</h2>
        </div>

        <div className="px-4 space-y-3.5">
          {/* Sub Navigation Tabs */}
          <div className="grid grid-cols-4 bg-slate-200/70 p-1 rounded-2xl text-xs font-bold text-center">
            {(["Overview", "Allergies", "Medicines", "Reports"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-1.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === tab
                    ? "bg-white text-blue-600 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* User Profile Card */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-black text-base flex items-center justify-center border-2 border-white shadow-xs">
                HW
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">Himanshu Waghaye</h3>
                <p className="text-xs text-slate-500 font-medium">Age: 20 • Male</p>
              </div>
            </div>

            <button
              onClick={onEditProfile}
              className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 px-2.5 py-1 rounded-lg hover:bg-blue-50 cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          {/* Medical Sections */}
          <div className="space-y-2.5">
            {/* Allergies */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-red-50 text-red-500">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Allergies</h4>
                  <p className="text-[11px] text-slate-500">Penicillin (mild reaction)</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md">
                Alert
              </span>
            </div>

            {/* Current Medicines */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <Pill className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Current Medicines</h4>
                  <p className="text-[11px] text-slate-500">Paracetamol (as needed)</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>

            {/* Medical Conditions */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                  <HeartPulse className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Medical Conditions</h4>
                  <p className="text-[11px] text-slate-500">No major conditions</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                Clear
              </span>
            </div>

            {/* Past Records */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Past Records</h4>
                  <p className="text-[11px] text-slate-500">View reports (2 documents attached)</p>
                </div>
              </div>
              <span className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">
                View
              </span>
            </div>

            {/* Emergency Contact */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Emergency Contact</h4>
                  <p className="text-[11px] text-slate-500">+91 98765 43210 (Father)</p>
                </div>
              </div>
              <a
                href="tel:+919876543210"
                className="p-2 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Privacy Footnote */}
          <div className="p-3 rounded-2xl bg-slate-100 flex items-center gap-2 text-[10px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Encrypted HIPAA/NDHM compliant medical record vault</span>
          </div>
        </div>
      </div>
    </div>
  );
};

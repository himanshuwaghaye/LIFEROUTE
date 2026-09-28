import React, { useState } from "react";
import {
  ArrowLeft,
  Camera,
  Upload,
  Brain,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  X,
  FileText,
  Activity,
  ShieldCheck,
} from "lucide-react";
import { sound } from "@/lib/soundFx";

interface AIAssessmentScreenProps {
  onBack: () => void;
  onRequestAmbulance?: () => void;
}

const SAMPLE_IMAGES = [
  {
    id: "wound",
    title: "Trauma Wound",
    url: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=150&auto=format&fit=crop&q=60",
    diagnosis: "Deep laceration with localized soft tissue trauma",
    severity: "High Priority",
    dept: "Trauma Care / General Surgery",
    firstAid: "Apply direct gentle pressure with sterile gauze. Do not remove embedded debris.",
  },
  {
    id: "xray",
    title: "Chest X-Ray",
    url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=150&auto=format&fit=crop&q=60",
    diagnosis: "Bilateral pulmonary congestion / possible pleural effusion",
    severity: "Critical Priority",
    dept: "Pulmonology & Intensive Care (ICU)",
    firstAid: "Position patient upright at 45 degrees. Administer high-flow oxygen.",
  },
  {
    id: "rash",
    title: "Acute Rash",
    url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=150&auto=format&fit=crop&q=60",
    diagnosis: "Severe anaphylactic urticaria / allergic reaction",
    severity: "High Priority",
    dept: "Emergency Medicine & Allergy Care",
    firstAid: "Check airway patency. Prepare auto-injector epinephrine if wheezing occurs.",
  },
];

export const AIAssessmentScreen: React.FC<AIAssessmentScreenProps> = ({
  onBack,
  onRequestAmbulance,
}) => {
  const [activeTab, setActiveTab] = useState<"Image" | "Symptoms" | "Results">("Image");
  const [selectedSample, setSelectedSample] = useState<typeof SAMPLE_IMAGES[0] | null>(SAMPLE_IMAGES[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<typeof SAMPLE_IMAGES[0] | null>(null);

  const handleAnalyze = () => {
    if (!selectedSample) return;
    setIsAnalyzing(true);
    sound.playChime();
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult(selectedSample);
      setActiveTab("Results");
      sound.playSuccess();
    }, 1500);
  };

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
          <h2 className="font-bold text-base text-slate-900">AI Assessment</h2>
        </div>

        <div className="px-4 space-y-3.5">
          {/* Sub Navigation Tabs */}
          <div className="grid grid-cols-3 bg-slate-200/70 p-1 rounded-2xl text-xs font-bold">
            {(["Image", "Symptoms", "Results"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 rounded-xl transition-all cursor-pointer ${
                  activeTab === tab
                    ? "bg-white text-blue-600 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "Image" && (
            <div className="space-y-3.5 animate-in fade-in">
              {/* Image Upload Box */}
              <div className="border-2 border-dashed border-slate-300 rounded-3xl p-6 bg-white text-center flex flex-col items-center justify-center space-y-3 hover:border-blue-400 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Camera className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Upload or Capture Image</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs">
                    Add a photo of injury, rash, wound, scan report, etc.
                  </p>
                </div>
              </div>

              {/* Sample Images Thumbnails */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2">
                  Or select a sample diagnostic scan:
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {SAMPLE_IMAGES.map((sample) => (
                    <div
                      key={sample.id}
                      onClick={() => setSelectedSample(sample)}
                      className={`relative rounded-2xl overflow-hidden border-2 p-1.5 bg-white cursor-pointer transition-all ${
                        selectedSample?.id === sample.id
                          ? "border-blue-600 ring-2 ring-blue-500/20 shadow-sm"
                          : "border-slate-200 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <div className="h-16 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
                        {sample.id === "wound" ? (
                          <div className="w-full h-full bg-red-100 flex items-center justify-center text-red-600 text-xs font-bold">
                            🩸 Wound
                          </div>
                        ) : sample.id === "xray" ? (
                          <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-200 text-xs font-bold">
                            🩻 Chest X-Ray
                          </div>
                        ) : (
                          <div className="w-full h-full bg-rose-100 flex items-center justify-center text-rose-600 text-xs font-bold">
                            🔍 Skin Rash
                          </div>
                        )}
                      </div>
                      <span className="block text-[11px] font-bold text-slate-800 text-center mt-1 truncate">
                        {sample.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Analyze Button */}
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isAnalyzing ? "Analyzing with Medical Vision AI..." : "Analyze Image"}</span>
              </button>
            </div>
          )}

          {activeTab === "Symptoms" && (
            <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200 animate-in fade-in">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Observed Symptoms
              </h4>
              <div className="space-y-2 text-xs">
                {[
                  "Severe Chest Tightness / Radiating Pain",
                  "Shortness of Breath / Wheezing",
                  "Deep Laceration / Uncontrolled Bleeding",
                  "Facial Asymmetry / Sudden Slurred Speech",
                  "High Fever with Neurological Confusion",
                ].map((sym, idx) => (
                  <label key={idx} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer">
                    <input type="checkbox" defaultChecked={idx === 0} className="w-4 h-4 text-blue-600 rounded" />
                    <span className="text-slate-800 font-medium">{sym}</span>
                  </label>
                ))}
              </div>
              <button
                onClick={handleAnalyze}
                className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-xs mt-2"
              >
                Run AI Symptom Triage
              </button>
            </div>
          )}

          {activeTab === "Results" && (
            <div className="space-y-3 animate-in fade-in">
              {analysisResult ? (
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Brain className="w-5 h-5 text-purple-600" />
                        <h4 className="text-sm font-bold text-slate-900">AI Clinical Finding</h4>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-700">
                        {analysisResult.severity}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-100 text-xs text-purple-950 font-semibold">
                      {analysisResult.diagnosis}
                    </div>

                    <div className="text-xs space-y-1.5 text-slate-700">
                      <div>
                        <b>Recommended Department:</b> {analysisResult.dept}
                      </div>
                      <div>
                        <b>Immediate First Aid:</b> {analysisResult.firstAid}
                      </div>
                    </div>
                  </div>

                  {onRequestAmbulance && (
                    <button
                      onClick={onRequestAmbulance}
                      className="w-full py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-600/25 flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      Dispatch Ambulance Based on AI Score
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center p-8 bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
                  Select an image or symptoms to view AI analysis results.
                </div>
              )}
            </div>
          )}

          {/* Disclaimer */}
          <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-start gap-2.5 text-[11px] text-blue-900">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p>
              This AI analysis is for guidance only. It does not replace professional medical diagnosis. In critical situations, always call emergency services immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

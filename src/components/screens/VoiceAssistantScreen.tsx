import React, { useState } from "react";
import { ArrowLeft, Settings, Mic, Radio, Sparkles } from "lucide-react";
import { sound } from "@/lib/soundFx";

interface VoiceAssistantScreenProps {
  onBack: () => void;
  onExecuteCommand?: (cmd: string) => void;
}

export const VoiceAssistantScreen: React.FC<VoiceAssistantScreenProps> = ({
  onBack,
  onExecuteCommand,
}) => {
  const [isListening, setIsListening] = useState(true);

  const commands = [
    { text: "Find a nearby ambulance", target: "request_ambulance" },
    { text: "Show my medical history", target: "medical_history" },
    { text: "Hospitals near me", target: "nearby_hospitals" },
    { text: "Emergency first aid steps", target: "patient_care" },
  ];

  const handleCommandClick = (cmd: { text: string; target: string }) => {
    sound.playSuccess();
    onExecuteCommand?.(cmd.target);
  };

  return (
    <div className="min-h-full flex flex-col justify-between bg-slate-950 text-white p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-600/30 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between relative z-10">
        <button
          onClick={onBack}
          className="p-2 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
          LifeRoute AI Assistant
        </span>
        <button className="p-2 rounded-full bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white">
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Central Visual Waveform & Glowing Mic */}
      <div className="my-auto flex flex-col items-center text-center relative z-10 space-y-6">
        {/* Animated Siri/Google Multi-Color Waveform */}
        <div className="flex items-center justify-center gap-2 h-20">
          {[16, 38, 64, 28, 80, 48, 20, 72, 32, 54, 24].map((h, i) => (
            <div
              key={i}
              style={{ height: isListening ? `${h}px` : "16px" }}
              className={`w-2 rounded-full transition-all duration-300 ${
                i % 3 === 0
                  ? "bg-blue-400 animate-pulse"
                  : i % 3 === 1
                  ? "bg-indigo-400 animate-bounce"
                  : "bg-purple-400 animate-pulse"
              }`}
            />
          ))}
        </div>

        {/* Pulsating Glowing Mic Orb */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-2xl shadow-blue-500/50 ring-4 ring-white/10 animate-pulse">
            <Mic className="w-10 h-10" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white flex items-center justify-center gap-1.5">
            <span>Listening...</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </h3>
          <p className="text-xs text-slate-400 mt-1">Try saying one of the emergency commands:</p>
        </div>

        {/* Command Pills */}
        <div className="flex flex-wrap justify-center gap-2 max-w-xs">
          {commands.map((cmd, i) => (
            <button
              key={i}
              onClick={() => handleCommandClick(cmd)}
              className="px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition-all cursor-pointer hover:border-blue-500/50"
            >
              "{cmd.text}"
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="relative z-10 pt-4">
        <button
          onClick={() => {
            setIsListening(!isListening);
            sound.playChime();
          }}
          className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-red-500" />
          <span>{isListening ? "Tap to pause" : "Tap to speak"}</span>
        </button>
      </div>
    </div>
  );
};

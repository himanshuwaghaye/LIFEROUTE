import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Mic,
  MicOff,
  Volume2,
  FileText,
  Sparkles,
  CheckCircle2,
  Send,
} from "lucide-react";
import { sound } from "@/lib/soundFx";

interface TellSymptomsVoiceScreenProps {
  onBack: () => void;
  onSubmitSymptoms?: (text: string) => void;
}

export const TellSymptomsVoiceScreen: React.FC<TellSymptomsVoiceScreenProps> = ({
  onBack,
  onSubmitSymptoms,
}) => {
  const [activeTab, setActiveTab] = useState<"Voice" | "Text">("Voice");
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState(
    "I have severe crushing chest pain and shortness of breath radiating to left shoulder"
  );
  const [textInput, setTextInput] = useState("");

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      sound.playChime();
    } else {
      setIsRecording(false);
      sound.playSuccess();
    }
  };

  return (
    <div className="min-h-full flex flex-col justify-between bg-slate-50 text-slate-900 pb-6">
      <div className="space-y-4">
        {/* Top Header */}
        <div className="p-4 bg-white border-b border-slate-200/80 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="font-bold text-base text-slate-900">Tell Us Your Symptoms</h2>
        </div>

        <div className="px-4 space-y-4">
          {/* Tabs: Text vs Voice */}
          <div className="grid grid-cols-2 bg-slate-200/70 p-1 rounded-2xl text-xs font-bold">
            <button
              onClick={() => setActiveTab("Text")}
              className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === "Text" ? "bg-white text-blue-600 shadow-xs" : "text-slate-600"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Text</span>
            </button>
            <button
              onClick={() => setActiveTab("Voice")}
              className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === "Voice" ? "bg-white text-blue-600 shadow-xs" : "text-slate-600"
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Voice</span>
            </button>
          </div>

          {activeTab === "Voice" ? (
            <div className="space-y-6 pt-4 text-center">
              {/* Central Audio Waveform Visual */}
              <div className="flex items-center justify-center gap-1.5 h-16">
                {[12, 28, 48, 20, 60, 36, 16, 52, 24, 40, 18].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: isRecording ? `${h}px` : "12px" }}
                    className={`w-1.5 rounded-full bg-blue-500 transition-all duration-300 ${
                      isRecording ? "animate-pulse" : "opacity-40"
                    }`}
                  />
                ))}
              </div>

              {/* Big Pulsating Mic Button */}
              <div className="flex justify-center">
                <button
                  onClick={toggleRecording}
                  className={`w-28 h-28 rounded-full flex items-center justify-center text-white shadow-2xl transition-all cursor-pointer ${
                    isRecording
                      ? "bg-red-500 ring-8 ring-red-200 shadow-red-500/50 animate-pulse scale-105"
                      : "bg-blue-600 ring-8 ring-blue-100 shadow-blue-500/30 hover:scale-105"
                  }`}
                >
                  {isRecording ? <MicOff className="w-12 h-12" /> : <Mic className="w-12 h-12" />}
                </button>
              </div>

              <div>
                <h3 className="text-base font-black text-slate-900">
                  {isRecording ? "Listening to your voice..." : "Tap to speak"}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Example: "I have chest pain and shortness of breath"
                </p>
              </div>

              {/* Live Captured Transcript Box */}
              {transcript && (
                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-left shadow-xs space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Speech Recognized
                  </span>
                  <p className="text-xs text-slate-800 font-medium italic">"{transcript}"</p>
                </div>
              )}

              {/* Stop / Submit Button */}
              <div className="pt-2">
                <button
                  onClick={toggleRecording}
                  className={`w-full py-3 rounded-2xl font-bold text-xs border transition-colors cursor-pointer ${
                    isRecording
                      ? "border-red-500 text-red-600 bg-red-50 hover:bg-red-100"
                      : "border-blue-500 text-blue-600 bg-blue-50 hover:bg-blue-100"
                  }`}
                >
                  {isRecording ? "⏹ Stop Recording" : "▶ Start Speaking"}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 bg-white p-4 rounded-2xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700">Type Your Symptoms</label>
              <textarea
                rows={4}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Describe pain location, onset time, triggers..."
                className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => onSubmitSymptoms?.(textInput || transcript)}
                className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                Submit Clinical Notes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

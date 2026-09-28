import React, { useState, useEffect } from "react";
import { useRole } from "@/context/RoleContext";
import { useEmergency } from "@/context/EmergencyContext";
import { sound } from "@/lib/soundFx";

// Screens
import { LandingScreen } from "@/components/screens/LandingScreen";
import { HomeScreen } from "@/components/screens/HomeScreen";
import { RequestAmbulanceScreen } from "@/components/screens/RequestAmbulanceScreen";
import { LiveTrackingScreen } from "@/components/screens/LiveTrackingScreen";
import { NearbyHospitalsScreen } from "@/components/screens/NearbyHospitalsScreen";
import { AIAssessmentScreen } from "@/components/screens/AIAssessmentScreen";
import { TellSymptomsVoiceScreen } from "@/components/screens/TellSymptomsVoiceScreen";
import { VoiceAssistantScreen } from "@/components/screens/VoiceAssistantScreen";
import { MedicalHistoryScreen } from "@/components/screens/MedicalHistoryScreen";
import { HospitalPreparationScreen } from "@/components/screens/HospitalPreparationScreen";
import { AmbulanceRouteScreen } from "@/components/screens/AmbulanceRouteScreen";
import { PatientCareGuidanceScreen } from "@/components/screens/PatientCareGuidanceScreen";
import { HospitalPaymentsScreen } from "@/components/screens/HospitalPaymentsScreen";
import { ProfileSettingsScreen } from "@/components/screens/ProfileSettingsScreen";

import {
  Home,
  MapPin,
  Clock,
  User,
  Volume2,
  VolumeX,
  Globe,
  Download,
  Sparkles,
  CheckCircle2,
  Layers,
} from "lucide-react";

export type MobileScreenName =
  | "landing"
  | "home"
  | "request_ambulance"
  | "live_tracking"
  | "nearby_hospitals"
  | "ai_assessment"
  | "tell_symptoms"
  | "voice_assistant"
  | "medical_history"
  | "hospital_preparation"
  | "ambulance_route"
  | "patient_care"
  | "hospital_payments"
  | "profile";

interface LifeRouteMobileAppProps {
  initialScreen?: MobileScreenName;
  onSwitchToWebsite?: () => void;
  standalone?: boolean;
}

export const LifeRouteMobileApp: React.FC<LifeRouteMobileAppProps> = ({
  initialScreen = "home",
  onSwitchToWebsite,
  standalone = false,
}) => {
  const { audioMuted, toggleAudioMute } = useRole();
  const { createEmergency, showToast, toastMessage, clearToast } = useEmergency();

  const [currentScreen, setCurrentScreen] = useState<MobileScreenName>(initialScreen);
  const [bottomNavTab, setBottomNavTab] = useState<"home" | "map" | "history" | "profile">("home");
  const [showScreenPicker, setShowScreenPicker] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
  }, []);

  const triggerDirectDownload = () => {
    try {
      const link = document.createElement("a");
      link.href = "/downloads/LifeRoute-Emergency.apk";
      link.setAttribute("download", "LifeRoute-Emergency.apk");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      // fallback
    }
  };

  const handleInstallApp = async () => {
    sound.playSuccess();
    triggerDirectDownload();
    if (installPrompt) {
      try {
        installPrompt.prompt();
        const choice = await installPrompt.userChoice;
        if (choice.outcome === "accepted") {
          setInstallPrompt(null);
        }
      } catch {
        // ignore
      }
    }
    showToast("📥 LifeRoute Mobile App download started!");
  };

  const navigateTo = (screen: string) => {
    sound.playChime();
    setCurrentScreen(screen as MobileScreenName);
    setShowScreenPicker(false);
    if (["home", "landing"].includes(screen)) setBottomNavTab("home");
    else if (["live_tracking", "ambulance_route"].includes(screen)) setBottomNavTab("map");
    else if (["medical_history", "hospital_payments"].includes(screen)) setBottomNavTab("history");
    else if (["profile"].includes(screen)) setBottomNavTab("profile");
  };

  const handleBottomNav = (tab: "home" | "map" | "history" | "profile") => {
    setBottomNavTab(tab);
    sound.playChime();
    if (tab === "home") setCurrentScreen("home");
    else if (tab === "map") setCurrentScreen("live_tracking");
    else if (tab === "history") setCurrentScreen("medical_history");
    else if (tab === "profile") setCurrentScreen("profile");
  };

  const handleConfirmEmergency = (data: { type: string; priority: string }) => {
    createEmergency({
      patientName: "Himanshu Waghaye",
      patientAge: 20,
      patientGender: "Male",
      patientPhone: "+91 98765 43210",
      emergencyType: data.type,
      symptoms: ["Chest tightness", "Shortness of breath"],
      priority: "Critical",
      location: {
        lat: 22.551,
        lng: 88.353,
        address: "12 Park Street, Central Kolkata",
        landmark: "Opposite Oxford Bookstore",
      },
    });
    setCurrentScreen("live_tracking");
    setBottomNavTab("map");
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between max-w-md mx-auto relative shadow-2xl overflow-x-hidden font-sans border-x border-slate-800/40 selection:bg-blue-600 selection:text-white">
      {/* Mobile Top App Bar */}
      <header className="bg-slate-950/95 backdrop-blur-md px-4 py-2.5 sticky top-0 z-40 border-b border-slate-800/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-red-500 p-0.5 shadow-sm">
            <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center font-black text-[10px] text-white">
              LR
            </div>
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight text-white">LifeRoute</span>
            <span className="ml-1.5 px-1.5 py-0.2 rounded text-[9px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
              APP
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Screen Jumper Button */}
          <button
            onClick={() => setShowScreenPicker(!showScreenPicker)}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 text-xs flex items-center gap-1"
            title="Switch Screens"
          >
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[10px] font-semibold hidden xs:inline">Screens</span>
          </button>

          {/* Sound Mute */}
          <button
            onClick={toggleAudioMute}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            title="Audio FX"
          >
            {audioMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

          {/* Install Direct */}
          <button
            onClick={handleInstallApp}
            className="px-2 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold flex items-center gap-1 shadow-xs"
            title="Download App"
          >
            <Download className="w-3 h-3" />
            <span>Install</span>
          </button>

          {/* Switch to Website (if on desktop or embedded) */}
          {onSwitchToWebsite && (
            <button
              onClick={onSwitchToWebsite}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-blue-400 hover:text-blue-300 hover:bg-slate-800"
              title="Open Official Website Portal"
            >
              <Globe className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </header>

      {/* Screen Selector Drawer/Dropdown */}
      {showScreenPicker && (
        <div className="bg-slate-900 border-b border-slate-800 p-3 z-50 sticky top-[49px] animate-in slide-in-from-top duration-150 shadow-xl">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Select Mobile Screen (14 Total)
          </div>
          <div className="grid grid-cols-2 gap-1.5 max-h-56 overflow-y-auto pr-1">
            {[
              { id: "landing", label: "1. Splash / Login" },
              { id: "home", label: "2. Home Dashboard" },
              { id: "request_ambulance", label: "3. Request Ambulance" },
              { id: "live_tracking", label: "4. Live Tracking Map" },
              { id: "nearby_hospitals", label: "5. Nearby Hospitals" },
              { id: "ai_assessment", label: "6. AI Assessment" },
              { id: "tell_symptoms", label: "7. Voice Symptoms" },
              { id: "voice_assistant", label: "8. Voice HUD" },
              { id: "medical_history", label: "9. Medical Records" },
              { id: "hospital_preparation", label: "10. ER Preparation" },
              { id: "ambulance_route", label: "11. Route Nav" },
              { id: "patient_care", label: "12. First Aid Steps" },
              { id: "hospital_payments", label: "13. Hospital Billing" },
              { id: "profile", label: "14. Profile & Settings" },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => navigateTo(s.id)}
                className={`text-left px-2 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  currentScreen === s.id
                    ? "bg-blue-600 text-white font-bold"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Screen Body Container */}
      <main className="flex-1 flex flex-col bg-slate-950 pb-20 overflow-y-auto">
        {currentScreen === "landing" && (
          <LandingScreen
            onGetStarted={() => navigateTo("home")}
            onLogin={() => navigateTo("home")}
          />
        )}
        {currentScreen === "home" && (
          <HomeScreen
            userName="Himanshu"
            onEmergencyClick={() => navigateTo("request_ambulance")}
            onNavigate={navigateTo}
          />
        )}
        {currentScreen === "request_ambulance" && (
          <RequestAmbulanceScreen
            onBack={() => navigateTo("home")}
            onConfirm={handleConfirmEmergency}
          />
        )}
        {currentScreen === "live_tracking" && (
          <LiveTrackingScreen
            onBack={() => navigateTo("home")}
            onNavigate={navigateTo}
          />
        )}
        {currentScreen === "nearby_hospitals" && (
          <NearbyHospitalsScreen
            onBack={() => navigateTo("home")}
            onSelectHospital={() => navigateTo("hospital_preparation")}
          />
        )}
        {currentScreen === "ai_assessment" && (
          <AIAssessmentScreen
            onBack={() => navigateTo("home")}
            onCompleteTriage={() => navigateTo("request_ambulance")}
          />
        )}
        {currentScreen === "tell_symptoms" && (
          <TellSymptomsVoiceScreen
            onBack={() => navigateTo("home")}
            onSubmitSymptoms={() => navigateTo("ai_assessment")}
          />
        )}
        {currentScreen === "voice_assistant" && (
          <VoiceAssistantScreen
            onClose={() => navigateTo("home")}
            onNavigate={navigateTo}
          />
        )}
        {currentScreen === "medical_history" && (
          <MedicalHistoryScreen onBack={() => navigateTo("home")} />
        )}
        {currentScreen === "hospital_preparation" && (
          <HospitalPreparationScreen
            onBack={() => navigateTo("live_tracking")}
            onConfirmDataShare={() => navigateTo("live_tracking")}
          />
        )}
        {currentScreen === "ambulance_route" && (
          <AmbulanceRouteScreen onBack={() => navigateTo("live_tracking")} />
        )}
        {currentScreen === "patient_care" && (
          <PatientCareGuidanceScreen onBack={() => navigateTo("home")} />
        )}
        {currentScreen === "hospital_payments" && (
          <HospitalPaymentsScreen onBack={() => navigateTo("home")} />
        )}
        {currentScreen === "profile" && (
          <ProfileSettingsScreen
            onBack={() => navigateTo("home")}
            onSwitchRole={(newRole) => {
              if (newRole === "hospital") {
                if (onSwitchToWebsite) onSwitchToWebsite();
              } else if (newRole === "ambulance") {
                navigateTo("ambulance_route");
              } else {
                navigateTo("home");
              }
            }}
          />
        )}
      </main>

      {/* Fixed Native Bottom Mobile Navigation Bar */}
      <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/80 px-4 py-2 z-40 flex items-center justify-around">
        <button
          onClick={() => handleBottomNav("home")}
          className={`flex flex-col items-center gap-1 transition-all ${
            bottomNavTab === "home" ? "text-blue-500 font-bold scale-105" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <div className={`p-1 rounded-xl ${bottomNavTab === "home" ? "bg-blue-500/10" : ""}`}>
            <Home className="w-5 h-5" />
          </div>
          <span className="text-[10px]">Home</span>
        </button>

        <button
          onClick={() => handleBottomNav("map")}
          className={`flex flex-col items-center gap-1 transition-all ${
            bottomNavTab === "map" ? "text-blue-500 font-bold scale-105" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <div className={`p-1 rounded-xl ${bottomNavTab === "map" ? "bg-blue-500/10" : ""}`}>
            <MapPin className="w-5 h-5" />
          </div>
          <span className="text-[10px]">Live Map</span>
        </button>

        {/* Center Emergency SOS Button */}
        <button
          onClick={() => navigateTo("request_ambulance")}
          className="relative -top-4 w-12 h-12 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 text-white shadow-lg shadow-red-500/30 flex items-center justify-center font-black text-[10px] tracking-tight hover:scale-110 active:scale-95 transition-all border-2 border-slate-950"
          title="Emergency SOS"
        >
          SOS
        </button>

        <button
          onClick={() => handleBottomNav("history")}
          className={`flex flex-col items-center gap-1 transition-all ${
            bottomNavTab === "history" ? "text-blue-500 font-bold scale-105" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <div className={`p-1 rounded-xl ${bottomNavTab === "history" ? "bg-blue-500/10" : ""}`}>
            <Clock className="w-5 h-5" />
          </div>
          <span className="text-[10px]">Records</span>
        </button>

        <button
          onClick={() => handleBottomNav("profile")}
          className={`flex flex-col items-center gap-1 transition-all ${
            bottomNavTab === "profile" ? "text-blue-500 font-bold scale-105" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <div className={`p-1 rounded-xl ${bottomNavTab === "profile" ? "bg-blue-500/10" : ""}`}>
            <User className="w-5 h-5" />
          </div>
          <span className="text-[10px]">Profile</span>
        </button>
      </footer>

      {/* Floating Dynamic Toast */}
      {toastMessage && (
        <div className="fixed top-14 left-4 right-4 max-w-sm mx-auto z-50 animate-in slide-in-from-top-4 duration-200">
          <div className="bg-slate-900 border border-blue-500/40 text-slate-100 px-4 py-3 rounded-2xl shadow-xl flex items-center justify-between text-xs backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400 shrink-0 animate-pulse" />
              <span>{toastMessage}</span>
            </div>
            <button
              onClick={clearToast}
              className="text-slate-400 hover:text-white text-xs font-bold ml-2 p-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

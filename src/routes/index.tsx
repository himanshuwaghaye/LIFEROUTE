import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { RoleProvider, useRole } from "@/context/RoleContext";
import { EmergencyProvider, useEmergency } from "@/context/EmergencyContext";

// Screen Components
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

// Desktop / Specialist Dashboards
import { HospitalDashboard } from "@/components/hospital/HospitalDashboard";
import { AmbulanceDriverDashboard } from "@/components/ambulance/AmbulanceDriverDashboard";
import { EmergencyAnalytics } from "@/components/analytics/EmergencyAnalytics";

import {
  Home,
  MapPin,
  Clock,
  User,
  Smartphone,
  Monitor,
  Sparkles,
  Volume2,
  VolumeX,
  Radio,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { sound } from "@/lib/soundFx";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LifeRoute — Emergency Healthcare Coordination Platform" },
      {
        name: "description",
        content:
          "Smarter Coordination. Faster Care. Safer Lives. Complete emergency dispatch, real-time tracking, AI assessment, and hospital preparation platform.",
      },
      { property: "og:title", content: "LifeRoute — Emergency Healthcare Coordination" },
    ],
  }),
  component: LifeRouteMasterApp,
});

function LifeRouteMasterApp() {
  return (
    <RoleProvider>
      <EmergencyProvider>
        <LifeRouteInteractiveExperience />
      </EmergencyProvider>
    </RoleProvider>
  );
}

type ScreenName =
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
  | "profile"
  | "hospital_desk"
  | "ambulance_hud"
  | "analytics";

function LifeRouteInteractiveExperience() {
  const { role, setRole, audioMuted, toggleAudioMute } = useRole();
  const { createEmergency, showToast, toastMessage, clearToast } = useEmergency();

  const [currentScreen, setCurrentScreen] = useState<ScreenName>("home");
  const [viewMode, setViewMode] = useState<"mobile_frame" | "responsive_flow">("mobile_frame");
  const [bottomNavTab, setBottomNavTab] = useState<"home" | "map" | "history" | "profile">("home");
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  React.useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
  }, []);

  const handleInstallApp = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice.outcome === "accepted") {
        showToast("✓ LifeRoute App installed successfully!");
        setInstallPrompt(null);
      }
    } else {
      showToast("To install, tap Share (iOS) or Menu (Android) → 'Add to Home Screen'");
    }
  };

  const navigateTo = (screen: string) => {
    sound.playChime();
    setCurrentScreen(screen as ScreenName);
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
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Universal App Bar & Screen Selector */}
      <header className="bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-red-500 p-0.5 shadow-md">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-white text-xs">
              LR
            </div>
          </div>
          <div>
            <div className="font-bold text-sm text-white flex items-center gap-1.5">
              <span>LifeRoute Healthcare</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-semibold border border-blue-500/30">
                Interactive Multi-Screen Experience
              </span>
            </div>
          </div>
        </div>

        {/* Screen Quick Jumper Dropdown */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-xl text-xs font-semibold">
            <Layers className="w-3.5 h-3.5 text-blue-400 ml-1.5" />
            <select
              value={currentScreen}
              onChange={(e) => navigateTo(e.target.value)}
              aria-label="Select screen"
              className="bg-transparent text-slate-200 text-xs font-semibold focus:outline-none pr-2 cursor-pointer"
            >
              <optgroup label="📱 Mobile App UI (from Design)">
                <option value="landing">1. Splash / Landing</option>
                <option value="home">2. Main Home Dashboard</option>
                <option value="request_ambulance">3. Request Ambulance</option>
                <option value="live_tracking">4. Live Tracking Map</option>
                <option value="nearby_hospitals">5. Nearby Hospitals</option>
                <option value="ai_assessment">6. AI Clinical Assessment</option>
                <option value="tell_symptoms">7. Tell Us Symptoms (Voice/Text)</option>
                <option value="voice_assistant">8. Voice Assistant HUD</option>
                <option value="medical_history">9. Medical History</option>
                <option value="hospital_preparation">10. Hospital Preparation</option>
                <option value="ambulance_route">11. Ambulance Navigation Route</option>
                <option value="patient_care">12. Patient Care Guidance (First Aid)</option>
                <option value="hospital_payments">13. Hospital Payments & Scan Pay</option>
                <option value="profile">14. Profile & Settings</option>
              </optgroup>
              <optgroup label="🏥 Hospital & Crew Desks">
                <option value="hospital_desk">Hospital Emergency Desk (Live Triage)</option>
                <option value="ambulance_hud">Ambulance Crew Dispatch HUD</option>
                <option value="analytics">Operations & Telemetry Analytics</option>
              </optgroup>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex bg-slate-800 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setViewMode("mobile_frame")}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === "mobile_frame" ? "bg-blue-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Phone Frame</span>
            </button>
            <button
              onClick={() => setViewMode("responsive_flow")}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === "responsive_flow" ? "bg-blue-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Full Screen</span>
            </button>
          </div>

          {/* Install PWA App Button */}
          <button
            onClick={handleInstallApp}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-xs font-bold shadow-sm shadow-red-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Install App</span>
          </button>

          {/* Audio toggle */}
          <button
            onClick={toggleAudioMute}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 cursor-pointer"
            title="Toggle Sound Effects"
          >
            {audioMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-2 sm:p-6 lg:p-8 overflow-y-auto">
        {viewMode === "mobile_frame" && !["hospital_desk", "ambulance_hud", "analytics"].includes(currentScreen) ? (
          /* Phone Device Mockup Container */
          <div className="w-full max-w-sm h-[780px] bg-white rounded-[44px] shadow-2xl shadow-blue-500/10 border-8 border-slate-800 overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-200">
            {/* Top Phone Speaker / Notch */}
            <div className="w-32 h-5 bg-slate-800 rounded-b-2xl mx-auto flex items-center justify-center gap-2 px-3 absolute top-0 left-1/2 -translate-x-1/2 z-40">
              <div className="w-8 h-1 bg-slate-700 rounded-full" />
              <div className="w-2 h-2 bg-slate-900 rounded-full border border-slate-700" />
            </div>

            {/* Phone Screen Body */}
            <div className="flex-1 overflow-y-auto pt-2 flex flex-col">
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
                  onClose={() => navigateTo("home")}
                  onViewRoute={() => navigateTo("ambulance_route")}
                  onViewHospitalPrep={() => navigateTo("hospital_preparation")}
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
                  onRequestAmbulance={() => navigateTo("request_ambulance")}
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
                  onBack={() => navigateTo("home")}
                  onExecuteCommand={navigateTo}
                />
              )}
              {currentScreen === "medical_history" && (
                <MedicalHistoryScreen
                  onBack={() => navigateTo("home")}
                  onEditProfile={() => navigateTo("profile")}
                />
              )}
              {currentScreen === "hospital_preparation" && (
                <HospitalPreparationScreen
                  onBack={() => navigateTo("live_tracking")}
                  onCallHospital={() => {
                    sound.playChime();
                    showToast("Connecting to City Care Hospital ED Desk...");
                  }}
                />
              )}
              {currentScreen === "ambulance_route" && (
                <AmbulanceRouteScreen
                  onBack={() => navigateTo("live_tracking")}
                  onStartNavigation={() => {
                    showToast("Turn-by-turn navigation started!");
                  }}
                />
              )}
              {currentScreen === "patient_care" && (
                <PatientCareGuidanceScreen
                  onBack={() => navigateTo("home")}
                  onCallEmergency={() => window.open("tel:112")}
                />
              )}
              {currentScreen === "hospital_payments" && (
                <HospitalPaymentsScreen onBack={() => navigateTo("home")} />
              )}
              {currentScreen === "profile" && (
                <ProfileSettingsScreen
                  onBack={() => navigateTo("home")}
                  onLogout={() => navigateTo("landing")}
                  onNavigate={navigateTo}
                />
              )}
            </div>

            {/* Bottom Mobile Navigation Bar */}
            {currentScreen !== "landing" && currentScreen !== "voice_assistant" && (
              <div className="bg-white border-t border-slate-200/80 px-6 py-2.5 flex items-center justify-between text-[11px] font-bold text-slate-500 sticky bottom-0 z-30 shadow-md">
                <button
                  onClick={() => handleBottomNav("home")}
                  className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
                    bottomNavTab === "home" ? "text-blue-600 font-extrabold" : "hover:text-slate-900"
                  }`}
                >
                  <Home className="w-5 h-5 stroke-[2.2]" />
                  <span>Home</span>
                </button>
                <button
                  onClick={() => handleBottomNav("map")}
                  className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
                    bottomNavTab === "map" ? "text-blue-600 font-extrabold" : "hover:text-slate-900"
                  }`}
                >
                  <MapPin className="w-5 h-5 stroke-[2.2]" />
                  <span>Map</span>
                </button>
                <button
                  onClick={() => handleBottomNav("history")}
                  className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
                    bottomNavTab === "history" ? "text-blue-600 font-extrabold" : "hover:text-slate-900"
                  }`}
                >
                  <Clock className="w-5 h-5 stroke-[2.2]" />
                  <span>History</span>
                </button>
                <button
                  onClick={() => handleBottomNav("profile")}
                  className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
                    bottomNavTab === "profile" ? "text-blue-600 font-extrabold" : "hover:text-slate-900"
                  }`}
                >
                  <User className="w-5 h-5 stroke-[2.2]" />
                  <span>Profile</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Full Responsive Screen Layout */
          <div className="w-full max-w-6xl bg-slate-900 rounded-3xl p-4 sm:p-6 border border-slate-800 shadow-2xl">
            {currentScreen === "hospital_desk" ? (
              <HospitalDashboard />
            ) : currentScreen === "ambulance_hud" ? (
              <AmbulanceDriverDashboard />
            ) : currentScreen === "analytics" ? (
              <EmergencyAnalytics />
            ) : (
              <div className="max-w-md mx-auto bg-white text-slate-900 rounded-3xl overflow-hidden shadow-xl">
                {currentScreen === "landing" && <LandingScreen onGetStarted={() => navigateTo("home")} onLogin={() => navigateTo("home")} />}
                {currentScreen === "home" && <HomeScreen onEmergencyClick={() => navigateTo("request_ambulance")} onNavigate={navigateTo} />}
                {currentScreen === "request_ambulance" && <RequestAmbulanceScreen onBack={() => navigateTo("home")} onConfirm={handleConfirmEmergency} />}
                {currentScreen === "live_tracking" && <LiveTrackingScreen onBack={() => navigateTo("home")} onClose={() => navigateTo("home")} onViewRoute={() => navigateTo("ambulance_route")} onViewHospitalPrep={() => navigateTo("hospital_preparation")} />}
                {currentScreen === "nearby_hospitals" && <NearbyHospitalsScreen onBack={() => navigateTo("home")} onSelectHospital={() => navigateTo("hospital_preparation")} />}
                {currentScreen === "ai_assessment" && <AIAssessmentScreen onBack={() => navigateTo("home")} onRequestAmbulance={() => navigateTo("request_ambulance")} />}
                {currentScreen === "tell_symptoms" && <TellSymptomsVoiceScreen onBack={() => navigateTo("home")} onSubmitSymptoms={() => navigateTo("ai_assessment")} />}
                {currentScreen === "voice_assistant" && <VoiceAssistantScreen onBack={() => navigateTo("home")} onExecuteCommand={navigateTo} />}
                {currentScreen === "medical_history" && <MedicalHistoryScreen onBack={() => navigateTo("home")} onEditProfile={() => navigateTo("profile")} />}
                {currentScreen === "hospital_preparation" && <HospitalPreparationScreen onBack={() => navigateTo("live_tracking")} />}
                {currentScreen === "ambulance_route" && <AmbulanceRouteScreen onBack={() => navigateTo("live_tracking")} />}
                {currentScreen === "patient_care" && <PatientCareGuidanceScreen onBack={() => navigateTo("home")} />}
                {currentScreen === "hospital_payments" && <HospitalPaymentsScreen onBack={() => navigateTo("home")} />}
                {currentScreen === "profile" && <ProfileSettingsScreen onBack={() => navigateTo("home")} onLogout={() => navigateTo("landing")} onNavigate={navigateTo} />}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Floating Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-white shadow-2xl">
            <Radio className="w-4 h-4 text-red-500 animate-pulse shrink-0" />
            <span className="text-xs font-semibold">{toastMessage}</span>
            <button onClick={clearToast} className="text-slate-400 hover:text-white text-xs p-1 ml-2 cursor-pointer">
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Bottom Feature Capsule Footer (Matching image) */}
      <footer className="bg-slate-950 border-t border-slate-800/80 px-6 py-4 text-center">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-semibold text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-red-400">🚑</span>
            <span>Ambulance in Minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-400">🏥</span>
            <span>Hospitals Prepared</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-purple-400">🧠</span>
            <span>AI-Assisted Insights</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">🛡️</span>
            <span>Secure Medical Records</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400">💳</span>
            <span>Easy Payments</span>
          </div>
        </div>
        <p className="text-[11px] text-slate-500 mt-2 font-medium">
          LifeRoute • Smarter Coordination. Faster Care. Safer Lives.
        </p>
      </footer>
    </div>
  );
}

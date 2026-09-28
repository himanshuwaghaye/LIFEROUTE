import React, { useState } from "react";
import { sound } from "@/lib/soundFx";
import {
  Smartphone,
  Hospital,
  Ambulance,
  Activity,
  ShieldCheck,
  Zap,
  Radio,
  MapPin,
  Bot,
  HeartPulse,
  Download,
  QrCode,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  PhoneCall,
  Clock,
  Sparkles,
} from "lucide-react";
import { LifeRouteMobileApp } from "@/components/mobile/LifeRouteMobileApp";

interface LifeRouteWebsiteProps {
  onOpenMobileApp: () => void;
  onOpenHospitalDesk: () => void;
  onOpenAmbulanceHUD: () => void;
  onOpenAnalytics: () => void;
}

export const LifeRouteWebsite: React.FC<LifeRouteWebsiteProps> = ({
  onOpenMobileApp,
  onOpenHospitalDesk,
  onOpenAmbulanceHUD,
  onOpenAnalytics,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const triggerDirectDownload = () => {
    sound.playSuccess();
    try {
      const link = document.createElement("a");
      link.href = "/downloads/LifeRoute-Emergency.apk";
      link.setAttribute("download", "LifeRoute-Emergency.apk");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 5000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Enterprise Navigation */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-red-500 p-0.5 shadow-md shadow-blue-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-white text-sm">
                LR
              </div>
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white">LifeRoute</span>
              <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-semibold border border-blue-500/20 hidden sm:inline">
                Emergency Healthcare Platform
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-blue-400 transition-colors">
              Features
            </a>
            <a href="#portals" className="hover:text-blue-400 transition-colors">
              Specialist Portals
            </a>
            <a href="#app-preview" className="hover:text-blue-400 transition-colors">
              App Simulator
            </a>
            <a href="#download" className="hover:text-blue-400 transition-colors">
              Download App
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={triggerDirectDownload}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Get APK</span>
            </button>

            <button
              onClick={onOpenMobileApp}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              <Smartphone className="w-4 h-4" />
              <span>Launch Mobile App</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-6 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(255,255,255,0))]" />
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>Critical Emergency Response & Hospital Coordination</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Smarter Coordination. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-400 to-emerald-400">
                Faster Care.
              </span>{" "}
              Safer Lives.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              LifeRoute connects patients, emergency ambulance units, and hospital trauma centers in real time. Features instant 1-tap dispatch, multimodal clinical AI triage, green corridor signal navigation, and automated ER bed allocation.
            </p>

            {/* Quick Action Matrix */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenMobileApp}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-700 hover:to-rose-700 text-white font-bold text-sm shadow-xl shadow-red-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Smartphone className="w-5 h-5" />
                <span>Open Mobile App (Fitted UI)</span>
              </button>

              <button
                onClick={onOpenHospitalDesk}
                className="px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-750 text-white font-semibold text-sm border border-slate-700/80 flex items-center gap-2 transition-all cursor-pointer"
              >
                <Hospital className="w-4 h-4 text-blue-400" />
                <span>Hospital ER Desk</span>
              </button>

              <button
                onClick={onOpenAmbulanceHUD}
                className="px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-750 text-white font-semibold text-sm border border-slate-700/80 flex items-center gap-2 transition-all cursor-pointer"
              >
                <Ambulance className="w-4 h-4 text-amber-400" />
                <span>Ambulance HUD</span>
              </button>
            </div>

            {/* Live Metrics Strip */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/60 max-w-xl">
              <div>
                <div className="text-2xl font-black text-white">&lt; 8 min</div>
                <div className="text-xs text-slate-400 font-medium">Avg Response Time</div>
              </div>
              <div>
                <div className="text-2xl font-black text-emerald-400">99.4%</div>
                <div className="text-xs text-slate-400 font-medium">ER Handshake Rate</div>
              </div>
              <div>
                <div className="text-2xl font-black text-blue-400">100%</div>
                <div className="text-xs text-slate-400 font-medium">Self-Contained / Local</div>
              </div>
            </div>
          </div>

          {/* Right Hero Mobile Simulator Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-xs">
              {/* Decorative background glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/30 to-red-600/30 rounded-[50px] blur-2xl opacity-50" />
              
              {/* Phone Mockup Frame */}
              <div className="relative bg-slate-900 rounded-[44px] p-2 border-4 border-slate-700/80 shadow-2xl shadow-blue-500/20">
                <div className="rounded-[36px] overflow-hidden h-[620px] bg-slate-950 flex flex-col relative">
                  <LifeRouteMobileApp standalone={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialist Portals Section */}
      <section id="portals" className="py-16 px-6 bg-slate-900/60 border-y border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              Multi-Role Command System
            </h2>
            <p className="text-3xl font-extrabold text-white">
              Dedicated Workspaces for Every Emergency Responder
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Patient Mobile App */}
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 hover:border-red-500/40 transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Patient Mobile App</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  1-tap SOS dispatch, AI diagnostic symptom scanning, real-time live map tracking, emergency contacts notification, and UPI hospital payments.
                </p>
              </div>
              <button
                onClick={onOpenMobileApp}
                className="mt-6 w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Open Mobile Interface</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 2: Hospital Trauma Center */}
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <Hospital className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Hospital ER Trauma Desk</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Incoming ambulance queue, live patient vitals transmission, trauma bay allocation, blood unit reservation, and instant ER team prep.
                </p>
              </div>
              <button
                onClick={onOpenHospitalDesk}
                className="mt-6 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Launch Hospital Desk</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 3: Ambulance Crew HUD */}
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Ambulance className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Ambulance Crew HUD</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Turn-by-turn green corridor navigation, dynamic traffic avoidance, 1-tap ER vitals update, and patient care guidance during transit.
                </p>
              </div>
              <button
                onClick={onOpenAmbulanceHUD}
                className="mt-6 w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Launch Crew HUD</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
            Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Built for Mission-Critical Reliability
          </h2>
          <p className="text-sm text-slate-400">
            Engineered with modern offline-first web technologies, zero external vendor lock-in, and instant local execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Zap,
              color: "text-amber-400 bg-amber-500/10",
              title: "Sub-Second Dispatch Engine",
              desc: "Automated geofencing and proximity algorithm immediately matches the nearest Advanced Life Support (ALS) or BLS ambulance.",
            },
            {
              icon: Bot,
              color: "text-blue-400 bg-blue-500/10",
              title: "Clinical AI Emergency Triage",
              desc: "Upload diagnostic images (burns, wounds, X-rays) or speak symptoms to receive real-time triage scoring and immediate first aid steps.",
            },
            {
              icon: MapPin,
              color: "text-red-400 bg-red-500/10",
              title: "Green Corridor Navigation",
              desc: "Live traffic telemetry, turn-by-turn route optimization, and traffic signal synchronization to guarantee fastest hospital arrival.",
            },
            {
              icon: HeartPulse,
              color: "text-rose-400 bg-rose-500/10",
              title: "Hospital Trauma Handshake",
              desc: "Patient medical history, ECG signals, and allergies are pre-transmitted to the ER before the ambulance even reaches the hospital gates.",
            },
            {
              icon: ShieldCheck,
              color: "text-emerald-400 bg-emerald-500/10",
              title: "Offline-First & Local Mobile Run",
              desc: "Fully functional as an offline PWA or native Android APK. Can be installed directly over Wi-Fi or USB with zero internet required.",
            },
            {
              icon: Activity,
              color: "text-purple-400 bg-purple-500/10",
              title: "Operations Telemetry Analytics",
              desc: "Comprehensive dashboards for hospital administrators to track response latencies, ICU bed availability, and unit efficiency.",
            },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all space-y-3"
              >
                <div className={`w-10 h-10 rounded-xl ${f.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-white">{f.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Download & Mobile Local Connect Section */}
      <section id="download" className="py-16 px-6 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800">
        <div className="max-w-5xl mx-auto bg-gradient-to-tr from-blue-950/60 via-slate-900 to-slate-900 p-8 sm:p-12 rounded-3xl border border-blue-500/30 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Ready for Direct Download & Local Install</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Download LifeRoute for Mobile
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Run natively on your Android or iOS device. Install instantly via Wi-Fi PWA or download the direct standalone APK.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={triggerDirectDownload}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-xs font-bold shadow-lg shadow-red-500/20 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download LifeRoute-Emergency.apk</span>
                </button>

                <button
                  onClick={onOpenMobileApp}
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Smartphone className="w-4 h-4 text-blue-400" />
                  <span>Open Fitted Mobile Web App</span>
                </button>
              </div>

              {downloadSuccess && (
                <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 animate-in fade-in">
                  <CheckCircle className="w-4 h-4" />
                  <span>Download initiated! Check your downloads folder.</span>
                </div>
              )}
            </div>

            {/* Local Wi-Fi Card */}
            <div className="md:col-span-5 bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <QrCode className="w-4 h-4 text-blue-400" />
                <span>Local Mobile Wi-Fi Access</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                On your phone (connected to same Wi-Fi), open Chrome or Safari and enter:
              </p>
              <div className="bg-slate-900 px-3 py-2 rounded-xl border border-slate-700/80 font-mono text-xs text-sky-400 select-all text-center font-bold">
                http://172.29.201.150:8080
              </div>
              <div className="text-[10px] text-slate-500 text-center">
                Tap <strong>"Install App"</strong> on your phone to add to home screen.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Website Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-10 px-6 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center font-black text-[10px] text-white">
              LR
            </div>
            <span className="font-bold text-slate-300">LifeRoute Emergency Health Platform</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={onOpenMobileApp} className="hover:text-slate-300">
              Mobile App
            </button>
            <button onClick={onOpenHospitalDesk} className="hover:text-slate-300">
              Hospital Portal
            </button>
            <button onClick={onOpenAmbulanceHUD} className="hover:text-slate-300">
              Ambulance HUD
            </button>
            <button onClick={onOpenAnalytics} className="hover:text-slate-300">
              Analytics
            </button>
          </div>

          <div>© 2026 LifeRoute. Open-source healthcare architecture.</div>
        </div>
      </footer>
    </div>
  );
};

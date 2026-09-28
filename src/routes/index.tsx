import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { RoleProvider, useRole } from "@/context/RoleContext";
import { EmergencyProvider } from "@/context/EmergencyContext";

// Master Components
import { LifeRouteMobileApp } from "@/components/mobile/LifeRouteMobileApp";
import { LifeRouteWebsite } from "@/components/website/LifeRouteWebsite";
import { HospitalDashboard } from "@/components/hospital/HospitalDashboard";
import { AmbulanceDriverDashboard } from "@/components/ambulance/AmbulanceDriverDashboard";
import { EmergencyAnalytics } from "@/components/analytics/EmergencyAnalytics";

import {
  Smartphone,
  Globe,
  Hospital,
  Ambulance,
  Activity,
  ArrowLeft,
} from "lucide-react";
import { sound } from "@/lib/soundFx";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LifeRoute — Emergency Healthcare Coordination Platform" },
      {
        name: "description",
        content:
          "Smarter Coordination. Faster Care. Safer Lives. Real-time emergency ambulance dispatch, AI triage, and hospital coordination.",
      },
      { property: "og:title", content: "LifeRoute — Emergency Healthcare Coordination" },
    ],
  }),
  component: LifeRouteMasterExperience,
});

function LifeRouteMasterExperience() {
  return (
    <RoleProvider>
      <EmergencyProvider>
        <LifeRouteDualExperience />
      </EmergencyProvider>
    </RoleProvider>
  );
}

type ExperienceMode = "website" | "mobile_app" | "hospital_desk" | "ambulance_hud" | "analytics";

function LifeRouteDualExperience() {
  const [mode, setMode] = useState<ExperienceMode>(() => {
    // If URL has ?mode=app or ?view=app
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlMode = params.get("mode") || params.get("view");
      if (urlMode === "app") return "mobile_app";
      if (urlMode === "hospital") return "hospital_desk";
      if (urlMode === "ambulance") return "ambulance_hud";
      if (urlMode === "analytics") return "analytics";

      // If opening on a mobile screen (width < 768px or standalone PWA)
      const isMobileScreen = window.innerWidth < 768;
      const isStandalonePWA =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as any).standalone === true;

      if (isMobileScreen || isStandalonePWA) {
        return "mobile_app";
      }
    }
    return "website";
  });

  const switchMode = (newMode: ExperienceMode) => {
    sound.playChime();
    setMode(newMode);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // If in pure mobile app mode
  if (mode === "mobile_app") {
    return (
      <div className="w-full min-h-screen bg-slate-950 flex flex-col">
        {/* Subtle top banner only on desktop to switch back to website */}
        <div className="hidden md:flex bg-slate-900 border-b border-slate-800 px-4 py-2 items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">LifeRoute Mobile App View (Fitted)</span>
          </div>
          <button
            onClick={() => switchMode("website")}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold cursor-pointer transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>Back to Official Website</span>
          </button>
        </div>

        {/* 100% Mobile Fitted Interface */}
        <LifeRouteMobileApp onSwitchToWebsite={() => switchMode("website")} />
      </div>
    );
  }

  // If in Hospital ER Desk mode
  if (mode === "hospital_desk") {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        <header className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => switchMode("website")}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Website</span>
            </button>
            <div className="font-extrabold text-sm text-white flex items-center gap-2">
              <Hospital className="w-4 h-4 text-blue-400" />
              <span>Hospital ER Trauma Command Center</span>
            </div>
          </div>
          <button
            onClick={() => switchMode("mobile_app")}
            className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Open Mobile App</span>
          </button>
        </header>
        <main className="p-4 sm:p-6 flex-1">
          <HospitalDashboard />
        </main>
      </div>
    );
  }

  // If in Ambulance HUD mode
  if (mode === "ambulance_hud") {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        <header className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => switchMode("website")}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Website</span>
            </button>
            <div className="font-extrabold text-sm text-white flex items-center gap-2">
              <Ambulance className="w-4 h-4 text-amber-400" />
              <span>Ambulance Crew Dispatch HUD</span>
            </div>
          </div>
          <button
            onClick={() => switchMode("mobile_app")}
            className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Open Mobile App</span>
          </button>
        </header>
        <main className="p-4 sm:p-6 flex-1">
          <AmbulanceDriverDashboard />
        </main>
      </div>
    );
  }

  // If in Analytics mode
  if (mode === "analytics") {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        <header className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => switchMode("website")}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Website</span>
            </button>
            <div className="font-extrabold text-sm text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-400" />
              <span>Operations & Telemetry Analytics</span>
            </div>
          </div>
          <button
            onClick={() => switchMode("mobile_app")}
            className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Open Mobile App</span>
          </button>
        </header>
        <main className="p-4 sm:p-6 flex-1">
          <EmergencyAnalytics />
        </main>
      </div>
    );
  }

  // Default: Official Website
  return (
    <LifeRouteWebsite
      onOpenMobileApp={() => switchMode("mobile_app")}
      onOpenHospitalDesk={() => switchMode("hospital_desk")}
      onOpenAmbulanceHUD={() => switchMode("ambulance_hud")}
      onOpenAnalytics={() => switchMode("analytics")}
    />
  );
}

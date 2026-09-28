import React from "react";
import {
  Cross,
  Heart,
  Bell,
  Ambulance,
  Hospital,
  FolderHeart,
  Brain,
  Mic,
  LayoutGrid,
  ChevronRight,
  Siren,
  PhoneCall,
  Activity,
  User,
  Sparkles,
  MapPin,
} from "lucide-react";

interface HomeScreenProps {
  userName?: string;
  onEmergencyClick: () => void;
  onNavigate: (screen: string) => void;
  notificationCount?: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  userName = "Himanshu",
  onEmergencyClick,
  onNavigate,
  notificationCount = 2,
}) => {
  const quickActions = [
    {
      id: "request_ambulance",
      title: "Nearby Ambulances",
      icon: Ambulance,
      color: "text-blue-600",
      bg: "bg-blue-50",
      badge: null,
    },
    {
      id: "nearby_hospitals",
      title: "Hospitals",
      icon: Hospital,
      color: "text-blue-600",
      bg: "bg-blue-50",
      badge: null,
    },
    {
      id: "medical_history",
      title: "Medical History",
      icon: FolderHeart,
      color: "text-blue-600",
      bg: "bg-blue-50",
      badge: null,
    },
    {
      id: "ai_assessment",
      title: "AI Assessment",
      icon: Brain,
      color: "text-purple-600",
      bg: "bg-purple-50",
      badge: "New",
    },
    {
      id: "voice_assistant",
      title: "Voice Assistant",
      icon: Mic,
      color: "text-blue-600",
      bg: "bg-blue-50",
      badge: null,
    },
    {
      id: "more_menu",
      title: "More",
      icon: LayoutGrid,
      color: "text-blue-600",
      bg: "bg-blue-50",
      badge: null,
    },
  ];

  return (
    <div className="min-h-full flex flex-col justify-between bg-slate-50 text-slate-900 pb-20">
      <div className="p-5 space-y-5">
        {/* Top App Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Cross className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="font-black text-lg text-slate-900 tracking-tight">LifeRoute</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onNavigate("notifications")}
              className="relative p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-xs cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {notificationCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                  {notificationCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate("profile")}
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs cursor-pointer border border-white"
            >
              HW
            </button>
          </div>
        </div>

        {/* Greeting */}
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Hello, {userName} 👋
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            How can we help you today?
          </p>
        </div>

        {/* Big Emergency SOS Card */}
        <div
          onClick={onEmergencyClick}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-500 to-rose-600 text-white p-5 shadow-xl shadow-red-500/25 cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all group"
        >
          <div className="absolute right-0 top-0 -mt-6 -mr-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white text-red-600 flex items-center justify-center shadow-md shrink-0 group-hover:rotate-6 transition-transform">
                <PhoneCall className="w-6 h-6 stroke-[2.5] animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                  Emergency
                </h3>
                <p className="text-xs font-semibold text-white/90">Request an Ambulance</p>
                <p className="text-[11px] text-white/75 mt-0.5">Get help in seconds</p>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* 6 Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-3.5">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <div
                key={action.id}
                onClick={() => onNavigate(action.id)}
                className="relative p-4 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center group active:scale-[0.98]"
              >
                {action.badge && (
                  <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-red-500 text-white font-bold text-[9px] uppercase tracking-wider">
                    {action.badge}
                  </span>
                )}
                <div
                  className={`w-12 h-12 rounded-2xl ${action.bg} ${action.color} flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <span className="text-xs font-bold text-slate-800 leading-tight">
                  {action.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Live Kolkata Response Banner */}
        <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-center justify-between text-xs text-blue-900">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold">Nearest Ambulance Hub: Park Circus (1.2 km)</span>
          </div>
          <span className="font-bold text-blue-600">3 min ETA</span>
        </div>
      </div>
    </div>
  );
};

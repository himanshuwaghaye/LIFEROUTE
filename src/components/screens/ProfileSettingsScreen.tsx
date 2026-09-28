import React from "react";
import {
  ArrowLeft,
  User,
  Shield,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Hospital,
  Ambulance,
  UserCheck,
} from "lucide-react";
import { useRole } from "@/context/RoleContext";
import { Role } from "@/types";

interface ProfileSettingsScreenProps {
  onBack: () => void;
  onLogout?: () => void;
  onNavigate?: (screen: string) => void;
}

export const ProfileSettingsScreen: React.FC<ProfileSettingsScreenProps> = ({
  onBack,
  onLogout,
  onNavigate,
}) => {
  const { role, setRole } = useRole();

  const menuItems = [
    { id: "personal", title: "Personal Information", icon: User },
    { id: "privacy", title: "Privacy & Consent", icon: Shield },
    { id: "notifications", title: "Notifications", icon: Bell },
    { id: "app_settings", title: "App Settings", icon: Settings },
    { id: "help", title: "Help & Support", icon: HelpCircle },
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
          <h2 className="font-bold text-base text-slate-900">Profile & Settings</h2>
        </div>

        <div className="px-4 space-y-3.5">
          {/* User Profile Header Card */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-sm flex items-center justify-center border-2 border-white shadow-xs">
              HW
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Himanshu Waghaye</h3>
              <p className="text-xs text-slate-500 font-medium">himanshu@gmail.com</p>
            </div>
          </div>

          {/* Switch Role Workspace */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Switch Workspace Mode
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "Patient" as Role, label: "Patient", icon: UserCheck },
                { id: "Ambulance" as Role, label: "Ambulance", icon: Ambulance },
                { id: "Hospital" as Role, label: "Hospital", icon: Hospital },
              ].map((r) => {
                const Icon = r.icon;
                const isCurrent = role === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => setRole(r.id)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition-all cursor-pointer ${
                      isCurrent
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Settings Menu List */}
          <div className="p-2 rounded-2xl bg-white border border-slate-200/80 shadow-xs divide-y divide-slate-100 text-xs font-semibold text-slate-800">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => onNavigate?.(item.id)}
                  className="p-3 flex items-center justify-between hover:bg-slate-50 rounded-xl cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-slate-500" />
                    <span>{item.title}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              );
            })}
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="w-full p-3.5 rounded-2xl bg-white hover:bg-red-50 border border-slate-200 hover:border-red-200 text-xs font-bold text-red-600 flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

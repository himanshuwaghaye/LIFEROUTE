import React, { createContext, useContext, useState, useEffect } from "react";
import { Role } from "@/types";

interface UserProfile {
  name: string;
  phone: string;
  role: Role;
  stationOrDept?: string;
  badgeNumber?: string;
}

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
  user: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  audioMuted: boolean;
  toggleAudioMute: () => void;
}

const defaultProfiles: Record<Role, UserProfile> = {
  Hospital: {
    name: "Dr. A. Mukherjee",
    phone: "+91 33 2229 4911",
    role: "Hospital",
    stationOrDept: "Emergency Resuscitation & Trauma Lead",
    badgeNumber: "WB-MED-8491",
  },
  Ambulance: {
    name: "Sanjay Mondal",
    phone: "+91 98301 22941",
    role: "Ambulance",
    stationOrDept: "LifeRoute Unit 08 (ALS)",
    badgeNumber: "EMT-WB-2041",
  },
  Patient: {
    name: "Ananya Mehta",
    phone: "+91 98300 41209",
    role: "Patient",
    stationOrDept: "Caller / Patient Self",
    badgeNumber: "USR-0941",
  },
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<Role>("Hospital");
  const [user, setUser] = useState<UserProfile>(defaultProfiles["Hospital"]);
  const [audioMuted, setAudioMuted] = useState(false);

  useEffect(() => {
    try {
      const savedRole = localStorage.getItem("liferoute_active_role") as Role;
      if (savedRole && ["Patient", "Ambulance", "Hospital"].includes(savedRole)) {
        setRoleState(savedRole);
        setUser(defaultProfiles[savedRole]);
      }
    } catch {
      // ignore
    }
  }, []);

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    setUser(defaultProfiles[newRole]);
    try {
      localStorage.setItem("liferoute_active_role", newRole);
    } catch {
      // ignore
    }
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...profile }));
  };

  const toggleAudioMute = () => {
    setAudioMuted((prev) => !prev);
  };

  return (
    <RoleContext.Provider value={{ role, setRole, user, updateUserProfile, audioMuted, toggleAudioMute }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};

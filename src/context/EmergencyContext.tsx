import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { AmbulanceUnit, Coordinates, EmergencyRecord, EmergencyStatus, HospitalFacility, PatientVitals, PriorityLevel } from "@/types";
import { loadAmbulances, loadEmergencies, loadHospitals, saveEmergencies } from "@/lib/mockApi";
import { sound } from "@/lib/soundFx";

interface CreateEmergencyParams {
  patientName: string;
  patientAge?: number;
  patientGender?: "Male" | "Female" | "Other";
  patientPhone: string;
  emergencyType: string;
  symptoms: string[];
  notes?: string;
  priority: PriorityLevel;
  location: Coordinates;
  ambulanceId?: string;
  hospitalId?: string;
}

interface EmergencyContextType {
  emergencies: EmergencyRecord[];
  selectedEmergency: EmergencyRecord | null;
  setSelectedEmergency: (rec: EmergencyRecord | null) => void;
  ambulances: AmbulanceUnit[];
  hospitals: HospitalFacility[];
  createEmergency: (params: CreateEmergencyParams) => EmergencyRecord;
  assignAmbulance: (emergencyId: string, ambulanceId: string) => void;
  updateStatus: (emergencyId: string, status: EmergencyStatus, stageLabel?: string) => void;
  updateVitals: (emergencyId: string, vitals: Partial<PatientVitals>) => void;
  cancelEmergency: (emergencyId: string) => void;
  toastMessage: string | null;
  clearToast: () => void;
  showToast: (msg: string) => void;
  stats: {
    active: number;
    critical: number;
    availableAmbulances: number;
    avgResponseMinutes: number;
    icuAvailable: number;
  };
}

const EmergencyContext = createContext<EmergencyContextType | undefined>(undefined);

export const EmergencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [emergencies, setEmergencies] = useState<EmergencyRecord[]>([]);
  const [ambulances, setAmbulances] = useState<AmbulanceUnit[]>([]);
  const [hospitals, setHospitals] = useState<HospitalFacility[]>([]);
  const [selectedEmergency, setSelectedEmergency] = useState<EmergencyRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize from storage or seed
  useEffect(() => {
    const initEmergencies = loadEmergencies();
    const initAmbulances = loadAmbulances();
    const initHospitals = loadHospitals();

    setEmergencies(initEmergencies);
    setAmbulances(initAmbulances);
    setHospitals(initHospitals);
    if (initEmergencies.length > 0) {
      setSelectedEmergency(initEmergencies[0]);
    }
  }, []);

  // Save changes to storage
  useEffect(() => {
    if (emergencies.length > 0) {
      saveEmergencies(emergencies);
    }
  }, [emergencies]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    sound.playChime();
    const t = window.setTimeout(() => setToastMessage(null), 4000);
    return () => clearTimeout(t);
  }, []);

  const clearToast = () => setToastMessage(null);

  // Live simulation ticker for realism (ETA decrement, vitals pulse)
  useEffect(() => {
    const timer = setInterval(() => {
      setEmergencies((prev) =>
        prev.map((item) => {
          if (["en_route_pickup", "in_transit_hospital"].includes(item.status) && item.assignedAmbulance) {
            const currentEta = item.assignedAmbulance.etaMinutes;
            const newEta = currentEta > 1 ? currentEta - 0.1 : 1;
            const newDist = (newEta * 0.4).toFixed(1);

            // Subtle vitals fluctuation for realism
            let vitals = item.vitals;
            if (vitals && vitals.heartRate) {
              const deltaHr = (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 2);
              vitals = {
                ...vitals,
                heartRate: Math.max(65, Math.min(135, vitals.heartRate + deltaHr)),
                lastUpdated: "Just now",
              };
            }

            return {
              ...item,
              vitals,
              assignedAmbulance: {
                ...item.assignedAmbulance,
                etaMinutes: Math.round(newEta * 10) / 10,
                distanceKm: parseFloat(newDist),
              },
            };
          }
          return item;
        })
      );
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  // Keep selected emergency updated in sync with emergencies state
  useEffect(() => {
    if (selectedEmergency) {
      const match = emergencies.find((e) => e.id === selectedEmergency.id);
      if (match && JSON.stringify(match) !== JSON.stringify(selectedEmergency)) {
        setSelectedEmergency(match);
      }
    }
  }, [emergencies, selectedEmergency]);

  const createEmergency = (params: CreateEmergencyParams): EmergencyRecord => {
    const chosenAmbulance = params.ambulanceId
      ? ambulances.find((a) => a.id === params.ambulanceId) || ambulances[0]
      : ambulances.find((a) => a.status === "available") || ambulances[0];

    const chosenHospital = params.hospitalId
      ? hospitals.find((h) => h.id === params.hospitalId) || hospitals[0]
      : hospitals[0];

    const newId = `LR-${2050 + emergencies.length}`;
    const nowTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const newRecord: EmergencyRecord = {
      id: newId,
      patientName: params.patientName,
      patientAge: params.patientAge,
      patientGender: params.patientGender,
      patientPhone: params.patientPhone,
      emergencyType: params.emergencyType,
      symptoms: params.symptoms,
      notes: params.notes,
      priority: params.priority,
      status: "finding_ambulance",
      location: params.location,
      destinationHospital: chosenHospital,
      assignedAmbulance: chosenAmbulance,
      createdAt: "Just now",
      updatedAt: "Just now",
      vitals: {
        heartRate: params.priority === "Critical" ? 118 : 88,
        bloodPressure: "135/88",
        spo2: params.priority === "Critical" ? 92 : 98,
        respiratoryRate: 20,
        temperature: 98.6,
        consciousnessLevel: "Alert",
        notes: "Initial triage assessment recorded at dispatch.",
        lastUpdated: "Just now",
      },
      timeline: [
        {
          stage: "finding_ambulance",
          label: "SOS Request Logged",
          timestamp: nowTime,
          description: `Triage Priority: ${params.priority}. Location verified.`,
          completed: true,
        },
        {
          stage: "assigned",
          label: "Unit Assigned",
          timestamp: nowTime,
          description: `${chosenAmbulance.callSign} assigned.`,
          completed: true,
        },
        {
          stage: "en_route_pickup",
          label: "En Route to Scene",
          timestamp: "--:--",
          description: `Navigating to ${params.location.address}`,
          completed: false,
        },
        {
          stage: "at_scene",
          label: "Arrived at Scene",
          timestamp: "--:--",
          description: "Stabilization and boarding in progress",
          completed: false,
        },
        {
          stage: "in_transit_hospital",
          label: "Transit to Hospital",
          timestamp: "--:--",
          description: `Live streaming to ${chosenHospital.name}`,
          completed: false,
        },
        {
          stage: "arrived_hospital",
          label: "ER Handoff",
          timestamp: "--:--",
          description: "Patient admitted to Emergency Resuscitation Bay",
          completed: false,
        },
      ],
    };

    setEmergencies((prev) => [newRecord, ...prev]);
    setSelectedEmergency(newRecord);
    sound.playEmergencyAlert();
    showToast(`🚨 SOS Dispatch ${newId} initiated! Ambulance ${chosenAmbulance.callSign} notified.`);
    return newRecord;
  };

  const assignAmbulance = (emergencyId: string, ambulanceId: string) => {
    const unit = ambulances.find((a) => a.id === ambulanceId);
    if (!unit) return;

    setEmergencies((prev) =>
      prev.map((item) => {
        if (item.id === emergencyId) {
          const updated = {
            ...item,
            assignedAmbulance: unit,
            status: "assigned" as EmergencyStatus,
            updatedAt: "Just now",
          };
          return updated;
        }
        return item;
      })
    );
    sound.playSuccess();
    showToast(`Ambulance ${unit.callSign} assigned to request #${emergencyId}.`);
  };

  const updateStatus = (emergencyId: string, status: EmergencyStatus, stageLabel?: string) => {
    const nowTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setEmergencies((prev) =>
      prev.map((item) => {
        if (item.id === emergencyId) {
          const updatedTimeline = item.timeline.map((t) => {
            if (t.stage === status) {
              return { ...t, timestamp: nowTime, completed: true };
            }
            return t;
          });

          return {
            ...item,
            status,
            updatedAt: "Just now",
            timeline: updatedTimeline,
          };
        }
        return item;
      })
    );
    sound.playSuccess();
    showToast(`Status updated for #${emergencyId}: ${stageLabel || status}`);
  };

  const updateVitals = (emergencyId: string, vitals: Partial<PatientVitals>) => {
    setEmergencies((prev) =>
      prev.map((item) => {
        if (item.id === emergencyId) {
          return {
            ...item,
            vitals: {
              ...item.vitals,
              ...vitals,
              lastUpdated: "Just now",
            },
            updatedAt: "Just now",
          };
        }
        return item;
      })
    );
    sound.playHeartbeat();
    showToast(`Patient vitals telemetry updated and broadcast to ER team.`);
  };

  const cancelEmergency = (emergencyId: string) => {
    setEmergencies((prev) =>
      prev.map((item) => (item.id === emergencyId ? { ...item, status: "cancelled" as EmergencyStatus, updatedAt: "Just now" } : item))
    );
    showToast(`Emergency #${emergencyId} has been cancelled.`);
  };

  const stats = {
    active: emergencies.filter((e) => !["completed", "cancelled"].includes(e.status)).length,
    critical: emergencies.filter((e) => e.priority === "Critical" && !["completed", "cancelled"].includes(e.status)).length,
    availableAmbulances: ambulances.filter((a) => a.status === "available").length,
    avgResponseMinutes: 5.8,
    icuAvailable: hospitals.reduce((acc, h) => acc + h.availableBeds.icu, 0),
  };

  return (
    <EmergencyContext.Provider
      value={{
        emergencies,
        selectedEmergency,
        setSelectedEmergency,
        ambulances,
        hospitals,
        createEmergency,
        assignAmbulance,
        updateStatus,
        updateVitals,
        cancelEmergency,
        toastMessage,
        clearToast,
        showToast,
        stats,
      }}
    >
      {children}
    </EmergencyContext.Provider>
  );
};

export const useEmergency = () => {
  const context = useContext(EmergencyContext);
  if (!context) {
    throw new Error("useEmergency must be used within an EmergencyProvider");
  }
  return context;
};

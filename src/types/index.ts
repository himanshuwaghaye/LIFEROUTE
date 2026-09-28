export type Role = "Patient" | "Ambulance" | "Hospital";

export type PriorityLevel = "Critical" | "High" | "Medium" | "Low";

export type EmergencyStatus =
  | "finding_ambulance"
  | "assigned"
  | "en_route_pickup"
  | "at_scene"
  | "in_transit_hospital"
  | "arrived_hospital"
  | "admitted"
  | "cancelled"
  | "completed";

export interface Coordinates {
  lat: number;
  lng: number;
  address: string;
  landmark?: string;
}

export interface PatientVitals {
  heartRate?: number;
  bloodPressure?: string;
  spo2?: number;
  respiratoryRate?: number;
  temperature?: number;
  consciousnessLevel?: "Alert" | "Verbal" | "Pain" | "Unresponsive";
  notes?: string;
  lastUpdated?: string;
}

export interface AmbulanceUnit {
  id: string;
  callSign: string;
  plateNumber: string;
  type: "Advanced Life Support (ALS)" | "Basic Life Support (BLS)" | "Cardiac ICU" | "Neonatal ICU";
  driverName: string;
  driverPhone: string;
  paramedicName: string;
  station: string;
  currentLocation: Coordinates;
  status: "available" | "dispatched" | "busy" | "maintenance";
  etaMinutes: number;
  distanceKm: number;
  rating: number;
  equipment: string[];
}

export interface HospitalFacility {
  id: string;
  name: string;
  location: Coordinates;
  phone: string;
  emergencyDepartmentPhone: string;
  availableBeds: {
    icu: number;
    icuTotal: number;
    trauma: number;
    traumaTotal: number;
    general: number;
    generalTotal: number;
    cathLab: number;
    cathLabTotal: number;
  };
  specialistsOnDuty: {
    name: string;
    role: string;
    status: "Ready" | "In Surgery" | "On Standby";
    phone?: string;
  }[];
  bloodStock: {
    group: string;
    units: number;
    status: "Adequate" | "Low" | "Critical";
  }[];
}

export interface EmergencyRecord {
  id: string;
  patientName: string;
  patientAge?: number;
  patientGender?: "Male" | "Female" | "Other";
  patientPhone: string;
  emergencyType: string;
  symptoms: string[];
  notes?: string;
  priority: PriorityLevel;
  status: EmergencyStatus;
  location: Coordinates;
  destinationHospital: HospitalFacility;
  assignedAmbulance?: AmbulanceUnit;
  createdAt: string;
  updatedAt: string;
  vitals?: PatientVitals;
  timeline: {
    stage: EmergencyStatus;
    label: string;
    timestamp: string;
    description: string;
    completed: boolean;
  }[];
}

export interface EmergencyStats {
  activeCount: number;
  criticalCount: number;
  avgResponseMinutes: number;
  availableAmbulanceCount: number;
  teamsStandbyCount: number;
  icuBedsAvailable: number;
}

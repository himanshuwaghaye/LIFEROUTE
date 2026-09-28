import { AmbulanceUnit, EmergencyRecord, EmergencyStatus, HospitalFacility, PriorityLevel } from "@/types";

export const MOCK_HOSPITALS: HospitalFacility[] = [
  {
    id: "HOSP-01",
    name: "City General Hospital & Medical College",
    location: {
      lat: 22.5532,
      lng: 88.3512,
      address: "14/2 Park Street, Central Kolkata",
      landmark: "Near Mullick Bazaar Crossing",
    },
    phone: "+91 33 2229 4000",
    emergencyDepartmentPhone: "+91 33 2229 4911",
    availableBeds: {
      icu: 4,
      icuTotal: 8,
      trauma: 2,
      traumaTotal: 4,
      general: 18,
      generalTotal: 30,
      cathLab: 1,
      cathLabTotal: 2,
    },
    specialistsOnDuty: [
      { name: "Dr. A. Mukherjee", role: "Chief Trauma Surgeon", status: "Ready", phone: "Ext. 201" },
      { name: "Dr. S. Banerjee", role: "Interventional Cardiologist", status: "Ready", phone: "Ext. 208" },
      { name: "Dr. P. Sen", role: "Critical Care Anesthetist", status: "Ready", phone: "Ext. 214" },
      { name: "Dr. N. Roy", role: "Neurovascular Specialist", status: "On Standby", phone: "Ext. 220" },
    ],
    bloodStock: [
      { group: "O-", units: 6, status: "Adequate" },
      { group: "O+", units: 14, status: "Adequate" },
      { group: "A+", units: 10, status: "Adequate" },
      { group: "B+", units: 12, status: "Adequate" },
      { group: "AB+", units: 5, status: "Adequate" },
      { group: "AB-", units: 2, status: "Low" },
    ],
  },
  {
    id: "HOSP-02",
    name: "Apex Heart & Multispeciality Institute",
    location: {
      lat: 22.518,
      lng: 88.365,
      address: "88 Ballygunge Circular Rd, Kolkata",
      landmark: "Opposite Police Lines",
    },
    phone: "+91 33 2475 1200",
    emergencyDepartmentPhone: "+91 33 2475 1911",
    availableBeds: {
      icu: 6,
      icuTotal: 10,
      trauma: 1,
      traumaTotal: 3,
      general: 22,
      generalTotal: 40,
      cathLab: 2,
      cathLabTotal: 2,
    },
    specialistsOnDuty: [
      { name: "Dr. K. Ghoshal", role: "Cardiothoracic Lead", status: "Ready", phone: "Ext. 302" },
      { name: "Dr. R. Mitra", role: "Emergency Medicine Specialist", status: "Ready", phone: "Ext. 310" },
    ],
    bloodStock: [
      { group: "O+", units: 18, status: "Adequate" },
      { group: "A+", units: 11, status: "Adequate" },
      { group: "B+", units: 16, status: "Adequate" },
      { group: "O-", units: 3, status: "Low" },
    ],
  },
];

export const MOCK_AMBULANCES: AmbulanceUnit[] = [
  {
    id: "AMB-08",
    callSign: "LifeRoute Unit 08",
    plateNumber: "WB 02 AR 4812",
    type: "Advanced Life Support (ALS)",
    driverName: "Sanjay Mondal",
    driverPhone: "+91 98301 22941",
    paramedicName: "Debashis Paul (EMT-P)",
    station: "Park Circus Hub 02",
    currentLocation: {
      lat: 22.544,
      lng: 88.362,
      address: "Near Park Circus 7 Point Crossing",
    },
    status: "dispatched",
    etaMinutes: 6,
    distanceKm: 2.4,
    rating: 4.9,
    equipment: ["Defibrillator (AED + Manual)", "Ventilator (Transport)", "Multipara Monitor", "Spine Board", "Oxygen 2x10L", "Syringe Pumps"],
  },
  {
    id: "AMB-03",
    callSign: "LifeRoute Cardiac 03",
    plateNumber: "WB 01 BP 9041",
    type: "Cardiac ICU",
    driverName: "Bikash Karmakar",
    driverPhone: "+91 98304 88310",
    paramedicName: "Ritwik Ghosh (Cardiac EMT)",
    station: "Exide / Camac St Station",
    currentLocation: {
      lat: 22.541,
      lng: 88.349,
      address: "Chowringhee & AJC Bose Junction",
    },
    status: "available",
    etaMinutes: 4,
    distanceKm: 1.6,
    rating: 4.95,
    equipment: ["12-Lead ECG with Telemetry", "Biphasic Defibrillator", "Pacemaker Ready", "Lucas CPR Device", "ICU Ventilator", "Emergency Inotropes"],
  },
  {
    id: "AMB-12",
    callSign: "LifeRoute Rapid 12",
    plateNumber: "WB 04 CT 3120",
    type: "Basic Life Support (BLS)",
    driverName: "Mohammad Arif",
    driverPhone: "+91 98319 77412",
    paramedicName: "S. Dutta (EMT-B)",
    station: "Sealdah Fast Response",
    currentLocation: {
      lat: 22.567,
      lng: 88.371,
      address: "Near Sealdah Flyover",
    },
    status: "available",
    etaMinutes: 9,
    distanceKm: 3.8,
    rating: 4.8,
    equipment: ["Oxygen Therapy", "First Aid Trauma Kit", "Automated External Defibrillator", "Stretcher & Wheelchair"],
  },
  {
    id: "AMB-05",
    callSign: "LifeRoute Neonatal 05",
    plateNumber: "WB 02 DK 6621",
    type: "Neonatal ICU",
    driverName: "Prosenjit Roy",
    driverPhone: "+91 98307 15432",
    paramedicName: "Sister Anwesha Sen (NICU)",
    station: "Ballygunge Central Hub",
    currentLocation: {
      lat: 22.525,
      lng: 88.358,
      address: "Gariahat Crossing",
    },
    status: "available",
    etaMinutes: 11,
    distanceKm: 4.5,
    rating: 5.0,
    equipment: ["Transport Incubator", "Pediatric/Neonatal Ventilator", "Infusion Pumps", "Pulse Oximeter (Neonatal)", "Thermal Warmer"],
  },
];

export const INITIAL_EMERGENCIES: EmergencyRecord[] = [
  {
    id: "LR-2048",
    patientName: "Ananya Mehta",
    patientAge: 54,
    patientGender: "Female",
    patientPhone: "+91 98300 41209",
    emergencyType: "Cardiac concern",
    symptoms: ["Severe chest tightness", "Radiating left arm pain", "Shortness of breath", "Cold sweat"],
    notes: "History of hypertension. Took sublingual sorbitrate 5 min ago.",
    priority: "Critical",
    status: "en_route_pickup",
    location: {
      lat: 22.551,
      lng: 88.353,
      address: "12 Park Street, Flat 4B, Central Kolkata",
      landmark: "Opposite Oxford Bookstore",
    },
    destinationHospital: MOCK_HOSPITALS[0],
    assignedAmbulance: MOCK_AMBULANCES[0],
    createdAt: "5 mins ago",
    updatedAt: "Just now",
    vitals: {
      heartRate: 112,
      bloodPressure: "155/95",
      spo2: 94,
      respiratoryRate: 22,
      temperature: 98.4,
      consciousnessLevel: "Alert",
      notes: "ST-elevation flagged on telemetry stream. Cath lab alerted.",
      lastUpdated: "1 min ago",
    },
    timeline: [
      { stage: "finding_ambulance", label: "SOS Received", timestamp: "16:04", description: "Call logged & triage auto-scored as Critical", completed: true },
      { stage: "assigned", label: "Ambulance Dispatched", timestamp: "16:05", description: "LifeRoute Unit 08 (ALS) accepted dispatch", completed: true },
      { stage: "en_route_pickup", label: "En Route to Patient", timestamp: "16:06", description: "Crew navigated, ETA 6 mins (2.4 km away)", completed: true },
      { stage: "at_scene", label: "Arrival at Scene", timestamp: "--:--", description: "Crew arriving and initiating patient stabilization", completed: false },
      { stage: "in_transit_hospital", label: "Transit to Hospital", timestamp: "--:--", description: "Transport with live vitals streaming to ER", completed: false },
      { stage: "arrived_hospital", label: "ER Handoff", timestamp: "--:--", description: "Direct admission to designated Trauma/Cath Bay", completed: false },
    ],
  },
  {
    id: "LR-2047",
    patientName: "Rohan Das",
    patientAge: 29,
    patientGender: "Male",
    patientPhone: "+91 98311 88402",
    emergencyType: "Road accident",
    symptoms: ["Lower limb compound fracture", "Moderate bleeding", "Conscious"],
    notes: "Motorbike collision with divider. Helmet worn.",
    priority: "High",
    status: "assigned",
    location: {
      lat: 22.539,
      lng: 88.358,
      address: "A.J.C. Bose Road Flyover Ramp, Kolkata",
      landmark: "Near Mullick Bazaar",
    },
    destinationHospital: MOCK_HOSPITALS[0],
    assignedAmbulance: MOCK_AMBULANCES[1],
    createdAt: "12 mins ago",
    updatedAt: "3 mins ago",
    vitals: {
      heartRate: 98,
      bloodPressure: "128/82",
      spo2: 98,
      respiratoryRate: 18,
      consciousnessLevel: "Alert",
      notes: "Tourniquet applied, bleeding controlled.",
      lastUpdated: "4 mins ago",
    },
    timeline: [
      { stage: "finding_ambulance", label: "SOS Received", timestamp: "15:58", description: "Bystander call logged", completed: true },
      { stage: "assigned", label: "Ambulance Dispatched", timestamp: "16:00", description: "LifeRoute Cardiac 03 dispatched", completed: true },
      { stage: "en_route_pickup", label: "En Route", timestamp: "--:--", description: "In transit", completed: false },
      { stage: "at_scene", label: "At Scene", timestamp: "--:--", description: "Pending", completed: false },
      { stage: "in_transit_hospital", label: "Hospital Transit", timestamp: "--:--", description: "Pending", completed: false },
      { stage: "arrived_hospital", label: "ER Handoff", timestamp: "--:--", description: "Pending", completed: false },
    ],
  },
  {
    id: "LR-2046",
    patientName: "Mira Sen",
    patientAge: 71,
    patientGender: "Female",
    patientPhone: "+91 98305 66710",
    emergencyType: "Breathing difficulty",
    symptoms: ["Severe asthma attack", "Inability to speak in full sentences", "Cyanosis"],
    priority: "High",
    status: "in_transit_hospital",
    location: {
      lat: 22.528,
      lng: 88.361,
      address: "42 Ballygunge Place, Kolkata",
    },
    destinationHospital: MOCK_HOSPITALS[1],
    assignedAmbulance: MOCK_AMBULANCES[0],
    createdAt: "22 mins ago",
    updatedAt: "2 mins ago",
    vitals: {
      heartRate: 108,
      bloodPressure: "140/90",
      spo2: 91,
      respiratoryRate: 28,
      consciousnessLevel: "Alert",
      notes: "High-flow oxygen administered via non-rebreather mask. SpO2 improving.",
      lastUpdated: "2 mins ago",
    },
    timeline: [
      { stage: "finding_ambulance", label: "SOS Received", timestamp: "15:48", description: "Family caller logged", completed: true },
      { stage: "assigned", label: "Ambulance Dispatched", timestamp: "15:50", description: "Unit assigned", completed: true },
      { stage: "en_route_pickup", label: "En Route", timestamp: "15:52", description: "Arrived in 6 mins", completed: true },
      { stage: "at_scene", label: "At Scene", timestamp: "15:58", description: "Nebulization started", completed: true },
      { stage: "in_transit_hospital", label: "In Transit", timestamp: "16:05", description: "Heading to Apex Heart Hospital", completed: true },
      { stage: "arrived_hospital", label: "ER Handoff", timestamp: "--:--", description: "Pending arrival", completed: false },
    ],
  },
];

const STORAGE_KEY_EMERGENCIES = "liferoute_emergencies_v2";
const STORAGE_KEY_AMBULANCES = "liferoute_ambulances_v2";
const STORAGE_KEY_HOSPITALS = "liferoute_hospitals_v2";

export function loadEmergencies(): EmergencyRecord[] {
  if (typeof window === "undefined") return INITIAL_EMERGENCIES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_EMERGENCIES);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return INITIAL_EMERGENCIES;
}

export function saveEmergencies(data: EmergencyRecord[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_EMERGENCIES, JSON.stringify(data));
  } catch {
    // ignore
  }
}

export function loadAmbulances(): AmbulanceUnit[] {
  if (typeof window === "undefined") return MOCK_AMBULANCES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_AMBULANCES);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return MOCK_AMBULANCES;
}

export function loadHospitals(): HospitalFacility[] {
  if (typeof window === "undefined") return MOCK_HOSPITALS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_HOSPITALS);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return MOCK_HOSPITALS;
}

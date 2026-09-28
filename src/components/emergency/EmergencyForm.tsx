import React, { useState } from "react";
import { useEmergency } from "@/context/EmergencyContext";
import { useGeolocation } from "@/hooks";
import { Button, Card, Badge, Alert } from "@/components/shared";
import {
  AlertCircle,
  HeartPulse,
  Flame,
  Activity,
  Car,
  Wind,
  Baby,
  User,
  Phone,
  MapPin,
  Siren,
  Sparkles,
  Navigation,
} from "lucide-react";
import { PriorityLevel } from "@/types";

const EMERGENCY_TYPES = [
  { id: "Cardiac concern", label: "Cardiac / Heart Attack", icon: HeartPulse, defaultPriority: "Critical" as PriorityLevel, symptoms: ["Chest pain/tightness", "Left arm numbness", "Cold sweat", "Shortness of breath"] },
  { id: "Road accident", label: "Road Accident / Trauma", icon: Car, defaultPriority: "High" as PriorityLevel, symptoms: ["Fracture/Deformity", "Severe Bleeding", "Head Trauma", "Loss of Consciousness"] },
  { id: "Breathing difficulty", label: "Severe Respiratory Distress", icon: Wind, defaultPriority: "High" as PriorityLevel, symptoms: ["Gasping/Inability to speak", "Cyanosis (blue lips)", "Asthma exacerbation", "Wheezing"] },
  { id: "Stroke symptoms", label: "Stroke / Neurological", icon: Activity, defaultPriority: "Critical" as PriorityLevel, symptoms: ["Facial droop", "Arm weakness", "Slurred speech", "Sudden confusion"] },
  { id: "Burn or Fire", label: "Severe Burns / Scalds", icon: Flame, defaultPriority: "High" as PriorityLevel, symptoms: ["Extensive thermal burns", "Inhalation injury", "Blistering"] },
  { id: "Maternal & Child", label: "Maternal / Pediatric SOS", icon: Baby, defaultPriority: "High" as PriorityLevel, symptoms: ["Imminent delivery", "Heavy obstetric bleeding", "Severe pediatric fever/seizures"] },
];

interface EmergencyFormProps {
  onSubmitted?: () => void;
  onCancel?: () => void;
}

export const EmergencyForm: React.FC<EmergencyFormProps> = ({ onSubmitted, onCancel }) => {
  const { createEmergency, ambulances, hospitals } = useEmergency();
  const { getCurrentLocation, loading: geoLoading } = useGeolocation();

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedType, setSelectedType] = useState(EMERGENCY_TYPES[0].id);
  const [priority, setPriority] = useState<PriorityLevel>("Critical");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([EMERGENCY_TYPES[0].symptoms[0]]);
  const [patientName, setPatientName] = useState("Ananya Mehta");
  const [patientAge, setPatientAge] = useState("54");
  const [patientGender, setPatientGender] = useState<"Male" | "Female" | "Other">("Female");
  const [patientPhone, setPatientPhone] = useState("+91 98300 41209");
  const [address, setAddress] = useState("12 Park Street, Flat 4B, Central Kolkata");
  const [landmark, setLandmark] = useState("Opposite Oxford Bookstore");
  const [notes, setNotes] = useState("Patient is experiencing crushing chest pain for 15 mins.");
  const [selectedAmbulanceId, setSelectedAmbulanceId] = useState(ambulances[0]?.id || "AMB-08");
  const [selectedHospitalId, setSelectedHospitalId] = useState(hospitals[0]?.id || "HOSP-01");

  const currentTypeObj = EMERGENCY_TYPES.find((t) => t.id === selectedType) || EMERGENCY_TYPES[0];

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    const match = EMERGENCY_TYPES.find((t) => t.id === typeId);
    if (match) {
      setPriority(match.defaultPriority);
      setSelectedSymptoms([match.symptoms[0]]);
    }
  };

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const handleDetectLocation = () => {
    getCurrentLocation((coords) => {
      setAddress(coords.address);
      setLandmark(coords.landmark || "GPS Detected");
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createEmergency({
      patientName: patientName.trim() || "Emergency Patient",
      patientAge: parseInt(patientAge) || 45,
      patientGender,
      patientPhone: patientPhone.trim() || "+91 98300 00000",
      emergencyType: selectedType,
      symptoms: selectedSymptoms,
      notes,
      priority,
      location: {
        lat: 22.551,
        lng: 88.353,
        address,
        landmark,
      },
      ambulanceId: selectedAmbulanceId,
      hospitalId: selectedHospitalId,
    });
    onSubmitted?.();
  };

  return (
    <div className="space-y-6">
      {/* Stepper Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 1 ? "bg-red-600 text-white" : "bg-emerald-600 text-white"}`}>
            1
          </span>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">1. Emergency Assessment</h4>
            <p className="text-xs text-slate-500">Condition type & symptoms</p>
          </div>
        </div>
        <div className="h-0.5 w-12 bg-slate-200 dark:bg-slate-700" />
        <div className="flex items-center gap-3">
          <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 2 ? "bg-red-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}>
            2
          </span>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">2. Patient & Dispatch</h4>
            <p className="text-xs text-slate-500">Location & contact</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Select Medical Emergency Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EMERGENCY_TYPES.map((type) => {
                  const Icon = type.icon;
                  const isSelected = selectedType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => handleTypeSelect(type.id)}
                      className={`flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? "border-red-600 bg-red-50/60 dark:bg-red-950/40 ring-2 ring-red-500/20"
                          : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900"
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl ${isSelected ? "bg-red-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-slate-900 dark:text-white">{type.label}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          Triage priority: <span className="font-semibold text-red-600 dark:text-red-400">{type.defaultPriority}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Severity level */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Triage Urgency Level
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {(["Critical", "High", "Medium"] as PriorityLevel[]).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setPriority(level)}
                    className={`py-2.5 px-3 rounded-xl border font-semibold text-xs transition-all ${
                      priority === level
                        ? level === "Critical"
                          ? "bg-red-600 text-white border-red-600 shadow-sm"
                          : level === "High"
                          ? "bg-orange-600 text-white border-orange-600 shadow-sm"
                          : "bg-amber-600 text-white border-amber-600 shadow-sm"
                        : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    {level === "Critical" ? "🚨 Critical (Immediate)" : level === "High" ? "⚠️ High (Within 10m)" : "🟡 Medium (Prompt)"}
                  </button>
                ))}
              </div>
            </div>

            {/* Symptoms selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Observed Symptoms (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-2">
                {currentTypeObj.symptoms.map((symptom) => {
                  const isChecked = selectedSymptoms.includes(symptom);
                  return (
                    <button
                      key={symptom}
                      type="button"
                      onClick={() => toggleSymptom(symptom)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        isChecked
                          ? "bg-red-600 text-white border-red-600 shadow-xs"
                          : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                      }`}
                    >
                      {isChecked ? "✓ " : "+ "}
                      {symptom}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              <Button type="button" variant="primary" onClick={() => setStep(2)}>
                Next: Patient & Dispatch Details →
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5 animate-in fade-in">
            {/* Patient Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Patient Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Contact Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="+91 98300 00000"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Age & Gender
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    placeholder="Age"
                    className="w-24 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <select
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value as "Male" | "Female" | "Other")}
                    className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Destination Hospital Facility
                </label>
                <select
                  value={selectedHospitalId}
                  onChange={(e) => setSelectedHospitalId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {hospitals.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.name} ({h.availableBeds.icu} ICU Beds Available)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Incident / Pickup Address *
                </label>
                <button
                  type="button"
                  onClick={handleDetectLocation}
                  disabled={geoLoading}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-red-600 hover:text-red-700 dark:text-red-400"
                >
                  <Navigation className={`w-3.5 h-3.5 ${geoLoading ? "animate-spin" : ""}`} />
                  {geoLoading ? "Detecting GPS..." : "Auto-detect GPS"}
                </button>
              </div>
              <div className="relative mb-2">
                <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-red-600" />
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street address or area"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="Landmark (e.g. Near Metro Station / Landmark building)"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-600 dark:text-slate-400"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Clinical Context & Medical History
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Known allergies, existing cardiac history, current medications..."
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
              />
            </div>

            <Alert type="warning" title="Emergency Dispatch Confirmation">
              Submitting will immediately broadcast this SOS triage to nearby emergency dispatchers and reserve a bay at the destination hospital.
            </Alert>

            <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                ← Back
              </Button>
              <Button type="submit" variant="danger" size="lg" className="shadow-lg shadow-red-600/30">
                <Siren className="w-5 h-5 animate-pulse" />
                Broadcast Immediate Emergency SOS
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

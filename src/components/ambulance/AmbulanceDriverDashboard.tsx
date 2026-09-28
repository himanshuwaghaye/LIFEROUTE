import React, { useState } from "react";
import { useEmergency } from "@/context/EmergencyContext";
import { Button, Card, Badge, Modal } from "@/components/shared";
import {
  Navigation,
  Phone,
  Hospital,
  MapPin,
  Clock,
  HeartPulse,
  Activity,
  CheckCircle2,
  ShieldCheck,
  User,
  AlertCircle,
  Radio,
  Share2,
} from "lucide-react";
import { sound } from "@/lib/soundFx";
import { EmergencyStatus } from "@/types";

export const AmbulanceDriverDashboard: React.FC = () => {
  const { selectedEmergency, emergencies, setSelectedEmergency, updateStatus, updateVitals, showToast } = useEmergency();
  const [showVitalsModal, setShowVitalsModal] = useState(false);

  // Vitals form state
  const [hr, setHr] = useState("114");
  const [bp, setBp] = useState("150/92");
  const [spo2, setSpo2] = useState("95");
  const [resp, setResp] = useState("22");
  const [consciousness, setConsciousness] = useState<"Alert" | "Verbal" | "Pain" | "Unresponsive">("Alert");
  const [paramedicNotes, setParamedicNotes] = useState("IV line established 18G left forearm. O2 4L administered.");

  if (!selectedEmergency) {
    return (
      <Card className="text-center py-12">
        <Navigation className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
        <h3 className="text-base font-bold text-slate-900 dark:text-white">No active dispatch assigned</h3>
        <p className="text-xs text-slate-500 mt-1">Standby at base station. System will chime upon incoming dispatch.</p>
      </Card>
    );
  }

  const amb = selectedEmergency.assignedAmbulance;
  const hosp = selectedEmergency.destinationHospital;

  const handleStatusAdvance = (nextStatus: EmergencyStatus, label: string) => {
    updateStatus(selectedEmergency.id, nextStatus, label);
  };

  const handleSaveVitals = (e: React.FormEvent) => {
    e.preventDefault();
    updateVitals(selectedEmergency.id, {
      heartRate: parseInt(hr) || 100,
      bloodPressure: bp,
      spo2: parseInt(spo2) || 98,
      respiratoryRate: parseInt(resp) || 20,
      consciousnessLevel: consciousness,
      notes: paramedicNotes,
    });
    setShowVitalsModal(false);
  };

  const statusProgressSteps: { status: EmergencyStatus; label: string; btnLabel: string }[] = [
    { status: "assigned", label: "Dispatched", btnLabel: "Accept Dispatch" },
    { status: "en_route_pickup", label: "En Route Scene", btnLabel: "Start Navigation to Scene" },
    { status: "at_scene", label: "Arrived Scene", btnLabel: "Mark Arrived at Scene" },
    { status: "in_transit_hospital", label: "Patient Boarded", btnLabel: "Board Patient & Head to ER" },
    { status: "arrived_hospital", label: "At Hospital ER", btnLabel: "Mark Arrival at Hospital ER" },
    { status: "completed", label: "Handoff Complete", btnLabel: "Complete Emergency Handoff" },
  ];

  const currentStepIndex = statusProgressSteps.findIndex((s) => s.status === selectedEmergency.status);
  const nextStep = statusProgressSteps[currentStepIndex + 1];

  return (
    <div className="space-y-5">
      {/* Crew HUD Banner */}
      <div className="rounded-3xl bg-slate-900 text-white p-6 border border-slate-800 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-red-600/20 text-red-500 border border-red-500/30">
              <Radio className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                  ACTIVE CREW DISPATCH · {amb?.callSign || "Unit 08 (ALS)"}
                </span>
                <Badge variant="critical">Priority: {selectedEmergency.priority}</Badge>
              </div>
              <h2 className="text-xl font-black mt-1">{selectedEmergency.patientName} — {selectedEmergency.emergencyType}</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-white border-slate-700 hover:bg-slate-800"
              onClick={() => {
                sound.playChime();
                showToast(`Calling Patient: ${selectedEmergency.patientPhone}`);
              }}
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              Call Patient ({selectedEmergency.patientPhone})
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowVitalsModal(true)}
            >
              <HeartPulse className="w-4 h-4" />
              Update Vitals Telemetry
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column: Navigation HUD & Destination Route */}
        <div className="lg:col-span-2 space-y-5">
          {/* Turn-by-Turn GPS Navigation HUD */}
          <Card className="bg-slate-950 text-white border-slate-800 overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-slate-900/80 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <Navigation className="w-5 h-5 text-emerald-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Turn-by-Turn Real-Time Navigation HUD
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">GPS ACCURACY: ±3M</span>
            </div>

            <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-slate-800">
              <div className="sm:col-span-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Next Maneuver in 250m</div>
                <div className="text-2xl font-black text-white mt-1">
                  Keep Left onto Park Street Flyover Ramp
                </div>
                <div className="text-xs text-slate-400 mt-1">Then continue straight for 1.2 km towards Mullick Bazaar</div>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-center flex flex-col justify-center">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Telemetry Speed</div>
                <div className="text-3xl font-black text-emerald-400 font-mono mt-0.5">58 <span className="text-sm font-semibold">KM/H</span></div>
                <div className="text-[10px] text-slate-400 mt-0.5">Traffic Congestion: Green</div>
              </div>
            </div>

            {/* Waypoints */}
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase">Pickup Location (Patient)</div>
                  <div className="text-sm font-bold text-white mt-0.5">{selectedEmergency.location.address}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{selectedEmergency.location.landmark}</div>
                </div>
              </div>

              <div className="h-4 border-l-2 border-dashed border-slate-700 ml-4.5" />

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                  <Hospital className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase">Destination Hospital (ER Bay)</div>
                  <div className="text-sm font-bold text-white mt-0.5">{hosp.name}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{hosp.location.address} (ICU Beds: {hosp.availableBeds.icu})</div>
                </div>
              </div>
            </div>

            {/* Quick Action Progression Bar */}
            {nextStep && (
              <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-300">
                  Current Status: <b className="text-white uppercase">{selectedEmergency.status.replace(/_/g, " ")}</b>
                </div>
                <Button
                  variant="success"
                  size="md"
                  onClick={() => handleStatusAdvance(nextStep.status, nextStep.label)}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {nextStep.btnLabel}
                </Button>
              </div>
            )}
          </Card>
        </div>

        {/* Right Column: Patient Profile & Vitals Telemetry */}
        <div className="space-y-5">
          <Card className="border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-red-600" />
              Patient Clinical Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex justify-between">
                <span className="text-slate-500">Demographics</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {selectedEmergency.patientName} ({selectedEmergency.patientAge}y, {selectedEmergency.patientGender})
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                <div className="text-slate-500 mb-1">Chief Symptoms</div>
                <div className="flex flex-wrap gap-1">
                  {selectedEmergency.symptoms.map((sym, idx) => (
                    <Badge key={idx} variant="critical">
                      {sym}
                    </Badge>
                  ))}
                </div>
              </div>

              {selectedEmergency.notes && (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 text-amber-900 dark:text-amber-300">
                  <b>Caller Notes:</b> {selectedEmergency.notes}
                </div>
              )}
            </div>
          </Card>

          {/* Vitals Readout Card */}
          <Card className="border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-red-600" />
                Live Vitals Stream
              </h3>
              <Button size="sm" variant="outline" onClick={() => setShowVitalsModal(true)}>
                Edit Vitals
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
                <div className="text-slate-500 font-bold uppercase text-[10px]">HR</div>
                <div className="text-xl font-black text-red-600">{selectedEmergency.vitals?.heartRate || 112} BPM</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
                <div className="text-slate-500 font-bold uppercase text-[10px]">BP</div>
                <div className="text-xl font-black text-slate-900 dark:text-white">{selectedEmergency.vitals?.bloodPressure || "155/95"}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
                <div className="text-slate-500 font-bold uppercase text-[10px]">SpO2</div>
                <div className="text-xl font-black text-emerald-600">{selectedEmergency.vitals?.spo2 || 94}%</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
                <div className="text-slate-500 font-bold uppercase text-[10px]">Resp Rate</div>
                <div className="text-xl font-black text-blue-600">{selectedEmergency.vitals?.respiratoryRate || 22}/min</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Vitals Entry Modal */}
      {showVitalsModal && (
        <Modal
          isOpen={showVitalsModal}
          onClose={() => setShowVitalsModal(false)}
          title="Update Onboard Patient Vitals Telemetry"
          subtitle="Data entered here broadcasts immediately to the Hospital Resuscitation Team"
        >
          <form onSubmit={handleSaveVitals} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Heart Rate (BPM)</label>
                <input
                  type="number"
                  value={hr}
                  onChange={(e) => setHr(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Blood Pressure (mmHg)</label>
                <input
                  type="text"
                  value={bp}
                  onChange={(e) => setBp(e.target.value)}
                  placeholder="120/80"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">SpO2 Oxygen (%)</label>
                <input
                  type="number"
                  value={spo2}
                  onChange={(e) => setSpo2(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Respiratory Rate</label>
                <input
                  type="number"
                  value={resp}
                  onChange={(e) => setResp(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-mono"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Consciousness Level (AVPU)</label>
              <select
                value={consciousness}
                onChange={(e) => setConsciousness(e.target.value as "Alert" | "Verbal" | "Pain" | "Unresponsive")}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm"
              >
                <option value="Alert">Alert (Fully conscious & oriented)</option>
                <option value="Verbal">Verbal (Responds to voice)</option>
                <option value="Pain">Pain (Responds only to noxious stimuli)</option>
                <option value="Unresponsive">Unresponsive (Comatose)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Clinical Intervention Notes</label>
              <textarea
                rows={3}
                value={paramedicNotes}
                onChange={(e) => setParamedicNotes(e.target.value)}
                placeholder="Drugs administered, ECG interpretation, defibrillation..."
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm resize-none"
              />
            </div>

            <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button type="button" variant="outline" onClick={() => setShowVitalsModal(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Broadcast Telemetry to ER
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

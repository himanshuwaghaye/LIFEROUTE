import React, { useState } from "react";
import { useEmergency } from "@/context/EmergencyContext";
import { Button, Card, Badge } from "@/components/shared";
import {
  Ambulance,
  Phone,
  Hospital,
  MapPin,
  Clock,
  HeartPulse,
  Activity,
  CheckCircle2,
  Navigation,
  ShieldCheck,
  AlertTriangle,
  X,
  Radio,
} from "lucide-react";
import { sound } from "@/lib/soundFx";

export const TrackingStatus: React.FC = () => {
  const { selectedEmergency, updateStatus, cancelEmergency, showToast } = useEmergency();
  const [showCancelModal, setShowCancelModal] = useState(false);

  if (!selectedEmergency) {
    return (
      <Card className="text-center py-12">
        <HeartPulse className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3 animate-pulse" />
        <h3 className="text-base font-bold text-slate-900 dark:text-white">No active emergency in tracking</h3>
        <p className="text-xs text-slate-500 mt-1">Submit a new request to start live coordination.</p>
      </Card>
    );
  }

  const amb = selectedEmergency.assignedAmbulance;
  const hosp = selectedEmergency.destinationHospital;
  const vitals = selectedEmergency.vitals;

  const handleCallParamedic = () => {
    sound.playChime();
    showToast(`Calling Paramedic ${amb?.paramedicName || "Lead"} at ${amb?.driverPhone || "+91 98301 22941"}`);
  };

  const handleCallHospital = () => {
    sound.playChime();
    showToast(`Connecting to ${hosp.name} Emergency Desk: ${hosp.emergencyDepartmentPhone}`);
  };

  return (
    <div className="space-y-5">
      {/* Top Banner with Pulse Alert */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-red-600 via-rose-600 to-red-700 text-white p-6 shadow-xl shadow-red-600/20">
        <div className="absolute right-0 top-0 -mt-8 -mr-8 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-wrap items-start justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
                <Radio className="w-3.5 h-3.5 animate-pulse text-white" />
                Live Response Stream
              </span>
              <span className="text-xs font-bold text-white/80">Ref: #{selectedEmergency.id}</span>
            </div>
            <h2 className="text-2xl font-black mt-2 tracking-tight">{selectedEmergency.emergencyType}</h2>
            <p className="text-xs text-white/90 mt-1 max-w-md">
              Priority: <b className="uppercase">{selectedEmergency.priority}</b> · Patient: <b>{selectedEmergency.patientName}</b> ({selectedEmergency.patientAge || 54}y)
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-white/20 text-right">
            <div className="text-[11px] font-bold tracking-wider uppercase text-white/80">Estimated Arrival</div>
            <div className="text-3xl font-black tracking-tight mt-0.5">
              {amb?.etaMinutes ? `${amb.etaMinutes}` : "05"} <span className="text-sm font-semibold">MIN</span>
            </div>
            <div className="text-xs text-white/80 mt-0.5">{amb?.distanceKm || 2.1} km remaining</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column: Live Map & Crew */}
        <div className="lg:col-span-2 space-y-5">
          {/* Live SVG Vector Map with vehicle animation */}
          <Card padding="none" className="overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Real-time GPS Tracking Matrix (Central Kolkata)
                </span>
              </div>
              <Badge variant="info">Telemetry Sync: Active</Badge>
            </div>

            <div className="relative h-72 sm:h-80 bg-slate-950 overflow-hidden">
              {/* Map SVG */}
              <svg className="w-full h-full object-cover" viewBox="0 0 620 370" preserveAspectRatio="xMidYMid slice">
                {/* River */}
                <path fill="#0f172a" d="M475 -15C453 43 484 82 462 128s-10 80-43 113 5 78-38 137h250V-15z" />
                
                {/* City Grid Blocks */}
                <g fill="#1e293b" opacity="0.6">
                  <path d="M25 37h93v56H25zM146 28h85v68h-85zM266 42h116v47H266zM36 116h127v61H36zM191 116h70v57h-70zM286 112h98v76h-98zM24 198h90v58H24zM141 198h127v63H141zM292 209h83v51h-83zM39 278h111v53H39zM178 280h79v53h-79zM281 281h104v47H281z" />
                </g>

                {/* Road Network */}
                <g stroke="#334155" strokeWidth="3" fill="none" opacity="0.8">
                  <path d="M-8 104C105 97 207 105 321 102s203-8 315-2M-10 188c128-8 234 4 348-1s176-3 300-1M-6 270c92 5 176-4 258 0s162-6 246-4M130-8c7 94 1 183 5 255s-3 99 2 140M271-10c-2 89 5 164 1 252s-3 87 2 138M380-10c4 93 0 165 3 255s-4 86-1 139" />
                </g>

                {/* Active Emergency Transit Route Line */}
                <path
                  d="M 120 280 Q 240 220 380 180 T 490 110"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="5"
                  strokeDasharray="8 6"
                  className="animate-pulse"
                />

                {/* Patient Incident Marker */}
                <g transform="translate(120, 280)">
                  <circle r="14" fill="#dc2626" opacity="0.3" className="animate-ping" />
                  <circle r="8" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
                  <text y="-14" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">
                    PATIENT (Park St)
                  </text>
                </g>

                {/* Ambulance Live Unit Marker */}
                <g transform="translate(290, 215)">
                  <circle r="18" fill="#3b82f6" opacity="0.25" className="animate-pulse" />
                  <rect x="-14" y="-14" width="28" height="28" rx="8" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
                  <text y="4" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                    AMB 08
                  </text>
                  <text y="-18" fill="#60a5fa" fontSize="9" fontWeight="bold" textAnchor="middle">
                    SPEED: 58 KM/H
                  </text>
                </g>

                {/* Destination Hospital Marker */}
                <g transform="translate(490, 110)">
                  <circle r="12" fill="#10b981" opacity="0.3" />
                  <rect x="-12" y="-12" width="24" height="24" rx="6" fill="#059669" stroke="#ffffff" strokeWidth="2" />
                  <text y="4" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                    +
                  </text>
                  <text y="-16" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
                    CITY GENERAL ER
                  </text>
                </g>
              </svg>

              {/* Float Overlay Stats */}
              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-700/60 text-xs text-white">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-red-500" />
                  <span>Route: <b>Park Circus → Park Street corridor</b> (Traffic: Normal)</span>
                </div>
                <div className="font-mono text-emerald-400">GPS: 22.551° N, 88.353° E</div>
              </div>
            </div>

            {/* Ambulance Unit Details */}
            <div className="p-5 bg-white dark:bg-slate-900">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400">
                    <Ambulance className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {amb?.callSign || "LifeRoute Unit 08 (ALS)"}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Driver: <b>{amb?.driverName || "Sanjay Mondal"}</b> · Paramedic: <b>{amb?.paramedicName || "Debashis Paul"}</b>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleCallParamedic}>
                    <Phone className="w-4 h-4 text-emerald-600" />
                    Call Ambulance Crew
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleCallHospital}>
                    <Hospital className="w-4 h-4 text-blue-600" />
                    Hospital ER Desk
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Real-time Patient Telemetry Card */}
          <Card className="border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-red-600 animate-pulse" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Live Patient Vitals Telemetry</h3>
              </div>
              <Badge variant="critical" dot>Streaming to Hospital Cath Lab</Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-800">
                <div className="text-[11px] font-bold text-slate-500 uppercase">Heart Rate</div>
                <div className="text-2xl font-black text-red-600 dark:text-red-400 mt-0.5">
                  {vitals?.heartRate || 112} <span className="text-xs font-semibold text-slate-500">BPM</span>
                </div>
                <div className="text-[10px] text-red-500 font-semibold mt-0.5">Tachycardic (Elevated)</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-800">
                <div className="text-[11px] font-bold text-slate-500 uppercase">Blood Pressure</div>
                <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                  {vitals?.bloodPressure || "155/95"}
                </div>
                <div className="text-[10px] text-amber-500 font-semibold mt-0.5">Hypertensive Stage 2</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-800">
                <div className="text-[11px] font-bold text-slate-500 uppercase">Oxygen Saturation (SpO2)</div>
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {vitals?.spo2 || 94}%
                </div>
                <div className="text-[10px] text-slate-500 font-medium mt-0.5">On 4L O2 via Nasal Cannula</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-800">
                <div className="text-[11px] font-bold text-slate-500 uppercase">Consciousness</div>
                <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-0.5">
                  {vitals?.consciousnessLevel || "Alert"}
                </div>
                <div className="text-[10px] text-slate-500 font-medium mt-0.5">Glasgow Scale: 15/15</div>
              </div>
            </div>

            {vitals?.notes && (
              <div className="mt-3.5 p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300">
                <b>Paramedic Clinical Note:</b> {vitals.notes}
              </div>
            )}
          </Card>
        </div>

        {/* Right Column: Timeline & Actions */}
        <div className="space-y-5">
          {/* Status Timeline */}
          <Card className="border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Emergency Protocol Timeline</h3>
            
            <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
              {selectedEmergency.timeline.map((step, idx) => (
                <div key={idx} className="relative group">
                  <div
                    className={`absolute -left-[29px] top-0.5 w-4 h-4 rounded-full border-2 transition-all ${
                      step.completed
                        ? "bg-red-600 border-red-600 text-white"
                        : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                    }`}
                  />
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className={`text-xs font-bold ${step.completed ? "text-slate-900 dark:text-white" : "text-slate-400"}`}>
                        {step.label}
                      </h4>
                      <span className="text-[11px] font-mono text-slate-400">{step.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-center"
                onClick={() => updateStatus(selectedEmergency.id, "at_scene", "Ambulance arrived at scene")}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Simulate Arrival at Scene
              </Button>
              <Button
                variant="danger"
                size="sm"
                className="w-full justify-center"
                onClick={() => setShowCancelModal(true)}
              >
                <X className="w-4 h-4" />
                Cancel Emergency Request
              </Button>
            </div>
          </Card>

          {/* Hospital Readiness Summary */}
          <Card className="border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600">
                <Hospital className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{hosp.name}</h4>
                <p className="text-[11px] text-slate-500">Destination Emergency Receiving Bay</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
                <span className="text-slate-600 dark:text-slate-400">ICU / Resus Beds</span>
                <span className="font-bold text-emerald-600">{hosp.availableBeds.icu} of {hosp.availableBeds.icuTotal} Ready</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
                <span className="text-slate-600 dark:text-slate-400">Cath Lab Status</span>
                <span className="font-bold text-emerald-600">Ready & Cleared</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
                <span className="text-slate-600 dark:text-slate-400">Trauma Surgeon</span>
                <span className="font-bold text-slate-900 dark:text-white">Dr. A. Mukherjee (On-duty)</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Cancel Request Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Cancel Emergency SOS?</h3>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              Are you sure you want to cancel emergency request #{selectedEmergency.id}? The dispatched ambulance and reserved hospital resuscitation bay will be released.
            </p>
            <div className="flex justify-end gap-2.5">
              <Button variant="outline" size="sm" onClick={() => setShowCancelModal(false)}>
                Keep Active
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  cancelEmergency(selectedEmergency.id);
                  setShowCancelModal(false);
                }}
              >
                Yes, Cancel Dispatch
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

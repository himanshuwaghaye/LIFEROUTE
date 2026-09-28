import React, { useState } from "react";
import { useEmergency } from "@/context/EmergencyContext";
import { Button, Card, Badge, Modal } from "@/components/shared";
import {
  Hospital,
  Activity,
  HeartPulse,
  Users,
  Bed,
  CheckCircle2,
  Clock,
  Phone,
  Siren,
  Sparkles,
  Droplet,
  ChevronRight,
  Filter,
} from "lucide-react";
import { sound } from "@/lib/soundFx";
import { EmergencyRecord } from "@/types";

export const HospitalDashboard: React.FC = () => {
  const { emergencies, selectedEmergency, setSelectedEmergency, hospitals, updateStatus, showToast } = useEmergency();
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [activeHospital, setActiveHospital] = useState(hospitals[0] || null);

  const filteredEmergencies = emergencies.filter((em) => {
    if (filterPriority === "all") return true;
    return em.priority.toLowerCase() === filterPriority.toLowerCase();
  });

  const handleAcknowledge = (record: EmergencyRecord) => {
    updateStatus(record.id, "at_scene", "Hospital Resuscitation Team Acknowledged & Bay Prepared");
    sound.playSuccess();
    showToast(`ER Bay Reserved at ${activeHospital?.name || "Hospital"} for #${record.id} (${record.patientName})`);
  };

  const handleAlertSpecialist = (name: string, role: string) => {
    sound.playEmergencyAlert();
    showToast(`🚨 Priority Pager Alert dispatched to ${name} (${role})!`);
  };

  return (
    <div className="space-y-5">
      {/* Top Hospital ED Header Banner */}
      <div className="rounded-3xl bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 border border-slate-800 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3.5 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
              <Hospital className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Emergency Department Operations Center
                </span>
                <Badge variant="success" dot>Level 1 Trauma Verified</Badge>
              </div>
              <h2 className="text-xl font-black mt-0.5">{activeHospital?.name || "City General Hospital"}</h2>
              <p className="text-xs text-slate-400">
                {activeHospital?.location.address} · Emergency Hotline: <b>{activeHospital?.emergencyDepartmentPhone}</b>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 text-right">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Available ICU Beds</div>
              <div className="text-xl font-black text-emerald-400">
                {activeHospital?.availableBeds.icu || 4} <span className="text-xs font-semibold text-slate-400">/ {activeHospital?.availableBeds.icuTotal || 8}</span>
              </div>
            </div>
            <div className="bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 text-right">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Trauma Bays</div>
              <div className="text-xl font-black text-blue-400">
                {activeHospital?.availableBeds.trauma || 2} <span className="text-xs font-semibold text-slate-400">/ {activeHospital?.availableBeds.traumaTotal || 4}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: Live Triage Queue & Selected Emergency Details */}
        <div className="lg:col-span-2 space-y-5">
          {/* Incoming Emergency Triage Queue */}
          <Card className="border border-slate-200 dark:border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Siren className="w-4 h-4 text-red-600 animate-pulse" />
                  Live Incoming Emergency Queue ({filteredEmergencies.length})
                </h3>
                <p className="text-xs text-slate-500">Sorted by clinical severity and ETA arrival time</p>
              </div>

              {/* Priority filter */}
              <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
                {["all", "critical", "high", "medium"].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setFilterPriority(lvl)}
                    className={`px-2.5 py-1 rounded-lg capitalize transition-colors ${
                      filterPriority === lvl
                        ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2.5">
              {filteredEmergencies.map((item) => {
                const isSelected = selectedEmergency?.id === item.id;
                const amb = item.assignedAmbulance;

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedEmergency(item)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? "border-red-500 bg-red-50/30 dark:bg-red-950/20 ring-2 ring-red-500/20"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                            item.priority === "Critical"
                              ? "bg-red-100 dark:bg-red-900/50 text-red-600"
                              : item.priority === "High"
                              ? "bg-orange-100 dark:bg-orange-900/50 text-orange-600"
                              : "bg-amber-100 dark:bg-amber-900/50 text-amber-600"
                          }`}
                        >
                          <HeartPulse className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-900 dark:text-white">{item.patientName}</span>
                            <span className="text-xs text-slate-400 font-mono">#{item.id}</span>
                            <Badge
                              variant={item.priority === "Critical" ? "critical" : item.priority === "High" ? "high" : "medium"}
                              dot
                            >
                              {item.priority}
                            </Badge>
                          </div>
                          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
                            {item.emergencyType} · <span className="text-slate-500">{item.location.address}</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {item.symptoms.slice(0, 3).map((sym, i) => (
                              <span
                                key={i}
                                className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
                              >
                                {sym}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 justify-end">
                          <Clock className="w-3.5 h-3.5" />
                          <span>ETA {amb?.etaMinutes || 5} MIN</span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 font-medium">
                          Unit: {amb?.callSign || "Dispatched"}
                        </div>
                        <div className="mt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAcknowledge(item);
                            }}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Prep Bay
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Detailed Selected Response Preview */}
          {selectedEmergency && (
            <Card className="border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Selected Patient Case File · #{selectedEmergency.id}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                    {selectedEmergency.patientName} ({selectedEmergency.patientAge || 54}y / {selectedEmergency.patientGender || "Female"})
                  </h3>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      sound.playChime();
                      showToast(`Calling Patient Contact: ${selectedEmergency.patientPhone}`);
                    }}
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    Call Patient
                  </Button>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleAcknowledge(selectedEmergency)}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Acknowledge & Reserve Bay
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="text-slate-400 font-medium">Heart Rate</span>
                  <div className="text-lg font-black text-red-600 mt-0.5">
                    {selectedEmergency.vitals?.heartRate || 112} BPM
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="text-slate-400 font-medium">Blood Pressure</span>
                  <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                    {selectedEmergency.vitals?.bloodPressure || "155/95"}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="text-slate-400 font-medium">SpO2</span>
                  <div className="text-lg font-black text-emerald-600 mt-0.5">
                    {selectedEmergency.vitals?.spo2 || 94}%
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="text-slate-400 font-medium">Consciousness</span>
                  <div className="text-lg font-black text-blue-600 mt-0.5">
                    {selectedEmergency.vitals?.consciousnessLevel || "Alert"}
                  </div>
                </div>
              </div>

              {selectedEmergency.vitals?.notes && (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                  <b>Paramedic Telemetry Note:</b> {selectedEmergency.vitals.notes}
                </div>
              )}
            </Card>
          )}
        </div>

        {/* Right Col: Specialist Team On-Duty & Blood Bank Status */}
        <div className="space-y-5">
          {/* Specialists On Duty */}
          <Card className="border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                Specialist On-Call Roster
              </h3>
              <Badge variant="info">4 On Duty</Badge>
            </div>

            <div className="space-y-2.5">
              {activeHospital?.specialistsOnDuty.map((spec, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-800 text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{spec.name}</div>
                    <div className="text-[11px] text-slate-500">{spec.role}</div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-[11px] px-2 py-1 h-auto"
                    onClick={() => handleAlertSpecialist(spec.name, spec.role)}
                  >
                    Alert Team
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Blood Bank Availability */}
          <Card className="border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Droplet className="w-4 h-4 text-red-600" />
                Emergency Blood Bank Units
              </h3>
              <Badge variant="success">Reserve Stable</Badge>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              {activeHospital?.bloodStock.map((b, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
                  <div className="font-black text-red-600 text-sm">{b.group}</div>
                  <div className="font-bold text-slate-900 dark:text-white mt-0.5">{b.units} Units</div>
                  <div className={`text-[10px] font-semibold mt-0.5 ${b.status === "Low" ? "text-red-500" : "text-emerald-600"}`}>
                    {b.status}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

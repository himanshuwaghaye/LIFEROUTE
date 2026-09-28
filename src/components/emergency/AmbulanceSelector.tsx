import React, { useState } from "react";
import { useEmergency } from "@/context/EmergencyContext";
import { Button, Card, Badge } from "@/components/shared";
import { AmbulanceUnit } from "@/types";
import { Ambulance, Clock, MapPin, Star, ShieldCheck, Phone, CheckCircle2 } from "lucide-react";

interface AmbulanceSelectorProps {
  emergencyId?: string;
  onSelect?: (ambulance: AmbulanceUnit) => void;
}

export const AmbulanceSelector: React.FC<AmbulanceSelectorProps> = ({ emergencyId, onSelect }) => {
  const { ambulances, assignAmbulance, selectedEmergency } = useEmergency();
  const [filterType, setFilterType] = useState<string>("all");

  const filteredAmbulances = ambulances.filter((amb) => {
    if (filterType === "all") return true;
    if (filterType === "als") return amb.type.includes("ALS");
    if (filterType === "cardiac") return amb.type.includes("Cardiac");
    if (filterType === "bls") return amb.type.includes("BLS");
    return true;
  });

  const activeEmergencyId = emergencyId || selectedEmergency?.id;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Nearby Ambulance Fleet (Central Kolkata)</h3>
          <p className="text-xs text-slate-500">Live GPS telemetry and onboard medical capabilities</p>
        </div>
        <div className="flex gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
          {[
            { id: "all", label: "All Fleet" },
            { id: "als", label: "ALS Units" },
            { id: "cardiac", label: "Cardiac ICU" },
            { id: "bls", label: "BLS" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filterType === tab.id
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredAmbulances.map((unit) => {
          const isAssigned = selectedEmergency?.assignedAmbulance?.id === unit.id;
          return (
            <Card
              key={unit.id}
              className={`relative transition-all border ${
                isAssigned
                  ? "border-red-500 ring-2 ring-red-500/20 bg-red-50/20 dark:bg-red-950/20"
                  : "hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400">
                    <Ambulance className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 dark:text-white">{unit.callSign}</h4>
                      <Badge variant={unit.status === "available" ? "success" : "warning"} dot>
                        {unit.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">{unit.type}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{unit.etaMinutes} MIN ETA</span>
                  </div>
                  <div className="text-xs text-slate-500">{unit.distanceKm} km away</div>
                </div>
              </div>

              {/* Paramedic & Station info */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-600 dark:text-slate-400 gap-2">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{unit.station}</span>
                </div>
                <div className="flex items-center gap-1 text-amber-500 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span>{unit.rating} (EMT: {unit.paramedicName})</span>
                </div>
              </div>

              {/* Equipment badges */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {unit.equipment.slice(0, 3).map((eq) => (
                  <span
                    key={eq}
                    className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
                  >
                    <ShieldCheck className="w-3 h-3 text-red-500" />
                    {eq}
                  </span>
                ))}
                {unit.equipment.length > 3 && (
                  <span className="text-[11px] px-1.5 py-0.5 text-slate-400">
                    +{unit.equipment.length - 3} more
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                <a
                  href={`tel:${unit.driverPhone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call Crew
                </a>

                {isAssigned ? (
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 px-3 py-1.5 bg-red-50 dark:bg-red-950/50 rounded-xl">
                    <CheckCircle2 className="w-4 h-4" />
                    Currently Assigned
                  </div>
                ) : (
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => {
                      if (activeEmergencyId) {
                        assignAmbulance(activeEmergencyId, unit.id);
                      }
                      onSelect?.(unit);
                    }}
                  >
                    Dispatch This Unit
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

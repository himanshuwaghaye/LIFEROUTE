import React from "react";
import { Card, Badge } from "@/components/shared";
import {
  Activity,
  Clock,
  TrendingDown,
  ShieldCheck,
  Ambulance,
  Hospital,
  HeartPulse,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RESPONSE_TIME_DATA = [
  { time: "08:00", minutes: 7.2, target: 8.0 },
  { time: "10:00", minutes: 6.8, target: 8.0 },
  { time: "12:00", minutes: 8.1, target: 8.0 },
  { time: "14:00", minutes: 6.4, target: 8.0 },
  { time: "16:00", minutes: 5.8, target: 8.0 },
  { time: "18:00", minutes: 6.1, target: 8.0 },
  { time: "20:00", minutes: 5.4, target: 8.0 },
];

const INCIDENT_DISTRIBUTION = [
  { name: "Cardiac", value: 38, color: "#dc2626" },
  { name: "Trauma / Road", value: 26, color: "#ea580c" },
  { name: "Respiratory", value: 18, color: "#2563eb" },
  { name: "Stroke / Neuro", value: 12, color: "#9333ea" },
  { name: "Obstetric / Other", value: 6, color: "#10b981" },
];

export const EmergencyAnalytics: React.FC = () => {
  return (
    <div className="space-y-5">
      {/* Top Stat Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Avg Response Time</span>
            <span className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">5.8 min</div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-1">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>1.4 min faster than national target</span>
          </div>
        </Card>

        <Card className="border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Resuscitation Success</span>
            <span className="p-2 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-600">
              <HeartPulse className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">98.4%</div>
          <div className="text-xs text-slate-500 mt-1">142 successful ER handoffs this month</div>
        </Card>

        <Card className="border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Fleet Operational Rate</span>
            <span className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600">
              <Ambulance className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">94.2%</div>
          <div className="text-xs text-slate-500 mt-1">18 units active across Kolkata zones</div>
        </Card>

        <Card className="border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Golden Hour Compliance</span>
            <span className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">99.1%</div>
          <div className="text-xs text-purple-600 font-semibold mt-1">Critical stroke/STEMI pathway</div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Response Time Trend Area Chart */}
        <Card className="border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Emergency Response Time Curve</h3>
              <p className="text-xs text-slate-500">Minutes elapsed from 112 SOS call to on-scene arrival</p>
            </div>
            <Badge variant="success">Target: &lt; 8.0 min</Badge>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={RESPONSE_TIME_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[4, 10]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    borderRadius: "12px",
                    color: "#ffffff",
                    fontSize: "12px",
                  }}
                />
                <Area type="monotone" dataKey="minutes" stroke="#dc2626" strokeWidth={3} fillOpacity={1} fill="url(#colorMinutes)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Incident Breakdown Pie Chart */}
        <Card className="border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Triage Incident Distribution</h3>
              <p className="text-xs text-slate-500">Breakdown of dispatched emergency categories</p>
            </div>
            <Badge variant="info">Real-time Telemetry</Badge>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={INCIDENT_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {INCIDENT_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    borderRadius: "12px",
                    color: "#ffffff",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            {INCIDENT_DISTRIBUTION.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 dark:text-slate-400 font-medium">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

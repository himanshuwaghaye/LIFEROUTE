import React, { useState } from "react";
import {
  ArrowLeft,
  Hospital,
  CreditCard,
  QrCode,
  CheckCircle2,
  FileText,
  Clock,
  ChevronRight,
  ShieldCheck,
  Download,
} from "lucide-react";
import { sound } from "@/lib/soundFx";

interface HospitalPaymentsScreenProps {
  onBack: () => void;
}

export const HospitalPaymentsScreen: React.FC<HospitalPaymentsScreenProps> = ({ onBack }) => {
  const [paid, setPaid] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  const handleScanPay = () => {
    setShowQRModal(true);
    sound.playChime();
  };

  const handleCompletePay = () => {
    setPaid(true);
    setShowQRModal(false);
    sound.playSuccess();
  };

  return (
    <div className="min-h-full flex flex-col justify-between bg-slate-50 text-slate-900 pb-6">
      <div className="space-y-3.5">
        {/* Top Header */}
        <div className="p-4 bg-white border-b border-slate-200/80 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="font-bold text-base text-slate-900">Hospital Payments</h2>
        </div>

        <div className="px-4 space-y-3.5">
          {/* Active Bill Card */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600">
                  <Hospital className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">City Care Hospital</h3>
                  <p className="text-xs text-slate-500 font-medium">Emergency Admission & Triage</p>
                </div>
              </div>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  paid
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-amber-50 text-amber-700 border border-amber-200"
                }`}
              >
                {paid ? "Paid ✓" : "Pending"}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-semibold">Total Amount Due:</span>
              <span className="text-xl font-black text-slate-900">₹ 12,480</span>
            </div>

            {!paid ? (
              <button
                onClick={handleScanPay}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-xs shadow-md shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <QrCode className="w-4 h-4" />
                <span>Scan & Pay (UPI / Cards)</span>
              </button>
            ) : (
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-center font-bold text-xs flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Payment Successful — Receipt #LR-PAY-9812</span>
              </div>
            )}
          </div>

          {/* Other Options List */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
              Other Options
            </span>

            <div className="space-y-2 text-xs font-semibold text-slate-800">
              <div
                onClick={handleScanPay}
                className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between cursor-pointer hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <span>Pay Bill via NetBanking</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between cursor-pointer hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <span>Payment History</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between cursor-pointer hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>Digital Receipts & Tax Invoices</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Secure Guarantee */}
          <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center gap-3 text-xs text-blue-900">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <h5 className="font-bold text-xs">Secure & Encrypted Payments</h5>
              <p className="text-[11px] text-blue-700">Your transaction is safe with us.</p>
            </div>
          </div>
        </div>
      </div>

      {/* QR Modal */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl text-center space-y-4">
            <h3 className="text-base font-bold text-slate-900">UPI QR Payment</h3>
            <p className="text-xs text-slate-500">Scan using any UPI app (GPay / PhonePe / Paytm)</p>
            <div className="w-48 h-48 mx-auto bg-slate-100 rounded-2xl border-2 border-slate-300 flex items-center justify-center p-3">
              <QrCode className="w-36 h-36 text-slate-800" />
            </div>
            <div className="text-sm font-black text-slate-900">Amount: ₹ 12,480</div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowQRModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleCompletePay}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 text-xs font-bold text-white shadow-md cursor-pointer"
              >
                Simulate Paid ✓
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

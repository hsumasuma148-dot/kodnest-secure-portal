import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import SecurityPinModal from "@/components/SecurityPinModal";
import { useTransactions } from "@/context/TransactionContext";
import { useNotifications } from "@/context/NotificationContext";
import { toast } from "sonner";
import { ScanLine, Store, IndianRupee, QrCode } from "lucide-react";

const merchants = [
  { name: "Coffee Shop", upi: "coffeeshop@upi", icon: "☕" },
  { name: "Super Market", upi: "supermart@upi", icon: "🛒" },
  { name: "Mobile Store", upi: "mobilestore@upi", icon: "📱" },
];

const ScanPayContent: React.FC = () => {
  const { addTransaction } = useTransactions();
  const { addNotification } = useNotifications();
  const [step, setStep] = useState<"scan" | "pay">("scan");
  const [scanning, setScanning] = useState(false);
  const [merchant, setMerchant] = useState(merchants[0]);
  const [amount, setAmount] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [amountError, setAmountError] = useState("");

  const simulateScan = (m: typeof merchants[0]) => {
    setScanning(true);
    setTimeout(() => {
      setMerchant(m);
      setScanning(false);
      setStep("pay");
    }, 1200);
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setAmountError("Enter a valid amount");
      return;
    }
    setAmountError("");
    setShowPin(true);
  };

  const confirmPayment = () => {
    const amt = Number(amount);
    addTransaction({
      name: `QR Payment - ${merchant.name}`,
      type: "debit",
      amount: amt,
      date: new Date().toISOString().split("T")[0],
      category: "UPI",
      status: "completed",
      recipient: merchant.name,
      accountNumber: merchant.upi,
      description: `QR payment to ${merchant.name}`,
    });
    addNotification({
      title: "Payment Successful",
      message: `₹${amt.toLocaleString("en-IN")} paid to ${merchant.name}`,
      type: "success",
      time: new Date().toLocaleString("en-IN"),
    });
    toast.success(`₹${amt.toLocaleString("en-IN")} paid to ${merchant.name}`);
    setAmount("");
    setStep("scan");
    setShowPin(false);
  };

  return (
    <div className="max-w-lg animate-fade-in">
      {step === "scan" ? (
        <div className="space-y-6">
          {/* Simulated Scanner */}
          <div className="fintech-card flex flex-col items-center py-10">
            <div className={`w-40 h-40 rounded-2xl border-2 border-dashed border-primary/40 flex items-center justify-center mb-4 ${scanning ? "animate-pulse" : ""}`}>
              {scanning ? (
                <ScanLine className="w-16 h-16 text-primary animate-bounce" />
              ) : (
                <QrCode className="w-16 h-16 text-muted-foreground" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">{scanning ? "Scanning..." : "Select a merchant QR to scan"}</p>
          </div>

          {/* Demo Merchants */}
          <div className="fintech-card">
            <h3 className="text-base font-semibold text-foreground mb-4">Demo Merchants</h3>
            <div className="space-y-2">
              {merchants.map((m) => (
                <button
                  key={m.upi}
                  onClick={() => simulateScan(m)}
                  disabled={scanning}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors text-left disabled:opacity-50"
                >
                  <span className="text-2xl">{m.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.upi}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="fintech-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Store className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{merchant.icon} {merchant.name}</h2>
              <p className="text-sm text-muted-foreground">{merchant.upi}</p>
            </div>
          </div>

          <form onSubmit={handlePay} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1.5">
                <IndianRupee className="w-4 h-4 text-muted-foreground" /> Amount (₹)
              </label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00"
                className="w-full h-11 rounded-lg border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              {amountError && <p className="text-xs text-destructive mt-1">{amountError}</p>}
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep("scan")}
                className="flex-1 h-12 rounded-xl border border-input bg-background text-foreground font-semibold text-sm hover:bg-accent transition-colors">
                Cancel
              </button>
              <button type="submit"
                className="flex-1 h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                <ScanLine className="w-4 h-4" /> Pay Now
              </button>
            </div>
          </form>
        </div>
      )}
      <SecurityPinModal open={showPin} onClose={() => setShowPin(false)} onConfirm={confirmPayment} />
    </div>
  );
};

const ScanPay = () => (
  <DashboardLayout title="Scan & Pay">
    <ScanPayContent />
  </DashboardLayout>
);

export default ScanPay;

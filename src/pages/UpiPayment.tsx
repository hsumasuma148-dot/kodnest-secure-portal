import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import SecurityPinModal from "@/components/SecurityPinModal";
import { useTransactions } from "@/context/TransactionContext";
import { useNotifications } from "@/context/NotificationContext";
import { toast } from "sonner";
import { Smartphone, AtSign, IndianRupee } from "lucide-react";

const UpiPaymentContent: React.FC = () => {
  const { addTransaction } = useTransactions();
  const { addNotification } = useNotifications();
  const [form, setForm] = useState({ upiId: "", amount: "", note: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPin, setShowPin] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.upiId.trim() || !form.upiId.includes("@")) e.upiId = "Enter a valid UPI ID (e.g. user@upi)";
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0) e.amount = "Enter a valid amount";
    return e;
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    setShowPin(true);
  };

  const confirmPayment = () => {
    const amt = Number(form.amount);
    addTransaction({
      name: `UPI Payment to ${form.upiId}`,
      type: "debit",
      amount: amt,
      date: new Date().toISOString().split("T")[0],
      category: "UPI",
      status: "completed",
      recipient: form.upiId,
      description: form.note,
    });
    addNotification({
      title: "Payment Successful",
      message: `₹${amt.toLocaleString("en-IN")} paid to ${form.upiId}`,
      type: "success",
      time: new Date().toLocaleString("en-IN"),
    });
    toast.success(`₹${amt.toLocaleString("en-IN")} paid to ${form.upiId}`);
    setForm({ upiId: "", amount: "", note: "" });
    setShowPin(false);
  };

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  return (
    <div className="max-w-lg animate-fade-in">
      <div className="fintech-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Smartphone className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Pay via UPI</h2>
            <p className="text-sm text-muted-foreground">Send money using UPI ID</p>
          </div>
        </div>

        <form onSubmit={handlePay} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1.5">
              <AtSign className="w-4 h-4 text-muted-foreground" /> UPI ID
            </label>
            <input value={form.upiId} onChange={set("upiId")} placeholder="user@upi"
              className="w-full h-11 rounded-lg border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            {errors.upiId && <p className="text-xs text-destructive mt-1">{errors.upiId}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1.5">
              <IndianRupee className="w-4 h-4 text-muted-foreground" /> Amount (₹)
            </label>
            <input type="number" value={form.amount} onChange={set("amount")} placeholder="0.00"
              className="w-full h-11 rounded-lg border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            {errors.amount && <p className="text-xs text-destructive mt-1">{errors.amount}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1.5">Note (optional)</label>
            <input value={form.note} onChange={set("note")} placeholder="Add a note..."
              className="w-full h-11 rounded-lg border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <button type="submit"
            className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
            <Smartphone className="w-4 h-4" /> Pay via UPI
          </button>
        </form>
      </div>
      <SecurityPinModal open={showPin} onClose={() => setShowPin(false)} onConfirm={confirmPayment} />
    </div>
  );
};

const UpiPayment = () => (
  <DashboardLayout title="UPI Payment">
    <UpiPaymentContent />
  </DashboardLayout>
);

export default UpiPayment;

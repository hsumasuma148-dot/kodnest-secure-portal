import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useTransactions } from "@/context/TransactionContext";
import { toast } from "sonner";
import { SendHorizontal, User, Hash, IndianRupee, FileText } from "lucide-react";

const SendMoneyContent: React.FC = () => {
  const { addTransaction } = useTransactions();
  const [form, setForm] = useState({ recipient: "", accountNumber: "", amount: "", description: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.recipient.trim()) e.recipient = "Recipient name is required";
    if (!form.accountNumber.trim()) e.accountNumber = "Account number is required";
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0) e.amount = "Enter a valid amount";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    addTransaction({
      name: `Transfer to ${form.recipient}`,
      type: "debit",
      amount: Number(form.amount),
      date: new Date().toISOString().split("T")[0],
      category: "Transfer",
      status: "completed",
      recipient: form.recipient,
      accountNumber: form.accountNumber,
      description: form.description,
    });

    toast.success(`₹${Number(form.amount).toLocaleString("en-IN")} sent to ${form.recipient}`);
    setForm({ recipient: "", accountNumber: "", amount: "", description: "" });
  };

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  return (
    <div className="max-w-lg animate-fade-in">
      <div className="fintech-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <SendHorizontal className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Send Money</h2>
            <p className="text-sm text-muted-foreground">Transfer funds to any account</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1.5">
              <User className="w-4 h-4 text-muted-foreground" /> Recipient Name
            </label>
            <input
              value={form.recipient}
              onChange={set("recipient")}
              placeholder="Enter recipient name"
              className="w-full h-11 rounded-lg border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.recipient && <p className="text-xs text-destructive mt-1">{errors.recipient}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1.5">
              <Hash className="w-4 h-4 text-muted-foreground" /> Account Number
            </label>
            <input
              value={form.accountNumber}
              onChange={set("accountNumber")}
              placeholder="Enter account number"
              className="w-full h-11 rounded-lg border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.accountNumber && <p className="text-xs text-destructive mt-1">{errors.accountNumber}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1.5">
              <IndianRupee className="w-4 h-4 text-muted-foreground" /> Amount (₹)
            </label>
            <input
              type="number"
              value={form.amount}
              onChange={set("amount")}
              placeholder="0.00"
              className="w-full h-11 rounded-lg border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.amount && <p className="text-xs text-destructive mt-1">{errors.amount}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1.5">
              <FileText className="w-4 h-4 text-muted-foreground" /> Description (optional)
            </label>
            <textarea
              value={form.description}
              onChange={set("description")}
              placeholder="Add a note..."
              rows={3}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <SendHorizontal className="w-4 h-4" />
            Send Money
          </button>
        </form>
      </div>
    </div>
  );
};

const SendMoney = () => (
  <DashboardLayout title="Send Money">
    <SendMoneyContent />
  </DashboardLayout>
);

export default SendMoney;

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useTransactions } from "@/context/TransactionContext";
import { Zap, Droplets, Smartphone, Globe, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface BillCategory {
  id: string;
  label: string;
  icon: React.ElementType;
  demoConsumer: string;
  provider: string;
  fieldLabel: string;
}

const billCategories: BillCategory[] = [
  { id: "electricity", label: "Electricity Bill", icon: Zap, demoConsumer: "1234567890", provider: "BESCOM", fieldLabel: "Consumer Number" },
  { id: "water", label: "Water Bill", icon: Droplets, demoConsumer: "9876543210", provider: "BWSSB", fieldLabel: "Consumer Number" },
  { id: "mobile", label: "Mobile Recharge", icon: Smartphone, demoConsumer: "9876543210", provider: "Airtel / Jio", fieldLabel: "Mobile Number" },
  { id: "internet", label: "Internet / WiFi", icon: Globe, demoConsumer: "4455667788", provider: "ACT Fiber / Jio Fiber", fieldLabel: "Account Number" },
  { id: "gas", label: "Gas Bill", icon: Flame, demoConsumer: "5566778899", provider: "Indane Gas", fieldLabel: "Consumer Number" },
];

const PayBillsContent: React.FC = () => {
  const { addTransaction } = useTransactions();
  const { toast } = useToast();
  const [selected, setSelected] = useState<BillCategory | null>(null);
  const [consumer, setConsumer] = useState("");
  const [amount, setAmount] = useState("");

  const selectBill = (bill: BillCategory) => {
    setSelected(bill);
    setConsumer(bill.demoConsumer);
    setAmount("");
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) {
      toast({ title: "Enter a valid amount", variant: "destructive" });
      return;
    }
    addTransaction({
      name: `${selected.label} - ${selected.provider}`,
      type: "debit",
      amount: amt,
      date: new Date().toISOString().slice(0, 10),
      category: "Bills",
      status: "completed",
      recipient: selected.provider,
      accountNumber: consumer,
      description: `${selected.fieldLabel}: ${consumer}`,
    });
    toast({ title: "Bill Paid Successfully", description: `₹${amt.toLocaleString("en-IN")} paid to ${selected.provider}.` });
    setSelected(null);
    setConsumer("");
    setAmount("");
  };

  return (
    <div className="animate-fade-in max-w-2xl space-y-6">
      {!selected ? (
        <div className="fintech-card">
          <h2 className="text-lg font-semibold text-foreground mb-4">Pay Bills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {billCategories.map((bill) => (
              <button key={bill.id} onClick={() => selectBill(bill)} className="fintech-card-hover flex flex-col items-center gap-3 p-5 cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <bill.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground text-center">{bill.label}</span>
                <span className="text-xs text-muted-foreground">{bill.provider}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="fintech-card">
          <button onClick={() => setSelected(null)} className="text-sm text-primary hover:underline mb-4 block">← Back to Bills</button>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <selected.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{selected.label}</h2>
              <p className="text-sm text-muted-foreground">Provider: {selected.provider}</p>
            </div>
          </div>
          <form onSubmit={handlePay} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">{selected.fieldLabel}</label>
              <Input value={consumer} onChange={(e) => setConsumer(e.target.value)} required />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Amount (₹)</label>
              <Input type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} min="1" required />
            </div>
            <Button type="submit" className="w-full">Pay Bill</Button>
          </form>
        </div>
      )}
    </div>
  );
};

const PayBills = () => (
  <DashboardLayout title="Pay Bills">
    <PayBillsContent />
  </DashboardLayout>
);

export default PayBills;

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useTransactions } from "@/context/TransactionContext";
import { Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const DepositContent: React.FC = () => {
  const { addTransaction } = useTransactions();
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) {
      toast({ title: "Invalid amount", variant: "destructive" });
      return;
    }
    addTransaction({
      name: description || "Wallet Deposit",
      type: "credit",
      amount: amt,
      date: new Date().toISOString().slice(0, 10),
      category: "Deposit",
      status: "completed",
      recipient: "Self",
    });
    toast({ title: "Deposit Successful", description: `₹${amt.toLocaleString("en-IN")} added to your wallet.` });
    setAmount("");
    setDescription("");
  };

  const quickAmounts = [1000, 2000, 5000, 10000, 25000, 50000];

  return (
    <div className="animate-fade-in max-w-lg space-y-6">
      <div className="fintech-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Landmark className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Deposit Money</h2>
            <p className="text-sm text-muted-foreground">Add funds to your wallet</p>
          </div>
        </div>

        <form onSubmit={handleDeposit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Amount (₹)</label>
            <Input type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} min="1" required />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {quickAmounts.map((q) => (
              <button key={q} type="button" onClick={() => setAmount(String(q))} className="py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-primary/10 hover:border-primary transition-colors">
                ₹{q.toLocaleString("en-IN")}
              </button>
            ))}
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Description (optional)</label>
            <Input placeholder="e.g. Salary, Savings" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <Button type="submit" className="w-full">Deposit Money</Button>
        </form>
      </div>
    </div>
  );
};

const Deposit = () => (
  <DashboardLayout title="Deposit Money">
    <DepositContent />
  </DashboardLayout>
);

export default Deposit;

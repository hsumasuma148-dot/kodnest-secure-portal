import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { useTransactions } from "@/context/TransactionContext";
import { Wallet, TrendingUp, TrendingDown, SendHorizontal, Receipt, Landmark, CreditCard, ArrowUpRight, ArrowDownLeft, Smartphone, ScanLine } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { transactions, totalBalance, totalIncome, totalExpenses } = useTransactions();
  const { profile } = useProfile();

  const quickActions = [
    { label: "Send Money", icon: SendHorizontal, path: "/send-money" },
    { label: "Pay Bills", icon: Receipt, path: "/pay-bills" },
    { label: "Deposit", icon: Landmark, path: "/deposit" },
    { label: "Scan QR", icon: ScanLine, path: "/scan-pay" },
    { label: "UPI Pay", icon: Smartphone, path: "/upi-payment" },
  ];

  const recentTransactions = transactions.slice(0, 5);

  // Monthly spending (sum of debits)
  const now = new Date();
  const monthlySpending = transactions
    .filter((t) => t.type === "debit" && new Date(t.date).getMonth() === now.getMonth())
    .reduce((s, t) => s + t.amount, 0);

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-display text-foreground">Welcome back, {profile.name.split(" ")[0]} 👋</h2>
          <p className="text-sm text-muted-foreground">Here's your financial overview</p>
        </div>
      </div>

      {/* Balance Hero Card */}
      <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
        <p className="text-sm opacity-80">Total Balance</p>
        <p className="text-4xl font-bold font-display mt-1">₹{totalBalance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p>
        <div className="flex flex-wrap gap-6 mt-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">Income: ₹{totalIncome.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4" />
            <span className="text-sm">Expenses: ₹{totalExpenses.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4" />
            <span className="text-sm">This Month: ₹{monthlySpending.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="fintech-card">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            <Wallet className="w-4 h-4" /> Total Balance
          </div>
          <p className="text-2xl font-bold font-display text-foreground">₹{totalBalance.toLocaleString("en-IN")}</p>
        </div>
        <div className="fintech-card">
          <div className="flex items-center gap-2 text-sm mb-2 text-success">
            <TrendingUp className="w-4 h-4" /> Income
          </div>
          <p className="text-2xl font-bold font-display text-foreground">₹{totalIncome.toLocaleString("en-IN")}</p>
        </div>
        <div className="fintech-card">
          <div className="flex items-center gap-2 text-sm mb-2 text-destructive">
            <TrendingDown className="w-4 h-4" /> Expenses
          </div>
          <p className="text-2xl font-bold font-display text-foreground">₹{totalExpenses.toLocaleString("en-IN")}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="fintech-card">
        <h3 className="text-base font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.path)}
              className="fintech-card-hover flex flex-col items-center gap-3 p-4 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <action.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-medium text-foreground">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="fintech-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-foreground">Recent Transactions</h3>
          <button onClick={() => navigate("/transactions")} className="text-sm text-primary hover:underline font-medium">
            View All
          </button>
        </div>
        <div className="space-y-1">
          {recentTransactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-accent transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  tx.type === "credit" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                }`}>
                  {tx.type === "credit" ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{tx.name}</p>
                  <p className="text-xs text-muted-foreground">{tx.category} • {tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-sm font-semibold ${tx.type === "credit" ? "text-success" : "text-destructive"}`}>
                  {tx.type === "credit" ? "+" : "-"}₹{tx.amount.toLocaleString("en-IN")}
                </span>
                <p className="text-xs text-muted-foreground capitalize">{tx.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DashboardPage = () => (
  <DashboardLayout title="Dashboard">
    <Dashboard />
  </DashboardLayout>
);

export default DashboardPage;

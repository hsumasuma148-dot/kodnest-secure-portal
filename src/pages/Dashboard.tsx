import React from "react";
import { useNavigate } from "react-router-dom";
import GlassBackground from "@/components/GlassBackground";
import BankLogo from "@/components/BankLogo";
import TransactionHistory from "@/components/TransactionHistory";
import AIChatWidget from "@/components/AIChatWidget";
import { LogOut, Wallet, TrendingUp, TrendingDown, CreditCard } from "lucide-react";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <GlassBackground>
      <div className="w-full max-w-4xl animate-fade-in px-4 py-8 space-y-6">
        {/* Header */}
        <div className="glass-card rounded-2xl p-6 flex items-center justify-between">
          <BankLogo />
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass-card rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Wallet className="w-4 h-4" />
              Total Balance
            </div>
            <p className="text-2xl font-bold font-display gradient-text">₹4,52,830.00</p>
          </div>
          <div className="glass-card rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-sm" style={{ color: "hsl(142, 71%, 45%)" }}>
              <TrendingUp className="w-4 h-4" />
              Income
            </div>
            <p className="text-2xl font-bold font-display text-foreground">₹1,25,000.00</p>
          </div>
          <div className="glass-card rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-sm text-destructive">
              <TrendingDown className="w-4 h-4" />
              Expenses
            </div>
            <p className="text-2xl font-bold font-display text-foreground">₹32,450.00</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-semibold font-display text-foreground">Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {["Send Money", "Pay Bills", "Deposit", "Cards"].map((action) => (
              <button
                key={action}
                className="glass-card rounded-xl p-4 text-center hover:border-primary/40 transition-all text-sm font-medium text-foreground flex flex-col items-center gap-2"
              >
                <CreditCard className="w-5 h-5 text-primary" />
                {action}
              </button>
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <TransactionHistory />
      </div>

      {/* AI Chat Widget */}
      <AIChatWidget />
    </GlassBackground>
  );
};

export default Dashboard;

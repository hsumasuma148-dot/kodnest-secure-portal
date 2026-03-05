import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { CreditCard, Lock, Eye, EyeOff, Snowflake } from "lucide-react";

const CardsContent: React.FC = () => {
  const [showNumber, setShowNumber] = React.useState(false);

  return (
    <div className="animate-fade-in max-w-3xl space-y-6">
      {/* Virtual Card */}
      <div className="rounded-2xl bg-gradient-to-br from-primary to-blue-800 p-6 text-primary-foreground aspect-[1.8/1] max-w-md flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs opacity-70">KodNest Banking</p>
            <p className="text-sm font-medium mt-1">Virtual Card</p>
          </div>
          <CreditCard className="w-8 h-8 opacity-70" />
        </div>
        <div>
          <p className="text-lg font-mono tracking-widest">
            {showNumber ? "4532 8721 0039 4521" : "•••• •••• •••• 4521"}
          </p>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] opacity-60">CARD HOLDER</p>
            <p className="text-sm font-medium">USER NAME</p>
          </div>
          <div>
            <p className="text-[10px] opacity-60">EXPIRES</p>
            <p className="text-sm font-medium">03/29</p>
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="fintech-card">
        <h3 className="text-base font-semibold text-foreground mb-4">Card Actions</h3>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => setShowNumber(!showNumber)}
            className="fintech-card-hover flex flex-col items-center gap-2 p-4"
          >
            {showNumber ? <EyeOff className="w-5 h-5 text-primary" /> : <Eye className="w-5 h-5 text-primary" />}
            <span className="text-xs font-medium text-foreground">{showNumber ? "Hide" : "Show"} Number</span>
          </button>
          <button className="fintech-card-hover flex flex-col items-center gap-2 p-4">
            <Snowflake className="w-5 h-5 text-primary" />
            <span className="text-xs font-medium text-foreground">Freeze Card</span>
          </button>
          <button className="fintech-card-hover flex flex-col items-center gap-2 p-4">
            <Lock className="w-5 h-5 text-primary" />
            <span className="text-xs font-medium text-foreground">Change PIN</span>
          </button>
        </div>
      </div>

      {/* Card Details */}
      <div className="fintech-card">
        <h3 className="text-base font-semibold text-foreground mb-4">Card Details</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Card Type</span><span className="font-medium text-foreground">Visa Platinum</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Daily Limit</span><span className="font-medium text-foreground">₹2,00,000</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Monthly Limit</span><span className="font-medium text-foreground">₹10,00,000</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className="font-medium text-success">Active</span></div>
        </div>
      </div>
    </div>
  );
};

const Cards = () => (
  <DashboardLayout title="Cards">
    <CardsContent />
  </DashboardLayout>
);

export default Cards;

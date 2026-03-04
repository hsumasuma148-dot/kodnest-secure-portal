import React from "react";
import { Shield } from "lucide-react";

const BankLogo: React.FC = () => (
  <div className="flex items-center gap-3">
    <div className="relative">
      <div className="w-12 h-12 rounded-xl btn-glow flex items-center justify-center">
        <Shield className="w-6 h-6 text-primary-foreground" />
      </div>
    </div>
    <div>
      <h1 className="text-xl font-bold font-display gradient-text leading-tight">
        KodNest
      </h1>
      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Banking App
      </p>
    </div>
  </div>
);

export default BankLogo;

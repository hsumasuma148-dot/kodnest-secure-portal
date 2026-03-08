import React, { useState } from "react";
import { ShieldCheck, X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const SecurityPinModal: React.FC<Props> = ({ open, onClose, onConfirm }) => {
  const STORED_PIN = localStorage.getItem("security-pin") || "1234";
  const [pin, setPin] = useState(["", "", "", ""]);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...pin];
    next[index] = value;
    setPin(next);
    setError("");
    if (value && index < 3) {
      const el = document.getElementById(`pin-${index + 1}`);
      el?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      const el = document.getElementById(`pin-${index - 1}`);
      el?.focus();
    }
  };

  const handleSubmit = () => {
    const entered = pin.join("");
    if (entered.length < 4) {
      setError("Enter all 4 digits");
      return;
    }
    if (entered !== STORED_PIN) {
      setError("Incorrect PIN");
      setPin(["", "", "", ""]);
      document.getElementById("pin-0")?.focus();
      return;
    }
    setPin(["", "", "", ""]);
    onConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm animate-fade-in">
      <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm shadow-xl animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Security PIN</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-accent transition-colors">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        <p className="text-sm text-muted-foreground mb-6">Enter your 4-digit PIN to confirm this transaction.</p>
        <div className="flex justify-center gap-3 mb-4">
          {pin.map((digit, i) => (
            <input
              key={i}
              id={`pin-${i}`}
              type="password"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-12 h-14 text-center text-xl font-bold rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
          ))}
        </div>
        {error && <p className="text-xs text-destructive text-center mb-3">{error}</p>}
        <p className="text-[10px] text-muted-foreground text-center mb-4">Demo PIN: 1234</p>
        <button
          onClick={handleSubmit}
          className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default SecurityPinModal;

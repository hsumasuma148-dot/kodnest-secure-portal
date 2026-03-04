import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const FloatingInput: React.FC<FloatingInputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  error,
}) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const isActive = focused || value.length > 0;

  return (
    <div className="relative w-full">
      <div
        className={cn(
          "relative rounded-xl border border-border/50 bg-secondary/30 transition-all duration-300 input-glow",
          focused && "border-primary/50",
          error && "border-destructive/50"
        )}
      >
        <input
          type={isPassword && showPassword ? "text" : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="peer w-full bg-transparent px-4 pt-5 pb-2 text-foreground text-sm outline-none rounded-xl"
        />
        <label
          className={cn(
            "absolute left-4 transition-all duration-200 pointer-events-none text-muted-foreground",
            isActive
              ? "top-1.5 text-xs text-primary"
              : "top-1/2 -translate-y-1/2 text-sm"
          )}
        >
          {label}
        </label>
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1 text-xs text-destructive animate-fade-in">{error}</p>
      )}
    </div>
  );
};

export default FloatingInput;

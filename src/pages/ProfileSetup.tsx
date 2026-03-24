import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "@/context/ProfileContext";
import BankLogo from "@/components/BankLogo";
import GlassBackground from "@/components/GlassBackground";
import FloatingInput from "@/components/FloatingInput";
import { toast } from "sonner";

const ProfileSetup: React.FC = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { updateProfile } = useProfile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Full name is required");
      return;
    }
    updateProfile({ name: name.trim() });
    toast.success("Profile set up successfully!");
    navigate("/dashboard");
  };

  return (
    <GlassBackground>
      <div className="w-full max-w-md animate-fade-in">
        <div className="glass-card rounded-2xl p-8 space-y-6">
          <div className="flex justify-center">
            <BankLogo />
          </div>
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold font-display text-foreground">Set Up Your Profile</h2>
            <p className="text-sm text-muted-foreground">Enter your name to get started</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FloatingInput label="Full Name" value={name} onChange={setName} error={error} />
            <button type="submit" className="w-full h-12 rounded-xl btn-glow text-primary-foreground font-semibold text-sm tracking-wide">
              Continue to Dashboard
            </button>
          </form>
        </div>
      </div>
    </GlassBackground>
  );
};

export default ProfileSetup;

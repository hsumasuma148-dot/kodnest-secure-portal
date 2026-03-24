import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FloatingInput from "@/components/FloatingInput";
import BankLogo from "@/components/BankLogo";
import GlassBackground from "@/components/GlassBackground";
import { useProfile } from "@/context/ProfileContext";
import { toast } from "sonner";

const Register: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const navigate = useNavigate();
  const { updateProfile } = useProfile();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "Minimum 8 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords don't match";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length === 0) {
      updateProfile({ name: form.name.trim(), email: form.email.trim() });
      toast.success("Account created successfully!");
      navigate("/profile-setup");
    }
  };

  const set = (key: string) => (val: string) => setForm((p) => ({ ...p, [key]: val }));

  return (
    <GlassBackground>
      <div className="w-full max-w-md animate-fade-in">
        <div className="glass-card rounded-2xl p-8 space-y-6">
          <div className="flex justify-center">
            <BankLogo />
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold font-display text-foreground">Create Account</h2>
            <p className="text-sm text-muted-foreground">Register for full access</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FloatingInput label="Full Name" value={form.name} onChange={set("name")} error={errors.name} />
            <FloatingInput label="Email Address" type="email" value={form.email} onChange={set("email")} error={errors.email} />
            <FloatingInput label="Password" type="password" value={form.password} onChange={set("password")} error={errors.password} />
            <FloatingInput label="Confirm Password" type="password" value={form.confirm} onChange={set("confirm")} error={errors.confirm} />

            <button type="submit" className="w-full h-12 rounded-xl btn-glow text-primary-foreground font-semibold text-sm tracking-wide">
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:text-accent transition-colors font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </GlassBackground>
  );
};

export default Register;

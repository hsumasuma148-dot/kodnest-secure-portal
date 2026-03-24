import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProfile } from "@/context/ProfileContext";
import FloatingInput from "@/components/FloatingInput";
import BankLogo from "@/components/BankLogo";
import GlassBackground from "@/components/GlassBackground";
import { toast } from "sonner";

const Login: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { profile } = useProfile();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.password) e.password = "Password is required";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length === 0) {
      toast.success("Login successful!");
      navigate(profile.name ? "/dashboard" : "/profile-setup");
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
            <h2 className="text-2xl font-bold font-display text-foreground">Welcome Back</h2>
            <p className="text-sm text-muted-foreground">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FloatingInput label="Email Address" type="email" value={form.email} onChange={set("email")} error={errors.email} />
            <FloatingInput label="Password" type="password" value={form.password} onChange={set("password")} error={errors.password} />

            <button type="submit" className="w-full h-12 rounded-xl btn-glow text-primary-foreground font-semibold text-sm tracking-wide">
              Login
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/" className="text-primary hover:text-accent transition-colors font-medium">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </GlassBackground>
  );
};

export default Login;

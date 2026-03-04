import React from "react";

const GlassBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen gradient-bg relative overflow-hidden flex items-center justify-center p-4">
    {/* Decorative orbs */}
    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px]" style={{ animation: "float 8s ease-in-out infinite" }} />
    <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-accent/20 blur-[120px]" style={{ animation: "float 6s ease-in-out infinite 2s" }} />
    <div className="absolute top-[40%] right-[20%] w-[200px] h-[200px] rounded-full bg-primary/10 blur-[80px]" style={{ animation: "pulse-glow 4s ease-in-out infinite" }} />
    {children}
  </div>
);

export default GlassBackground;

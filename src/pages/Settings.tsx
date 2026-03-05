import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { User, Bell, Shield, Palette, Globe } from "lucide-react";

const SettingsContent: React.FC = () => {
  const sections = [
    { icon: User, title: "Profile", description: "Manage your personal information" },
    { icon: Bell, title: "Notifications", description: "Configure alerts and notifications" },
    { icon: Shield, title: "Security", description: "Password, 2FA, and login settings" },
    { icon: Palette, title: "Appearance", description: "Theme and display preferences" },
    { icon: Globe, title: "Language & Region", description: "Set your language and currency" },
  ];

  return (
    <div className="animate-fade-in max-w-2xl space-y-3">
      {sections.map((section) => (
        <button key={section.title} className="fintech-card-hover w-full flex items-center gap-4 text-left">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <section.icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{section.title}</p>
            <p className="text-xs text-muted-foreground">{section.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

const SettingsPage = () => (
  <DashboardLayout title="Settings">
    <SettingsContent />
  </DashboardLayout>
);

export default SettingsPage;

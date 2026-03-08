import React, { useState, useRef } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useProfile } from "@/context/ProfileContext";
import { toast } from "sonner";
import { User, Mail, Hash, Camera, Save } from "lucide-react";

const ProfileContent: React.FC = () => {
  const { profile, updateProfile } = useProfile();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    updateProfile(draft);
    toast.success("Profile updated successfully");
    setEditing(false);
  };

  const handleEdit = () => {
    setDraft(profile);
    setEditing(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      updateProfile({ profileImage: base64 });
      setDraft((d) => ({ ...d, profileImage: base64 }));
      toast.success("Profile picture updated");
    };
    reader.readAsDataURL(file);
  };

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setDraft((p) => ({ ...p, [key]: e.target.value }));

  return (
    <div className="max-w-2xl animate-fade-in space-y-6">
      {/* Profile Header */}
      <div className="fintech-card flex flex-col sm:flex-row items-center gap-6">
        <div className="relative">
          {profile.profileImage ? (
            <img
              src={profile.profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-4xl font-bold font-display text-primary">
              {profile.name.charAt(0)}
            </div>
          )}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md"
          >
            <Camera className="w-4 h-4" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-bold font-display text-foreground">{profile.name}</h2>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
          <p className="text-xs text-muted-foreground mt-1">A/C: {profile.accountNumber}</p>
        </div>
      </div>

      {/* Profile Details */}
      <div className="fintech-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-foreground">Personal Details</h3>
          <button
            onClick={() => (editing ? handleSave() : handleEdit())}
            className="text-sm text-primary hover:underline font-medium flex items-center gap-1"
          >
            {editing ? <><Save className="w-3.5 h-3.5" /> Save</> : "Edit"}
          </button>
        </div>
        <div className="space-y-4">
          {[
            { label: "Full Name", icon: User, key: "name" },
            { label: "Email", icon: Mail, key: "email" },
            { label: "Phone", icon: Hash, key: "phone" },
            { label: "Account Number", icon: Hash, key: "accountNumber" },
          ].map((field) => (
            <div key={field.key}>
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-1.5">
                <field.icon className="w-4 h-4" /> {field.label}
              </label>
              {editing ? (
                <input
                  value={draft[field.key as keyof typeof draft] || ""}
                  onChange={set(field.key)}
                  className="w-full h-11 rounded-lg border border-input bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              ) : (
                <p className="text-sm text-foreground px-4 py-2.5 bg-accent/50 rounded-lg">
                  {profile[field.key as keyof typeof profile]}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Account Info */}
      <div className="fintech-card">
        <h3 className="text-base font-semibold text-foreground mb-4">Account Information</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Account Type</span><span className="font-medium text-foreground">Savings Account</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Branch</span><span className="font-medium text-foreground">KodNest Digital</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">IFSC Code</span><span className="font-medium text-foreground">KODN0001234</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className="font-medium text-success">Active</span></div>
        </div>
      </div>
    </div>
  );
};

const Profile = () => (
  <DashboardLayout title="Profile">
    <ProfileContent />
  </DashboardLayout>
);

export default Profile;

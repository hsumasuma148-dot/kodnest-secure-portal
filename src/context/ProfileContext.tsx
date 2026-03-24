import React, { createContext, useContext, useState, useEffect } from "react";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  accountNumber: string;
  profileImage: string | null;
}

const defaultProfile: ProfileData = {
  name: "",
  email: "",
  phone: "",
  accountNumber: "",
  profileImage: null,
};

interface ProfileContextType {
  profile: ProfileData;
  updateProfile: (data: Partial<ProfileData>) => void;
}

const ProfileContext = createContext<ProfileContextType>({
  profile: defaultProfile,
  updateProfile: () => {},
});

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData>(() => {
    const saved = localStorage.getItem("user-profile");
    return saved ? { ...defaultProfile, ...JSON.parse(saved) } : defaultProfile;
  });

  useEffect(() => {
    localStorage.setItem("user-profile", JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (data: Partial<ProfileData>) => {
    setProfile((prev) => ({ ...prev, ...data }));
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

import React, { createContext, useContext, useState, useCallback } from "react";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "success" | "warning" | "info" | "security";
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  { id: "n1", title: "Welcome!", message: "Your KodNest Banking account is ready.", type: "info", time: "2026-03-04 09:00", read: false },
  { id: "n2", title: "Salary Credited", message: "₹75,000 received from KodNest.", type: "success", time: "2026-03-04 10:30", read: false },
  { id: "n3", title: "Security Alert", message: "New login detected from Chrome browser.", type: "security", time: "2026-03-03 14:00", read: true },
];

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (n: Omit<Notification, "id" | "read">) => void;
  markAllRead: () => void;
  markRead: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const addNotification = useCallback((n: Omit<Notification, "id" | "read">) => {
    setNotifications((prev) => [{ ...n, id: Date.now().toString(), read: false }, ...prev]);
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const markRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, addNotification, markAllRead, markRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
};

import React, { useState } from "react";
import { Bell, CheckCheck, ShieldAlert, Info, CircleCheck } from "lucide-react";
import { useNotifications } from "@/context/NotificationContext";

const typeIcon = {
  success: CircleCheck,
  warning: ShieldAlert,
  info: Info,
  security: ShieldAlert,
};

const typeColor = {
  success: "text-success",
  warning: "text-yellow-500",
  info: "text-primary",
  security: "text-destructive",
};

const NotificationBell: React.FC = () => {
  const { notifications, unreadCount, markAllRead, markRead } = useNotifications();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg hover:bg-accent transition-colors"
      >
        <Bell className="w-5 h-5 text-muted-foreground" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center animate-fade-in">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-12 w-80 bg-card border border-border rounded-xl shadow-lg z-50 animate-fade-in overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="text-xs text-primary hover:underline flex items-center gap-1">
                  <CheckCheck className="w-3 h-3" /> Mark all read
                </button>
              )}
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="text-sm text-muted-foreground p-4 text-center">No notifications</p>
              ) : (
                notifications.slice(0, 10).map((n) => {
                  const Icon = typeIcon[n.type];
                  return (
                    <div
                      key={n.id}
                      onClick={() => markRead(n.id)}
                      className={`flex items-start gap-3 px-4 py-3 hover:bg-accent/50 transition-colors cursor-pointer ${!n.read ? "bg-primary/5" : ""}`}
                    >
                      <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${typeColor[n.type]}`} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${!n.read ? "font-semibold" : "font-medium"} text-foreground`}>{n.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{n.message}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{n.time}</p>
                      </div>
                      {!n.read && <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBell;

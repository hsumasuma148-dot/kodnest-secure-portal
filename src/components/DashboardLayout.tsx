import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import AIChatWidget from "@/components/AIChatWidget";
import { TransactionProvider } from "@/context/TransactionContext";

interface Props {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout: React.FC<Props> = ({ children, title }) => {
  return (
    <TransactionProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <AppSidebar />
          <div className="flex-1 flex flex-col min-h-screen">
            <header className="h-16 flex items-center gap-4 border-b border-border bg-card px-6">
              <SidebarTrigger className="text-muted-foreground" />
              <h1 className="text-lg font-semibold font-display text-foreground">{title}</h1>
            </header>
            <main className="flex-1 p-6 overflow-auto">
              {children}
            </main>
          </div>
        </div>
        <AIChatWidget />
      </SidebarProvider>
    </TransactionProvider>
  );
};

export default DashboardLayout;

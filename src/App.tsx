import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TransactionProvider } from "@/context/TransactionContext";
import { NotificationProvider } from "@/context/NotificationContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import Transactions from "./pages/Transactions";
import Cards from "./pages/Cards";
import Settings from "./pages/Settings";
import Deposit from "./pages/Deposit";
import PayBills from "./pages/PayBills";
import UpiPayment from "./pages/UpiPayment";
import ScanPay from "./pages/ScanPay";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TransactionProvider>
        <NotificationProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/send-money" element={<SendMoney />} />
              <Route path="/deposit" element={<Deposit />} />
              <Route path="/pay-bills" element={<PayBills />} />
              <Route path="/upi-payment" element={<UpiPayment />} />
              <Route path="/scan-pay" element={<ScanPay />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/cards" element={<Cards />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </TransactionProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

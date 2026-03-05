import React, { createContext, useContext, useState, useCallback } from "react";

export interface Transaction {
  id: string;
  name: string;
  type: "credit" | "debit";
  amount: number;
  date: string;
  category: string;
  status: "completed" | "pending" | "failed";
  recipient?: string;
  accountNumber?: string;
  description?: string;
}

const initialTransactions: Transaction[] = [
  { id: "1", name: "Salary - KodNest", type: "credit", amount: 75000, date: "2026-03-04", category: "Income", status: "completed", recipient: "Self" },
  { id: "2", name: "Amazon Shopping", type: "debit", amount: 4599, date: "2026-03-03", category: "Shopping", status: "completed", recipient: "Amazon" },
  { id: "3", name: "Electricity Bill", type: "debit", amount: 2150, date: "2026-03-02", category: "Bills", status: "completed", recipient: "BESCOM" },
  { id: "4", name: "Freelance Payment", type: "credit", amount: 15000, date: "2026-03-01", category: "Income", status: "completed", recipient: "Self" },
  { id: "5", name: "Swiggy Order", type: "debit", amount: 680, date: "2026-02-28", category: "Food", status: "completed", recipient: "Swiggy" },
  { id: "6", name: "Netflix Subscription", type: "debit", amount: 649, date: "2026-02-27", category: "Entertainment", status: "completed", recipient: "Netflix" },
  { id: "7", name: "UPI Transfer - Ravi", type: "debit", amount: 3000, date: "2026-02-26", category: "Transfer", status: "completed", recipient: "Ravi Kumar" },
  { id: "8", name: "Interest Credit", type: "credit", amount: 1250, date: "2026-02-25", category: "Income", status: "completed", recipient: "Self" },
];

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, "id">) => void;
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const addTransaction = useCallback((tx: Omit<Transaction, "id">) => {
    setTransactions((prev) => [
      { ...tx, id: Date.now().toString() },
      ...prev,
    ]);
  }, []);

  const totalIncome = transactions.filter((t) => t.type === "credit").reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter((t) => t.type === "debit").reduce((s, t) => s + t.amount, 0);
  const totalBalance = 452830 + (totalIncome - 91250) - (totalExpenses - 11078);

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, totalBalance, totalIncome, totalExpenses }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const ctx = useContext(TransactionContext);
  if (!ctx) throw new Error("useTransactions must be used within TransactionProvider");
  return ctx;
};

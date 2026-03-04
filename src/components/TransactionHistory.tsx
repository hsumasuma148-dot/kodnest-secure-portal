import React from "react";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface Transaction {
  id: string;
  name: string;
  type: "credit" | "debit";
  amount: number;
  date: string;
  category: string;
}

const mockTransactions: Transaction[] = [
  { id: "1", name: "Salary - KodNest", type: "credit", amount: 75000, date: "2026-03-04", category: "Income" },
  { id: "2", name: "Amazon Shopping", type: "debit", amount: 4599, date: "2026-03-03", category: "Shopping" },
  { id: "3", name: "Electricity Bill", type: "debit", amount: 2150, date: "2026-03-02", category: "Bills" },
  { id: "4", name: "Freelance Payment", type: "credit", amount: 15000, date: "2026-03-01", category: "Income" },
  { id: "5", name: "Swiggy Order", type: "debit", amount: 680, date: "2026-02-28", category: "Food" },
  { id: "6", name: "Netflix Subscription", type: "debit", amount: 649, date: "2026-02-27", category: "Entertainment" },
  { id: "7", name: "UPI Transfer - Ravi", type: "debit", amount: 3000, date: "2026-02-26", category: "Transfer" },
  { id: "8", name: "Interest Credit", type: "credit", amount: 1250, date: "2026-02-25", category: "Income" },
];

const TransactionHistory: React.FC = () => {
  return (
    <div className="glass-card rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold font-display text-foreground">Transaction History</h3>
        <span className="text-xs text-muted-foreground">Last 30 days</span>
      </div>

      <div className="space-y-2">
        {mockTransactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center ${
                  tx.type === "credit"
                    ? "bg-green-500/15 text-green-400"
                    : "bg-destructive/15 text-destructive"
                }`}
              >
                {tx.type === "credit" ? (
                  <ArrowDownLeft className="w-4 h-4" />
                ) : (
                  <ArrowUpRight className="w-4 h-4" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{tx.name}</p>
                <p className="text-xs text-muted-foreground">{tx.category} • {tx.date}</p>
              </div>
            </div>
            <span
              className={`text-sm font-semibold ${
                tx.type === "credit" ? "text-green-400" : "text-destructive"
              }`}
            >
              {tx.type === "credit" ? "+" : "-"}₹{tx.amount.toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;

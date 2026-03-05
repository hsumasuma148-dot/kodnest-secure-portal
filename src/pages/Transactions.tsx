import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useTransactions } from "@/context/TransactionContext";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

const TransactionsContent: React.FC = () => {
  const { transactions } = useTransactions();

  return (
    <div className="animate-fade-in max-w-5xl">
      <div className="fintech-card">
        <h2 className="text-lg font-semibold text-foreground mb-4">All Transactions</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="text-sm">{tx.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                        tx.type === "credit" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                      }`}>
                        {tx.type === "credit" ? <ArrowDownLeft className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-sm font-medium capitalize">{tx.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{tx.recipient || tx.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{tx.category}</TableCell>
                  <TableCell className={`text-sm font-semibold text-right ${
                    tx.type === "credit" ? "text-success" : "text-destructive"
                  }`}>
                    {tx.type === "credit" ? "+" : "-"}₹{tx.amount.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      tx.status === "completed" ? "bg-success/10 text-success" :
                      tx.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                      "bg-destructive/10 text-destructive"
                    }`}>
                      {tx.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => (
  <DashboardLayout title="Transactions">
    <TransactionsContent />
  </DashboardLayout>
);

export default Transactions;

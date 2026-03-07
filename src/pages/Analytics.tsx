import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useTransactions } from "@/context/TransactionContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

const COLORS = [
  "hsl(221, 83%, 53%)",
  "hsl(160, 84%, 39%)",
  "hsl(0, 84%, 60%)",
  "hsl(45, 93%, 47%)",
  "hsl(280, 70%, 50%)",
  "hsl(199, 89%, 48%)",
];

const AnalyticsContent: React.FC = () => {
  const { transactions, totalIncome, totalExpenses } = useTransactions();

  // Category breakdown for pie chart
  const categoryMap: Record<string, number> = {};
  transactions.filter((t) => t.type === "debit").forEach((t) => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });
  const pieData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));

  // Monthly spending bar chart (demo data + real)
  const monthlyData = [
    { month: "Oct", income: 68000, expenses: 32000 },
    { month: "Nov", income: 72000, expenses: 28000 },
    { month: "Dec", income: 75000, expenses: 45000 },
    { month: "Jan", income: 70000, expenses: 35000 },
    { month: "Feb", income: 78000, expenses: 38000 },
    { month: "Mar", income: totalIncome, expenses: totalExpenses },
  ];

  return (
    <div className="animate-fade-in max-w-5xl space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="fintech-card">
          <div className="flex items-center gap-2 text-sm text-success mb-2"><TrendingUp className="w-4 h-4" /> Total Income</div>
          <p className="text-2xl font-bold font-display text-foreground">₹{totalIncome.toLocaleString("en-IN")}</p>
        </div>
        <div className="fintech-card">
          <div className="flex items-center gap-2 text-sm text-destructive mb-2"><TrendingDown className="w-4 h-4" /> Total Expenses</div>
          <p className="text-2xl font-bold font-display text-foreground">₹{totalExpenses.toLocaleString("en-IN")}</p>
        </div>
        <div className="fintech-card">
          <div className="flex items-center gap-2 text-sm text-primary mb-2"><BarChart3 className="w-4 h-4" /> Transactions</div>
          <p className="text-2xl font-bold font-display text-foreground">{transactions.length}</p>
        </div>
      </div>

      {/* Monthly Chart */}
      <div className="fintech-card">
        <h3 className="text-base font-semibold text-foreground mb-4">Monthly Income vs Expenses</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", color: "hsl(var(--foreground))" }}
                formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`, ""]}
              />
              <Bar dataKey="income" fill="hsl(160, 84%, 39%)" radius={[4, 4, 0, 0]} name="Income" />
              <Bar dataKey="expenses" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="fintech-card">
        <h3 className="text-base font-semibold text-foreground mb-4">Spending by Category</h3>
        {pieData.length > 0 ? (
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`, ""]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-8">No spending data yet</p>
        )}
      </div>
    </div>
  );
};

const Analytics = () => (
  <DashboardLayout title="Spending Analytics">
    <AnalyticsContent />
  </DashboardLayout>
);

export default Analytics;

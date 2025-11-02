import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Transaction, Budget } from "../App";
import { TrendingUp, TrendingDown, DollarSign, PieChart } from "lucide-react";
import { SpendingChart } from "./SpendingChart";
import { BudgetProgress } from "./BudgetProgress";

interface DashboardProps {
  transactions: Transaction[];
  budgets: Budget[];
}

export function Dashboard({ transactions, budgets }: DashboardProps) {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const expensesByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className={balance >= 0 ? "text-green-600" : "text-red-600"}>
              ${balance.toFixed(2)}
            </div>
            <p className="text-slate-600 mt-1">
              {balance >= 0 ? "Positive balance" : "Negative balance"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-green-600">${totalIncome.toFixed(2)}</div>
            <p className="text-slate-600 mt-1">
              {transactions.filter((t) => t.type === "income").length} transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-red-600">${totalExpenses.toFixed(2)}</div>
            <p className="text-slate-600 mt-1">
              {transactions.filter((t) => t.type === "expense").length} transactions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Budget Progress */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Spending by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SpendingChart data={expensesByCategory} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Budget Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <BudgetProgress budgets={budgets} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

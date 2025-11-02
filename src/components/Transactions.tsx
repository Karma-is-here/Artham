import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Transaction } from "../App";
import { Plus, Trash2, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { AddTransactionDialog } from "./AddTransactionDialog";
import { Badge } from "./ui/badge";

interface TransactionsProps {
  transactions: Transaction[];
  onAddTransaction: (transaction: Omit<Transaction, "id">) => void;
  onDeleteTransaction: (id: string) => void;
}

export function Transactions({
  transactions,
  onAddTransaction,
  onDeleteTransaction,
}: TransactionsProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2>Transactions</h2>
          <p className="text-slate-600">View and manage all your transactions</p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Transaction
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sortedTransactions.length === 0 ? (
              <p className="text-slate-600 text-center py-8">
                No transactions yet. Add your first transaction to get started.
              </p>
            ) : (
              sortedTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className={`p-2 rounded-full ${
                        transaction.type === "income"
                          ? "bg-green-100"
                          : "bg-red-100"
                      }`}
                    >
                      {transaction.type === "income" ? (
                        <ArrowUpCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <ArrowDownCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p>{transaction.description}</p>
                        <Badge variant="secondary">{transaction.category}</Badge>
                      </div>
                      <p className="text-slate-600">
                        {new Date(transaction.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div
                      className={
                        transaction.type === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {transaction.type === "income" ? "+" : "-"}$
                      {transaction.amount.toFixed(2)}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteTransaction(transaction.id)}
                    className="ml-2"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <AddTransactionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onAddTransaction={onAddTransaction}
      />
    </div>
  );
}

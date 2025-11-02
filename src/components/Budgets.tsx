import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Budget } from "../App";
import { Plus, Trash2, Edit } from "lucide-react";
import { AddBudgetDialog } from "./AddBudgetDialog";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

interface BudgetsProps {
  budgets: Budget[];
  onAddBudget: (budget: Omit<Budget, "id" | "spent">) => void;
  onUpdateBudget: (id: string, limit: number) => void;
  onDeleteBudget: (id: string) => void;
}

export function Budgets({
  budgets,
  onAddBudget,
  onUpdateBudget,
  onDeleteBudget,
}: BudgetsProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

  const handleEdit = (budget: Budget) => {
    setEditingBudget(budget);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2>Budgets</h2>
          <p className="text-slate-600">Set and track your spending limits</p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Budget
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {budgets.length === 0 ? (
          <Card className="md:col-span-2">
            <CardContent className="py-8">
              <p className="text-slate-600 text-center">
                No budgets set. Create your first budget to start tracking spending limits.
              </p>
            </CardContent>
          </Card>
        ) : (
          budgets.map((budget) => {
            const percentage = (budget.spent / budget.limit) * 100;
            const isOverBudget = percentage > 100;
            const isNearLimit = percentage > 80 && percentage <= 100;

            return (
              <Card key={budget.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{budget.category}</span>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(budget)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteBudget(budget.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Spent</span>
                    <span>
                      ${budget.spent.toFixed(2)} / ${budget.limit.toFixed(2)}
                    </span>
                  </div>
                  <Progress
                    value={Math.min(percentage, 100)}
                    className={
                      isOverBudget
                        ? "[&>div]:bg-red-600"
                        : isNearLimit
                        ? "[&>div]:bg-yellow-600"
                        : "[&>div]:bg-green-600"
                    }
                  />
                  <div className="flex justify-between items-center">
                    <Badge
                      variant={isOverBudget ? "destructive" : "secondary"}
                    >
                      {percentage.toFixed(0)}% used
                    </Badge>
                    {isOverBudget && (
                      <span className="text-red-600">
                        ${(budget.spent - budget.limit).toFixed(2)} over budget
                      </span>
                    )}
                    {!isOverBudget && (
                      <span className="text-slate-600">
                        ${(budget.limit - budget.spent).toFixed(2)} remaining
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      <AddBudgetDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditingBudget(null);
        }}
        onAddBudget={onAddBudget}
        onUpdateBudget={onUpdateBudget}
        editingBudget={editingBudget}
      />
    </div>
  );
}

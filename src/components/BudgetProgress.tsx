import { Budget } from "../App";
import { Progress } from "./ui/progress";

interface BudgetProgressProps {
  budgets: Budget[];
}

export function BudgetProgress({ budgets }: BudgetProgressProps) {
  if (budgets.length === 0) {
    return (
      <div className="text-slate-600 text-center py-4">
        No budgets set yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {budgets.map((budget) => {
        const percentage = (budget.spent / budget.limit) * 100;
        const isOverBudget = percentage > 100;
        const isNearLimit = percentage > 80 && percentage <= 100;

        return (
          <div key={budget.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <span>{budget.category}</span>
              <span className="text-slate-600">
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
          </div>
        );
      })}
    </div>
  );
}

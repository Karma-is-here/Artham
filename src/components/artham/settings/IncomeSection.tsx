import { Income } from "../../../types/artham";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";
import { HelpCircle, Plus, X } from "lucide-react";

interface IncomeSectionProps {
  income: Income;
  onUpdateIncome: (income: Income) => void;
}

export function IncomeSection({ income, onUpdateIncome }: IncomeSectionProps) {
  const addSideIncome = () => {
    onUpdateIncome({
      ...income,
      sideIncomes: [...income.sideIncomes, { label: "", amount: 0 }],
    });
  };

  const updateSideIncome = (index: number, field: "label" | "amount", value: string | number) => {
    const updatedSideIncomes = [...income.sideIncomes];
    updatedSideIncomes[index] = {
      ...updatedSideIncomes[index],
      [field]: value,
    };
    onUpdateIncome({ ...income, sideIncomes: updatedSideIncomes });
  };

  const removeSideIncome = (index: number) => {
    const updatedSideIncomes = income.sideIncomes.filter((_, i) => i !== index);
    onUpdateIncome({ ...income, sideIncomes: updatedSideIncomes });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Let's understand your income 💸
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-slate-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  This helps Artham understand your cash inflow before splitting it into vaults.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Primary Income */}
        <div className="space-y-2">
          <Label htmlFor="primary-income">Primary Income (₹ / month)</Label>
          <Input
            id="primary-income"
            type="number"
            placeholder="50000"
            value={income.primaryIncome || ""}
            onChange={(e) =>
              onUpdateIncome({ ...income, primaryIncome: parseFloat(e.target.value) || 0 })
            }
          />
        </div>

        {/* Side Incomes */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Side Income(s)</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={addSideIncome}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Side Income
            </Button>
          </div>

          {income.sideIncomes.map((side, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder="e.g., Freelance, Rent"
                value={side.label}
                onChange={(e) => updateSideIncome(index, "label", e.target.value)}
                className="flex-1"
              />
              <Input
                type="number"
                placeholder="5000"
                value={side.amount || ""}
                onChange={(e) => updateSideIncome(index, "amount", parseFloat(e.target.value) || 0)}
                className="w-32"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeSideIncome(index)}
              >
                <X className="h-4 w-4 text-red-600" />
              </Button>
            </div>
          ))}
        </div>

        {/* Variable Income */}
        <div className="flex items-center space-x-2 p-4 bg-slate-50 rounded-lg">
          <Checkbox
            id="variable-income"
            checked={income.isVariable}
            onCheckedChange={(checked) =>
              onUpdateIncome({ ...income, isVariable: !!checked })
            }
          />
          <Label htmlFor="variable-income" className="cursor-pointer">
            My income varies each month
          </Label>
        </div>

        {income.isVariable && (
          <div className="space-y-2">
            <Label htmlFor="average-income">Average Monthly Income (₹)</Label>
            <Input
              id="average-income"
              type="number"
              placeholder="45000"
              value={income.averageMonthly || ""}
              onChange={(e) =>
                onUpdateIncome({ ...income, averageMonthly: parseFloat(e.target.value) || 0 })
              }
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

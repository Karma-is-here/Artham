import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Budget } from "../App";

interface AddBudgetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddBudget: (budget: Omit<Budget, "id" | "spent">) => void;
  onUpdateBudget: (id: string, limit: number) => void;
  editingBudget: Budget | null;
}

const CATEGORIES = [
  "Groceries",
  "Rent",
  "Transportation",
  "Entertainment",
  "Healthcare",
  "Utilities",
  "Shopping",
  "Dining",
  "Other",
];

export function AddBudgetDialog({
  open,
  onOpenChange,
  onAddBudget,
  onUpdateBudget,
  editingBudget,
}: AddBudgetDialogProps) {
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");

  useEffect(() => {
    if (editingBudget) {
      setCategory(editingBudget.category);
      setLimit(editingBudget.limit.toString());
    } else {
      setCategory("");
      setLimit("");
    }
  }, [editingBudget, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !limit) return;

    if (editingBudget) {
      onUpdateBudget(editingBudget.id, parseFloat(limit));
    } else {
      onAddBudget({
        category,
        limit: parseFloat(limit),
      });
    }

    // Reset form
    setCategory("");
    setLimit("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingBudget ? "Edit Budget" : "Add Budget"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={category}
              onValueChange={setCategory}
              disabled={!!editingBudget}
              required
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="limit">Monthly Limit</Label>
            <Input
              id="limit"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              required
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingBudget ? "Update" : "Add"} Budget
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

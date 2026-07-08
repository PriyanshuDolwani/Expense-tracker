import { useState, useEffect } from "react";
import { getBudget, setBudget } from "../services/budgetService";
import { getTransactions } from "../services/transactionService";

function Budgets() {
  const [budget, setCurrentBudget] = useState(0);
  const [budgetInput, setBudgetInput] = useState("");
  const [expenses, setExpenses] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
    try {
      const currentDate = new Date();

      const budgetData = await getBudget(
        currentDate.getMonth() + 1,
        currentDate.getFullYear()
      );

      if (budgetData) {
        setCurrentBudget(budgetData.amount);
      }

      const transactions = await getTransactions();

      const totalExpense = transactions
        .filter((txn) => txn.type === "Expense")
        .reduce((acc, txn) => acc + txn.amount, 0);

      setExpenses(totalExpense);
    } catch (error) {
      console.error(error);
    }
  };
    fetchData();
  }, []);

  const handleSaveBudget = async () => {
    if (!budgetInput) {
      alert("Please enter budget amount");
      return;
    }

    try {
      const currentDate = new Date();

      const savedBudget = await setBudget({
        amount: Number(budgetInput),
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear(),
      });

      setCurrentBudget(savedBudget.amount);
      setBudgetInput("");

      alert("Budget updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to save budget");
    }
  };

  const remainingBudget = budget - expenses;

  const budgetPercentage =
    budget > 0
      ? Math.min((expenses / budget) * 100, 100)
      : 0;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Budget Management
      </h1>

      <div className="bg-white shadow rounded p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Set Monthly Budget
        </h2>

        <input
          type="number"
          placeholder="Enter budget"
          value={budgetInput}
          onChange={(e) => setBudgetInput(e.target.value)}
          className="border border-gray-300 p-2.5 rounded-lg w-full mb-4 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
        />

        <button
          onClick={handleSaveBudget}
          className="btn"
        >
          Save Budget
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow rounded p-6">
          <h3 className="text-gray-500">Budget</h3>
          <p className="text-3xl font-bold">₹{budget}</p>
        </div>

        <div className="bg-white shadow rounded p-6">
          <h3 className="text-gray-500">Spent</h3>
          <p className="text-3xl font-bold text-red-500">
            ₹{expenses}
          </p>
        </div>

        <div className="bg-white shadow rounded p-6">
          <h3 className="text-gray-500">Remaining</h3>

          <p
            className={`text-3xl font-bold ${
              remainingBudget >= 0
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            ₹{remainingBudget}
          </p>
        </div>
      </div>

      <div className="bg-white shadow rounded p-6">
        <h2 className="font-semibold mb-3">
          Budget Usage ({budgetPercentage.toFixed(1)}%)
        </h2>

        <div className="w-full bg-gray-300 rounded-full h-6">
          <div
            className={`h-6 rounded-full ${
              budgetPercentage < 80
                ? "bg-green-500"
                : budgetPercentage < 100
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
            style={{
              width: `${budgetPercentage}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Budgets;
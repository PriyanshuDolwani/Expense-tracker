import SummaryCard from "../components/SummaryCard"
import TransactionItem from "../components/TransactionItem";
import {useState,useEffect} from "react";
import { getTransactions, createTransaction, deleteTransaction } from "../services/transactionService";
import { getBudget, setBudget as saveBudget } from "../services/budgetService"; 

function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions,setTransactions] = useState([]);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("Expense");
  const [budget,setBudget] = useState(0);
  const [budgetInput, setBudgetInput] = useState("");
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const safeTxns = Array.isArray(transactions) ? transactions : [];
  const totalIncome = safeTxns
    .filter((txn) => txn.type === "Income")
    .reduce((acc, txn) => acc + Number(txn.amount || 0), 0);
  const totalExpense = safeTxns
    .filter((txn) => txn.type === "Expense")
    .reduce((acc, txn) => acc + Number(txn.amount || 0), 0);
  const balance=totalIncome-totalExpense;
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(()=>{
    const fetchTransaction=async()=>{
      try {
        const data=await getTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions",error);
      }
    }
    fetchTransaction();
  },[])

  useEffect(()=>{
    if (balance<0){

      alert(
        `${user?.name}, you've exceeded your monthly budget. Consider reviewing your expenses.`
      );
    }
  },[balance,user?.name]);

  useEffect(()=>{
    const fetchBudget=async()=>{
      try {
        const currentDate=new Date();

        const month = currentDate.getMonth()+1;

        const year = currentDate.getFullYear();

        const data = await getBudget(
          month,
          year
        );
        console.log("Fetched budget:", data);

        if(data){
          setBudget(data.amount);
        }
      } catch (error) {
        console.error("Error Fetching budget:",error);
      }
    }
    fetchBudget();
  },[])

  async function handleSave(){
    if(!title || !amount || !category || !type){
      alert("Please fill in all fields");
      return;
    };
    const newTransaction = {
      title,
      amount: parseFloat(amount),
      category,
      type
    }
    try {
      const saveTransaction= await createTransaction(newTransaction);
      setTransactions((prev)=>[...prev, saveTransaction]);
      setTitle("");
      setAmount("");
      setCategory("");
      setType("Expense");
      setShowForm(false);
    } catch (error) {
      console.error("Error creating transaction:",error);
      alert("Failed to save transaction");
    }
  }
  const handleDelete=async(id)=>{
    try {
      await deleteTransaction(id);
      setTransactions(prev=>prev.filter(txn=>txn._id !== id));
    } catch (error) {
      console.error("Error deleting transaction:",error);
    }
  }

  const handleBudgetSave=async()=>{
    if(!budgetInput){
      alert("Please enter a budget amount");
      return;
    }
    try {
      const currentDate=new Date();

      const budgetData={
        amount:Number(budgetInput),
        month:currentDate.getMonth()+1,
        year:currentDate.getFullYear(),
      };

      const savedBudget = await saveBudget(budgetData);

      setBudget(savedBudget.amount);

      setBudgetInput("");
      setShowBudgetForm(false);
    } catch (error) {
      console.error("Error saving budget:",error);
      alert("Failed to save budget");
    }
  }

  const remainingBudget=budget-totalExpense;

  const budgetPercentage=budget>0 ? Math.min((totalExpense/budget)*100,100):0;
  return (
    <div className="">
        <button 
        onClick={() => setShowForm(true)} 
        className="btn mb-4">
          + Add Transaction
        </button>
        {showForm && (
          <div className="mb-6 p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Add New Transaction</h3>
            
            <input type="text" 
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-lg p-2.5 w-full mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"/>
            
            <input type="number" 
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border border-gray-300 rounded-lg p-2.5 w-full mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"/>

            <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-lg p-2.5 w-full mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white">
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Education">Education</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Income">Income</option>
            </select>

            <div className="mb-3">
              <p className="mb-2 font-medium">Type</p>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="Expense"
                    checked={type === "Expense"}
                    onChange={(e) => setType(e.target.value)}
                    className="form-radio"
                  />
                  <span className="ml-2">Expense</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="Income"
                    checked={type === "Income"}
                    onChange={(e) => setType(e.target.value)}
                    className="form-radio"
                  />
                  <span className="ml-2">Income</span>
                </label>
              </div>
            </div>

            <div className="flex gap-4 mt-2">
              <button onClick={handleSave} className="btn">
                Save Transaction
              </button>
              <button
                onClick={()=>setShowBudgetForm(true)}
                className="btn-ghost"
                >
                Set Budget
              </button>
            </div>
          </div>
        )}

        {showBudgetForm && (
          <div className="mb-6 p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Set Monthly Budget
            </h3>

            <input 
            type="number" 
            placeholder="Enter budget amount"
            value={budgetInput}
            onChange={(e)=>setBudgetInput(e.target.value)

            }
            className="border border-gray-300 rounded-lg p-2.5 w-full mb-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
            />

            <button
              onClick={handleBudgetSave}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Save Budget
            </button>
          </div>
        )}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Summary</h2>
          <div className="flex gap-6 mt-4">
            
            <SummaryCard
              title="Total Income"
              amount={totalIncome}
              variant="income"
            />
            <SummaryCard
              title="Total Expense"
              amount={totalExpense}
              variant="expense"
            />
            <SummaryCard
              title="Balance"
              amount={balance}
              variant="balance"
            />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">
            Monthly Budget
          </h2>

          <div className="flex gap-6">
            <SummaryCard
              title="Budget"
              amount={budget}
              variant="balance"
            />

            <SummaryCard
              title="Remaining Budget"
              amount={remainingBudget}
              variant={
                remainingBudget >= 0
                  ? "income"
                  : "expense"
              }
            />
          </div>
        </div>
        

        <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">
              Budget Usage
            </h3>
            <span className="font-bold text-gray-600">{budgetPercentage.toFixed(1)}%</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className={`h-4 rounded-full transition-all duration-500 ease-out ${
                budgetPercentage < 80
                  ? "bg-green-500"
                  : budgetPercentage < 100
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{
                width: `${budgetPercentage}%`,
              }}
            ></div>
          </div>
        </div>


        <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
            {(Array.isArray(transactions) ? transactions : []).map((txn) => (
              <TransactionItem key={txn._id} {...txn} onDelete={handleDelete} />
            ))}
        </div>
    </div>
  )
}

export default Dashboard


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTransactions } from "../services/transactionService";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import SummaryCard from "../components/SummaryCard";

const Analytics = () => {
const [transactions, setTransactions]=useState([]);
const safeTxns = Array.isArray(transactions) ? transactions : [];
const totalIncome = safeTxns
  .filter((txn) => txn.type === "Income")
  .reduce((acc, txn) => acc + Number(txn.amount || 0), 0);
const totalExpense = safeTxns
  .filter((txn) => txn.type === "Expense")
  .reduce((acc, txn) => acc + Number(txn.amount || 0), 0);

const barData=[
  {name:"Income",amount:totalIncome},
  {name:"Expense",amount:totalExpense}
]
useEffect(()=>{
  const fetchTransactions=async()=>{
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions",error);
    }
  };
  fetchTransactions();
},[])

const expenseTransactions = safeTxns.filter((txn) => txn.type === "Expense");

const categoryData = expenseTransactions
  .reduce((acc, txn) => {
    const categoryName = txn.category || "Uncategorized";
    const amount = Number(txn.amount || 0);
    const existingCategory = acc.find((item) => item.name === categoryName);
    if (existingCategory) {
      existingCategory.value += amount;
    } else {
      acc.push({
        name: categoryName,
        value: amount,
      });
    }

    return acc;
  }, [])
  .sort((a, b) => b.value - a.value);

const topCategory = categoryData.length > 0 ? categoryData[0].name : "N/A";
const navigate = useNavigate();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Analytics Overview</h1>
      
      <div className="flex gap-6 mb-8">
        <SummaryCard title="Total Income" amount={totalIncome} variant="income" />
        <SummaryCard title="Total Expense" amount={totalExpense} variant="expense" />
        <SummaryCard title="Net Balance" amount={totalIncome - totalExpense} variant="balance" />
          <div className={`bg-white rounded-xl p-6 flex-1 border border-gray-100`}> 
          <h3 className="text-gray-500 text-xs uppercase tracking-wide mb-1">Top Expense</h3>
          <p
            className={`text-2xl font-extrabold text-purple-700 ${topCategory !== 'N/A' ? 'cursor-pointer hover:underline' : ''}`}
            onClick={() => topCategory !== 'N/A' && navigate('/')}
            onKeyDown={(e) => {
              if ((e.key === 'Enter' || e.key === ' ') && topCategory !== 'N/A') navigate('/');
            }}
            role={topCategory !== 'N/A' ? 'link' : undefined}
            tabIndex={topCategory !== 'N/A' ? 0 : -1}
          >
            {topCategory}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <h2 className="text-xl font-semibold mb-6 text-gray-700">Expenses by Category</h2>
          <div className="flex-1 min-h-[300px] flex items-center justify-center">
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({name, percent}) => percent ? `${name} ${(percent * 100).toFixed(0)}%` : name}
                  >
                    {categoryData.map((entry, index)=>(
                      <Cell
                      key={index}
                      fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#fe0000"][index % 6]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₹${value}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500">No expense data available.</p>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <h2 className="text-xl font-semibold mb-6 text-gray-700">Income vs Expense</h2>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                  <XAxis dataKey="name" axisLine={false} tickLine={false}/>
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value}`}/>
                  <Tooltip cursor={{fill: 'transparent'}} formatter={(value) => `₹${value}`}/>
                  <Bar dataKey="amount" fill="#8884d8" radius={[4, 4, 0, 0]}>
                    {barData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.name === 'Income' ? '#16a34a' : '#dc2626'} />
                    ))}
                  </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics;

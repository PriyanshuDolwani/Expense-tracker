function TransactionItem({_id, title, amount, category, type, onDelete}) {
  const badgeStyles={
    Income: "bg-green-100 text-green-800",
    Expense: "bg-red-100 text-red-800"
  }
  return(
    <div className="flex justify-between items-center bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg p-5 mb-3 text-gray-800" >
      <div className="flex flex-col gap-1">
      <span className="font-semibold text-lg">{title}</span>
      <div className="flex items-center gap-3">
      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{category}</span>
      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${badgeStyles[type] || ''}`}>
        {type}
      </span>
      </div>
      </div>
      <div className="flex items-center gap-6">  
      <span className={`text-xl font-bold ${type === "Income" ? "text-green-600" : "text-red-600"}`}>{type==="Income" ? `+₹${amount}` : `-₹${amount}`}</span>
      <button onClick={()=>onDelete(_id)} className="text-sm text-white bg-red-500 hover:bg-red-600 transition-colors px-3 py-1.5 rounded-md shadow-sm">Delete</button>
      </div>
    </div>
  )   
}

export default TransactionItem;
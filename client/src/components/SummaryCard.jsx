
function SummaryCard({ title, amount, variant }) {
  const color = variant === 'expense' ? 'text-red-600' : variant === 'income' ? 'text-green-600' : 'text-gray-900';
  return (
    <div className={`bg-white rounded p-4 flex-1 border border-gray-100`}> 
        <h3 className="text-gray-500 text-xs uppercase tracking-wide mb-2">{title}</h3>
        <p className={`text-xl font-semibold ${color}`}>₹{amount}</p>
    </div>
  )
}

export default SummaryCard

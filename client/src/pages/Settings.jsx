import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTransactions } from "../services/transactionService";

function Settings() {
  const navigate = useNavigate();
  const [isExporting, setIsExporting] = useState(false);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      const transactions = await getTransactions();
      if (!transactions || transactions.length === 0) {
        alert("No transactions to export.");
        return;
      }
      
      const headers = ["Title,Amount,Category,Type"];
      const csvData = transactions.map(txn => {
        return `${txn.title},${txn.amount},${txn.category},${txn.type}`;
      });
      
      const csvString = [headers, ...csvData].join("\n");
      const blob = new Blob([csvString], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.setAttribute('href', url);
      a.setAttribute('download', 'expense_report.csv');
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed", error);
      alert("Failed to export data");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Settings
      </h1>

      <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Profile Information
        </h2>

        <p className="mb-2 text-gray-600">
          <strong className="text-gray-800">Name:</strong>{" "}
          {user?.name || "User"}
        </p>

        <p className="text-gray-600">
          <strong className="text-gray-800">Email:</strong>{" "}
          {user?.email || "No Email"}
        </p>
      </div>

      <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Data Management
        </h2>

        <p className="text-gray-600 mb-4">
          Download a complete CSV report of all your transactions for personal record keeping or accounting.
        </p>

        <button
          onClick={handleExportData}
          disabled={isExporting}
          className={`bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-lg shadow-sm transition-colors ${isExporting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isExporting ? "Exporting..." : "Export Data to CSV"}
        </button>
      </div>

      <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Application Preferences
        </h2>

        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
          <div>
            <h3 className="font-semibold text-gray-800">Default Currency</h3>
            <p className="text-sm text-gray-500">The currency used across your dashboard</p>
          </div>
          <select className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
            <option value="INR">₹ INR (Indian Rupee)</option>
            <option value="USD" disabled>$ USD (Coming Soon)</option>
            <option value="EUR" disabled>€ EUR (Coming Soon)</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-800">Email Notifications</h3>
            <p className="text-sm text-gray-500">Receive alerts when exceeding your budget</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-red-600">
          Danger Zone
        </h2>

        <p className="text-gray-600 mb-4">
          Logging out will clear your current session. You will need your credentials to log back in.
        </p>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2.5 rounded-lg shadow-sm transition-colors"
        >
          Logout of Account
        </button>
      </div>
    </div>
  );
}

export default Settings;
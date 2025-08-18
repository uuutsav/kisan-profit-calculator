// src/components/CropExpensesPage.jsx
import React, { useMemo } from 'react'; // Removed useState
import { useParams, Link } from 'react-router-dom';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import { initialCrops } from '../data';

// Receive props from App.jsx
const CropExpensesPage = ({ allTransactions, onAddTransaction }) => {
  const { cropName } = useParams();
  const crop = initialCrops.find(c => c.name === cropName) || { name: cropName, icon: '❓' };

  // Get the transactions for the current crop from the prop
  const transactions = allTransactions[cropName] || [];

  // The handler now calls the prop function, passing the cropName
  const addTransaction = (transaction) => {
    onAddTransaction(cropName, transaction);
  };

  // The profit calculation logic remains the same, but it now
  // depends on the 'transactions' variable derived from props.
  const { totalIncome, totalExpenses, totalProfit } = useMemo(() => {
    const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    return { totalIncome: income, totalExpenses: expenses, totalProfit: income - expenses };
  }, [transactions]);

  // The JSX part below has no major changes, except for the addTransaction prop
  // being passed to TransactionForm. The rest of the dynamic data updates automatically.

  return (
    <div className="p-4 max-w-lg mx-auto bg-gray-50 min-h-screen pb-8"> 
      <div className="flex items-center mb-6">
        <Link to="/" className="mr-4 p-2">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-xl font-bold text-gray-800">{crop.name} expenses</h1>
        <div className="ml-auto flex items-center border border-gray-300 rounded-full px-3 py-1">
           <span className="text-lg mr-2">{crop.icon}</span>
           <span className="font-semibold text-gray-700">{crop.name}</span>
           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
           </svg>
        </div>
      </div>
      
      <div className="bg-blue-100/50 border border-blue-200/50 p-6 rounded-xl shadow-sm mb-8">
        <div className="flex items-center">
          <h2 className="text-gray-600 font-medium">{crop.name} Total profit</h2>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className={`text-4xl font-bold mt-2 ${totalProfit >= 0 ? 'text-gray-800' : 'text-red-600'}`}>
          ₹{totalProfit.toLocaleString('en-IN')}
        </p>
        <div className="flex justify-between items-center mt-4 text-sm">
          <div className="text-red-500">
            <span>Expenses</span>
            <p className="font-semibold">-₹{totalExpenses.toLocaleString('en-IN')}</p>
          </div>
          <div className="text-green-600">
            <span>Income</span>
            <p className="font-semibold">+₹{totalIncome.toLocaleString('en-IN')}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <TransactionForm onAddTransaction={addTransaction} />
      </div>

      <TransactionList transactions={transactions} />
    </div>
  );
};

export default CropExpensesPage;
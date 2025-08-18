// src/components/FinancialOverview.jsx
import React, { useMemo } from 'react'; // Import useMemo
import CropList from './CropList';
// No longer need to import initialCrops here as it's passed via props

const calculateProfit = (transactions = []) => {
  const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  return income - expenses;
};

const FinancialOverview = ({ crops, allTransactions }) => {
  
  // Calculate the total profit for all crops
  const totalProfit = useMemo(() => {
    return Object.values(allTransactions)
      .flat() // combines all transaction arrays into one
      .reduce((total, transaction) => {
        return transaction.type === 'income' 
          ? total + transaction.amount 
          : total - transaction.amount;
      }, 0);
  }, [allTransactions]);

  // Add the calculated profit to each crop object
  const cropsWithProfit = useMemo(() => {
    return crops.map(crop => ({
      ...crop,
      profit: calculateProfit(allTransactions[crop.name]),
    }));
  }, [crops, allTransactions]);

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="flex items-center mb-8">
        {/* The back button doesn't do anything here, can be removed or disabled */}
        <button className="mr-4 invisible">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-gray-800 text-center flex-grow">Financial overview</h1>
      </div>

      {/* Estimated Total Profit Card */}
      <div className="bg-blue-100/50 border border-blue-200/50 p-6 rounded-xl shadow-sm mb-8">
        <div className="flex items-center">
          <h2 className="text-gray-600 font-medium">Estimated total profit</h2>
          {/* ... icon */}
        </div>
        <p className={`text-4xl font-bold text-gray-800 mt-2 ${totalProfit >= 0 ? 'text-gray-800' : 'text-red-600'}`}>
          ₹{totalProfit.toLocaleString('en-IN')}
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Calculate profit</h2>
          {/* ... icon */}
        </div>
        {/* Pass the updated crops data to CropList */}
        <CropList crops={cropsWithProfit} />
      </div>
    </div>
  );
};

export default FinancialOverview;
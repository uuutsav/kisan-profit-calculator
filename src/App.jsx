// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import FinancialOverview from './components/FinancialOverview';
import CropExpensesPage from './components/CropExpensesPage';
import { initialCrops } from './data'; // Import our initial crop data

function App() {
  // State to hold all transactions for all crops
  // E.g., { "Carrot": [transaction1, transaction2], "Potato": [...] }
  const [allTransactions, setAllTransactions] = useState({});

  // Function to add a transaction for a specific crop
  const handleAddTransaction = (cropName, newTransaction) => {
    setAllTransactions(prev => {
      const currentCropTransactions = prev[cropName] || [];
      return {
        ...prev,
        [cropName]: [newTransaction, ...currentCropTransactions],
      };
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Routes>
        <Route 
          path="/" 
          element={
            <FinancialOverview 
              crops={initialCrops} 
              allTransactions={allTransactions} 
            />
          } 
        />
        <Route 
          path="/crop/:cropName" 
          element={
            <CropExpensesPage 
              allTransactions={allTransactions}
              onAddTransaction={handleAddTransaction}
            />
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
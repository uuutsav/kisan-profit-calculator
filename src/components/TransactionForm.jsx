// src/components/TransactionForm.jsx
import React, { useState } from 'react';
import ExpenseForm from './ExpenseForm';
import IncomeForm from './IncomeForm';

const TransactionForm = () => {
  const [activeTab, setActiveTab] = useState('expense'); // 'expense' or 'income'

  const getTabClassName = (tabName) => {
    return `w-full py-2.5 text-sm font-semibold text-center rounded-lg focus:outline-none transition-colors ${
      activeTab === tabName
        ? 'bg-blue-600 text-white shadow'
        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
    }`;
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Add new transaction</h2>
      <div className="flex bg-gray-200 rounded-lg p-1 space-x-1">
        <button
          onClick={() => setActiveTab('expense')}
          className={getTabClassName('expense')}
        >
          Expense
        </button>
        <button
          onClick={() => setActiveTab('income')}
          className={getTabClassName('income')}
        >
          Income
        </button>
      </div>
      
      {activeTab === 'expense' ? <ExpenseForm /> : <IncomeForm />}
    </div>
  );
};

export default TransactionForm;
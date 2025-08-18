// src/components/ExpenseForm.jsx
import React from 'react';

const ExpenseForm = () => {
  const expenseCategories = [
    "Seeds/seedlings", "Fertiliser", "Pesticides", "Machinery",
    "Labour", "Land rent", "Irrigation", "Electricity", "Harvest", "Other"
  ];

  return (
    <form className="space-y-4 mt-4">
      <div>
        <label htmlFor="category" className="text-sm font-medium text-gray-600">Category</label>
        <select
          id="category"
          className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          <option>Select category</option>
          {expenseCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="expense-name" className="text-sm font-medium text-gray-600">Expense name (optional)</label>
        <input
          type="text"
          id="expense-name"
          className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label htmlFor="price" className="text-sm font-medium text-gray-600">Price</label>
        <div className="relative mt-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
          <input
            type="number"
            id="price"
            className="w-full p-3 pl-7 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="expense-date" className="text-sm font-medium text-gray-600">Expense date</label>
        <input
          type="date"
          id="expense-date"
          defaultValue={new Date().toISOString().split('T')[0]} // Sets today's date
          className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="pt-2 space-y-2">
        <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Record expense
        </button>
        <button type="button" className="w-full bg-transparent text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
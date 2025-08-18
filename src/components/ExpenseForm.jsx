// src/components/ExpenseForm.jsx
import React, { useState } from 'react';

const ExpenseForm = ({ onAddTransaction }) => {
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const expenseCategories = [
    "Seeds/seedlings", "Fertiliser", "Pesticides", "Machinery",
    "Labour", "Land rent", "Irrigation", "Electricity", "Harvest", "Other"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !price || !date || Number(price) <= 0) {
      alert("Please fill in all required fields with valid values.");
      return;
    }

    const newExpense = {
      id: Date.now(),
      type: 'expense',
      category: category,
      name: name || category, // Use category as name if name is empty
      amount: parseFloat(price),
      date: date,
    };

    onAddTransaction(newExpense);

    // Reset form fields
    setCategory('');
    setName('');
    setPrice('');
  };

  return (
    <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="category" className="text-sm font-medium text-gray-600">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          <option value="">Select category</option>
          {expenseCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="expense-name" className="text-sm font-medium text-gray-600">Expense name (optional)</label>
        <input
          type="text"
          id="expense-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-3 pl-7 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="expense-date" className="text-sm font-medium text-gray-600">Expense date</label>
        <input
          type="date"
          id="expense-date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
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
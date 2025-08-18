// src/components/IncomeForm.jsx
import React, { useState, useMemo } from 'react';

const IncomeForm = ({ onAddTransaction }) => {
  const [name, setName] = useState('Sale');
  const [yieldAmount, setYieldAmount] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const totalPrice = useMemo(() => {
    const yieldNum = parseFloat(yieldAmount);
    const priceNum = parseFloat(pricePerUnit);
    return yieldNum > 0 && priceNum > 0 ? yieldNum * priceNum : 0;
  }, [yieldAmount, pricePerUnit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (totalPrice <= 0 || !date) {
      alert("Please fill in all required fields with valid values.");
      return;
    }

    const newIncome = {
      id: Date.now(),
      type: 'income',
      category: 'Sale',
      name: name,
      amount: totalPrice,
      date: date,
    };

    onAddTransaction(newIncome);

    // Reset form
    setName('Sale');
    setYieldAmount('');
    setPricePerUnit('');
  };

  return (
    <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="income-name" className="text-sm font-medium text-gray-600">Income name (optional)</label>
        <input
          type="text"
          id="income-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="yield" className="text-sm font-medium text-gray-600">Yield*</label>
          <div className="relative mt-1">
            <input
              type="number"
              id="yield"
              value={yieldAmount}
              onChange={(e) => setYieldAmount(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
             <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">kg</span>
          </div>
        </div>
        <div>
          <label htmlFor="price-per-kilo" className="text-sm font-medium text-gray-600">Price per kilo*</label>
          <div className="relative mt-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
            <input
              type="number"
              id="price-per-kilo"
              value={pricePerUnit}
              onChange={(e) => setPricePerUnit(e.target.value)}
              className="w-full p-3 pl-7 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>
      
       <div>
        <label htmlFor="income-date" className="text-sm font-medium text-gray-600">Income date</label>
        <input
          type="date"
          id="income-date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
        />
      </div>

      <p className="text-center text-gray-700">Total price: <span className="font-bold">₹{totalPrice.toLocaleString('en-IN')}</span></p>

      <div className="pt-2 space-y-2">
        <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Record income
        </button>
        <button type="button" className="w-full bg-transparent text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default IncomeForm;
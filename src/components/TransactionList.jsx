// src/components/TransactionList.jsx
import React from 'react';

// A small helper to format the date nicely
const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'long' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const TransactionList = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No transactions recorded yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">All transactions</h2>
      <ul className="space-y-3">
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm"
          >
            <div className="flex items-center">
              {/* You can add icons for different categories later */}
              <div className="p-2 bg-gray-100 rounded-full mr-4">
                {transaction.type === 'income' ? '💰' : '🌱'}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{transaction.name}</p>
                <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
              </div>
            </div>
            <span
              className={`font-bold text-lg ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-500'
              }`}
            >
              {transaction.type === 'income' ? '+' : '-'}₹
              {transaction.amount.toLocaleString('en-IN')}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
// src/components/FinancialOverview.jsx

import React, { useState } from 'react';
import CropList from './CropList.jsx';
import { initialCrops } from '../data.js'; // Import our dummy data

const FinancialOverview = () => {
  const [crops, setCrops] = useState(initialCrops);
  
  // We'll calculate total profit later
  const totalProfit = 0;

  return (
    <div className="p-4 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button className="mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-gray-800">Financial overview</h1>
      </div>

      {/* Estimated Total Profit Card */}
      <div className="bg-blue-100/50 border border-blue-200/50 p-6 rounded-xl shadow-sm mb-8">
        <div className="flex items-center">
          <h2 className="text-gray-600 font-medium">Estimated total profit</h2>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-4xl font-bold text-gray-800 mt-2">
          ₹{totalProfit.toLocaleString('en-IN')}
        </p>
      </div>
      
      {/* Profit Calculation Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Calculate profit</h2>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
        <CropList crops={crops} />
      </div>
    </div>
  );
};

export default FinancialOverview;
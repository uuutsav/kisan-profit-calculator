
import React from 'react';

const CropListItem = ({ crop }) => {
  return (
    <li className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer">
      <div className="flex items-center">
        <span className="text-2xl mr-4">{crop.icon}</span>
        <span className="font-medium text-gray-700">{crop.name}</span>
      </div>
      <div className="flex items-center">
        <span className={`font-semibold ${crop.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          ₹{crop.profit.toLocaleString('en-IN')}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 ml-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </div>
    </li>
  );
};

export default CropListItem;
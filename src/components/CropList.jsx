// src/components/CropList.jsx

import React from 'react';
import CropListItem from './CropListItem';

const CropList = ({ crops }) => {
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Your Crops</h2>
        <button className="text-green-600 font-semibold flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add
        </button>
      </div>
      <ul className="space-y-3">
        {crops.map((crop) => (
          <CropListItem key={crop.id} crop={crop} />
        ))}
      </ul>
    </div>
  );
};

export default CropList;
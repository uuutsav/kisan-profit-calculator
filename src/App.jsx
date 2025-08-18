// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FinancialOverview from './components/FinancialOverview';
import CropExpensesPage from './components/CropExpensesPage';

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Routes>
        {/* Route 1: The home page (at "/") renders the FinancialOverview */}
        <Route path="/" element={<FinancialOverview />} />
        
        {/* Route 2: A dynamic route for individual crops */}
        {/* The ":cropName" is a URL parameter that we can access */}
        <Route path="/crop/:cropName" element={<CropExpensesPage />} />
      </Routes>
    </div>
  );
}

export default App;
// src/App.jsx
import React from 'react';
// import FinancialOverview from './components/FinancialOverview';
import CropExpensesPage from './components/CropExpensesPage'; // Import the new page

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* <FinancialOverview /> */}
      <CropExpensesPage /> {/* Render the new page */}
    </div>
  );
}

export default App;
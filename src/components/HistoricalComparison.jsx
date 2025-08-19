// src/components/HistoricalComparison.jsx
import React, { useState } from 'react';

const HistoricalComparison = ({ cropName, totalExpenses, currentYield }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear() - 1);
  const [comparisonData, setComparisonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCompare = async () => {
    if (!currentYield || currentYield <= 0) {
      alert("Please record a sale (income) first to set your current yield.");
      return;
    }
    
    setIsLoading(true);
    setComparisonData(null);
    setError('');

    try {
      // Send all necessary data to our single backend endpoint
      const response = await fetch('http://localhost:3001/api/get-crop-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cropName: cropName,
          year: selectedYear,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      // Calculate the historical profit on the frontend
      const historicalProfit = (data.avgPrice * currentYield) - totalExpenses;

      setComparisonData({
        year: selectedYear,
        avgPrice: data.avgPrice,
        profit: historicalProfit,
        weatherAnalysis: data.weather_analysis,
        futureOutlook: data.future_outlook,
      });

    } catch (err) {
      console.error("Comparison failed:", err);
      setError(err.message); // Display the error to the user
    } finally {
      setIsLoading(false);
    }
  };

  const lastFiveYears = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 1 - i);

  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-bold text-gray-800">Advanced Analysis</h2>
      <p className="text-sm text-gray-500 mt-1">Compare with historical data and get an AI-powered outlook.</p>
      
      <div className="flex items-end space-x-2 mt-4">
        <div className="flex-grow">
          <label htmlFor="year-select" className="text-sm font-medium text-gray-600">Compare with year</label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            {lastFiveYears.map(year => <option key={year} value={year}>{year}</option>)}
          </select>
        </div>
        <button
          onClick={handleCompare}
          disabled={isLoading}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>

      {error && (
         <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <p><span className="font-bold">Error:</span> {error}</p>
         </div>
      )}

      {comparisonData && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-lg text-green-800">Analysis for {comparisonData.year}</h3>
          <div className="mt-2 space-y-2 text-gray-700">
             <div className="flex justify-between">
                <span>Avg. market price found:</span>
                <span className="font-semibold">₹{comparisonData.avgPrice.toFixed(2)} / kg</span>
            </div>
            <div className="flex justify-between">
                <span>Your potential profit:</span>
                <span className={`font-semibold ${comparisonData.profit >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                    ₹{comparisonData.profit.toLocaleString('en-IN')}
                </span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-green-200">
              <h4 className="font-semibold text-gray-800">AI Weather Summary</h4>
              <p className="text-sm text-gray-600 mt-1 italic">"{comparisonData.weatherAnalysis}"</p>
          </div>
           <div className="mt-4 pt-3 border-t border-green-200">
              <h4 className="font-semibold text-gray-800">AI Future Outlook</h4>
              <p className="text-sm text-gray-600 mt-1 italic">"{comparisonData.futureOutlook}"</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoricalComparison;
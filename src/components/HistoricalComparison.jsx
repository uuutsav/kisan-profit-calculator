// src/components/HistoricalComparison.jsx
import React, { useState } from 'react';

// --- MOCK API FUNCTION ---
// This function simulates fetching data from a government API.
// In a real app, you would replace this with a real `fetch` call.
const fetchHistoricalData = async (cropName, year) => {
  console.log(`Fetching data for ${cropName} in ${year}...`);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Return mock data. A real API would provide this.
  // We'll return a random average price for demonstration.
  const mockPrice = Math.floor(Math.random() * (55 - 35 + 1)) + 35; // Random price between ₹35-55
  
  // A real API might also return weather summaries.
  const mockWeatherSummary = `The year ${year} had average rainfall, which was generally favorable for ${cropName} cultivation.`;

  console.log("Data fetched:", { avgPrice: mockPrice, weather: mockWeatherSummary });
  return { avgPrice: mockPrice, weather: mockWeatherSummary };
};
// --- END MOCK API FUNCTION ---


const HistoricalComparison = ({ cropName, totalExpenses, currentYield }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear() - 1);
  const [comparisonData, setComparisonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCompare = async () => {
    if (!currentYield || currentYield <= 0) {
      alert("Please record a sale (income) first to set your current yield.");
      return;
    }
    
    setIsLoading(true);
    setComparisonData(null); // Clear previous results

    try {
      const data = await fetchHistoricalData(cropName, selectedYear);
      
      const historicalProfit = (data.avgPrice * currentYield) - totalExpenses;

      setComparisonData({
        year: selectedYear,
        avgPrice: data.avgPrice,
        profit: historicalProfit,
        weather: data.weather
      });

    } catch (error) {
      console.error("Failed to fetch historical data:", error);
      alert("Could not fetch historical data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Generate a list of the last 5 years for the dropdown
  const lastFiveYears = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 1 - i);

  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-bold text-gray-800">Historical Profit Comparison</h2>
      <p className="text-sm text-gray-500 mt-1">See what you would have earned in previous years with the same yield and expenses.</p>
      
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
          {isLoading ? 'Loading...' : 'Compare'}
        </button>
      </div>

      {comparisonData && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-lg text-green-800">Comparison for {comparisonData.year}</h3>
          <div className="mt-2 space-y-2 text-gray-700">
             <div className="flex justify-between">
                <span>Avg. market price in {comparisonData.year}:</span>
                <span className="font-semibold">₹{comparisonData.avgPrice.toFixed(2)} / kg</span>
            </div>
            <div className="flex justify-between">
                <span>Your potential profit:</span>
                <span className={`font-semibold ${comparisonData.profit >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                    ₹{comparisonData.profit.toLocaleString('en-IN')}
                </span>
            </div>
          </div>

          {/* Part 3: Weather/AI Analysis Display */}
          <div className="mt-4 pt-3 border-t border-green-200">
              <h4 className="font-semibold text-gray-800">Weather Analysis for {comparisonData.year}</h4>
              <p className="text-sm text-gray-600 mt-1 italic">
                "{comparisonData.weather}"
              </p>
              <p className="text-xs text-gray-400 mt-2">Note: This analysis is illustrative. A real implementation would use a service like Google's Gemini AI.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoricalComparison;
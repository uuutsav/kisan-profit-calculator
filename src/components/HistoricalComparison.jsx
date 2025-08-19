// src/components/HistoricalComparison.jsx
import React, { useState } from 'react';

// --- Placeholder for a real Government Data API ---
// In a real app, you would replace this mock with a real `fetch` call to a government portal.
const fetchHistoricalPriceData = async (cropName, year) => {
  console.log(`Fetching price data for ${cropName} in ${year}...`);
  // ** REPLACE THIS with a real fetch call, e.g.: **
  // const response = await fetch(`https://api.data.gov.in/resource/...?filters[commodity]=${cropName}&filters[year]=${year}`);
  // const data = await response.json();
  // return { avgPrice: data.records[0].modal_price, weather: "..." };
  
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  const mockPrice = Math.floor(Math.random() * (55 - 35 + 1)) + 35;
  const mockWeatherSummary = `The year ${year} experienced slightly above-average monsoon rains, with a dry spell in August.`;
  return { avgPrice: mockPrice, weather: mockWeatherSummary };
};
// --- END Placeholder ---

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
    setComparisonData(null);

    try {
      // Step 1: Get historical price and weather data
      const priceData = await fetchHistoricalPriceData(cropName, selectedYear);
      const historicalProfit = (priceData.avgPrice * currentYield) - totalExpenses;

      // Step 2: Send this data to our backend for Gemini AI analysis
      const aiResponse = await fetch('http://localhost:3001/api/get-crop-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cropName: cropName,
          year: selectedYear,
          historicalPrice: priceData.avgPrice,
          historicalWeather: priceData.weather,
        }),
      });

      if (!aiResponse.ok) throw new Error('AI analysis failed');
      const aiAnalysis = await aiResponse.json();

      // Step 3: Combine all data and set the state to display it
      setComparisonData({
        year: selectedYear,
        avgPrice: priceData.avgPrice,
        profit: historicalProfit,
        weatherAnalysis: aiAnalysis.weather_analysis,
        futureOutlook: aiAnalysis.future_outlook,
      });

    } catch (error) {
      console.error("Comparison failed:", error);
      alert("Could not complete the comparison. Please ensure the backend server is running.");
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
        {/* ... (Year selection and button JSX is unchanged) ... */}
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

      {comparisonData && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-lg text-green-800">Analysis for {comparisonData.year}</h3>
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
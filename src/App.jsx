import React, { useState } from 'react';

export default function App() {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRandomFact = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://catfact.ninja/fact');
      
      if (!response.ok) {
        throw new Error('Failed to fetch cat fact');
      }
      
      const data = await response.json();
      setFact(data.fact);
    } catch (err) {
      setError('Failed to fetch cat fact. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">
          Random Cat Facts
        </h1>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          {loading ? (
            <p className="text-gray-600">Loading... 
            </p>) : error ? (
            <p className="text-red-600">{error}</p>) : fact ? (
            <p className="text-gray-700 leading-relaxed">{fact}</p>) : (
            <p className="text-gray-500">Click the button to get a cat fact!</p>)}
        </div>

        <button
          onClick={fetchRandomFact}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
        >
          {loading ? 'Loading...' : 'Get Cat Fact'}
        </button>
      </div>
    </div>
  );
}
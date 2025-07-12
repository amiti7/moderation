import React from 'react'
import BaseURL from './config/config'

const TextModeration = () => {
  const [inputText, setInputText] = React.useState('');
      const [results, setResults] = React.useState(null);
      const [error, setError] = React.useState(null);
      const [isLoading, setIsLoading] = React.useState(false);
      const [showDetails, setShowDetails] = React.useState(false);

      const handleSubmit = async () => {
        setIsLoading(true);
        setError(null);
        setResults(null);
        setShowDetails(true);

        try {
          const response = await fetch(`${BaseURL[process.env.REACT_APP_NODE_ENVIRONMENT].server}/moderateText`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: inputText })
          });

          if (!response.ok) {
            throw new Error('API request failed');
          }

          const data = await response.json();
          setResults(data.results[0]);
        } catch (err) {
          setError('Failed to fetch moderation results. Please check your API key and try again.');
        } finally {
          setIsLoading(false);
        }
      };

      const getScoreColor = (score) => {
        if (score > 0.7) return 'bg-red-500';
        if (score > 0.3) return 'bg-yellow-500';
        return 'bg-green-500';
      };

      return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Text Moderation</h1>
          
          <div className="mb-6">
            <textarea
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              rows="5"
              placeholder="Enter text to moderate..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <p className="mt-2 text-gray-500 text-sm text-center">
             ⚠️ The first request may take up to 45 seconds while the server warms up.
            </p>
            <button
              className={`w-full mt-3 py-2 px-4 rounded-lg font-semibold text-white transition-colors ${
                isLoading || !inputText.trim()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
              onClick={handleSubmit}
              disabled={isLoading || !inputText.trim()}
            >
            
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z" />
                  </svg>
                  Checking...
                </span>
              ) : (
                'Verify Text for Content'
              )}
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg mb-4 flex items-center">
              <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          {results && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Moderation Results
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    results.flagged ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}
                >
                  {results.flagged ? 'Flagged' : 'Safe'}
                </span>
              </div>
              <button
                className="w-full flex items-center justify-between p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                onClick={() => setShowDetails(!showDetails)}
              >
                <span className="font-medium">Category Details</span>
                <svg
                  className={`h-5 w-5 transform transition-transform ${showDetails ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showDetails && (
                <div className="mt-4 space-y-3">
                  {Object.entries(results.categories).map(([category, flagged]) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="capitalize text-gray-700">{category.replace(/[_-]/g, ' ')}</span>
                      <div className="w-2/3 flex items-center space-x-3">
                        <div className="progress-bar w-full">
                          <div
                            className={`progress-fill ${getScoreColor(results.category_scores[category])}`}
                            style={{ width: `${results.category_scores[category] * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">
                          {(results.category_scores[category] * 100).toFixed(1)}%
                        </span>
                        <span
                          className={`text-sm font-medium ${
                            flagged ? 'text-red-600' : 'text-green-600'
                          }`}
                        >
                          {flagged ? 'Flagged' : 'Safe'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      );
}



export default TextModeration
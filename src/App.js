import './App.css';
import React from 'react';
import TextModeration from './TextModeration';
import ImageModeration from './ImageModeration';

function App() {
  const [activeTab, setActiveTab] = React.useState('text');
      const [error, setError] = React.useState(null);

      return (
        <div className="max-w-3xl mx-auto p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Content Moderation</h1>
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`flex-1 py-2 px-4 text-center font-semibold transition-colors ${
                activeTab === 'text'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('text')}
            >
              Text
            </button>
            <button
              className={`flex-1 py-2 px-4 text-center font-semibold transition-colors ${
                activeTab === 'image'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('image')}
            >
              Image
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
          {activeTab === 'text' ? (
            <TextModeration setError={setError} />
          ) : (
            <ImageModeration setError={setError} />
          )}
        </div>
      );
}

export default App;

import './App.css';
import React from 'react';
import TextModeration from './TextModeration';
import ImageModeration from './ImageModeration';

function App() {
  const [activeTab, setActiveTab] = React.useState('text');
      const [error, setError] = React.useState(null);

      return (
        <div className="max-w-3xl mx-auto p-6">
          <div className="mb-4">
            <a
              href="https://www.vermacodes.in"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Amit's Portfolio
            </a>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Content Moderation</h1>
          <p className="mt-2 text-gray-800 text-m mb-4 text-center">A powerful tool to moderate text and images for safety and compliance using advanced AI. Check for harmful content with real-time results.</p>
          <p className="mt-2 text-gray-500 text-sm mb-4 text-center">
            🔐 Privacy Notice: Your data is not saved or stored on our servers.
          </p>
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
                    <footer className="mt-8 py-4 border-t border-gray-200 text-center">
            <div className="flex justify-center space-x-6">
              <a
                href="https://www.linkedin.com/in/amitvermacse/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors flex items-center"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.03-3.06-1.867-3.06-1.867 0-2.152 1.458-2.152 2.964v5.7h-3v-11h2.879v1.504h.04c.401-.757 1.379-1.557 2.834-1.557 3.033 0 3.594 1.996 3.594 4.594v6.459z"/>
                </svg>
                LinkedIn
              </a>
            </div>
            <p className="mt-2 text-gray-500 text-sm">
              Powered by OpenAI
            </p>
            <p className="mt-2 text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Content Moderation Tool. All rights reserved.
            </p>
          </footer>
        </div>
      );
}

export default App;

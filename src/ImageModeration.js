import React from 'react';
import BaseURL from './config/config'


const ImageModeration = ({setError}) => {
      const [imageFile, setImageFile] = React.useState(null);
      const [imageUrl, setImageUrl] = React.useState('');
      const [preview, setPreview] = React.useState(null);
      const [results, setResults] = React.useState(null);
      const [isLoading, setIsLoading] = React.useState(false);
      const [showDetails, setShowDetails] = React.useState(false);

      const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setImageFile(file);
          setImageUrl('');
          setPreview(URL.createObjectURL(file));
        }
      };

      const handleUrlChange = (e) => {
        setImageUrl(e.target.value);
        setImageFile(null);
        setPreview(e.target.value || null);
      };

const handleSubmit = async () => {
  setIsLoading(true);
  setError(null);
  setResults(null);
  setShowDetails(false);

  try {
    let base64Image = null;
    if (imageFile) {
      // Convert local image file to Base64
      const reader = new FileReader();
      base64Image = 'data:image/png;base64,' + await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result.split(',')[1]); // Extract Base64 data
        reader.onerror = reject;
        reader.readAsDataURL(imageFile);
      });
    }

    // Mock API call for image moderation (replace with actual image moderation API)
    try {
              const response = await fetch(`${BaseURL[process.env.REACT_APP_NODE_ENVIRONMENT].server}/moderateImage`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({text:"", image: imageUrl || base64Image })
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


        }catch (err) {
    setError(err.message || 'Failed to fetch image moderation results.');
  } finally {
    setIsLoading(false);
  }
}

      const getScoreColor = (score) => {
        if (score > 0.7) return 'bg-red-500';
        if (score > 0.3) return 'bg-yellow-500';
        return 'bg-green-500';
      };

      return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Image Moderation</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full p-2 border rounded-lg"
              onChange={handleFileChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Or Enter Image URL</label>
            <input
              type="url"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={handleUrlChange}
            />
          </div>
          {preview && (
            <div className="mb-4">
              <img src={preview} alt="Preview" className="max-w-full h-auto rounded-lg" style={{ maxHeight: '200px' }} />
            </div>
          )}
          <button
            className={`w-full py-2 px-4 rounded-lg font-semibold text-white transition-colors ${
              isLoading || (!imageFile && !imageUrl.trim())
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
            onClick={handleSubmit}
            disabled={isLoading || (!imageFile && !imageUrl.trim())}
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
              'Verify Image for Content'
            )}
          </button>

          {results && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Results</h3>
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

export default ImageModeration
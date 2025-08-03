import { useState, useEffect } from 'react';
import { searchUsers, fetchUserData } from '../services/githubApi';

const Search = () => {
  // Search states
  const [searchType, setSearchType] = useState('basic'); // 'basic' or 'advanced'
  const [basicUsername, setBasicUsername] = useState('');
  const [advancedParams, setAdvancedParams] = useState({
    username: '',
    location: '',
    reposMin: '',
    language: '',
    followersMin: ''
  });

  // Results states
  const [users, setUsers] = useState([]);
  const [singleUser, setSingleUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);

  // Basic search handler
  const handleBasicSearch = async (e) => {
    e.preventDefault();
    if (!basicUsername.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const data = await fetchUserData(basicUsername);
      setSingleUser(data);
      setUsers([]); // Clear advanced search results
    } catch (err) {
      setError("Looks like we can't find the user");
      setSingleUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Advanced search handler
  const handleAdvancedSearch = async (e, pageNumber = 1) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const data = await searchUsers(advancedParams, pageNumber);
      
      if (pageNumber === 1) {
        setUsers(data.items);
      } else {
        setUsers(prev => [...prev, ...data.items]);
      }
      
      setTotalResults(data.total_count);
      setSingleUser(null); // Clear basic search result
    } catch (err) {
      setError(err.response?.status === 403 
        ? 'API rate limit exceeded. Please try again later.' 
        : "Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  // Input change handlers
  const handleBasicInputChange = (e) => {
    setBasicUsername(e.target.value);
  };

  const handleAdvancedInputChange = (e) => {
    const { name, value } = e.target;
    setAdvancedParams(prev => ({ ...prev, [name]: value }));
  };

  // Load more results for advanced search
  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    handleAdvancedSearch(null, nextPage);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">GitHub User Search</h1>
      
      {/* Search type toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            onClick={() => setSearchType('basic')}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${searchType === 'basic' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            Basic Search
          </button>
          <button
            onClick={() => setSearchType('advanced')}
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${searchType === 'advanced' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            Advanced Search
          </button>
        </div>
      </div>

      {/* Search forms */}
      {searchType === 'basic' ? (
        <form onSubmit={handleBasicSearch} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <label className="block text-gray-700 mb-2" htmlFor="basicUsername">
                GitHub Username
              </label>
              <input
                type="text"
                id="basicUsername"
                value={basicUsername}
                onChange={handleBasicInputChange}
                placeholder="e.g. octocat"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 h-[42px] rounded-md text-white font-medium ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <form onSubmit={handleAdvancedSearch} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={advancedParams.username}
                onChange={handleAdvancedInputChange}
                placeholder="e.g. octocat"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="location">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={advancedParams.location}
                onChange={handleAdvancedInputChange}
                placeholder="e.g. San Francisco"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="reposMin">
                Minimum Repositories
              </label>
              <input
                type="number"
                id="reposMin"
                name="reposMin"
                value={advancedParams.reposMin}
                onChange={handleAdvancedInputChange}
                placeholder="e.g. 10"
                min="0"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="followersMin">
                Minimum Followers
              </label>
              <input
                type="number"
                id="followersMin"
                name="followersMin"
                value={advancedParams.followersMin}
                onChange={handleAdvancedInputChange}
                placeholder="e.g. 100"
                min="0"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-md text-white font-medium ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>
      )}

      {/* Error display */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p>{error}</p>
        </div>
      )}

      {/* Loading indicator */}
      {loading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Results display */}
      {singleUser && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <img
                src={singleUser.avatar_url}
                alt={singleUser.login}
                className="w-32 h-32 rounded-full"
              />
            </div>
            <div className="flex-grow">
              <h2 className="text-2xl font-bold text-gray-800">
                {singleUser.name || singleUser.login}
              </h2>
              {singleUser.bio && <p className="text-gray-600 mt-2">{singleUser.bio}</p>}
              
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-gray-500 text-sm">Repositories</div>
                  <div className="text-xl font-bold">{singleUser.public_repos || 0}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-gray-500 text-sm">Followers</div>
                  <div className="text-xl font-bold">{singleUser.followers || 0}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-gray-500 text-sm">Following</div>
                  <div className="text-xl font-bold">{singleUser.following || 0}</div>
                </div>
              </div>

              <div className="mt-6">
                {singleUser.location && (
                  <p className="text-gray-600">📍 {singleUser.location}</p>
                )}
                {singleUser.blog && (
                  <p className="text-gray-600 mt-1">
                    🌐 <a href={singleUser.blog} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{singleUser.blog}</a>
                  </p>
                )}
                {singleUser.twitter_username && (
                  <p className="text-gray-600 mt-1">
                    🐦 <a href={`https://twitter.com/${singleUser.twitter_username}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@{singleUser.twitter_username}</a>
                  </p>
                )}
              </div>

              <a
                href={singleUser.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                View GitHub Profile
              </a>
            </div>
          </div>
        </div>
      )}

      {users.length > 0 && (
        <>
          <div className="mb-4">
            <p className="text-gray-600">Showing {users.length} of {totalResults} results</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map(user => (
              <div key={user.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <img 
                    src={user.avatar_url} 
                    alt={user.login} 
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{user.login}</h3>
                    <a 
                      href={user.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm hover:underline"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  {user.location && <p>📍 {user.location}</p>}
                  {user.public_repos !== undefined && <p>📦 Repos: {user.public_repos}</p>}
                  {user.followers !== undefined && <p>👥 Followers: {user.followers}</p>}
                </div>
              </div>
            ))}
          </div>

          {users.length > 0 && users.length < totalResults && (
            <div className="flex justify-center mt-6">
              <button
                onClick={loadMore}
                disabled={loading}
                className={`px-6 py-2 rounded-md text-white font-medium ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
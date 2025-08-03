import { useState } from 'react';
import { searchUsers } from '../services/githubApi';

const Search = () => {
  const [searchParams, setSearchParams] = useState({
    username: '',
    location: '',
    reposMin: '',
    language: '',
    followersMin: ''
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPage(1);
    performSearch(1);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    performSearch(nextPage);
  };

  const performSearch = async (pageNumber) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await searchUsers(searchParams, pageNumber);
      
      if (pageNumber === 1) {
        setUsers(data.items);
      } else {
        setUsers(prev => [...prev, ...data.items]);
      }
      
      setTotalResults(data.total_count);
    } catch (err) {
      setError(err.response?.status === 403 
        ? 'API rate limit exceeded. Please try again later.' 
        : "Looks like we can't find users matching these criteria");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">GitHub User Search</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={searchParams.username}
              onChange={handleInputChange}
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
              value={searchParams.location}
              onChange={handleInputChange}
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
              value={searchParams.reposMin}
              onChange={handleInputChange}
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
              value={searchParams.followersMin}
              onChange={handleInputChange}
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

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p>{error}</p>
        </div>
      )}

      {users.length > 0 && (
        <div className="mb-4">
          <p className="text-gray-600">Showing {users.length} of {totalResults} results</p>
        </div>
      )}

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
    </div>
  );
};

export default Search;
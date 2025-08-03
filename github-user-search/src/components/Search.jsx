import { useState } from 'react';
import { fetchUserData } from '../services/githubApi';

const Search = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const data = await fetchUserData(username);
      setUserData(data);
    } catch (err) {
      setError("Looks like we can't find the user");
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">GitHub User Search</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              GitHub Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p>{error}</p>
        </div>
      )}

      {loading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {userData && (
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <img
                src={userData.avatar_url}
                alt={userData.login}
                className="w-32 h-32 rounded-full"
              />
            </div>
            <div className="flex-grow">
              <h2 className="text-2xl font-bold text-gray-800">
                {userData.name || userData.login}
              </h2>
              {userData.bio && <p className="text-gray-600 mt-2">{userData.bio}</p>}
              
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-gray-500 text-sm">Repositories</div>
                  <div className="text-xl font-bold">{userData.public_repos || 0}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-gray-500 text-sm">Followers</div>
                  <div className="text-xl font-bold">{userData.followers || 0}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-gray-500 text-sm">Following</div>
                  <div className="text-xl font-bold">{userData.following || 0}</div>
                </div>
              </div>

              <div className="mt-6">
                {userData.location && (
                  <p className="text-gray-600">📍 {userData.location}</p>
                )}
                {userData.blog && (
                  <p className="text-gray-600 mt-1">
                    🌐 <a href={userData.blog} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{userData.blog}</a>
                  </p>
                )}
                {userData.twitter_username && (
                  <p className="text-gray-600 mt-1">
                    🐦 <a href={`https://twitter.com/${userData.twitter_username}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@{userData.twitter_username}</a>
                  </p>
                )}
              </div>

              <a
                href={userData.html_url}
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
    </div>
  );
};

export default Search;
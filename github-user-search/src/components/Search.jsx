import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

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
      setError('Looks like we can\'t find the user');
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      
      {userData && (
        <div className="user-card">
          <img src={userData.avatar_url} alt={userData.login} />
          <div>
            <h2>{userData.name || userData.login}</h2>
            <p>{userData.bio}</p>
            <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
              View Profile
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
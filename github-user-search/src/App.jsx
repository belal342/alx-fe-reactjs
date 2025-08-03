import { useState, useEffect } from 'react';
import { searchUsers } from './services/githubApi';

import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchTerm.trim()) {
        handleSearch();
      } else {
        setUsers([]);
      }
    }, 500);

    return () => clearTimeout(timerId);
  }, [searchTerm]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchUsers(searchTerm);
      setUsers(data.items);
    } catch (err) {
      setError('Failed to fetch users. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>GitHub User Search</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search GitHub users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {loading && <div className="spinner"></div>}
        </div>
      </header>

      <main className="results-container">
        {error && <p className="error-message">{error}</p>}
        
        {users.length > 0 ? (
          <div className="users-grid">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        ) : (
          !loading && searchTerm && <p>No users found. Try another search.</p>
        )}
      </main>

      <footer className="app-footer">
        <p>GitHub User Search Application</p>
      </footer>
    </div>
  );
}

export default App;
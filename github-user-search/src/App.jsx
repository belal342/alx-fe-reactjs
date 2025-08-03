import { useState, useEffect } from 'react';
import { searchUsers } from './services/githubApi';

import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchTerm.trim()) {
        handleSearch();
      } else {
        resetSearch();
      }
    }, 500);

    return () => clearTimeout(timerId);
  }, [searchTerm, page]);

  const resetSearch = () => {
    setUsers([]);
    setTotalResults(0);
    setPage(1);
    setHasMore(false);
    setError(null);
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchUsers(searchTerm, page);
      
      if (page === 1) {
        setUsers(data.items);
      } else {
        setUsers(prevUsers => [...prevUsers, ...data.items]);
      }
      
      setTotalResults(data.total_count);
      setHasMore(data.items.length > 0 && data.items.length < data.total_count);
    } catch (err) {
      setError(err.response?.status === 403 
        ? 'API rate limit exceeded. Please try again later.' 
        : 'Failed to fetch users. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
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
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="search-input"
            aria-label="Search GitHub users"
          />
          {loading && <div className="spinner" aria-label="Loading"></div>}
        </div>
        {totalResults > 0 && (
          <p className="results-count">
            Showing {users.length} of {totalResults} results
          </p>
        )}
      </header>

      <main className="results-container">
        {error && (
          <div className="error-message">
            <p>{error}</p>
            {error.includes('rate limit') && (
              <a 
                href="https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Learn about GitHub API rate limits
              </a>
            )}
          </div>
        )}
        
        {users.length > 0 ? (
          <>
            <div className="users-grid">
              {users.map((user) => (
                <UserCard key={`${user.id}-${user.login}`} user={user} />
              ))}
            </div>
            {hasMore && (
              <button 
                onClick={loadMore} 
                className="load-more"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            )}
          </>
        ) : (
          !loading && searchTerm && (
            <div className="empty-state">
              <p>No users found for "{searchTerm}"</p>
              <p>Try a different search term</p>
            </div>
          )
        )}
      </main>

      <footer className="app-footer">
        <p>GitHub User Search Application</p>
        <p className="api-info">
          <a 
            href="https://docs.github.com/en/rest/reference/search" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            GitHub API Documentation
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
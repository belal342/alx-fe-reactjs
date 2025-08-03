import axios from 'axios';

const BASE_URL = 'https://api.github.com';

/**
 * Fetches detailed data for a single GitHub user
 * @param {string} username - GitHub username to search for
 * @returns {Promise<Object>} User data object
 * @throws {Error} When user is not found or API request fails
 */
const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        ...(import.meta.env.VITE_APP_GITHUB_API_KEY && {
          Authorization: `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`
        })
      }
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error("Looks like we can't find the user");
    }
    if (error.response?.status === 403) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    throw new Error('Failed to fetch user data. Please try again.');
  }
};

/**
 * Searches for GitHub users with advanced filters
 * @param {Object} searchParams - Search parameters
 * @param {string} searchParams.username - Username to search for
 * @param {string} searchParams.location - Location filter
 * @param {number} searchParams.minRepos - Minimum repositories filter
 * @param {number} searchParams.followersMin - Minimum followers filter
 * @param {string} searchParams.language - Programming language filter
 * @param {number} page - Page number for pagination
 * @param {number} perPage - Results per page
 * @returns {Promise<Object>} Search results object
 * @throws {Error} When search fails
 */
const searchUsers = async (searchParams, page = 1, perPage = 10) => {
  try {
    // Construct query parameters
    const queryParts = [];
    
    // Basic username search
    if (searchParams.username) queryParts.push(`${searchParams.username} in:login`);
    
    // Advanced filters
    if (searchParams.location) queryParts.push(`location:${searchParams.location}`);
    if (searchParams.minRepos) queryParts.push(`repos:>=${searchParams.minRepos}`);
    if (searchParams.followersMin) queryParts.push(`followers:>=${searchParams.followersMin}`);
    if (searchParams.language) queryParts.push(`language:${searchParams.language}`);

    const query = queryParts.join(' ');
    
    // Explicit GitHub API search endpoint with all parameters
    const apiUrl = `https://api.github.com/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`;

    // Make the search request
    const searchResponse = await axios.get(apiUrl, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        ...(import.meta.env.VITE_APP_GITHUB_API_KEY && {
          Authorization: `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`
        })
      }
    });

    // Get detailed information for each user
    const usersWithDetails = await Promise.all(
      searchResponse.data.items.map(async (user) => {
        try {
          const userResponse = await axios.get(user.url, {
            headers: {
              Accept: 'application/vnd.github.v3+json',
              ...(import.meta.env.VITE_APP_GITHUB_API_KEY && {
                Authorization: `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`
              })
            }
          });
          return userResponse.data;
        } catch (error) {
          console.error(`Error fetching details for user ${user.login}:`, error);
          return user; // Return basic info if detailed fetch fails
        }
      })
    );

    return {
      ...searchResponse.data,
      items: usersWithDetails
    };

  } catch (error) {
    console.error('GitHub API error:', error);
    if (error.response?.status === 403) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    throw new Error("Looks like we can't find users matching these criteria");
  }
};

export { fetchUserData, searchUsers };
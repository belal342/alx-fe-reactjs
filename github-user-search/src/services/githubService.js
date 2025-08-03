import axios from 'axios';

const BASE_URL = 'https://api.github.com';
const SEARCH_USERS_ENDPOINT = `${BASE_URL}/search/users?q=`;

// Fetch detailed data for a single user
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
      throw new Error('User not found');
    }
    throw error;
  }
};

// Search for multiple users with advanced filters
const searchUsers = async (searchParams, page = 1, perPage = 10) => {
  try {
    // Construct query parameters with minRepos handling
    const queryParts = [];
    
    if (searchParams.username) queryParts.push(`${searchParams.username} in:login`);
    if (searchParams.location) queryParts.push(`location:${searchParams.location}`);
    if (searchParams.minRepos) queryParts.push(`repos:>=${searchParams.minRepos}`);
    if (searchParams.followersMin) queryParts.push(`followers:>=${searchParams.followersMin}`);
    if (searchParams.language) queryParts.push(`language:${searchParams.language}`);

    const query = queryParts.join(' ');

    // Make the search request using the explicit endpoint
    const searchResponse = await axios.get(
      `${SEARCH_USERS_ENDPOINT}${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          ...(import.meta.env.VITE_APP_GITHUB_API_KEY && {
            Authorization: `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`
          })
        }
      }
    );

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
    throw error;
  }
};

export { fetchUserData, searchUsers };
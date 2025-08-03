import axios from 'axios';

const searchUsers = async (searchParams, page = 1) => {
  try {
    // Construct the base query
    let queryParts = [];
    
    if (searchParams.username) queryParts.push(`${searchParams.username} in:login`);
    if (searchParams.location) queryParts.push(`location:${searchParams.location}`);
    if (searchParams.minRepos) queryParts.push(`repos:>=${searchParams.minRepos}`);
    if (searchParams.language) queryParts.push(`language:${searchParams.language}`);
    if (searchParams.followersMin) queryParts.push(`followers:>=${searchParams.followersMin}`);

    const query = queryParts.join(' ');
    
    const response = await axios.get(
      `https://api.github.com/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=10`,
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
      response.data.items.map(async (user) => {
        try {
          const userResponse = await axios.get(user.url);
          return {
            ...user,
            ...userResponse.data
          };
        } catch (error) {
          console.error(`Error fetching details for user ${user.login}:`, error);
          return user; // Return basic info if detailed fetch fails
        }
      })
    );

    return {
      ...response.data,
      items: usersWithDetails
    };

  } catch (error) {
    console.error('GitHub API error:', error);
    throw error;
  }
};

export { searchUsers };
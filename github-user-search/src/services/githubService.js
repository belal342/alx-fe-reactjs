import axios from 'axios';

const searchUsers = async (searchParams, page = 1) => {
  try {
    // Construct query string based on provided parameters
    let query = '';
    
    if (searchParams.username) query += `${searchParams.username} in:login`;
    if (searchParams.location) query += ` location:${searchParams.location}`;
    if (searchParams.reposMin) query += ` repos:>=${searchParams.reposMin}`;
    if (searchParams.followersMin) query += ` followers:>=${searchParams.followersMin}`;
    if (searchParams.language) query += ` language:${searchParams.language}`;

    const response = await axios.get(
      `https://api.github.com/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=12`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          ...(import.meta.env.VITE_APP_GITHUB_API_KEY && {
            Authorization: `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`
          })
        }
      }
    );

    // Get additional details for each user
    const usersWithDetails = await Promise.all(
      response.data.items.map(async user => {
        try {
          const userResponse = await axios.get(user.url);
          return userResponse.data;
        } catch {
          return user; // Fallback to basic info if detailed request fails
        }
      })
    );

    return {
      ...response.data,
      items: usersWithDetails
    };
  } catch (error) {
    throw error;
  }
};

export { searchUsers };
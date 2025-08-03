import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_GITHUB_API_URL,
  headers: import.meta.env.VITE_APP_GITHUB_API_KEY
    ? { Authorization: `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}` }
    : {},
});

export const searchUsers = async (username) => {
  try {
    const response = await api.get(`/search/users?q=${username}`);
    return response.data;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};
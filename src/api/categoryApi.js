const API_BASE_URL = import.meta.env.VITE_API_URL; // Replace with your backend API base URL
export const getCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  const data = await response.json()
  return data;
};
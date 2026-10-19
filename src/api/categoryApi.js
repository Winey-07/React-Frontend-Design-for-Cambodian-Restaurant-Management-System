// Read
const API_BASE_URL = import.meta.env.VITE_API_URL; // Replace with your backend API base URL
export const getCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  const data = await response.json();
  return data;
};
// Create
export const createCategories = async (name) => {
  const response = await fetch(`${API_BASE_URL}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  const data = await response.json();
  return data;
};
// update
export const updateCategories = async (id, name) => {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  const data = await response.json();
  return data;
};

// Delete
export const deleteCategories = async (id) => {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

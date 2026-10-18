const API_BASE_URL = import.meta.env.VITE_API_URL;

// Build query parameters
function buildQuery(params = {}) {
  if (typeof params === "string") {
    return params ? `search=${encodeURIComponent(params)}` : "";
  }

  // fix this for me
  const filtered = Object.entries(params).filter(
    ([_, val]) => val !== undefined && val !== null && val !== "",
  );

  return new URLSearchParams(filtered).toString();
}

// READ: Get all menu items or search/filter them
export async function getMenuItem(params = {}) {
  const query = buildQuery(params);

  const response = await fetch(
    `${API_BASE_URL}/menuItems${query ? `?${query}` : ""}`,
    {
      headers: { Accept: "application/json" },
    },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to fetch menu items (${response.status})`,
    );
  }

  return await response.json();
}

// READ: Search menu items by keyword
export async function getMenuItemDatas(search = "") {
  const query = buildQuery(search);

  const response = await fetch(
    `${API_BASE_URL}/menuItems${query ? `?${query}` : ""}`,
    {
      headers: { Accept: "application/json" },
    },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to search menu items (${response.status})`,
    );
  }

  return await response.json();
}

// READ: Get one menu item by ID
export async function getMenuItemById(id) {
  const response = await fetch(`${API_BASE_URL}/menuItems/${id}`, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to fetch menu #${id}`);
  }

  return await response.json();
}

// CREATE: Add a new menu item
export async function createMenuItem(itemData) {
  const response = await fetch(`${API_BASE_URL}/menuItems`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(itemData),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      data.message ||
      Object.values(data.errors || data.error || {})
        .flat()
        .join(" ") ||
      "Failed to create menu item";

    throw new Error(message);
  }

  return data;
}

// UPDATE: Modify an existing menu item
export async function updateMenuItem(id, itemData) {
  const response = await fetch(`${API_BASE_URL}/menuItems/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(itemData),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      data.message ||
      Object.values(data.errors || data.error || {})
        .flat()
        .join(" ") ||
      "Failed to update menu item";

    throw new Error(message);
  }

  return data;
}

// DELETE: Remove a menu item
export async function deleteMenuItem(id) {
  const response = await fetch(`${API_BASE_URL}/menuItems/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || `Failed to delete menu #${id}`);
  }

  return response.status === 204 ? null : await response.json();
}

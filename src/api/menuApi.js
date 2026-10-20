const API_BASE_URL =import.meta.env.VITE_API_URL;

//READ
export const getMenuItems = async () => {
    const response = await fetch(`${API_BASE_URL}/menu`);
    const data = await response.json();
    return data;
};

// CREATE
export const createMenuItems = async (formData) => {
    const response = await fetch(`${API_BASE_URL}/menu`, {
        method: "POST",
        body: formData,
    });
    const data = await response.json();
    return data;
};

// UPDATE
export const updateMenuItems = async (id, formData) => {
    const response = await fetch(`${API_BASE_URL}/menu/${id}`, {
        method: "PUT",
        body: formData,
    });
    const data = await response.json();
    return data;
}

// DELETE
export const deleteMenuItems = async (id) => {
    const response = await fetch(`${API_BASE_URL}/menu/${id}`, {
        method: "DELETE",
    });
    const data = await response.json();
    return data;
}
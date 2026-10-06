import { useState, useEffect } from "react";
import { menuItems as initialItems } from "../data/mockData.js";
import StatusBadge from "../components/StatusBadge.jsx";
import Modal from "../components/Modal.jsx";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../api/categoryApi.js";

export default function Categories() {
  const [categories, setCategories] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [name, setName] = useState("");

  const openAdd = () => {
    setEditingItem(null);
    setForm({ name: "", category: "Rice", price: "", status: "Available" });
    setIsModalOpen(true);
  };

  // Open modal in "Edit" mode, pre-filled with the item's data
  const openEdit = (item) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      category: item.category,
      price: item.price,
      status: item.status,
    });
    setIsModalOpen(true);
  };

  // const handleSave = (e) => {
  //   e.preventDefault();
  //   if (editingCategory) {
  //     setCategories(
  //       categories.map((c) =>
  //         c.id === editingCategory.id ? { ...c, name } : c,
  //       ),
  //     );
  //   } else {
  //     const newId = Math.max(...categories.map((c) => c.id), 0) + 1;
  //     setCategories([...categories, { id: newId, name, itemCount: 0 }]);
  //   }
  //   setIsModalOpen(false);
  // };

  // const handleSave = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (editingCategory){
  //       a
  //     }
  //   }
  //   catch (error) {

  //   }
  // }

  const handleDelete = () => {
    setItems(items.filter((i) => i.id !== deletingId));
    setIsDeleteOpen(false);
  };

  return (
    <div>
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#2C3E50]">Create Order</h2>
      </div>

      {/* Search + filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)} // update state on every keystroke
          className="border border-gray-200 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
        />
        {filters.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeFilter === cat
                ? "bg-[#E67E22] text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Food cards grid */}
      {filtered.length === 0 ? (
        // EMPTY STATE
        <div className="bg-white rounded-xl p-12 text-center">
          <p className="text-gray-500 text-lg">No food found</p>
          <p className="text-gray-400 text-sm">
            Try changing your search or filter
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              {/* Placeholder image box (no real images yet) */}
              <div className="h-32 bg-[#F8F9FA] rounded-lg flex items-center justify-center text-4xl mb-3">
                🍽️
              </div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-[#2C3E50]">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.category}</p>
                </div>
                <span className="font-bold text-[#E67E22]">
                  ${Number(item.price).toFixed(2)}
                </span>
              </div>
              <div>
                <StatusBadge status={item.status} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit modal */}
      <Modal
        isOpen={isModalOpen}
        title={editingItem ? "Edit Food" : "Add Food"}
        onClose={() => setIsModalOpen(false)}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
            >
              {filters
                .filter((f) => f !== "All")
                .map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Price (USD)
            </label>
            <input
              required
              type="number"
              step="0.1"
              min="0"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#E67E22] text-white font-medium hover:bg-[#d35400]"
            >
              {editingItem ? "Save Changes" : "Add Food"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete confirmation modal */}
      <Modal
        isOpen={isDeleteOpen}
        title="Delete Food"
        onClose={() => setIsDeleteOpen(false)}
      >
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this item? This cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsDeleteOpen(false)}
            className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg bg-[#E74C3C] text-white font-medium hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}
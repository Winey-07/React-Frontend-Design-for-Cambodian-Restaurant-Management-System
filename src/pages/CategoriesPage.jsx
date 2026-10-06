import { useEffect, useState } from "react";
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
    setEditingCategory(null);
    setName("");
    setIsModalOpen(true);
  };

  const openEdit = (cat) => {
    setEditingCategory(cat);
    setName(cat.name);
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
    setCategories(categories.filter((c) => c.id !== deletingId));
    setIsDeleteOpen(false);
  };

  const getDatas = async () => {
    const categoryData = await getCategories();
    // console.log(categoryData);

    setCategories(categoryData?.data);
  }


  useEffect(() => {
    // 1. Setup code (runs here)
    getDatas();
    
    

    return () => {
      // 2. Cleanup code (optional, runs before next effect or on unmount)
    };
  }, [/* 3. Dependency array */]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#2C3E50]">Categories</h2>
        <button
          onClick={openAdd}
          className="bg-[#E67E22] hover:bg-[#d35400] text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + Add Category
        </button>
      </div>

      {categories?.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <p className="text-gray-500">
            No categories yet. Click "+ Add Category" to create one.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories?.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold text-[#2C3E50]">{cat.name}</p>
                <span className="text-xs bg-[#F8F9FA] text-gray-500 px-2 py-1 rounded-full">
                  {cat.itemCount} items
                </span>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => openEdit(cat)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setDeletingId(cat.id);
                    setIsDeleteOpen(true);
                  }}
                  className="text-sm text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit modal */}
      <Modal
        isOpen={isModalOpen}
        title={editingCategory ? "Edit Category" : "Add Category"}
        onClose={() => setIsModalOpen(false)}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Category Name
            </label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              {editingCategory ? "Save Changes" : "Add"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete confirmation */}
      <Modal
        isOpen={isDeleteOpen}
        title="Delete Category"
        onClose={() => setIsDeleteOpen(false)}
      >
        <p className="text-gray-600 mb-6">
          Delete this category? Food items in it will keep their category name
          but the chip filter will disappear.
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

import { useState} from "react";
// import { menuItems as initialItems } from "../data/mockData.js";
import StatusBadge from "../components/StatusBadge.jsx";
import Modal from "../components/Modal.jsx";


export default function CreateOrderPage() {
  
  
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // --- កន្ត្រក (Cart) States ---
  const [cart, setCart] = useState([]);
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState("Table 1");
  
  const [form, setForm] = useState({
    name: "",
    category: "Rice",
    price: "",
    status: "Available",
  });

  // Fetch API data and normalize fields into the card items state
  // Fetch API data and normalize fields into the card items state
  

  const filters = ["All", ...new Set(items.map((i) => i.category))];

  const filtered = items.filter((item) => {
    const matchSearch = String(item.name || "").toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === "All" || item.category === activeFilter;
    return matchSearch && matchFilter;
  });

  // Add food item into កន្ត្រក and open the right-side panel
  const handleAddToCart = (food) => {
    setCart((prevCart) => {
      const existing = prevCart.find((cartItem) => cartItem.id === food.id);
      if (existing) {
        return prevCart.map((cartItem) =>
          cartItem.id === food.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...food, quantity: 1 }];
    });
    setIsBasketOpen(true);
  };

  // Adjust quantity (+ / -)
  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((cartItem) => {
          if (cartItem.id === id) {
            const nextQty = cartItem.quantity + delta;
            return nextQty > 0 ? { ...cartItem, quantity: nextQty } : null;
          }
          return cartItem;
        })
        .filter(Boolean)
    );
  };

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#2C3E50]">Create Order</h2>
      </div>

      {/* Main Split Layout */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Left Side: Food Grid */}
        <div className={`transition-all duration-300 w-full ${isBasketOpen ? "lg:w-2/3 xl:w-3/4" : "w-full"}`}>
          
          {/* Search + filters */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <input
              type="text"
              placeholder="Search food..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-200 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
            />
            {filters.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === cat
                    ? "bg-[#E67E22] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards Grid: When basket is open, show exactly 3 columns on large screens */}
          {filtered.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center">
              <p className="text-gray-500 text-lg">No food found</p>
              <p className="text-gray-400 text-sm">
                Try changing your search or filter
              </p>
            </div>
          ) : (
            <div
              className={`grid gap-4 ${
                isBasketOpen
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              }`}
            >
              {filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleAddToCart(item)}
                  className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md hover:border-[#E67E22]/50 border border-transparent transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="h-32 bg-[#F8F9FA] rounded-lg flex items-center justify-center text-4xl mb-3 overflow-hidden pointer-events-none">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <span>🍽️</span>
                    )}
                  </div>

                  <div className="flex items-start justify-between gap-2 pointer-events-none">
                    <div>
                      <p className="font-semibold text-[#2C3E50]">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.category}</p>
                    </div>
                    <span className="font-bold text-[#E67E22]">
                      ${Number(item.price).toFixed(2)}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between pointer-events-none">
                    <StatusBadge status={item.status} />
                    <span className="text-xs text-[#E67E22] font-semibold hover:underline">
                      + Add
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: កន្ត្រក ({totalQuantity}) Panel */}
        {isBasketOpen && (
          <div className="w-full lg:w-1/3 xl:w-1/4 bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col sticky top-6">
            {/* Header */}
            <div className="bg-[#2C3E50] text-white px-4 py-3 rounded-t-2xl flex items-center justify-between">
              <span className="font-bold text-sm">🛒 កន្ត្រក ({totalQuantity})</span>
              <button
                onClick={() => setIsBasketOpen(false)}
                className="text-gray-300 hover:text-white text-lg leading-none"
              >
                ✕
              </button>
            </div>

            {/* Table Selection */}
            <div className="p-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between text-xs">
              <span className="text-gray-600 font-medium">តុ (Table):</span>
              <select
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 bg-white outline-none"
              >
                <option value="Table 1">Table 1</option>
                <option value="Table 2">Table 2</option>
                <option value="Table 3">Table 3</option>
                <option value="Table 4">Table 4</option>
              </select>
            </div>

            {/* Cart Items */}
            <div className="p-3 max-h-[50vh] overflow-y-auto divide-y divide-gray-100">
              {cart.length === 0 ? (
                <p className="text-center text-gray-400 py-6 text-xs">គ្មានទំនិញក្នុងកន្ត្រក</p>
              ) : (
                cart.map((c) => (
                  <div key={c.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-gray-800">{c.name}</p>
                      <p className="text-[#E67E22]">${(c.price * c.quantity).toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(c.id, -1)}
                        className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 font-bold"
                      >
                        -
                      </button>
                      <span className="font-semibold">{c.quantity}</span>
                      <button
                        onClick={() => updateQuantity(c.id, 1)}
                        className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Total and Submit */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-col gap-2 rounded-b-2xl">
              <div className="flex justify-between items-center text-sm font-semibold text-gray-700">
                <span>សរុប (Total):</span>
                <span className="text-base text-[#E67E22]">${totalAmount.toFixed(2)}</span>
              </div>
              <button
                disabled={cart.length === 0}
                onClick={() => {
                  alert(`Order confirmed for ${selectedTable} - Total: $${totalAmount.toFixed(2)}`);
                  setCart([]);
                  setIsBasketOpen(false);
                }}
                className="w-full bg-[#27AE60] hover:bg-green-700 disabled:opacity-50 text-white py-2 rounded-lg font-bold text-xs transition"
              >
                Confirm Order
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Floating Re-Open Button when cart has items but basket is hidden */}
      {totalQuantity > 0 && !isBasketOpen && (
        <button
          onClick={() => setIsBasketOpen(true)}
          className="fixed bottom-6 right-8 bg-[#E67E22] text-white px-5 py-3 rounded-full shadow-lg hover:bg-[#d35400] transition flex items-center gap-2 z-40"
        >
          <span>🛒 កន្ត្រក ({totalQuantity})</span>
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-semibold">
            ${totalAmount.toFixed(2)}
          </span>
        </button>
      )}

      {/* Modals */}
      <Modal>
        <form>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
            />
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isDeleteOpen}
        title="Delete Food"
        onClose={() => setIsDeleteOpen(false)}
      >
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this item? This cannot be undone.
        </p>
      </Modal>
    </div>
  );
}
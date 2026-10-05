import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { message, Button, Spin } from "antd";
import { ArrowLeftOutlined, ReloadOutlined } from "@ant-design/icons";
import { orders as mockOrders } from "../data/mockData.js";

// API base URL for the backend.
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

// Local storage key for demo orders created while the backend is unavailable.
const DEMO_ORDER_STORAGE_KEY = "demo_orders";

// Read saved local orders from browser storage.
const readLocalOrders = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(DEMO_ORDER_STORAGE_KEY) || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
};

// Return a fallback order object when the API fails.
const getFallbackOrder = (id) => {
  const localOrder = readLocalOrders().find((order) => String(order.id) === String(id));
  if (localOrder) {
    return {
      ...localOrder,
      id: String(localOrder.id),
      customer_name: localOrder.customer_name ?? "Customer",
      customer_email: localOrder.customer_email ?? "N/A",
      phone: localOrder.phone ?? "N/A",
      address: localOrder.address ?? "N/A",
      total_amount: Number(localOrder.total_amount ?? 0),
      status: localOrder.status ?? "Pending",
      created_at: localOrder.created_at ?? new Date().toISOString(),
      items: Array.isArray(localOrder.items) && localOrder.items.length > 0 ? localOrder.items : [
        {
          name: "Sample item",
          quantity: 1,
          price: Number(localOrder.total_amount ?? 0),
        },
      ],
    };
  }

  const match = mockOrders?.find((order) => String(order.id) === String(id));

  if (!match) {
    return {
      id: String(id),
      customer_name: "Customer",
      customer_email: "N/A",
      phone: "N/A",
      address: "N/A",
      total_amount: 0,
      status: "Pending",
      items: [],
      created_at: new Date().toISOString(),
    };
  }

  return {
    ...match,
    id: String(match.id),
    customer_name: match.customer_name ?? match.name ?? "Customer",
    customer_email: match.customer_email ?? match.email ?? "N/A",
    phone: match.phone ?? "N/A",
    address: match.address ?? "N/A",
    total_amount: Number(match.total_amount ?? match.total ?? 0),
    status: match.status ?? "Pending",
    created_at: match.created_at ?? match.date ?? new Date().toISOString(),
    items: match.items ?? match.order_items ?? [
      {
        name: "Sample item",
        quantity: 1,
        price: Number(match.total_amount ?? match.total ?? 0),
      },
    ],
  };
};

function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Store the current order, loading state, and update status state.
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  // ==========================================
  // Fetch Order with Mock Fallback
  // ==========================================
  // Fetch the selected order from the API. If the backend is unavailable,
  // show a demo or local fallback so the page still works.
  const fetchOrder = (orderId) => {
    if (!orderId || orderId === ":id") return;

    setLoading(true);
    fetch(`${API_BASE_URL}/order/${orderId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const result = data?.data ?? data;
        setOrder({
          ...result,
          items: result.order_items ?? result.items ?? [],
          total_amount: Number(result.total_amount ?? result.total ?? 0),
        });
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        const fallbackOrder = getFallbackOrder(orderId);
        setOrder(fallbackOrder);
        message.warning("Backend unavailable: showing sample order detail.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrder(id);
  }, [id]);

  // ==========================================
  // Update Order Status
  // ==========================================
  // Change the status of the current order. If the backend is offline,
  // the UI still updates locally to keep the user experience smooth.
  const handleStatusChange = async (newStatus) => {
    setUpdating(true);
    try {
      const response = await fetch(`${API_BASE_URL}/order/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      message.success("Order status updated successfully!");
    } catch (err) {
      console.warn("Could not update backend status:", err.message);
      message.info("Updated locally (offline mode).");
    } finally {
      setOrder((prev) => (prev ? { ...prev, status: newStatus } : prev));
      setUpdating(false);
    }
  };

  // Return the CSS class for each order status badge.
  const getStatusBadge = (status) => {
    const s = String(status || "").toLowerCase();
    if (s === "pending") return "bg-amber-100 text-amber-800";
    if (s === "processing" || s === "preparing") return "bg-blue-100 text-blue-800";
    if (s === "completed") return "bg-green-100 text-green-800";
    if (s === "cancelled") return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  // Show a spinner while the order is loading.
  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <Spin size="large" />
      </div>
    );
  }

  // If no order exists, show a fallback empty state.
  if (!order) {
    return (
      <div className="max-w-md mx-auto my-16 text-center bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <p className="text-gray-500 mb-4">No order details found.</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  const items = order.items ?? order.order_items ?? [];

  return (
    <div className="max-w-4xl mx-auto my-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Button
            icon={<ArrowLeftOutlined />}
            size="small"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-2xl font-bold text-gray-800">Order Detail</h1>
          <span className="text-sm font-semibold text-gray-500">#{order.id}</span>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusBadge(order.status)}`}>
            {order.status || "Pending"}
          </span>
          <button
            type="button"
            onClick={() => fetchOrder(id)}
            className="text-gray-400 hover:text-gray-600 transition"
            title="Reload"
          >
            <ReloadOutlined />
          </button>
        </div>

        {/* Change Status Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="order-status" className="text-xs font-medium text-gray-600">
            Change Status:
          </label>
          <select
            id="order-status"
            value={order.status || "Pending"}
            disabled={updating}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="text-sm border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>


      {/* Purchased Items Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Purchased Items</h3>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-200 uppercase text-xs font-semibold">
              <tr>
                <th className="py-3 px-4">Item</th>
                <th className="py-3 px-4 text-center">Unit Price</th>
                <th className="py-3 px-4 text-center">Quantity</th>
                <th className="py-3 px-4 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.length > 0 ? (
                items.map((item, index) => {
                  const unitPrice = Number(item.price ?? 0);
                  const qty = Number(item.quantity ?? 1);
                  const subtotal = unitPrice * qty;

                  return (
                    <tr key={item.id ?? `${item.name}-${index}`} className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-800">
                        {item.product?.name || item.name || "Product Item"}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-600">
                        ${unitPrice.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-600">{qty}</td>
                      <td className="py-3 px-4 text-right font-medium text-gray-800">
                        ${subtotal.toFixed(2)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-gray-400">
                    No items available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Total Amount Summary */}
        <div className="mt-4 flex justify-end items-center gap-3">
          <span className="text-base font-semibold text-gray-700">Total Amount:</span>
          <span className="text-2xl font-bold text-blue-600">
            ${Number(order.total_amount ?? 0).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailPage ;
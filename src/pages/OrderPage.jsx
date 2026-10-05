import { useEffect, useState } from "react";
import { Flex, Space, Table, Tag, message, Button, Popconfirm } from "antd";
import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { orders as mockOrders } from "../data/mockData.js";

// Base API URL for the backend. If .env is missing, fall back to the local Laravel/Django default.
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

// Local storage key used to store orders created while the backend is offline.
const DEMO_ORDER_STORAGE_KEY = "demo_orders";

// Read saved local orders from the browser when the API is unavailable.
const readLocalOrders = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(DEMO_ORDER_STORAGE_KEY) || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
};

// Combine mock data with any local demo orders so the page still works without the API.
const fallbackOrders = () => {
  const localOrders = readLocalOrders();

  return [...mockOrders, ...localOrders].map((item, index) => ({
    ...item,
    key: String(item.id ?? index + 1),
    id: String(item.id ?? index + 1),
    customer_name: item.customer_name ?? `Customer ${index + 1}`,
    created_at: item.created_at ?? item.date ?? new Date().toISOString(),
    total_amount: Number(item.total_amount ?? item.total ?? 0),
    status: item.status ?? "Pending",
  }));
};

function OrderPage() {
  const navigate = useNavigate();

  // Navigate to the detail page of the selected order.
  const handleViewDetail = (id) => {
    navigate(`/orders-group/order/${id}`);
  };

  // State for orders list and loading indicator.
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);

  // =========================
  // 1. GET Orders List
  // =========================
  // Fetch all orders from the backend API.
  async function getOrders() {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/order`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const resData = await response.json();
      const list = Array.isArray(resData?.data)
        ? resData.data
        : Array.isArray(resData)
          ? resData
          : [];

      const normalizedData = list.map((item) => ({
        ...item,
        key: item.id ?? item._id,
        status: Array.isArray(item.status)
          ? item.status
          : item.status
            ? [item.status]
            : ["Pending"],
      }));

      setOrderData(normalizedData);
    } catch (error) {
      console.error("Failed to fetch orders:", error.message);
      // If the API fails, load local/mock data instead.
      setOrderData(fallbackOrders());
      message.warning("Backend is unavailable, so demo order data is shown instead.");
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // 2. DELETE Order
  // =========================
  // Delete an order from the API and update the UI immediately.
  const handleDeleteOrder = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/order/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      message.success("Order deleted successfully");
      // Update UI without re-fetching data from the server.
      setOrderData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete order:", error.message);
      message.error("Failed to delete order");
    }
  };

  // Run the fetch when this page loads.
  useEffect(() => {
    getOrders();
  }, []);

  // =========================
  // TABLE COLUMNS
  // =========================
  // Define the columns shown in the order list table.
  const columns = [
    {
     title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <a
          onClick={(e) => {
            e.preventDefault();
            handleViewDetail(id);
          }}
        >
          #{id}
        </a>
      ),
    },
    {
      title: "Customer",
      dataIndex: "customer_name",
      key: "customer_name",
      render: (text) => text || "N/A",
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "date",
      render: (date) => (date ? new Date(date).toLocaleDateString() : "N/A"),
    },
    {
      title: "Total Amount",
      key: "total_amount",
      render: (_, record) =>
        `$${Number(record.total_amount ?? record.totalAmount ?? 0).toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status = []) => {
        const tags = Array.isArray(status) ? status : [status];

        return (
          <Flex gap="small" align="center" wrap>
            {tags.map((tag) => {
              const lower = String(tag || "").toLowerCase();
              let color = "geekblue";

              if (lower === "pending") color = "volcano";
              if (lower === "cancelled") color = "red";
              if (lower === "completed") color = "green";
              if (lower === "processing" || lower === "preparing") color = "blue";

              return (
                <Tag color={color} key={tag}>
                  {String(tag).toUpperCase()}
                </Tag>
              );
            })}
          </Flex>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            size="small"
            onClick={() => handleViewDetail(record.id)}
          >
            View
          </Button>

          <Popconfirm
            title="Delete the order"
            description="Are you sure you want to delete this order?"
            onConfirm={() => handleDeleteOrder(record.id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Button type="link" danger size="small">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1
        style={{
          marginBottom: "20px",
          fontFamily: "Arial",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Orders
      </h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          justifyContent: "space-between",
        }}
      >
        <Button icon={<SearchOutlined />}>Search</Button>
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={() => navigate("/orders-group/order/create")}
        >
          Create Order
        </Button>
      </div>

      <Table
        loading={loading}
        columns={columns}
        dataSource={orderData}
        pagination={{
          pageSize: 10,
        }}
      />
    </div>
  );
}

export default OrderPage;
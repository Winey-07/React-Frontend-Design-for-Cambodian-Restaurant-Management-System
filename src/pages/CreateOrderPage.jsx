import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Form,
  Input,
  Button,
  Table,
  InputNumber,
  message,
  Space,
  Typography,
  Divider,
} from "antd";
import { ArrowLeftOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

// Base API URL for the backend. If the env variable is missing, use the default local API URL.
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

// Local storage key used to save demo orders when the backend is offline.
const DEMO_ORDER_STORAGE_KEY = "demo_orders";

// Save a created order to localStorage so the app can still display it offline.
const saveLocalOrder = (order) => {
  const stored = JSON.parse(localStorage.getItem(DEMO_ORDER_STORAGE_KEY) || "[]");
  const list = Array.isArray(stored) ? stored : [];
  const nextOrder = {
    ...order,
    id: order.id ?? `demo-${Date.now()}`,
    created_at: order.created_at ?? new Date().toISOString(),
    status: order.status ?? "Pending",
  };

  localStorage.setItem(
    DEMO_ORDER_STORAGE_KEY,
    JSON.stringify([...list, nextOrder]),
  );

  return nextOrder;
};

function CreateOrderPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // Product list state and selected item quantities.
  const [products, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch available products from the API when the page loads.
  useEffect(() => {
    setLoadingProducts(true);
    fetch(`${API_BASE_URL}/products`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load products");
        return res.json();
      })
      .then((data) => {
        setProducts(data?.data ?? data ?? []);
      })
      .catch((err) => {
        console.error("Error loading products:", err);
        // Fallback products for demo mode when the backend is unavailable.
        setProducts([
          { id: 1, name: "Beef Lok Lak", price: 15.0, stock: 20 },
          { id: 2, name: "Fish Amok", price: 25.0, stock: 15 },
          { id: 3, name: "Kuy Teav", price: 40.0, stock: 8 },
        ]);
      })
      .finally(() => setLoadingProducts(false));
  }, []);

  // Update quantity for a selected product.
  const handleQuantityChange = (productId, qty) => {
    setSelectedItems((prev) => {
      const updated = { ...prev };
      if (!qty || qty <= 0) {
        delete updated[productId];
      } else {
        updated[productId] = qty;
      }
      return updated;
    });
  };

  // Calculate the total amount based on selected products and quantities.
  const calculateTotal = () => {
    return Object.entries(selectedItems).reduce((sum, [productId, qty]) => {
      const product = products.find((p) => String(p.id) === String(productId));
      return sum + (product ? Number(product.price) * qty : 0);
    }, 0);
  };

  // Submit order data to the backend.
  const onFinish = async (customerValues) => {
    const itemsList = Object.entries(selectedItems).map(([productId, quantity]) => {
      const product = products.find((p) => String(p.id) === String(productId));
      return {
        product_id: Number(productId),
        name: product?.name,
        quantity: Number(quantity),
        price: Number(product?.price || 0),
      };
    });

    if (itemsList.length === 0) {
      message.error("Please select at least one product to order!");
      return;
    }

    const payload = {
      customer_name: customerValues.customer_name,
      customer_email: customerValues.customer_email,
      phone: customerValues.phone,
      address: customerValues.address,
      total_amount: calculateTotal(),
      status: "Pending",
      items: itemsList,
    };

    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server returned error: ${response.status}`);
      }

      const result = await response.json();
      message.success("Order created successfully!");

      const createdId = result?.data?.id ?? result?.id;
      if (createdId) {
        navigate(`/orders-group/order/${createdId}`);
      } else {
        navigate("/orders-group/order");
      }
    } catch (err) {
      // If the backend is down, save the order locally and continue in demo mode.
      const localOrder = saveLocalOrder({
        ...payload,
        id: `demo-${Date.now()}`,
        created_at: new Date().toISOString(),
      });

      console.error("Order creation failed, saved locally:", err);
      message.success("Order created successfully in demo mode.");
      navigate(`/orders-group/order/${localOrder.id}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Define the table columns for the product selection grid.
  const productColumns = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      render: (name, record) => (
        <div>
          <Text strong>{name}</Text>
          {record.stock !== undefined && (
            <div className="text-xs text-gray-500">In Stock: {record.stock}</div>
          )}
        </div>
      ),
    },
    {
      title: "Unit Price",
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (price) => `$${Number(price).toFixed(2)}`,
    },
    {
      title: "Quantity",
      key: "quantity",
      align: "center",
      render: (_, record) => (
        <InputNumber
          min={0}
          max={record.stock ?? 99}
          value={selectedItems[record.id] || 0}
          onChange={(val) => handleQuantityChange(record.id, val)}
        />
      ),
    },
    {
      title: "Subtotal",
      key: "subtotal",
      align: "right",
      render: (_, record) => {
        const qty = selectedItems[record.id] || 0;
        return `$${(qty * Number(record.price)).toFixed(2)}`;
      },
    },
  ];

  return (
    <div className="max-w-4xl mx-auto my-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200 mb-6">
        <Button
          icon={<ArrowLeftOutlined />}
          size="small"
          onClick={() => navigate(-1)}
        />
        <Title level={3} style={{ margin: 0 }}>
          Create New Order
        </Title>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ status: "Pending" }}
      >
       
        {/* Product Selection */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-1">Select Products</h3>
          <p className="text-sm text-gray-500 mb-3">
            Choose quantities for items you wish to add to this order.
          </p>
          <Table
            loading={loadingProducts}
            columns={productColumns}
            dataSource={products}
            rowKey="id"
            pagination={false}
            size="middle"
          />
        </div>

        {/* Total & Submit */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-200 mt-6">
          <div className="text-xl">
            <span className="font-semibold text-gray-700 mr-2">Total Amount:</span>
            <span className="text-2xl font-bold text-blue-600">
              ${calculateTotal().toFixed(2)}
            </span>
          </div>

          <Space size="middle">
            <Button onClick={() => navigate(-1)}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              icon={<ShoppingCartOutlined />}
              disabled={calculateTotal() === 0}
            >
              Submit Order
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrderPage;
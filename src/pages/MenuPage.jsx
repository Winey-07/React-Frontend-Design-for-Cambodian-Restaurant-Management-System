import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Tag,
  Popconfirm,
  message,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  getMenuItems,
  createMenuItems,
  updateMenuItems,
  deleteMenuItems,
} from "../api/menuApi";
import { getCategories } from "../api/categoryApi";

function MenuPage() {
  // --- STATE ---
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  // ✅ FIX: Start as `true` so we don't call setLoading(true) inside useEffect
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();

  // --- LOAD MENU ITEMS ---
  async function loadMenuItems(search = "") {
    try {
      const res = await getMenuItems(search);
      setItems(res.data || []);
    } catch (error) {
      console.error(error);
      message.error("Failed to load menu items");
    } finally {
      setLoading(false);
    }
  }

  // --- LOAD CATEGORIES ---
  async function loadCategories() {
    try {
      const res = await getCategories();
      setCategories(res.data || []);
    } catch (error) {
      console.error(error);
    }
  }

  // --- RUN ON PAGE LOAD ---
  useEffect(() => {
    loadMenuItems();
    loadCategories();
  }, []);


  // --- ADD BUTTON ---
  function handleAdd() {
    setEditingItem(null); // We are adding, not editing
    form.resetFields(); // Clear any old data in the form
    form.setFieldsValue({ status: "available" }); // Set default value
    setIsModalOpen(true); // Open the popup
  }

  function handleEdit(record) {
    setEditingItem(record); // Remember which item we are editing
    form.resetFields();
    form.setFieldsValue(record); // Fill the form with existing data
    setIsModalOpen(true);
  }

  // --- SAVE (Add new OR Update existing) ---
  async function handleSave() {
    try {
      // form.validateFields() returns the form values, or throws if invalid
      const values = await form.validateFields();

      if (editingItem) {
        // FIX #5: message.sucess → message.success
        await updateMenuItems(editingItem.id, values);
        message.success("Item updated successfully");
      } else {
        await createMenuItems(values);
        message.success("Item created successfully");
      }

      setIsModalOpen(false); // Close popup
      loadMenuItems(); // Refresh the table
    } catch (error) {
      console.error(error);
      message.error("Failed to save menu item");
    }
  }

  // --- DELETE ---
  async function handleDelete(id) {
    try {
      await deleteMenuItems(id);
      message.success("Item deleted successfully");
      loadMenuItems(); // Refresh the table
    } catch (error) {
      console.error(error);
      message.error("Failed to delete menu item");
    }
  }

  // --- TABLE COLUMNS ---
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      key: "category",
      render: (_, record) => record.category?.name || record.category_id || "—",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${Number(price || 0).toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "available" ? "green" : "default"}>{status}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        // FIX #12: "middle" not "medium"
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this item?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // FIX #7 & #8 & #9: Added the full return JSX with Table and Modal
  return (
    <div>
      {/* Page header with Add button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h2 style={{ margin: 0 }}>Menu Management</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Item
        </Button>
      </div>

      {/* The actual data table */}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={items}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      {/* Add / Edit popup */}
      <Modal
        title={editingItem ? "Edit Menu Item" : "Add Menu Item"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSave}
        okText={editingItem ? "Save Changes" : "Add Item"}
        cancelText="Cancel"
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Food Name"
            rules={[{ required: true, message: "Please enter the food name" }]}
          >
            <Input placeholder="e.g. Beef Lok Lak" />
          </Form.Item>

          <Form.Item
            name="category_id"
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select
              placeholder="Select a category"
              options={categories.map((c) => ({
                label: c.name,
                value: c.id,
              }))}
            />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price (USD)"
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="status" label="Status">
            <Select
              options={[
                { label: "Available", value: "available" },
                { label: "Unavailable", value: "unavailable" },
              ]}
            />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea
              rows={3}
              placeholder="Short description (optional)"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default MenuPage;

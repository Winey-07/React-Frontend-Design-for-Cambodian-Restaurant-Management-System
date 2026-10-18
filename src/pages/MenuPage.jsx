import { useEffect, useState } from "react";
import { Flex, Space, Table, Tag, message } from "antd";
import {
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../api/menuApi";
import { getCategories } from "../api/categoryApi";

function MenuPage() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(false);

  async function loadMenuItems(search = " ") {
    setLoading(true);
    try {
      const res = await getMenuItem(search);
      setItems(res.data || []);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadCategories() {
    try {
      const res = await getCategories();
      setCategories(res.data || []);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadMenuItems();
    loadCategories();
  }, []);

  function handleAdd() {
    setEditingItem(null);
    form.resetFields();
    form.setFieldsValue(record);
    setIsModalOpen(true);
  }
  function handleEdite() {
    setEditingMenuItem(null);
    form.resetFields();
    form.setFieldsValue(record);
    setIsModalOpen(true);
  }

  async function handleSave() {
    try {
      const values = await form.validateFields();
      if (editingItem) {
        await updateMenuItem(editingItem.id, values);
        message.sucess("Item updated sucessfully");
      } else {
        await createMenuItem(values);
        message.sucess("Item");
      }
    } catch (error) {
      message.error(error);
      message.error("Failed to delete menu item");
    }
  }

  // Table column
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
 
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <Flex gap="small" align="center" wrap>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "kawaii") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </Flex>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="medium">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
}

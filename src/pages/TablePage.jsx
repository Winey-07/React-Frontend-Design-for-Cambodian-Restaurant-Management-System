import { useEffect, useState } from "react";
import { Row, Col, Modal, Typography, List, Tag, Form, Input, InputNumber, Select, Button } from "antd";
import TableCard from "../components/TableCard.jsx";
import { PlusOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const TablePage = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tableData, setTableData] = useState(null);

  // State and Form for Create Modal
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Get data from backend
  async function getTables() {
    try {
      const data = await fetch(import.meta.env.VITE_API_URL + '/tables');
      setTableData(await data.json());
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  }

  // Use an empty dependency array [] instead of [1] to run only on mount
  useEffect(() => {
    getTables();
  }, []);

  // Create data
  async function createTable(newCreateData) {
    try {
      // Fixed missing slash in the URL
      const response = await fetch(import.meta.env.VITE_API_URL + '/tables', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(newCreateData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const createTableData = await response.json();
      console.log('Success (Create):', createTableData);
      return createTableData;
    } catch (error) {
      console.error('Error in createTable:', error.message);
    }
  }

  // Missing function added to handle form submission
  const handleCreateTableSubmit = async (values) => {
    await createTable(values);
    handleCloseCreateModal();
    getTables(); // Refresh the table list after creating
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "green";
      case "occupied":
        return "red";
      case "reserved":
        return "orange";
      default:
        return "default";
    }
  };

  const handleTableClick = (table) => {
    setSelectedTable(table);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedTable(null);
  };

  // --- Handlers for Create Modal ---
  const handleOpenCreateModal = () => {
    setIsCreateModalVisible(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalVisible(false);
    form.resetFields(); // Clear form inputs when closed
  };

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title level={2}>Tables</Title>
        {/* Added onClick handler to open the modal */}
        <Button 
          type="primary" 
          shape="round" 
          icon={<PlusOutlined />} 
          size={"large"} 
          onClick={handleOpenCreateModal}
        >
          Create
        </Button>
      </div>
      
      <Row gutter={[16, 16]}>
        {tableData?.data?.map((table) => (
          <Col xs={24} sm={12} md={8} lg={6} key={table.id}>
            <TableCard 
              table={table} 
              onClick={handleTableClick} 
              getStatusColor={getStatusColor} 
            />
          </Col>
        ))}
      </Row>

      {/* Info Modal */}
      <Modal
        title="Table Information"
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        {selectedTable && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              <Text strong>Table Number: </Text>
              <Text>{selectedTable.table_number}</Text>
            </div>
            <div>
              <Text strong>Capacity: </Text>
              <Text>{selectedTable.capacity} Seats</Text>
            </div>
            <div>
              <Text strong>Status: </Text>
              <Tag color={getStatusColor(selectedTable.status)}>{selectedTable.status}</Tag>
            </div>
            <div>
              <Text strong>Current Order: </Text>
              {selectedTable.currentOrder ? (
                <List
                  size="small"
                  bordered
                  dataSource={selectedTable.currentOrder}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                  style={{ marginTop: "8px" }}
                />
              ) : (
                <Text type="secondary"> No current orders.</Text>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Create Modal */}
      <Modal
        title="Create New Table"
        open={isCreateModalVisible}
        onOk={form.submit}
        onCancel={handleCloseCreateModal}
        okText="Create"
      >
        <Form 
          form={form} 
          layout="vertical" 
          onFinish={handleCreateTableSubmit}
          initialValues={{ status: "available" }}
        >
          <Form.Item 
            name="table_number" 
            label="Table Number" 
            rules={[{ required: true, message: "Please enter the table number" }]}
          >
            <Input placeholder="e.g., 06" />
          </Form.Item>
          
          <Form.Item 
            name="capacity" 
            label="Capacity (Seats)" 
            rules={[{ required: true, message: "Please enter the seating capacity" }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} placeholder="e.g., 4" />
          </Form.Item>

          <Form.Item 
            name="status" 
            label="Initial Status" 
            rules={[{ required: true, message: "Please select a status" }]}
          >
            {/* Fixed Select Options syntax */}
            <Select>
              <Select.Option value="available">Available</Select.Option>
              <Select.Option value="occupied">Occupied</Select.Option>
              <Select.Option value="reserved">Reserved</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TablePage;
import React, { useState } from "react";
import { Row, Col, Modal, Typography, List, Tag } from "antd";
import TableCard from "../components/TableCard.jsx";

const { Title, Text } = Typography;

const mockTables = [
  { id: 1, number: "01", capacity: 2, status: "Available", currentOrder: null },
  { id: 2, number: "02", capacity: 4, status: "Occupied", currentOrder: ["Beef Lok Lak", "Iced Coffee"] },
  { id: 3, number: "03", capacity: 2, status: "Reserved", currentOrder: null },
  { id: 4, number: "04", capacity: 6, status: "Available", currentOrder: null },
  { id: 5, number: "05", capacity: 8, status: "Occupied", currentOrder: ["Fish Amok", "Spring Rolls", "Rice"] },
];

const TablePage = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "green";
      case "Occupied":
        return "red";
      case "Reserved":
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

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Tables</Title>
      
      <Row gutter={[16, 16]}>
        {mockTables.map((table) => (
          <Col xs={24} sm={12} md={8} lg={6} key={table.id}>
            <TableCard 
              table={table} 
              onClick={handleTableClick} 
              getStatusColor={getStatusColor} 
            />
          </Col>
        ))}
      </Row>

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
              <Text>{selectedTable.number}</Text>
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
    </div>
  );
};

export default TablePage;
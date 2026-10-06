import { useEffect, useState } from "react";
import { Row, Col, Modal, Typography, List, Tag } from "antd";
import { Button,} from 'antd';
import TableCard from "../components/TableCard.jsx";
import { PlusOutlined  } from "@ant-design/icons";

const { Title, Text } = Typography;

const mockTables = [
  { id: 1, table_number: "01", capacity: 2, status: "Available", currentOrder: null },
  { id: 2, table_number: "02", capacity: 4, status: "Occupied", currentOrder: ["Beef Lok Lak", "Iced Coffee"] },
  { id: 3, table_number: "03", capacity: 2, status: "Reserved", currentOrder: null },
  { id: 4, table_number: "04", capacity: 6, status: "Available", currentOrder: null },
  { id: 5, table_number: "05", capacity: 8, status: "Occupied", currentOrder: ["Fish Amok", "Spring Rolls", "Rice"] },
];


const TablePage = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tableData, setTableData] = useState(null);

  //get data from backend
  async function getTables(){
    const data = await fetch(import.meta.env.VITE_API_URL+'/tables');
    setTableData(await data.json());
  }

  useEffect(() => {
    getTables()
  },[1]);
  console.log(tableData);

  //create data
  async function createTable(newCreateData) {
    try{
      const response = await fetch(import.meta.env.VITE_API_URL+'tables',{
        method:'POST',
        headers:{
          'Content-Type':'application/json; charset=UTF-8',
        },
        body: JSON.stringify(newCreateData),
      });
      if (!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const createTableData = await response.json();
      console.log('Success (Create):', createTableData);
      return createTableData;
    } catch (error)  {
      console.error('Error in createTable:', error.message);
      }
      
  }

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


  return (
    <div style={{ padding: "24px" , }}>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <Title level={2}>Tables</Title>
      <Button type="primary" shape="round" icon={<PlusOutlined />} size={"large"}>
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
      {/* <Modal>
        title="Create Table Information"
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}

      </Modal> */}
    </div>
  );
};

export default TablePage;
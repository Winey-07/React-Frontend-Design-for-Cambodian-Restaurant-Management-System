import React from "react";
import { Card, Typography, Tag } from "antd";

const { Title } = Typography;

const TableCard = ({ table, onClick, getStatusColor }) => {
  return (
    <Card
      hoverable
      onClick={() => onClick(table)}
      style={{ textAlign: "center", cursor: "pointer" }}
    >
      <Title level={4}>TABLE {table.number}</Title>
      <p>{table.capacity} Seats</p>
      <Tag color={getStatusColor(table.status)}>{table.status}</Tag>
    </Card>
  );
};

export default TableCard;
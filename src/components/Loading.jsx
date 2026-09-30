import React from "react";
import { Spin } from "antd";

const Loading = () => {
  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "50vh", /* Adjust based on your layout needs */
      width: "100%"
    }}>
      <Spin size="large" tip="Loading reports..." />
    </div>
  );
};

export default Loading;
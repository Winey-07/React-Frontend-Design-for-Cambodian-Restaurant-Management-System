import React, { useState, useEffect } from "react";
import { Card, Row, Col, Typography, Statistic } from "antd";
import Loading from "../components/Loading.jsx";

const { Title } = Typography;

const ReportPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a data fetching delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  
  const mockChartData = [
    { label: "Mon", height: "30%" },
    { label: "Tue", height: "45%" },
    { label: "Wed", height: "25%" },
    { label: "Thu", height: "80%" },
    { label: "Fri", height: "60%" },
    { label: "Sat", height: "100%" },
    { label: "Sun", height: "70%" },
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Reports</Title>
      
      {/* Summary Statistics */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic 
              title="Today's Sales" 
              value={125.50} 
              precision={2} 
              prefix="$" 
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic 
              title="This Week" 
              value={820.00} 
              precision={2} 
              prefix="$" 
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic 
              title="Total Orders" 
              value={14} 
            />
          </Card>
        </Col>
      </Row>

      {/* Simple CSS Bar Chart */}
      <Card 
        style={{ marginTop: "24px" }} 
        title="Sales Overview (This Week)"
      >
        <div style={{ 
          display: "flex", 
          alignItems: "flex-end", 
          height: "200px", 
          gap: "16px", 
          paddingTop: "10px" 
        }}>
          {mockChartData.map((data, index) => (
            <div 
              key={index} 
              style={{ 
                flex: 1, 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                height: "100%" 
              }}
            >
              {/* Bar Container */}
              <div style={{ 
                flex: 1, 
                display: "flex", 
                alignItems: "flex-end", 
                width: "100%", 
                justifyContent: "center" 
              }}>
                {/* The Bar */}
                <div style={{ 
                  width: "100%", 
                  maxWidth: "40px", 
                  backgroundColor: "#1677ff", 
                  height: data.height, 
                  borderRadius: "4px 4px 0 0",
                  transition: "height 0.5s ease-out" // Added a slight animation
                }}></div>
              </div>
              {/* Label */}
              <span style={{ 
                marginTop: "8px", 
                fontSize: "12px", 
                color: "#8c8c8c" 
              }}>
                {data.label}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ReportPage;
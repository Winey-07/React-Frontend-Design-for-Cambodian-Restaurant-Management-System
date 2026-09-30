import { useLocation, useNavigate } from "react-router";
import { Menu } from "antd";
import {
  HomeOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  TableOutlined,
  CoffeeOutlined,
  AppstoreOutlined,
  CreditCardOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

function Navigation({ isCollapsed }) {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { key: "/", icon: <HomeOutlined />, label: "Dashboard" },
    {
      key: "orders-group",
      icon: <PlusCircleOutlined />,
      label: "Orders",
      children: [
        { key: "/order", icon: <PlusCircleOutlined />, label: "All Orders" },
        {
          key: "/order/create-order",
          icon: <PlusOutlined />,
          label: "Create Order",
        },
      ],
    },
    { key: "/table", icon: <TableOutlined />, label: "Tables" },
    { key: "/menu", icon: <CoffeeOutlined />, label: "Menu" },
    { key: "/category", icon: <AppstoreOutlined />, label: "Categories" },
    { key: "/payment", icon: <CreditCardOutlined />, label: "Payments" },
    { key: "/report", icon: <BarChartOutlined />, label: "Reports" },
    { key: "logout", icon: <LogoutOutlined />, label: "Log Out", danger: true },
  ];

  const activeKey = location.pathname;

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      navigate("/log-out");
      return;
    }
    if (key.startsWith("/")) navigate(key);
  };

  return (
    <div className="nav-container">
      <div
        className="brand"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        <span className="brand-mark">S</span>
        {!isCollapsed && <span className="nav-label">Stock Starter</span>}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[activeKey]}
        defaultOpenKeys={["orders-group"]}
        items={menuItems}
        onClick={handleMenuClick}
        style={{ borderRight: 0, background: "transparent" }}
      />
    </div>
  );
}

export default Navigation;

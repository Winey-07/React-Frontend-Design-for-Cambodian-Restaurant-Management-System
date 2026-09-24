import { useLocation, useNavigate } from "react-router";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  HomeOutlined,
  PlusCircleOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  PlusOutlined,
  // AntDesignOutlined,
} from "@ant-design/icons";

function Navigation({ isCollapsed }) {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: "Dashboard",
    },
    {
      key: "/Dashboard",
      icon: <AppstoreOutlined />,
      label: "Dashboard",
    },
    {
      key: "/order",
      icon: <PlusCircleOutlined />,
      label: "Orders",
    },
    {
      key: "/table",
      icon: <PlusOutlined />,
      label: "Table",
    },

    {
      key: "order",
      icon: <TeamOutlined />,
      label: "Orders",
      children: [
        {
          key: "/order/createOrder",
          icon: <UserOutlined />,
          label: "Create Order",
        },
      ],
    },
        {
      key: "/menu",
      icon: <UserOutlined />,
      label: "Menu",
    },
    {
      key: "/category",
      icon: <ShopOutlined />,
      label: "Categories",
    },
    {
      key: "/payment",
      icon: <ShopOutlined />,
      label: "Payments",
    },
    {
      key: "/report",
      icon: <ShopOutlined />,
      label: "Reports",
    },
    {
      key: "/log-in",
      icon: <ShopOutlined />,
      label: "Log Out",
    },
  ];

  // Find active key based on current pathname
  const activeKey = location.pathname;

  const handleMenuClick = ({ key }) => {
    if (key.startsWith("/")) {
      navigate(key);
    }
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
        defaultOpenKeys={["team-group"]}
        items={menuItems}
        onClick={handleMenuClick}
        style={{ borderRight: 0, background: "transparent" }}
      />
    </div>
  );
}

export default Navigation;

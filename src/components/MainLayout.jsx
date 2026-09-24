import { useState } from "react";
import { Outlet, useLocation, Link } from "react-router";
import { Layout, Breadcrumb, Typography } from "antd";
import Navbar from "./Navbar.jsx";

const { Header, Content, Sider, Footer } = Layout;
const { Text } = Typography;

function MainLayout() {
    const [collapsed, setCollapsed] = useState(false)
    const location = useLocation()
    const breadcrumbMap = {
    "/": ["Dashboard"],
    "/Dashbord": ["Dashboard"],
    "/order": ["Orders"],
    "/tables": ["Tables"],
    "/order/createOrder": ["Create Order"],
    "/menu": ["Menu"],
    "/category": ["Categories"],
    "/payment": ["Payments"],
    "/report": ["Reports"],
    "/login": ["Log Out"],
    };

const currentBreadcrumbs = breadcrumbMap[location.pathname] || ["Overview"];

const breadcrumbItems = [
  {
    title: <Link to="/">Inventory</Link>,
  },
  ...currentBreadcrumbs.map((crumb, index) => ({
    title:
      index === currentBreadcrumbs.length - 1 ? crumb : <Text>{crumb}</Text>,
  })),
];

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  width: "calc(50% - 8px)",
  maxWidth: "calc(50% - 8px)",
};

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
};
const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#0958d9",
};
const siderStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#1677ff",
};

return (
  <Layout style={layoutStyle}>
    <Header style={headerStyle}>Header</Header>
    <Layout>
      <Sider width="25%" style={siderStyle}>
        Sider
      </Sider>
      <Content style={contentStyle}>Content</Content>
    </Layout>
  </Layout>
);
}
export default MainLayout;

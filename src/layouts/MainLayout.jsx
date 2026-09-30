import { useState } from "react";
import { Outlet, useLocation, Link } from "react-router";
import { Layout, Typography, Breadcrumb } from "antd";
import Sidebar from "../components/Sidebar.jsx";

const { Header, Content, Sider } = Layout;
const { Text } = Typography;

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const breadcrumbMap = {
    "/": ["Dashboard"],
    "/dashboard": ["Dashboard"],
    "/order": ["Orders"],
    "/order/create-order": ["Orders", "Create Order"],
    "/table": ["Tables"],
    "/menu": ["Menu"],
    "/category": ["Categories"],
    "/payment": ["Payments"],
    "/report": ["Reports"],
    "/log-out": ["Log Out"],
  };

  const currentBreadcrumbs = breadcrumbMap[location.pathname] || ["Overview"];

  const breadcrumbItems = [
    { title: <Link to="/">Inventory</Link> },
    ...currentBreadcrumbs.map((crumb, index) => ({
      title:
        index === currentBreadcrumbs.length - 1 ? crumb : <Text>{crumb}</Text>,
    })),
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={220}
        style={{ background: "#001529" }}
      >
        <Sidebar isCollapsed={collapsed} />
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Breadcrumb items={breadcrumbItems} />
        </Header>

        <Content style={{ padding: "24px", background: "#f5f5f5" }}>
          {/* Outlet is mandatory for React Router layout nesting */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;

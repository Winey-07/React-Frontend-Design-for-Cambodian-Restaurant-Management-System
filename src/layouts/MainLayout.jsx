import { useState } from "react";
import { Outlet, useLocation, Link } from "react-router";
import { Layout, Typography, Breadcrumb } from "antd";
import Navigation from "../components/Navigation.jsx";

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
            padding: "0 24px",
            background: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #e8e8e8",
            height: 56,
            lineHeight: "56px",
          }}
        >
          <div
            className="window-controls"
            aria-hidden="true"
            style={{ display: "flex", gap: 8, alignItems: "center" }}
          >
            <span className="window-dot red" />
            <span className="window-dot yellow" />
            <span className="window-dot green" />
          </div>
          <Text type="secondary" style={{ fontSize: 13, fontWeight: 500 }}>
            Sery Mom Resturant • Logo
          </Text>
        </Header>

        <Content style={{ padding: "24px", background: "#f5f5f5" }}>
          <Breadcrumb items={breadcrumbItems} style={{ marginBottom: 16 }} />
          <div
            className="content-surface"
            style={{
              padding: 28,
              background: "#ffffff",
              borderRadius: 10,
              minHeight: "calc(100vh - 180px)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            {/* Outlet is mandatory for React Router layout nesting */}
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;

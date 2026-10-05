import { Route, Routes } from "react-router";

import MainLayout from "./layouts/MainLayout.jsx";

import CategoriesPage from "./pages/CategoriesPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import OrderDetailPage from "./pages/OrderDetailPage.jsx";
import CreateOrderPage from "./pages/CreateOrderPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

import OrderLayout from "./pages/OrderLayout.jsx";

import "./index.css";

function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<LoginPage />} />

      {/* Main Layout Wraps All Authenticated Routes */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/category" element={<CategoriesPage />} />
        <Route path="/menu" element={<MenuPage />} />

        {/* Order Routes */}
        <Route path="/orders-group" element={<OrderLayout />}>
          <Route
            index
            element={
              <p>Select All Order or Create Order from the sidebar.</p>
            }
          />
          <Route path="/orders-group/order" element={<OrderPage />} />
          <Route path="/orders-group/order/create" element={<CreateOrderPage />} />
          <Route path="/orders-group/order/:id" element={<OrderDetailPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
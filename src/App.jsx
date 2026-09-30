import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import MainLayout from "./layouts/MainLayout.jsx";
// import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import StatusBadge from "./components/StatusBadge.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import "./index.css";
import OrderPage from "./pages/OrderPage.jsx";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/category" element={<CategoriesPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/orders-group" element={<OrderLayout />} />
          <Route path="/Orders" element={<OrderPage />} />
          {/* <Rout /> */}
        <Route />
      </Route>
    </Routes>
  );
}

export default App;

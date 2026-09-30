import { Route, Routes } from "react-router";

import MainLayout from "./layouts/MainLayout.jsx";
import Sidebar from "./components/Sidebar.jsx";
import StatusBadge from "./components/StatusBadge.jsx";

import CategoriesPage from "./pages/CategoriesPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MenuPage from "./pages/MenuPage.jsx";
<<<<<<< HEAD
=======
import TablePage from "./pages/TablePage.jsx";
import ReportPage from "./pages/ReportPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import "./index.css";
>>>>>>> origin/main
import OrderPage from "./pages/OrderPage.jsx";
import OrderDetailPage from "./pages/OrderDetailPage.jsx";
import CreateOrderPage from "./pages/CreateOrderPage.jsx";

import OrderLayout from "./pages/OrderLayout.jsx";

import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/category" element={<CategoriesPage />} />
        <Route path="/menu" element={<MenuPage />} />
<<<<<<< HEAD
        
        {/* Nested Order Routes under OrderLayout */}
        <Route path="/orders-group" element={<OrderLayout />}>
          <Route index element={<p>Select All Order or Create Order from the sidebar.</p>} />
          <Route path="order" element={<OrderPage />} />
          <Route path="create-order" element={<CreateOrderPage />} />
          <Route path="order/:id" element={<OrderDetailPage />} />
        </Route>
=======
        <Route path="/table" element={<TablePage/>} />
        <Route path="/report" element={<ReportPage/>}/>
>>>>>>> origin/main
      </Route>
      
    </Routes>
  );
}

export default App;
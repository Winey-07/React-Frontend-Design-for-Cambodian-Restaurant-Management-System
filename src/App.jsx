import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import MainLayout from "./layouts/MainLayout.jsx";
// import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import StatusBadge from "./components/StatusBadge.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import TablePage from "./pages/TablePage.jsx";
import ReportPage from "./pages/ReportPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
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
        <Route path="/table" element={<TablePage/>}/>
        <Route path="/report" element={<ReportPage/>}/>
        
      </Route>
      
    </Routes>
  );
}

export default App;

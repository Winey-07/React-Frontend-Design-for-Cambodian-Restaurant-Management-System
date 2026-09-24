import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import Layout from "../components/MainLayout.jsx";
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import MenuPage from '../pages/MenuPage.jsx';
import TablePage from '../pages/TablePage.jsx';
import ReportPage from '../pages/ReportPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';


function Reaksa(){
    return (
        <BrowserRouter>
        <Routes>
            <Route element={<Layout/>}/>
            <Route element={<Navbar/>}/>
            <Route element={<Sidebar/>}>
            <Route path="/" element={<Categories/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/category" element={<Categories/>}/>
            <Route path="/menu" element={<MenuPage/>}/>
            <Route path="/table" element={<TablePage/>}/>
            <Route path="/reports" element={<ReportPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            </Route>
        </Routes>
        </BrowserRouter>
    )
}

export default Reaksa;
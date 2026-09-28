import { useState, useEffect } from "react";
import { Link } from "react-router";
import MainLayout from "../components/MainLayout.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import Sidebar from "../components/Sidebar.jsx";

function Dashboard() {
  // memory box
  // useState -- lets a component remember data.
  const [summary, setSummary] = useState(null); //null or empty string
  const [recentOrders, setRecentOrders] = useState([]); // empty array
  const [popularFood, setPopularFood] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect -- lets a component do something once at a specific moment
  // (like fetching data when the page first appears).

  //  useEffect: fetching data when the page loads
  useEffect(() => {
    const loadDashbord = async () => {
      try {
        // useful for re-run this function later
        setLoading(true);
        // this fires all 3 requests at the same time and waits for them to finish
        const [summaryDate, ordersDate, popularDate] = await Promise.all([
          // these 3 are called at the same time
          getDashboardSummary({todaySales: 150, todayOrders: 5, pendingOrders: 2, availableTables: 10}),
          getRecentOrders({ id: 101, table: "Table 3", total: 45.00, status: "Pending" }),
          getPopularItems({ id: 1, name: "Burger", category: "Fast Food", price: 12.99 }),
          // promise.all wait for the 3 to finish
          // once they finish, their results are unpacked into summaryData, ordersData, and popularData.
        ]);

        // Use when fetching API
        // These lines pin the fetched data into the memory boxes (state).
        // Once these are called, React knows the data changed and will re-render the page to show it.
        // setSummary(summaryDate);
        // setRecentOrders(ordersDate);
        // setPopularFood(popularDate);
        // setError(null);


      } catch (err) {
        setError("Failed to load dashboard.");
      } finally {
        // finally runs no matter what, success or failure.
        // It turns the loading state off.
        setLoading(false);
      }
    };
    loadDashbord();
  }, []);
  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-red-700 font-bold text-lg mb-2">Error</h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  // Use API data, but fall back to 0 if something is missing
  const todaysSales = summary?.todaySales ?? 0;
  const todaysOrders = summary?.todayOrders ?? 0;
  const pendingOrders = summary?.pendingOrders ?? 0;
  const availableTables = summary?.availableTables ?? 0;

  return (
   
  );
}

export default Dashboard;

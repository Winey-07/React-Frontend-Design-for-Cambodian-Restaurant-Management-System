import { useState, useEffect } from "react";
import { Link } from "react-router";
import MainLayout from "../layouts/MainLayout.jsx";
import StatusBadge from "../components/StatusBadge.jsx";

const getDashboardSummary = () =>
  Promise.resolve({
    todaySales: 150,
    todayOrders: 10,
    pendingOrders: 2,
    avaibleTables: 10,
  });
const getRecentOrders = () =>
  Promise.resolve([
    { id: 101, table: "Table 3", total: 45.0, status: "Pending" },
    { id: 102, table: "Table 1", total: 28.5, status: "Completed" },
  ]);

const getPopularItems = () =>
  Promise.resolve([
    { id: 1, name: "Burger", category: "Fast Food", price: 12.99 },
    { id: 2, name: "Pizza", category: "Fast Food", price: 15.99 },
  ]);

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
    const loadDashboard = async () => {
      try {
        // useful for re-run this function later
        setLoading(true);
        // this fires all 3 requests at the same time and waits for them to finish
        const [summaryDate, ordersDate, popularDate] = await Promise.all([
          // these 3 are called at the same time
          getDashboardSummary(),
          getRecentOrders(),
          getPopularItems(),
          // promise.all wait for the 3 to finish
          // once they finish, their results are unpacked into summaryData, ordersData, and popularData.
        ]);

        // Use when fetching API
        // These lines pin the fetched data into the memory boxes (state).
        // Once these are called, React knows the data changed and will re-render the page to show it.
        setSummary(summaryDate);
        setRecentOrders(ordersDate);
        setPopularFood(popularDate);
        setError(null);
      } catch (err) {
        setError("Failed to load dashboard.");
      } finally {
        // finally runs no matter what, success or failure.
        // It turns the loading state off.
        setLoading(false);
      }
    };
    loadDashboard();
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
    <div>
      {/* Page title */}
      <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-[#E67E22]">
          <p className="text-sm text-gray-500 mb-1">Today's Sales</p>
          <p className="text-2xl font-bold text-[#2C3E50]">
            ${Number(todaysSales).toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
          <p className="text-sm text-gray-500 mb-1">Today's Orders</p>
          <p className="text-2xl font-bold text-[#2C3E50]">{todaysOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-[#F1C40F]">
          <p className="text-sm text-gray-500 mb-1">Pending Orders</p>
          <p className="text-2xl font-bold text-[#2C3E50]">{pendingOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-[#27AE60]">
          <p className="text-sm text-gray-500 mb-1">Available Tables</p>
          <p className="text-2xl font-bold text-[#2C3E50]">{availableTables}</p>
        </div>
      </div>

      {/* Bottom section: Recent Orders + Popular Food */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#2C3E50]">Recent Orders</h3>
            <Link
              to="/orders"
              className="text-sm text-[#E67E22] hover:underline font-medium"
            >
              View All
            </Link>
          </div>
          <div className="p-6 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm text-gray-500 border-b border-gray-100">
                  <th className="pb-3 font-medium">Order</th>
                  <th className="pb-3 font-medium">Table</th>
                  <th className="pb-3 font-medium">Total</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 font-semibold text-[#2C3E50]">
                      #{order.id}
                    </td>
                    <td className="py-3 text-gray-600">{order.table}</td>
                    <td className="py-3 font-medium text-[#2C3E50]">
                      ${Number(order.total).toFixed(2)}
                    </td>
                    <td className="py-3">
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Popular Food */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-[#2C3E50]">Popular Food</h3>
          </div>
          <div className="p-6 space-y-4">
            {popularFood.map((food) => (
              <div
                key={food.id}
                className="flex items-center justify-between p-3 bg-[#F8F9FA] rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div>
                  <p className="font-semibold text-[#2C3E50] text-sm">
                    {food.name}
                  </p>
                  <p className="text-xs text-gray-500">{food.category}</p>
                </div>
                <span className="font-bold text-[#E67E22] text-sm">
                  ${Number(food.price).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

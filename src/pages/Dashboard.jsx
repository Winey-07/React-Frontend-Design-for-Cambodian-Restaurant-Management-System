import { useState, useEffect} from 'react';
import { useNavbar } from 'react-router';
import StatusBadge from '../components/StatusBadge';
import Sidebar from '../components/Sidebar';

function Dashboard() {
    // memory box
    // useState -- lets a component remember data.
    const [summary, setSummary] = useState(null); //null or empty string
    const [recentOrders, setRecentOrders]  = useState([]); // empty array
    const [popularFood, setPopularFood] = useSatte([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect -- lets a component do something once at a specific moment 
    // (like fetching data when the page first appears).

    //  useEffect: fetching data when the page loads
    useEffect(() => {
        const loadDashbord = async () => {
            try {
                // useful for re-run this function later
                setLoading(ture);
                // this fires all 3 requests at the same time and waits for them to finish
                const [summaryDate, ordersDate, popularDate] = await Promise.all([
                    // these 3 are called at the same time
                    getDashboardSummary(),
                    getRecentOrders(),
                    getPopularItems(),
                    // promise.all wait for the 3 to finish
                    // once they finish, their results are unpacked into summaryData, ordersData, and popularData.

                ]);

                // These lines pin the fetched data into the memory boxes (state).
                // Once these are called, React knows the data changed and will re-render the page to show it.
                setSummary(summaryDate);
                setRecentOrders(ordersDate);
                setPopularFood(popularDate);
                setError(null);
            }
            catch (err) {
                setError('Failed to load dashboard.');
            }
            // finally runs no matter what, success or failure. 
            // It turns the loading state off. 
            finally {
                setLoading(false);
            }
            loadDashbord();
        }
    })
  return (
   
  );
}

export default Dashboard;
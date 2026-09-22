import { Link, useLocation } from 'react-router-dom';

function Sidebar({ isOpen, toggleSidebar }) {
  // useLocation tells us which page we are currently on
  const location = useLocation();

  // Navigation menu items
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Orders', path: '/orders', icon: '📋' },
    { name: 'Tables', path: '/tables', icon: '🍽️' },
    { name: 'Menu', path: '/menu', icon: '🍜' },
    { name: 'Categories', path: '/categories', icon: '📂' },
    { name: 'Payments', path: '/payments', icon: '💵' },
    { name: 'Reports', path: '/reports', icon: '📈' },
  ];

  const bottomItems = [
    { name: 'Settings', path: '/settings', icon: '⚙️' },
    { name: 'Logout', path: '/login', icon: '🚪' },
  ];

  // Function to check if a menu item is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Dark overlay for mobile - only shows when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-dark text-white flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo / Brand */}
        <div className="h-16 flex items-center px-6 border-b border-gray-700">
          <span className="text-2xl mr-2">🍽️</span>
          <div>
            <h2 className="text-lg font-bold text-white leading-tight">Srey Mom</h2>
            <p className="text-xs text-gray-400">RMS</p>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 overflow-y-auto sidebar-scroll py-4 px-3">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => {
                // Close sidebar on mobile when a link is clicked
                if (window.innerWidth < 1024) {
                  toggleSidebar();
                }
              }}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors
                ${isActive(item.path) 
                  ? 'bg-primary text-white font-semibold' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }
              `}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}

          {/* Divider */}
          <div className="my-4 border-t border-gray-700"></div>

          {/* Bottom items */}
          {bottomItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 1024) {
                  toggleSidebar();
                }
              }}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors
                ${isActive(item.path) 
                  ? 'bg-primary text-white font-semibold' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }
              `}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 text-xs text-gray-500 text-center">
          Srey Mom RMS v1.0
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
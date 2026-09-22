function Navbar({ toggleSidebar }) {
  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 sticky top-0 z-20">
      {/* Left side: Hamburger menu + Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 text-dark"
          aria-label="Open sidebar"
        >
          {/* Hamburger icon (3 lines) */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-dark">Srey Mom Restaurant</h1>
      </div>

      {/* Right side: User info */}
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold text-dark">Admin User</p>
          <p className="text-xs text-gray-500">Manager</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
          A
        </div>
      </div>
    </header>
  );
}

export default Navbar;
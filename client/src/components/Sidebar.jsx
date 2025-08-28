import { Link, useLocation } from "react-router-dom";
import { Home, Users, Settings, X, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";

export default function Sidebar({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/dashboard/admin" },
    { name: "Users", icon: <Users size={20} />, path: "/dashboard/admin/users" },
    { name: "Settings", icon: <Settings size={20} />, path: "/dashboard/admin/settings" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`hidden md:flex flex-col bg-gray-900 text-white transition-all duration-300 shadow-lg
          ${isCollapsed ? "w-20" : "w-64"}`}
      >
        {/* Header / Branding */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <ShoppingCart size={24} className="text-blue-400" />
            {!isCollapsed && <h1 className="text-xl font-bold">Daily Cart</h1>}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-lg hover:bg-gray-800 transition"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-3 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition
                  ${isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
              >
                {item.icon}
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Sidebar (Drawer) */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setIsMobileOpen(false)}
          ></div>

          {/* Drawer */}
          <div className="relative w-64 bg-gray-900 text-white flex flex-col shadow-xl animate-slideIn">
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <ShoppingCart size={22} className="text-blue-400" />
                <h1 className="text-lg font-bold">Daily Cart</h1>
              </div>
              <button onClick={() => setIsMobileOpen(false)}>
                <X />
              </button>
            </div>

            <nav className="flex-1 p-3 space-y-2">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition
                      ${isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

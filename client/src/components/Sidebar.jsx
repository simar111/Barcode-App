import { Link, useLocation } from "react-router-dom";
import { Home, Users, Settings, X, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/dashboard/admin" },
    { name: "Users", icon: <Users size={20} />, path: "/dashboard/admin/users" },
    { name: "Settings", icon: <Settings size={20} />, path: "/dashboard/admin/settings" },
  ];

  const activeClass = "bg-blue-600 text-white shadow-md";
  const inactiveClass = "text-gray-300 hover:bg-gray-800 hover:text-white";

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div
        className={`hidden md:flex flex-col bg-gray-900 text-white shadow-lg`}
        animate={{ width: isCollapsed ? 80 : 256 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <ShoppingCart size={24} className="text-blue-400" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.h1
                  key="title"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl font-bold tracking-wide"
                >
                  Daily Cart
                </motion.h1>
              )}
            </AnimatePresence>
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
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`rounded-lg overflow-hidden`}
              >
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
                    ${isActive ? activeClass : inactiveClass}`}
                >
                  {item.icon}
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        key="text"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="font-medium"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </motion.div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black opacity-50 backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="relative w-64 bg-gray-900 text-white flex flex-col shadow-xl"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <ShoppingCart size={22} className="text-blue-400" />
                  <h1 className="text-lg font-bold tracking-wide">Daily Cart</h1>
                </div>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-1 hover:bg-gray-800 rounded-lg transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Menu */}
              <nav className="flex-1 p-3 space-y-2">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-lg overflow-hidden"
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsMobileOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
                          ${isActive ? activeClass : inactiveClass}`}
                      >
                        {item.icon}
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

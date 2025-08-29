import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  Settings,
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  DollarSign,
  Box,
  FileText,
  AlertTriangle,
  LogOut
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminSidebar({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // token, role, name sab hatao
    navigate("/"); // login page pe bhejo
  };

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} className="text-blue-500" />, path: "/dashboard/admin" },
    { name: "Sales", icon: <DollarSign size={20} className="text-green-500" />, path: "/dashboard/admin/sales" },
    { name: "Products", icon: <Box size={20} className="text-orange-500" />, path: "/dashboard/admin/products" },
    { name: "Inventory Alerts", icon: <AlertTriangle size={20} className="text-red-500" />, path: "/dashboard/admin/inventory-alerts" },

    // Users & Staff
    { name: "Users", icon: <Users size={20} className="text-purple-500" />, path: "/dashboard/admin/users" },
    { name: "Staff", icon: <Users size={20} className="text-pink-500" />, path: "/dashboard/admin/staff" },

    // Reports & Settings
    { name: "Reports", icon: <FileText size={20} className="text-teal-500" />, path: "/dashboard/admin/reports" },
    { name: "Settings", icon: <Settings size={20} className="text-gray-400" />, path: "/dashboard/admin/settings" },
  ];

  const activeClass = "bg-blue-600 text-white shadow-md";
  const inactiveClass = "text-gray-300 hover:bg-gray-800 hover:text-white";

  const renderMenu = (isMobile = false) => (
    menuItems.map((item) => {
      const isActive = location.pathname === item.path;
      return (
        <React.Fragment key={item.name}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-lg overflow-hidden"
          >
            <Link
              to={item.path}
              onClick={isMobile ? () => setIsMobileOpen(false) : undefined}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
                ${isActive ? activeClass : inactiveClass}`}
            >
              {React.cloneElement(item.icon, {
                className: isActive ? "text-white" : item.icon.props.className,
              })}
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="font-medium"
                >
                  {item.name}
                </motion.span>
              )}
            </Link>
          </motion.div>

          {/* Separator after Inventory Alerts */}
          {item.name === "Inventory Alerts" && (
            <div className="border-t border-gray-700 my-2" />
          )}
        </React.Fragment>
      );
    })
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div
        className="hidden md:flex flex-col bg-gray-900 text-white shadow-lg h-screen overflow-hidden"
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
                  DailyCart
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
          {renderMenu(false)}
        </nav>

        {/* Logout Button */}
        <div className="p-3 border-t border-gray-800">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition text-white"
          >
            <LogOut size={20} />
            {!isCollapsed && <span className="font-medium">Logout</span>}
          </motion.button>
        </div>
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
                  <h1 className="text-lg font-bold tracking-wide">DailyCart</h1>
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
                {renderMenu(true)}
              </nav>

              {/* Logout Button Mobile */}
              <div className="p-3 border-t border-gray-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition text-white"
                >
                  <LogOut size={20} />
                  <span className="font-medium">Logout</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

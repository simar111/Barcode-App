import { Menu } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar({ setIsMobileOpen }) {
  const userName = localStorage.getItem("name") || "User";

  return (
    <header className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
      
      {/* Mobile Menu Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 text-gray-700"
        onClick={() => setIsMobileOpen(true)}
      >
        <Menu size={24} />
      </motion.button>

      {/* Navbar Title */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-base sm:text-lg md:text-xl font-bold text-gray-800 truncate max-w-[50%] sm:max-w-[60%] md:max-w-full"
      >
        Admin Panel
      </motion.h1>

      {/* Right Section */}
      <div className="flex items-center gap-3 md:gap-4">
        <span className="hidden sm:inline text-gray-600 text-xs sm:text-sm md:text-base truncate max-w-[100px] md:max-w-[150px]">
          Welcome, {userName}
        </span>

        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 8px rgba(59,130,246,0.5)" }}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs sm:text-sm md:text-sm font-semibold shadow-md"
        >
          {userName.charAt(0).toUpperCase()}
        </motion.div>
      </div>
    </header>
  );
}

// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

// Pages
import AdminDashboard from "./pages/AdminDashboard";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

export default function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);   // desktop collapse
  const [isMobileOpen, setIsMobileOpen] = useState(false); // mobile drawer

  return (
    <Router>
      <Routes>
        {/* Login bina sidebar */}
        <Route path="/" element={<Login />} />

        {/* Dashboard routes with Sidebar + Navbar */}
        <Route
          path="/dashboard/*"
          element={
            <div className="flex h-screen">
              {/* Sidebar */}
              <Sidebar
                isCollapsed={isCollapsed}
                isMobileOpen={isMobileOpen}
                setIsCollapsed={setIsCollapsed}
                setIsMobileOpen={setIsMobileOpen}
              />

              {/* Main content */}
              <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <Navbar setIsMobileOpen={setIsMobileOpen} />

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
                  <Routes>
                    <Route path="admin" element={<AdminDashboard />} />
                    <Route path="admin/users" element={<Users />} />
                    <Route path="admin/settings" element={<Settings />} />
                  </Routes>
                </main>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

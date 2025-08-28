import { Menu } from "lucide-react";

export default function Navbar({ setIsMobileOpen }) {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b shadow-sm">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-700"
        onClick={() => setIsMobileOpen(true)}
      >
        <Menu size={24} />
      </button>

      <h1 className="font-semibold text-xl">Admin Panel</h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-600">Welcome, User</span>
      </div>
    </header>
  );
}

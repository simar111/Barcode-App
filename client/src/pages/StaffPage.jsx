import { useEffect, useState } from "react";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/user"); // ✅ backend se fetch
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // 🔍 Filtered Users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-center sm:text-left">
        👥 Users
      </h2>
      <p className="mb-4 sm:mb-6 text-gray-600 text-center sm:text-left text-sm sm:text-base">
        Manage staff and admins here.
      </p>

      {/* 🔍 Search + Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-3 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Role Filter */}
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="w-full sm:w-40 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
        </select>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white shadow-md rounded-xl p-5 flex items-center justify-between border hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              {/* Avatar + Info */}
              <div className="flex items-center gap-3 overflow-hidden">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0 ${
                    user.role === "admin"
                      ? "bg-purple-600"
                      : "bg-green-600"
                  }`}
                >
                  {user.role === "admin" ? "A" : "S"}
                </div>
                <div className="truncate">
                  <h3 className="font-semibold text-base md:text-lg truncate">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Role Badge */}
              <span
                className={`ml-2 px-3 py-1 rounded-full text-xs font-medium capitalize flex-shrink-0 ${
                  user.role === "admin"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {user.role}
              </span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No users found
          </p>
        )}
      </div>
    </div>
  );
}

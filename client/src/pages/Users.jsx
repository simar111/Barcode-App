import { useEffect, useState } from "react";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortOption, setSortOption] = useState("none");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState("card"); // 👈 card | table

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:5000/api/user");
        setUsers(data);
      } catch (err) {
        setError("⚠️ Failed to fetch users. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // 🔍 Filter Users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // ↕️ Sort Users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortOption === "name-asc") return a.name.localeCompare(b.name);
    if (sortOption === "name-desc") return b.name.localeCompare(a.name);
    if (sortOption === "role") return a.role.localeCompare(b.role);
    return 0;
  });

  // 📤 Export Users to CSV
  const exportToCSV = () => {
    const headers = ["Name", "Email", "Role"];
    const rows = users.map((u) => [u.name, u.email, u.role]);
    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "users.csv";
    link.click();
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800">
          👥 Users
        </h2>
        <p className="mb-6 text-gray-600">
          Manage staff and admins easily with search, filters, and export.
        </p>

        {/* Controls */}
        <div className="bg-white shadow-sm rounded-xl p-4 mb-8 flex flex-col sm:flex-row flex-wrap gap-3 items-center justify-between">
          {/* Search */}
          <input
            type="text"
            placeholder="🔍 Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/3 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
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

          {/* Sort */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full sm:w-40 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="none">Sort</option>
            <option value="name-asc">Name (A–Z)</option>
            <option value="name-desc">Name (Z–A)</option>
            <option value="role">By Role</option>
          </select>

          {/* Export */}
          <button
            onClick={exportToCSV}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            ⬇ Export CSV
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex justify-end mb-6 gap-2">
          <button
            onClick={() => setView("card")}
            className={`px-4 py-2 rounded-lg shadow text-sm font-medium ${view === "card"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            🪪 Card View
          </button>
          <button
            onClick={() => setView("table")}
            className={`px-4 py-2 rounded-lg shadow text-sm font-medium ${view === "table"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            📊 Table View
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-700 border border-red-200 px-4 py-3 rounded-lg text-center mb-6">
            {error}
          </div>
        )}

        {/* Users List */}
        {!loading && !error && sortedUsers.length > 0 ? (
          <>
            {view === "card" ? (
              // 🔹 Card Grid
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {sortedUsers.map((user) => (
                  <div
                    key={user._id}
                    className="bg-white shadow-md rounded-xl p-5 flex items-center justify-between border hover:shadow-lg hover:scale-[1.01] transition-all"
                  >
                    {/* Avatar + Info */}
                    <div className="flex items-center gap-4 overflow-hidden">
                      <div
                        className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center 
              text-white font-bold text-lg shadow-md
              ${user.role === "admin" ? "bg-purple-600" : "bg-green-600"}`}
                      >
                        {user.role === "admin" ? "A" : "S"}
                      </div>
                      <div className="truncate">
                        <h3 className="font-semibold text-gray-800 text-lg truncate">
                          {user.name}
                        </h3>
                        <p className="text-sm text-gray-500 truncate">{user.email}</p>
                      </div>
                    </div>

                    {/* Role Badge */}
                    <span
                      className={`ml-2 px-3 py-1 rounded-full text-xs font-medium capitalize ${user.role === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-green-100 text-green-700"
                        }`}
                    >
                      {user.role}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              // 🔹 Table View
              <div className="overflow-x-auto bg-white shadow-md rounded-xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700">
                      <th className="px-6 py-3 text-sm font-semibold">Name</th>
                      <th className="px-6 py-3 text-sm font-semibold">Email</th>
                      <th className="px-6 py-3 text-sm font-semibold">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedUsers.map((user, idx) => (
                      <tr
                        key={user._id}
                        className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                          } hover:bg-blue-50 transition`}
                      >
                        <td className="px-6 py-3 font-medium text-gray-800">{user.name}</td>
                        <td className="px-6 py-3 text-gray-600">{user.email}</td>
                        <td className="px-6 py-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${user.role === "admin"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-green-100 text-green-700"
                              }`}
                          >
                            {user.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          !loading &&
          !error && (
            <p className="text-center text-gray-500 col-span-full">No users found</p>
          )
        )}
      </div>
    </div>
  );
}

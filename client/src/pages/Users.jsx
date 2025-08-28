import { UserPlus, Edit, Trash2 } from "lucide-react";

export default function Users() {
  const users = [
    { name: "Ravi Kumar", role: "Cashier", status: "Active" },
    { name: "Neha Singh", role: "Helper", status: "Inactive" },
    { name: "Amit Sharma", role: "Manager", status: "Active" },
    { name: "Simran Kaur", role: "Cashier", status: "Active" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">👥 Users Management</h2>
          <p className="text-gray-600">Manage staff, cashiers, and other team members.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">
          <UserPlus size={18} />
          Add User
        </button>
      </div>

      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Search users..."
          className="w-full md:w-1/3 border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white shadow rounded-2xl">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-b">Name</th>
              <th className="px-6 py-3 border-b">Role</th>
              <th className="px-6 py-3 border-b">Status</th>
              <th className="px-6 py-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-3 border-b">{user.name}</td>
                <td className="px-6 py-3 border-b">{user.role}</td>
                <td className="px-6 py-3 border-b">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-3 border-b text-center flex justify-center gap-2">
                  <button className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200">
                    <Edit size={16} className="text-yellow-700" />
                  </button>
                  <button className="p-2 rounded-lg bg-red-100 hover:bg-red-200">
                    <Trash2 size={16} className="text-red-700" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

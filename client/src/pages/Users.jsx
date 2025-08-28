export default function Users() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">👥 Users Page</h2>
      <p className="mb-2">Manage staff and cashiers here.</p>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Ravi Kumar</td>
            <td className="border border-gray-300 px-4 py-2">Cashier</td>
            <td className="border border-gray-300 px-4 py-2">Active</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Neha Singh</td>
            <td className="border border-gray-300 px-4 py-2">Helper</td>
            <td className="border border-gray-300 px-4 py-2">Inactive</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

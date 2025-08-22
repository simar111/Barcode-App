export default function ReceiptExample() {
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-lg shadow-md border border-gray-200">
      {/* Store Heading */}
      <h1 className="text-2xl font-bold text-center mb-1">SuperMart POS</h1>
      <p className="text-center text-sm text-gray-600 mb-4">Date: 19-08-2025 | Time: 12:45 PM</p>

      {/* Receipt Title */}
      <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-gray-800 text-center">
        Customer Receipt
      </h3>

      {/* Table */}
      <table className="w-full text-sm mb-4">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="text-left py-2">Item</th>
            <th className="text-center py-2">Qty</th>
            <th className="text-right py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-dashed">
            <td>Bread</td>
            <td className="text-center">2</td>
            <td className="text-right">₹40</td>
          </tr>
          <tr className="border-b border-dashed">
            <td>Milk</td>
            <td className="text-center">1</td>
            <td className="text-right">₹25</td>
          </tr>
          <tr className="border-b border-dashed">
            <td>Butter</td>
            <td className="text-center">1</td>
            <td className="text-right">₹55</td>
          </tr>
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-between border-t border-gray-300 pt-2 text-sm font-semibold">
        <span>Subtotal</span>
        <span>₹120</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Tax (5%)</span>
        <span>₹6</span>
      </div>
      <div className="flex justify-between text-lg font-bold mt-2">
        <span>Total</span>
        <span>₹126</span>
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-gray-500 mt-6 border-t pt-3">
        Thank you for shopping with us! <br />
        Visit Again 🙏
      </p>
    </div>
  );
}

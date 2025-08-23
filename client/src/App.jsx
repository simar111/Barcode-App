import React, { useState } from "react";

export default function POSBilling() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState(1);

  const addItem = () => {
    if (!name || !price) return;
    const newItem = {
      id: Date.now(),
      name,
      price: parseFloat(price),
      qty: parseInt(qty),
    };
    setItems([...items, newItem]);
    setName("");
    setPrice("");
    setQty(1);
  };

  const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-roboto">
      <h1 className="text-3xl font-bold mb-6 font-montserrat">POS Billing Software</h1>

      {/* Add Item Form */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4 font-montserrat">Add Item</h2>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded px-2 py-1"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border rounded px-2 py-1"
          />
          <input
            type="number"
            placeholder="Qty"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <button
          onClick={addItem}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add to Bill
        </button>
      </div>

      {/* Bill Items */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 font-montserrat">Bill</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Item</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Qty</th>
              <th className="p-2 border">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center">
                  No items added
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id}>
                  <td className="p-2 border">{item.name}</td>
                  <td className="p-2 border">₹{item.price}</td>
                  <td className="p-2 border">{item.qty}</td>
                  <td className="p-2 border">₹{item.price * item.qty}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <p className="text-right mt-4 text-lg font-semibold">
          Grand Total: ₹{total}
        </p>
      </div>
    </div>
  );
}

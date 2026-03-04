"use client";
import { useState } from "react";
import StaffHeader from "@/components/layouts/StaffHeader";

interface OrderItem {
    id: number;
    name: string;
    price: string;
}

export default function StaffProcessOrders() {
    const [items, setItems] = useState<OrderItem[]>([{ id: 1, name: "", price: "" }]);
    const [counter, setCounter] = useState(2);
    const [manualPoints, setManualPoints] = useState(0);

    const total = items.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);

    const addItem = () => {
        setItems((prev) => [...prev, { id: counter, name: "", price: "" }]);
        setCounter((c) => c + 1);
    };

    const removeItem = (id: number) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateItem = (id: number, field: "name" | "price", value: string) => {
        setItems((prev) => prev.map((item) => item.id === id ? { ...item, [field]: value } : item));
    };

    const clearOrder = () => {
        setItems([{ id: 1, name: "", price: "" }]);
        setCounter(2);
        setManualPoints(0);
    };

    return (
        <>
            <StaffHeader />

            <div className="min-h-screen bg-gray-100 pt-6 px-4 sm:px-8 pb-10">
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Customer Order (Staff Panel)</h1>

                    <form method="POST" action="/api/staff/process-order">
                        <div className="mb-6">
                            <label className="block text-gray-700 font-semibold mb-2">Company:</label>
                            <select disabled className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed">
                                <option>Company Name</option>
                            </select>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="user_id" className="block text-gray-700 font-semibold mb-2">Select User</label>
                            <select id="user_id" name="user_id" className="w-full p-3 border border-gray-300 rounded-lg" required>
                                <option value="" disabled>-- Choose a User --</option>
                            </select>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-purple-700 mb-3">Order Items</h2>
                            <div className="space-y-3">
                                {items.map((item, index) => (
                                    <div key={item.id} className="flex gap-3 items-center">
                                        <input
                                            type="text"
                                            value={item.name}
                                            onChange={(e) => updateItem(item.id, "name", e.target.value)}
                                            placeholder={`Item ${index + 1}`}
                                            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                                        />
                                        <input
                                            type="number"
                                            value={item.price}
                                            onChange={(e) => updateItem(item.id, "price", e.target.value)}
                                            placeholder="0.00"
                                            min="0"
                                            step="0.01"
                                            className="w-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeItem(item.id)}
                                            disabled={items.length === 1}
                                            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={addItem}
                                className="w-full mt-4 bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
                            >
                                + Add Item
                            </button>
                        </div>

                        <div className="border-t pt-4 mt-6">
                            <div className="flex justify-between mb-4 text-lg">
                                <span>Total:</span>
                                <span className="font-bold text-purple-700">${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-lg font-semibold text-gray-800">Points to Award:</label>
                                <input
                                    type="number"
                                    name="points_awarded"
                                    value={manualPoints}
                                    onChange={(e) => setManualPoints(Number(e.target.value))}
                                    min="0"
                                    step="1"
                                    className="w-32 text-right p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-green-700 font-bold"
                                />
                            </div>
                        </div>

                        {/* Hidden serialised fields */}
                        <input type="hidden" name="order_items" value={JSON.stringify(items)} />
                        <input type="hidden" name="total" value={total.toFixed(2)} />

                        <div className="mt-6 flex gap-4">
                            <button type="submit" className="flex-1 bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition">
                                Process Order
                            </button>
                            <button type="button" onClick={clearOrder} className="flex-1 bg-gray-400 text-white py-3 rounded-md hover:bg-gray-500 transition">
                                Clear Order
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

"use client";
import { useState } from "react";
import StaffHeader from "@/components/layouts/StaffHeader";
import {
    useGetStaffProfileQuery,
    useGetCompanyUsersQuery,
    useCreateOrderMutation,
} from "@/store/api/staffApi";

interface OrderItem {
    id: number;
    name: string;
    price: string;
}

export default function StaffProcessOrders() {
    const [items, setItems] = useState<OrderItem[]>([{ id: 1, name: "", price: "" }]);
    const [counter, setCounter] = useState(2);
    const [selectedUserId, setSelectedUserId] = useState<string>("");
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const { data: profile } = useGetStaffProfileQuery();
    const { data: companyUsers = [], isLoading: loadingUsers } = useGetCompanyUsersQuery();
    const [createOrder, { isLoading: submitting }] = useCreateOrderMutation();

    const total = items.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);
    // Auto-calculate points: 1 point per $10 spent
    const autoPoints = Math.round(total * 0.1);

    const addItem = () => {
        setItems((prev) => [...prev, { id: counter, name: "", price: "" }]);
        setCounter((c) => c + 1);
    };

    const removeItem = (id: number) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateItem = (id: number, field: "name" | "price", value: string) => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
        );
    };

    const clearOrder = () => {
        setItems([{ id: 1, name: "", price: "" }]);
        setCounter(2);
        setSelectedUserId("");
        setSuccessMsg(null);
        setErrorMsg(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMsg(null);
        setErrorMsg(null);

        if (!selectedUserId) {
            setErrorMsg("Please select a customer.");
            return;
        }

        const validItems = items.filter((i) => i.name.trim() !== "");
        if (validItems.length === 0) {
            setErrorMsg("Please add at least one order item.");
            return;
        }

        if (total <= 0) {
            setErrorMsg("Total amount must be greater than 0.");
            return;
        }

        try {
            const result = await createOrder({
                userId: Number(selectedUserId),
                totalAmount: total,
                orderItems: validItems.map((i) => ({
                    name: i.name,
                    price: parseFloat(i.price) || 0,
                })),
            }).unwrap();

            setSuccessMsg(
                `✅ Order #${result.id} processed! ${result.pointsEarned} points awarded to ${result.userName}.`
            );
            clearOrder();
        } catch (err: unknown) {
            const error = err as { data?: { message?: string } };
            setErrorMsg(error?.data?.message || "Failed to process order. Please try again.");
        }
    };

    return (
        <>
            <StaffHeader />

            <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-8">
                <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-xl">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-3">
                        Process Order
                    </h1>
                    <p className="text-center text-gray-500 mb-10 text-base">
                        Staff: <span className="font-semibold text-green-700">{profile?.name}</span> &nbsp;|&nbsp;
                        Company: <span className="font-semibold text-green-700">{profile?.companyName ?? "—"}</span>
                    </p>

                    {successMsg && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-300 text-green-800 rounded-lg text-sm">
                            {successMsg}
                        </div>
                    )}
                    {errorMsg && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-300 text-red-700 rounded-lg text-sm">
                            {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        {/* Customer Select */}
                        <div className="mb-7">
                            <label htmlFor="user_id" className="block text-gray-700 font-semibold text-base mb-2">
                                Select Customer
                            </label>
                            {loadingUsers ? (
                                <div className="text-base text-gray-400 p-4 border rounded-lg">Loading customers…</div>
                            ) : (
                                <select
                                    id="user_id"
                                    value={selectedUserId}
                                    onChange={(e) => setSelectedUserId(e.target.value)}
                                    className="w-full p-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                                    required
                                >
                                    <option value="">— Choose a Customer —</option>
                                    {companyUsers.map((u) => (
                                        <option key={u.id} value={u.id}>
                                            {u.name} ({u.email}) — {u.points} pts
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>

                        {/* Order Items */}
                        <div className="mb-7">
                            <h2 className="text-2xl font-semibold text-green-700 mb-4">Order Items</h2>
                            <div className="space-y-4">
                                {items.map((item, index) => (
                                    <div key={item.id} className="flex gap-4 items-center">
                                        <input
                                            type="text"
                                            value={item.name}
                                            onChange={(e) => updateItem(item.id, "name", e.target.value)}
                                            placeholder={`Item ${index + 1} name`}
                                            className="flex-grow p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                                        />
                                        <div className="relative w-40">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base">$</span>
                                            <input
                                                type="number"
                                                value={item.price}
                                                onChange={(e) => updateItem(item.id, "price", e.target.value)}
                                                placeholder="0.00"
                                                min="0"
                                                step="0.01"
                                                className="w-full pl-7 pr-3 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeItem(item.id)}
                                            disabled={items.length === 1}
                                            className="bg-red-500 text-white px-4 py-3 text-base rounded-md hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={addItem}
                                className="w-full mt-5 border-2 border-dashed border-green-400 text-green-600 py-3 text-base rounded-md hover:bg-green-50 transition font-medium"
                            >
                                + Add Item
                            </button>
                        </div>

                        {/* Summary */}
                        <div className="border-t pt-6 mt-5 bg-gray-50 rounded-xl px-6 pb-6">
                            <div className="flex justify-between items-center mb-3 text-lg text-gray-700">
                                <span>Subtotal ({items.length} item{items.length !== 1 ? "s" : ""})</span>
                                <span className="font-semibold">${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-lg text-gray-700">
                                <span>Points to be Awarded</span>
                                <span className="font-bold text-green-700 text-xl">+{autoPoints} pts</span>
                            </div>
                            <p className="text-sm text-gray-400 mt-2">1 point per $10 spent</p>
                        </div>

                        <div className="mt-8 flex gap-5">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="flex-1 bg-green-600 text-white py-4 text-lg rounded-lg hover:bg-green-700 transition font-semibold disabled:opacity-60"
                            >
                                {submitting ? "Processing…" : "Process Order"}
                            </button>
                            <button
                                type="button"
                                onClick={clearOrder}
                                className="flex-1 bg-gray-200 text-gray-700 py-4 text-lg rounded-lg hover:bg-gray-300 transition font-semibold"
                            >
                                Clear
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

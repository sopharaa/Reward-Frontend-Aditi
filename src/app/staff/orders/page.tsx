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
    const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

    function showToast(msg: string, type: "success" | "error") {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 4000);
    }

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

            const msg = `Order #${result.id} processed! ${result.pointsEarned} points awarded to ${result.userName}.`;
            setSuccessMsg(msg);
            showToast(msg, "success");
            clearOrder();
        } catch (err: unknown) {
            const error = err as { data?: { message?: string } };
            const msg = error?.data?.message || "Failed to process order. Please try again.";
            setErrorMsg(msg);
            showToast(msg, "error");
        }
    };

    return (
        <>
            <StaffHeader />

            <div className="bg-gray-100 pt-6 px-4 sm:px-8 pb-6">
                <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-xl">

                    {/* Header */}
                    <div className="mb-4">
                        <h1 className="text-3xl font-bold text-center text-gray-800">Process Order</h1>
                        <p className="text-center text-gray-500 mt-1 text-sm">
                            Staff: <span className="font-semibold text-green-700">{profile?.name}</span>
                            &nbsp;|&nbsp;
                            Company: <span className="font-semibold text-green-700">{profile?.companyName ?? "—"}</span>
                        </p>
                    </div>

                    {successMsg && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-300 text-green-800 rounded-lg text-sm">
                            {successMsg}
                        </div>
                    )}
                    {errorMsg && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-700 rounded-lg text-sm">
                            {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                            {/* LEFT — Customer + Order Items */}
                            <div className="space-y-4">

                                {/* Customer Select */}
                                <div>
                                    <label htmlFor="user_id" className="block text-gray-700 font-semibold text-sm mb-1">
                                        Select Customer
                                    </label>
                                    {loadingUsers ? (
                                        <div className="text-sm text-gray-400 p-3 border rounded-lg">Loading customers…</div>
                                    ) : (
                                        <select
                                            id="user_id"
                                            value={selectedUserId}
                                            onChange={(e) => setSelectedUserId(e.target.value)}
                                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
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
                                <div>
                                    <h2 className="text-sm font-semibold text-gray-700 mb-2">Order Items</h2>
                                    <div className="space-y-2">
                                        {items.map((item, index) => (
                                            <div key={item.id} className="flex gap-2 items-center">
                                                <input
                                                    type="text"
                                                    value={item.name}
                                                    onChange={(e) => updateItem(item.id, "name", e.target.value)}
                                                    placeholder={`Item ${index + 1} name`}
                                                    className="flex-grow px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                                                />
                                                <div className="relative w-28">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                                                    <input
                                                        type="number"
                                                        value={item.price}
                                                        onChange={(e) => updateItem(item.id, "price", e.target.value)}
                                                        placeholder="0.00"
                                                        min="0"
                                                        step="0.01"
                                                        className="w-full pl-6 pr-2 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(item.id)}
                                                    disabled={items.length === 1}
                                                    className="bg-red-500 text-white px-3 py-2 text-sm rounded-md hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addItem}
                                        className="w-full mt-3 border-2 border-dashed border-green-400 text-green-600 py-2 text-sm rounded-md hover:bg-green-50 transition font-medium"
                                    >
                                        + Add Item
                                    </button>
                                </div>
                            </div>

                            {/* RIGHT — Summary + Actions */}
                            <div className="flex flex-col justify-between">

                                {/* Summary */}
                                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                                    <h2 className="text-sm font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2">Order Summary</h2>
                                    <div className="space-y-3 text-sm text-gray-700">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Items</span>
                                            <span className="font-medium">{items.length} item{items.length !== 1 ? "s" : ""}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Subtotal</span>
                                            <span className="font-semibold">${total.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between border-t border-gray-200 pt-3">
                                            <span className="text-gray-500">Points Awarded</span>
                                            <span className="font-bold text-green-700 text-base">+{autoPoints} pts</span>
                                        </div>
                                        <p className="text-xs text-gray-400">1 point per $10 spent</p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col gap-3 mt-5">
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full bg-green-600 text-white py-3 text-sm font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-60"
                                    >
                                        {submitting ? "Processing…" : "Process Order"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={clearOrder}
                                        className="w-full bg-gray-200 text-gray-700 py-3 text-sm font-semibold rounded-lg hover:bg-gray-300 transition"
                                    >
                                        Clear
                                    </button>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </div>

            {/* Toast */}
            {toast && (
                <div className={`fixed top-6 right-6 z-50 flex items-start gap-3 px-5 py-4 rounded-xl shadow-lg text-white text-sm font-medium max-w-sm transition-all ${
                    toast.type === "success" ? "bg-green-600" : "bg-red-500"
                }`}>
                    <span className="mt-0.5 shrink-0">{toast.type === "success" ? "✓" : "✕"}</span>
                    <span>{toast.msg}</span>
                    <button
                        onClick={() => setToast(null)}
                        className="ml-auto shrink-0 text-white/70 hover:text-white text-lg leading-none"
                    >
                        ×
                    </button>
                </div>
            )}
        </>
    );
}

"use client";
import StaffHeader from "@/components/layouts/StaffHeader";
import { useGetMyOrdersQuery } from "@/store/api/staffApi";

export default function StaffOrderHistory() {
    const { data: orders = [], isLoading, isError } = useGetMyOrdersQuery();

    return (
        <>
            <StaffHeader />

            <div className="min-h-screen bg-gray-100 pt-20 px-4 sm:px-8 pb-10">
                <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                        Order History
                    </h1>

                    <section>
                        <h2 className="text-xl font-bold text-gray-700 mb-4 border-b-2 border-green-300 pb-3">
                            All Orders You Processed
                        </h2>

                        {isLoading && (
                            <p className="text-center py-10 text-gray-400">Loading orders…</p>
                        )}
                        {isError && (
                            <p className="text-center py-10 text-red-500">Failed to load orders.</p>
                        )}

                        {!isLoading && !isError && (
                            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                                <table className="min-w-full divide-y divide-gray-200 text-sm">
                                    <thead className="bg-gray-50 text-gray-600 font-semibold">
                                        <tr>
                                            <th className="px-4 py-3 text-left">#</th>
                                            <th className="px-4 py-3 text-left">Customer</th>
                                            <th className="px-4 py-3 text-left">Items</th>
                                            <th className="px-4 py-3 text-right">Total</th>
                                            <th className="px-4 py-3 text-center">Points Earned</th>
                                            <th className="px-4 py-3 text-left">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100 text-gray-700">
                                        {orders.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="text-center py-10 text-gray-400 italic">
                                                    No orders found.
                                                </td>
                                            </tr>
                                        ) : (
                                            orders.map((order, idx) => (
                                                <tr key={order.id} className="hover:bg-gray-50 transition">
                                                    <td className="px-4 py-3 text-gray-500">{idx + 1}</td>
                                                    <td className="px-4 py-3 font-medium">{order.userName}</td>
                                                    <td className="px-4 py-3">
                                                        {order.orderItems && order.orderItems.length > 0 ? (
                                                            <ul className="space-y-0.5">
                                                                {order.orderItems.map((item, i) => (
                                                                    <li key={i} className="flex justify-between gap-4">
                                                                        <span>{item.name}</span>
                                                                        <span className="text-gray-500">${item.price.toFixed(2)}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <span className="text-gray-400 italic text-xs">No items</span>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3 text-right font-semibold text-green-700">
                                                        ${order.totalAmount.toFixed(2)}
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        <span className="inline-block bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-xs">
                                                            +{order.pointsEarned} pts
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-500 text-xs">
                                                        {new Date(order.createdAt).toLocaleString()}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>

                    <div className="text-center mt-8">
                        <a
                            href="/staff/orders"
                            className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-medium text-sm"
                        >
                            Process New Order
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

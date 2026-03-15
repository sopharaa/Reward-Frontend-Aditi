"use client";
import { useState } from "react";
import Link from "next/link";
import StaffHeader from "@/components/layouts/StaffHeader";
import StaffPagination from "@/components/staff/StaffPagination";
import { useGetMyOrdersQuery } from "@/store/api/staffApi";
import { formatBangkokDateTime } from "@/utils/date";

const PAGE_SIZE = 8;

export default function StaffOrderHistory() {
    const { data: orders = [], isLoading, isError } = useGetMyOrdersQuery();
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const filtered = orders.filter((o) =>
        o.userName.toLowerCase().includes(search.toLowerCase()) ||
        (o.orderItems ?? []).some((i) => i.name.toLowerCase().includes(search.toLowerCase()))
    );

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    function handleSearch(val: string) {
        setSearch(val);
        setCurrentPage(1);
    }

    return (
        <>
            <StaffHeader />
            <div className="min-h-screen bg-gray-100 pt-6 px-4 sm:px-8 pb-10">
                <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Order History</h1>
                    <section>
                        <h2 className="text-xl font-bold text-gray-700 mb-4 border-b-2 border-green-300 pb-3">All Orders You Processed</h2>

                        {isLoading && <p className="text-center py-10 text-gray-400">Loading orders...</p>}
                        {isError && <p className="text-center py-10 text-red-500">Failed to load orders.</p>}

                        {!isLoading && !isError && (
                            <>
                                {/* Search */}
                                <div className="relative w-full sm:max-w-sm mb-4">
                                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => handleSearch(e.target.value)}
                                        placeholder="Search customer or item..."
                                        className="w-full pl-9 pr-9 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                                    />
                                    {search && (
                                        <button onClick={() => handleSearch("")} className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </div>

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
                                            {filtered.length === 0 ? (
                                                <tr>
                                                    <td colSpan={6} className="text-center py-10 text-gray-400 italic">
                                                        {search ? `No results for "${search}".` : "No orders found."}
                                                    </td>
                                                </tr>
                                            ) : (
                                                paged.map((order, idx) => (
                                                    <tr key={order.id} className="hover:bg-gray-50 transition">
                                                        <td className="px-4 py-3 text-gray-500">{(currentPage - 1) * PAGE_SIZE + idx + 1}</td>
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
                                                        <td className="px-4 py-3 text-right font-semibold text-green-700">${order.totalAmount.toFixed(2)}</td>
                                                        <td className="px-4 py-3 text-center">
                                                            <span className="inline-block bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-xs">+{order.pointsEarned} pts</span>
                                                        </td>
                                                        <td className="px-4 py-3 text-gray-500 text-xs">{formatBangkokDateTime(order.createdAt)}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                    <StaffPagination currentPage={currentPage} totalPages={totalPages} totalItems={filtered.length} pageSize={PAGE_SIZE} onPageChange={setCurrentPage} />
                                </div>
                            </>
                        )}
                    </section>

                    <div className="text-center mt-8">
                        <Link href="/staff/orders" className="text-green-600 hover:text-green-500 font-medium">Back to Process Order</Link>
                    </div>
                </div>
            </div>
        </>
    );
}


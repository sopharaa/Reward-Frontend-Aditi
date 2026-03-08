"use client";
import { useState } from "react";
import UserHeader from "@/components/layouts/UserHeader";
import Link from "next/link";
import { useGetMyRedemptionsQuery, useGetMyOrdersQuery, useGetUserProfileQuery } from "@/store/api/userApi";
import type { UserOrderResponse, RedemptionResponse } from "@/store/api/userApi";

export default function History() {
    const { data: user } = useGetUserProfileQuery();
    const { data: redemptions = [], isLoading: redemptionsLoading } = useGetMyRedemptionsQuery();
    const { data: orders = [], isLoading: ordersLoading } = useGetMyOrdersQuery();

    const isLoading = redemptionsLoading || ordersLoading;

    // Compute summary stats
    const totalPointsEarned = orders.reduce((sum: number, o: UserOrderResponse) => sum + (o.pointsEarned ?? 0), 0);
    const totalPointsRedeemed = redemptions
        .filter((r: RedemptionResponse) => r.status === "ACCEPT")
        .reduce((sum: number, r: RedemptionResponse) => sum + r.pointSpend, 0);
    const currentBalance = user?.points ?? 0;

    // Merge both lists into unified rows, sorted by date DESC
    type Row =
        | { kind: "order"; id: number; description: string; points: number; date: string }
        | { kind: "redeem"; id: number; description: string; points: number; status: string; date: string };

    const rows: Row[] = [
        ...orders.map((o: UserOrderResponse) => ({
            kind: "order" as const,
            id: o.id,
            description: `Purchase – ${o.orderItems?.length ? o.orderItems.map((i: { name: string; price: number }) => i.name).join(", ") : "Order"}`,
            points: o.pointsEarned,
            date: o.createdAt,
        })),
        ...redemptions.map((r: RedemptionResponse) => ({
            kind: "redeem" as const,
            id: r.id,
            description: `Redeemed: ${r.rewardName}`,
            points: r.pointSpend,
            status: r.status,
            date: r.createdAt,
        })),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    function statusBadge(status: string) {
        if (status === "ACCEPT")
            return <span className="inline-block bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full text-xs">Accepted</span>;
        if (status === "REJECT")
            return <span className="inline-block bg-red-100 text-red-600 font-semibold px-3 py-1 rounded-full text-xs">Rejected</span>;
        return <span className="inline-block bg-yellow-100 text-yellow-700 font-semibold px-3 py-1 rounded-full text-xs">Pending</span>;
    }

    const PAGE_SIZE = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
    const pagedRows = rows.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    return (
        <>
            <div className="w-full min-h-screen bg-gray-50">
                <UserHeader />

                <div className="w-[85%] mx-auto pt-16 pb-10">
                    <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2">Transaction History</h1>
                    <p className="text-center text-gray-500 mb-10">A full record of your points earned and rewards redeemed.</p>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                            <p className="text-sm text-gray-500 mb-1">Total Points Earned</p>
                            {isLoading ? (
                                <div className="h-9 bg-gray-200 rounded animate-pulse w-24 mx-auto" />
                            ) : (
                                <p className="text-3xl font-extrabold text-green-600">+{totalPointsEarned}</p>
                            )}
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                            <p className="text-sm text-gray-500 mb-1">Total Points Redeemed</p>
                            {isLoading ? (
                                <div className="h-9 bg-gray-200 rounded animate-pulse w-24 mx-auto" />
                            ) : (
                                <p className="text-3xl font-extrabold text-red-500">-{totalPointsRedeemed}</p>
                            )}
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                            <p className="text-sm text-gray-500 mb-1">Current Balance</p>
                            {isLoading ? (
                                <div className="h-9 bg-gray-200 rounded animate-pulse w-24 mx-auto" />
                            ) : (
                                <p className="text-3xl font-extrabold text-green-800">{currentBalance}</p>
                            )}
                        </div>
                    </div>

                    {/* Transactions Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-gray-700">All Transactions</h2>
                            <span className="text-sm text-gray-400">{isLoading ? "…" : `${rows.length} records`}</span>
                        </div>
                        <table className="min-w-full divide-y divide-gray-100 text-sm">
                            <thead className="bg-gray-50 text-gray-600 font-semibold">
                                <tr>
                                    <th className="px-6 py-3 text-left">#</th>
                                    <th className="px-6 py-3 text-left">Description</th>
                                    <th className="px-6 py-3 text-center">Type</th>
                                    <th className="px-6 py-3 text-center">Points</th>
                                    <th className="px-6 py-3 text-center">Status</th>
                                    <th className="px-6 py-3 text-left">Date</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-50 text-gray-700">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-10 text-gray-400 italic">
                                            Loading transactions…
                                        </td>
                                    </tr>
                                ) : rows.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-16 text-gray-400 italic">
                                            <div className="flex flex-col items-center gap-2">
                                                <span className="text-5xl">📭</span>
                                                <span className="text-base">No transactions found yet.</span>
                                                <span className="text-sm text-gray-400">Start earning points by making a purchase!</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    pagedRows.map((row, idx) => (
                                        <tr key={`${row.kind}-${row.id}`} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-3 text-gray-500">{(currentPage - 1) * PAGE_SIZE + idx + 1}</td>
                                            <td className="px-6 py-3">{row.description}</td>
                                            <td className="px-6 py-3 text-center">
                                                {row.kind === "order" ? (
                                                    <span className="inline-block bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-full text-xs">Earn</span>
                                                ) : (
                                                    <span className="inline-block bg-purple-100 text-purple-700 font-semibold px-3 py-1 rounded-full text-xs">Redeem</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-3 text-center font-bold">
                                                {row.kind === "order" ? (
                                                    <span className="text-green-600">+{row.points}</span>
                                                ) : (
                                                    <span className="text-red-500">-{row.points}</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-3 text-center">
                                                {row.kind === "order" ? (
                                                    <span className="inline-block bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full text-xs">Completed</span>
                                                ) : (
                                                    statusBadge(row.status)
                                                )}
                                            </td>
                                            <td className="px-6 py-3 text-gray-500 text-xs">
                                                {new Date(row.date).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        {!isLoading && rows.length > PAGE_SIZE && (
                            <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                                <p className="text-sm text-gray-400">
                                    Showing{" "}
                                    <span className="font-medium text-gray-600">{(currentPage - 1) * PAGE_SIZE + 1}</span>–
                                    <span className="font-medium text-gray-600">{Math.min(currentPage * PAGE_SIZE, rows.length)}</span> of{" "}
                                    <span className="font-medium text-gray-600">{rows.length}</span>
                                </p>
                                <div className="flex items-center gap-1">
                                    {/* Prev */}
                                    <button
                                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                                    >
                                        ‹
                                    </button>

                                    {/* Page numbers */}
                                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                                        .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                                        .reduce<(number | "…")[]>((acc, p, i, arr) => {
                                            if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push("…");
                                            acc.push(p);
                                            return acc;
                                        }, [])
                                        .map((item, i) =>
                                            item === "…" ? (
                                                <span key={`ellipsis-${i}`} className="px-2 text-gray-400 text-sm">
                                                    …
                                                </span>
                                            ) : (
                                                <button
                                                    key={item}
                                                    onClick={() => setCurrentPage(item as number)}
                                                    className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition ${
                                                        currentPage === item
                                                            ? "bg-green-600 text-white border-green-600"
                                                            : "border-gray-300 text-gray-600 hover:bg-gray-50"
                                                    }`}
                                                >
                                                    {item}
                                                </button>
                                            )
                                        )}

                                    {/* Next */}
                                    <button
                                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                                    >
                                        ›
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="text-center mt-8">
                        <Link href="/dashboard" className="text-green-600 hover:text-green-500 font-medium">
                            ← Back to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

"use client";
import UserHeader from "@/components/layouts/UserHeader";
import Link from "next/link";
import { useGetMyRedemptionsQuery, useGetMyOrdersQuery, useGetUserProfileQuery } from "@/store/api/userApi";

export default function History() {
    const { data: user } = useGetUserProfileQuery();
    const { data: redemptions = [], isLoading: redemptionsLoading } = useGetMyRedemptionsQuery();
    const { data: orders = [], isLoading: ordersLoading } = useGetMyOrdersQuery();

    const isLoading = redemptionsLoading || ordersLoading;

    // Compute summary stats
    const totalPointsEarned = orders.reduce((sum, o) => sum + (o.pointsEarned ?? 0), 0);
    const totalPointsRedeemed = redemptions
        .filter((r) => r.status === "ACCEPT")
        .reduce((sum, r) => sum + r.pointSpend, 0);
    const currentBalance = user?.points ?? 0;

    // Merge both lists into unified rows, sorted by date DESC
    type Row =
        | { kind: "order"; id: number; description: string; points: number; date: string }
        | { kind: "redeem"; id: number; description: string; points: number; status: string; date: string };

    const rows: Row[] = [
        ...orders.map((o) => ({
            kind: "order" as const,
            id: o.id,
            description: `Purchase – ${o.orderItems?.length ? o.orderItems.map((i) => i.name).join(", ") : "Order"}`,
            points: o.pointsEarned,
            date: o.createdAt,
        })),
        ...redemptions.map((r) => ({
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

    return (
        <>
            <div className="w-full min-h-screen bg-gray-50">
                <UserHeader />

                <div className="w-[85%] mx-auto pt-16 pb-10">
                    <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2">Transaction History 🧾</h1>
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
                                    rows.map((row, idx) => (
                                        <tr key={`${row.kind}-${row.id}`} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-3 text-gray-500">{idx + 1}</td>
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

"use client";
import { useState } from "react";
import Link from "next/link";
import StaffHeader from "@/components/layouts/StaffHeader";
import StaffPagination from "@/components/staff/StaffPagination";
import {
    useGetPendingRedemptionsQuery,
    useUpdateRedemptionStatusMutation,
} from "@/store/api/staffApi";
import type { RedemptionResponse } from "@/store/api/staffApi";

const PAGE_SIZE = 8;

export default function StaffRedemptions() {
    const { data: redemptions = [], isLoading, isError, refetch } = useGetPendingRedemptionsQuery();
    const [updateStatus] = useUpdateRedemptionStatusMutation();

    const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
    const [processing, setProcessing] = useState<number | null>(null);
    const [confirmModal, setConfirmModal] = useState<{ redemption: RedemptionResponse; action: "ACCEPT" | "REJECT" } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const filtered = redemptions.filter((r) =>
        r.userName.toLowerCase().includes(search.toLowerCase()) ||
        r.rewardName.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    function handleSearch(val: string) {
        setSearch(val);
        setCurrentPage(1);
    }

    function showToast(msg: string, type: "success" | "error") {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3500);
    }

    async function handleAction(id: number, status: "ACCEPT" | "REJECT") {
        setProcessing(id);
        setConfirmModal(null);
        try {
            await updateStatus({ id, status }).unwrap();
            showToast(
                status === "ACCEPT"
                    ? "Redemption accepted successfully!"
                    : "Redemption rejected. Points returned to user.",
                "success"
            );
            refetch();
        } catch {
            showToast("Failed to update redemption status.", "error");
        } finally {
            setProcessing(null);
        }
    }

    return (
        <>
            <div className="bg-gray-100 min-h-screen font-sans">
                <StaffHeader />

                <div className="pt-6 px-4 sm:px-8 pb-10">
                    <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
                        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
                            Review Redemptions
                        </h1>
                        <p className="text-center text-gray-500 mb-8 text-sm">
                            Accept or reject customer reward redemption requests.
                        </p>

                        <section>
                            <h2 className="text-xl font-bold text-gray-700 mb-4 border-b-2 border-green-300 pb-3">
                                Pending Approvals
                            </h2>

                            {isLoading && (
                                <p className="text-center py-10 text-gray-400">Loading redemptions…</p>
                            )}
                            {isError && (
                                <p className="text-center py-10 text-red-500">Failed to load redemptions.</p>
                            )}

                            {!isLoading && !isError && (
                                redemptions.length === 0 ? (
                                    <div className="text-center py-16 text-gray-400">
                                        <p className="italic">No pending redemptions at the moment.</p>
                                    </div>
                                ) : (
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
                                                placeholder="Search customer or reward…"
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
                                                    <th className="px-4 py-3 text-left">Reward</th>
                                                    <th className="px-4 py-3 text-center">Points</th>
                                                    <th className="px-4 py-3 text-left">Date</th>
                                                    <th className="px-4 py-3 text-center">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-100 text-gray-700">
                                                {filtered.length === 0 ? (
                                                    <tr><td colSpan={6} className="text-center py-10 text-gray-400 italic">{search ? `No results for "${search}".` : "No pending redemptions."}</td></tr>
                                                ) : (
                                                    paged.map((r, idx) => (
                                                        <tr key={r.id} className="hover:bg-gray-50 transition">
                                                            <td className="px-4 py-3 text-gray-500">{(currentPage - 1) * PAGE_SIZE + idx + 1}</td>
                                                            <td className="px-4 py-3 font-medium">{r.userName}</td>
                                                            <td className="px-4 py-3">{r.rewardName}</td>
                                                            <td className="px-4 py-3 text-center">
                                                                <span className="inline-block bg-yellow-100 text-yellow-700 font-bold px-3 py-1 rounded-full text-xs">
                                                                    -{r.pointSpend} pts
                                                                </span>
                                                            </td>
                                                            <td className="px-4 py-3 text-gray-500 text-xs">
                                                                {new Date(r.createdAt).toLocaleString()}
                                                            </td>
                                                            <td className="px-4 py-3 text-center">
                                                                <div className="flex gap-2 justify-center">
                                                                    <button
                                                                        disabled={processing === r.id}
                                                                        onClick={() => setConfirmModal({ redemption: r, action: "ACCEPT" })}
                                                                        className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                                                                    >
                                                                        Accept
                                                                    </button>
                                                                    <button
                                                                        disabled={processing === r.id}
                                                                        onClick={() => setConfirmModal({ redemption: r, action: "REJECT" })}
                                                                        className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                                                                    >
                                                                        Reject
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                        <StaffPagination currentPage={currentPage} totalPages={totalPages} totalItems={filtered.length} pageSize={PAGE_SIZE} onPageChange={setCurrentPage} />
                                    </div>
                                    </>
                                )
                            )}
                        </section>

                        <div className="text-center mt-8">
                            <Link href="/staff/orders" className="text-green-600 hover:text-green-500 font-medium">Back to Process Order</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {confirmModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-7 w-full max-w-md">
                        <h2 className={`text-xl font-bold mb-4 ${confirmModal.action === "ACCEPT" ? "text-green-700" : "text-red-600"}`}>
                            {confirmModal.action === "ACCEPT" ? "Accept Redemption" : "Reject Redemption"}
                        </h2>
                        <p className="text-gray-700 mb-2">
                            Customer: <span className="font-semibold">{confirmModal.redemption.userName}</span>
                        </p>
                        <p className="text-gray-700 mb-2">
                            Reward: <span className="font-semibold">{confirmModal.redemption.rewardName}</span>
                        </p>
                        <p className="text-gray-700 mb-5">
                            Points: <span className="font-semibold text-yellow-700">{confirmModal.redemption.pointSpend} pts</span>
                        </p>
                        {confirmModal.action === "REJECT" && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-5 text-sm text-red-700">
                                Rejecting will return <strong>{confirmModal.redemption.pointSpend} pts</strong> back to {confirmModal.redemption.userName} and restore the reward stock.
                            </div>
                        )}
                        {confirmModal.action === "ACCEPT" && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-5 text-sm text-green-700">
                                Accepting will confirm the redemption. Points and stock are already deducted.
                            </div>
                        )}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setConfirmModal(null)}
                                className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleAction(confirmModal.redemption.id, confirmModal.action)}
                                className={`flex-1 text-white py-2.5 rounded-lg font-semibold transition ${
                                    confirmModal.action === "ACCEPT"
                                        ? "bg-green-600 hover:bg-green-700"
                                        : "bg-red-500 hover:bg-red-600"
                                }`}
                            >
                                Confirm {confirmModal.action === "ACCEPT" ? "Accept" : "Reject"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast */}
            {toast && (
                <div className={`fixed top-6 right-6 z-50 px-5 py-4 rounded-xl shadow-lg text-white text-sm font-medium ${
                    toast.type === "success" ? "bg-green-600" : "bg-red-500"
                }`}>
                    {toast.msg}
                </div>
            )}
        </>
    );
}

"use client";
import { useState } from "react";
import Link from "next/link";
import StaffHeader from "@/components/layouts/StaffHeader";
import StaffPagination from "@/components/staff/StaffPagination";
import { useGetCompanyTransactionsQuery } from "@/store/api/staffApi";

const PAGE_SIZE = 8;

export default function StaffTransactions() {
    const { data: transactions = [], isLoading, isError } = useGetCompanyTransactionsQuery();
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const filtered = transactions.filter((t) =>
        t.userName.toLowerCase().includes(search.toLowerCase()) ||
        t.rewardName.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    function handleSearch(val: string) { setSearch(val); setCurrentPage(1); }

    function statusBadge(status: string) {
        if (status === "ACCEPT") return <span className="inline-block bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full text-xs">Accepted</span>;
        if (status === "REJECT") return <span className="inline-block bg-red-100 text-red-600 font-semibold px-3 py-1 rounded-full text-xs">Rejected</span>;
        return <span className="inline-block bg-yellow-100 text-yellow-700 font-semibold px-3 py-1 rounded-full text-xs">Pending</span>;
    }

    return (
        <>
            <StaffHeader />
            <div className="min-h-screen bg-gray-100 pt-6 px-4 sm:px-8 pb-10">
                <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Transaction History</h1>
                    <section className="mb-10">
                        <h2 className="text-xl font-bold text-gray-700 mb-4 border-b-2 border-green-300 pb-3">All Transactions</h2>
                        <div className="relative w-full sm:max-w-sm mb-4">
                            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" /></svg>
                            </span>
                            <input type="text" value={search} onChange={(e) => handleSearch(e.target.value)} placeholder="Search customer or reward..." className="w-full pl-9 pr-9 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition" />
                            {search && (
                                <button onClick={() => handleSearch("")} className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
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
                                        <th className="px-4 py-3 text-center">Points Spent</th>
                                        <th className="px-4 py-3 text-center">Status</th>
                                        <th className="px-4 py-3 text-left">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100 text-gray-700">
                                    {isLoading ? (
                                        <tr><td colSpan={6} className="text-center py-10 text-gray-400 italic">Loading transactions...</td></tr>
                                    ) : isError ? (
                                        <tr><td colSpan={6} className="text-center py-10 text-red-500 italic">Failed to load transactions.</td></tr>
                                    ) : filtered.length === 0 ? (
                                        <tr><td colSpan={6} className="text-center py-10 text-gray-400 italic">{search ? `No results for "${search}".` : "No transactions found."}</td></tr>
                                    ) : (
                                        paged.map((t, idx) => (
                                            <tr key={t.id} className="hover:bg-gray-50 transition">
                                                <td className="px-4 py-3 text-gray-500">{(currentPage - 1) * PAGE_SIZE + idx + 1}</td>
                                                <td className="px-4 py-3 font-medium">{t.userName}</td>
                                                <td className="px-4 py-3">{t.rewardName}</td>
                                                <td className="px-4 py-3 text-center">
                                                    <span className="inline-block bg-yellow-100 text-yellow-700 font-bold px-3 py-1 rounded-full text-xs">-{t.pointSpend} pts</span>
                                                </td>
                                                <td className="px-4 py-3 text-center">{statusBadge(t.status)}</td>
                                                <td className="px-4 py-3 text-gray-500 text-xs">{new Date(t.createdAt).toLocaleString()}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                            <StaffPagination currentPage={currentPage} totalPages={totalPages} totalItems={filtered.length} pageSize={PAGE_SIZE} onPageChange={setCurrentPage} />
                        </div>
                    </section>
                    <div className="text-center mt-6">
                        <Link href="/staff/orders" className="text-green-600 hover:text-green-500 font-medium">Back to Process Order</Link>
                    </div>
                </div>
            </div>
        </>
    );
}


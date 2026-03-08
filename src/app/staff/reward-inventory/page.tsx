"use client";

import { useState } from "react";
import Link from "next/link";
import StaffHeader from "@/components/layouts/StaffHeader";
import StaffPagination from "@/components/staff/StaffPagination";
import { useGetCompanyRewardsQuery } from "@/store/api/staffApi";

const PAGE_SIZE = 8;

export default function StaffRewardInventory() {
    const { data: rewards, isLoading, isError } = useGetCompanyRewardsQuery();
    const [search, setSearch] = useState("");
    const [stockFilter, setStockFilter] = useState<"all" | "instock" | "outofstock">("all");
    const [currentPage, setCurrentPage] = useState(1);

    const sortedRewards = (rewards ?? [])
        .filter((r) => r.name.toLowerCase().includes(search.toLowerCase()))
        .filter((r) => {
            if (stockFilter === "instock") return r.stock > 0;
            if (stockFilter === "outofstock") return r.stock <= 0;
            return true;
        })
        .sort((a, b) => {
            if (a.stock <= 0 && b.stock > 0) return 1;
            if (a.stock > 0 && b.stock <= 0) return -1;
            return a.name.localeCompare(b.name);
        });

    const totalPages = Math.max(1, Math.ceil(sortedRewards.length / PAGE_SIZE));
    const paged = sortedRewards.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    return (
        <>
            <div className="bg-gray-100 min-h-screen font-sans">
                <StaffHeader />
                <div className="min-h-screen bg-gray-100 pt-6 px-4 sm:px-8 pb-10">
                    <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
                        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Reward Inventory</h1>

                        <section className="mb-10">
                            <h2 className="text-xl font-bold text-gray-700 mb-4 border-b-2 border-green-300 pb-3">Available Rewards</h2>

                            {/* Search + Filter */}
                            <div className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-3 mb-5 sm:max-w-xl">
                                <div className="relative w-full">
                                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search rewards…"
                                        className="w-full pl-9 pr-9 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                                    />
                                    {search && (
                                        <button onClick={() => setSearch("")} className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </div>

                                <div className="relative w-full sm:w-36 shrink-0">
                                    <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                                        </svg>
                                    </span>
                                    <select
                                        value={stockFilter}
                                        onChange={(e) => setStockFilter(e.target.value as "all" | "instock" | "outofstock")}
                                        className="w-full pl-9 pr-8 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                                    >
                                        <option value="all">All</option>
                                        <option value="instock">In Stock</option>
                                        <option value="outofstock">Out of Stock</option>
                                    </select>
                                    <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
                                        <tr>
                                            <th className="px-4 py-3 text-left">#</th>
                                            <th className="px-4 py-3 text-left">Image</th>
                                            <th className="px-4 py-3 text-left">Reward Name</th>
                                            <th className="px-4 py-3 text-left">Description</th>
                                            <th className="px-4 py-3 text-center">Stock</th>
                                            <th className="px-4 py-3 text-center">Points Required</th>
                                            <th className="px-4 py-3 text-left">Company</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100 text-sm text-gray-700">
                                        {isLoading ? (
                                            Array.from({ length: 4 }).map((_, i) => (
                                                <tr key={i} className="animate-pulse">
                                                    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-6" /></td>
                                                    <td className="px-4 py-3"><div className="w-10 h-10 bg-gray-200 rounded-lg" /></td>
                                                    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-32" /></td>
                                                    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-48" /></td>
                                                    <td className="px-4 py-3 text-center"><div className="h-4 bg-gray-200 rounded w-10 mx-auto" /></td>
                                                    <td className="px-4 py-3 text-center"><div className="h-4 bg-gray-200 rounded w-16 mx-auto" /></td>
                                                    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-24" /></td>
                                                </tr>
                                            ))
                                        ) : isError ? (
                                            <tr>
                                                <td colSpan={7} className="text-center py-6 text-red-500 italic">
                                                    Failed to load rewards. Please try again later.
                                                </td>
                                            </tr>
                                        ) : !rewards || rewards.length === 0 ? (
                                            <tr>
                                                <td colSpan={7} className="text-center py-6 text-gray-500 italic">
                                                    No rewards in inventory.
                                                </td>
                                            </tr>
                                        ) : sortedRewards.length === 0 ? (
                                            <tr>
                                                <td colSpan={7} className="text-center py-6 text-gray-400 italic">
                                                    No rewards match &ldquo;{search}&rdquo;.
                                                </td>
                                            </tr>
                                        ) : (
                                            paged.map((reward, index) => (
                                                <tr key={reward.id} className="hover:bg-gray-50 transition">
                                                    <td className="px-4 py-3 font-medium text-gray-500">{(currentPage - 1) * PAGE_SIZE + index + 1}</td>
                                                    <td className="px-4 py-3">
                                                        {reward.image ? (
                                                            <img
                                                                src={reward.image}
                                                                alt={reward.name}
                                                                className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                                                            />
                                                        ) : (
                                                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-400">—</div>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3 font-semibold text-gray-800">{reward.name}</td>
                                                    <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{reward.description}</td>
                                                    <td className="px-4 py-3 text-center">
                                                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                                                            reward.stock <= 0
                                                                ? "bg-red-100 text-red-600"
                                                                : reward.stock <= 5
                                                                ? "bg-yellow-100 text-yellow-700"
                                                                : "bg-green-100 text-green-700"
                                                        }`}>
                                                            {reward.stock <= 0 ? "Out of Stock" : reward.stock}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-center font-semibold text-green-700">{reward.pointRequired} pts</td>
                                                    <td className="px-4 py-3 text-gray-600">{reward.companyName}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                                <StaffPagination currentPage={currentPage} totalPages={totalPages} totalItems={sortedRewards.length} pageSize={PAGE_SIZE} onPageChange={(p) => { setCurrentPage(p); }} />
                            </div>

                            {/* Summary */}
                            {rewards && rewards.length > 0 && (
                                <div className="mt-4 flex gap-6 text-sm text-gray-500">
                                    <span>Total rewards: <span className="font-semibold text-gray-700">{rewards.length}</span></span>
                                    <span>In stock: <span className="font-semibold text-green-700">{rewards.filter(r => r.stock > 0).length}</span></span>
                                    <span>Out of stock: <span className="font-semibold text-red-600">{rewards.filter(r => r.stock <= 0).length}</span></span>
                                </div>
                            )}
                        </section>

                        <div className="text-center mt-6">
                            <Link href="/staff/orders" className="text-green-600 hover:text-green-500 font-medium">Back to Process Order</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

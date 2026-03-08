"use client";

import StaffHeader from "@/components/layouts/StaffHeader";
import { useGetCompanyRewardsQuery } from "@/store/api/staffApi";

export default function StaffRewardInventory() {
    const { data: rewards, isLoading, isError } = useGetCompanyRewardsQuery();

    return (
        <>
            <div className="bg-gray-100 p-8 font-sans">
                <StaffHeader />
                <main>
                    <div className="container mx-auto p-6 bg-white rounded-xl shadow-lg max-w-6xl w-full">
                        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Reward Inventory 🎁</h1>

                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b-2 border-green-300 pb-3">Available Rewards</h2>
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
                                        ) : (
                                            rewards.map((reward, index) => (
                                                <tr key={reward.id} className="hover:bg-gray-50 transition">
                                                    <td className="px-4 py-3 font-medium text-gray-500">{index + 1}</td>
                                                    <td className="px-4 py-3">
                                                        {reward.image ? (
                                                            <img
                                                                src={reward.image}
                                                                alt={reward.name}
                                                                className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                                                            />
                                                        ) : (
                                                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xl">🎁</div>
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
                            <a href="/staff/orders" className="text-green-600 hover:text-green-500 font-medium">Back to Staff Dashboard</a>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

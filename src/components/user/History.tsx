import UserHeader from "@/components/layouts/UserHeader";
import Link from "next/link";

export default function History() {
    return (
        <>
            <div className="w-full min-h-screen bg-gray-50">
                <UserHeader />

                <div className="w-[85%] mx-auto pt-24 pb-10">
                    <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2">Transaction History 🧾</h1>
                    <p className="text-center text-gray-500 mb-10">A full record of your points earned and rewards redeemed.</p>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                            <p className="text-sm text-gray-500 mb-1">Total Points Earned</p>
                            <p className="text-3xl font-extrabold text-green-600">0</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                            <p className="text-sm text-gray-500 mb-1">Total Points Redeemed</p>
                            <p className="text-3xl font-extrabold text-green-600">0</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                            <p className="text-sm text-gray-500 mb-1">Current Balance</p>
                            <p className="text-3xl font-extrabold text-green-800">0</p>
                        </div>
                    </div>

                    {/* Transactions Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-gray-700">All Transactions</h2>
                            <span className="text-sm text-gray-400">0 records</span>
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
                                <tr>
                                    <td colSpan={6} className="text-center py-16 text-gray-400 italic">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="text-5xl">📭</span>
                                            <span className="text-base">No transactions found yet.</span>
                                            <span className="text-sm text-gray-400">Start earning points by making a purchase!</span>
                                        </div>
                                    </td>
                                </tr>
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

"use client";
import UserHeader from "@/components/layouts/UserHeader";
import { useGetUserProfileQuery } from "@/store/api/userApi";

export default function Redeem() {
    const { data: user, isLoading } = useGetUserProfileQuery();
    const initial = user?.name?.charAt(0).toUpperCase() ?? "U";

    return (
        <>
            <div className="w-full min-h-screen bg-gray-50">
                <UserHeader />

                <div className="w-[85%] mx-auto py-8">
                    {/* User Banner */}
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-6 rounded-lg shadow-md mb-8 flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center mb-4 md:mb-0">
                            {isLoading ? (
                                <div className="w-16 h-16 rounded-full border-2 border-white mr-4 bg-purple-400 animate-pulse" />
                            ) : user?.profileImage ? (
                                <img src={user.profileImage} alt={user.name} className="w-16 h-16 rounded-full border-2 border-white mr-4 object-cover" />
                            ) : (
                                <div className="w-16 h-16 rounded-full border-2 border-white mr-4 bg-white/20 flex items-center justify-center text-2xl font-extrabold">
                                    {initial}
                                </div>
                            )}
                            <div>
                                <p className="text-xl font-semibold">{isLoading ? "Loading…" : (user?.name ?? "User")}</p>
                                <p className="text-sm text-purple-200 mt-1">Company: {isLoading ? "…" : (user?.companyName ?? "N/A")}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-3xl font-bold">Your Points: {isLoading ? "…" : (user?.points ?? 0)}</span>
                            <p className="text-sm opacity-90 mt-1">Points available for redemption</p>
                        </div>
                    </div>

                    {/* Rewards */}
                    <div className="max-w-5xl mx-auto p-6">
                        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">Redeem Your Rewards 🎁</h1>
                        <div className="text-center text-gray-500 italic">
                            No rewards available for redemption.
                        </div>
                    </div>
                </div>
            </div>

            {/* Redeem Modal */}
            <div id="redeemModal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
                <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
                    <button className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl">&times;</button>
                    <h2 className="text-2xl font-bold text-purple-700 mb-4">Confirm Reward Redemption</h2>
                    <div className="flex gap-4 items-start">
                        <img id="modal-img" src="#" alt="Reward Image" className="w-20 h-20 rounded shadow" />
                        <div>
                            <p id="modal-name" className="font-semibold text-gray-800 text-lg"></p>
                            <p id="modal-description" className="text-sm text-gray-600 mt-1"></p>
                            <p className="text-sm text-gray-600">Available Stock: <span id="modal-stock"></span></p>
                            <p className="text-sm mt-2"><span className="font-medium text-gray-800">Points Required:</span> <span id="modal-points" className="text-purple-600 font-semibold"></span></p>
                        </div>
                    </div>
                    <input type="hidden" id="modal-reward-id" />
                    <div className="mt-6 text-right">
                        <button id="confirmRedeemBtn" className="bg-purple-600 text-white px-4 py-2 rounded font-semibold hover:bg-purple-700 transition duration-300">
                            Redeem Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Notification Box */}
            <div id="notificationBox" className="fixed top-6 right-6 z-50 hidden p-4 rounded-lg shadow-lg text-white text-sm font-medium"></div>
        </>
    );
}

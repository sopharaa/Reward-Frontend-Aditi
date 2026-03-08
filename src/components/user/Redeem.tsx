"use client";
import { useState } from "react";
import UserHeader from "@/components/layouts/UserHeader";
import {
    useGetUserProfileQuery,
    useGetRewardsByCompanyQuery,
    useRedeemRewardMutation,
} from "@/store/api/userApi";
import type { Reward } from "@/store/api/userApi";

export default function Redeem() {
    const { data: user, isLoading: userLoading, refetch: refetchUser } = useGetUserProfileQuery();

    const {
        data: rewards,
        isLoading: rewardsLoading,
        isError: rewardsError,
    } = useGetRewardsByCompanyQuery();

    const [redeemReward, { isLoading: redeeming }] = useRedeemRewardMutation();

    const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
    const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

    const initial = user?.name?.charAt(0).toUpperCase() ?? "U";

    function showToast(msg: string, type: "success" | "error") {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3500);
    }

    async function handleConfirmRedeem() {
        if (!selectedReward) return;
        try {
            await redeemReward(selectedReward.id).unwrap();
            showToast(`🎉 "${selectedReward.name}" redeemed successfully!`, "success");
            refetchUser();
        } catch (err: unknown) {
            const msg =
                (err as { data?: { message?: string } })?.data?.message ??
                "Redemption failed. Please try again.";
            showToast(msg, "error");
        } finally {
            setSelectedReward(null);
        }
    }

    const canAfford = (reward: Reward) => (user?.points ?? 0) >= reward.pointRequired;

    return (
        <>
            <div className="w-full min-h-screen bg-gray-50">
                <UserHeader />

                <div className="w-[85%] mx-auto pt-24 pb-12">
                    {/* User Banner */}
                    <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-6 rounded-lg shadow-md mb-10 flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center mb-4 md:mb-0">
                            {userLoading ? (
                                <div className="w-16 h-16 rounded-full border-2 border-white mr-4 bg-green-400 animate-pulse" />
                            ) : user?.profileImage ? (
                                <img
                                    src={user.profileImage}
                                    alt={user.name}
                                    className="w-16 h-16 rounded-full border-2 border-white mr-4 object-cover"
                                />
                            ) : (
                                <div className="w-16 h-16 rounded-full border-2 border-white mr-4 bg-white/20 flex items-center justify-center text-2xl font-extrabold">
                                    {initial}
                                </div>
                            )}
                            <div>
                                <p className="text-xl font-semibold">
                                    {userLoading ? "Loading…" : (user?.name ?? "User")}
                                </p>
                                <p className="text-sm text-green-200 mt-1">
                                    Company: {userLoading ? "…" : (user?.companyName ?? "N/A")}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-3xl font-bold">
                                Your Points: {userLoading ? "…" : (user?.points ?? 0)}
                            </span>
                            <p className="text-sm opacity-90 mt-1">Points available for redemption</p>
                        </div>
                    </div>

                    {/* Section Title */}
                    <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-3">Redeem Your Rewards 🎁</h1>
                    <p className="text-center text-gray-500 mb-10 text-base">Use your points to claim exclusive rewards from your company.</p>

                    {/* Rewards Grid */}
                    {rewardsLoading || userLoading ? (
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                                    <div className="w-full h-32 sm:h-40 lg:h-48 bg-gray-200" />
                                    <div className="p-3 sm:p-4 lg:p-5 space-y-3">
                                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                                        <div className="h-3 bg-gray-200 rounded w-full" />
                                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                                        <div className="h-8 bg-gray-200 rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : rewardsError ? (
                        <div className="text-center text-red-500 py-16 text-lg">
                            Failed to load rewards. Please try again later.
                        </div>
                    ) : !rewards || rewards.length === 0 ? (
                        <div className="text-center py-24">
                            <div className="text-6xl mb-4">🎁</div>
                            <p className="text-gray-500 text-lg italic">No rewards available for your company yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {rewards.map((reward) => {
                                const affordable = canAfford(reward);
                                const outOfStock = reward.stock <= 0;
                                return (
                                    <div
                                        key={reward.id}
                                        className={`bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col transition-shadow hover:shadow-lg ${
                                            outOfStock ? "opacity-60 border-gray-200" : "border-gray-200"
                                        }`}
                                    >
                                        {/* Image */}
                                        <div className="w-full h-32 sm:h-40 lg:h-48 bg-gray-100 overflow-hidden">
                                            {reward.image ? (
                                                <img
                                                    src={reward.image}
                                                    alt={reward.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-3xl lg:text-5xl text-gray-300">
                                                    🎁
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-3 sm:p-4 lg:p-5 flex flex-col flex-1">
                                            <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 mb-1 line-clamp-1">{reward.name}</h3>
                                            <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3 flex-1 line-clamp-2">{reward.description}</p>

                                            <div className="flex items-center justify-between mb-2 sm:mb-4">
                                                <div className="flex items-center gap-1 text-green-700 font-semibold text-xs sm:text-sm">
                                                    <span className="text-base sm:text-xl">⭐</span>
                                                    <span>{reward.pointRequired} pts</span>
                                                </div>
                                                <span className={`text-xs font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${
                                                    outOfStock
                                                        ? "bg-red-100 text-red-600"
                                                        : "bg-green-100 text-green-700"
                                                }`}>
                                                    {outOfStock ? "Out of Stock" : `${reward.stock} left`}
                                                </span>
                                            </div>

                                            <button
                                                disabled={outOfStock || !affordable}
                                                onClick={() => setSelectedReward(reward)}
                                                className={`w-full py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition ${
                                                    outOfStock
                                                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                        : !affordable
                                                        ? "bg-yellow-100 text-yellow-700 cursor-not-allowed"
                                                        : "bg-green-600 text-white hover:bg-green-700"
                                                }`}
                                            >
                                                {outOfStock
                                                    ? "Out of Stock"
                                                    : !affordable
                                                    ? `Need ${reward.pointRequired - (user?.points ?? 0)} more pts`
                                                    : "Redeem Now"}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Redeem Confirmation Modal */}
            {selectedReward && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-7 w-full max-w-md relative">
                        <button
                            onClick={() => setSelectedReward(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl leading-none"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold text-green-700 mb-5">Confirm Redemption</h2>

                        <div className="flex gap-4 items-start mb-5">
                            <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                                {selectedReward.image ? (
                                    <img
                                        src={selectedReward.image}
                                        alt={selectedReward.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-3xl text-gray-300">🎁</div>
                                )}
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800 text-lg">{selectedReward.name}</p>
                                <p className="text-sm text-gray-500 mt-1">{selectedReward.description}</p>
                                <p className="text-sm text-gray-500 mt-1">Stock: <span className="font-medium">{selectedReward.stock}</span></p>
                                <p className="text-sm mt-2">
                                    <span className="font-medium text-gray-800">Points Required: </span>
                                    <span className="text-green-600 font-bold">{selectedReward.pointRequired} pts</span>
                                </p>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-sm text-gray-600">
                            <div className="flex justify-between">
                                <span>Your current points:</span>
                                <span className="font-semibold text-gray-800">{user?.points ?? 0} pts</span>
                            </div>
                            <div className="flex justify-between mt-1">
                                <span>After redemption:</span>
                                <span className="font-semibold text-green-700">
                                    {(user?.points ?? 0) - selectedReward.pointRequired} pts
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setSelectedReward(null)}
                                className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmRedeem}
                                disabled={redeeming}
                                className="flex-1 bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-60"
                            >
                                {redeeming ? "Processing…" : "Confirm Redeem"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {toast && (
                <div
                    className={`fixed top-6 right-6 z-50 px-5 py-4 rounded-xl shadow-lg text-white text-sm font-medium transition-all ${
                        toast.type === "success" ? "bg-green-600" : "bg-red-500"
                    }`}
                >
                    {toast.msg}
                </div>
            )}
        </>
    );
}


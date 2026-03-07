"use client";
import Link from "next/link";
import UserHeader from "@/components/layouts/UserHeader";
import { useGetUserProfileQuery } from "@/store/api/userApi";

export default function Dashboard() {
    const { data: user, isLoading } = useGetUserProfileQuery();

    const initial = user?.name?.charAt(0).toUpperCase() ?? "U";

    return (
        <>
            <div className="w-full min-h-screen bg-gray-50">
                <UserHeader />

                <div className="w-[85%] mx-auto py-8">
                    <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Welcome 👋</h1>

                    {/* User Info Banner */}
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
                                <p className="text-xl font-semibold">
                                    {isLoading ? "Loading…" : (user?.name ?? "User")}
                                </p>
                                <p className="text-sm text-purple-200 mt-1">
                                    Company: {isLoading ? "…" : (user?.companyName ?? "N/A")}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-3xl font-bold">
                                Your Points: {isLoading ? "…" : (user?.points ?? 0)}
                            </span>
                            <p className="text-sm opacity-90 mt-1">Points available for redemption</p>
                        </div>
                    </div>

                    {/* Quick Links Section */}
                    <section className="mb-10">
                        <h2 className="text-3xl font-bold text-gray-700 mb-6 border-b-2 border-purple-300 pb-3">Quick Actions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center max-w-3xl mx-auto">
                            <Link href="/redeem" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 text-center border border-gray-200">
                                <div className="text-indigo-600 mb-3">
                                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.592 1L21 12h-3.812c-.669 0-1.309.298-1.764.81l-1.686 1.988c-.352.413-.853.622-1.353.622H12l-1.353-.622c-.5-.195-1-.404-1.352-.622L5.812 12H2l-.592-.592C2.92 8.402 3.89 8 5 8h2.082A1 1 0 008 7.21V5.79c0-.427-.42-.773-.94-.773H5c-1.11 0-2.08.402-2.592 1L2 6.592V12h3.812c.669 0 1.309-.298 1.764-.81l1.686-1.988c.352-.413.853-.622 1.353-.622H12z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800">Redeem Rewards</h3>
                                <p className="text-gray-600 text-sm mt-1">Exchange points for exciting rewards</p>
                            </Link>

                            <Link href="/history" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 text-center border border-gray-200">
                                <div className="text-green-600 mb-3">
                                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800">Redemption History</h3>
                                <p className="text-gray-600 text-sm mt-1">Review your past reward claims</p>
                            </Link>
                        </div>
                    </section>

                    {/* How to Use Section */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-700 mb-8 border-b-2 border-purple-300 pb-3 text-center">How to Use PointTrix</h2>
                        <div className="max-w-2xl mx-auto relative border-l-4 border-purple-400 pl-6 space-y-10">
                            <div className="relative">
                                <div className="absolute -left-7 top-1.5 bg-purple-400 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                                <h3 className="text-lg font-semibold text-gray-800">Buy Item 🛒</h3>
                                <p className="text-sm text-gray-600 mt-1">Start your journey by making a purchase through your company&apos;s store. Whether it&apos;s office supplies, apparel, or electronics, every eligible item counts. Simply log in, shop as usual, and make sure your purchase is linked to your PointTrix account. Once your order is confirmed, you&apos;ll be ready to earn.</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-7 top-1.5 bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                                <h3 className="text-lg font-semibold text-gray-800">Earn Points 💰</h3>
                                <p className="text-sm text-gray-600 mt-1">After your purchase, points are automatically credited to your account based on the order amount. The more you shop, the more points you accumulate. These points reflect your activity and loyalty, giving you the power to unlock various benefits and rewards over time.</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-7 top-1.5 bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                                <h3 className="text-lg font-semibold text-gray-800">Use Points 🎯</h3>
                                <p className="text-sm text-gray-600 mt-1">Once you&apos;ve earned enough points, you can start exploring our rewards catalog. From gift cards and gadgets to exclusive services, there&apos;s something for everyone. Select the item you want and apply your points during the redemption process.</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-7 top-1.5 bg-yellow-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">4</div>
                                <h3 className="text-lg font-semibold text-gray-800">Get Reward 🎁</h3>
                                <p className="text-sm text-gray-600 mt-1">Once your redemption is confirmed, your reward will be processed instantly. Enjoy your perks — you&apos;ve earned them!</p>
                            </div>
                        </div>
                        <div className="text-center mt-10">
                            <Link href="/history" className="inline-block text-purple-600 hover:text-purple-500 font-medium">View Your History →</Link>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}


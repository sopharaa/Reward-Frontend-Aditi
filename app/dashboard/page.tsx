"use client";
export default function Dashboard() {
    return (
        <>
            <head><script src="https://cdn.tailwindcss.com"></script></head>
            <style>{`
        body {
          font-family: 'Inter', sans-serif;
          background-color: #f0f2f5;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          min-height: 100vh;
          padding: 20px;
          box-sizing: border-box;
        }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
        ::-webkit-scrollbar-thumb { background: #888; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #555; }
        .modal {
          display: none; position: fixed; z-index: 1000;
          left: 0; top: 0; width: 100%; height: 100%;
          overflow: auto; background-color: rgba(0,0,0,0.4);
          justify-content: center; align-items: center;
        }
        .modal-content {
          background-color: #fefefe; margin: auto; padding: 30px;
          border-radius: 15px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          max-width: 500px; text-align: center; position: relative;
        }
        .close-button {
          color: #aaa; position: absolute; top: 15px; right: 20px;
          font-size: 28px; font-weight: bold; cursor: pointer;
        }
        .close-button:hover, .close-button:focus { color: black; text-decoration: none; cursor: pointer; }
      `}</style>

            <div className="w-full p-6 bg-white rounded-xl shadow-lg">
                {/* Header / Nav */}
                <nav className="flex justify-between items-center mb-10 pb-4 border-b border-gray-200">
                    <a href="/dashboard" className="text-2xl font-extrabold text-purple-700">PointTrix</a>
                    <ul className="flex space-x-6">
                        <li><a href="/dashboard" className="text-gray-700 hover:text-purple-600 font-medium transition duration-300">Dashboard</a></li>
                        <li><a href="/redeem" className="text-gray-700 hover:text-purple-600 font-medium transition duration-300">Redeem Rewards</a></li>
                        <li><a href="/history" className="text-gray-700 hover:text-purple-600 font-medium transition duration-300">History</a></li>
                        <li><a href="/profile" className="text-gray-700 hover:text-purple-600 font-medium transition duration-300">Profile</a></li>
                        <li>
                            <form method="POST" action="/api/logout">
                                <button type="submit"
                                    className="text-red-600 border-0 bg-transparent text-start font-normal hover:underline hover:font-bold"
                                    style={{ font: 'inherit', cursor: 'pointer', fontWeight: 'bold', color: 'red' }}>
                                    Logout
                                </button>
                            </form>
                        </li>
                    </ul>
                </nav>

                {/* Content */}
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Welcome 👋</h1>

                <div className="w-[80%] mx-auto">
                    {/* User Information and Points Balance */}
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-6 rounded-lg shadow-md mb-8 flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center mb-4 md:mb-0">
                            <img
                                src="https://placehold.co/60x60/8B5CF6/FFFFFF?text=U"
                                alt="User Profile"
                                className="w-16 h-16 rounded-full border-2 border-white mr-4 object-cover"
                            />
                            <div>
                                <p className="text-xl font-semibold">User Name</p>
                                <p className="text-sm text-gray-300 mt-1">Company: N/A</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-3xl font-bold">
                                Your Points: <span id="user-points">0</span>
                            </span>
                            <p className="text-sm opacity-90 mt-1">Points available for redemption</p>
                        </div>
                    </div>

                    {/* Quick Links Section */}
                    <section className="mb-10">
                        <h2 className="text-3xl font-bold text-gray-700 mb-6 border-b-2 border-purple-300 pb-3">Quick Actions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center max-w-3xl mx-auto">
                            {/* Redeem Rewards */}
                            <a href="/redeem" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 text-center border border-gray-200">
                                <div className="text-indigo-600 mb-3">
                                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.592 1L21 12h-3.812c-.669 0-1.309.298-1.764.81l-1.686 1.988c-.352.413-.853.622-1.353.622H12l-1.353-.622c-.5-.195-1-.404-1.352-.622L5.812 12H2l-.592-.592C2.92 8.402 3.89 8 5 8h2.082A1 1 0 008 7.21V5.79c0-.427-.42-.773-.94-.773H5c-1.11 0-2.08.402-2.592 1L2 6.592V12h3.812c.669 0 1.309-.298 1.764-.81l1.686-1.988c.352-.413.853-.622 1.353-.622H12z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800">Redeem Rewards</h3>
                                <p className="text-gray-600 text-sm mt-1">Exchange points for exciting rewards</p>
                            </a>

                            {/* Redemption History */}
                            <a href="/history" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 text-center border border-gray-200">
                                <div className="text-green-600 mb-3">
                                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800">Redemption History</h3>
                                <p className="text-gray-600 text-sm mt-1">Review your past reward claims</p>
                            </a>
                        </div>
                    </section>

                    {/* How to Use Section */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-700 mb-8 border-b-2 border-purple-300 pb-3 text-center">How to Use PointTrix</h2>
                        <div className="max-w-2xl mx-auto relative border-l-4 border-purple-400 pl-6 space-y-10">
                            {/* Step 1 */}
                            <div className="relative">
                                <div className="absolute -left-7 top-1.5 bg-purple-400 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                                <h3 className="text-lg font-semibold text-gray-800">Buy Item 🛒</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    Start your journey by making a purchase through your company&apos;s store. Whether it&apos;s office supplies, apparel, or electronics, every eligible item counts.
                                    Simply log in, shop as usual, and make sure your purchase is linked to your PointTrix account. Once your order is confirmed, you&apos;ll be ready to earn.
                                </p>
                            </div>
                            {/* Step 2 */}
                            <div className="relative">
                                <div className="absolute -left-7 top-1.5 bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                                <h3 className="text-lg font-semibold text-gray-800">Earn Points 💰</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    After your purchase, points are automatically credited to your account based on the order amount. The more you shop, the more points you accumulate.
                                    These points reflect your activity and loyalty, giving you the power to unlock various benefits and rewards over time.
                                </p>
                            </div>
                            {/* Step 3 */}
                            <div className="relative">
                                <div className="absolute -left-7 top-1.5 bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                                <h3 className="text-lg font-semibold text-gray-800">Use Points 🎯</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    Once you&apos;ve earned enough points, you can start exploring our rewards catalog. From gift cards and gadgets to exclusive services, there&apos;s something for everyone.
                                    Select the item you want and apply your points during the redemption process.
                                </p>
                            </div>
                            {/* Step 4 */}
                            <div className="relative">
                                <div className="absolute -left-7 top-1.5 bg-yellow-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">4</div>
                                <h3 className="text-lg font-semibold text-gray-800">Get Reward 🎁</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    Once your redemption is confirmed, your reward will be processed instantly. Enjoy your perks — you&apos;ve earned them!
                                </p>
                            </div>
                        </div>
                        <div className="text-center mt-10">
                            <a href="/history" className="inline-block text-purple-600 hover:text-purple-500 font-medium">View Your History →</a>
                        </div>
                    </section>
                </div>
            </div>

            {/* Modal */}
            <div id="rewardModal" className="modal">
                <div className="modal-content">
                    <span className="close-button">&times;</span>
                    <h2 id="modal-title" className="text-2xl font-bold text-gray-800 mb-4"></h2>
                    <p id="modal-message" className="text-gray-700 mb-6"></p>
                    <button className="bg-purple-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-purple-700 transition duration-300">Got It!</button>
                </div>
            </div>
        </>
    );
}

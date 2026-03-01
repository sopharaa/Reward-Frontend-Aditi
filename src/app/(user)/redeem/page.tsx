"use client";
export default function Redeem() {
    return (
        <>
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

                <div className="w-[80%] mx-auto">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-6 rounded-lg shadow-md mb-8 flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center mb-4 md:mb-0">
                            <img
                                src="https://placehold.co/60x60/8B5CF6/FFFFFF?text=U"
                                alt="User Profile"
                                className="w-16 h-16 rounded-full border-2 border-white mr-4 object-cover" />
                            <div>
                                <p className="text-xl font-semibold">User Name</p>
                                <p className="text-sm text-gray-300 mt-1">Company: N/A</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-3xl font-bold">Your Points: <span id="user-points">0</span></span>
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

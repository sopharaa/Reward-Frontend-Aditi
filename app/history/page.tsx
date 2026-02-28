export default function History() {
    return (
        <>
            <head><script src="https://cdn.tailwindcss.com"></script></head>
            <style>{`
        body {
          font-family: 'Inter', sans-serif;
          background-color: #f0f2f5;
          display: flex; justify-content: center; align-items: flex-start;
          min-height: 100vh; padding: 20px; box-sizing: border-box;
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
          border-radius: 15px; box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          max-width: 500px; text-align: center; position: relative;
        }
        .close-button {
          color: #aaa; position: absolute; top: 15px; right: 20px;
          font-size: 28px; font-weight: bold; cursor: pointer;
        }
        .close-button:hover, .close-button:focus { color: black; }
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
                                <button type="submit" className="text-red-600 border-0 bg-transparent text-start font-normal hover:underline hover:font-bold" style={{ font: 'inherit', cursor: 'pointer', fontWeight: 'bold', color: 'red' }}>
                                    Logout
                                </button>
                            </form>
                        </li>
                    </ul>
                </nav>

                <div className="w-[80%] mx-auto">
                    <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Transaction History 🧾</h1>

                    <div className="text-center text-gray-500 italic">No transactions found yet.</div>

                    <div className="text-center mt-6">
                        <a href="/dashboard" className="text-purple-600 hover:text-purple-500 font-medium">Back to Dashboard</a>
                    </div>
                </div>
            </div>

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

export default function Profile() {
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

                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Your Profile 👤</h1>

                <div className="w-[80%] mx-auto">
                    <section className="mb-10">
                        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-6 rounded-lg shadow-md mb-8 flex flex-col md:flex-row items-center justify-between">
                            <div className="flex items-center mb-4 md:mb-0">
                                <img
                                    src="https://placehold.co/80x80/8B5CF6/FFFFFF?text=JD"
                                    alt="User Profile"
                                    className="w-20 h-20 object-cover rounded-full border-2 border-white mr-4"
                                />
                                <div>
                                    <p className="text-2xl font-semibold">User Name</p>
                                    <p className="text-sm opacity-90">user@example.com</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-3xl font-bold">Points: 0</span>
                                <p className="text-sm opacity-90 mt-1">Current points balance</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b-2 border-purple-300 pb-3">Personal Details</h2>
                            <form method="POST" action="/api/profile/update" encType="multipart/form-data">
                                <div className="mb-4">
                                    <label htmlFor="profile_image" className="block text-sm font-medium text-gray-700 mb-1">Upload Profile Image</label>
                                    <input type="file" id="profile_image" name="profile_image" className="block w-full border border-gray-300 rounded-md px-4 py-2" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="user_name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input type="text" id="user_name" name="user_name" className="block w-full border border-gray-300 rounded-md px-4 py-2" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="user_email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input type="email" id="user_email" name="user_email" className="block w-full border border-gray-300 rounded-md px-4 py-2" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                                    <input type="text" value="N/A" className="block w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 cursor-not-allowed" readOnly />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                    <input type="password" id="password" name="password" className="block w-full border border-gray-300 rounded-md px-4 py-2" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                    <input type="password" id="password_confirmation" name="password_confirmation" className="block w-full border border-gray-300 rounded-md px-4 py-2" />
                                </div>
                                <div className="text-right">
                                    <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-md shadow-md transition">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </section>

                    <div className="text-center mt-6">
                        <a href="/dashboard" className="text-purple-600 hover:text-purple-500 font-medium">← Back to Dashboard</a>
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

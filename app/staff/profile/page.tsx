export default function StaffProfile() {
    return (
        <>
            <head><script src="https://cdn.tailwindcss.com"></script></head>
            <div className="bg-gray-100 p-8 font-sans">
                <header className="mb-10">
                    <nav className="flex justify-between items-center pb-4 border-b border-gray-200">
                        <a href="/staff/orders" className="text-2xl font-extrabold text-indigo-700">PointTrix Staff</a>
                        <ul className="flex space-x-6">
                            <li><a href="/staff/orders" className="text-gray-700 hover:text-indigo-600 font-medium transition duration-300">Customer Orders</a></li>
                            <li><a href="/staff/redemptions" className="text-gray-700 hover:text-indigo-600 font-medium transition duration-300">Redeem Requests</a></li>
                            <li><a href="/staff/order-history" className="text-gray-700 hover:text-indigo-600 font-medium transition duration-300">Order History</a></li>
                            <li><a href="/staff/reward-inventory" className="text-gray-700 hover:text-indigo-600 font-medium transition duration-300">Reward Inventory</a></li>
                            <li><a href="/staff/transactions" className="text-gray-700 hover:text-indigo-600 font-medium transition duration-300">Transaction History</a></li>
                            <li><a href="/staff/profile" className="text-gray-700 hover:text-indigo-600 font-medium transition duration-300">Profile</a></li>
                            <li>
                                <form method="POST" action="/api/staff/logout">
                                    <button type="submit" className="text-red-600 font-medium hover:underline transition duration-300">Logout</button>
                                </form>
                            </li>
                        </ul>
                    </nav>
                </header>
                <main>
                    <div className="container mx-auto p-6 bg-white rounded-xl shadow-lg max-w-3xl w-full">
                        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Staff Profile 👤</h1>

                        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-6 rounded-lg shadow-md mb-8 flex flex-col md:flex-row items-center justify-between">
                            <div className="flex items-center mb-4 md:mb-0">
                                <img
                                    src="https://placehold.co/80x80/6366F1/FFFFFF?text=S"
                                    alt="Staff Profile"
                                    className="w-20 h-20 object-cover rounded-full border-2 border-white mr-4" />
                                <div>
                                    <p className="text-2xl font-semibold">Staff Name</p>
                                    <p className="text-sm opacity-90">staff@example.com</p>
                                    <p className="text-sm opacity-75 mt-1">Company: N/A</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b-2 border-purple-300 pb-3">Personal Details</h2>
                            <form method="POST" action="/api/staff/profile/update">
                                <div className="mb-4">
                                    <label htmlFor="staff_name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input type="text" id="staff_name" name="staff_name" className="block w-full border border-gray-300 rounded-md px-4 py-2" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="staff_email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input type="email" id="staff_email" name="staff_email" className="block w-full border border-gray-300 rounded-md px-4 py-2" />
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
                                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-md shadow-md transition">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="text-center mt-6">
                            <a href="/staff/orders" className="text-purple-600 hover:text-purple-500 font-medium">← Back to Dashboard</a>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

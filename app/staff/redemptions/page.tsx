export default function StaffRedemptions() {
    return (
        <>
            <head><script src="https://cdn.tailwindcss.com"></script></head>
            <div className="bg-gray-100 p-8 font-sans">
                {/* Header */}
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
                    <div className="container mx-auto p-6 bg-white rounded-xl shadow-lg max-w-5xl w-full">
                        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Review Redemptions ✅</h1>

                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b-2 border-purple-300 pb-3">Pending Approvals</h2>

                            <div className="text-center text-gray-500 italic">No pending redemptions at the moment.</div>
                        </section>

                        <div className="text-center mt-6">
                            <a href="/staff/orders" className="text-purple-600 hover:text-purple-500 font-medium">Back to Staff Dashboard</a>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

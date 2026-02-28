export default function StaffOrderHistory() {
    const navLinks = [
        { href: "/staff/orders", label: "Customer Orders" },
        { href: "/staff/redemptions", label: "Redeem Requests" },
        { href: "/staff/order-history", label: "Order History" },
        { href: "/staff/reward-inventory", label: "Reward Inventory" },
        { href: "/staff/transactions", label: "Transaction History" },
        { href: "/staff/profile", label: "Profile" },
    ];

    return (
        <>
            <head><script src="https://cdn.tailwindcss.com"></script></head>
            <div className="bg-gray-100 p-8 font-sans">
                <header className="mb-10">
                    <nav className="flex justify-between items-center pb-4 border-b border-gray-200">
                        <a href="/staff/orders" className="text-2xl font-extrabold text-indigo-700">PointTrix Staff</a>
                        <ul className="flex space-x-6">
                            {navLinks.map(l => (
                                <li key={l.href}><a href={l.href} className="text-gray-700 hover:text-indigo-600 font-medium transition duration-300">{l.label}</a></li>
                            ))}
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
                        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Order History 🧾</h1>

                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b-2 border-purple-300 pb-3">All Orders</h2>
                            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
                                        <tr>
                                            <th className="px-4 py-3 text-left">#</th>
                                            <th className="px-4 py-3 text-left">User</th>
                                            <th className="px-4 py-3 text-left">Items</th>
                                            <th className="px-4 py-3 text-center">Total</th>
                                            <th className="px-4 py-3 text-center">Points</th>
                                            <th className="px-4 py-3 text-left">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100 text-sm text-gray-700">
                                        <tr>
                                            <td colSpan={6} className="text-center py-6 text-gray-500 italic">No orders found.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
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

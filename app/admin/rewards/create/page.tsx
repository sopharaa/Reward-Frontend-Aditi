export default function AdminCreateReward() {
    return (
        <>
            <link rel="stylesheet" href="/css/admin-style.css" precedence="default" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" precedence="default" />

            <div className="container">
                {/* Sidebar */}
                <aside className="sidebar">
                    <div className="menu">
                        <ul>
                            <li>
                                <div className="d-flex flex-column align-items-center">
                                    <a href="/admin/setting" className="text-decoration-none text-center">
                                        <img src="https://placehold.co/50x50/8B5CF6/FFFFFF?text=A" alt="Avatar"
                                            className="rounded-circle border border-2 border-secondary shadow-sm"
                                            style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                        <div className="form-label">Admin</div>
                                    </a>
                                </div>
                            </li>
                            <li><a href="/admin/dashboard">Dashboard</a></li>
                            <li><a href="/admin/companies">Company Management</a></li>
                            <li><a href="/admin/rewards">Rewards Management</a></li>
                            <li><a href="/admin/users">Users Management</a></li>
                            <li><a href="/admin/staffs">Staffs Management</a></li>
                            <li><a href="/admin/transactions">Transaction History</a></li>
                            <li className="hi">
                                <form method="POST" action="/api/admin/logout">
                                    <button type="submit" className="text-danger border-0 bg-transparent text-start" style={{ font: 'inherit', cursor: 'pointer' }}>Logout</button>
                                </form>
                            </li>
                        </ul>
                    </div>
                </aside>

                <div className="content">
                    <div className="container d-flex justify-content-center align-items-start">
                        <div className="card shadow-sm w-100" style={{ maxWidth: '500px' }}>
                            <div className="card-header bg-primary text-white">
                                <h4 className="mb-0">Add New Reward</h4>
                            </div>

                            <div className="card-body">
                                <form id="create-reward-form" className="space-y-6" method="POST" action="/api/admin/rewards" encType="multipart/form-data">
                                    <div>
                                        <label htmlFor="reward_name" className="block text-sm font-medium text-gray-700 mb-1">Reward Name</label>
                                        <input type="text" id="reward_name" name="reward_name" required
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm" />
                                    </div>

                                    <div>
                                        <label htmlFor="reward_desc" className="block text-sm font-medium text-gray-700 mb-1">Reward Description</label>
                                        <textarea id="reward_desc" name="reward_desc" required
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"></textarea>
                                    </div>

                                    <div>
                                        <label htmlFor="reward_stock" className="block text-sm font-medium text-gray-700 mb-1">Reward Stock</label>
                                        <input type="number" id="reward_stock" name="reward_stock" required
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm" />
                                    </div>

                                    <div>
                                        <label htmlFor="reward_image" className="block text-sm font-medium text-gray-700 mb-1">Reward Image (optional)</label>
                                        <input type="file" id="reward_image" name="reward_image" accept="image/*"
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm" />
                                    </div>

                                    <div>
                                        <label htmlFor="point_required" className="block text-sm font-medium text-gray-700 mb-1">Points Required</label>
                                        <input type="number" id="point_required" name="point_required" required
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm" />
                                    </div>

                                    <div>
                                        <label htmlFor="company_id" className="block text-sm font-medium text-gray-700 mb-1">Select Company</label>
                                        <select id="company_id" name="company_id" required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
                                            <option value="" disabled>-- Choose a company --</option>
                                        </select>
                                    </div>

                                    <br />
                                    <div className="flex items-center">
                                        <input id="terms-checkbox" name="terms-checkbox" type="checkbox" required
                                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
                                        I agree to the <a href="/terms" className="font-medium text-purple-600 hover:text-purple-500">Terms and Conditions</a> and <a href="/privacy-policy" className="font-medium text-purple-600 hover:text-purple-500">Privacy Policy</a>.
                                    </div>
                                    <br />

                                    <div className="d-flex justify-content-between">
                                        <a href="/admin/rewards" className="btn btn-outline-secondary">← Back</a>
                                        <button type="submit" className="btn btn-primary">Add Reward</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

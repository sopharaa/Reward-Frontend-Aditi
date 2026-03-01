export default function AdminCreateStaff() {
    return (
        <div className="container d-flex justify-content-center align-items-start mt-5">
            <div className="card shadow-sm w-100" style={{ maxWidth: '500px' }}>
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Add New Staff</h4>
                </div>

                <div className="card-body">
                    <form id="register-form" className="space-y-6" method="POST" action="/api/admin/staffs">
                        <div>
                            <label htmlFor="staff_name" className="block text-sm font-medium text-gray-700 mb-1">Staff Name</label>
                            <input type="text" id="staff_name" name="staff_name" required
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm" />
                        </div>

                        <div>
                            <label htmlFor="staff_email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input type="email" id="staff_email" name="staff_email" required
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm" />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input type="password" id="password" name="password" required
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm" />
                        </div>

                        <div>
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                            <input type="password" id="password_confirmation" name="password_confirmation" required
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm" />
                        </div>

                        <div className="w-full">
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
                            <a href="/admin/staffs" className="btn btn-outline-secondary">← Back</a>
                            <button type="submit" className="btn btn-primary">Add Staff</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

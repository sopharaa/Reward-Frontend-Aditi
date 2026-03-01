"use client";
export default function AdminManageUsers() {
    return (
        <div className="users-container">
            {/* Header */}
            <div className="header">
                <h1>Customers Management 👥</h1>
                <a href="/admin/dashboard" className="back-link">← Back to Dashboard</a>
            </div>

            <button className="btn-add-staff" onClick={() => window.location.href = '/admin/users/create'}>Add New User</button>

            {/* Users Table */}
            <div className="table-wrapper mt-4">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Company</th>
                            <th>Points</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="users-list">
                        {/* Rows will be populated dynamically */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

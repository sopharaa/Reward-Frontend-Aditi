"use client";
export default function AdminManageStaffs() {
    return (
        <div className="users-container">
            <div className="header">
                <h1>Staffs Management 👥</h1>
                <a href="/admin/dashboard" className="back-link">← Back to Dashboard</a>
            </div>

            <button className="btn-add-staff" onClick={() => window.location.href = '/admin/staffs/create'}>Add New Staff</button>

            <div className="table-wrapper mt-4">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Company</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Rows will be populated dynamically */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

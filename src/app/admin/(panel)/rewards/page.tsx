"use client";
export default function AdminManageRewards() {
    return (
        <div className="users-container">
            <div className="header">
                <h1>Rewards Management 🎁</h1>
                <a href="/admin/dashboard" className="back-link">← Back to Dashboard</a>
            </div>

            <button className="btn-add-staff" onClick={() => window.location.href = '/admin/rewards/create'}>Add New Reward</button>

            <div className="table-wrapper mt-4">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Reward Name</th>
                            <th>Stock</th>
                            <th>Point Required</th>
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

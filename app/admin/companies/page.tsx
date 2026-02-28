"use client";
export default function AdminManageCompanies() {
    return (
        <>
            <link rel="stylesheet" href="/css/admin-style.css" precedence="default" />
            <link rel="stylesheet" href="/css/manage-users.css" precedence="default" />
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
                    <div className="users-container">
                        {/* Header */}
                        <div className="header">
                            <h1>Company Management👥</h1>
                            <a href="/admin/dashboard" className="back-link">← Back to Dashboard</a>
                        </div>

                        <button className="btn-add-staff" onClick={() => window.location.href = '/admin/companies/create'}>Add New Company</button>

                        {/* Companies Table */}
                        <div className="table-wrapper">
                            <table className="user-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Company Name</th>
                                        <th>Type</th>
                                        <th>Description</th>
                                        <th className="text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="users-list">
                                    {/* Rows will be populated dynamically */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <div id="messageModal" className="modal">
                <div className="modal-content">
                    <span className="close-button">&times;</span>
                    <h2 id="message-modal-title">Info</h2>
                    <p id="message-modal-message">This is a test message.</p>
                    <button>Got It</button>
                </div>
            </div>

            <div id="adjustPointsModal" className="modal">
                <div className="modal-content">
                    <span className="close-button">&times;</span>
                    <h2 className="text-xl font-bold mb-4">Adjust Points</h2>
                    <form id="adjust-points-form">
                        <label>Name</label>
                        <input type="text" readOnly defaultValue="User Name" className="modal-input" />
                        <label>Current Points</label>
                        <input type="text" readOnly defaultValue="1500" className="modal-input" />
                        <label>Adjustment</label>
                        <input type="number" required className="modal-input" />
                        <div className="mt-4 flex justify-end">
                            <button type="button" className="btn-cancel">Cancel</button>
                            <button type="submit" className="btn-confirm ml-2">Apply</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

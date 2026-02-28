export default function AdminDashboard() {
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
                                        <img src="https://placehold.co/50x50/8B5CF6/FFFFFF?text=A"
                                            alt="Avatar"
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
                            <li className="hi hover:bg-light">
                                <form method="POST" action="/api/admin/logout">
                                    <button type="submit"
                                        className="text-danger border-0 bg-transparent text-start"
                                        style={{ font: 'inherit', cursor: 'pointer' }}>
                                        Logout
                                    </button>
                                </form>
                            </li>
                        </ul>
                    </div>
                </aside>

                <div className="content">
                    <div className="main-content">
                        <h2>System Statistics</h2>
                        <div className="courses">
                            <div className="course-card">
                                <div className="course-icon">👤</div>
                                <p>Total Users: 0</p>
                            </div>
                            <div className="course-card">
                                <div className="course-icon">🏢</div>
                                <p>Total Companies: 0</p>
                            </div>
                            <div className="course-card">
                                <div className="course-icon">🧑‍🍳</div>
                                <p>Total Staffs: 0</p>
                            </div>
                        </div>
                        <div className="courses">
                            <div className="course-card">
                                <div className="course-icon">👤</div>
                                <p>Total Users: 0</p>
                            </div>
                            <div className="course-card">
                                <div className="course-icon">🎁</div>
                                <p>Total Rewards: 0</p>
                            </div>
                            <div className="course-card">
                                <div className="course-icon">💎</div>
                                <p>Points Issued: 0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

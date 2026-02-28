export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" precedence="default" />
            <link rel="stylesheet" href="/css/admin-style.css" precedence="default" />
            <link rel="stylesheet" href="/css/manage-users.css" precedence="default" />

            <div className="container">
                {/* Sidebar */}
                <aside className="sidebar">
                    <div className="menu">
                        <ul>
                            <li>
                                <div className="d-flex flex-column align-items-center">
                                    <a href="/admin/setting" className="text-decoration-none text-center">
                                        <img
                                            src="https://placehold.co/50x50/8B5CF6/FFFFFF?text=A"
                                            alt="Avatar"
                                            className="rounded-circle border border-2 border-secondary shadow-sm"
                                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                        />
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
                                    <button
                                        type="submit"
                                        className="text-danger border-0 bg-transparent text-start"
                                        style={{ font: 'inherit', cursor: 'pointer' }}
                                    >
                                        Logout
                                    </button>
                                </form>
                            </li>
                        </ul>
                    </div>
                </aside>

                <div className="content">
                    {children}
                </div>
            </div>
        </>
    );
}

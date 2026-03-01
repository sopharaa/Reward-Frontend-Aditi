"use client";
import AdminLogoutButton from "../auth/AdminLogoutButton";
import Link from "next/link";

export default function AdminSidebar() {
    return (
        <aside className="sidebar">
            <div className="menu">
                <ul>
                    <li>
                        <div className="d-flex flex-column align-items-center">
                            <Link href="/admin/setting" className="text-decoration-none text-center">
                                <img
                                    src="https://placehold.co/50x50/8B5CF6/FFFFFF?text=A"
                                    alt="Avatar"
                                    className="rounded-circle border border-2 border-secondary shadow-sm"
                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                />
                                <div className="form-label">Admin</div>
                            </Link>
                        </div>
                    </li>
                    <li><Link href="/admin/dashboard">Dashboard</Link></li>
                    <li><Link href="/admin/companies">Companies Management</Link></li>
                    <li><Link href="/admin/rewards">Rewards Management</Link></li>
                    <li><Link href="/admin/customer">Customers Management</Link></li>
                    <li><Link href="/admin/staffs">Staffs Management</Link></li>
                    <li><Link href="/admin/transactions">Transaction History</Link></li>
                    <li className="hi">
                       <AdminLogoutButton />
                    </li>
                </ul>
            </div>
        </aside>
    );
}
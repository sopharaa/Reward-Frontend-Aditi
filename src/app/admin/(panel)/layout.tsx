"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import "bootstrap/dist/css/bootstrap.min.css"
export default function AdminLayout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" precedence="default" />
            <link rel="stylesheet" href="/css/admin-style.css" precedence="default" />
            <link rel="stylesheet" href="/css/manage-users.css" precedence="default" />

            <div className="admin-container">
                {/* Sidebar */}
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
                            <li><Link href="/admin/companies">Company Management</Link></li>
                            <li><Link href="/admin/rewards">Rewards Management</Link></li>
                            <li><Link href="/admin/customer">Customers Management</Link></li>
                            <li><Link href="/admin/staffs">Staffs Management</Link></li>
                            <li><Link href="/admin/transactions">Transaction History</Link></li>
                            <li className="hi">
                                <form method="POST" action="/api/admin/logout" className="m-0 p-0">
                                    <button
                                        type="submit"
                                        className="logout-btn text-danger border-0 bg-transparent w-100"
                                    >
                                        Logout
                                    </button>
                                </form>
                            </li>
                            {/* <li className="hi">
                                <button
                                    onClick={() => {
                                        localStorage.removeItem("admin_token");
                                        router.push("/admin/login");
                                    }}
                                    className="logout-btn text-danger border-0 bg-transparent w-100"
                                >
                                    Logout
                                </button>
                            </li> */}
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

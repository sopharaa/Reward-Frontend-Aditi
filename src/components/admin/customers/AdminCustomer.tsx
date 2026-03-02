"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function AdminCustomer() {
    const router = useRouter();
    return (
        <>
            <div className="users-container">
            {/* Header */}
            <div className="header">
                <h1>Customers Management 👥</h1>
                <Link href="/admin/dashboard" className="back-link">
                    ← Back to Dashboard
                </Link>
            </div>

            <button className="btn-add-staff" onClick={() => router.push('/admin/customer/create')}>Add New User</button>

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
        </>
    )
}
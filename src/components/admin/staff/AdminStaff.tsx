import { useRouter } from "next/navigation"
import Link from "next/link"
export default function AdminStaff() {
    const router = useRouter();
    return (
        <>
            <div className="users-container">
                <div className="header">
                    <h1>Staffs Management 👥</h1>
                    <Link href="/admin/dashboard" className="back-link">
                        ← Back to Dashboard
                    </Link>
                </div>

                <button className="btn-add-staff" onClick={() => router.push('/admin/staffs/create')}>Add New Staff</button>

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
        </>
    )
}
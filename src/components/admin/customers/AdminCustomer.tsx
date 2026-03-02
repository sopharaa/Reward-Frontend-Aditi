"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGetCustomersQuery, useDeleteCustomerMutation, Customer } from "@/store/api/adminApi";
import Pagination from "@/components/admin/Pagination";

export default function AdminCustomer() {
    const router = useRouter();
    const { data: customers, isLoading, isError } = useGetCustomersQuery();
    const [deleteCustomer, { isLoading: isDeleting }] = useDeleteCustomerMutation();

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteTarget, setDeleteTarget] = useState<Customer | null>(null);
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const PAGE_SIZE = 8;

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleteError(null);
        try {
            await deleteCustomer(deleteTarget.id).unwrap();
            setDeleteTarget(null);
        } catch (err: unknown) {
            const e = err as { error?: string; data?: { message?: string } };
            setDeleteError(e?.error ?? e?.data?.message ?? "Failed to delete customer.");
        }
    };

    const filtered = (customers ?? []).filter((c) => {
        const q = search.toLowerCase();
        return c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q) || c.companyName?.toLowerCase().includes(q);
    });
    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const safePage = Math.min(currentPage, totalPages || 1);
    const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

    return (
        <div className="users-container">
            <div className="header">
                <h1>Customers Management 👥</h1>
                <Link href="/admin/dashboard" className="back-link">← Back to Dashboard</Link>
            </div>

            <button className="btn-add-staff" onClick={() => router.push("/admin/customer/create")}>Add New User</button>

            {isLoading && <p className="text-center py-8 text-gray-500">Loading customers…</p>}
            {isError && <p className="text-center py-8 text-red-500">Failed to load customers. Make sure the backend is running.</p>}

            {!isLoading && !isError && (
                <div className="table-wrapper mt-4">
                    {/* Search */}
                    <div style={{ marginBottom: "16px" }}>
                        <input
                            type="text"
                            placeholder="Search by name, email or company…"
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "14px", outline: "none" }}
                        />
                    </div>

                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Company</th>
                                <th>Points</th>
                                <th style={{ textAlign: "center" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paged.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-6 text-gray-400">
                                        {search ? "No customers match your search." : "No customers found."}
                                    </td>
                                </tr>
                            ) : paged.map((customer) => (
                                <tr key={customer.id}>
                                    <td>{customer.id}</td>
                                    <td>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            {customer.profileImage ? (
                                                <img
                                                    src={customer.profileImage}
                                                    alt={customer.name}
                                                    style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover", border: "2px solid #e5e7eb", flexShrink: 0 }}
                                                />
                                            ) : (
                                                <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: "14px", flexShrink: 0 }}>
                                                    {customer.name?.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                            <span>{customer.name}</span>
                                        </div>
                                    </td>
                                    <td>{customer.email}</td>
                                    <td>{customer.companyName}</td>
                                    <td>{customer.points}</td>
                                    <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                                        <button onClick={() => router.push(`/admin/customer/${customer.id}/edit`)} style={{ backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "6px", padding: "6px 14px", cursor: "pointer", marginRight: "6px" }}>Edit</button>
                                        <button onClick={() => setDeleteTarget(customer)} style={{ backgroundColor: "#dc2626", color: "white", border: "none", borderRadius: "6px", padding: "6px 14px", cursor: "pointer" }}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteTarget && (
                <div className="modal" style={{ display: "flex" }}>
                    <div className="modal-content">
                        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                        <p>Are you sure you want to delete <strong>{deleteTarget.name}</strong>? This action cannot be undone.</p>
                        {deleteError && <p className="mt-2 text-red-500 text-sm">{deleteError}</p>}
                        <div className="mt-4 flex justify-end gap-2">
                            <button className="btn-cancel" onClick={() => { setDeleteTarget(null); setDeleteError(null); }} disabled={isDeleting}>Cancel</button>
                            <button className="btn-confirm ml-2" onClick={handleDelete} disabled={isDeleting} style={{ backgroundColor: "#dc2626", color: "white", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer" }}>
                                {isDeleting ? "Deleting…" : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
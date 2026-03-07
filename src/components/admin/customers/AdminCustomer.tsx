"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    useGetCustomersQuery,
    useDeleteCustomerMutation,
    useCreateCustomerMutation,
    useUpdateCustomerMutation,
    useGetCompaniesQuery,
    Customer,
} from "@/store/api/adminApi";
import Pagination from "@/components/admin/Pagination";

export default function AdminCustomer() {
    const { data: customers, isLoading, isError } = useGetCustomersQuery();
    const { data: companies, isLoading: companiesLoading } = useGetCompaniesQuery();
    const [deleteCustomer, { isLoading: isDeleting }] = useDeleteCustomerMutation();
    const [createCustomer, { isLoading: isCreating }] = useCreateCustomerMutation();
    const [updateCustomer, { isLoading: isUpdating }] = useUpdateCustomerMutation();

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteTarget, setDeleteTarget] = useState<Customer | null>(null);
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const PAGE_SIZE = 8;

    // Create form state
    const [showCreate, setShowCreate] = useState(false);
    const [createName, setCreateName] = useState("");
    const [createEmail, setCreateEmail] = useState("");
    const [createPassword, setCreatePassword] = useState("");
    const [createConfirmPassword, setCreateConfirmPassword] = useState("");
    const [createCompanyId, setCreateCompanyId] = useState("");
    const [createError, setCreateError] = useState<string | null>(null);

    const resetCreateForm = () => {
        setCreateName(""); setCreateEmail(""); setCreatePassword("");
        setCreateConfirmPassword(""); setCreateCompanyId(""); setCreateError(null);
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreateError(null);
        if (createPassword !== createConfirmPassword) {
            setCreateError("Passwords do not match.");
            return;
        }
        try {
            await createCustomer({
                name: createName,
                email: createEmail,
                password: createPassword,
                confirmPassword: createConfirmPassword,
                companyId: Number(createCompanyId),
            }).unwrap();
            setShowCreate(false);
            resetCreateForm();
        } catch (err: unknown) {
            const e = err as { data?: { message?: string } };
            setCreateError(e?.data?.message ?? "Failed to create customer. Please try again.");
        }
    };

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

    const inputStyle = { width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "14px", marginBottom: "12px", outline: "none", boxSizing: "border-box" as const };
    const labelStyle = { fontSize: "13px", fontWeight: 600 as const, marginBottom: "4px", display: "block" };

    // Edit form state
    const [editTarget, setEditTarget] = useState<Customer | null>(null);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editPassword, setEditPassword] = useState("");
    const [editCompanyId, setEditCompanyId] = useState("");
    const [editPoints, setEditPoints] = useState("");
    const [editError, setEditError] = useState<string | null>(null);

    useEffect(() => {
        if (editTarget) {
            setEditName(editTarget.name ?? "");
            setEditEmail(editTarget.email ?? "");
            setEditPassword("");
            setEditCompanyId(String(editTarget.companyId ?? ""));
            setEditPoints(String(editTarget.points ?? 0));
            setEditError(null);
        }
    }, [editTarget]);

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editTarget) return;
        setEditError(null);
        try {
            await updateCustomer({
                id: editTarget.id,
                body: {
                    name: editName,
                    email: editEmail,
                    ...(editPassword ? { password: editPassword } : {}),
                    ...(editCompanyId ? { companyId: Number(editCompanyId) } : {}),
                    ...(editPoints !== "" ? { points: Number(editPoints) } : {}),
                },
            }).unwrap();
            setEditTarget(null);
        } catch (err: unknown) {
            const e = err as { data?: { message?: string } };
            setEditError(e?.data?.message ?? "Failed to update customer.");
        }
    };

    return (
        <div className="users-container">
            <div className="header">
                <h1>Customers Management 👥</h1>
                <Link href="/admin/dashboard" className="back-link">← Back to Dashboard</Link>
            </div>

            <button className="btn-add-staff" onClick={() => { resetCreateForm(); setShowCreate(true); }}>Add New Customer</button>

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
                                        <button onClick={() => setEditTarget(customer)} style={{ backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "6px", padding: "6px 14px", cursor: "pointer", marginRight: "6px" }}>Edit</button>
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

            {/* Create Customer Modal */}
            {showCreate && (
                <div className="modal" style={{ display: "flex" }}>
                    <div className="modal-content" style={{ maxWidth: "520px", width: "100%" }}>
                        <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "16px" }}>Add New Customer</h2>
                        <form onSubmit={handleCreate}>
                            <label style={labelStyle}>Full Name <span style={{ color: "#dc2626" }}>*</span></label>
                            <input style={inputStyle} type="text" required value={createName} onChange={(e) => setCreateName(e.target.value)} placeholder="e.g. John Doe" />

                            <label style={labelStyle}>Email Address <span style={{ color: "#dc2626" }}>*</span></label>
                            <input style={inputStyle} type="email" required value={createEmail} onChange={(e) => setCreateEmail(e.target.value)} placeholder="customer@example.com" />

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                                <div>
                                    <label style={labelStyle}>Password <span style={{ color: "#dc2626" }}>*</span></label>
                                    <input style={inputStyle} type="password" required value={createPassword} onChange={(e) => setCreatePassword(e.target.value)} placeholder="••••••••" />
                                </div>
                                <div>
                                    <label style={labelStyle}>Confirm Password <span style={{ color: "#dc2626" }}>*</span></label>
                                    <input style={inputStyle} type="password" required value={createConfirmPassword} onChange={(e) => setCreateConfirmPassword(e.target.value)} placeholder="••••••••" />
                                </div>
                            </div>

                            <label style={labelStyle}>Company <span style={{ color: "#dc2626" }}>*</span></label>
                            <select style={inputStyle} required value={createCompanyId} onChange={(e) => setCreateCompanyId(e.target.value)} disabled={companiesLoading}>
                                <option value="" disabled>{companiesLoading ? "Loading companies…" : "-- Choose a company --"}</option>
                                {(companies ?? []).map((c) => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>

                            {createError && <p style={{ color: "#dc2626", fontSize: "13px", marginBottom: "12px" }}>{createError}</p>}

                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "4px" }}>
                                <button type="button" className="btn-cancel" onClick={() => { setShowCreate(false); resetCreateForm(); }} disabled={isCreating}>Cancel</button>
                                <button type="submit" disabled={isCreating} style={{ backgroundColor: "#7c3aed", color: "white", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer" }}>
                                    {isCreating ? "Creating…" : "Add Customer"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Customer Modal */}
            {editTarget && (
                <div className="modal" style={{ display: "flex" }}>
                    <div className="modal-content" style={{ maxWidth: "520px", width: "100%" }}>
                        <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "16px" }}>Edit Customer: {editTarget.name}</h2>
                        <form onSubmit={handleEdit}>
                            <label style={labelStyle}>Full Name <span style={{ color: "#dc2626" }}>*</span></label>
                            <input style={inputStyle} type="text" required value={editName} onChange={(e) => setEditName(e.target.value)} />

                            <label style={labelStyle}>Email Address <span style={{ color: "#dc2626" }}>*</span></label>
                            <input style={inputStyle} type="email" required value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />

                            <label style={labelStyle}>
                                New Password
                                <span style={{ fontWeight: 400, color: "#6b7280", marginLeft: "6px", fontSize: "12px" }}>(leave blank to keep current)</span>
                            </label>
                            <input style={inputStyle} type="password" value={editPassword} onChange={(e) => setEditPassword(e.target.value)} placeholder="••••••••" />

                            <label style={labelStyle}>Company <span style={{ color: "#dc2626" }}>*</span></label>
                            <select style={inputStyle} required value={editCompanyId} onChange={(e) => setEditCompanyId(e.target.value)} disabled={companiesLoading}>
                                <option value="" disabled>{companiesLoading ? "Loading companies…" : "-- Choose a company --"}</option>
                                {(companies ?? []).map((c) => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>

                            <label style={labelStyle}>Points</label>
                            <input style={inputStyle} type="number" min={0} value={editPoints} onChange={(e) => setEditPoints(e.target.value)} placeholder="0" />

                            {editError && <p style={{ color: "#dc2626", fontSize: "13px", marginBottom: "12px" }}>{editError}</p>}

                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "4px" }}>
                                <button type="button" className="btn-cancel" onClick={() => setEditTarget(null)} disabled={isUpdating}>Cancel</button>
                                <button type="submit" disabled={isUpdating} style={{ backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer" }}>
                                    {isUpdating ? "Saving…" : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
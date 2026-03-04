"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    useGetStaffsQuery,
    useDeleteStaffMutation,
    useCreateStaffMutation,
    useUpdateStaffMutation,
    useGetCompaniesQuery,
} from "@/store/api/adminApi";
import type { Staff } from "@/store/api/adminApi";
import Pagination from "@/components/admin/Pagination";

export default function AdminStaff() {
    const { data: staffs, isLoading, isError } = useGetStaffsQuery();
    const { data: companies, isLoading: companiesLoading } = useGetCompaniesQuery();
    const [deleteStaff, { isLoading: isDeleting }] = useDeleteStaffMutation();
    const [createStaff, { isLoading: isCreating }] = useCreateStaffMutation();
    const [updateStaff, { isLoading: isUpdating }] = useUpdateStaffMutation();

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_SIZE = 8;

    // Delete
    const [deleteTarget, setDeleteTarget] = useState<Staff | null>(null);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    // Create
    const [showCreate, setShowCreate] = useState(false);
    const [createName, setCreateName] = useState("");
    const [createEmail, setCreateEmail] = useState("");
    const [createPassword, setCreatePassword] = useState("");
    const [createConfirmPassword, setCreateConfirmPassword] = useState("");
    const [createCompanyId, setCreateCompanyId] = useState("");
    const [createError, setCreateError] = useState<string | null>(null);

    // Edit
    const [editTarget, setEditTarget] = useState<Staff | null>(null);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editCompanyId, setEditCompanyId] = useState("");
    const [editError, setEditError] = useState<string | null>(null);

    useEffect(() => {
        if (editTarget) {
            setEditName(editTarget.name ?? "");
            setEditEmail(editTarget.email ?? "");
            setEditCompanyId(String(editTarget.companyId ?? ""));
            setEditError(null);
        }
    }, [editTarget]);

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
            await createStaff({ name: createName, email: createEmail, password: createPassword, confirmPassword: createConfirmPassword, companyId: Number(createCompanyId) }).unwrap();
            setShowCreate(false);
            resetCreateForm();
        } catch (err: unknown) {
            const e = err as { data?: { message?: string } };
            setCreateError(e?.data?.message ?? "Failed to create staff. Please try again.");
        }
    };

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editTarget) return;
        setEditError(null);
        try {
            await updateStaff({ id: editTarget.id, body: { name: editName, email: editEmail, companyId: Number(editCompanyId) } }).unwrap();
            setEditTarget(null);
        } catch (err: unknown) {
            const e = err as { data?: { message?: string } };
            setEditError(e?.data?.message ?? "Failed to update staff.");
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleteError(null);
        try {
            await deleteStaff(deleteTarget.id).unwrap();
            setDeleteTarget(null);
        } catch (err: unknown) {
            const e = err as { error?: string; data?: { message?: string } };
            setDeleteError(e?.error ?? e?.data?.message ?? "Failed to delete staff.");
        }
    };

    const filtered = (staffs ?? []).filter((s) => {
        const q = search.toLowerCase();
        return s.name?.toLowerCase().includes(q) || s.email?.toLowerCase().includes(q) || s.companyName?.toLowerCase().includes(q);
    });
    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const safePage = Math.min(currentPage, totalPages || 1);
    const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

    const inputStyle = { width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "14px", marginBottom: "12px", outline: "none", boxSizing: "border-box" as const };
    const labelStyle = { fontSize: "13px", fontWeight: 600 as const, marginBottom: "4px", display: "block" };

    return (
        <div className="users-container">
            <div className="header">
                <h1>Staffs Management 👥</h1>
                <Link href="/admin/dashboard" className="back-link">← Back to Dashboard</Link>
            </div>

            <button className="btn-add-staff" onClick={() => { resetCreateForm(); setShowCreate(true); }}>
                Add New Staff
            </button>

            {isLoading && <p className="text-center py-8 text-gray-500">Loading staffs…</p>}
            {isError && <p className="text-center py-8 text-red-500">Failed to load staffs. Make sure the backend is running.</p>}

            {!isLoading && !isError && (
                <div className="table-wrapper mt-4">
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
                                <th style={{ textAlign: "center" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paged.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-6 text-gray-400">
                                        {search ? "No staffs match your search." : "No staffs found."}
                                    </td>
                                </tr>
                            ) : paged.map((staff) => (
                                <tr key={staff.id}>
                                    <td>{staff.id}</td>
                                    <td>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            {staff.profileImage ? (
                                                <img src={staff.profileImage} alt={staff.name} style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover", border: "2px solid #e5e7eb", flexShrink: 0 }} />
                                            ) : (
                                                <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#6b46c1", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: "14px", flexShrink: 0 }}>
                                                    {staff.name?.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                            <span>{staff.name}</span>
                                        </div>
                                    </td>
                                    <td>{staff.email}</td>
                                    <td>{staff.companyName}</td>
                                    <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                                        <button onClick={() => setEditTarget(staff)} style={{ backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "6px", padding: "6px 14px", cursor: "pointer", marginRight: "6px" }}>Edit</button>
                                        <button onClick={() => setDeleteTarget(staff)} style={{ backgroundColor: "#dc2626", color: "white", border: "none", borderRadius: "6px", padding: "6px 14px", cursor: "pointer" }}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>
            )}

            {/* Create Staff Modal */}
            {showCreate && (
                <div className="modal" style={{ display: "flex" }}>
                    <div className="modal-content" style={{ maxWidth: "520px", width: "100%" }}>
                        <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "16px" }}>Add New Staff</h2>
                        <form onSubmit={handleCreate}>
                            <label style={labelStyle}>Staff Name <span style={{ color: "#dc2626" }}>*</span></label>
                            <input style={inputStyle} type="text" required value={createName} onChange={(e) => setCreateName(e.target.value)} placeholder="e.g. John Doe" />

                            <label style={labelStyle}>Email Address <span style={{ color: "#dc2626" }}>*</span></label>
                            <input style={inputStyle} type="email" required value={createEmail} onChange={(e) => setCreateEmail(e.target.value)} placeholder="staff@example.com" />

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
                                    {isCreating ? "Creating…" : "Add Staff"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Staff Modal */}
            {editTarget && (
                <div className="modal" style={{ display: "flex" }}>
                    <div className="modal-content" style={{ maxWidth: "520px", width: "100%" }}>
                        <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "16px" }}>Edit Staff: {editTarget.name}</h2>
                        <form onSubmit={handleEdit}>
                            <label style={labelStyle}>Staff Name <span style={{ color: "#dc2626" }}>*</span></label>
                            <input style={inputStyle} type="text" required value={editName} onChange={(e) => setEditName(e.target.value)} />

                            <label style={labelStyle}>Email Address <span style={{ color: "#dc2626" }}>*</span></label>
                            <input style={inputStyle} type="email" required value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />

                            <label style={labelStyle}>Company <span style={{ color: "#dc2626" }}>*</span></label>
                            <select style={inputStyle} required value={editCompanyId} onChange={(e) => setEditCompanyId(e.target.value)} disabled={companiesLoading}>
                                <option value="" disabled>{companiesLoading ? "Loading companies…" : "-- Choose a company --"}</option>
                                {(companies ?? []).map((c) => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>

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
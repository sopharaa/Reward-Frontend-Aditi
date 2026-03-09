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

function EyeIcon({ open }: { open: boolean }) {
    return open ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
    ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-3.95M6.47 6.47A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.956 9.956 0 01-1.293 2.65M6.47 6.47L3 3m3.47 3.47l11.06 11.06M6.47 6.47l11.06 11.06" />
        </svg>
    );
}

export default function AdminStaff() {
    const { data: staffs, isLoading, isError } = useGetStaffsQuery();
    const { data: companies, isLoading: companiesLoading } = useGetCompaniesQuery();
    const [deleteStaff, { isLoading: isDeleting }] = useDeleteStaffMutation();
    const [createStaff, { isLoading: isCreating }] = useCreateStaffMutation();
    const [updateStaff, { isLoading: isUpdating }] = useUpdateStaffMutation();

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_SIZE = 8;

    // Toast
    const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
    function showToast(msg: string, type: "success" | "error") {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 4000);
    }

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
    const [showCreatePassword, setShowCreatePassword] = useState(false);
    const [showCreateConfirmPassword, setShowCreateConfirmPassword] = useState(false);

    // Edit
    const [editTarget, setEditTarget] = useState<Staff | null>(null);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editCompanyId, setEditCompanyId] = useState("");
    const [editPassword, setEditPassword] = useState("");
    const [editError, setEditError] = useState<string | null>(null);
    const [showEditPassword, setShowEditPassword] = useState(false);

    useEffect(() => {
        if (editTarget) {
            setEditName(editTarget.name ?? "");
            setEditEmail(editTarget.email ?? "");
            setEditCompanyId(String(editTarget.companyId ?? ""));
            setEditPassword("");
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
            showToast("Staff created successfully!", "success");
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
            await updateStaff({ id: editTarget.id, body: { name: editName, email: editEmail, companyId: Number(editCompanyId), ...(editPassword ? { password: editPassword } : {}) } }).unwrap();
            setEditTarget(null);
            showToast("Staff updated successfully!", "success");
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
            showToast("Staff deleted successfully!", "success");
        } catch (err: unknown) {
            const e = err as { error?: string; data?: { message?: string } };
            setDeleteError(e?.error ?? e?.data?.message ?? "Failed to delete staff.");
        }
    };

    const filtered = (staffs ?? []).filter((s) => {
        const q = search.toLowerCase();
        return s.name?.toLowerCase().includes(q) || s.email?.toLowerCase().includes(q) || s.companyName?.toLowerCase().includes(q);
    }).sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));
    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const safePage = Math.min(currentPage, totalPages || 1);
    const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

    const inputStyle = { width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "14px", marginBottom: "12px", outline: "none", boxSizing: "border-box" as const };
    const labelStyle = { fontSize: "13px", fontWeight: 600 as const, marginBottom: "4px", display: "block" };

    return (
        <div className="users-container">
            <div className="header">
                <h1>Staffs Management</h1>
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
                                <th>#</th>
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
                            ) : paged.map((staff, index) => (
                                <tr key={staff.id}>
                                    <td>{(safePage - 1) * PAGE_SIZE + index + 1}</td>
                                    <td>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            {staff.profileImage ? (
                                                <img src={staff.profileImage} alt={staff.name} style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover", border: "2px solid #e5e7eb", flexShrink: 0 }} />
                                            ) : (
                                                <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#059669", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: "14px", flexShrink: 0 }}>
                                                    {staff.name?.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                            <span>{staff.name}</span>
                                        </div>
                                    </td>
                                    <td>{staff.email}</td>
                                    <td>{staff.companyName}</td>
                                    <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                                        <button onClick={() => setEditTarget(staff)} style={{ backgroundColor: "#059669", color: "white", border: "none", borderRadius: "6px", padding: "6px 14px", cursor: "pointer", marginRight: "6px" }}>Edit</button>
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
                                    <div style={{ position: "relative" }}>
                                        <input style={{ ...inputStyle, paddingRight: "36px" }} type={showCreatePassword ? "text" : "password"} required value={createPassword} onChange={(e) => setCreatePassword(e.target.value)} placeholder="••••••••" />
                                        <button type="button" onClick={() => setShowCreatePassword(!showCreatePassword)} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-60%)", background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 0 }} tabIndex={-1} aria-label="Toggle password visibility">
                                            <EyeIcon open={showCreatePassword} />
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label style={labelStyle}>Confirm Password <span style={{ color: "#dc2626" }}>*</span></label>
                                    <div style={{ position: "relative" }}>
                                        <input style={{ ...inputStyle, paddingRight: "36px" }} type={showCreateConfirmPassword ? "text" : "password"} required value={createConfirmPassword} onChange={(e) => setCreateConfirmPassword(e.target.value)} placeholder="••••••••" />
                                        <button type="button" onClick={() => setShowCreateConfirmPassword(!showCreateConfirmPassword)} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-60%)", background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 0 }} tabIndex={-1} aria-label="Toggle confirm password visibility">
                                            <EyeIcon open={showCreateConfirmPassword} />
                                        </button>
                                    </div>
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
                                <button type="submit" disabled={isCreating} style={{ backgroundColor: "#059669", color: "white", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer" }}>
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

                            <label style={labelStyle}>
                                New Password
                                <span style={{ fontWeight: 400, color: "#6b7280", marginLeft: "6px", fontSize: "12px" }}>(leave blank to keep current)</span>
                            </label>
                            <div style={{ position: "relative" }}>
                                <input style={{ ...inputStyle, paddingRight: "36px" }} type={showEditPassword ? "text" : "password"} value={editPassword} onChange={(e) => setEditPassword(e.target.value)} placeholder="••••••••" />
                                <button type="button" onClick={() => setShowEditPassword(!showEditPassword)} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-60%)", background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 0 }} tabIndex={-1} aria-label="Toggle password visibility">
                                    <EyeIcon open={showEditPassword} />
                                </button>
                            </div>

                            {editError && <p style={{ color: "#dc2626", fontSize: "13px", marginBottom: "12px" }}>{editError}</p>}

                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "4px" }}>
                                <button type="button" className="btn-cancel" onClick={() => setEditTarget(null)} disabled={isUpdating}>Cancel</button>
                                <button type="submit" disabled={isUpdating} style={{ backgroundColor: "#059669", color: "white", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer" }}>
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

            {/* Toast Notification */}
            {toast && (
                <div style={{
                    position: "fixed", top: "24px", right: "24px", zIndex: 9999,
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "14px 20px", borderRadius: "12px", boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                    backgroundColor: toast.type === "success" ? "#059669" : "#dc2626",
                    color: "white", fontSize: "14px", fontWeight: 500, maxWidth: "360px",
                    animation: "fadeIn 0.2s ease"
                }}>
                    <span>{toast.type === "success" ? "✓" : "✕"}</span>
                    <span>{toast.msg}</span>
                    <button onClick={() => setToast(null)} style={{ marginLeft: "auto", background: "none", border: "none", color: "white", cursor: "pointer", fontSize: "16px", lineHeight: 1 }}>×</button>
                </div>
            )}
        </div>
    );
}

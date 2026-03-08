"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    useGetRewardsQuery,
    useDeleteRewardMutation,
    useCreateRewardMutation,
    useUpdateRewardMutation,
    useGetCompaniesQuery,
} from "@/store/api/adminApi";
import type { Reward } from "@/store/api/adminApi";
import Pagination from "@/components/admin/Pagination";

export default function AdminReward() {
    const { data: rewards, isLoading, isError } = useGetRewardsQuery();
    const { data: companies, isLoading: companiesLoading } = useGetCompaniesQuery();
    const [deleteReward, { isLoading: isDeleting }] = useDeleteRewardMutation();
    const [createReward, { isLoading: isCreating }] = useCreateRewardMutation();
    const [updateReward, { isLoading: isUpdating }] = useUpdateRewardMutation();

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_SIZE = 8;

    // Delete
    const [deleteTarget, setDeleteTarget] = useState<Reward | null>(null);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    // Create
    const [showCreate, setShowCreate] = useState(false);
    const [createName, setCreateName] = useState("");
    const [createDescription, setCreateDescription] = useState("");
    const [createStock, setCreateStock] = useState("");
    const [createPointRequired, setCreatePointRequired] = useState("");
    const [createCompanyId, setCreateCompanyId] = useState("");
    const [createImage, setCreateImage] = useState<File | null>(null);
    const [createError, setCreateError] = useState<string | null>(null);

    // Edit
    const [editTarget, setEditTarget] = useState<Reward | null>(null);
    const [editName, setEditName] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editStock, setEditStock] = useState("");
    const [editPointRequired, setEditPointRequired] = useState("");
    const [editCompanyId, setEditCompanyId] = useState("");
    const [editImage, setEditImage] = useState<File | null>(null);
    const [editError, setEditError] = useState<string | null>(null);

    useEffect(() => {
        if (editTarget) {
            setEditName(editTarget.name ?? "");
            setEditDescription(editTarget.description ?? "");
            setEditStock(String(editTarget.stock ?? ""));
            setEditPointRequired(String(editTarget.pointRequired ?? ""));
            setEditCompanyId(String(editTarget.companyId ?? ""));
            setEditImage(null);
            setEditError(null);
        }
    }, [editTarget]);

    const resetCreateForm = () => {
        setCreateName(""); setCreateDescription(""); setCreateStock("");
        setCreatePointRequired(""); setCreateCompanyId(""); setCreateImage(null);
        setCreateError(null);
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreateError(null);
        const formData = new FormData();
        formData.append("name", createName);
        formData.append("description", createDescription);
        formData.append("stock", createStock);
        formData.append("pointRequired", createPointRequired);
        formData.append("companyId", createCompanyId);
        if (createImage) formData.append("image", createImage);
        try {
            await createReward(formData).unwrap();
            setShowCreate(false);
            resetCreateForm();
        } catch (err: unknown) {
            const e = err as { data?: { message?: string } };
            setCreateError(e?.data?.message ?? "Failed to create reward. Please try again.");
        }
    };

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editTarget) return;
        setEditError(null);
        const formData = new FormData();
        formData.append("name", editName);
        formData.append("description", editDescription);
        formData.append("stock", editStock);
        formData.append("pointRequired", editPointRequired);
        formData.append("companyId", editCompanyId);
        if (editImage) formData.append("image", editImage);
        try {
            await updateReward({ id: editTarget.id, body: formData }).unwrap();
            setEditTarget(null);
        } catch (err: unknown) {
            const e = err as { data?: { message?: string } };
            setEditError(e?.data?.message ?? "Failed to update reward.");
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleteError(null);
        try {
            await deleteReward(deleteTarget.id).unwrap();
            setDeleteTarget(null);
        } catch (err: unknown) {
            const e = err as { error?: string; data?: { message?: string } };
            setDeleteError(e?.error ?? e?.data?.message ?? "Failed to delete reward.");
        }
    };

    const filtered = (rewards ?? []).filter((r: Reward) => {
        const q = search.toLowerCase();
        return r.name?.toLowerCase().includes(q) || r.companyName?.toLowerCase().includes(q);
    });
    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const safePage = Math.min(currentPage, totalPages || 1);
    const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

    const inputStyle = { width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "14px", marginBottom: "12px", outline: "none", boxSizing: "border-box" as const };
    const labelStyle = { fontSize: "13px", fontWeight: 600 as const, marginBottom: "4px", display: "block" };

    return (
        <div className="users-container">
            <div className="header">
                <h1>Rewards Management</h1>
                <Link href="/admin/dashboard" className="back-link">← Back to Dashboard</Link>
            </div>

            <button className="btn-add-staff" onClick={() => { resetCreateForm(); setShowCreate(true); }}>
                Add New Reward
            </button>

            {isLoading && <p className="text-center py-8 text-gray-500">Loading rewards…</p>}
            {isError && <p className="text-center py-8 text-red-500">Failed to load rewards. Make sure the backend is running.</p>}

            {!isLoading && !isError && (
                <div className="table-wrapper mt-4">
                    <div style={{ marginBottom: "16px" }}>
                        <input
                            type="text"
                            placeholder="Search by reward name or company…"
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "14px", outline: "none" }}
                        />
                    </div>

                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Reward Name</th>
                                <th>Stock</th>
                                <th>Points Required</th>
                                <th>Company</th>
                                <th style={{ textAlign: "center" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paged.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-6 text-gray-400">
                                        {search ? "No rewards match your search." : "No rewards found."}
                                    </td>
                                </tr>
                            ) : paged.map((reward: Reward) => (
                                <tr key={reward.id}>
                                    <td>{reward.id}</td>
                                    <td>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            {reward.image ? (
                                                <img src={reward.image} alt={reward.name} style={{ width: "36px", height: "36px", borderRadius: "6px", objectFit: "cover", border: "1px solid #e5e7eb", flexShrink: 0 }} />
                                            ) : (
                                                <div style={{ width: "36px", height: "36px", borderRadius: "6px", backgroundColor: "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0 }}>🎁</div>
                                            )}
                                            <span>{reward.name}</span>
                                        </div>
                                    </td>
                                    <td>{reward.stock}</td>
                                    <td>{reward.pointRequired}</td>
                                    <td>{reward.companyName}</td>
                                    <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                                        <button onClick={() => setEditTarget(reward)} style={{ backgroundColor: "#059669", color: "white", border: "none", borderRadius: "6px", padding: "6px 14px", cursor: "pointer", marginRight: "6px" }}>Edit</button>
                                        <button onClick={() => setDeleteTarget(reward)} style={{ backgroundColor: "#dc2626", color: "white", border: "none", borderRadius: "6px", padding: "6px 14px", cursor: "pointer" }}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>
            )}

            {/* Create Reward Modal */}
            {showCreate && (
                <div className="modal" style={{ display: "flex" }}>
                    <div className="modal-content" style={{ maxWidth: "520px", width: "100%" }}>
                        <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "16px" }}>Add New Reward</h2>
                        <form onSubmit={handleCreate}>
                            <label style={labelStyle}>Reward Name <span style={{ color: "#dc2626" }}>*</span></label>
                            <input style={inputStyle} type="text" required value={createName} onChange={(e) => setCreateName(e.target.value)} placeholder="e.g. Free Coffee" />

                            <label style={labelStyle}>Description <span style={{ color: "#dc2626" }}>*</span></label>
                            <textarea style={{ ...inputStyle, resize: "vertical" }} rows={3} required value={createDescription} onChange={(e) => setCreateDescription(e.target.value)} placeholder="Describe the reward…" />

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                                <div>
                                    <label style={labelStyle}>Stock <span style={{ color: "#dc2626" }}>*</span></label>
                                    <input style={inputStyle} type="number" required min={0} value={createStock} onChange={(e) => setCreateStock(e.target.value)} placeholder="0" />
                                </div>
                                <div>
                                    <label style={labelStyle}>Points Required <span style={{ color: "#dc2626" }}>*</span></label>
                                    <input style={inputStyle} type="number" required min={1} value={createPointRequired} onChange={(e) => setCreatePointRequired(e.target.value)} placeholder="100" />
                                </div>
                            </div>

                            <label style={labelStyle}>Company <span style={{ color: "#dc2626" }}>*</span></label>
                            <select style={inputStyle} required value={createCompanyId} onChange={(e) => setCreateCompanyId(e.target.value)} disabled={companiesLoading}>
                                <option value="" disabled>{companiesLoading ? "Loading companies…" : "-- Choose a company --"}</option>
                                {(companies ?? []).map((c) => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>

                            <label style={labelStyle}>Reward Image (optional)</label>
                            <input style={{ ...inputStyle, padding: "6px 12px" }} type="file" accept="image/*" onChange={(e) => setCreateImage(e.target.files?.[0] ?? null)} />

                            {createError && <p style={{ color: "#dc2626", fontSize: "13px", marginBottom: "12px" }}>{createError}</p>}

                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "4px" }}>
                                <button type="button" className="btn-cancel" onClick={() => { setShowCreate(false); resetCreateForm(); }} disabled={isCreating}>Cancel</button>
                                <button type="submit" disabled={isCreating} style={{ backgroundColor: "#059669", color: "white", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer" }}>
                                    {isCreating ? "Creating…" : "Add Reward"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Reward Modal */}
            {editTarget && (
                <div className="modal" style={{ display: "flex" }}>
                    <div className="modal-content" style={{ maxWidth: "520px", width: "100%" }}>
                        <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "16px" }}>Edit Reward: {editTarget.name}</h2>
                        <form onSubmit={handleEdit}>
                            <label style={labelStyle}>Reward Name <span style={{ color: "#dc2626" }}>*</span></label>
                            <input style={inputStyle} type="text" required value={editName} onChange={(e) => setEditName(e.target.value)} />

                            <label style={labelStyle}>Description <span style={{ color: "#dc2626" }}>*</span></label>
                            <textarea style={{ ...inputStyle, resize: "vertical" }} rows={3} required value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                                <div>
                                    <label style={labelStyle}>Stock <span style={{ color: "#dc2626" }}>*</span></label>
                                    <input style={inputStyle} type="number" required min={0} value={editStock} onChange={(e) => setEditStock(e.target.value)} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Points Required <span style={{ color: "#dc2626" }}>*</span></label>
                                    <input style={inputStyle} type="number" required min={1} value={editPointRequired} onChange={(e) => setEditPointRequired(e.target.value)} />
                                </div>
                            </div>

                            <label style={labelStyle}>Company <span style={{ color: "#dc2626" }}>*</span></label>
                            <select style={inputStyle} required value={editCompanyId} onChange={(e) => setEditCompanyId(e.target.value)} disabled={companiesLoading}>
                                <option value="" disabled>{companiesLoading ? "Loading companies…" : "-- Choose a company --"}</option>
                                {(companies ?? []).map((c) => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>

                            <label style={labelStyle}>Replace Image (optional)</label>
                            <input style={{ ...inputStyle, padding: "6px 12px" }} type="file" accept="image/*" onChange={(e) => setEditImage(e.target.files?.[0] ?? null)} />
                            {editTarget.image && !editImage && (
                                <div style={{ marginTop: "-8px", marginBottom: "12px" }}>
                                    <img src={editTarget.image} alt="current" style={{ width: "60px", height: "60px", borderRadius: "6px", objectFit: "cover", border: "1px solid #e5e7eb" }} />
                                    <p style={{ fontSize: "11px", color: "#6b7280", marginTop: "4px" }}>Current image</p>
                                </div>
                            )}

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
        </div>
    );
}

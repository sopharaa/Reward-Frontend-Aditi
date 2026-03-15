"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  useGetCompaniesQuery,
  useDeleteCompanyMutation,
  useUpdateCompanyMutation,
  useCreateCompanyMutation,
  Company,
} from "@/store/api/adminApi";
import Pagination from "@/components/admin/Pagination";
import { formatBangkokDateTime } from "@/utils/date";

export default function AdminCompany() {
  const { data: companies, isLoading, isError } = useGetCompaniesQuery();
  const [deleteCompany, { isLoading: isDeleting }] = useDeleteCompanyMutation();
  const [updateCompany, { isLoading: isUpdating }] = useUpdateCompanyMutation();
  const [createCompany, { isLoading: isCreating }] = useCreateCompanyMutation();

  const [viewCompany, setViewCompany] = useState<Company | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Company | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [editTarget, setEditTarget] = useState<Company | null>(null);
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editError, setEditError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 8;

  // Toast
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  function showToast(msg: string, type: "success" | "error") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  }

  // Create form state
  const [showCreate, setShowCreate] = useState(false);
  const [createName, setCreateName] = useState("");
  const [createType, setCreateType] = useState("");
  const [createDescription, setCreateDescription] = useState("");
  const [createError, setCreateError] = useState<string | null>(null);

  const resetCreateForm = () => {
    setCreateName(""); setCreateType(""); setCreateDescription(""); setCreateError(null);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError(null);
    try {
      await createCompany({ name: createName, type: createType, description: createDescription }).unwrap();
      setShowCreate(false);
      resetCreateForm();
      showToast("Company created successfully!", "success");
    } catch (err: unknown) {
      const e = err as { data?: { message?: string } };
      setCreateError(e?.data?.message ?? "Failed to create company. Please try again.");
    }
  };

  // Pre-fill edit form when editTarget changes
  useEffect(() => {
    if (editTarget) {
      setEditName(editTarget.name ?? "");
      setEditType(editTarget.type ?? "");
      setEditDescription(editTarget.description ?? "");
      setEditError(null);
    }
  }, [editTarget]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleteError(null);
    try {
      await deleteCompany(deleteTarget.id).unwrap();
      setDeleteTarget(null);
      showToast("Company deleted successfully!", "success");
    } catch (err: unknown) {
      const e = err as { error?: string; data?: { message?: string }; status?: number };
      setDeleteError(e?.error ?? e?.data?.message ?? "Failed to delete company. Make sure you are logged in.");
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTarget) return;
    setEditError(null);
    try {
      await updateCompany({ id: editTarget.id, body: { name: editName, type: editType, description: editDescription } }).unwrap();
      setEditTarget(null);
      showToast("Company updated successfully!", "success");
    } catch (err: unknown) {
      const e = err as { error?: string; data?: { message?: string } };
      setEditError(e?.error ?? e?.data?.message ?? "Failed to update company.");
    }
  };

  const inputStyle = { width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "14px", marginBottom: "12px", outline: "none", boxSizing: "border-box" as const };
  const labelStyle = { fontSize: "13px", fontWeight: 600 as const, marginBottom: "4px", display: "block" };

  return (
    <div className="users-container">
      {/* Header */}
      <div className="header">
        <h1>Company Management</h1>
        <Link href="/admin/dashboard" className="back-link">← Back to Dashboard</Link>
      </div>

      <button className="btn-add-staff" onClick={() => { resetCreateForm(); setShowCreate(true); }}>
        Add New Company
      </button>

      {isLoading && <p className="text-center py-8 text-gray-500">Loading companies…</p>}
      {isError && <p className="text-center py-8 text-red-500">Failed to load companies. Make sure the backend is running.</p>}

      {/* Companies Table */}
      {!isLoading && !isError && (
        <div className="table-wrapper">
          <div style={{ marginBottom: "16px", display: "flex", gap: "12px" }}>
            <input
              type="text"
              placeholder="Search by company name or type…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              style={{ width: "100%", padding: "10px 14px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "14px", outline: "none" }}
            />
          </div>
          <table className="user-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Company Name</th>
                <th>Type</th>
                <th>Description</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                const filtered = (companies ?? []).filter((c) => {
                  const q = search.toLowerCase();
                  return c.name?.toLowerCase().includes(q) || c.type?.toLowerCase().includes(q);
                }).sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));
                const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
                const safePage = Math.min(currentPage, totalPages || 1);
                const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
                if (paged.length === 0) {
                  return (
                    <tr>
                      <td colSpan={5} className="text-center py-6 text-gray-400">
                        {search ? "No companies match your search." : "No companies found."}
                      </td>
                    </tr>
                  );
                }
                return paged.map((company, index) => (
                  <tr key={company.id}>
                    <td>{(safePage - 1) * PAGE_SIZE + index + 1}</td>
                    <td>{company.name}</td>
                    <td>{company.type}</td>
                    <td>{company.description}</td>
                    <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                      <button onClick={() => setViewCompany(company)} style={{ backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "6px", padding: "6px 14px", cursor: "pointer", marginRight: "6px" }}>Info</button>
                      <button onClick={() => setEditTarget(company)} style={{ backgroundColor: "#059669", color: "white", border: "none", borderRadius: "6px", padding: "6px 14px", cursor: "pointer", marginRight: "6px" }}>Edit</button>
                      <button onClick={() => setDeleteTarget(company)} style={{ backgroundColor: "#dc2626", color: "white", border: "none", borderRadius: "6px", padding: "6px 14px", cursor: "pointer" }}>Delete</button>
                    </td>
                  </tr>
                ));
              })()}
            </tbody>
          </table>
          {(() => {
            const filtered = (companies ?? []).filter((c) => {
              const q = search.toLowerCase();
              return c.name?.toLowerCase().includes(q) || c.type?.toLowerCase().includes(q);
            }).sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));
            const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
            return <Pagination currentPage={Math.min(currentPage, totalPages || 1)} totalPages={totalPages} onPageChange={(p) => setCurrentPage(p)} />;
          })()}
        </div>
      )}

      {/* Create Modal */}
      {showCreate && (
        <div className="modal" style={{ display: "flex" }}>
          <div className="modal-content" style={{ maxWidth: "520px", width: "100%" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "16px" }}>Add New Company</h2>
            <form onSubmit={handleCreate}>
              <label style={labelStyle}>Company Name <span style={{ color: "#dc2626" }}>*</span></label>
              <input style={inputStyle} type="text" required value={createName} onChange={(e) => setCreateName(e.target.value)} placeholder="e.g. Acme Corp" />

              <label style={labelStyle}>Company Type <span style={{ color: "#dc2626" }}>*</span></label>
              <input style={inputStyle} type="text" required value={createType} onChange={(e) => setCreateType(e.target.value)} placeholder="e.g. Retail, Technology…" />

              <label style={labelStyle}>Description</label>
              <textarea style={{ ...inputStyle, resize: "vertical" }} rows={3} value={createDescription} onChange={(e) => setCreateDescription(e.target.value)} placeholder="Brief description of the company…" />

              {createError && <p style={{ color: "#dc2626", fontSize: "13px", marginBottom: "12px" }}>{createError}</p>}

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "4px" }}>
                <button type="button" className="btn-cancel" onClick={() => { setShowCreate(false); resetCreateForm(); }} disabled={isCreating}>Cancel</button>
                <button type="submit" disabled={isCreating} style={{ backgroundColor: "#059669", color: "white", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer" }}>
                  {isCreating ? "Creating…" : "Add Company"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Info Modal */}
      {viewCompany && (
        <div className="modal" style={{ display: "flex" }}>
          <div className="modal-content">
            <h2 className="text-xl font-bold mb-4">Company Info</h2>
            <p><strong>ID:</strong> {viewCompany.id}</p>
            <p><strong>Name:</strong> {viewCompany.name}</p>
            <p><strong>Type:</strong> {viewCompany.type}</p>
            <p><strong>Description:</strong> {viewCompany.description}</p>
            <p><strong>Created:</strong> {formatBangkokDateTime(viewCompany.createdAt)}</p>
            <p><strong>Updated:</strong> {formatBangkokDateTime(viewCompany.updatedAt)}</p>
            <div className="mt-4 flex justify-end">
              <button className="btn-cancel" onClick={() => setViewCompany(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editTarget && (
        <div className="modal" style={{ display: "flex" }}>
          <div className="modal-content">
            <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "16px" }}>Edit Company: {editTarget.name}</h2>
            <form onSubmit={handleEdit}>
              <label style={labelStyle}>Company Name <span style={{ color: "#dc2626" }}>*</span></label>
              <input style={inputStyle} type="text" value={editName} onChange={(e) => setEditName(e.target.value)} required />

              <label style={labelStyle}>Company Type <span style={{ color: "#dc2626" }}>*</span></label>
              <input style={inputStyle} type="text" value={editType} onChange={(e) => setEditType(e.target.value)} required />

              <label style={labelStyle}>Description</label>
              <textarea style={{ ...inputStyle, resize: "vertical" }} rows={3} value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />

              {editError && <p style={{ color: "#dc2626", fontSize: "13px", marginBottom: "12px" }}>{editError}</p>}

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
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
        }}>
          <span>{toast.type === "success" ? "✓" : "✕"}</span>
          <span>{toast.msg}</span>
          <button onClick={() => setToast(null)} style={{ marginLeft: "auto", background: "none", border: "none", color: "white", cursor: "pointer", fontSize: "16px", lineHeight: 1 }}>×</button>
        </div>
      )}
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  useGetCompaniesQuery,
  useDeleteCompanyMutation,
  Company,
} from "@/store/api/adminApi";

export default function AdminCompany() {
  const router = useRouter();
  const { data: companies, isLoading, isError } = useGetCompaniesQuery();
  const [deleteCompany, { isLoading: isDeleting }] = useDeleteCompanyMutation();

  const [viewCompany, setViewCompany] = useState<Company | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Company | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleteError(null);
    try {
      await deleteCompany(deleteTarget.id).unwrap();
      setDeleteTarget(null);
    } catch (err) {
      const msg =
        (err as { error?: string })?.error ??
        "Failed to delete company. Make sure you are logged in.";
      setDeleteError(msg);
    }
  };

  return (
    <div className="users-container">
      {/* Header */}
      <div className="header">
        <h1>Company Management 👥</h1>
        <Link href="/admin/dashboard" className="back-link">
          ← Back to Dashboard
        </Link>
      </div>

      <button
        className="btn-add-staff"
        onClick={() => router.push("/admin/companies/create")}
      >
        Add New Company
      </button>

      {/* Loading / Error states */}
      {isLoading && <p className="text-center py-8 text-gray-500">Loading companies…</p>}
      {isError && (
        <p className="text-center py-8 text-red-500">
          Failed to load companies. Make sure the backend is running.
        </p>
      )}

      {/* Companies Table */}
      {!isLoading && !isError && (
        <div className="table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Company Name</th>
                <th>Type</th>
                <th>Description</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies && companies.length > 0 ? (
                companies.map((company) => (
                  <tr key={company.id}>
                    <td>{company.id}</td>
                    <td>{company.name}</td>
                    <td>{company.type}</td>
                    <td>{company.description}</td>
                    <td className="text-right">
                      <button
                        onClick={() => setViewCompany(company)}
                        className="mr-2"
                      >
                        Info
                      </button>
                      <button
                        onClick={() =>
                          router.push(`/admin/companies/${company.id}/edit`)
                        }
                        className="mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteTarget(company)}
                        className="text-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-400">
                    No companies found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* View / Info Modal */}
      {viewCompany && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="text-xl font-bold mb-4">Company Info</h2>
            <p><strong>ID:</strong> {viewCompany.id}</p>
            <p><strong>Name:</strong> {viewCompany.name}</p>
            <p><strong>Type:</strong> {viewCompany.type}</p>
            <p><strong>Description:</strong> {viewCompany.description}</p>
            <p>
              <strong>Created:</strong>{" "}
              {new Date(viewCompany.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Updated:</strong>{" "}
              {new Date(viewCompany.updatedAt).toLocaleString()}
            </p>
            <div className="mt-4 flex justify-end">
              <button onClick={() => setViewCompany(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>
              Are you sure you want to delete{" "}
              <strong>{deleteTarget.name}</strong>? This action cannot be
              undone.
            </p>
            {deleteError && (
              <p className="mt-2 text-red-500 text-sm">{deleteError}</p>
            )}
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="btn-cancel"
                onClick={() => { setDeleteTarget(null); setDeleteError(null); }}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                className="btn-confirm ml-2 bg-red-600 text-white"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
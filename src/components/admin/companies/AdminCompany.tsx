"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function AdminCompany() {
  const router = useRouter();
  const [messageOpen, setMessageOpen] = useState(false);
  const [adjustOpen, setAdjustOpen] = useState(false);

  return (
    <div className="users-container">
      {/* Header */}
      <div className="header">
        <h1>Company Management 👥</h1>

        {/* ✅ SPA safe navigation */}
        <Link href="/admin/dashboard" className="back-link">
          ← Back to Dashboard
        </Link>
      </div>

      {/* ✅ SPA safe navigation */}
      <button
        className="btn-add-staff"
        onClick={() => router.push("/admin/companies/create")}
      >
        Add New Company
      </button>

      {/* Companies Table */}
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
            {/* Example Row */}
            <tr>
              <td>1</td>
              <td>Sample Company</td>
              <td>Food</td>
              <td>Reward Partner</td>
              <td className="text-right">
                <button onClick={() => setMessageOpen(true)}>Info</button>
                <button onClick={() => setAdjustOpen(true)}>Adjust</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ✅ React Modal (Message) */}
      {messageOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Info</h2>
            <p>This is a test message.</p>
            <button onClick={() => setMessageOpen(false)}>Got It</button>
          </div>
        </div>
      )}

      {/* ✅ React Modal (Adjust Points) */}
      {adjustOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="text-xl font-bold mb-4">Adjust Points</h2>

            <form>
              <label>Name</label>
              <input readOnly defaultValue="User Name" className="modal-input" />

              <label>Current Points</label>
              <input readOnly defaultValue="1500" className="modal-input" />

              <label>Adjustment</label>
              <input type="number" required className="modal-input" />

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setAdjustOpen(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="btn-confirm ml-2">
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
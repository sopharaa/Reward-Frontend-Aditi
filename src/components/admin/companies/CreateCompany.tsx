"use client";

import Link from "next/link";

export function CreateCompany() {
    return (
        <div className="d-flex justify-content-center align-items-center w-100" style={{ minHeight: "80vh" }}>
            <div className="card shadow-sm w-100" style={{ maxWidth: "600px" }}>
                <div className="card-header bg-success text-white">
                    <h4 className="mb-0">Add New Company</h4>
                </div>

                <div className="card-body">
                    <form method="POST" action="/admin/companies">

                        <div className="mb-3">
                            <label className="form-label">
                                Company Name <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                name="company_name"
                                className="form-control"
                                required
                                placeholder="e.g. Phka Blush Co."
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Company Type <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                name="company_type"
                                className="form-control"
                                required
                                placeholder="e.g. Cosmetics"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                name="company_desc"
                                className="form-control"
                                rows={4}
                                placeholder="Short description about the company..."
                                required
                            ></textarea>
                        </div>

                        <div className="d-flex justify-content-between">
                            <Link href="/admin/companies" className="btn btn-outline-secondary">
                                ← Back
                            </Link>
                            <button type="submit" className="btn btn-primary">
                                Add Company
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
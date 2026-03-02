"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGetCompanyQuery, useUpdateCompanyMutation } from "@/store/api/adminApi";

interface Props {
    id: number;
}

export function EditCompany({ id }: Props) {
    const router = useRouter();
    const { data: company, isLoading: isFetching, isError } = useGetCompanyQuery(id);
    const [updateCompany, { isLoading: isUpdating }] = useUpdateCompanyMutation();

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // Pre‑fill the form once the company data is fetched
    useEffect(() => {
        if (company) {
            setName(company.name);
            setType(company.type);
            setDescription(company.description);
        }
    }, [company]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg(null);
        try {
            await updateCompany({ id, body: { name, type, description } }).unwrap();
            router.push("/admin/companies");
        } catch {
            setErrorMsg("Failed to update company. Please try again.");
        }
    };

    if (isFetching) {
        return <p className="text-center py-8 text-gray-500">Loading company…</p>;
    }

    if (isError || !company) {
        return (
            <p className="text-center py-8 text-red-500">
                Company not found or backend is unavailable.
            </p>
        );
    }

    return (
        <div className="d-flex justify-content-center align-items-center w-100" style={{ minHeight: "80vh" }}>
            <div className="card shadow-sm w-100" style={{ maxWidth: "600px" }}>
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Edit Company — {company.name}</h4>
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label">
                                Company Name <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Company Type <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                required
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        {errorMsg && (
                            <p className="text-red-500 text-sm mb-3">{errorMsg}</p>
                        )}

                        <div className="d-flex justify-content-between">
                            <Link href="/admin/companies" className="btn btn-outline-secondary">
                                ← Back
                            </Link>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isUpdating}
                            >
                                {isUpdating ? "Saving…" : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

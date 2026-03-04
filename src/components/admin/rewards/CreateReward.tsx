"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGetCompaniesQuery, useCreateRewardMutation } from "@/store/api/adminApi";

export default function CreateReward() {
    const router = useRouter();
    const { data: companies, isLoading: companiesLoading } = useGetCompaniesQuery();
    const [createReward, { isLoading: isSubmitting }] = useCreateRewardMutation();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState("");
    const [pointRequired, setPointRequired] = useState("");
    const [companyId, setCompanyId] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("stock", stock);
        formData.append("pointRequired", pointRequired);
        formData.append("companyId", companyId);
        if (image) formData.append("image", image);

        try {
            await createReward(formData).unwrap();
            router.push("/admin/rewards");
        } catch (err: unknown) {
            const e = err as { data?: { message?: string } };
            setError(e?.data?.message ?? "Failed to create reward. Please try again.");
        }
    };

    const inputClass = "mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm";
    const labelClass = "block text-sm font-medium text-gray-700 mb-1";

    return (
        <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-purple-600 px-6 py-4">
                    <h4 className="text-white text-xl font-bold mb-0">Add New Reward</h4>
                </div>

                <div className="p-6">
                    {error && (
                        <p className="mb-4 text-red-500 text-sm bg-red-50 border border-red-200 rounded-md py-2 px-3">
                            {error}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className={labelClass}>Reward Name</label>
                            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="e.g. Free Coffee" />
                        </div>

                        <div>
                            <label className={labelClass}>Reward Description</label>
                            <textarea required value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className={inputClass} placeholder="Describe the reward…" />
                        </div>

                        <div>
                            <label className={labelClass}>Reward Stock</label>
                            <input type="number" required min={0} value={stock} onChange={(e) => setStock(e.target.value)} className={inputClass} placeholder="0" />
                        </div>

                        <div>
                            <label className={labelClass}>Points Required</label>
                            <input type="number" required min={1} value={pointRequired} onChange={(e) => setPointRequired(e.target.value)} className={inputClass} placeholder="100" />
                        </div>

                        <div>
                            <label className={labelClass}>Select Company</label>
                            <select required value={companyId} onChange={(e) => setCompanyId(e.target.value)} className={inputClass} disabled={companiesLoading}>
                                <option value="" disabled>
                                    {companiesLoading ? "Loading companies…" : "-- Choose a company --"}
                                </option>
                                {(companies ?? []).map((c) => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className={labelClass}>Reward Image (optional)</label>
                            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] ?? null)} className={inputClass} />
                        </div>

                        <div className="flex justify-between pt-2">
                            <Link href="/admin/rewards" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-50 transition">
                                ← Back
                            </Link>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-2 bg-purple-600 text-white text-sm font-semibold rounded-md hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Creating…" : "Add Reward"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
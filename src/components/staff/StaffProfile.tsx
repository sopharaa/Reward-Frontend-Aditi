"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import StaffHeader from "@/components/layouts/StaffHeader";
import { useGetStaffProfileQuery, useUpdateStaffProfileMutation } from "@/store/api/staffApi";

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

export default function StaffProfile() {
    const { data: staff, isLoading } = useGetStaffProfileQuery();
    const [updateStaffProfile, { isLoading: isSaving }] = useUpdateStaffProfileMutation();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (staff?.name) {
            setName(staff.name);
        }
    }, [staff?.name]);

    const initial = staff?.name?.charAt(0).toUpperCase() ?? "S";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (password && password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        if (password) {
            formData.append("password", password);
            formData.append("confirmPassword", confirmPassword);
        }
        if (profileImage) {
            formData.append("profileImage", profileImage);
        }

        try {
            await updateStaffProfile(formData).unwrap();
            setSuccess("Profile updated successfully!");
            setPassword("");
            setConfirmPassword("");
            setProfileImage(null);
        } catch (err: unknown) {
            const e = err as { data?: { message?: string } };
            setError(e?.data?.message ?? "Update failed. Please try again.");
        }
    };

    const inputClass =
        "block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm";
    const readonlyClass =
        "block w-full border border-gray-200 rounded-md px-4 py-2 bg-gray-100 text-gray-500 cursor-not-allowed sm:text-sm";

    return (
        <div className="w-full min-h-screen bg-gray-50">
            <StaffHeader />

            <div className="w-[85%] mx-auto pt-4 pb-8">

                {/* Staff Banner */}
                <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-6 rounded-lg shadow-md mb-8 flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center mb-4 md:mb-0">
                        {isLoading ? (
                            <div className="w-20 h-20 rounded-full border-2 border-white mr-4 bg-green-400 animate-pulse" />
                        ) : staff?.profileImage ? (
                            <img
                                src={staff.profileImage}
                                alt={staff.name}
                                className="w-20 h-20 rounded-full border-2 border-white mr-4 object-cover"
                            />
                        ) : (
                            <div className="w-20 h-20 rounded-full border-2 border-white mr-4 bg-white/20 flex items-center justify-center text-3xl font-extrabold">
                                {initial}
                            </div>
                        )}
                        <div>
                            <p className="text-2xl font-semibold">{isLoading ? "Loading…" : (staff?.name ?? "Staff")}</p>
                            <p className="text-sm opacity-90">{isLoading ? "…" : (staff?.email ?? "")}</p>
                            <p className="text-sm opacity-75 mt-1">
                                Company: {isLoading ? "…" : (staff?.companyName ?? "N/A")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Personal Details Form */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 mb-8">
                    <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b-2 border-green-300 pb-3">
                        Personal Details
                    </h2>

                    {success && (
                        <p className="mb-5 text-green-700 text-sm bg-green-50 border border-green-200 rounded-md py-3 px-4">
                            ✅ {success}
                        </p>
                    )}
                    {error && (
                        <p className="mb-5 text-red-600 text-sm bg-red-50 border border-red-200 rounded-md py-3 px-4">
                            ❌ {error}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Profile Image */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Profile Image
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setProfileImage(e.target.files?.[0] ?? null)}
                                className={inputClass}
                            />
                        </div>

                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className={inputClass}
                                placeholder="Your full name"
                            />
                        </div>

                        {/* Email – read-only */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={staff?.email ?? ""}
                                    readOnly
                                    className={`${readonlyClass} pr-10`}
                                />
                                <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        {/* Company – read-only */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={isLoading ? "…" : (staff?.companyName ?? "N/A")}
                                    readOnly
                                    className={`${readonlyClass} pr-10`}
                                />
                                <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                New Password
                                <span className="ml-1 text-xs text-gray-400 font-normal">(leave blank to keep current)</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`${inputClass} pr-10`}
                                    placeholder="••••••••"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600" tabIndex={-1} aria-label="Toggle password visibility">
                                    <EyeIcon open={showPassword} />
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={`${inputClass} pr-10`}
                                    placeholder="••••••••"
                                />
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600" tabIndex={-1} aria-label="Toggle confirm password visibility">
                                    <EyeIcon open={showConfirmPassword} />
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                disabled={isSaving || isLoading}
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-md shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSaving ? "Saving…" : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="text-center mb-8">
                    <Link href="/staff/orders" className="text-green-600 hover:text-green-500 font-medium">
                        ← Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}

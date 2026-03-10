"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserRegisterMutation, useGetPublicCompaniesQuery } from "@/store/api/adminApi";

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

interface RegisterProps {
    onClose?: () => void;
    onSwitchToLogin?: () => void;
}

export default function Register({ onClose, onSwitchToLogin }: RegisterProps = {}) {
    const router = useRouter();
    const { data: companies, isLoading: companiesLoading } = useGetPublicCompaniesQuery();
    const [userRegister, { isLoading }] = useUserRegisterMutation();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [companyId, setCompanyId] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const inputClass = "mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        try {
            await userRegister({ companyId: Number(companyId), name, email, password, confirmPassword }).unwrap();
            if (onSwitchToLogin) {
                onSwitchToLogin();
            } else {
                router.push("/");
            }
        } catch (err: unknown) {
            const e = err as { data?: { message?: string } };
            setError(e?.data?.message ?? "Registration failed. Please try again.");
        }
    };

    const card = (
        <div className="bg-white shadow-lg rounded-xl p-6 w-full relative">
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none"
                    aria-label="Close"
                >
                    &times;
                </button>
            )}
            {/* Brand */}
            <div className="flex flex-col items-center mb-4">
                <h1 className="text-base font-extrabold text-green-700">PointTrix</h1>
            </div>

            <h2 className="text-xl font-bold text-center text-gray-800 mb-4">Create Your Account</h2>

            {error && (
                <p className="mb-3 text-red-500 text-sm text-center bg-red-50 border border-red-200 rounded-md py-2 px-3">
                    {error}
                </p>
            )}

            <form className="space-y-3" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="John Doe" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="you@example.com" />
                </div>
                {/* Password row */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} className={`${inputClass} pr-10`} placeholder="••••••••" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600" tabIndex={-1} aria-label="Toggle password visibility">
                                <EyeIcon open={showPassword} />
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <div className="relative">
                            <input type={showConfirmPassword ? "text" : "password"} required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={`${inputClass} pr-10`} placeholder="••••••••" />
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600" tabIndex={-1} aria-label="Toggle confirm password visibility">
                                <EyeIcon open={showConfirmPassword} />
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Company</label>
                    <select required value={companyId} onChange={(e) => setCompanyId(e.target.value)} className={inputClass} disabled={companiesLoading}>
                        <option value="" disabled>{companiesLoading ? "Loading companies…" : "-- Choose a company --"}</option>
                        {(companies ?? []).map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-start gap-2">
                    <input id="terms" type="checkbox" required checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-1 h-4 w-4 text-green-600 border-gray-300 rounded" />
                    <label htmlFor="terms" className="text-sm text-gray-700">
                        I agree to the{" "}
                        <Link href="/terms" className="text-green-600 hover:underline font-medium">Terms and Conditions</Link>
                        {" "}and{" "}
                        <Link href="/privacy-policy" className="text-green-600 hover:underline font-medium">Privacy Policy</Link>.
                    </label>
                </div>
                <button type="submit" disabled={isLoading}
                    className="w-full py-2.5 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isLoading ? "Registering..." : "Register"}
                </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{" "}
                {onSwitchToLogin ? (
                    <button onClick={onSwitchToLogin} className="font-medium text-green-600 hover:text-green-500">Login here</button>
                ) : (
                    <Link href="/login" className="font-medium text-green-600 hover:text-green-500">Login here</Link>
                )}
            </p>
        </div>
    );

    if (onClose) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
                <div className="w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                    {card}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-5">
            {card}
        </div>
    );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserLoginMutation } from "@/store/api/adminApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/authSlice";
import { AppDispatch } from "@/store";

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

interface LoginProps {
    onClose?: () => void;
    onSwitchToRegister?: () => void;
}

export default function Login({ onClose, onSwitchToRegister }: LoginProps = {}) {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [userLogin, { isLoading }] = useUserLoginMutation();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const result = await userLogin({ email, password }).unwrap();
            document.cookie = `user_token=${result.accessToken}; path=/`;
            dispatch(setUser({
                id: result.id,
                name: result.name,
                email: result.email,
                companyId: result.companyId,
                companyName: result.companyName,
                points: result.points,
                profileImage: result.profileImage,
                accessToken: result.accessToken,
                refreshToken: result.refreshToken,
            }));
            router.push("/dashboard");
        } catch (err: unknown) {
            const e = err as { data?: { message?: string } };
            setError(e?.data?.message ?? "Login failed. Please check your credentials.");
        }
    };

    const inputClass = "mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm";

    const card = (
        <div className="bg-white shadow-lg rounded-xl p-8 w-full relative">
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none"
                    aria-label="Close"
                >
                    &times;
                </button>
            )}
            {/* Brand */}
            <div className="flex flex-col items-center mb-6">
                <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center mb-3">
                    <span className="text-white text-2xl font-extrabold">P</span>
                </div>
                <h1 className="text-xl font-extrabold text-green-700">PointTrix</h1>
            </div>

            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>

            {error && (
                <p className="mb-4 text-red-500 text-sm text-center bg-red-50 border border-red-200 rounded-md py-2 px-3">
                    {error}
                </p>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="you@example.com" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} className={`${inputClass} pr-10`} placeholder="••••••••" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600" tabIndex={-1} aria-label="Toggle password visibility">
                            <EyeIcon open={showPassword} />
                        </button>
                    </div>
                </div>
                <button type="submit" disabled={isLoading}
                    className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isLoading ? "Signing in..." : "Sign In"}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                {onSwitchToRegister ? (
                    <button onClick={onSwitchToRegister} className="font-medium text-green-600 hover:text-green-500">Register here</button>
                ) : (
                    <Link href="/register" className="font-medium text-green-600 hover:text-green-500">Register here</Link>
                )}
            </p>
        </div>
    );

    if (onClose) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
                <div className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
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


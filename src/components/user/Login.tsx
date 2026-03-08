"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserLoginMutation } from "@/store/api/adminApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/authSlice";
import { AppDispatch } from "@/store";

export default function Login() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-5">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
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
                        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} placeholder="••••••••" />
                    </div>
                    <button type="submit" disabled={isLoading}
                        className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                        {isLoading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="font-medium text-green-600 hover:text-green-500">Register here</Link>
                </p>
            </div>
        </div>
    );
}


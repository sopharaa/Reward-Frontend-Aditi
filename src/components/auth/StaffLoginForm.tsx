"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStaffLoginMutation } from "@/store/api/adminApi";

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

export default function StaffLoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [staffLogin, { isLoading, error }] = useStaffLoginMutation();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await staffLogin({ email, password }).unwrap();
            document.cookie = `staff_token=${result.accessToken}; path=/`;
            router.push("/staff/orders");
        } catch {
            // error handled via RTK Query error state
        }
    };

    const getErrorMessage = () => {
        if (!error) return null;
        if ("status" in error) {
            const data = error.data as { message?: string } | undefined;
            return data?.message ?? "Login failed. Please check your credentials.";
        }
        return "An unexpected error occurred.";
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
            {/* Logo / Brand */}
            <div className="flex flex-col items-center mb-6">
                <h1 className="text-xl font-extrabold text-green-700 tracking-wide">PointTrix</h1>
                <p className="text-sm text-gray-500 mt-1">Staff Portal</p>
            </div>

            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Staff Login</h2>

            <form className="space-y-5" onSubmit={handleLogin}>
                {getErrorMessage() && (
                    <p className="text-red-500 text-sm text-center bg-red-50 border border-red-200 rounded-md py-2 px-3">
                        {getErrorMessage()}
                    </p>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        placeholder="staff@example.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm pr-10"
                            placeholder="Enter your password"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600" tabIndex={-1} aria-label="Toggle password visibility">
                            <EyeIcon open={showPassword} />
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Signing in..." : "Sign In"}
                </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
                Not a staff member?{" "}
                <Link href="/" className="text-green-600 hover:underline">
                    Go back
                </Link>
            </div>
        </div>
    );
}


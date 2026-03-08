"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStaffLoginMutation } from "@/store/api/adminApi";

export default function StaffLoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center mb-3">
                    <span className="text-white text-2xl font-extrabold">P</span>
                </div>
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
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        placeholder="Enter your password"
                    />
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


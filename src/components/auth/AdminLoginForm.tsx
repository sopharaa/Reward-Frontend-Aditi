"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useAdminLoginMutation } from "@/store/api/adminApi";
import { useDispatch } from "react-redux";
import { setAdmin } from "@/store/authSlice";
import { AppDispatch } from "@/store";

export default function AdminLoginForm() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [adminLogin, { isLoading, error }] = useAdminLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await adminLogin({ name, password }).unwrap();

      // Store access token in cookie (same key the middleware checks)
      document.cookie = `admin_token=${result.accessToken}; path=/`;

      // Save admin info to Redux state
      dispatch(
        setAdmin({
          id: result.id,
          name: result.name,
          profileImage: result.profileImage,
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        })
      );

      router.push("/admin/dashboard");
    } catch {
      // error is handled via the RTK Query `error` from useAdminLoginMutation
    }
  };

  // Extract a readable error message from RTK Query error
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
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Admin Login
      </h2>

      <form className="space-y-5" onSubmit={handleLogin}>
        {/* Error message from API */}
        {getErrorMessage() && (
          <p className="text-red-500 text-sm text-center">{getErrorMessage()}</p>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter your username"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter your password"
          />
        </div>



        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-emerald-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        Not an admin?{" "}
        <Link href="/" className="text-emerald-700 hover:underline">
          Go back
        </Link>
      </div>
    </div>
  );
}

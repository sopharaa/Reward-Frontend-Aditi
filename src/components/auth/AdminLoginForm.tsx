"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function AdminLoginForm() {
   const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock credentials
    if (email === "admin@gmail.com" && password === "12345678") {
      document.cookie = "admin_token=mock_admin_token; path=/";
      window.location.href = "/admin/dashboard";
    } else {
      alert("Invalid email or password");
    }
  };
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Admin Login
      </h2>

     <form className="space-y-5" onSubmit={handleLogin}>
        <div>
            <label className="block text-sm font-medium text-gray-700">
                Email
            </label>
            <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
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
            />
        </div>

        <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 text-white rounded-md"
        >
            Sign In
        </button>
        </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        Not an admin?{" "}
        <Link href="/" className="text-purple-600 hover:underline">
          Go back
        </Link>
      </div>
    </div>
  );
}
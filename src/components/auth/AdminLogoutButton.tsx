"use client";

import { useRouter } from "next/navigation";

export default function AdminLogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Remove cookie
    document.cookie =
      "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    router.replace("/admin/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="logout-btn text-danger border-0 bg-transparent w-100"
    >
      Logout
    </button>
  );
}
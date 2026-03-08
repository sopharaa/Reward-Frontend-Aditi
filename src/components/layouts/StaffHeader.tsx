"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
    { href: "/staff/orders", label: "Customer Orders" },
    { href: "/staff/redemptions", label: "Redeem Requests" },
    { href: "/staff/order-history", label: "Order History" },
    { href: "/staff/reward-inventory", label: "Reward Inventory" },
    { href: "/staff/transactions", label: "Transaction History" },
    { href: "/staff/profile", label: "Profile" },
];

export default function StaffHeader() {
    const pathname = usePathname();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        document.cookie = "staff_token=; path=/; max-age=0";
        router.push("/staff/login");
    };

    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    {/* Brand */}
                    <Link href="/staff/orders" className="text-2xl font-extrabold text-green-700">
                        PointTrix Staff
                    </Link>

                    {/* Desktop nav */}
                    <ul className="hidden lg:flex items-center space-x-5">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`text-sm font-medium transition duration-300 ${
                                        pathname === link.href
                                            ? "text-green-700 font-bold"
                                            : "text-gray-700 hover:text-green-600"
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={handleLogout}
                                className="text-sm text-red-600 font-bold hover:underline transition duration-300"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>

                    {/* Hamburger – mobile/tablet only */}
                    <button
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        <span className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                        <span className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                        <span className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                    </button>
                </div>

                {/* Mobile slide-down menu */}
                <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-screen border-t border-gray-100" : "max-h-0"}`}>
                    <ul className="max-w-6xl mx-auto flex flex-col px-6 py-2 bg-white">
                        {navLinks.map((link) => (
                            <li key={link.href} className="border-b border-gray-100 last:border-0">
                                <Link
                                    href={link.href}
                                    onClick={closeMenu}
                                    className={`block py-3 font-medium transition duration-300 ${
                                        pathname === link.href
                                            ? "text-green-700 font-bold"
                                            : "text-gray-700 hover:text-green-600"
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                        <li className="py-3">
                            <button
                                onClick={() => { closeMenu(); handleLogout(); }}
                                className="text-red-600 font-bold hover:underline transition duration-300"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </header>

            {/* Spacer */}
            <div className="h-20" />
        </>
    );
}

"use client";
import { useState } from "react";
import Link from "next/link";
import Login from "@/components/user/Login";
import Register from "@/components/user/Register";

type Modal = "login" | "register" | null;

const navLinks = [
  { href: "/", label: "Home" },
  { label: "Login", modal: "login" as Modal },
  { label: "Register", modal: "register" as Modal },
  { href: "/about", label: "About" },
  { href: "/help", label: "Help" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<Modal>(null);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Modals */}
      {activeModal === "login" && (
        <Login
          onClose={() => setActiveModal(null)}
          onSwitchToRegister={() => setActiveModal("register")}
        />
      )}
      {activeModal === "register" && (
        <Register
          onClose={() => setActiveModal(null)}
          onSwitchToLogin={() => setActiveModal("login")}
        />
      )}

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-extrabold text-green-700">PointTrix</div>

          {/* Desktop links */}
          <ul className="hidden md:flex space-x-6">
            {navLinks.map((link) =>
              link.href ? (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-700 hover:text-green-600 font-medium transition duration-300">
                    {link.label}
                  </Link>
                </li>
              ) : (
                <li key={link.label}>
                  <button
                    onClick={() => setActiveModal(link.modal!)}
                    className="text-gray-700 hover:text-green-600 font-medium transition duration-300"
                  >
                    {link.label}
                  </button>
                </li>
              )
            )}
          </ul>

          {/* Hamburger – mobile only */}
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 focus:outline-none"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile slide-down */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-64 border-t border-gray-100" : "max-h-0"}`}>
          <ul className="max-w-6xl mx-auto flex flex-col px-6 py-2 bg-white">
            {navLinks.map((link) =>
              link.href ? (
                <li key={link.label} className="border-b border-gray-100 last:border-0">
                  <Link href={link.href} onClick={() => setMenuOpen(false)} className="block py-3 text-gray-700 hover:text-green-600 font-medium transition duration-300">
                    {link.label}
                  </Link>
                </li>
              ) : (
                <li key={link.label} className="border-b border-gray-100 last:border-0">
                  <button
                    onClick={() => { setActiveModal(link.modal!); setMenuOpen(false); }}
                    className="block w-full text-left py-3 text-gray-700 hover:text-green-600 font-medium transition duration-300"
                  >
                    {link.label}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      </nav>

      <div className="px-4 sm:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center py-12 sm:py-16 bg-gradient-to-br from-green-500 to-green-700 text-white rounded-lg shadow-xl mb-12 px-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
            Unlock Exclusive Rewards with Our Plugin System!
          </h1>
          <p className="text-base sm:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Integrate seamlessly, earn points effortlessly, and redeem amazing rewards.
            Empower your users and grow your platform with our flexible reward solution.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => setActiveModal("register")}
              className="bg-white text-green-700 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105"
            >
              Get Started Now
            </button>
            <button
              onClick={() => setActiveModal("login")}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-green-800 hover:border-green-800 transition duration-300 transform hover:scale-105"
            >
              Already a Member? Log In
            </button>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200">
              <div className="text-green-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Seamless Integration</h3>
              <p className="text-gray-600">Easily add reward functionality to your existing platform as a plugin.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200">
              <div className="text-green-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.503 4.618a1 1 0 00.95.691h4.862c.969 0 1.371 1.24.588 1.81l-3.937 2.863a1 1 0 00-.364 1.118l1.503 4.618c.3.921-.755 1.688-1.539 1.118l-3.937-2.863a1 1 0 00-1.176 0l-3.937 2.863c-.784.57-1.838-.197-1.539-1.118l1.503-4.618a1 1 0 00-.364-1.118L2.05 10.046c-.783-.57-.381-1.81.588-1.81h4.862a1 1 0 00.95-.691l1.503-4.618z" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Points Management</h3>
              <p className="text-gray-600">Users earn points through activities, redeem them, and admins can adjust balances.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200 sm:col-span-2 lg:col-span-1">
              <div className="text-green-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.592 1L21 12h-3.812c-.669 0-1.309.298-1.764.81l-1.686 1.988c-.352.413-.853.622-1.353.622H12l-1.353-.622c-.5-.195-1-.404-1.352-.622L5.812 12H2l-.592-.592C2.92 8.402 3.89 8 5 8h2.082A1 1 0 008 7.21V5.79c0-.427-.42-.773-.94-.773H5c-1.11 0-2.08.402-2.592 1L2 6.592V12h3.812c.669 0 1.309-.298 1.764-.81l1.686-1.988c.352-.413.853-.622 1.353-.622H12z" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Reward Redemption</h3>
              <p className="text-gray-600">Users can easily browse and redeem a variety of rewards using their accumulated points.</p>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center py-10 px-6 bg-white rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Ready to Transform Your User Engagement?</h2>
          <p className="text-base sm:text-lg text-gray-700 mb-8 max-w-xl mx-auto">
            Join thousands of businesses enhancing their platforms with our intuitive and powerful reward system.
          </p>
          <button
            onClick={() => setActiveModal("register")}
            className="inline-block bg-green-600 text-white px-10 py-4 rounded-full font-bold text-xl shadow-lg hover:bg-green-700 transition duration-300 transform hover:scale-105"
          >
            Sign Up Today!
          </button>
        </section>
      </div>
    </div>
  );
}

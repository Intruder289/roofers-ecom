"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/products", label: "Products" },
    { href: "/admin/invoices", label: "Invoices" },
    { href: "/admin/settings", label: "Settings" },
    { href: "/", label: "Homepage" },
  ];
  

  return (
    <div className="flex h-screen bg-[#f9fafb] text-gray-800">
      {/* Mobile overlay sidebar */}
      <div
        className={`fixed inset-0 z-40 transition-transform transform bg-black/30 md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-white border-r shadow-sm p-4 flex flex-col transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0 md:static md:flex`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">🛍️ Admin</h1>
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <HiX size={24} />
          </button>
        </div>

        {/* Links */}
        <nav className="space-y-2 flex-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-3 py-2 rounded-lg transition ${
                pathname === link.href
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setSidebarOpen(false)} // close on mobile click
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <footer className="text-xs text-gray-500 text-center mt-auto">
          © 2025 Roofers Group
        </footer>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col md:pl-64">
        {/* Mobile top bar */}
        <header className="md:hidden bg-white border-b p-2 flex items-center justify-between shadow-sm">
          <button onClick={() => setSidebarOpen(true)}>
            <HiMenu size={24} />
          </button>
          <span className="font-semibold">Admin Panel</span>
        </header>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}

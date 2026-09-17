"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

import {
  LayoutDashboard,
  ShieldCheck,
  LogOut,
} from "lucide-react";

export default function Sidebar({ role }) {
  const pathname = usePathname();
  const router = useRouter();

  // Sidebar menu for each role
  const menuItems = {
    setter: [
      {
        title: "Dashboard",
        href: "/setter",
        icon: LayoutDashboard,
      },
    ],

    reviewer: [
      {
        title: "Dashboard",
        href: "/reviewer",
        icon: LayoutDashboard,
      },
    ],

    admin: [
      {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
      },
      {
        title: "Security Dashboard",
        href: "/security-dashboard",
        icon: ShieldCheck,
      },
    ],

    exam_center: [
      {
        title: "Dashboard",
        href: "/exam-center",
        icon: LayoutDashboard,
      },
      {
        title: "Verify Integrity",
        href: "/verify",
        icon: ShieldCheck,
      },
    ],
  };

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  return (
    <aside className="w-64 bg-blue-900 text-white flex flex-col justify-between min-h-screen shadow-lg">
      {/* Logo Section */}
      <div>
        <div className="px-6 py-6 border-b border-blue-800">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="ExamShield Logo"
              className="w-10 h-10 rounded-full bg-white p-1"
            />

            <div>
              <h1 className="text-lg font-bold">
                ExamShield Cloud
              </h1>

              <p className="text-xs text-blue-200">
                Secure Question Paper Portal
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3 space-y-2">
          {menuItems[role]?.map((item) => {
            const Icon = item.icon;

            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                  active
                    ? "bg-white text-blue-900 font-semibold"
                    : "hover:bg-blue-800 text-white"
                }`}
              >
                <Icon size={20} />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="border-t border-blue-800 p-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full rounded-lg px-4 py-3 hover:bg-red-600 transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
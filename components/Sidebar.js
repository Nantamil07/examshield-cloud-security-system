"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

import {
  Home,
  Upload,
  FileCheck,
  CalendarClock,
  ShieldCheck,
  Building2,
  LogOut,
} from "lucide-react";

export default function Sidebar({ role }) {
  const pathname = usePathname();
  const router = useRouter();

  // Menu items for each role
const menus = {
  setter: [
    {
      key: "setter-dashboard",
      title: "Dashboard",
      href: "/setter",
      icon: Home,
    },
    {
      key: "setter-upload",
      title: "Upload Question Paper",
      href: "/setter#upload",
      icon: Upload,
    },
  ],

  reviewer: [
    {
      key: "reviewer-dashboard",
      title: "Pending Papers",
      href: "/reviewer",
      icon: FileCheck,
    },
  ],

  admin: [
    {
      key: "admin-dashboard",
      title: "Schedule Release",
      href: "/admin",
      icon: CalendarClock,
    },
    {
  key: "security-dashboard",
  title: "Security Dashboard",
  href: "/security-dashboard",
  icon: ShieldCheck,
},
  ],

  exam_center: [
    {
      key: "exam-dashboard",
      title: "Available Papers",
      href: "/exam-center",
      icon: Building2,
    },
    {
      key: "verify",
      title: "Verify Integrity",
      href: "/verify",
      icon: ShieldCheck,
    },
  ],
};

  // Logout Function
  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <aside className="w-64 min-h-screen bg-blue-900 text-white flex flex-col justify-between shadow-lg">
      {/* Logo */}
      <div>
        <div className="p-6 border-b border-blue-800">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="ExamShield Logo"
              className="w-10 h-10 rounded-full bg-white p-1"
            />

            <div>
              <h2 className="font-bold text-lg">ExamShield</h2>
              <p className="text-xs text-blue-200">
                Secure Cloud Portal
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-5 px-3 space-y-2">
          {menus[role]?.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.key}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  active
                    ? "bg-white text-blue-900 font-semibold shadow"
                    : "hover:bg-blue-800 text-white"
                }`}
              >
                <Icon size={20} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-blue-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-red-600 transition-all"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
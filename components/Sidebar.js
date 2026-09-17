"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

import {
  LayoutDashboard,
  Upload,
  ClipboardCheck,
  CalendarClock,
  Download,
  Shield,
  LogOut,
} from "lucide-react";

export default function Sidebar({ role }) {
  const pathname = usePathname();
  const router = useRouter();

  const menu = {
    setter: [
      {
        name: "Dashboard",
        href: "/setter",
        icon: LayoutDashboard,
      },
    ],

    reviewer: [
      {
        name: "Dashboard",
        href: "/reviewer",
        icon: ClipboardCheck,
      },
    ],

    admin: [
      {
        name: "Dashboard",
        href: "/admin",
        icon: CalendarClock,
      },
      {
        name: "Security Dashboard",
        href: "/security-dashboard",
        icon: Shield,
      },
    ],

    exam_center: [
      {
        name: "Dashboard",
        href: "/exam-center",
        icon: Download,
      },
      {
        name: "Verify Integrity",
        href: "/verify",
        icon: Shield,
      },
    ],
  };

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  return (
    <aside className="w-72 bg-blue-900 text-white min-h-screen flex flex-col">
      {/* Logo */}

      <div className="px-6 py-7 border-b border-blue-800">
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-full p-2">
            <Upload className="text-blue-700" size={24} />
          </div>

          <div>
            <h2 className="font-bold text-lg">ExamShield Cloud</h2>

            <p className="text-blue-200 text-xs">
              Secure Exam Portal
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menu[role]?.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                active
                  ? "bg-white text-blue-800 font-semibold"
                  : "text-blue-100 hover:bg-blue-800"
              }`}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}

      <div className="p-4 border-t border-blue-800">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-red-600 transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
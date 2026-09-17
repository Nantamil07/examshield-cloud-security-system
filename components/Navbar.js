"use client";

import { ShieldCheck, Bell, UserCircle2 } from "lucide-react";

export default function Navbar({ title, user }) {
  return (
    <header className="bg-white shadow px-8 py-5 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-blue-800">{title}</h1>
        <p className="text-gray-500 text-sm">
          Government Question Paper Management System
        </p>
      </div>

      <div className="flex items-center gap-5">
        <Bell className="text-blue-700" />

        <div className="flex items-center gap-2">
          <UserCircle2 size={34} className="text-blue-700" />

          <div>
            <p className="font-semibold">{user?.user_metadata?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
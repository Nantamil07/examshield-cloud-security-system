"use client";

import { UserCircle2, CalendarDays } from "lucide-react";

export default function Navbar({ title, user }) {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="bg-white shadow-sm border-b px-8 py-5 flex justify-between items-center">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-blue-800">
          {title}
        </h1>

        <p className="text-sm text-gray-500">
          Government Secure Question Paper Management System
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-8">
        <div className="hidden md:flex items-center gap-2 text-gray-600 text-sm">
          <CalendarDays size={18} />
          {today}
        </div>

        <div className="flex items-center gap-3">
          <UserCircle2 size={38} className="text-blue-700" />

          <div className="text-right">
            <p className="font-semibold text-gray-800">
              {user?.user_metadata?.name || "User"}
            </p>

            <p className="text-xs text-gray-500">
              {user?.email}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
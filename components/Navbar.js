"use client";

import { CalendarDays, ShieldCheck, UserCircle } from "lucide-react";

export default function Navbar({ title, user }) {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="bg-white border-b border-gray-200 h-20 px-8 flex items-center justify-between">
      {/* Left */}

      <div>
        <p className="text-sm text-blue-700 font-medium uppercase tracking-wide">
          ExamShield Cloud
        </p>

        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      </div>

      {/* Right */}

      <div className="flex items-center gap-8">
        <div className="hidden md:flex items-center gap-2 text-gray-500 text-sm">
          <CalendarDays size={18} />
          {today}
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-blue-100 rounded-full p-2">
            <ShieldCheck className="text-blue-700" size={24} />
          </div>

          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-700">
              {user?.user_metadata?.name || "User"}
            </p>

            <p className="text-xs text-gray-500 capitalize">
              {user?.user_metadata?.role || "Role"}
            </p>
          </div>

          <UserCircle className="text-gray-400" size={34} />
        </div>
      </div>
    </header>
  );
}
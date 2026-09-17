"use client";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function PageLayout({
  role,
  title,
  user,
  children,
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}

      <Sidebar role={role} />

      {/* Main */}

      <div className="flex-1 flex flex-col">
        <Navbar title={title} user={user} />

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
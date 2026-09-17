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
      {/* Left Sidebar */}
      <Sidebar role={role} />

      {/* Right Content */}
      <div className="flex-1 flex flex-col">
        <Navbar title={title} user={user} />

        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
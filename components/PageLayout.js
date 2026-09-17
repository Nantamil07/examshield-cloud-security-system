"use client";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function PageLayout({ role, title, user, children }) {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar role={role} />

      <div className="flex-1 flex flex-col">
        <Navbar title={title} user={user} />

        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
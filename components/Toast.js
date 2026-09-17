"use client";

import { CheckCircle2, AlertCircle } from "lucide-react";

export default function Toast({
  type = "success",
  message,
}) {
  const isSuccess = type === "success";

  return (
    <div
      className={`fixed top-6 right-6 z-50 px-5 py-4 rounded-xl shadow-lg border flex items-center gap-3 ${
        isSuccess
          ? "bg-green-50 border-green-200 text-green-700"
          : "bg-red-50 border-red-200 text-red-700"
      }`}
    >
      {isSuccess ? (
        <CheckCircle2 size={22} />
      ) : (
        <AlertCircle size={22} />
      )}

      <span className="font-medium">{message}</span>
    </div>
  );
}
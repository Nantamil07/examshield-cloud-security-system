"use client";

import { FileX2 } from "lucide-react";

export default function EmptyState({
  title,
  description,
}) {
  return (
    <div className="bg-white rounded-xl border border-dashed border-gray-300 py-16 flex flex-col items-center text-center">
      <div className="bg-blue-50 p-5 rounded-full mb-5">
        <FileX2 className="text-blue-700" size={44} />
      </div>

      <h2 className="text-xl font-semibold text-gray-800">
        {title}
      </h2>

      <p className="text-gray-500 mt-2 max-w-md">
        {description}
      </p>
    </div>
  );
}
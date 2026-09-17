"use client";

export default function LoadingSpinner({
  text = "Loading...",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-12 h-12 border-4 border-blue-700 border-t-transparent rounded-full animate-spin"></div>

      <p className="mt-4 text-blue-700 font-medium">{text}</p>
    </div>
  );
}
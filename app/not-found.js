import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md border p-10 max-w-lg text-center">
        <h1 className="text-6xl font-bold text-blue-800 mb-3">
          404
        </h1>

        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Page Not Found
        </h2>

        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or you don't have permission to access it.
        </p>

        <Link href="/">
          <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium">
            Go to Home Page
          </button>
        </Link>
      </div>
    </main>
  );
}
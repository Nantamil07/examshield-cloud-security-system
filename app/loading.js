export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-md p-8 text-center">
        <div className="w-12 h-12 border-4 border-blue-700 border-t-transparent rounded-full animate-spin mx-auto mb-5"></div>

        <h2 className="text-xl font-bold text-blue-800">
          ExamShield Cloud
        </h2>

        <p className="text-gray-500 mt-2">
          Loading secure portal...
        </p>
      </div>
    </main>
  );
}
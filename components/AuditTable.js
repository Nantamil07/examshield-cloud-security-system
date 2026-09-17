"use client";

export default function AuditTable({ logs }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-bold text-blue-700">
          Recent Security Audit Logs
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Time</th>
              <th className="px-4 py-3 text-left">User ID</th>
              <th className="px-4 py-3 text-left">Action</th>
              <th className="px-4 py-3 text-left">Description</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr
                key={log.id}
                className="border-b hover:bg-blue-50"
              >
                <td className="px-4 py-3 text-sm">
                  {new Date(log.created_at).toLocaleString()}
                </td>

                <td className="px-4 py-3 text-sm">
                  {log.user_id?.slice(0, 12)}...
                </td>

                <td className="px-4 py-3">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                    {log.action}
                  </span>
                </td>

                <td className="px-4 py-3 text-sm">
                  {log.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
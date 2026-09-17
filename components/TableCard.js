"use client";

export default function TableCard({
  title,
  subtitle,
  headers,
  children,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b bg-white">
        <h2 className="text-xl font-bold text-blue-900">
          {title}
        </h2>

        {subtitle && (
          <p className="text-sm text-gray-500 mt-1">
            {subtitle}
          </p>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-blue-700 text-white sticky top-0">
            <tr>
              {headers.map((head) => (
                <th key={head} className="px-5 py-4 text-left">
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}
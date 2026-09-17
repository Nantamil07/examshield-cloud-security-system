export default function StatusBadge({ status }) {
  const styles = {
    Pending: "bg-orange-100 text-orange-700 border-orange-200",
    Approved: "bg-green-100 text-green-700 border-green-200",
    Rejected: "bg-red-100 text-red-700 border-red-200",
    Scheduled: "bg-purple-100 text-purple-700 border-purple-200",
    Released: "bg-blue-100 text-blue-700 border-blue-200",
    Verified: "bg-green-100 text-green-700 border-green-200",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold ${
        styles[status] || "bg-gray-100 text-gray-700 border-gray-200"
      }`}
    >
      {status}
    </span>
  );
}
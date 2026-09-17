const colors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Approved: "bg-green-100 text-green-700",
  Scheduled: "bg-purple-100 text-purple-700",
  Released: "bg-blue-100 text-blue-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${colors[status]}`}
    >
      {status}
    </span>
  );
}
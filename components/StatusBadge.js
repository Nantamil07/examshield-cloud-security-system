export default function StatusBadge({ status }) {
  let bgColor = "bg-gray-500";

  if (status === "Pending") bgColor = "bg-yellow-500";
  if (status === "Approved") bgColor = "bg-green-600";
  if (status === "Rejected") bgColor = "bg-red-600";

  return (
    <span className={`${bgColor} text-white px-3 py-1 rounded-full text-sm`}>
      {status}
    </span>
  );
}
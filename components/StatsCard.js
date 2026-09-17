export default function StatsCard({
  title,
  value,
  icon: Icon,
  color = "#2563EB",
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>

          <h2 className="text-3xl font-bold text-gray-800">{value}</h2>
        </div>

        <div
          className="rounded-full p-3"
          style={{ backgroundColor: `${color}15` }}
        >
          {Icon && <Icon size={28} color={color} />}
        </div>
      </div>
    </div>
  );
}
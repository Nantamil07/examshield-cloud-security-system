export default function StatsCard({
  title,
  value,
  icon: Icon,
  color = "#2563EB",
}) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm mb-2">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-gray-800">
            {value}
          </h2>
        </div>

        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          {Icon && <Icon size={28} color={color} />}
        </div>
      </div>
    </div>
  );
}
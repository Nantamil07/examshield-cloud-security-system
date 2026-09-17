export default function StatsCard({ title, value, color, icon }) {
  const Icon = icon;

  return (
    <div className="bg-white rounded-xl shadow p-5 border-l-4" style={{ borderColor: color }}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h2 className="text-3xl font-bold mt-1">{value}</h2>
        </div>

        <Icon size={34} color={color} />
      </div>
    </div>
  );
}
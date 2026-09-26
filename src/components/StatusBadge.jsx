// src/components/StatusBadge.jsx
const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  Preparing: "bg-blue-100 text-blue-700",
  Served: "bg-purple-100 text-purple-700",
};

export default function StatusBadge({ status }) {
  const colorClass = statusColors[status] ?? "bg-gray-100 text-gray-600";

  return (
    <span
      className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${colorClass}`}
    >
      {status}
    </span>
  );
}

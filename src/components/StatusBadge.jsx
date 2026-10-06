// 1. A "color map": status text → Tailwind CSS classes
//    Instead of writing if/else everywhere, we look up the color here.
const statusColors = {
  // Order statuses
  Pending: "bg-yellow-100 text-yellow-700",
  Preparing: "bg-blue-100 text-blue-700",
  Ready: "bg-purple-100 text-purple-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  // Table / menu statuses
  Available: "bg-green-100 text-green-700",
  Occupied: "bg-red-100 text-red-700",
  Reserved: "bg-purple-100 text-purple-700",
  Unavailable: "bg-gray-100 text-gray-600",
};

// 2. The component. Receives ONE prop: status (a string like "Pending")
export default function StatusBadge({ status }) {
  // 3. Look up the color. If status is not in the map, use gray as fallback
  //    so the app never crashes on an unknown status.
  const colorClass = statusColors[status] ?? "bg-gray-100 text-gray-600";

  // 4. Render a small rounded pill
  return (
    <span
      className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${colorClass}`}
    >
      {status}
    </span>
  );
}

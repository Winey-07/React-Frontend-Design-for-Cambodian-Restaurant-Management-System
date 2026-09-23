import { tables } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';

export default function Tables() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-dark">Tables</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tables.map((table) => (
          <div key={table.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center cursor-pointer hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-dark mb-1">{table.name}</h3>
            <p className="text-gray-500 text-sm mb-4">{table.seats} Seats</p>
            <StatusBadge status={table.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
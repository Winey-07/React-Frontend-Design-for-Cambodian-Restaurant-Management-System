import { Card, Space } from 'antd';


function CreateOrderPage() {
  return (
   <Space vertical size={16}>
    <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
            {/* Food cards grid */}
            {filtered.length === 0 ? (
              // EMPTY STATE
              <div className="bg-white rounded-xl p-12 text-center">
                <p className="text-gray-500 text-lg">No food found</p>
                <p className="text-gray-400 text-sm">
                  Try changing your search or filter
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
                  >
                    {/* Placeholder image box (no real images yet) */}
                    <div className="h-32 bg-[#F8F9FA] rounded-lg flex items-center justify-center text-4xl mb-3">
                      🍽️
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-[#2C3E50]">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.category}</p>
                      </div>
                      <span className="font-bold text-[#E67E22]">
                        ${Number(item.price).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <StatusBadge status={item.status} />
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(item)}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setDeletingId(item.id);
                            setIsDeleteOpen(true);
                          }}
                          className="text-sm text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
    </Card>
    <Card size="small" title="Small size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  </Space>
  );
}

export default CreateOrderPage;
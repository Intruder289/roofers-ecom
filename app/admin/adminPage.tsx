export default function AdminDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm">Total Products</h3>
          <p className="text-3xl font-bold mt-2">120</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm">Total Invoices</h3>
          <p className="text-3xl font-bold mt-2">37</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm">Revenue</h3>
          <p className="text-3xl font-bold mt-2">Tzs 1.2M</p>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import {LineChart,Line,XAxis,YAxis,Tooltip,BarChart,Bar,PieChart,Pie,Cell,ResponsiveContainer,AreaChart,Area,} from "recharts";
import Api from "../../auth/api";
import {  FiBox,  FiUsers,  FiShoppingBag,  FiSearch,  FiBell,  FiUser,  FiTrendingUp,  FiDollarSign,  FiCalendar,} from "react-icons/fi";
import dayjs from "dayjs"; 

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

const normalizeOrders = (rawOrders) =>
  rawOrders.map((o, idx) => ({
    id: o.id || `order-${idx}`,
    totalPrice: Number(o.total || o.totalPrice || o.amount || 0),
    createdAt: dayjs(o.date || o.created_at || o.createdAt),
    status: o.status || "Completed",
  products: (o.items || o.products || []).map((p) => ({
      id: p.id,
    name: p.name,
    image: p.images,
      quantity: p.quantity || 1,
    })),
  }));

useEffect(() => {
  const fetchData = async () => {
    const resProducts = await Api.get("/products");
    setProducts(resProducts.data);

    const resUsers = await Api.get("/users");
    setUsers(resUsers.data);

    const allOrders = resUsers.data.flatMap((u) =>
      normalizeOrders(u.orders || [])
    );
    setOrders(allOrders);
  };

  fetchData();
}, []);


  const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);

  const todayOrders = orders.filter((o) => o.createdAt.isSame(dayjs(), "day"));


  const categoryData = products.reduce((acc, p) => {
    const idx = acc.findIndex((c) => c.name === p.category);
    if (idx >= 0) acc[idx].value += 1;
    else acc.push({ name: p.category, value: 1 });
    return acc;
  }, []);

  // 7 day revenue graph
  const getLast7Days = () =>
    Array.from({ length: 7 }, (_, i) =>
      dayjs().subtract(6 - i, "day").format("MMM D")
    );

  const revenueData = getLast7Days().map((day) => {
    const dayRevenue = orders
      .filter((o) => o.createdAt.format("MMM D") === day)
      .reduce((sum, o) => sum + o.totalPrice, 0);
    return { date: day, revenue: dayRevenue };
  });

  // stock level
  const stockData = products
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
    .map((p) => ({
      name: p.name.length > 15 ? p.name.substring(0, 15) + "..." : p.name,
      stock: p.count,
    }));

  // recent orders
  const recentOrders = [...orders]
    .sort((a, b) => b.createdAt.valueOf() - a.createdAt.valueOf())
    .slice(0, 5);

  const COLORS = ["#0078D4","#00B294","#FFB900","#E81123","#5C2D91","#1E88E5","#D81B60","#8E24AA","#F57C00","#43A047",];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">
            Noirel Admin Dashboard
          </h1>
          <div className="flex items-center space-x-4">
      

            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                <FiUser />
              </div>
              <div className="ml-2"><p className="text-sm font-medium">Admin User</p> 
              <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Total Revenue */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Revenue</p>
                  <p className="text-2xl font-bold mt-1">
                    ${totalRevenue.toFixed(2)}
                  </p>
                  <p className="text-sm text-green-500 flex items-center mt-2">
                    <FiTrendingUp className="mr-1" /> Growth
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FiDollarSign className="text-blue-600 text-xl" />
                </div>
              </div>
            </div>

            {/* Total Products */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Products</p>
                  <p className="text-2xl font-bold mt-1">{products.length}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Across {categoryData.length} categories
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FiBox className="text-purple-600 text-xl" />
                </div>
              </div>
            </div>

            {/* Active Users */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Active Users</p>
                  <p className="text-2xl font-bold mt-1">{users.length}</p>
                  <p className="text-sm text-green-500 flex items-center mt-2">
                    <FiTrendingUp className="mr-1" /> Engagement
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <FiUsers className="text-green-600 text-xl" />
                </div>
              </div>
            </div>

            {/* Orders Today */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Orders Today</p>
                  <p className="text-2xl font-bold mt-1">
                    {todayOrders.length}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    $
                    {todayOrders
                      .reduce((sum, o) => sum + o.totalPrice, 0)
                      .toFixed(2)}{" "}
                    revenue
                  </p>
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <FiShoppingBag className="text-orange-600 text-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Revenue Overview */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">Revenue Overview</h3>
                <button className="flex items-center text-sm text-gray-500">
                  <FiCalendar className="mr-1" /> Last 7 days
                </button>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient
                            id="colorRevenue"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#0078D4"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#0078D4"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`$${value}`, "Revenue"]}
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#0078D4"
                      fill="url(#colorRevenue)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Product Categories */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-6">Product Categories</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [`${value} products`, name]}
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Stock + Recent Orders */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Stock Levels */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-6">Stock Levels</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stockData} layout="vertical">
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={100} />
                    <Tooltip
                      formatter={(value) => [`${value} units`, "Stock"]}
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Bar dataKey="stock" fill="#00B294" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Orders */}
{/* Recent Orders */}
<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
  <div className="flex items-center justify-between mb-6">
    <h3 className="font-bold text-lg">Recent Orders</h3>
    <a
      href="/admin/orders"
      className="text-blue-600 text-sm hover:underline"
    >
      View all
    </a>
  </div>

  <div className="space-y-4">
    {recentOrders.length > 0 ? (
      recentOrders.map((order, idx) => {
        // status color coding
        let statusColor = "bg-green-100 text-green-800";
        if (order.status.toLowerCase() === "pending") statusColor = "bg-yellow-100 text-yellow-800";
        else if (order.status.toLowerCase() === "cancelled") statusColor = "bg-red-100 text-red-800";

        return (
          <div
            key={order.id || idx}
            className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow"
          >
            {/* Product Info */}
            <div className="flex items-center gap-3">
           <img
  src={order.products?.[0]?.image || "https://via.placeholder.com/50"}
  alt={order.products?.[0]?.name || "Product"}
  className="w-12 h-12 object-cover rounded-lg"
/>
              <div className="flex flex-col">
                <p className="font-medium text-gray-800">
                  {order.products?.[0]?.name || "Product Name"}
                </p>
                <p className="text-sm text-gray-500">
                  Qty: {order.products?.[0]?.quantity || 1}
                </p>
                <p className="text-sm text-gray-500">
                  {order.createdAt.format("ddd, MMM D, YYYY")}
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="text-right flex flex-col items-end gap-1">
              <p className="font-medium text-gray-800">${order.totalPrice.toFixed(2)}</p>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
                {order.status}
              </span>
            </div>
          </div>
        );
      })
    ) : (
      <p className="text-gray-500 text-center py-4">No recent orders</p>
    )}
  </div>
</div>



            
          </div>
        </div>
      </main>
    </div>
  );
}

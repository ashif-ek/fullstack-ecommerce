import { useState, useEffect } from "react";
import Api from "../../services/api";
import dayjs from "dayjs";
import { FiSearch, FiPackage, FiTruck, FiCheckCircle, FiXCircle, FiClock, FiEye, FiEdit } from "react-icons/fi";
import InlineFeedback from "../../components/InlineFeedback";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null); // For detail modal (if needed later)
  const [feedback, setFeedback] = useState({ type: "", message: "", isVisible: false }); // Feedback state
  
  const fetchOrders = async () => {
    setLoading(true);
    setFeedback(prev => ({ ...prev, isVisible: false }));
    try {
      // Fetch from the new backend endpoint
      const { data } = await Api.get("/orders/");
      
      // Normalize data if necessary (though the serializer should be good)
      setOrders(data);
      setFilteredOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setFeedback({ type: "error", message: "Failed to fetch orders.", isVisible: true });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    let result = [...orders];

    if (search) {
      const s = search.toLowerCase();
      result = result.filter(o => 
        o.id.toString().includes(s) ||
        (o.user_email && o.user_email.toLowerCase().includes(s))
      );
    }

    if (statusFilter !== "all") {
      result = result.filter(o => o.status.toLowerCase() === statusFilter.toLowerCase());
    }

    setFilteredOrders(result);
  }, [search, statusFilter, orders]);

  const handleStatusChange = async (orderId, newStatus) => {
    setFeedback({ isVisible: false, message: "", type: "" });
    try {
      await Api.put(`/admin/orders/${orderId}/`, { status: newStatus });
      setFeedback({ type: "success", message: `Order #${orderId} marked as ${newStatus}`, isVisible: true, duration: 3000 });
      fetchOrders(); // Refresh list
    } catch (error) {
      console.error("Failed to update status:", error);
      setFeedback({ type: "error", message: "Failed to update order status.", isVisible: true });
    }
  };
  
  const updateStatus = handleStatusChange; // Alias for the dropdown call

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "processing": return "bg-blue-100 text-blue-800";
      case "shipped": return "bg-purple-100 text-purple-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100/50 min-h-screen font-sans">
       {/* Page Header */}
       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="text-sm text-gray-500 mt-1">View and manage customer orders.</p>
        </div>
      </div>
      
       {/* Feedback */}
       <div className="mb-4">
            <InlineFeedback 
                {...feedback} 
                onClose={() => setFeedback(prev => ({ ...prev, isVisible: false }))} 
            />
       </div>

       {/* Filters */}
       <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col md:flex-row items-center gap-4">
        <div className="relative w-full md:flex-grow">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Order ID or User Email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>
        <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-48 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition bg-white"
        >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
             <div className="flex justify-center items-center h-64">
                <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-indigo-500 rounded-full" />
             </div>
        ) : filteredOrders.length === 0 ? (
            <div className="text-center p-12">
                <FiPackage className="mx-auto text-4xl text-gray-300 mb-3" />
                <p className="text-gray-500">No orders found.</p>
            </div>
        ) : (
             <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-600">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50/50">
                        <tr>
                            <th className="p-4">Order ID</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Total</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Items</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order) => (
                            <tr key={order.id} className="bg-white border-b hover:bg-gray-50 transition">
                                <td className="p-4 font-medium text-gray-900">#{order.id}</td>
                                <td className="p-4">
                                    <div className="flex flex-col">
                                        <span className="font-medium">{order.user_email || "Unknown"}</span>
                                        {order.payment_id && <span className="text-xs text-gray-400">Ref: {order.payment_id}</span>}
                                    </div>
                                </td>
                                <td className="p-4">{dayjs(order.created_at).format("MMM D, YYYY HH:mm")}</td>
                                <td className="p-4 font-medium">${Number(order.total_amount).toFixed(2)}</td>
                                <td className="p-4">
                                     <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                        {order.status}
                                     </span>
                                </td>
                                <td className="p-4 text-xs text-gray-500">
                                    {order.items?.length} items
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center justify-center gap-2">
                                        {/* Status Actions */}
                                        {order.status !== "Delivered" && order.status !== "Cancelled" && (
                                            <div className="relative group">
                                                 <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full">
                                                    <FiEdit />
                                                 </button>
                                                 {/* Dropdown for quick status update */}
                                                 <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-100 rounded-lg shadow-lg hidden group-hover:block z-10">
                                                    {["Processing", "Shipped", "Delivered"].map(s => (
                                                        <button 
                                                            key={s}
                                                            onClick={() => updateStatus(order.id, s)}
                                                            className="block w-full text-left px-4 py-2 text-xs hover:bg-gray-50 text-gray-700"
                                                        >
                                                            Mark {s}
                                                        </button>
                                                    ))}
                                                 </div>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
        )}
      </div>
    </div>
  );
}

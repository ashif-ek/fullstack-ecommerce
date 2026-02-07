import { useState, useEffect } from "react";
import Api from "../../services/api";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { FiSearch, FiPackage, FiTruck, FiCheckCircle, FiXCircle, FiClock, FiEye, FiEdit } from "react-icons/fi";
import TableSkeleton from "./components/TableSkeleton";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null); 
  const [activeActionId, setActiveActionId] = useState(null); // Track which row has active actions menu
  
  const fetchOrders = async () => {
    setLoading(true);
    try {
      // Fetch from the new backend endpoint
      const { data } = await Api.get("/admin/orders/");
      
      // Normalize data if necessary (though the serializer should be good)
      setOrders(data);
      setFilteredOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      toast.error("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    
    // Close dropdown on outside click
    const handleClickOutside = () => setActiveActionId(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
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
      if (statusFilter === "pending") {
         result = result.filter(o => ["CREATED", "PAYMENT_INITIATED", "PAID"].includes(o.status));
      } else {
         result = result.filter(o => o.status === statusFilter);
      }
    }

    setFilteredOrders(result);
  }, [search, statusFilter, orders]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await Api.patch(`/admin/orders/${orderId}/`, { status: newStatus });
      toast.success(`Order #${orderId} marked as ${newStatus}`);
      fetchOrders(); // Refresh list
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update order status.");
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) { // Expecting Uppercase from backend
      case "CREATED":
      case "PAYMENT_INITIATED":
      case "PAID":
        return "bg-yellow-100 text-yellow-800"; // Pending/New
      case "PROCESSING": return "bg-blue-100 text-blue-800";
      case "SHIPPED": return "bg-purple-100 text-purple-800";
      case "DELIVERED": return "bg-green-100 text-green-800";
      case "CANCELLED": return "bg-red-100 text-red-800";
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
            <option value="PROCESSING">Processing</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
             <TableSkeleton rows={5} cols={7} />
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
                                            <div className="relative flex items-center gap-2">
                                                 <button 
                                                    onClick={() => setSelectedOrder(order)}
                                                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition"
                                                    title="View Details"
                                                 >
                                                    <FiEye />
                                                 </button>
                                                 <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setActiveActionId(activeActionId === order.id ? null : order.id);
                                                    }}
                                                    className={`p-2 rounded-full transition ${activeActionId === order.id ? 'bg-indigo-100 text-indigo-700' : 'text-indigo-600 hover:bg-indigo-50'}`}
                                                    title="Update Status"
                                                 >
                                                    <FiEdit />
                                                 </button>
                                                 {/* Dropdown for quick status update */}
                                                 {activeActionId === order.id && (
                                                     <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-100 rounded-lg shadow-lg z-20 overflow-hidden">
                                                        <div className="py-1">
                                                            {[
                                                                { label: "Mark Processing", value: "PROCESSING" },
                                                                { label: "Mark Shipped", value: "SHIPPED" },
                                                                { label: "Mark Delivered", value: "DELIVERED" }
                                                            ].map(action => (
                                                                <button 
                                                                    key={action.value}
                                                                    onClick={() => {
                                                                        handleStatusChange(order.id, action.value);
                                                                        setActiveActionId(null);
                                                                    }}
                                                                    className="block w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 text-gray-700 transition-colors"
                                                                >
                                                                    {action.label}
                                                                </button>
                                                            ))}
                                                        </div>
                                                     </div>
                                                 )}
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
      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl transform transition-all duration-300 ease-out p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
               <div>
                  <h3 className="text-xl font-bold text-gray-900">Order #{selectedOrder.id}</h3>
                  <p className="text-sm text-gray-500">{dayjs(selectedOrder.created_at).format("MMMM D, YYYY h:mm A")}</p>
               </div>
               <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600 transition">
                  <FiXCircle size={28} />
               </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
               <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">Customer</h4>
                  <p className="text-gray-900 font-medium">{selectedOrder.user_email || "Unknown"}</p>
                  {selectedOrder.user_details && (
                     <p className="text-sm text-gray-500 mt-1">{selectedOrder.user_details.username}</p>
                  )}
               </div>
               <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">Payment & Status</h4>
                  <div className="flex justify-between items-center mb-1">
                     <span className="text-gray-500 text-sm">Amount:</span>
                     <span className="font-bold text-gray-900 text-lg">${Number(selectedOrder.total_amount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-gray-500 text-sm">Status:</span>
                     <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status}
                     </span>
                  </div>
               </div>
            </div>

            <div>
               <h4 className="font-bold text-gray-900 mb-4">Order Items ({selectedOrder.items?.length || 0})</h4>
               <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm text-left text-gray-600">
                     <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                        <tr>
                           <th className="p-3">Product</th>
                           <th className="p-3 text-right">Price</th>
                           <th className="p-3 text-center">Qty</th>
                           <th className="p-3 text-right">Total</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-100">
                        {selectedOrder.items?.map((item, idx) => (
                           <tr key={idx} className="bg-white">
                              <td className="p-3 font-medium text-gray-900">
                                 {/* Assuming item structure from serializer */}
                                 {item.product_name || `Product #${item.product}`}
                              </td>
                              <td className="p-3 text-right">${Number(item.unit_price).toFixed(2)}</td>
                              <td className="p-3 text-center">{item.quantity}</td>
                              <td className="p-3 text-right font-semibold">${(Number(item.unit_price) * item.quantity).toFixed(2)}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

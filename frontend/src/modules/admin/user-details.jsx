
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Api from "../../auth/api";
import { FiArrowLeft, FiMail, FiUser, FiShoppingBag, FiMapPin, FiCreditCard, FiCheckCircle, FiXCircle, FiLoader } from "react-icons/fi";
import { toast } from "react-toastify";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        // const res = await Api.get(`/users/${id}`);
        // setUser(res.data);

const res = await Api.get(`/users/${id}`);
if (res.data.role !== "admin") {
  setUser(res.data);
} else {
  setUser(null); // to hide admin  
}
      } catch (err) {
        console.error("Error fetching user:", err);
        toast.error("Failed to load user details");
      }
      setLoading(false);
    };

    fetchUser();
  }, [id]);

  // Toggle block status
  const toggleBlock = async () => {
    if (!user) return;
    setUpdating(true);
    try {
      const updated = await Api.patch(`/users/${id}`, {
        isBlocked: !user.isBlocked,
      });
      setUser(updated.data);
      toast.success(`User ${updated.data.isBlocked ? 'blocked' : 'unblocked'} successfully`);
    } catch (err) {
      console.error("Error updating block status:", err);
      toast.error("Failed to update user status");
    }
    setUpdating(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FiLoader className="animate-spin text-2xl text-blue-600 mr-2" />
        <p className="text-gray-600">Loading user details...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center mb-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mr-4"
          >
            <FiArrowLeft className="mr-1" />
            Back
          </button>
          <h2 className="text-xl font-semibold text-gray-800">User Not Found</h2>
        </div>
        <p className="text-gray-600">The requested user could not be found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mr-4"
        >
          <FiArrowLeft className="mr-1" />
          Back
        </button>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">User Details</h2>
          <p className="text-sm text-gray-500">Manage user account and view order history</p>
        </div>
      </div>

      {/* User Summary Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-semibold mr-4">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
              <div className="flex items-center text-gray-600 mt-1">
                <FiMail className="text-sm mr-2" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center text-gray-600 mt-1">
                <FiUser className="text-sm mr-2" />
                <span className="capitalize">{user.role || "customer"}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-start md:items-end">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              user.isBlocked 
                ? "bg-red-100 text-red-800" 
                : "bg-green-100 text-green-800"
            }`}>
              {user.isBlocked ? (
                <>
                  <FiXCircle className="mr-1" />
                  Blocked
                </>
              ) : (
                <>
                  <FiCheckCircle className="mr-1" />
                  Active
                </>
              )}
            </span>
            
            <button
              onClick={toggleBlock}
              disabled={updating}
              className={`mt-3 px-4 py-2 rounded-md text-white text-sm font-medium transition-colors ${
                user.isBlocked 
                  ? "bg-green-600 hover:bg-green-700" 
                  : "bg-red-600 hover:bg-red-700"
              } ${updating ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {updating ? (
                <span className="flex items-center">
                  <FiLoader className="animate-spin mr-2" />
                  Updating...
                </span>
              ) : user.isBlocked ? (
                "Unblock User"
              ) : (
                "Block User"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab("details")}
              className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "details"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Account Details
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "orders"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Order History
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {/* Account Details Tab */}
          {activeTab === "details" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Basic Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                    <p className="text-gray-800">{user.name || "Not provided"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                    <p className="text-gray-800">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Role</label>
                    <p className="text-gray-800 capitalize">{user.role || "customer"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Account Status</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.isBlocked 
                        ? "bg-red-100 text-red-800" 
                        : "bg-green-100 text-green-800"
                    }`}>
                      {user.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Additional Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">User ID</label>
                    <p className="text-gray-800 font-mono text-sm">{id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Registration Date</label>
                    <p className="text-gray-800">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Last Login</label>
                    <p className="text-gray-800">{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Unknown"}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Order History Tab */}
          {activeTab === "orders" && (
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Order History</h3>
              
              {user.orders && user.orders.length > 0 ? (
                <div className="space-y-4">
                  {[...user.orders].reverse().map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      {/* Order Header */}
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between">
                        <div className="mb-2 sm:mb-0">
                          <p className="text-sm font-medium text-gray-700">
                            Order #: {order.id}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Total Amount</p>
                          <p className="text-lg font-semibold text-gray-800">₹{order.total.toFixed(2)}</p>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="p-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                          <FiShoppingBag className="mr-2" />
                          Items ({order.items.length})
                        </h4>
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-start">
                              {item.images?.[0] && (
                                <img
                                  src={item.images[0]}
                                  alt={item.name}
                                  className="w-12 h-12 object-cover rounded mr-4"
                                />
                              )}
                              <div className="flex-grow">
                                <p className="font-medium text-gray-800">{item.name}</p>
                                <p className="text-sm text-gray-500">
                                  Quantity: {item.quantity} × ₹{item.price.toFixed(2)}
                                </p>
                              </div>
                              <p className="font-medium text-gray-800">
                                ₹{(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shipping & Payment Details */}
                      <div className="bg-gray-50 p-4 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                              <FiMapPin className="mr-2" />
                              Shipping Address
                            </h4>
                            <div className="text-sm text-gray-600">
                              <p>{order.shipping.fullName}</p>
                              <p>{order.shipping.address}</p>
                              <p>
                                {order.shipping.city}, {order.shipping.postalCode}
                              </p>
                              <p>{order.shipping.country}</p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                              <FiCreditCard className="mr-2" />
                              Payment Information
                            </h4>
                            <div className="text-sm text-gray-600">
                              <p className="capitalize">{order.paymentMethod}</p>
                              <p className="truncate">ID: {order.paymentId}</p>
                              <p className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1 ${
                                order.status === "completed" 
                                  ? "bg-green-100 text-green-800" 
                                  : order.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}>
                                {order.status || "completed"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FiShoppingBag className="mx-auto text-3xl text-gray-400 mb-3" />
                  <h4 className="text-lg font-medium text-gray-600 mb-1">No orders found</h4>
                  <p className="text-gray-500">This user hasn't placed any orders yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



























// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Api from "../../auth/api";

// export default function UserDetails() {
//   const { id } = useParams();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [updating, setUpdating] = useState(false);

//   useEffect(() => {
//     const fetchUser = async () => {
//       setLoading(true);
//       try {
//         const res = await Api.get(`/users/${id}`);
//         setUser(res.data);
//       } catch (err) {
//         console.error("Error fetching user:", err);
//       }
//       setLoading(false);
//     };

//     fetchUser();
//   }, [id]);

//   // 🔹 Block / Unblock handler
//   const toggleBlock = async () => {
//     if (!user) return;
//     setUpdating(true);
//     try {
//       const updated = await Api.patch(`/users/${id}`, {
//         isBlocked: !user.isBlocked,
//       });
//       setUser(updated.data); // refresh local state
//     } catch (err) {
//       console.error("Error updating block status:", err);
//     }
//     setUpdating(false);
//   };

//   if (loading) return <p className="p-4">Loading user details...</p>;
//   if (!user) return <p className="p-4">User not found.</p>;

//   return (
//     <div className="p-6 bg-white shadow rounded">
//       <h2 className="text-2xl font-bold mb-4">{user.name}'s Details</h2>

//       <div className="space-y-2 mb-6">
//         <p>
//           <span className="font-semibold">Email:</span> {user.email}
//         </p>
//         <p>
//           <span className="font-semibold">Role:</span>{" "}
//           {user.role || "customer"}
//         </p>
//         <p>
//           <span className="font-semibold">Status:</span>{" "}
//           {user.isBlocked ? (
//             <span className="text-red-600 font-medium">Blocked</span>
//           ) : (
//             <span className="text-green-600 font-medium">Active</span>
//           )}
//         </p>
//       </div>

//       {/* 🔹 Block/Unblock button */}
//       <button
//         onClick={toggleBlock}
//         disabled={updating}
//         className={`px-4 py-2 rounded text-white ${
//           user.isBlocked ? "bg-green-600" : "bg-red-600"
//         }`}
//       >
//         {updating
//           ? "Updating..."
//           : user.isBlocked
//           ? "Unblock User"
//           : "Block User"}
//       </button>

//       {/* 🔹 Order History */}
//       <h3 className="text-xl font-semibold mt-6 mb-2">Order History</h3>
//       {user.orders && user.orders.length > 0 ? (
//         <div className="space-y-6">
//           {[...user.orders].reverse().map((order) => (
//             <div
//               key={order.id}
//               className="border border-gray-200 rounded-lg overflow-hidden"
//             >
//               {/* Header */}
//               <div className="flex justify-between items-center bg-gray-100 px-4 py-2">
//                 <div>
//                   <p className="text-sm text-gray-500">Order ID: {order.id}</p>
//                   <p className="text-xs text-gray-400">
//                     {new Date(order.date).toLocaleDateString()}
//                   </p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-sm text-gray-500">Total</p>
//                   <p className="text-lg font-semibold">₹{order.total}</p>
//                 </div>
//               </div>

//               {/* Items */}
//               <div className="p-4 space-y-4">
//                 {order.items.map((item) => (
//                   <div key={item.id} className="flex items-center space-x-4">
//                     <img
//                       src={item.images?.[0]}
//                       alt={item.name}
//                       className="w-16 h-16 object-cover rounded"
//                     />
//                     <div className="flex-grow">
//                       <p className="font-semibold">{item.name}</p>
//                       <p className="text-sm text-gray-500">
//                         Qty: {item.quantity} × ₹{item.price}
//                       </p>
//                     </div>
//                     <p className="font-medium">
//                       ₹{(item.price * item.quantity).toFixed(2)}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               {/* Shipping & Payment */}
//               <div className="p-4 border-t text-sm text-gray-600 space-y-1">
//                 <p>
//                   <span className="font-semibold">Ship to:</span>{" "}
//                   {order.shipping.fullName}
//                 </p>
//                 <p>
//                   {order.shipping.address}, {order.shipping.city},{" "}
//                   {order.shipping.postalCode}
//                 </p>
//                 <p>{order.shipping.country}</p>
//                 <p>
//                   <span className="font-semibold">Payment:</span>{" "}
//                   {order.paymentMethod} ({order.paymentId})
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500">No orders found for this user.</p>
//       )}
//     </div>
//   );
// }

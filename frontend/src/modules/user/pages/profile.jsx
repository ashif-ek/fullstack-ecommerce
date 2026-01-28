// import Navbar from "../../../components/navbar";
// import Footer from "../../../components/footer";
// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../../context/AuthContext";
// import { useCart } from "../../../context/CartContext";
// import { useWishlist } from "../../../context/WishlistContext";
// import Api from "../../../auth/api";

// export default function Profile() {
//   const { user, logout } = useAuth();
//   const { cart } = useCart();
//   const { wishlist } = useWishlist();
//   const navigate = useNavigate();

//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     if (!user) {
//       navigate("/");
//     }
//   }, [user, navigate]);


  
// const handleClearOrders = async () => {
//   if (!user?.id) return;

//   try {
//     // Fetch current user
//     const response = await Api.get(`/users/${user.id}`);
//     const currentUserData = response.data;

//     // Update user with empty orders array
//     const updatedUserData = {
//       ...currentUserData,
//       orders: [],
//     };

//     await Api.put(`/users/${user.id}`, updatedUserData);

//     setOrders([]); // Clear orders locally
//   } catch (err) {
//     console.error("Error clearing orders:", err);
//   }
// };

//   // --- FIX 1: Correctly fetch orders from the user object ---
//   useEffect(() => {
//     if (user?.id) {
//       Api.get(`/users/${user.id}`) // Fetch the specific user's data
//         .then((res) => {
//           // Set orders from the 'orders' array inside the user object
//           setOrders(res.data.orders || []); 
//         })
//         .catch((err) => console.error("Error fetching user orders", err));
//     }
//   }, [user]);

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   if (!user) return null;

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-black text-white font-light">
//         <div className="max-w-6xl mx-auto py-20 px-6">
//           {/* Header */}
//           <div className="text-center mb-12">
//             <h1 className="text-4xl md:text-5xl mb-2 tracking-wider">My Account</h1>
//             <p className="text-gray-400">Welcome back, {user.username}</p>
//           </div>

//           {/* Tabs */}
//           <div className="flex justify-center border-b border-white/10 mb-12">
//             {["dashboard", "orders", "details"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`px-6 py-3 text-sm tracking-widest uppercase transition-colors ${
//                   activeTab === tab
//                     ? "text-white border-b-2 border-white"
//                     : "text-gray-500 hover:text-white"
//                 }`}
//               >
//                 {tab === "dashboard"
//                   ? "Dashboard"
//                   : tab === "orders"
//                   ? "Order History"
//                   : "Account Details"}
//               </button>
//             ))}
//           </div>

//           {/* Content */}
//           <div>
//             {/* Dashboard */}
//             {activeTab === "dashboard" && (
//                 // ... your dashboard code remains the same ...
//                 <div className="space-y-10">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                     <Link
//                         to="/carts"
//                         className="flex items-center space-x-6 p-6 bg-gray-900/50 border border-white/10 rounded-lg hover:bg-gray-900 transition-colors"
//                     >
//                         <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                         </svg>
//                         <div>
//                         <h3 className="text-xl tracking-wider">My Cart</h3>
//                         <p className="text-gray-400">{cart.length} item(s)</p>
//                         </div>
//                     </Link>
//                     <Link
//                         to="/whishlist"
//                         className="flex items-center space-x-6 p-6 bg-gray-900/50 border border-white/10 rounded-lg hover:bg-gray-900 transition-colors"
//                     >
//                         <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                         </svg>
//                         <div>
//                         <h3 className="text-xl tracking-wider">My Wishlist</h3>
//                         <p className="text-gray-400">{wishlist.length} item(s)</p>
//                         </div>
//                     </Link>
//                     </div>
//                     <div className="text-center pt-6">
//                     <button
//                         onClick={handleLogout}
//                         className="border border-red-500/50 text-red-500 px-6 py-2 text-xs tracking-widest uppercase hover:bg-red-500/20 transition-colors"
//                     >
//                         Logout
//                     </button>
//                     </div>
//                 </div>
//             )}

//             {/* --- FIX 2: Correctly render the orders and the items within them --- */}

//             {orders.length > 0 && (
              
//   <div className="text-center pt-6">
//     <button
//       onClick={handleClearOrders}
//       className="border border-red-500/50 text-red-500 px-6 py-2 text-xs tracking-widest uppercase hover:bg-red-500/20 transition-colors"
//     >
//       Clear Order History
//     </button>
//   </div>
// )}
// <br />
// <br />

//             {activeTab === "orders" && (
//               <div className="space-y-8">
//                 {orders.length === 0 ? (
//                   <div className="text-center text-gray-500 py-16 border border-white/10 rounded-lg">
//                     <p>You have not placed any orders yet.</p>
//                   </div>

                  

//                 ) : (
//                   // Show most recent orders first
//                   [...orders].reverse().map((order) => (
//                     <div key={order.date} className="bg-gray-900/50 border border-white/10 rounded-lg overflow-hidden">
//                       {/* Order Header: Shows date and total price */}
//                       <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-900">
//                         <div>
//                           <p className="text-sm text-gray-400">ORDER PLACED</p>
//                           <p className="text-white">
//                             {new Date(order.date).toLocaleDateString("en-US", {
//                               year: 'numeric', month: 'long', day: 'numeric'
//                             })}
//                           </p>
//                         </div>
//                         <div className="mt-2 md:mt-0 md:text-right">
//                           <p className="text-sm text-gray-400">TOTAL</p>
//                           <p className="text-xl font-serif text-white">₹{order.total.toFixed(2)}</p>
//                         </div>
//                       </div>
                      

//                       {/* Order Items: Loops through items within the order */}
//                       <div className="p-4 space-y-4">
//                         {order.items.map((item) => (
//                           <div key={item.id} className="flex items-center space-x-4">
//                             <img
//                               src={item.images[0]} // image is an array, so we take the first one
//                               alt={item.name}
//                               className="w-16 h-16 object-cover rounded-md"
//                             />
//                             <div className="flex-grow">
//                               <p className="font-semibold text-white">{item.name}</p>
//                               <p className="text-sm text-gray-400">
//                                 Qty: {item.quantity} · ₹{item.price.toFixed(2)} each
//                               </p>
//                             </div>
//                             <p className="font-serif text-lg">
//                               ₹{(item.price * item.quantity).toFixed(2)}
//                             </p>
//                           </div>
//                         ))}
//                       </div>



// <div className="p-4 border-t border-white/10 text-sm text-gray-300 space-y-1">
//   <p><span className="font-semibold">Ship to:</span> {order.shipping.fullName}</p>
//   <p>{order.shipping.address},
//      {order.shipping.city},
//       {order.shipping.postalCode}</p>
//   <p>{order.shipping.country}</p>
//   <p><span className="font-semibold">Payment:</span> {order.paymentMethod} ({order.paymentId})</p>
// </div>




//                     </div>
//                   ))
//                 )}
//               </div>
//             )}

//             {/* Account Details */}
//             {activeTab === "details" && (
//                 // ... your account details code remains the same ...
//                 <div className="max-w-md mx-auto space-y-6">
//                     <div className="space-y-4">
//                     <div>
//                         <label className="text-xs text-gray-400 uppercase tracking-wider">User ID</label>
//                         <input type="text" value={user.id} disabled className="w-full bg-transparent border-b border-white/20 p-2 mt-1"/>
//                     </div>
//                     <div>
//                         <label className="text-xs text-gray-400 uppercase tracking-wider">Username</label>
//                         <input type="text" value={user.username} disabled className="w-full bg-transparent border-b border-white/20 p-2 mt-1"/>
//                     </div>
//                     <div>
//                         <label className="text-xs text-gray-400 uppercase tracking-wider">Email Address</label>
//                         <input type="email" value={user.useremail} disabled className="w-full bg-transparent border-b border-white/20 p-2 mt-1"/>
//                     </div>
//                     </div>
//                     <div className="text-center pt-4">
//                     <button disabled className="bg-gray-600 text-gray-400 cursor-not-allowed text-sm tracking-widest uppercase px-6 py-3">
//                         Edit Details
//                     </button>
//                     <p className="text-xs text-gray-500 mt-2">(Editing functionality coming soon)</p>
//                     </div>
//                 </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }





import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";
import Api from "../../../auth/api";

export default function Profile() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);


  
const handleClearOrders = async () => {
  if (!user?.id) return;

  try {
    // Fetch current user
    const response = await Api.get(`/users/${user.id}`);
    const currentUserData = response.data;

    // Update user with empty orders array
    const updatedUserData = {
      ...currentUserData,
      orders: [],
    };

    await Api.put(`/users/${user.id}`, updatedUserData);

    setOrders([]); // Clear orders locally
  } catch (err) {
    console.error("Error clearing orders:", err);
  }
};

  useEffect(() => {
    if (user?.id) {
      Api.get(`/users/${user.id}`) 
        .then((res) => {
          setOrders(res.data.orders || []); 
        })
        .catch((err) => console.error("Error fetching user orders", err));
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white font-light">
        <div className="max-w-6xl mx-auto py-20 px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl mb-2 tracking-wider">My Account</h1>
            <p className="text-gray-400">Welcome back, {user.username}</p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center border-b border-white/10 mb-12">
            {["dashboard", "orders", "details"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm tracking-widest uppercase transition-colors ${
                  activeTab === tab
                    ? "text-white border-b-2 border-white"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                {tab === "dashboard"
                  ? "Dashboard"
                  : tab === "orders"
                  ? "Order History"
                  : "Account Details"}
              </button>
            ))}
          </div>

          {/* Content */}
          <div>
            {/* Dashboard */}
            {activeTab === "dashboard" && (
                <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Link
                        to="/carts"
                        className="flex items-center space-x-6 p-6 bg-gray-900/50 border border-white/10 rounded-lg hover:bg-gray-900 transition-colors"
                    >
                        <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <div>
                        <h3 className="text-xl tracking-wider">My Cart</h3>
                        <p className="text-gray-400">{cart.length} item(s)</p>
                        </div>
                    </Link>
                    <Link
                        to="/whishlist"
                        className="flex items-center space-x-6 p-6 bg-gray-900/50 border border-white/10 rounded-lg hover:bg-gray-900 transition-colors"
                    >
                        <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <div>
                        <h3 className="text-xl tracking-wider">My Wishlist</h3>
                        <p className="text-gray-400">{wishlist.length} item(s)</p>
                        </div>
                    </Link>
                    </div>
                    <div className="text-center pt-6">
                    <button
                        onClick={handleLogout}
                        className="border border-red-500/50 text-red-500 px-6 py-2 text-xs tracking-widest uppercase hover:bg-red-500/20 transition-colors"
                    >
                        Logout
                    </button>
                    </div>
                </div>
            )}


            {/* Show "Clear" button only if on 'orders' tab and orders exist */}
            {activeTab === "orders" && orders.length > 0 && (
              <div className="text-center mb-8">
                <button
                  onClick={handleClearOrders}
                  className="border border-red-500/50 text-red-500 px-6 py-2 text-xs tracking-widest uppercase hover:bg-red-500/20 transition-colors"
                >
                  Clear Order History
                </button>
              </div>
            )}

            {/* Order History Tab */}
            {activeTab === "orders" && (
              <div className="space-y-8">
                {orders.length === 0 ? (
                  <div className="text-center text-gray-500 py-16 border border-white/10 rounded-lg">
                    <p>You have not placed any orders yet.</p>
                  </div>
                ) : (
                  // Show most recent orders first
                  [...orders].reverse().map((order, index) => (
                    <div key={order.date || index} className="bg-gray-900/50 border border-white/10 rounded-lg overflow-hidden">
                      {/* Order Header */}
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-900">
                        <div>
                          <p className="text-sm text-gray-400">ORDER PLACED</p>
                          <p className="text-white">
                            {order.date ? new Date(order.date).toLocaleDateString("en-US", {
                              year: 'numeric', month: 'long', day: 'numeric'
                            }) : 'Date not available'}
                          </p>
                        </div>
                        <div className="mt-2 md:mt-0 md:text-right">
                          <p className="text-sm text-gray-400">TOTAL</p>
                          {/* ✅ FIX: Added default 0 for total */}
                          <p className="text-xl font-serif text-white">₹{(order.total || 0).toFixed(2)}</p>
                        </div>
                      </div>
                      
                      {/* Order Items */}
                      <div className="p-4 space-y-4">
                        {/* ✅ FIX: Check if order.items exists before mapping */}
                        {order.items && order.items.map((item) => (
                          <div key={item.id} className="flex items-center space-x-4">
                            <img
                              // ✅ FIX: Use optional chaining in case images array is missing
                              src={item.images?.[0]} 
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                            <div className="flex-grow">
                              <p className="font-semibold text-white">{item.name}</p>
                              <p className="text-sm text-gray-400">
                                {/* ✅ FIX: Added default 1 for quantity and 0 for price */}
                                Qty: {item.quantity || 1} · ₹{(item.price || 0).toFixed(2)} each
                              </p>
                            </div>
                            <p className="font-serif text-lg">
                              {/* ✅ FIX: Used defaults for subtotal calculation */}
                              ₹{((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Shipping Details */}
                      {/* ✅ FIX: Check if order.shipping exists */}
                      {order.shipping && (
                        <div className="p-4 border-t border-white/10 text-sm text-gray-300 space-y-1">
                          {/* ✅ FIX: Use optional chaining for every property */}
                          <p><span className="font-semibold">Ship to:</span> {order.shipping?.fullName}</p>
                          <p>{order.shipping?.address},
                             {order.shipping?.city},
                             {order.shipping?.postalCode}</p>
                          <p>{order.shipping?.country}</p>
                          <p><span className="font-semibold">Payment:</span> {order.paymentMethod || 'N/A'} ({order.paymentId || 'N/A'})</p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Account Details */}
            {activeTab === "details" && (
                <div className="max-w-md mx-auto space-y-6">
                    <div className="space-y-4">
                    <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider">User ID</label>
                        <input type="text" value={user.id} disabled className="w-full bg-transparent border-b border-white/20 p-2 mt-1"/>
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider">Username</label>
                        <input type="text" value={user.username} disabled className="w-full bg-transparent border-b border-white/20 p-2 mt-1"/>
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider">Email Address</label>
                        <input type="email" value={user.useremail} disabled className="w-full bg-transparent border-b border-white/20 p-2 mt-1"/>
                    </div>
                    </div>
                    <div className="text-center pt-4">
                    <button disabled className="bg-gray-600 text-gray-400 cursor-not-allowed text-sm tracking-widest uppercase px-6 py-3">
                        Edit Details
                    </button>
                    <p className="text-xs text-gray-500 mt-2">(Editing functionality coming soon)</p>
                    </div>
                </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";
import Api from "../../../services/api";
import { toast } from "react-toastify";
import Dashboard from "../components/Dashboard";
import OrderHistory from "../components/OrderHistory";
import AccountDetails from "../components/AccountDetails";

export default function Profile() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [orders, setOrders] = useState([]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
      username: user?.username || "",
      username: user?.username || "",
      email: user?.email || "",
      profile_picture: null,
  });

  const handleEditChange = (e) => {
      setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async () => {
      try {
          const data = new FormData();
          data.append("username", editFormData.username);
          data.append("email", editFormData.email);
          if (editFormData.profile_picture instanceof File) {
            data.append("profile_picture", editFormData.profile_picture);
          }

          await Api.put(`/users/${user.id}/`, data, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          toast.success("Profile updated successfully! Refreshing...");
          setTimeout(() => window.location.reload(), 1500); 
      } catch (err) {
          console.error("Error updating profile:", err);
          
          let errorMessage = "Failed to update profile.";
          if (err.response && err.response.data) {
             const data = err.response.data;
             // Check if it's a detail string or a dict of field errors
             if (data.detail) {
                 errorMessage = data.detail;
             } else {
                 // Format field errors, e.g. "Username: This field is required."
                 errorMessage = Object.entries(data)
                    .map(([key, msg]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${Array.isArray(msg) ? msg.join(" ") : msg}`)
                    .join("\n");
             }
          }
          toast.error(errorMessage);
      }
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);


  
const handleClearOrders = async () => {
  if (!user?.id) return;

  try {
    // Fetch current user
    const response = await Api.get(`/users/${user.id}/`);
    const currentUserData = response.data;

    // Update user with empty orders array
    const updatedUserData = {
      ...currentUserData,
      orders: [],
    };

    await Api.put(`/users/${user.id}/`, updatedUserData);

    setOrders([]); // Clear orders locally
  } catch (err) {
    console.error("Error clearing orders:", err);
  }
};

const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
        await Api.patch(`/orders/${orderId}/cancel/`);
        // Refresh orders
        const res = await Api.get(`/users/${user.id}/`);
        setOrders(res.data.orders || []);
        toast.success("Order cancelled successfully.");
    } catch (err) {
        console.error("Error cancelling order:", err);
        toast.error(err.response?.data?.detail || "Failed to cancel order.");
    }
};

  useEffect(() => {
    if (user?.id) {
      Api.get(`/users/${user.id}/`) 
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
            <div className="relative w-24 h-24 mx-auto mb-4">
              <img 
                src={user.profile_picture || "https://ui-avatars.com/api/?name=" + user.username} 
                alt={user.username} 
                className="w-full h-full rounded-full object-cover border-2 border-white/20"
              />
            </div>
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
                <Dashboard 
                    cart={cart} 
                    wishlist={wishlist} 
                    handleLogout={handleLogout} 
                />
            )}


            {/* Order History Tab */}
            {activeTab === "orders" && (
                <OrderHistory 
                    orders={orders} 
                    handleClearOrders={handleClearOrders} 
                    handleCancelOrder={handleCancelOrder} 
                />
            )}

            {/* Account Details */}
            {activeTab === "details" && (
                <AccountDetails 
                    user={user}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    editFormData={editFormData}
                    handleEditChange={handleEditChange}
                    handleUpdateProfile={handleUpdateProfile}
                />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
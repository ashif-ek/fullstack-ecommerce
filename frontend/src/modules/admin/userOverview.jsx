

import { useEffect, useState } from "react";
import Api from "../../services/api";
import {
  FiUser,
  FiTrendingUp,
  FiPackage,
  FiSearch,
  FiHeart,
  FiShoppingCart,
} from "react-icons/fi";
import InlineFeedback from "../../components/InlineFeedback";

// --- Reusable Summary Card ---
const SummaryCard = ({ icon, title, value, color }) => {
  const colors = {
    blue: { bg: "bg-blue-100", text: "text-blue-600" },
    green: { bg: "bg-green-100", text: "text-green-600" },
    purple: { bg: "bg-purple-100", text: "text-purple-600" },
  };
  const selectedColor = colors[color] || colors.blue;

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200/80">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${selectedColor.bg}`}>
          <div className={selectedColor.text}>{icon}</div>
        </div>
      </div>
    </div>
  );
};

export default function UserOverview() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [feedback, setFeedback] = useState({ type: "", message: "", isVisible: false });

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setFeedback(prev => ({ ...prev, isVisible: false }));
      try {
        const res = await Api.get("/admin/users/");
        setUsers(res.data);
        setFilteredUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setFeedback({ type: "error", message: "Failed to load users", isVisible: true });
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    let result = [...users];
    if (searchTerm) {
      result = result.filter(
        (user) =>
          user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.id?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter !== "all") {
      const statusBool = statusFilter === "active";
      result = result.filter((user) => user.isBlocked !== statusBool);
    }
    setFilteredUsers(result);
  }, [searchTerm, statusFilter, users]);

  const totalUsers = users.length;
  const activeUsers = users.filter((user) => !user.isBlocked).length;
  const totalOrders = users.reduce(
    (sum, user) => sum + (user.orders?.length || 0),
    0
  );

  if (loading) {
    return (
      <div className="p-8 bg-gray-50/70 min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50/70 min-h-screen font-sans">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-sm text-gray-500 mt-1">
          Monitor, search, and manage all registered users.
        </p>
      </div>
      
      {/* Feedback */}
      <div className="mb-4">
        <InlineFeedback 
            {...feedback} 
            onClose={() => setFeedback(prev => ({ ...prev, isVisible: false }))} 
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <SummaryCard
          icon={<FiUser size={22} />}
          title="Total Users"
          value={totalUsers}
          color="blue"
        />
        <SummaryCard
          icon={<FiTrendingUp size={22} />}
          title="Active Users"
          value={activeUsers}
          color="green"
        />
        <SummaryCard
          icon={<FiPackage size={22} className="text-purple-600" />}
          title="Total Orders"
          value={totalOrders}
          color="purple"
        />
      </div>

      {/* Toolbar & User Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200/80">
        {/* Toolbar */}
        <div className="p-4 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-200">
          <div className="relative w-full md:flex-grow">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FiSearch />
            </div>
            <input
              type="text"
              placeholder="Search by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-auto px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition appearance-none bg-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          {filteredUsers.length === 0 ? (
            <div className="text-center p-12">
              <FiUser size={60} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No Users Found
              </h3>
              <p className="text-gray-500">
                {users.length === 0
                  ? "No users have registered yet."
                  : "Your search or filter criteria returned no results."}
              </p>
            </div>
          ) : (
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50/50">
                <tr>
                  <th className="p-4">User</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Activity</th>
                  <th className="p-4">Joined On</th>
                  <th className="p-4">User ID</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="bg-white border-b last:border-b-0 hover:bg-gray-50/70 transition"
                  >
                    <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold flex-shrink-0">
                          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div>
                          <div className="font-semibold">
                            {user.name || "N/A"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                          user.isBlocked
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center" title="Orders">
                          <FiPackage className="text-gray-400 mr-1.5" />
                          <span className="font-medium text-gray-700">
                            {user.orders?.length || 0}
                          </span>
                        </div>
                        <div className="flex items-center" title="Wishlist">
                          <FiHeart className="text-gray-400 mr-1.5" />
                          <span className="font-medium text-gray-700">
                            {user.wishlist?.length || 0}
                          </span>
                        </div>
                        <div className="flex items-center" title="Cart">
                          <FiShoppingCart className="text-gray-400 mr-1.5" />
                          <span className="font-medium text-gray-700">
                            {user.cart?.length || 0}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-500">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "N/A"}
                    </td>
                    <td className="p-4 font-mono text-xs text-gray-400">
                      {user.id}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

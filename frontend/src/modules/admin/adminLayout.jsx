

import { Link, Outlet, useLocation } from "react-router-dom";
import { FiHome, FiBox, FiUsers, FiLogOut, FiSettings, FiPieChart, FiChevronRight } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function AdminLayout() {
  const location = useLocation();
  const { logout, user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: <FiHome className="text-lg" /> },
    { name: "Products", path: "/admin/products", icon: <FiBox className="text-lg" /> },
    { name: "User manage", path: "/admin/users", icon: <FiUsers className="text-lg" /> },
    { name: "user overview", path: "/admin/overview", icon: <FiPieChart className="text-lg" /> },
    // { name: "Settings", path: "/admin/settings", icon: <FiSettings className="text-lg" /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside 
        className={`bg-white border-r border-gray-200 flex flex-col justify-between transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div>
          {/* Logo/Brand Area */}
          <div className="p-5 border-b border-gray-200 flex items-center justify-between">
            <h2 className={`text-xl font-semibold text-gray-800 transition-opacity ${sidebarCollapsed ? "opacity-0 w-0" : "opacity-100"}`}>
              Admin Portal
            </h2>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <FiChevronRight className={`transition-transform ${sidebarCollapsed ? "rotate-180" : ""}`} />
            </button>
          </div>


          <nav className="mt-6 px-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors group ${
                  location.pathname === item.path
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                }`}
              >
                <span className={`flex-shrink-0 ${location.pathname === item.path ? "text-blue-600" : "text-gray-500 group-hover:text-gray-700"}`}>
                  {item.icon}
                </span>
                <span className={`transition-opacity ${sidebarCollapsed ? "opacity-0 w-0" : "opacity-100"}`}>
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* User Section & Logout */}
        <div className="p-4 border-t border-gray-200">
          <div className={`flex items-center gap-3 mb-4 ${sidebarCollapsed ? "justify-center" : ""}`}>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
              {user?.name?.charAt(0) || "A"}
            </div>
            <div className={`transition-opacity ${sidebarCollapsed ? "opacity-0 w-0" : "opacity-100"}`}>
              <p className="text-sm font-medium text-gray-800 truncate">{user?.name || "Admin User"}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email || "admin@example.com"}</p>
            </div>
          </div>
          
          <button
            onClick={logout}
            className={`flex items-center gap-3 w-full px-3 py-2.5 text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-800 transition-colors ${
              sidebarCollapsed ? "justify-center" : ""
            }`}
          >
            <FiLogOut className="text-lg text-gray-500" />
            <span className={`transition-opacity ${sidebarCollapsed ? "opacity-0 w-0" : "opacity-100"}`}>
              Logout
            </span>
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              {navItems.find(item => item.path === location.pathname)?.name || "Dashboard"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">Welcome back, {user?.name?.split(' ')[0] || "Admin"}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-md hover:bg-gray-100 text-gray-500">
              <FiSettings className="text-lg" />
            </button>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
              {user?.name?.charAt(0) || "A"}
            </div>
          </div>
        </header>
        

        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}


























































// import { Link, Outlet, useLocation } from "react-router-dom";
// import { FiHome, FiBox, FiUsers, FiLogOut } from "react-icons/fi";
// import { useAuth } from "../../context/AuthContext";


// export default function AdminLayout() {
//   const location = useLocation();
//     const { logout } = useAuth();
  

//   const navItems = [
//     { name: "Home", path: "/admin", icon: <FiHome /> },
//     { name: "Products", path: "/admin/products", icon: <FiBox /> },
//     { name: "Users", path: "/admin/users", icon: <FiUsers /> },
//        { name: "Users overview", path: "/admin/overview", icon: <FiUsers /> },
//   ];



  

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white border-r shadow-sm flex flex-col justify-between">
//         <div>
//           <div className="p-6 border-b">
//             <h2 className="text-2xl font-bold text-gray-800">Admin</h2>
//           </div>

//           <nav className="mt-4 space-y-1">
//             {navItems.map((item) => (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg transition-colors ${
//                   location.pathname === item.path
//                     ? "bg-blue-50 text-blue-600 font-medium"
//                     : "hover:bg-gray-100"
//                 }`}
//               >
//                 {item.icon}
//                 <span>{item.name}</span>
//               </Link>
//             ))}
//           </nav>
//         </div>

//         {/* Logout Button */}
//         <button
//           onClick={logout}
//           className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg mb-4 ml-4 hover:bg-red-100 hover:text-red-600 transition-colors"
//         >
//           <FiLogOut />
//           <span>Logout</span>
//         </button>
//       </aside>

//       {/* Main content */}
//       <main className="flex-1 p-8">
//         <Outlet />
//       </main>
//     </div>
//   );
// }

import React, { Suspense, lazy } from "react";
import "./App.css";

// --- LAZY-LOADED PAGES ---
// Auth
const Login = lazy(() => import("./auth/login"));
const Register = lazy(() => import("./auth/register"));

// User Pages
import Home from "./modules/user/pages/home";
const Carts = lazy(() => import("./modules/user/pages/carts"));
const Products = lazy(() => import("./modules/user/pages/products"));
const Orders = lazy(() => import("./modules/user/pages/orders"));
const Whishlist = lazy(() => import("./modules/user/pages/whishlist"));
const Profile = lazy(() => import("./modules/user/pages/profile"));
const Search = lazy(() => import("./modules/user/pages/search"));
const Checkout = lazy(() => import("./modules/user/pages/checkout"));
const NotFound = lazy(() => import("./modules/user/pages/notfound"));
const OurStory = lazy(() => import("./modules/user/pages/ourStory"));
const ProductDetail = lazy(() => import("./modules/user/pages/ProductDetail"));
const Contact = lazy(() => import("./modules/user/pages/Contact"));
const ShippingReturns = lazy(() => import("./modules/user/pages/ShippingReturns"));
const FAQ = lazy(() => import("./modules/user/pages/FAQ"));
const PrivacyPolicy = lazy(() => import("./modules/user/pages/PrivacyPolicy"));
const Terms = lazy(() => import("./modules/user/pages/Terms"));
const CareGuide = lazy(() => import("./modules/user/pages/CareGuide"));
const Accessibility = lazy(() => import("./modules/user/pages/Accessibility"));
const StoreLocator = lazy(() => import("./modules/user/pages/StoreLocator"));

// Admin Pages
const AdminProducts = lazy(() => import("./modules/admin/admin-products"));
const AdminOrders = lazy(() => import("./modules/admin/admin-orders"));
const AdminUsers = lazy(() => import("./modules/admin/admin-user"));
const UserDetails = lazy(() => import("./modules/admin/user-details"));
const AdminDashboard = lazy(() => import("./modules/admin/dashboard"));
const UserOverview = lazy(() => import("./modules/admin/userOverview"));

// --- CORE IMPORTS ---
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import { OrderProvider } from "./context/OrderContext";
import { SearchProvider } from "./context/SearchContext";

// Route Components
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./modules/admin/adminLayout";
import PublicRoute from "./components/PublicRoute";
import ShimmerLoader from "./components/ShimmerLoader";
import ErrorBoundary from "./components/ErrorBoundary";

/**
 * A simple full-page loading fallback component.
 */
function LoadingFallback() {
  return <ShimmerLoader/>
}

function AppWithProviders() {
  return (
    <>
      <CartProvider>
        <WishlistProvider>
          <OrderProvider>
            <SearchProvider>
                <ErrorBoundary>
                  <Suspense fallback={<LoadingFallback />}>
                    <Routes>
                      {/* Public routes */}
                      <Route element={<PublicRoute />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/products/:id" element={<ProductDetail />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/ourstory" element={<OurStory />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/shipping-returns" element={<ShippingReturns />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/care-guide" element={<CareGuide />} />
                        <Route path="/accessibility" element={<Accessibility />} />
                        <Route path="/store-locator" element={<StoreLocator />} />
                      </Route>

                      {/* Protected user routes */}
                      <Route element={<ProtectedRoute />}>
                        <Route path="/carts" element={<Carts />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/whishlist" element={<Whishlist />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/checkout" element={<Checkout />} />
                      </Route>

                      {/* Protected admin routes */}
                      <Route path="/admin" element={<AdminRoute />}>
                        <Route element={<AdminLayout />}>
                          <Route index element={<AdminDashboard />} />
                          <Route path="overview" element={<UserOverview />} />
                          <Route path="products" element={<AdminProducts />} />
                          <Route path="orders" element={<AdminOrders />} />
                          <Route path="users" element={<AdminUsers />} />
                          <Route path="users/:id" element={<UserDetails />} />
                        </Route>
                      </Route>

                      {/* Catch-all Not Found route */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </ErrorBoundary>
            </SearchProvider>
          </OrderProvider>
        </WishlistProvider>
      </CartProvider>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppWithProviders />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;


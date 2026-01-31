import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useCart } from "../../../context/CartContext";
import { useOrders } from "../../../context/OrderContext";
import { useAuth } from "../../../context/AuthContext";

import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import Api from "../../../services/api";

/* =========================
   UI HELPERS
========================= */

const FormSection = ({ title, children }) => (
  <section className="bg-gray-900/50 border border-white/10 rounded-lg p-6 md:p-8">
    <h3 className="text-xl font-medium tracking-wide border-b border-white/10 pb-4 mb-6">
      {title}
    </h3>
    {children}
  </section>
);

const InputField = ({ label, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm text-gray-400 mb-2">{label}</label>
    <input
      {...props}
      className="w-full bg-gray-800 border border-white/20 rounded-md px-4 py-2
                 focus:outline-none focus:ring-1 focus:ring-white/50"
    />
  </div>
);

/* =========================
   MAIN
========================= */

export default function Checkout() {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const { createOrder, isProcessing } = useOrders();

  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item?.price || 0) * Number(item?.quantity || 0),
    0
  );

  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    if (user?.username) {
      setShippingDetails((p) => ({
        ...p,
        fullName: user.username,
      }));
    }
  }, [user]);

  if (!cart || cart.length === 0) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isProcessing) return;

    const { fullName, address, city, postalCode, country } = shippingDetails;
    if (!fullName || !address || !city || !postalCode || !country) {
      toast.warn("Please fill all fields");
      return;
    }

    try {
      /* 1️⃣ CREATE ORDER */
      const order = await createOrder(shippingDetails, total);

      /* 2️⃣ CREATE RAZORPAY ORDER */
      const { data } = await Api.post(
        `/payments/razorpay/${order.id}/`
      );

      /* 3️⃣ OPEN RAZORPAY */
      openRazorpay(data, clearCart);
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Payment initialization failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-black text-white font-light">
        <div className="max-w-7xl mx-auto py-20 px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl mb-4 tracking-wider">
              Checkout
            </h1>
            <div className="w-20 h-px bg-white/40 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* FORM */}
            <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-8">
              <FormSection title="Shipping Address">
                <InputField name="fullName" label="Full Name" value={shippingDetails.fullName} onChange={handleChange} />
                <InputField name="address" label="Address" value={shippingDetails.address} onChange={handleChange} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField name="city" label="City" value={shippingDetails.city} onChange={handleChange} />
                  <InputField name="postalCode" label="Postal Code" value={shippingDetails.postalCode} onChange={handleChange} />
                </div>
                <InputField name="country" label="Country" value={shippingDetails.country} onChange={handleChange} />
              </FormSection>

              <button
                disabled={isProcessing}
                type="submit"
                className="w-full bg-white text-black tracking-widest uppercase
                           px-6 py-4 hover:bg-gray-200 transition rounded-md disabled:opacity-60"
              >
                {isProcessing ? "Processing..." : "Proceed to Payment"}
              </button>
            </form>

            {/* SUMMARY */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900/50 border border-white/10 rounded-lg p-6 sticky top-28">
                <h2 className="text-2xl mb-6 tracking-wide border-b border-white/10 pb-4">
                  Order Summary
                </h2>

                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between mb-3 text-sm">
                    <span>{item.name} × {item.quantity}</span>
                    <span>${(Number(item.price) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}

                <div className="border-t border-white/10 mt-6 pt-6 flex justify-between text-xl">
                  <span>Total</span>
                  <span className="font-serif">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

/* =========================
   RAZORPAY SAFE OPEN
========================= */

function openRazorpay(data, clearCart) {
  if (!window.Razorpay) {
    toast.error("Payment system not loaded");
    return;
  }

  const options = {
    key: data.key,
    amount: data.amount,
    currency: data.currency,
    order_id: data.razorpay_order_id,
    name: "Noirél",
    description: "Luxury Perfumes",
    handler: () => {
      toast.success("Payment successful");
      clearCart();
    },
    modal: {
      ondismiss: () => {
        toast.info("Payment cancelled");
      },
    },
    theme: { color: "#000000" },
  };

  new window.Razorpay(options).open();
}

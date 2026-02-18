import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// Removed toast import

import { useCart } from "../../../context/CartContext";
import { useOrders } from "../../../context/OrderContext";
import { useAuth } from "../../../context/AuthContext";

import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import Api from "../../../services/api";
import InlineFeedback from "../../../components/InlineFeedback"; // Import InlineFeedback

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
  const navigate = useNavigate();

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

  // Feedback State
  const [formFeedback, setFormFeedback] = useState({ type: "", message: "", isVisible: false });

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
    setFormFeedback({ isVisible: false, message: "", type: "" }); // Reset feedback

    if (isProcessing) return;

    const { fullName, address, city, postalCode, country } = shippingDetails;
    if (!fullName || !address || !city || !postalCode || !country) {
      setFormFeedback({ type: "error", message: "Please fill all fields", isVisible: true });
      return;
    }

    try {
      /* 1️ CREATE ORDER */
      const order = await createOrder(shippingDetails, total);

      /* 2️ CREATE RAZORPAY ORDER */
      const { data } = await Api.post(
        `/payments/razorpay/${order.id}/`
      );

      /* 3️ OPEN RAZORPAY */
      const handleSuccess = async () => {
        try {
           await Api.post('/payments/verify/', { order_id: order.id });
           clearCart();
           // Redirect is enough, but could show success briefly if redirection wasn't immediate
           navigate("/profile");
        } catch (err) {
           console.error(err);
           setFormFeedback({ type: "error", message: "Payment verification failed. Please contact support.", isVisible: true });
        }
      };

      // Wrap openRazorpay with error handling for the cancel callback if desired
      openRazorpay(data, handleSuccess, (msg) => {
          setFormFeedback({ type: "info", message: msg || "Payment cancelled", isVisible: true });
      });
    } catch (err) {
      console.error("Checkout error:", err);
      setFormFeedback({ type: "error", message: "Payment initialization failed. Please try again.", isVisible: true });
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

              <div>
                <button
                    disabled={isProcessing}
                    type="submit"
                    className="w-full bg-white text-black tracking-widest uppercase
                            px-6 py-4 hover:bg-gray-200 transition rounded-md disabled:opacity-60"
                >
                    {isProcessing ? "Processing..." : "Proceed to Payment"}
                </button>
                <InlineFeedback 
                    {...formFeedback} 
                    onClose={() => setFormFeedback(p => ({ ...p, isVisible: false }))} 
                />
              </div>
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

function openRazorpay(data, onSuccess, onDismiss) {
  if (!window.Razorpay) {
    if (onDismiss) onDismiss("Payment system not loaded");
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
      onSuccess();
    },
    modal: {
      ondismiss: () => {
        if (onDismiss) onDismiss("Payment cancelled");
      },
    },
    theme: { color: "#000000" },
  };

  new window.Razorpay(options).open();
}

import { useState, useEffect } from "react";
import { useCart } from "../../../context/CartContext";
import { useOrders } from "../../../context/OrderContext";
import { useAuth } from "../../../context/AuthContext";
import { Navigate } from "react-router-dom";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer"
import { toast } from "react-toastify";

const FormSection = ({ title, children }) => (
  <section className="bg-gray-900/50 border border-white/10 rounded-lg p-6 md:p-8">
    <h3 className="text-xl font-medium tracking-wide border-b border-white/10 pb-4 mb-6">
      {title}
    </h3>
    {children}
  </section>
);

export default function Checkout() {
  const { user } = useAuth();
  const { cart } = useCart();
  const { placeOrder } = useOrders();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "credit_card",
  });
  
  useEffect(() => {
    if (user) {
        setShippingDetails(prev => ({ ...prev, fullName: user.name || "" }));
    }
  }, [user]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, address, city, postalCode, country } = shippingDetails;
    if (!fullName || !address || !city || !postalCode || !country) {
      toast.warn("Please fill all fields.");
      return;
    }
    await placeOrder(shippingDetails, total);
  };

  if (cart.length === 0) {
    return <Navigate to="/" replace/>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white font-light">
        <div className="max-w-7xl mx-auto py-20 px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl mb-4 tracking-wider">Checkout</h1>
            <div className="w-20 h-px bg-white/40 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            
            <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-8">
              <FormSection title="Shipping Address">
                <div className="space-y-6">
                  <InputField label="Full Name" name="fullName" value={shippingDetails.fullName} onChange={handleInputChange} placeholder="full name"/>
                  <InputField label="Address" name="address" value={shippingDetails.address} onChange={handleInputChange} placeholder="123 Perfume Lane"/>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="City" name="city" value={shippingDetails.city} onChange={handleInputChange} placeholder="Scent City" />
                    <InputField label="Postal Code" name="postalCode" value={shippingDetails.postalCode} onChange={handleInputChange} placeholder="12345" />
                  </div>
                  <InputField label="Country" name="country" value={shippingDetails.country} onChange={handleInputChange} placeholder="Fragrance Land"/>
                </div>
              </FormSection>

              <FormSection title="Payment Method">
                <div className="space-y-4">
                  <RadioOption label="Credit Card / UPI / and more" name="paymentMethod" value="credit_card" checked={shippingDetails.paymentMethod === 'credit_card'} onChange={handleInputChange} />
                  {/* You can add more payment methods here if needed, but Razorpay handles many */}
                </div>
              </FormSection>
              
              <button
                type="submit"
                className="w-full bg-white text-black text-sm tracking-widest uppercase px-6 py-4 hover:bg-gray-200 transition-colors duration-300 rounded-md"
              >
                Proceed to Payment
              </button>
            </form>

            <div className="lg:col-span-2">
              <div className="bg-gray-900/50 border border-white/10 rounded-lg p-6 sticky top-28">
                <h2 className="text-2xl mb-6 tracking-wide border-b border-white/10 pb-4">
                  Order Summary
                </h2>
                <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <div className="flex-1 pr-4">
                        <p className="tracking-wide truncate">{item.name}</p>
                        <p className="text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-serif">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 mt-6 pt-6 space-y-2">
                  <div className="flex justify-between text-gray-300">
                    <p>Subtotal</p>
                    <p className="font-serif">${total.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-gray-400 text-sm">
                    <p>Shipping</p>
                    <p>Free</p>
                  </div>
                  <div className="flex justify-between text-2xl mt-4 pt-4 border-t border-white/10">
                    <p>Total</p>
                    <p className="font-serif">${total.toFixed(2)}</p>
                  </div>
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

// Helper components for cleaner JSX
const InputField = ({ label, ...props }) => (
  <div>
    <label htmlFor={props.name} className="block text-sm text-gray-400 mb-2">{label}</label>
    <input id={props.name} {...props} className="w-full bg-gray-800 border border-white/20 rounded-md px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-white/50" />
  </div>
);

const RadioOption = ({ label, ...props }) => (
    <label className="flex items-center p-4 border border-white/20 rounded-md cursor-pointer hover:bg-white/5 has-[:checked]:bg-white/10 has-[:checked]:border-white/50 transition-colors">
        <input type="radio" {...props} className="form-radio h-4 w-4 text-white bg-gray-700 border-gray-500 focus:ring-white/50" />
        <span className="ml-4 text-sm">{label}</span>
    </label>
);


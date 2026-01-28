import { createContext, useContext, useEffect, useReducer, useCallback, useMemo } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext";
import Api from "../auth/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// A reliable fallback rate in case the API fails
const STATIC_FALLBACK_RATE = 83.5;
const CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

const OrderContext = createContext();

const initialState = {
  exchangeRate: null,
  isProcessing: false,
  error: null,
};

const orderReducer = (state, action) => {
  switch (action.type) {
    case "SET_EXCHANGE_RATE":
      return { ...state, exchangeRate: action.payload };
    case "START_ORDER":
      return { ...state, isProcessing: true, error: null };
    case "ORDER_SUCCESS":
      return { ...state, isProcessing: false, error: null };
    case "ORDER_FAILURE":
      return { ...state, isProcessing: false, error: action.payload };
    default:
      return state;
  }
};

export function OrderProvider({ children }) {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(orderReducer, initialState);

  // --- Fetch and cache the exchange rate on component mount ---
  useEffect(() => {
    const fetchAndSetRate = async () => {
      try {
        const cachedRateDataString = localStorage.getItem("usdToInrRate");
        const cachedRateData = cachedRateDataString ? JSON.parse(cachedRateDataString) : null;
        const now = new Date().getTime();

        if (cachedRateData && now - cachedRateData.timestamp < CACHE_DURATION) {
          dispatch({ type: "SET_EXCHANGE_RATE", payload: cachedRateData.rate });
          return; 
        }

        const response = await axios.get(
          "https://api.frankfurter.app/latest?from=USD&to=INR"
        );
        const liveRate = response.data.rates.INR;

        dispatch({ type: "SET_EXCHANGE_RATE", payload: liveRate });
        localStorage.setItem(
          "usdToInrRate",
          JSON.stringify({ rate: liveRate, timestamp: now })
        );
      } catch (error) {
        console.error("Failed to fetch live exchange rate. Using fallback.", error);
        toast.warn("Could not fetch live exchange rate. Using a fallback rate.");
        dispatch({ type: "SET_EXCHANGE_RATE", payload: STATIC_FALLBACK_RATE });
      }
    };

    fetchAndSetRate();
  }, []);

  const loadRazorpayScript = useCallback(() => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }, []);

  const createOrder = useCallback(async (shippingDetails, orderTotals, paymentId) => {
    const newOrder = {
      items: [...cart],
      totalUsd: parseFloat(orderTotals.totalUsd.toFixed(2)),
      totalInr: parseFloat(orderTotals.totalInr.toFixed(2)),
      exchangeRateUsed: state.exchangeRate,
      shipping: shippingDetails,
      paymentMethod: shippingDetails.paymentMethod,
      paymentId: paymentId,
      date: new Date().toISOString(),
    };

    try {
      const response = await Api.get(`/users/${user.id}`);
      const currentUserData = response.data;

      const updatedUserData = {
        ...currentUserData,
        orders: [...currentUserData.orders, newOrder],
        cart: [],
      };

      await Api.put(`/users/${user.id}`, updatedUserData);
      clearCart();
      dispatch({ type: "ORDER_SUCCESS" });
      toast.success("Order placed successfully!");
      navigate("/order-success");
    } catch (err) {
      console.error("Failed to place order:", err);
      dispatch({ type: "ORDER_FAILURE", payload: err.message });
      toast.error(
        "There was an issue placing your order. Please try again."
      );
    }
  }, [cart, user, state.exchangeRate, clearCart, navigate]);

  const placeOrder = useCallback(async (shippingDetails, totalUsd) => {
    if (!user || cart.length === 0) {
      toast.error(
        "You must be logged in or have items in your cart to place an order."
      );
      return;
    }

    if (!state.exchangeRate) {
      toast.error(
        "Exchange rate is not available yet. Please wait a moment and try again."
      );
      return;
    }

    dispatch({ type: "START_ORDER" });

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      toast.error("Could not load payment gateway. Please try again later.");
      dispatch({ type: "ORDER_FAILURE", payload: "Razorpay script failed to load" });
      return;
    }

    const totalInr = totalUsd * state.exchangeRate;

    const options = {
      key: "rzp_test_edrzdb8Gbx5U5M",
      amount: Math.round(totalInr * 100),
      currency: "INR",
      name: "NOIRÉL",
      description: "Order Payment",
      image: "perfume1.png",
      handler: async function (response) {
        const paymentId = response.razorpay_payment_id;
        await createOrder(shippingDetails, { totalUsd, totalInr }, paymentId);
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: "9999999999",
      },
      notes: {
        address: `${shippingDetails.address}, ${shippingDetails.city}`,
      },
      theme: {
        color: "#000000",
      },
      modal: {
        ondismiss: function() {
            dispatch({ type: "ORDER_FAILURE", payload: "Payment cancelled" });
        }
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", function (response) {
      toast.error("Payment failed. Please try again.");
      console.error("Payment Failed:", response.error);
      dispatch({ type: "ORDER_FAILURE", payload: response.error.description });
    });
    paymentObject.open();
  }, [user, cart, state.exchangeRate, createOrder, loadRazorpayScript]);

  const value = useMemo(() => ({
    placeOrder,
    isProcessing: state.isProcessing,
    error: state.error
  }), [placeOrder, state.isProcessing, state.error]);

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useOrders = () => useContext(OrderContext);
import { createContext, useContext, useReducer, useCallback, useMemo } from "react";
import { useAuth } from "./AuthContext";
import Api from "../services/api";
import { toast } from "react-toastify";

const OrderContext = createContext(null);

const initialState = {
  isProcessing: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "START":
      return { isProcessing: true, error: null };
    case "SUCCESS":
      return { isProcessing: false, error: null };
    case "FAIL":
      return { isProcessing: false, error: action.payload };
    default:
      return state;
  }
}

export function OrderProvider({ children }) {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);

  const createOrder = useCallback(
    async (shippingDetails, totalAmount) => {
      if (!user) throw new Error("Not authenticated");

      dispatch({ type: "START" });

      try {
        const res = await Api.post("/orders/", {
          shipping_address: `
${shippingDetails.fullName}
${shippingDetails.address}
${shippingDetails.city} - ${shippingDetails.postalCode}
${shippingDetails.country}`.trim(),
          total_amount: totalAmount,
        });

        if (!res?.data?.id) {
          throw new Error("Order ID missing");
        }

        dispatch({ type: "SUCCESS" });
        return res.data;
      } catch (err) {
        dispatch({ type: "FAIL", payload: err.message });
        toast.error("Order creation failed");
        throw err;
      }
    },
    [user]
  );

  const value = useMemo(
    () => ({
      createOrder,
      isProcessing: state.isProcessing,
      error: state.error,
    }),
    [createOrder, state]
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be inside OrderProvider");
  return ctx;
};

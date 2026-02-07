import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
} from "react";
import { useAuth } from "./AuthContext";
import Api from "../services/api";
import { toast } from "react-toastify";

const CartContext = createContext();

const initialState = {
  cart: [],
  isLoading: true,
  error: null,
};

/**
 * Backend item:
 * { id, quantity, product: { id, name, price, images } }
 */
function normalizeCart(items = []) {
  return items.map((item) => ({
    cartItemId: item.id,
    quantity: item.quantity,
    ...item.product,
  }));
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return { ...state, cart: action.payload, isLoading: false };
    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(cartReducer, initialState);

  /* =========================
     FETCH CART
  ========================== */
  useEffect(() => {
    if (!user) {
      dispatch({ type: "SET_CART", payload: [] });
      return;
    }

    Api.get("/cart/")
      .then((res) => {
        dispatch({
          type: "SET_CART",
          payload: normalizeCart(res.data.items || []),
        });
      })
      .catch((err) => {
        console.error("Cart fetch error:", err);
        dispatch({ type: "SET_ERROR", payload: err.message });
      });
  }, [user]);

  /* =========================
     ADD TO CART  ✅ RESTORED
  ========================== */
  const addToCart = useCallback(async (productId, quantity = 1) => {
    try {
      await Api.post("/cart/add/", {
        product_id: productId,
        quantity,
      });

      const res = await Api.get("/cart/");
      dispatch({
        type: "SET_CART",
        payload: normalizeCart(res.data.items || []),
      });

      toast.success("Added to cart");
    } catch (err) {
      console.error("Add to cart error:", err);
      toast.error("Failed to add to cart");
    }
  }, []);

  /* =========================
     UPDATE QUANTITY (+ / -)
  ========================== */
  const updateQuantity = useCallback(async (productId, delta) => {
    try {
      if (delta > 0) {
        await Api.post("/cart/add/", {
          product_id: productId,
          quantity: delta,
        });
      } else {
        await Api.post("/cart/remove/", {
          product_id: productId,
          quantity: Math.abs(delta),
        });
      }

      const res = await Api.get("/cart/");
      dispatch({
        type: "SET_CART",
        payload: normalizeCart(res.data.items || []),
      });
    } catch (err) {
      console.error("Update quantity error:", err);
      toast.error("Failed to update quantity");
    }
  }, []);

  /* =========================
     REMOVE ITEM
  ========================== */
  const removeFromCart = useCallback(async (productId) => {
    try {
      await Api.post("/cart/remove/", {
        product_id: productId,
        quantity: 9999,
      });

      const res = await Api.get("/cart/");
      dispatch({
        type: "SET_CART",
        payload: normalizeCart(res.data.items || []),
      });
    } catch (err) {
      console.error("Remove item error:", err);
      toast.error("Failed to remove item");
    }
  }, []);

  /* =========================
     CLEAR CART
  ========================== */
  const clearCart = useCallback(async () => {
    try {
      dispatch({ type: "CLEAR_CART" });
    } catch (err) {
      console.error("Clear cart error:", err);
      toast.error("Failed to clear cart");
    }
  }, []);

  const value = useMemo(
    () => ({
      cart: state.cart,
      isLoading: state.isLoading,
      addToCart,          //  REQUIRED FOR WISHLIST
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [
      state.cart,
      state.isLoading,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

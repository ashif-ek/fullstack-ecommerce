import { createContext, useContext, useEffect, useReducer, useCallback, useMemo } from "react";
import { useAuth } from "./AuthContext";
import Api from "../auth/api";
import { toast } from "react-toastify";

const CartContext = createContext();

const initialState = {
  cart: [],
  isLoading: false,
  error: null,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return { ...state, cart: action.payload, isLoading: false, error: null };
    case "ADD_ITEM": {
      const existingItemIndex = state.cart.findIndex(item => item.id === action.payload.id);
      let newCart;
      if (existingItemIndex > -1) {
        newCart = [...state.cart];
        newCart[existingItemIndex] = {
            ...newCart[existingItemIndex],
            quantity: newCart[existingItemIndex].quantity + 1
        };
      } else {
        newCart = [...state.cart, { ...action.payload, quantity: 1 }];
      }
      return { ...state, cart: newCart };
    }
    case "REMOVE_ITEM":
      return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, item.quantity + action.payload.amount) }
            : item
        ),
      };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "ROLLBACK_CART":
       return { ...state, cart: action.payload, error: "Action failed. Rolled back." };
    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Initial Fetch
  useEffect(() => {
    let isMounted = true;
    if (user?.id) {
      Api.get(`/users/${user.id}`)
        .then((res) => {
           if(isMounted) dispatch({ type: "SET_CART", payload: res.data.cart || [] });
        })
        .catch((err) => {
           console.error("Error fetching cart:", err);
           if(isMounted) dispatch({ type: "SET_ERROR", payload: err.message });
        });
    } else {
      if(isMounted) dispatch({ type: "SET_CART", payload: [] });
    }
    return () => { isMounted = false; };
  }, [user]);

  // Helper to sync with backend
  const syncCartInfo = useCallback(async (newCart) => {
    if (!user?.id) return;
    try {
      await Api.patch(`/users/${user.id}`, { cart: newCart });
    } catch (err) {
      // If sync fails, the caller of this function might ideally handle rollback,
      // but simplistic rollback can also happen here if we tracked previous state globally or in caller.
      // For this implementation, we will trust the caller to handle complex rollbacks or
      // simple re-fetch on error, or just show toast.
      console.error("Sync error:", err);
      toast.error("Failed to save cart to server");
      // Optional: Refetch to ensure consistency
       // Api.get(`/users/${user.id}`).then(res => dispatch({ type: 'SET_CART', payload: res.data.cart || [] }));
    }
  }, [user]);


  const addToCart = useCallback((product) => {
    if (!user) {
      toast.warn("Please login first!");
      return;
    }
    // Snapshot current state for rollback
    const previousCart = state.cart;
    
    // Optimistic Update
    dispatch({ type: "ADD_ITEM", payload: product });

    // We need to calculate what the *new* cart looks like to sync it.
    // Since state update is async/batched in React, we can't read `state.cart` immediately after dispatch for the sync call.
    // We recreate the logic here solely for the API payload.
    const itemIndex = previousCart.findIndex((item) => item.id === product.id);
    let updatedCart = [...previousCart];
    if (itemIndex >= 0) {
      updatedCart[itemIndex] = { ...updatedCart[itemIndex], quantity: updatedCart[itemIndex].quantity + 1 };
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    syncCartInfo(updatedCart).catch(() => {
        dispatch({ type: "ROLLBACK_CART", payload: previousCart });
    });

  }, [state.cart, user, syncCartInfo]);

  const removeFromCart = useCallback((productId) => {
      const previousCart = state.cart;
      dispatch({ type: "REMOVE_ITEM", payload: productId });
      
      const updatedCart = previousCart.filter((item) => item.id !== productId);
      syncCartInfo(updatedCart).catch(() => {
          dispatch({ type: "ROLLBACK_CART", payload: previousCart });
      });
  }, [state.cart, syncCartInfo]);

  const updateQuantity = useCallback((productId, amount) => {
    const previousCart = state.cart;
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: productId, amount } });

    const updatedCart = previousCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      );
    
    syncCartInfo(updatedCart).catch(() => {
         dispatch({ type: "ROLLBACK_CART", payload: previousCart });
    });
  }, [state.cart, syncCartInfo]);

  const clearCart = useCallback(() => {
    const previousCart = state.cart;
    dispatch({ type: "CLEAR_CART" });
    syncCartInfo([]).catch(() => {
        dispatch({ type: "ROLLBACK_CART", payload: previousCart });
    });
  }, [state.cart, syncCartInfo]);

  const value = useMemo(() => ({
    cart: state.cart,
    isLoading: state.isLoading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  }), [state.cart, state.isLoading, addToCart, updateQuantity, removeFromCart, clearCart]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);



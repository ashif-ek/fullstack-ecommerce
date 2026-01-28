import { createContext, useContext, useEffect, useReducer, useCallback, useMemo } from "react";
import Api from "../auth/api";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const WishlistContext = createContext();

const initialState = {
  wishlist: [],
  isLoading: false,
  error: null,
};

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case "SET_WISHLIST":
      return { ...state, wishlist: action.payload, isLoading: false, error: null };
    case "ADD_TO_WISHLIST":
      // Avoid duplicates check here to keep reducer pure, but can also be safe
      if (state.wishlist.some(item => item.id === action.payload.id)) return state;
      return { ...state, wishlist: [...state.wishlist, action.payload] };
    case "REMOVE_FROM_WISHLIST":
      return { ...state, wishlist: state.wishlist.filter(item => item.id !== action.payload) };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "ROLLBACK_WISHLIST":
      return { ...state, wishlist: action.payload, error: "Action failed. Rolled back." };
    default:
      return state;
  }
};

export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);
  const { user } = useAuth();

  // Fetch wishlist when user changes (login, logout, refresh)
  useEffect(() => {
    let isMounted = true;
    if (user?.id) {
      Api.get(`/users/${user.id}`)
        .then((res) => {
          if (isMounted) dispatch({ type: "SET_WISHLIST", payload: res.data.wishlist || [] });
        })
        .catch((err) => {
          console.error("Error fetching wishlist", err);
          if (isMounted) dispatch({ type: "SET_ERROR", payload: err.message });
        });
    } else {
      if (isMounted) dispatch({ type: "SET_WISHLIST", payload: [] });
    }
    return () => { isMounted = false; };
  }, [user]);

  // Sync wishlist with backend
  const syncWishlist = useCallback(async (updatedWishlist) => {
    if (!user?.id) return;
    try {
      await Api.patch(`/users/${user.id}`, { wishlist: updatedWishlist });
    } catch (err) {
      console.error("Error syncing wishlist", err);
      toast.error("Failed to sync wishlist");
      throw err; // Re-throw to trigger rollback
    }
  }, [user]);

  const addToWishlist = useCallback((product) => {
    if (!user) {
      toast.warn("Please login to add to your wishlist.");
      return;
    }
    
    // Check if already in wishlist to avoid unnecessary dispatch/api call
    const exists = state.wishlist.some((item) => item.id === product.id);
    if (exists) {
        toast.info("Item already in wishlist");
        return;
    }

    const previousWishlist = state.wishlist;
    dispatch({ type: "ADD_TO_WISHLIST", payload: product });
    
    const updatedWishlist = [...previousWishlist, product];
    syncWishlist(updatedWishlist).catch(() => {
        dispatch({ type: "ROLLBACK_WISHLIST", payload: previousWishlist });
    });
  }, [user, state.wishlist, syncWishlist]);

  const removeFromWishlist = useCallback((productId) => {
    const previousWishlist = state.wishlist;
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: productId });
    
    const updatedWishlist = previousWishlist.filter((item) => item.id !== productId);
    syncWishlist(updatedWishlist).catch(() => {
        dispatch({ type: "ROLLBACK_WISHLIST", payload: previousWishlist });
    });
  }, [state.wishlist, syncWishlist]);

  const value = useMemo(() => ({
    wishlist: state.wishlist,
    isLoading: state.isLoading,
    addToWishlist, 
    removeFromWishlist
  }), [state.wishlist, state.isLoading, addToWishlist, removeFromWishlist]);

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export const useWishlist = () => useContext(WishlistContext);
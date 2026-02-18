import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
} from "react";
// Removed toast import

const WishlistContext = createContext();

const initialState = {
  wishlist: [],
};

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      if (state.wishlist.some((i) => i.id === action.payload.id)) {
        return state;
      }
      return { ...state, wishlist: [...state.wishlist, action.payload] };
    case "REMOVE":
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (item) => item.id !== action.payload
        ),
      };
    case "CLEAR":
      return { ...state, wishlist: [] };
    default:
      return state;
  }
};

export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  const addToWishlist = useCallback((product) => {
    if (state.wishlist.some(item => item.id === product.id)) {
        return { success: false, message: "Already in wishlist" };
    }
    dispatch({ type: "ADD", payload: product });
    return { success: true, message: "Added to wishlist" };
  }, [state.wishlist]);

  const removeFromWishlist = useCallback((productId) => {
    dispatch({ type: "REMOVE", payload: productId });
  }, []);

  const value = useMemo(
    () => ({
      wishlist: state.wishlist,
      addToWishlist,
      removeFromWishlist,
    }),
    [state.wishlist, addToWishlist, removeFromWishlist]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useWishlist = () => useContext(WishlistContext);

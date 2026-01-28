# Release Notes - v1.0.0 (Performance & Scalability Update)

This major release focuses on transforming the application into a production-grade platform with improved reliability, faster performance, and a more robust codebase.

## 🌟 Highlights

*   **Instant User Feedback**: Implemented **Optimistic UI** patterns in Cart and Wishlist. Actions like "Add to Cart" now update the UI instantly without waiting for the server, improving perceived performance dramatically.
*   **Bulletproof Reliability**: Added a global **Error Boundary** to catch crashes and display a friendly fallback UI instead of breaking the entire app.
*   **Production Readiness**: Enforced strict linting rules and cleaned up technical debt (unused code, console logs) to ensure a maintainable codebase.

## 🚀 Improvements

### Performance
*   **Lazy Loading**: Enabled route-based code splitting for all major pages (Home, Cart, Products, Admin Dashboard) to reduce the initial bundle size.
*   **Efficient State**: Migrated `CartContext`, `WishlistContext`, and `OrderContext` from `useState` to `useReducer` to prevent race conditions and unnecessary re-renders.
*   **Exchange Rate Caching**: Implemented local caching for USD/INR exchange rates to reduce API calls and improve checkout speed.

### Reliability
*   **Automatic Rollback**: If a network request fails (e.g., adding an item to the cart), the UI automatically reverts to the previous correct state and notifies the user via toast.
*   **Type Safety**: Enhanced code quality with stricter ESLint configuration (`no-unused-vars`, `react-hooks/exhaustive-deps`).

### Infrastructure
*   **Clean Code**: Removed ~150 lines of commented-out/dead code from `App.jsx`.
*   **Build Optimization**: Configured `vite.config.js` and `eslint.config.js` for smoother production builds.

## 🐛 Bug Fixes
*   Fixed an issue where rapid "Add to Cart" clicks could cause state desynchronization.
*   Resolved potential white-screen crashes on network failures during component initialization.
*   Fixed linting errors related to unused variables across the `src` directory.

---

*Thank you for using Noirel!*

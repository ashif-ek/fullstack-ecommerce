# NOIRÉL | Premium E-Commerce Experience

NOIRÉL is a modern, high-performance e-commerce application built to deliver a seamless and premium shopping experience. It features a responsive design, optimistic UI updates for instant feedback, and a robust state management system.

![Noirel Banner](public/perfume1.png)

## 🚀 Key Features

*   **Premium UI/UX**: Minimalist, high-end aesthetic with smooth transitions and responsive layouts.
*   **Optimized Performance**:
    *   **Lazy Loading**: Route-based code splitting for fast initial load times.
    *   **Optimistic UI**: Instant updates for Cart and Wishlist actions with automatic background synchronization.
*   **Robust State Management**: Scalable Context API implementation using `useReducer` for predictable state transitions.
*   **Secure Authentication**: User registration and login with persistent sessions.
*   **Reliability**: Global Error Boundaries to gracefully handle runtime crashes.
*   **Checkout & Payment**: Integrated Razorpay payment gateway with dual-currency support (USD/INR).

## 🛠️ Technology Stack

*   **Frontend**: React 19, Vite, TailwindCSS
*   **State Management**: React Context API + useReducer
*   **Routing**: React Router DOM v7
*   **Icons & Components**: Lucide React, React Icons
*   **Payment**: Razorpay
*   **Quality**: ESLint, Prettier

## 📦 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/noirel.git
    cd noirel
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the root directory (optional but recommended for API keys):
    ```env
    VITE_API_URL=https://noirel-server.onrender.com
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```

5.  **Build for Production**
    ```bash
    npm run build
    ```

## 🏗️ Architecture Highlights

### State Management
We use a centralized Context architecture optimized for performance:
*   **CartContext**: Handles add/remove/update operations with optimistic updates and automatic rollback on error.
*   **OrderContext**: Manages checkout flows, exchange rate caching, and payment processing.

### Error Handling
*   **Global Error Boundary**: Catches unhandled exceptions in the component tree to prevent white-screen crashes.
*   **Graceful Fallbacks**: UI components handle loading and error states locally.

## 🤝 Contributing

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# NOIRÉL | Premium Full-Stack E-Commerce Platform

NOIRÉL is a sophisticated, high-performance e-commerce solution designed to provide a premium shopping experience. Built with a robust Django backend and a dynamic React frontend, it offers a seamless, secure, and scalable platform for online retail.

![Noirel Banner](frontend/public/perfume1.png)

## 🚀 Key Features

### User Experience (Frontend)
*   **Premium UI/UX**: Minimalist, high-end aesthetic with smooth transitions and responsive layouts using TailwindCSS.
*   **Optimized Performance**:
    *   **Lazy Loading**: Route-based code splitting for fast initial load times.
    *   **Optimistic UI**: Instant updates for Cart and Wishlist actions with automatic background synchronization.
*   **Robust State Management**: Scalable Context API implementation for predictable state transitions.
*   **Secure Authentication**: JWT-based user registration and login with persistent sessions.
*   **Checkout & Payment**: Integrated **Razorpay** payment gateway with dual-currency support (USD/INR).
*   **Resilience**: Global Error Boundaries to gracefully handle runtime crashes.

### Backend Infrastructure (Django)
*   **RESTful API**: Built with Django REST Framework (DRF) for efficient data serving.
*   **Database**: Robust data storage using **PostgreSQL**.
*   **Storage**: **AWS S3** integration for secure and scalable static and media file storage.
*   **API Documentation**: Auto-generated Swagger/OpenAPI documentation via `drf-spectacular`.
*   **Security**:
    *   JWT Authentication (`rest_framework_simplejwt`).
    *   CORS & CSRF protection.
    *   Secure password validation and hashing.

## 🛠️ Technology Stack

### Backend
*   **Framework**: Django 4.x, Django REST Framework
*   **Database**: PostgreSQL
*   **Authentication**: Simple JWT
*   **Storage**: AWS S3 (`django-storages`, `boto3`)
*   **Payment**: Razorpay
*   **Documentation**: drf-spectacular (Swagger)
*   **Utilities**: python-decouple, pillow, corsheaders

### Frontend
*   **Library**: React 19
*   **Build Tool**: Vite
*   **Styling**: TailwindCSS
*   **State Management**: React Context API + useReducer
*   **Routing**: React Router DOM v7
*   **HTTP Client**: Axios
*   **Date Handling**: Day.js
*   **Icons**: Lucide React, React Icons

## 📦 Installation & Setup

### Prerequisites
*   Python 3.10+
*   Node.js 18+
*   PostgreSQL

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    python -m venv venv
    # Windows
    venv\Scripts\activate
    # macOS/Linux
    source venv/bin/activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configure Environment Variables:**
    Create a `.env` file in the `backend/` directory with the following keys:
    ```env
    SECRET_KEY=your_secret_key
    DEBUG=True
    ALLOWED_HOSTS=localhost,127.0.0.1
    DB_NAME=your_db_name
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_HOST=localhost
    DB_PORT=5432
    AWS_ACCESS_KEY_ID=your_aws_key
    AWS_SECRET_ACCESS_KEY=your_aws_secret
    AWS_STORAGE_BUCKET_NAME=your_bucket_name
    RAZORPAY_KEY_ID=your_razorpay_key_id
    RAZORPAY_KEY_SECRET=your_razorpay_key_secret
    ```

5.  **Run Migrations:**
    ```bash
    python manage.py migrate
    ```

6.  **Start the Development Server:**
    ```bash
    python manage.py runserver
    ```

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the `frontend/` directory:
    ```env
    VITE_API_URL=http://localhost:8000
    ```

4.  **Start the Development Server:**
    ```bash
    npm run dev
    ```

## 🏗️ Architecture Highlights

*   **Decoupled Architecture**: The frontend and backend are completely decoupled, communicating via REST APIs.
*   **Scalable Folder Structure**:
    *   Backend follows a modular app-based structure (`accounts`, `products`, `orders`, etc.).
    *   Frontend is organized by feature modules (`auth`, `admin`, `user`) and shared resources (`components`, `context`).

## 🤝 Contributing

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License.

# NOIRÉL | Premium Full-Stack E-Commerce Platform

<<<<<<< HEAD
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
=======
**NOIRÉL** is a production-grade luxury e-commerce platform engineered with a modern full-stack architecture.

It combines a scalable **Django REST API backend** with a high-performance **React frontend**, delivering a seamless, secure, and premium online shopping experience.

This project follows real-world SaaS engineering practices including cloud storage, JWT authentication, payment integration, and deployment-ready infrastructure.

---

![Noirel Banner](frontend/public/perfume1.png)

---

## 🌍 Live Deployment

- **Frontend (Vercel):** https://noirel-perfume.vercel.app  
- **Backend API (AWS EC2 + Nginx):** https://noirel.duckdns.org/api  
- **Swagger Docs:** https://noirel.duckdns.org/api/schema/swagger-ui/

---

## 🚀 Key Features

### 🎨 Frontend (User Experience)

- **Premium UI/UX**
  - Luxury minimalist design system
  - Fully responsive layouts using TailwindCSS
  - Smooth transitions and micro-interactions

- **Performance Optimizations**
  - **Lazy Loading + Code Splitting** for faster startup
  - **Optimistic UI Updates** for Cart & Wishlist actions
  - Local caching for exchange-rate conversion (USD/INR)

- **Robust State Architecture**
  - Context API + `useReducer` for scalable global state
  - Predictable state transitions (Cart, Orders, Wishlist)

- **Authentication**
  - Secure JWT login/register flows
  - Persistent session management

- **Checkout & Payments**
  - Integrated **Razorpay Payment Gateway**
  - Dual currency support (INR / USD)

- **Resilience**
  - Global Error Boundaries preventing white-screen crashes
  - Graceful fallback UI for runtime failures

---

### ⚙️ Backend (API & Infrastructure)

- **RESTful API Layer**
  - Built using Django REST Framework (DRF)
  - Clean separation of concerns via modular apps

- **Database**
  - PostgreSQL (AWS RDS-ready)
  - Optimized schema relationships + indexing

- **Cloud Storage**
  - AWS S3 integration for scalable media/static hosting
  - Secure presigned upload-ready architecture

- **Security Hardening**
  - JWT Authentication (`rest_framework_simplejwt`)
  - CORS + CSRF protection
  - Secure password hashing and validation

- **API Documentation**
  - Swagger/OpenAPI auto-generated via `drf-spectacular`

- **Admin Operations**
  - Enhanced Django Admin dashboard for product/order/user control

---
>>>>>>> 42e4fa73c048058d7191bdc100ce8542172ea9b9

## 🛠️ Technology Stack

### Backend
<<<<<<< HEAD
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
=======

| Component        | Technology |
|------------------|------------|
| Framework        | Django 4.x |
| API Layer        | Django REST Framework |
| Authentication   | Simple JWT |
| Database         | PostgreSQL |
| Storage          | AWS S3 (`django-storages`, `boto3`) |
| Payments         | Razorpay |
| API Docs         | drf-spectacular |
| Deployment       | Gunicorn + Nginx |
| Utilities        | python-decouple, pillow, corsheaders |

---

### Frontend

| Component        | Technology |
|------------------|------------|
| Library          | React 19 |
| Build Tool       | Vite |
| Styling          | TailwindCSS |
| State Mgmt       | Context API + useReducer |
| Routing          | React Router DOM v7 |
| HTTP Client      | Axios |
| Date Utilities   | Day.js |
| Icons            | Lucide React, React Icons |

---

## 📂 Project Structure

```bash
fullstack-ecommerce/
│
├── backend/
│   ├── config/          # Settings, URLs, WSGI/ASGI
│   ├── accounts/        # Auth + JWT flows
│   ├── products/        # Product catalog system
│   ├── orders/          # Cart + Checkout + Payments
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/  # Shared UI components
│   │   ├── pages/       # Route-level pages
│   │   ├── context/     # Global state store
│   │   ├── api/         # Axios API layer
│   │   └── main.jsx
│   └── package.json
│
└── README.md

⚙️ Installation & Local Setup
Prerequisites

Python 3.10+

Node.js 18+

PostgreSQL

Backend Setup (Django)
1. Navigate into backend
cd backend

2. Create and activate virtual environment
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

3. Install backend dependencies
pip install -r requirements.txt

4. Configure Environment Variables

Create a .env file inside backend/

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

RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret

5. Run migrations
python manage.py migrate

6. Collect static files
python manage.py collectstatic

7. Start backend server
python manage.py runserver


Backend runs at:

http://127.0.0.1:8000/

Frontend Setup (React)
1. Navigate into frontend
cd frontend

2. Install packages
npm install

3. Configure Frontend Environment Variables

Create a .env file inside frontend/

VITE_API_URL=http://127.0.0.1:8000

4. Start frontend dev server
npm run dev


Frontend runs at:

http://localhost:5173/

☁️ Production Deployment Architecture
React Frontend (Vercel)
        ↓ HTTPS API Calls
Nginx Reverse Proxy (AWS EC2)
        ↓
Gunicorn App Server (Django)
        ↓
PostgreSQL Database (AWS RDS)
        ↓
Media + Static Storage (AWS S3)

🔥 Production Engineering Notes

DEBUG=False enforced in deployment

Static assets served via Nginx + S3

Media uploads handled via AWS S3 bucket

CORS restricted to frontend domain only

JWT refresh-token rotation ready

🤝 Contributing

Fork the repository

Create your feature branch:

git checkout -b feature/NewFeature


Commit changes:

git commit -m "Add NewFeature"


Push branch:

git push origin feature/NewFeature


Open a Pull Request

📄 License

This project is licensed under the MIT License.

>>>>>>> 42e4fa73c048058d7191bdc100ce8542172ea9b9

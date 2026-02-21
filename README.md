# NOIRÉL | Production-Grade Headless Full-Stack E-Commerce Platform

![React](https://img.shields.io/badge/React-19-blue)
![Django](https://img.shields.io/badge/Django-5-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Production-blue)
![AWS](https://img.shields.io/badge/AWS-EC2%20%7C%20S3-orange)
![Deployment](https://img.shields.io/badge/Status-Live-brightgreen)

---

## Overview

**NOIRÉL** is a production-grade, headless full-stack e-commerce platform engineered using React 19 and Django REST Framework.

The system replicates real-world SaaS architecture with a decoupled frontend and backend deployed on cloud infrastructure. It emphasizes transactional integrity, security hardening, performance optimization, and production-ready deployment practices.

This project was built to move beyond CRUD-level applications and demonstrate end-to-end system engineering.

---

![Noirel Banner](frontend/public/noirel-demo.png)

---

## 🌍 Live Deployment

- **Live Application (Vercel CDN):**  
  https://noirel-perfume.vercel.app

- **Backend API (AWS EC2 + Nginx):**  
  https://noirel.duckdns.org/api/

- **Swagger / OpenAPI Documentation:**  
  https://noirel.duckdns.org/api/schema/swagger-ui/

---

# 🏗 System Architecture

NOIRÉL follows a headless, API-first architecture with strict separation between presentation and business logic layers.

Client (React - Vercel CDN)
↓ HTTPS
Nginx Reverse Proxy (AWS EC2)
↓
Gunicorn (WSGI App Server)
↓
Django REST API
↓
PostgreSQL (RDS-ready)
↓
AWS S3 (Media Storage)


### Architectural Principles

- Decoupled frontend and backend
- Stateless JWT-based authentication
- Atomic transactions for data consistency
- Infrastructure separation via reverse proxy
- Cloud-native media storage
- Production-first configuration

---

# 🚀 Core Features

## Frontend (React 19 + Vite)

### Design System

- Tailwind utility-first architecture
- Reusable component abstraction
- Responsive layout (mobile-first)
- Component isolation to reduce unnecessary re-renders

### Performance Engineering

- Route-based code splitting (`React.lazy`)
- Optimistic UI updates for Cart & Wishlist
- WebP image optimization
- Memoized context values
- Local caching for currency conversion (USD / INR)

### State Management

- Context API + `useReducer`
- Predictable state transitions
- Separated domains (Auth, Cart, Wishlist, Search)

### Resilience

- Global Error Boundaries
- Graceful fallback UI
- Persistent authentication sessions

---

## Backend (Django 5 + DRF)

### API Layer

- Modular Django apps (accounts, products, orders)
- RESTful API via Django REST Framework
- Clean separation of concerns

### Authentication

- JWT authentication (`SimpleJWT`)
- Stateless validation
- Role-based access control

### Orders & Transactions

- Atomic order creation using `transaction.atomic()`
- Stock validation before commit
- Snapshot pricing stored in OrderItems
- Server-side Razorpay signature verification

### Database

- PostgreSQL schema optimized for relational integrity
- Indexed fields for high-frequency queries
- Foreign key indexing
- Query-aligned schema design

### Media & Storage

- AWS S3 for production media storage
- Local storage fallback in development
- Scalable static/media separation

---

# 🔒 Transactional Integrity & Concurrency Handling

- Order creation wrapped in atomic database transactions
- Prevents race conditions during concurrent checkouts
- Payment verification completed server-side
- Ensures data consistency across order lifecycle
- Protects against partial state updates

---

# 🛡 Security Considerations

- JWT authentication with refresh rotation ready
- Strict CORS configuration (production origin restricted)
- Server-side payment signature verification
- CSRF-safe configuration
- DEBUG=False in production
- Environment-based secret management
- Secure password hashing (Django PBKDF2)

---

# ⚡ Performance Strategy

### Frontend

- Code splitting for reduced initial bundle size
- Memoization to prevent unnecessary renders
- Optimistic UI for perceived responsiveness

### Backend

- Indexed database fields (`created_at`, foreign keys, flags)
- Optimized relational queries
- Transactional integrity enforcement
- Reverse proxy buffering via Nginx

---

# ☁️ Production Deployment

### Infrastructure Stack

- **Frontend:** Vercel (Edge CDN)
- **Backend:** AWS EC2 (Ubuntu)
- **Reverse Proxy:** Nginx
- **Application Server:** Gunicorn
- **Database:** PostgreSQL (RDS-ready)
- **Storage:** AWS S3
- **CI/CD:** GitHub Actions

### Production Hardening

- HTTPS-enabled deployment
- Static/media offloaded from application server
- Restricted CORS origins
- Gunicorn worker tuning
- Environment-specific configuration management

---

# 🛠 Technology Stack

## Backend

| Component        | Technology |
|------------------|------------|
| Framework        | Django 5 |
| API              | Django REST Framework |
| Authentication   | Simple JWT |
| Database         | PostgreSQL |
| Storage          | AWS S3 |
| Payments         | Razorpay |
| API Docs         | drf-spectacular |
| Server           | Gunicorn + Nginx |

---

## Frontend

| Component        | Technology |
|------------------|------------|
| Library          | React 19 |
| Build Tool       | Vite 6 |
| Styling          | Tailwind CSS |
| State Mgmt       | Context API + useReducer |
| Routing          | React Router v7 |
| HTTP Client      | Axios |
| Charts           | Recharts |
| Animation        | Framer Motion |

---

# 📂 Project Structure

└── ashif-ek-fullstack-ecommerce/
    
    ├── backend/
    │   ├── check_images.py
    │   ├── manage.py
    │   ├── output.txt
    │   ├── package.json
    │   ├── repro_profile_error.py
    │   ├── requirements.txt
    │   ├── verify_profile_view.py
    │   ├── accounts/
    │   │   ├── __init__.py
    │   │   ├── admin.py
    │   │   ├── apps.py
    │   │   ├── models.py
    │   │   ├── serializers.py
    │   │   ├── tests.py
    │   │   ├── urls.py
    │   │   ├── views.py
    │   │   └── migrations/
    │   │       ├── 0001_initial.py
    │   │       └── __init__.py
    │   ├── cart/
    │   │   ├── __init__.py
    │   │   ├── admin.py
    │   │   ├── apps.py
    │   │   ├── models.py
    │   │   ├── serializers.py
    │   │   ├── signals.py
    │   │   ├── tests.py
    │   │   ├── urls.py
    │   │   ├── views.py
    │   │   └── migrations/
    │   │       ├── 0001_initial.py
    │   │       └── __init__.py
    │   ├── config/
    │   │   ├── __init__.py
    │   │   ├── asgi.py
    │   │   ├── settings.py
    │   │   ├── urls.py
    │   │   └── wsgi.py
    │   ├── media/
    │   │   └── products/
    │   │       ├── shopping.webp
    │   │       ├── shopping_1.webp
    │   │       ├── shopping_2.webp
    │   │       ├── shopping_3.webp
    │   │       ├── shopping_4.webp
    │   │       ├── shopping_4_ioFwxix.webp
    │   │       ├── shopping_4_RL4VTog.webp
    │   │       ├── shopping_6.webp
    │   │       ├── shopping_jvCJI6b.webp
    │   │       └── shopping_vghBe1D.webp
    │   ├── orders/
    │   │   ├── __init__.py
    │   │   ├── admin.py
    │   │   ├── apps.py
    │   │   ├── models.py
    │   │   ├── serializers.py
    │   │   ├── services.py
    │   │   ├── tests.py
    │   │   ├── urls.py
    │   │   ├── views.py
    │   │   └── migrations/
    │   │       ├── 0001_initial.py
    │   │       ├── 0002_order_shipping_address.py
    │   │       ├── 0003_alter_order_status.py
    │   │       └── __init__.py
    │   ├── payments/
    │   │   ├── __init__.py
    │   │   ├── admin.py
    │   │   ├── apps.py
    │   │   ├── models.py
    │   │   ├── services.py
    │   │   ├── tests.py
    │   │   ├── urls.py
    │   │   ├── views.py
    │   │   └── migrations/
    │   │       ├── 0001_initial.py
    │   │       └── __init__.py
    │   └── products/
    │       ├── __init__.py
    │       ├── admin.py
    │       ├── apps.py
    │       ├── models.py
    │       ├── serializers.py
    │       ├── tests.py
    │       ├── urls.py
    │       ├── views.py
    │       └── migrations/
    │           ├── 0001_initial.py
    │           ├── 0002_alter_product_category.py
    │           ├── 0003_product_image.py
    │           └── __init__.py
    └── frontend/
        ├── README.md
        ├── eslint.config.js
        ├── index.html
        ├── lint.txt
        ├── lint_log.txt
        ├── package.json
        ├── postcss.config.js
        ├── RELEASE_NOTES.md
        ├── tailwind.config.js
        ├── vercel.json
        ├── vite.config.js
        ├── public/
        │   ├── robots.txt
        │   ├── site.webmanifest
        │   └── sitemap.xml
        └── src/
            ├── App.css
            ├── App.jsx
            ├── index.css
            ├── main.jsx
            ├── auth/
            │   ├── login.jsx
            │   └── register.jsx
            ├── components/
            │   ├── AdminRoute.jsx
            │   ├── ErrorBoundary.jsx
            │   ├── footer.jsx
            │   ├── hero.jsx
            │   ├── navbar.jsx
            │   ├── ProtectedRoute.jsx
            │   ├── PublicRoute.jsx
            │   ├── SearchDropdown.jsx
            │   └── ShimmerLoader.jsx
            ├── context/
            │   ├── AuthContext.jsx
            │   ├── CartContext.jsx
            │   ├── OrderContext.jsx
            │   ├── SearchContext.jsx
            │   └── WishlistContext.jsx
            ├── modules/
            │   ├── admin/
            │   │   ├── admin-products.jsx
            │   │   ├── admin-user.jsx
            │   │   ├── adminLayout.jsx
            │   │   ├── dashboard.jsx
            │   │   ├── user-details.jsx
            │   │   └── userOverview.jsx
            │   └── user/
            │       ├── userhome.jsx
            │       └── pages/
            │           ├── carts.jsx
            │           ├── checkout.jsx
            │           ├── home.jsx
            │           ├── notfound.jsx
            │           ├── orders.jsx
            │           ├── ourStory.jsx
            │           ├── ProductDetail.jsx
            │           ├── products.jsx
            │           ├── profile.jsx
            │           ├── search.jsx
            │           ├── TopSellingProducts.jsx
            │           └── whishlist.jsx
            └── services/
                └── api.js


---

# ⚙️ Local Development Setup

## Prerequisites

- Python 3.10+
- Node.js 18+
- PostgreSQL (local or containerized)

---

## Backend Setup

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs at:
http://localhost:5173/

Backend runs at:
http://127.0.0.1:8000/

📈 Scalability Considerations

Current design supports:

Stateless authentication (horizontal scaling ready)

Media offloading to S3

Indexed database queries

Reverse proxy architecture

Future Enhancements:

Redis caching layer

Background job processing (Celery)

Load balancer for horizontal scaling

Containerization via Docker

Observability & monitoring integration

🎯 Engineering Focus

This project demonstrates:

API-first system design

Cloud infrastructure deployment

Transactional integrity enforcement

Security boundary implementation

Performance optimization

Production hardening practices

NOIRÉL reflects a transition from feature development to system-level engineering.



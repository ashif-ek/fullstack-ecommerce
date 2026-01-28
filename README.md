# 📦 Full-Stack eCommerce Platform

A full-stack eCommerce application built with **Django REST Framework** and **React**, styled using **Tailwind CSS**, and secured with **JWT authentication**.
Designed with scalability, clean architecture, and real-world best practices in mind.

---

## 🚀 Tech Stack

### Backend
- **Python**
- **Django**
- **Django REST Framework**
- **JWT Authentication** (SimpleJWT)
- **Custom User Model** (Email-based login)

### Frontend
- **React**
- **Tailwind CSS**
- **REST API Integration**
- **JWT Token Handling**

### Tools & Practices
- **Git & GitHub**
- **Environment-based settings**
- **Modular & scalable project structure**
- **Production-ready authentication flow**

---

## 🔐 Authentication & Security

- ✅ **Email-based authentication** (no username)
- ✅ **JWT Access & Refresh tokens**
- ✅ **Token rotation & blacklist support**
- ✅ **Secure password hashing**
- ✅ **Protected API endpoints**

> **Note:** JWT is used for stateless authentication, making the system scalable and frontend-agnostic (web & mobile ready).

---

## 🧠 Architecture Overview

```mermaid
graph TD
    Client[Frontend (React)]
    API[REST APIs + JWT]
    Backend[Backend (Django REST Framework)]
    Auth[Authentication & Authorization]
    Logic[Business Logic]
    DB[(Database)]

    Client -->|Requests| API
    API --> Backend
    Backend --> Auth
    Backend --> Logic
    Logic --> DB
```

- **Stateless backend**
- **Clean separation of concerns**
- **Ready for horizontal scaling**

---

## 📂 Project Structure (High-Level)

```bash
backend/
  ├── accounts/        # Custom user & auth logic
  ├── core/            # Core settings & utilities
  ├── api/             # Business APIs
  └── manage.py

frontend/
  ├── src/
  │   ├── components/
  │   ├── pages/
  │   ├── services/    # API calls
  │   └── auth/
```

---

## ⚙️ Setup Instructions (Local)

### Backend

```bash
git clone https://github.com/ashif-ek/fullstack-ecommerce.git
cd backend
python -m venv venv
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🎯 Features (Current & Planned)

### Implemented
- [x] User registration & login
- [x] JWT authentication
- [x] Protected routes
- [x] Custom user model

### Planned
- [ ] Product catalog
- [ ] Cart & checkout
- [ ] Order management
- [ ] Role-based access (Admin / User)
- [ ] Payment gateway integration

---

## 🧩 Design Philosophy

1. **Security first**
2. **Simple before complex**
3. **Scalable by default**
4. **Production mindset, not tutorial code**

This project is built to simulate real industry patterns, not just to “make it work”.

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🙌 Author

**Ashif ek**

Aiming to build production-grade systems with clean architecture and strong fundamentals.

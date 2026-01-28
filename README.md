📦 Full-Stack eCommerce Platform

A full-stack eCommerce application built with Django REST Framework and React, styled using Tailwind CSS, and secured with JWT authentication.
Designed with scalability, clean architecture, and real-world best practices in mind.

🚀 Tech Stack
Backend

Python

Django

Django REST Framework

JWT Authentication (SimpleJWT)

Custom User Model (Email-based login)

Frontend

React

Tailwind CSS

REST API Integration

JWT Token Handling

Tools & Practices

Git & GitHub

Environment-based settings

Modular & scalable project structure

Production-ready authentication flow

🔐 Authentication & Security

Email-based authentication (no username)

JWT Access & Refresh tokens

Token rotation & blacklist support

Secure password hashing

Protected API endpoints

Note: JWT is used for stateless authentication, making the system scalable and frontend-agnostic (web & mobile ready).

🧠 Architecture Overview
Frontend (React)
   |
   |  REST APIs + JWT
   |
Backend (Django REST Framework)
   |
   ├── Authentication & Authorization
   ├── Business Logic
   └── Database


Stateless backend

Clean separation of concerns

Ready for horizontal scaling

📂 Project Structure (High-Level)
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

⚙️ Setup Instructions (Local)
Backend
git clone https://github.com/ashif-ek/fullstack-ecommerce.git
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

Frontend
cd frontend
npm install
npm run dev

🎯 Features (Current & Planned)
Implemented

User registration & login

JWT authentication

Protected routes

Custom user model

Planned

Product catalog

Cart & checkout

Order management

Role-based access (Admin / User)

Payment gateway integration

🧩 Design Philosophy

Security first

Simple before complex

Scalable by default

Production mindset, not tutorial code

This project is built to simulate real industry patterns, not just to “make it work”.

📜 License

This project is licensed under the MIT License.

🙌 Author

Ashif
Aiming to build production-grade systems with clean architecture and strong fundamentals.

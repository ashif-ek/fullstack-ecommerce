# NOIRÉL | Premium Full-Stack E-Commerce Platform

**NOIRÉL** is a sophisticated, high-performance luxury e-commerce platform engineered to deliver a premium shopping experience.

Built with a robust **Django REST backend** and a modern **React frontend**, NOIRÉL provides a seamless, secure, and scalable foundation for next-generation online retail.

![Noirel Banner](frontend/public/perfume1.png)

---

## 🚀 Key Features

### 🎨 User Experience (Frontend)

- **Premium UI/UX**
  Minimalist luxury design with smooth transitions and responsive layouts powered by TailwindCSS.

- **Optimized Performance**
  - **Lazy Loading**: Route-based code splitting for fast initial load.
  - **Optimistic UI**: Instant Cart/Wishlist updates with background synchronization.

- **Robust State Management**
  Scalable Context API + `useReducer` architecture for predictable state transitions.

- **Secure Authentication**
  JWT-based login/register flows with persistent session handling.

- **Checkout & Payments**
  Integrated **Razorpay payment gateway** with dual-currency support (USD/INR).

- **Resilience by Design**
  Global Error Boundaries to gracefully handle runtime crashes.

---

### ⚙️ Backend Infrastructure (Django)

- **RESTful API Layer**
  Built using Django REST Framework (DRF) for efficient data serving.

- **Database Reliability**
  PostgreSQL-powered relational storage with optimized schema design.

- **Cloud Media Storage**
  AWS S3 integration for secure and scalable static/media hosting.

- **API Documentation**
  Auto-generated Swagger/OpenAPI docs using `drf-spectacular`.

- **Production-Grade Security**
  - JWT Authentication (`rest_framework_simplejwt`)
  - CORS + CSRF protection
  - Secure password hashing & validation

---

## 🛠️ Technology Stack

### Backend

- Framework: Django 4.x, Django REST Framework  
- Database: PostgreSQL  
- Authentication: Simple JWT  
- Storage: AWS S3 (`django-storages`, `boto3`)  
- Payments: Razorpay  
- API Docs: drf-spectacular (Swagger/OpenAPI)  
- Utilities: python-decouple, pillow, corsheaders  

---

### Frontend

- Library: React 19  
- Build Tool: Vite  
- Styling: TailwindCSS  
- State: Context API + useReducer  
- Routing: React Router DOM v7  
- HTTP Client: Axios  
- Date Handling: Day.js  
- Icons: Lucide React, React Icons  

---

## 📦 Installation & Setup

### Prerequisites

- Python 3.10+
- Node.js 18+
- PostgreSQL

---

## Backend Setup

1. Navigate into backend:

```bash
cd backend

Create and activate virtual environment:

python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate


Install dependencies:

pip install -r requirements.txt


Configure environment variables:

Create .env inside backend/:

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


Apply migrations:

python manage.py migrate


Run development server:

python manage.py runserver

Frontend Setup

Navigate into frontend:

cd frontend


Install packages:

npm install


Configure frontend env:

Create .env inside frontend/:

VITE_API_URL=http://localhost:8000


Start frontend:

npm run dev

🏗️ Architecture Highlights

Decoupled Architecture
Frontend and backend communicate exclusively via REST APIs.

Scalable Codebase

Backend uses modular Django apps (accounts, products, orders)

Frontend organized by feature modules (auth, admin, user)

🤝 Contributing

Fork the repository

Create a feature branch:

git checkout -b feature/AmazingFeature


Commit changes:

git commit -m "Add AmazingFeature"


Push branch:

git push origin feature/AmazingFeature


Open a Pull Request

📄 License

This project is licensed under the MIT License.

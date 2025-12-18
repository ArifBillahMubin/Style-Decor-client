# 🌸 StyleDecor  
### Smart Home & Ceremony Decoration Booking System

---

## 📌 Project Overview

**StyleDecor** is a full-stack web application designed to modernize the home and ceremony decoration booking process.  
It enables users to explore decoration services, book events, make online payments, and track service progress through a role-based dashboard system.

The platform also provides powerful administrative controls to manage services, decorators, and bookings efficiently.

---

## 🎯 Purpose of the Project

Many local decoration businesses face challenges such as:

- Manual booking management
- No real-time service tracking
- Difficulty assigning decorators
- Lack of online payments

**StyleDecor** solves these problems by offering:

- Online service booking & tracking  
- Decorator assignment workflow  
- Secure payment system  
- Role-based dashboards  
- Modern and responsive UI  

---

## 🔗 Live Website Links

- **Client Live URL:** https://style-decor-5f5eb.web.app/ 
- **Server Live URL:** https://style-decor-server-alpha.vercel.app  

---

## 🔐 Admin Login (For Evaluation)

- **Email:** admin@gmail.com
- **Password:** admin@gmail.com  

---

## 🧩 Core Features

### 🏠 Home Page
- Animated Hero Section (Framer Motion)
- Dynamic Services Section (loaded from server)
- Top Decorators Section (dynamic)
- Service Coverage Map (React Leaflet)
- Static Customer Testimonials
- Call-to-Action sections

---

### 🛍 Services
- Dynamic service cards
- Category filtering
- Price-based sorting
- Service details page
- Booking option

---

### 📅 Booking System
- Book decoration services
- Date & location selection
- Stripe payment integration
- Booking status tracking

---

### 👤 Authentication
- Email & Password login
- Google social login
- Profile image upload
- JWT-based private routes

---

## 📊 Dashboard System

### 👤 User Dashboard
- Profile overview
- My bookings
- Payment history
- Booking cancellation

---

### 🛠 Admin Dashboard
- Manage services (Create, Update, Delete)
- Manage decorators
- Assign decorators to bookings
- Manage all bookings
- Booking status tracking
- Pagination & filtering

---

### 🎨 Decorator Dashboard
- View assigned bookings
- Update service progress
- Track completed work

---

## 🔄 Service Status Flow

1. Pending  
2. Assigned  
3. Planning Phase  
4. Materials Prepared  
5. On The Way  
6. Setup In Progress  
7. Completed  
8. Cancelled  

---

## 🗺 Service Coverage

- Interactive Bangladesh map
- District-based service search
- Coverage section on landing page
- Dedicated full coverage page

---

## 🎨 UI / UX Highlights

- Tailwind CSS + DaisyUI
- Glassmorphism navbar
- Fully responsive layout
- Modern card designs
- Toast notifications
- Loading spinners & skeletons

---

## 🧪 Advanced Features

- Search functionality
- Filtering & sorting
- Pagination
- Secure JWT verification
- Role-based route protection

---

## 📦 Technologies Used

### Frontend
- React
- React Router DOM
- Tailwind CSS
- DaisyUI
- TanStack React Query
- React Hook Form
- Axios
- Framer Motion
- React Leaflet
- React Icons
- SweetAlert2
- React Hot Toast

---

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Stripe Payment Gateway
- dotenv
- CORS

---

## 🔐 Environment Variables

### Client (`.env`)
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Image Upload (ImgBB)
VITE_IMGBB_KEY=your_imgbb_api_key

# Backend API Base URL
VITE_API_URL=https://style-decor-server-alpha.vercel.app

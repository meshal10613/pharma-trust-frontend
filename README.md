# 💊 Pharma Trust

[Pharma Trust Frontend](https://pharma-trust-frontend-ten.vercel.app)

Pharma Trust is a modern full-stack healthcare/pharmacy platform built to provide a fast, secure, and scalable experience for managing medicines, users, and authentication.

It leverages the latest technologies like Next.js 16, React 19, and a robust backend API to deliver a smooth and responsive user experience.

---

## 🧠 Tech Stack

### ⚡ Frontend
- Next.js 16
- React 19
- Tailwind CSS 4
- Redux Toolkit
- Radix UI
- TanStack Form
- Zod
- Recharts
- Sonner
- Toasty Elegant
- Next Themes

### 🔐 Backend
- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma
- Better-Auth
- dotenv
- CORS

---

## 📦 Features

- 🔐 Secure Authentication System
- 📊 Interactive Dashboard with Charts
- ⚡ Modern UI with Tailwind + Radix UI
- 🧾 Form Validation (Zod + TanStack Form)
- 🌙 Dark / Light Mode Support
- 🔔 Elegant Toast Notifications
- 🔄 Global State Management (Redux Toolkit)
- 🌐 API Integration with clean architecture

---

## 👥 User Roles & Permissions

| Role         | Capabilities                                                         |
| ------------ | -------------------------------------------------------------------- |
| **Admin**    | Manage users, view all orders, manage categories, access admin stats |
| **Seller**   | Manage medicines, view & manage orders, access seller stats          |
| **Customer** | Browse medicines, place orders, write reviews                        |

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository
```env
git clone https://github.com/your-username/pharma-trust.git

cd pharma-trust
```

### 2️⃣ Install Dependencies
```env
npm install
```

### 3️⃣ Run Development Server
```env
npm run dev
```

### 4️⃣ Build for Production
```env
npm run build
npm start
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory and add:

```env
# Backend URLs
BACKEND_URL=https://pharma-trust-backend.vercel.app
API_URL=https://pharma-trust-backend.vercel.app/api
AUTH_URL=https://pharma-trust-backend.vercel.app/api/auth

# Frontend URL
FRONTEND_URL=https://pharma-trust-frontend-ten.vercel.app

# Public Variables
NEXT_PUBLIC_FRONTEND_URL=https://pharma-trust-frontend-ten.vercel.app
NEXT_PUBLIC_BACKEND_URL=https://pharma-trust-backend.vercel.app
NEXT_PUBLIC_BACKEND_API_URL=https://pharma-trust-backend.vercel.app/api
```

---

## 🔐 Authentication

Pharma Trust uses a secure authentication system powered by:

- Better Auth
- Token-based authentication
- Protected API routes

---

## 📊 State Management
- Redux Toolkit is used for managing global state
- Optimized data flow and caching

---

## 🎨 UI & Design
- Tailwind CSS for styling
- Radix UI for accessible components
- Lucide Icons
- Dark mode support via next-themes

---

## 📈 Data Visualization
- Recharts is used to build responsive and interactive charts

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Syed Mohiuddin Meshal
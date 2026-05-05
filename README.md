# Task Manager – Full‑Stack SaaS Application

A multi‑tenant task management platform with JWT authentication, role‑based access control (admin / user), and organisation‑level data isolation.  
Built with **React (Vite)** on the frontend and **Node.js + Express + MongoDB** on the backend.

🔗 **Live Demo**  
Frontend: [https://saas-app-frontend.onrender.com](https://saas-app-frontend.onrender.com)  
Backend API: [https://saas-app-backend-71pr.onrender.com/](https://saas-app-backend-71pr.onrender.com/)

---

##  Features

- **Secure login & signup** – JWT tokens stored in `localStorage`.
- **Role‑based access** – Admin users can delete tasks; normal users cannot.
- **Multi‑tenant data isolation** – Each organisation sees only its own tasks (filtered by `organisationId`).
- **Full CRUD operations** – Create, read, update, and delete tasks.
- **Dashboard insight** – Total task count displayed.
- **Responsive UI** – Clean, modern design with inline styles.
- **Deployment ready** – Configured for Render (backend as Web Service, frontend as Static Site).

---

##  Tech Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- bcryptjs for password hashing
- CORS enabled

### Frontend
- React (created with Vite)
- React Router v6
- Axios for API calls
- Inline CSS for styling

---

##  Local Development Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

### 1. Clone the repository
```bash
git clone https://github.com/sumathi-4/saas-app.git
cd saas-app

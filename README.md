# Pointrix: Reward Frontend

A modern, full-featured reward management system frontend built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Redux Toolkit (RTK Query)**.

---

## Table of Contents

- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Deployment (DigitalOcean App Platform)](#-deployment-digitalocean-app-platform)

---

## Tech Stack

| Technology | Version |
|---|---|
| Next.js | 16.1.6 |
| React | 19.2.3 |
| TypeScript | ^5 |
| Tailwind CSS | ^4 |
| Redux Toolkit | ^2.11.2 |
| RTK Query | (included in RTK) |

---

##  Features

###  User Portal
- **Dashboard** – View personal reward points and account summary
- **Redeem Rewards** – Browse and redeem available rewards
- **Redemption History** – Track past redemptions
- **Profile Management** – Update personal account info
- **Terms & Conditions / Privacy Policy** pages

###  Staff Portal
- **Staff Dashboard** – Overview of store activity
- **Orders Management** – View and manage customer orders
- **Order History** – Browse historical order records
- **Reward Inventory** – Manage available rewards in store
- **Redemptions** – Process customer reward redemptions
- **Transactions** – View point transaction logs
- **Profile Management** – Update staff profile

###  Admin Panel
- **Admin Dashboard** – System-wide overview and analytics
- **Company Management** – Full CRUD (Create, Read, Update, Delete) for companies
- **Customer Management** – View and manage registered customers
- **Staff Management** – Add and manage staff accounts
- **Rewards Management** – Create and manage reward items system-wide

###  Security & Auth
- Role-based route protection via **Next.js Middleware**
- Separate authentication flows for Admin, Staff, and Users
- Token-based session management with Redux state

---

##  Project Structure

```
src/
├── app/
│   ├── (user)/             # User-facing pages (dashboard, redeem, history, profile)
│   ├── admin/              # Admin panel (login, dashboard, companies, staffs, rewards, customer)
│   ├── staff/              # Staff panel (login, orders, inventory, redemptions, transactions)
│   ├── layout.tsx
│   └── page.tsx            # Landing page
├── components/
│   ├── admin/              # Admin UI components (companies, customers, rewards, staffs)
│   ├── auth/               # Login forms (Admin, Staff, User)
│   ├── layouts/            # Shared layout wrappers
│   ├── staff/              # Staff UI components
│   └── user/               # User UI components
├── middlewares/
│   ├── admin.ts            # Admin route guard
│   ├── staff.ts            # Staff route guard
│   └── user.ts             # User route guard
├── store/
│   ├── api/
│   │   ├── adminApi.ts     # Admin RTK Query endpoints
│   │   ├── staffApi.ts     # Staff RTK Query endpoints
│   │   └── userApi.ts      # User RTK Query endpoints
│   ├── authSlice.ts        # Auth state management
│   ├── StoreProvider.tsx
│   └── index.ts            # Redux store config
├── utils/
└── middleware.ts            # Global routing middleware
```

---

##  Getting Started

### Prerequisites

- **Node.js** v20 or higher
- **npm** v9 or higher
- A running backend API (see backend repository)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/reward-frontend.git
cd reward-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

> Replace `http://localhost:8080` with your actual backend API URL.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
npm run build
npm start
```

---

##  Environment Variables

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `https://api.yourapp.com` |

---

##  Deployment (DigitalOcean App Platform)

This project includes a `Dockerfile` for containerized deployment on **DigitalOcean App Platform**.

### Steps

1. **Push your code** to a GitHub repository.

2. **Log in** to [DigitalOcean](https://cloud.digitalocean.com) and go to **App Platform**.

3. Click **Create App** → Select your GitHub repository → Choose the correct branch.

4. DigitalOcean will auto-detect the **Dockerfile**. Confirm the settings:
   - **Build Command**: *(handled by Dockerfile)*
   - **Run Command**: `npm start`
   - **Port**: `3000`

5. Under **Environment Variables**, add:

   | Key | Value |
   |---|---|
   | `NEXT_PUBLIC_API_URL` | `https://your-backend-api-url.com` |

6. Click **Deploy** and wait for the build to complete.

7. Your app will be live at the DigitalOcean-provided URL (e.g., `https://your-app-name.ondigitalocean.app`).

### Dockerfile (included)

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🔗 Related

- **Backend Repository**: *(add link to your backend repo here)*
- **Live Demo**: *(add your DigitalOcean app URL here)*

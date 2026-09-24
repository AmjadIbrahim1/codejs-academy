# 🎓 CodeJS Academy

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![tRPC](https://img.shields.io/badge/tRPC-11-2596BE?style=for-the-badge&logo=trpc&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![NextAuth](https://img.shields.io/badge/NextAuth-v5-000000?style=for-the-badge)

**An online academy platform for learning programming**

</div>

---

## 📌 Project Overview

**CodeJS Academy** is a full-stack web platform for programming education, built on the **T3 Stack** (Next.js, TypeScript, tRPC, Prisma, Tailwind CSS). It provides structured learning programs, curriculum tracking, achievements, and admin management — with authentication powered by NextAuth.

---

## ✨ Key Features

### 🎓 Learning Platform
- **Program Overview** – Structured learning programs
- **Curriculum** – Organized course content and rounds
- **Achievements** – Track learner progress and milestones
- **Pricing** – Subscription plans and tiers

### 🔐 Authentication & Users
- **Register / Login** – NextAuth v5 with Prisma adapter
- **Admin Panel** – Role-based admin management
- **Secure Sessions** – bcrypt password hashing

### 🛠️ Engineering
- **tRPC + TanStack Query** – End-to-end type-safe APIs
- **Prisma + PostgreSQL** – Database with migrations
- **Vercel Blob** – File storage
- **Zod** – Schema validation
- **Tailwind CSS 4** – Modern styling

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework (App Router) |
| **TypeScript** | Type safety |
| **tRPC 11** | Type-safe API layer |
| **Prisma 6** | ORM & migrations |
| **NextAuth v5** | Authentication |
| **Tailwind CSS 4** | Styling |
| **TanStack Query** | Server state |
| **Zod** | Validation |
| **Vercel Blob** | File storage |

---

## 📁 Project Structure

```
codejs-academy/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Landing page
│   │   ├── layout.tsx         # Root layout
│   │   ├── login/             # Login page
│   │   ├── register/          # Registration
│   │   ├── pricing/           # Pricing plans
│   │   ├── rounds/            # Learning rounds
│   │   ├── curriculum/        # Curriculum
│   │   ├── achievements/      # Achievements
│   │   ├── program-overview/  # Program details
│   │   ├── admin/             # Admin panel
│   │   └── api/               # API routes
│   ├── components/            # Reusable components
│   ├── server/                # Server-side code
│   ├── trpc/                  # tRPC routers
│   ├── lib/                   # Utilities
│   ├── env.js                 # Environment validation
│   └── styles/                # Global styles
├── prisma/                    # Schema & migrations
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database

### Installation

1. **Clone & install**
   ```bash
   git clone https://github.com/AmjadIbrahim1/codejs-academy.git
   cd codejs-academy
   npm install
   ```

2. **Configure environment** — create `.env` with:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/codejs"
   NEXTAUTH_SECRET="your-secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

3. **Set up the database**
   ```bash
   npm run db:push
   npm run db:generate
   ```

4. **Start the dev server**
   ```bash
   npm run dev
   ```
   The app runs at `http://localhost:3000`.

---

## 📦 Available Scripts

```bash
npm run dev          # Dev server (Turbo mode)
npm run build        # Production build
npm start            # Start production server
npm run lint         # Next.js lint
npm run typecheck    # TypeScript check
npm run check        # Lint + typecheck
npm run db:push      # Push schema to database
npm run db:migrate   # Run migrations
npm run db:studio    # Prisma Studio
npm run format:check # Prettier check
npm run format:write # Prettier format
```

---

## 🚢 Deployment

The project is optimized for **Vercel** deployment — the `vercel-build` script runs `prisma migrate deploy` before building.

---

## 👨‍💻 Author

**Amjad Ibrahim**

- GitHub: [AmjadIbrahim1](https://github.com/AmjadIbrahim1)

# 🔖 Smart Bookmark App

A simple yet powerful bookmark manager built with **Next.js (App Router)**, **Supabase**, and **Tailwind CSS**.

Users can sign in using Google, save private bookmarks, and experience real-time updates across browser tabs.

---

## 🚀 Live Demo

🔗 Live URL: [YOUR_VERCEL_URL_HERE]

---

## 🛠 Tech Stack

- **Frontend:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Supabase
  - Authentication (Google OAuth)
  - PostgreSQL Database
  - Row Level Security (RLS)
  - Realtime subscriptions
- **Deployment:** Vercel

---

## ✨ Features

- 🔐 Google OAuth login (no email/password)
- ➕ Add bookmarks (title + URL)
- 👤 User-private bookmarks (data isolation)
- ⚡ Real-time updates across tabs
- 🗑 Delete bookmarks
- 🌐 Fully deployed on Vercel

---

## 🧠 How It Works

### 1️⃣ Authentication

Users authenticate via Google using Supabase Auth.

- OAuth handled in `AuthButton.tsx`
- Sessions managed automatically by Supabase
- Redirect works both locally and in production.

---

### 2️⃣ User Privacy & Security

Each bookmark is stored with:

```sql
user_id → references auth.users(id)

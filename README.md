# 📝 Keeper App

A full-stack **note-taking application** inspired by Google Keep. This app allows users to **create, read, update, and delete (CRUD)** personal notes — powered by a PostgreSQL backend, built with **React**, **Node.js**, and **Express**.

---

## ⚙️ Tech Stack

- **Frontend:** React.js (Vite or Create React App)
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL

---

## 📦 Packages Used

### Backend
- `express` – Web framework
- `cors` – To enable cross-origin requests
- `pg` – PostgreSQL client
- `dotenv` – For environment variables

### Frontend
- `axios` – For HTTP requests
- `react-router-dom` – Page routing (if applicable)
- `react` – UI library
- `react-dom` – DOM binding for React

---

## 🚀 Features

- ✅ Add new notes
- ✏️ Edit existing notes
- 🗑️ Delete notes
- 📖 View all notes
- 🔗 Frontend-backend integration using RESTful API
- 💾 Persistent storage using PostgreSQL

---

## 🌐 API Endpoints

- `GET /notes` – Get all notes
- `POST /notes` – Add a new note
- `PUT /notes/:id` – Update a note
- `DELETE /notes/:id` – Delete a note

---

## 🧪 .env Example (Backend)

```env
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=keeperdb
DB_PASSWORD=your_password
DB_PORT=5432
PORT=5000

---

🛠️ How to Run
1. Backend (Node + Express)
npm install
node index.js
2. Frontend (React)
npm install
npm start  # or npm run dev if using Vite
Then open http://localhost:3000

---

📚 Learning Objectives
🧠 Understanding CRUD with PostgreSQL

🔁 Connecting React frontend to Express backend

🔐 Managing secure DB credentials with .env

🧱 Organizing full-stack project structure

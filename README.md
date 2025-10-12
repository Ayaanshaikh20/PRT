# Polling App
A simple polling app where users can register/login, vote on polls, and see live results.

---

## 🛠 Features
- User registration/login
- Vote on polls (one vote per user)
- See results by percent and bar
- Responsive frontend using React and Tailwind CSS
- Backend using Node.js, Express, and local MongoDB compass

---

## 💻 Folder Structure
VOTEPOLL PRT/
│
├─ server/
│  ├─ models/       # Models (users.js, polls.js)
│  ├─ routes/       # API routes (users.js, polls.js)
│  ├─ index.js      # Express server running at :8000
│  └─ package.json
│
├─ client/          # Client running at :5173
│  ├─ src/
│  │  ├─ config/    # Routes (router.jsx)
│  │  ├─ pages/     # Pages (login.jsx, polls.jsx)
│  │  └─ main.jsx
│  └─ package.json


## ⚡ Requirements
- Node.js v18+
- npm (node package manager)
- MongoDB (local compass or Atlas cloud)


## 🚀 Getting Started
### Backend
1. Go to server folder:
```bash
cd server
npm install
MONGO_URI=<your_mongo_connection_string>
PORT=8000
nodemon or node server.js
```
The server will run on http://localhost:8000


### Frontend
2. Go to client folder:
```bash
cd client
npm install
npm run dev
```
The server will run on http://localhost:5173


### Screenshots
### Login Page
![Login Page](screenshots/ss1.png)

### Polls Page
![Polls Page-1](screenshots/ss2.png)
![Polls Page-2](screenshots/ss3.png)
![Polls Page-3](screenshots/ss4.png)







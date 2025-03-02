# Recruiting Matching App

## 📌 Overview
A recruiting app that evaluates candidates' GitHub commit history and compares it with a standard GitHub profile using vector embeddings. The app provides *hire/no-hire* recommendations based on the analysis.

## 🚀 Features
- *GitHub Authentication* – Users can sign in with their GitHub accounts.
- *Commit History Analysis* – Uses AI to generate vector embeddings from commit history.
- *Candidate Comparison* – Matches candidate profiles with a standard GitHub benchmark.
- *Hiring Decision* – Provides a recommendation for hiring based on code contributions.
- *Admin Dashboard* – View and manage candidate evaluations.
- *Beautiful UI* – Inspired by [GitRoll](https://gitroll.io/).

## 🏗 Tech Stack
### *Backend* (Node.js, Express, MongoDB)
- *Node.js + Express.js* – API development
- *MongoDB + Mongoose* – Database for storing user data and embeddings
- *GitHub API* – Fetching user commit history
- *OpenAI/ML Model* – Creating vector embeddings for analysis
- *JWT Authentication* – Secure login & token-based authentication
- *Docker* – Containerized deployment

### *Frontend* (React, Tailwind CSS, Vite)
- *React + Vite* – Fast, modern UI development
- *Tailwind CSS* – Clean and responsive styling
- *Redux Toolkit* – State management
- *Axios* – API calls
- *React Router* – Navigation

## 📂 Folder Structure
bash
recruiting-matching-app/
│── backend/                 # Express.js Backend
│   ├── controllers/         # API logic
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── services/            # Business logic
│   ├── utils/               # Helper functions
│   ├── config/              # Configuration files
│   ├── README.md            # Backend-specific README
│
│── frontend/                # React Frontend
│   ├── src/components/      # UI Components
│   ├── src/pages/           # Page Views
│   ├── src/store/           # Redux State
│   ├── src/utils/           # Helper functions
│   ├── README.md            # Frontend-specific README
│
│── README.md                # Main Project README
│── .gitignore               # Git Ignore File
│── package.json             # Dependencies
│── docker-compose.yml       # Docker Configuration


## ⚙ Setup & Installation
### 1️⃣ Clone the Repository
bash
git clone https://github.com/your-repo/recruiting-matching-app.git
cd recruiting-matching-app

### 2️⃣ Backend Setup
bash
cd backend
npm install
npm start

Create a *.env* file and add:

MONGO_URI=your-mongodb-uri
GITHUB_CLIENT_ID=your-client-id
GITHUB_CLIENT_SECRET=your-client-secret
JWT_SECRET=your-jwt-secret


### 3️⃣ Frontend Setup
bash
cd frontend
npm install
npm run dev


## 🛠 API Endpoints (Backend)
| Method | Endpoint               | Description                  |
|--------|------------------------|------------------------------|
| GET    | /api/auth/github       | GitHub OAuth Authentication |
| GET    | /api/users/profile     | Fetch user profile          |
| GET    | /api/candidates        | Get all candidates          |
| POST   | /api/candidates/match  | Match candidate profile     |

## 🚀 Deployment
- *Docker*: Run docker-compose up --build
- *Vercel (Frontend)*: vercel deploy
- *Railway/Render (Backend)*: Deploy backend with environment variables

## 📌 License
MIT License

---
For more details, check individual README files in the *frontend/* and *backend/* folders.
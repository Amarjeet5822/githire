# Frontend - Recruiting Matching App

## 📌 Overview

This is the frontend for the *Recruiting Matching App*, built using React and Tailwind CSS. It provides a seamless UI for candidates to log in with GitHub, view their commit analysis, and compare their profile with a standard benchmark.

## 🚀 Features

- *GitHub OAuth Login*
- *Dashboard for Candidates*
- *Commit History Visualization*
- *Hiring Decision Display*
- *Admin Panel for Reviewing Matches*
- *Fully Responsive & Beautiful UI*

## 🏗 Tech Stack

- *React + Vite* – Fast UI development
- *Tailwind CSS* – Modern, clean styling
- *Redux Toolkit* – State management
- *Axios* – Handling API requests
- *React Router* – Navigation
- *Chart.js/Recharts* – Data visualization

## 📂 Folder Structure

bash
frontend/
│── public/                # Static assets
│── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page-level components
│   ├── store/             # Redux state management
│   ├── utils/             # Helper functions
│   ├── hooks/             # Custom hooks
│   ├── services/          # API call handlers
│   ├── App.jsx            # Root component
│   ├── main.jsx           # Entry point
│
│── README.md              # Frontend-specific README
│── package.json           # Dependencies
│── vite.config.js         # Vite configuration
│── .env                   # Environment variables


## ⚙ Setup & Installation

### 1️⃣ Install Dependencies

bash
cd frontend
npm install


### 2️⃣ Create a *.env* File

env
VITE_BACKEND_URL=http://localhost:5000
VITE_GITHUB_CLIENT_ID=your-client-id


### 3️⃣ Run the Frontend

bash
npm run dev


## 🔌 API Integration

The frontend communicates with the backend via REST API endpoints. Example API request:

js
import axios from 'axios';
const fetchUserProfile = async () => {
  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/profile`);
  return res.data;
};


## 🚀 Deployment

- *Vercel:* Deploy using vercel deploy
- *Netlify:* Deploy using netlify deploy

## 📌 License

MIT License
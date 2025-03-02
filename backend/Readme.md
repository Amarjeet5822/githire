# Recruiting Matching App - Backend

## 📌 Overview
Welcome to the backend of the **Recruiting Matching App**! This Node.js and Express-based backend powers the application's core functionalities, including user authentication, GitHub data fetching, profile matching using vector embeddings, and admin tools.

---

## 🚀 Features
- **User Authentication:** GitHub OAuth for seamless login and JWT for secure session management.
- **Commit History Fetching:** Integration with GitHub API to pull users' commit histories.
- **Vector Embedding:** AI-powered profile analysis and matching.
- **Candidate Profile Matching:** Advanced algorithms to recommend suitable candidates.
- **Admin Dashboard:** APIs for admin-level statistics and reporting.

---

## 🏗 Tech Stack
- **Node.js + Express.js:** For building the RESTful API.
- **MongoDB + Mongoose:** For managing user and candidate data.
- **GitHub API:** To fetch commit history and profile details.
- **OpenAI/ML Model:** For vector embeddings and AI-based profile matching.
- **JWT Authentication:** To secure user authentication.
- **Docker:** For containerized deployment.

---

## 📂 Folder Structure
```
backend/
│── controllers/         # API logic
│── models/              # Mongoose models
│── routes/              # API routes
│── services/            # Business logic
│── utils/               # Helper functions
│── config/              # Configuration files
│── middleware/          # Authentication middleware
│── README.md            # Backend-specific README
│── server.js            # Main server file
│── package.json         # Dependencies
│── .env                 # Environment variables
```

---

## ⚙ Setup & Installation

### 1️⃣ Install Dependencies
```bash
cd backend
npm install
```

### 2️⃣ Create a .env File
Create a `.env` file in the root directory and add the following environment variables:
```plaintext
MONGO_URI=your-mongodb-uri
GITHUB_CLIENT_ID=your-client-id
GITHUB_CLIENT_SECRET=your-client-secret
JWT_SECRET=your-jwt-secret
OPENAI_API_KEY=your-api-key
```

### 3️⃣ Run the Backend
```bash
npm start
```

---

## 🔌 API Endpoints

### 🔹 Authentication
| Method | Endpoint                      | Description                      |
|--------|-------------------------------|----------------------------------|
| GET    | /api/auth/github              | GitHub OAuth Authentication      |
| GET    | /api/auth/github/callback     | GitHub OAuth Callback            |
| POST   | /api/auth/login               | JWT-based Login                  |
| POST   | /api/auth/logout              | User Logout                      |

### 🔹 User Profile
| Method | Endpoint                | Description                     |
|--------|-------------------------|----------------------------------|
| GET    | /api/users/profile      | Fetch logged-in user profile     |
| PUT    | /api/users/profile      | Update user profile              |

### 🔹 Candidate Matching
| Method | Endpoint                | Description                     |
|--------|-------------------------|----------------------------------|
| GET    | /api/candidates         | Get all candidates               |
| GET    | /api/candidates/:id     | Get a specific candidate         |
| POST   | /api/candidates/match   | Match candidate profile          |
| DELETE | /api/candidates/:id     | Delete candidate profile         |

### 🔹 Admin & Reports
| Method | Endpoint                | Description                     |
|--------|-------------------------|----------------------------------|
| GET    | /api/admin/stats        | Get system statistics            |
| GET    | /api/admin/reports      | Generate hiring reports          |

---

## 🚀 Deployment

### Docker
To deploy using Docker:
```bash
docker-compose up --build
```

### Railway/Render
Deploy your backend on Railway or Render by setting up the environment variables in their respective dashboards.

---

## 📌 License
This project is licensed under the MIT License.

---

Happy coding! 🚀


require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const  statsRoutes = require("./routes/statsRoutes.js");
const  adminRoutes = require("./routes/adminRoutes.js");
const  { Server } = require("socket.io");
const  http = require("http");
const  userRoutes = require("./routes/userRoutes.js");
const  messageRoutes = require("./routes/messageRoutes.js");
const  applicationRoutes = require("./routes/applicationRoutes.js");
require("./config/passport"); // Load Passport Config

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//   })
// );

app.use(cookieParser());
app.use(express.json());
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Session for Passport.js
app.use(
  session({ secret: "secret", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/githubRoutes")); // GitHub Commit API
app.use("/api/stats", statsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/applications", applicationRoutes);


app.get("/", (req, res) => {
  res.json({ message: "Welcome to GitRoll Matcher API" });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Create HTTP Server
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// 🔹 Store Connected Users
const onlineUsers = {};

io.on("connection", (socket) => {
  console.log("✅ New User Connected:", socket.id);

  // Save user with socket ID
  socket.on("join", (userId) => {
    onlineUsers[userId] = socket.id;
  });

  // Send Notification
  socket.on("sendNotification", ({ receiverId, message }) => {
    if (onlineUsers[receiverId]) {
      io.to(onlineUsers[receiverId]).emit("receiveNotification", { message });
    }
  });

  // Handle Disconnection
  socket.on("disconnect", () => {
    console.log("❌ User Disconnected:", socket.id);
    Object.keys(onlineUsers).forEach((key) => {
      if (onlineUsers[key] === socket.id) {
        delete onlineUsers[key];
      }
    });
  });
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

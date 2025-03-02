const express = require("express");
const Message = require("../models/Message.js");

const router = express.Router();

// 🔹 Get Messages Between Two Users
router.get("/:user1/:user2", async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: req.params.user1, receiverId: req.params.user2 },
        { senderId: req.params.user2, receiverId: req.params.user1 },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error fetching messages" });
  }
});

// 🔹 Send a Message
router.post("/", async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    const newMessage = new Message({ senderId, receiverId, message });

    await newMessage.save();
    res.json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Error sending message" });
  }
});

module.exports = router;

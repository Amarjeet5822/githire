const mongoose = require("mongoose");

const commitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  repoName: String,
  message: String,
  date: Date,
  vector: [Number], // Vector embedding
});

module.exports = mongoose.model("Commit", commitSchema);

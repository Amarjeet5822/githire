const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  githubId: { type: String, unique: true, required: true },
  username: { type: String, required: true },
  avatarUrl: { type: String },
  email: { type: String, unique: true, sparse: true },
  createdAt: { type: Date, default: Date.now },
  isApproved: {type:Boolean},
  rankScore: { type: Number, default: 0 },
});


  

module.exports = mongoose.model("User", UserSchema);

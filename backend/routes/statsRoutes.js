const express = require("express");
const Commit = require("../models/Commit.js");

const router = express.Router();

// 🔹 Get Top Candidates Based on Score
router.get("/leaderboard", async (req, res) => {
  try {
    const topCandidates = await Commit.aggregate([
      { $group: { _id: "$githubId", totalCommits: { $sum: 1 } } },
      { $sort: { totalCommits: -1 } },
      { $limit: 10 },
    ]);

    res.json(topCandidates);
  } catch (error) {
    res.status(500).json({ error: "Error fetching leaderboard" });
  }
});

// 🔹 Get Commit Stats for Charts
router.get("/stats", async (req, res) => {
  try {
    const stats = await Commit.aggregate([
      { $group: { _id: { $month: "$createdAt" }, totalCommits: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: "Error fetching stats" });
  }
});

module.exports =  router;

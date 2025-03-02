const express = require("express");
const axios = require("axios");
const Commit = require("../models/Commit.js");
const User = require("../models/User.js");
const { generateEmbedding } = require("../utils/embeddings.js");
const pinecone = require("../utils/pinecone.js");



const router = express.Router();

// Get Commits & Store in DB
router.get("/commits/:username", async (req, res) => {
  const { username } = req.params;

  try {
    // Get User from DB
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Fetch Commits from GitHub API
    const repos = await axios.get(`https://api.github.com/users/${username}/repos`);
    let allCommits = [];

    for (let repo of repos.data) {
      const commits = await axios.get(`https://api.github.com/repos/${username}/${repo.name}/commits`);
      
      for (let commit of commits.data) {
        const message = commit.commit.message;
        const date = commit.commit.author.date;

        // Generate vector embedding
        const vector = await generateEmbedding(message);

        allCommits.push({ repoName: repo.name, message, date, vector, userId: user._id });
      }
    }

    // Save to MongoDB
    await Commit.insertMany(allCommits);

    res.json({ message: "Commits stored successfully", commits: allCommits });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const cosineSimilarity = (vecA, vecB) => {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return dotProduct / (magA * magB);
  };
  
router.get("/match/:username", async (req, res) => {
    const { username } = req.params;
  
    try {
      const userCommits = await Commit.find({ userId: username });
      const standardCommits = await Commit.find({ userId: "standard_user" });
  
      let totalScore = 0;
  
      for (let userCommit of userCommits) {
        for (let stdCommit of standardCommits) {
          const similarity = cosineSimilarity(userCommit.vector, stdCommit.vector);
          totalScore += similarity;
        }
      }
  
      const avgScore = totalScore / (userCommits.length * standardCommits.length);
      const decision = avgScore > 0.7 ? "Hire" : "No-Hire";
  
      res.json({ avgScore, decision });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
// 🔹 Fetch & Store Commits
router.get("/commits", async (req, res) => {
    const { username } = req.query;
  
    if (!username) return res.status(400).json({ error: "GitHub username required" });
  
    try {
      const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`);
      const repos = reposResponse.data;
  
      let allCommits = [];
  
      for (const repo of repos) {
        const commitsResponse = await axios.get(
          `https://api.github.com/repos/${username}/${repo.name}/commits`
        );
        const commits = commitsResponse.data;
  
        const formattedCommits = commits.map((commit) => ({
          githubId: username,
          repoName: repo.name,
          message: commit.commit.message,
          date: commit.commit.author.date,
        }));
  
        allCommits.push(...formattedCommits);
      }
  
      await Commit.insertMany(allCommits);
      res.json({ message: "Commits fetched & stored", commits: allCommits });
    } catch (error) {
      res.status(500).json({ error: "Error fetching commits" });
    }
  });

router.post("/store-embeddings", async (req, res) => {
    try {
      const commits = await Commit.find({});
  
      const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME);
  
      for (const commit of commits) {
        const vector = await generateEmbedding(commit.message);
        if (vector) {
          await pineconeIndex.upsert([{ id: commit._id.toString(), values: vector }]);
        }
      }
  
      res.json({ message: "Embeddings stored successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error storing embeddings" });
    }
  });

router.get("/match-profile", async (req, res) => {
    try {
      const { username } = req.query;
      if (!username) return res.status(400).json({ error: "GitHub username required" });
  
      const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME);
      const commits = await Commit.find({ githubId: username });
  
      let totalScore = 0;
      let totalCommits = 0;
  
      for (const commit of commits) {
        const vector = await generateEmbedding(commit.message);
        if (vector) {
          const queryResult = await pineconeIndex.query({
            vector,
            topK: 5,
            includeMetadata: true,
          });
  
          const score = queryResult.matches.reduce((sum, match) => sum + match.score, 0);
          totalScore += score;
          totalCommits++;
        }
      }
  
      const averageScore = totalCommits ? totalScore / totalCommits : 0;
      const hiringDecision = averageScore > 0.75 ? "Hire" : "No-Hire";
  
      res.json({ score: averageScore, decision: hiringDecision });
    } catch (error) {
      res.status(500).json({ error: "Error matching profile" });
    }
});  
  
module.exports = router;

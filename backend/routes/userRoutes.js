const  express = require("express");
const  axios = require("axios");
const  User = require("../models/User.js");

const router = express.Router();

// 🔹 Get Candidate Profile Data
router.get("/profile/:githubId", async (req, res) => {
  try {
    const user = await User.findOne({ githubId: req.params.githubId });

    if (!user) return res.status(404).json({ error: "User not found" });

    // Fetch GitHub Profile Data
    const githubData = await axios.get(`https://api.github.com/users/${req.params.githubId}`);
    const repos = await axios.get(`https://api.github.com/users/${req.params.githubId}/repos`);

    const profile = {
      name: githubData.data.name || req.params.githubId,
      avatar: githubData.data.avatar_url,
      bio: githubData.data.bio || "No bio available",
      followers: githubData.data.followers,
      publicRepos: githubData.data.public_repos,
      rankScore: user.rankScore,
      repos: repos.data.map((repo) => ({
        name: repo.name,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        url: repo.html_url,
      })),
    };

    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: "Error fetching GitHub data" });
  }
});

module.exports = router;

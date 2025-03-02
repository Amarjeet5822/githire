const axios = require("axios");

// 🔹 AI-Based Ranking Function
const calculateScore = async (githubId) => {
  
  try {
    const response = await axios.get(`https://api.github.com/users/${githubId}`);
    const repos = await axios.get(`https://api.github.com/users/${githubId}/repos`);
    
    const followers = response.data.followers || 0;
    const publicRepos = response.data.public_repos || 0;
    const stars = repos.data.reduce((total, repo) => total + (repo.stargazers_count || 0), 0);
    
    // 🔹 AI-Based Scoring Formula
    const score = (followers * 3) + (publicRepos * 2) + (stars * 5);

    return score;
  } catch (error) {
    console.error("GitHub API Error:", error);
    return 0;
  }
};

module.exports =  calculateScore;

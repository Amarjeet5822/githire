const express = require("express");
const User = require("../models/User.js");
const adminAuth = require("../middleware/authMiddleware.js");
const calculateScore = require("../utils/githubRanking.js");
// const Job = require("../models/Job.js");
const Application = require("../models/Application.js");
const router = express.Router();

// Get All Users (Admin Only)
router.get("/users", adminAuth, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

// 🔹 Update User Role
router.put("/users/:id", adminAuth, async (req, res) => {
    try {
      const { role } = req.body;
      const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Error updating user" });
    }
  });

//  Approve Candidate
router.put("/users/:id/approve", adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.isApproved = true;
      await user.save();
      res.json({ message: "Candidate approved" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error approving candidate" });
  }
});

//  Delete User (Admin Only)
router.delete("/users/:id", adminAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
});

// 🔹 Update Candidate Score
router.put("/users/:id/rank", adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.rankScore = await calculateScore(user.githubId);
      await user.save();
      res.json({ message: "Candidate ranked successfully", rankScore: user.rankScore });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error ranking user" });
  }
});

// 🔹 Get All Users with Rank Sorting
router.get("/users/ranked", adminAuth, async (req, res) => {
  try {
    const users = await User.find({}).sort({ rankScore: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching ranked users" });
  }
});

// // 🔹 Get All Jobs
// router.get("/jobs", adminAuth, async (req, res) => {
//     try {
//       const jobs = await Job.find();
//       res.json(jobs);
//     } catch (error) {
//       res.status(500).json({ error: "Error fetching jobs" });
//     }
//   });
  
  // // 🔹 Create Job
  // router.post("/jobs", adminAuth, async (req, res) => {
  //   try {
  //     const job = new Job(req.body);
  //     await job.save();
  //     res.status(201).json(job);
  //   } catch (error) {
  //     res.status(400).json({ error: "Error creating job" });
  //   }
  // });
  
  // // 🔹 Update Job
  // router.put("/jobs/:id", adminAuth, async (req, res) => {
  //   try {
  //     const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  //     res.json(job);
  //   } catch (error) {
  //     res.status(500).json({ error: "Error updating job" });
  //   }
  // });
  
  // // 🔹 Delete Job
  // router.delete("/jobs/:id", adminAuth, async (req, res) => {
  //   try {
  //     await Job.findByIdAndDelete(req.params.id);
  //     res.json({ message: "Job deleted" });
  //   } catch (error) {
  //     res.status(500).json({ error: "Error deleting job" });
  //   }
  // });

  
// 🔹 Get All Applications
router.get("/applications", adminAuth, async (req, res) => {
    try {
      const applications = await Application.find().populate("candidateId jobId");
      res.json(applications);
    } catch (error) {
      res.status(500).json({ error: "Error fetching applications" });
    }
  });
  
// 🔹 Update Application Status
router.put("/applications/:id", adminAuth, async (req, res) => {
    try {
      const { status, interviewDate } = req.body;
      const application = await Application.findByIdAndUpdate(
        req.params.id,
        { status, interviewDate },
        { new: true }
      );
      res.json(application);
    } catch (error) {
      res.status(500).json({ error: "Error updating application" });
    }
});
  
// 🔹 Get Admin Analytics
router.get("/analytics", adminAuth, async (req, res) => {
    try {
      const totalJobs = await Job.countDocuments();
      const totalApplications = await Application.countDocuments();
      const totalUsers = await User.countDocuments();
  
      const jobApplicationCount = await Application.aggregate([
        { $group: { _id: "$jobId", count: { $sum: 1 } } },
        { $lookup: { from: "jobs", localField: "_id", foreignField: "_id", as: "job" } },
        { $unwind: "$job" },
        { $project: { _id: 0, jobTitle: "$job.title", count: 1 } },
        { $sort: { count: -1 } },
      ]);
  
      const applicationStatusCount = await Application.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]);
  
      res.json({
        totalJobs,
        totalApplications,
        totalUsers,
        jobApplicationCount,
        applicationStatusCount,
      });
    } catch (error) {
      res.status(500).json({ error: "Error fetching analytics" });
    }
  });
  
module.exports = router;

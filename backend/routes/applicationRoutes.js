// const mongoose = require("mongoose");

// const applicationSchema = new mongoose.Schema(
//   {
//     candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
//     status: {
//       type: String,
//       enum: ["Applied", "Shortlisted", "Interview Scheduled", "Offer Given", "Rejected"],
//       default: "Applied",
//     },
//     interviewDate: { type: Date },
//   },
//   { timestamps: true }
// );

// module.exports =  mongoose.model("Application", applicationSchema);

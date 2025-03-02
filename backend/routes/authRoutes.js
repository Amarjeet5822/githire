const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

// GitHub OAuth Login
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// GitHub OAuth Callback
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  }
);


// 🔹 Logout
router.get("/logout", (req, res) => {
    res.clearCookie("jwt");
    res.json({ message: "Logged out" });
});
module.exports = router;

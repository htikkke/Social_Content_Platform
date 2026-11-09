const authentication = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const prisma = require("../lib/prisma");
const jwt = require("jsonwebtoken");

// Login API
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: "Email and Password are required.",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password!",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid email or password!",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const { password: _, ...userWithoutPassword } = user;
    return res.status(200).json({
      message: "Login Successful!",
      user: userWithoutPassword,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
});
// Log-out-API
router.post("/logout", async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      path: "/",
    });
    return res.status(200).json({
      message: "Successfully logged out!",
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
});
// Restore_Login_State_API
router.get("/", authentication, async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
});

module.exports = router;

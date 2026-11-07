require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const prisma = require("./lib/prisma");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const authentication = require("./middleware/authMiddleware");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());

// Get the user-data from the data-base
app.get("/users", async (req, res) => {
  try {
    const data = await prisma.user.findMany();
    res.json({ data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Post the user-data to data-base
app.post("/users", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      msg: "Username , Email and Password are required.",
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    const { password: _, ...userWithoutPassword } = user;

    return res.status(201).json({ user: userWithoutPassword });
  } catch (e) {
    if (e.code === "P2002") {
      return res.status(409).json({
        error: "User with this username or email already exists!",
      });
    }

    return res.status(500).json({
      error: e.message,
    });
  }
});
// Login API
app.post("/auth/login", async (req, res) => {
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
app.post("/auth/logout", async (req, res) => {
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
app.get("/auth/me", authentication, async (req, res) => {
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
//get-all-the-posts
app.get("/posts", authentication, async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            photoUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json({
      post: posts,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
});
// Run the server
app.listen(8000, () => {
  console.log("Server is running at port-8000.");
});

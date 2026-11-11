const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authentication = require("../middleware/authMiddleware");
const prisma = require("../lib/prisma");

// Get the user-data from the data-base
router.get("/", authentication, async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    const userWithoutPassword = users.map((user) => {
      const { password, ...userWithoutPass } = user;
      return userWithoutPass;
    });
    return res.status(200).json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
// Get the unique user
router.get("/:id", authentication, async (req, res) => {
  const { id } = req.params;
  const userId = Number(id);

  if (!Number.isInteger(userId) || userId <= 0) {
    return res.status(400).json({
      msg: "User-id required.",
    });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).json({
        error: "User not found!",
      });
    }
    const { password: _, ...userWithoutPassword } = user;
    return res.status(200).json({
      message: "User fetched successfully!",
      user: userWithoutPassword,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
// Update the user-profile
router.patch("/:id", authentication, async (req, res) => {
  const { id } = req.params;
  const { username, bio, photoUrl } = req.body;
  const userId = Number(id);
  const trimUsername = username !== undefined ? username.trim() : undefined;

  if (!Number.isInteger(userId) || userId <= 0) {
    return res.status(400).json({
      msg: "User-id required.",
    });
  }
  if (req.user.id !== userId) {
    return res.status(403).json({
      error: "Forbidden: You can only update your own profile!",
    });
  }
  if (username !== undefined && !trimUsername) {
    return res.status(400).json({
      error: "Username cannot be empty.",
    });
  }
  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return res.status(404).json({
        error: "User not found!",
      });
    }
    if (trimUsername && trimUsername !== existingUser.username) {
      const usernameExits = await prisma.user.findUnique({
        where: { username: trimUsername },
      });

      if (usernameExits) {
        return res.status(409).json({
          error: "Username is already taken!",
        });
      }
    }
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(trimUsername !== undefined && { username: trimUsername }),
        ...(bio !== undefined && { bio }),
        ...(photoUrl !== undefined && { photoUrl }),
      },
    });
    const { password: _, ...userWithoutPassword } = updatedUser;

    return res.status(200).json({
      message: "Profile updated successfully!",
      user: userWithoutPassword,
    });
  } catch (e) {
    if (e.code === "P2002") {
      return res.status(409).json({
        error: "Username is already taken!",
      });
    }
    return res.status(500).json({
      error: "Something went wrong while updating profile!",
    });
  }
});
// Post the user-data to data-base
router.post("/", async (req, res) => {
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
//Delete the user
router.delete("/:id", authentication, async (req, res) => {
  const { id } = req.params;
  const userId = Number(id);

  if (!Number.isInteger(userId) || userId <= 0) {
    return res.status(400).json({
      msg: "User-id required.",
    });
  }
  if (req.user.id !== userId) {
    return res.status(403).json({
      error: "Forbidden: You can only delete your own account!",
    });
  }
  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!existingUser) {
      return res.status(404).json({
        error: "User not found!",
      });
    }
    await prisma.user.delete({
      where: { id: userId },
    });

    return res.status(200).json({
      message: "User deleted successfully!",
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;

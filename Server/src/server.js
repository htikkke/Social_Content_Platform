const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const prisma = require("./lib/prisma");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/users", async (req, res) => {
  try {
    const data = await prisma.user.findMany();
    res.json({ data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

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

app.listen(8000, () => {
  console.log("Server is running at port-8000.");
});

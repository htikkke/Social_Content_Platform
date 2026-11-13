require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/users.routes");
const postRoutes = require("./routes/posts.routes");
const commentsRoutes = require("./routes/comments.routes");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/posts", commentsRoutes);
app.use("/comments", commentsRoutes);

// Run the server
app.listen(8000, () => {
  console.log("Server is running at port-8000.");
});

const express = require("express");
const cors = require("cors");
const router = express.Router();


const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Social Content Platform API is running.",
  });
});

app.listen(8000, () => {
  console.log("Server is running at port-8000.");
});

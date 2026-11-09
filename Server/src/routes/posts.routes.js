const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authMiddleware");

//get-all-the-posts
router.get("/posts", authentication, async (req, res) => {
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
module.exports = router;

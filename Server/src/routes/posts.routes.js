const express = require("express");
const router = express.Router();
const prisma = require("../lib/prisma");
const authentication = require("../middleware/authMiddleware");

//get-all-the-posts
router.get("/", authentication, async (req, res) => {
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
// Create a post
router.post("/", authentication, async (req, res) => {
  const { content, imageUrl } = req.body;
  if (typeof content !== "string" || !content.trim()) {
    return res.status(400).json({
      message: "Post content is required!",
    });
  }
  try {
    const userId = req.user.id;
    const post = await prisma.post.create({
      data: { content, imageUrl: imageUrl || null, userId: userId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            photoUrl: true,
          },
        },
      },
    });
    return res.status(201).json({
      message: "Post created successfully!",
      post,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
});
// Get one post
router.get("/:id", authentication, async (req, res) => {
  const { id } = req.params;
  const postId = Number(id);
  if (!id || isNaN(postId)) {
    return res.status(400).json({
      message: "Invalid or missing post-id!",
    });
  }
  if (!Number.isInteger(postId) || postId <= 0) {
    return res.status(400).json({
      message: "Invalid post ID!",
    });
  }
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });
    if (!post) {
      return res.status(404).json({
        message: "Post not found!",
      });
    }
    return res.status(200).json({
      message: "Post fetched successfully!",
      post,
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
});
// Update Own post
router.patch("/:id", authentication, async (req, res) => {
  const { id } = req.params;
  const { content, imageUrl } = req.body;
  const postId = Number(id);

  if (!Number.isInteger(postId) || postId <= 0) {
    return res.status(400).json({
      message: "Invalid post ID!",
    });
  }
  if (content === undefined && imageUrl === undefined) {
    return res.status(400).json({
      message:
        "At least one field (content or imageUrl) is required for update!",
    });
  }
  if (content !== undefined) {
    if (typeof content !== "string" || content.trim() === "") {
      return res.status(400).json({
        message: "Content must be a valid non-empty string!",
      });
    }
  }
  if (
    imageUrl !== undefined &&
    imageUrl !== null &&
    typeof imageUrl !== "string"
  ) {
    return res.status(400).json({
      message: "Image URL must be a string or null!",
    });
  }
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });
    if (!post) {
      return res.status(404).json({
        message: "Post not found!",
      });
    }
    if (post.userId !== req.user.id) {
      return res.status(403).json({
        message: "You can only update your own post!",
      });
    }
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        ...(content !== undefined && { content }),
        ...(imageUrl !== undefined && { imageUrl }),
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            photoUrl: true,
          },
        },
      },
    });
    return res.status(200).json({
      message: "Post updated successfully!",
      post: updatedPost,
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
});
// Delete post
router.delete("/:id", authentication, async (req, res) => {
  const { id } = req.params;
  const postId = Number(id);

  if (!Number.isInteger(postId) || postId <= 0) {
    return res.status(400).json({
      message: "Invalid post ID!",
    });
  }
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });
    if (!post) {
      return res.status(404).json({
        message: "Post not found!",
      });
    }
    if (post.userId !== req.user.id) {
      return res.status(403).json({
        message: "You can only delete your own post!",
      });
    }
    await prisma.post.delete({
      where: { id: postId },
    });
    return res.status(200).json({
      message: "Post deleted successfully!",
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
});
module.exports = router;

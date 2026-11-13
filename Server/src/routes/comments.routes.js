const express = require("express");
const router = express.Router();
const prisma = require("../lib/prisma");
const authentication = require("../middleware/authMiddleware");

// Post a comment
router.post("/:postId/comments", authentication, async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  const parsedPostId = Number(postId);

  if (!Number.isInteger(parsedPostId) || parsedPostId <= 0) {
    return res.status(400).json({
      message: "Invalid Post ID!",
    });
  }
  if (typeof content !== "string" || !content.trim()) {
    return res.status(400).json({
      message: "Post content is required and cannot be empty!",
    });
  }
  try {
    const post = await prisma.post.findUnique({
      where: { id: parsedPostId },
    });
    if (!post) {
      return res.status(404).json({
        message: "Post not found!",
      });
    }
    const comment = await prisma.comment.create({
      data: {
        content: content.trim(),
        postId: parsedPostId,
        userId: req.user.id,
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
    return res.status(201).json({
      message: "Comment created successfully!",
      comment,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
});
// get comments
router.get("/:postId/comments", authentication, async (req, res) => {
  const { postId } = req.params;
  const parsedPostId = Number(postId);

  if (!Number.isInteger(parsedPostId) || parsedPostId <= 0) {
    return res.status(400).json({
      message: "Invalid Post ID!",
    });
  }
  try {
    const post = await prisma.post.findUnique({
      where: { id: parsedPostId },
    });
    if (!post) {
      return res.status(404).json({
        message: "Post not found!",
      });
    }
    const comments = await prisma.comment.findMany({
      where: { postId: parsedPostId },
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
      message: "Comments fetch Successfully!",
      comments,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
});
// Delete comment
router.delete("/:id", authentication, async (req, res) => {
  const { id } = req.params;
  const parsedCommentId = Number(id);

  if (!Number.isInteger(parsedCommentId) || parsedCommentId <= 0) {
    return res.status(400).json({
      message: "Invalid Comment ID!",
    });
  }
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parsedCommentId },
      include: {
        post: {
          select: {
            userId: true,
          },
        },
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    if (!comment) {
      return res.status(404).json({
        message: "Comment not found!",
      });
    }
    const isCommentAuthor = comment.userId === req.user.id;
    const isPostOwner = comment.post.userId === req.user.id;
    if (!isCommentAuthor && !isPostOwner) {
      return res.status(403).json({
        message:
          "You can only delete your own comment or comments on your post!",
      });
    }
    await prisma.comment.delete({
      where: { id: parsedCommentId },
    });
    return res.status(200).json({
      message: "Comment deleted successfully!",
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
});
module.exports = router;

const jwt = require("jsonwebtoken");
const prisma = require("../lib/prisma");

const authentication = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Access denied.No token provided!",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(401).json({
        message: "User no longer exists!",
      });
    }
    const { password: _, ...userWithoutPassword } = user;
    req.user = userWithoutPassword;
    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token!",
    });
  }
};
module.exports = authentication;

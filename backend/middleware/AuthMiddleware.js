const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.userAuth = (req, res, next) => {
  try {
    const token = req.cookies.user || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden: Invalid token" });
      }

      // Attach the decoded token to req.user
      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.checkRole = (req, res, next) => {
  if (!req.user || req.user.role !== 0) {
    return res
      .status(403)
      .json({ message: "Forbidden: Insufficient permissions" });
  }
  next();
};

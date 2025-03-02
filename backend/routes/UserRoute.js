const express = require("express");
const { handleregister } = require("../controller/UserController");
const { registerValidate, loginvalidate } = require("../helper/Validate");
const { handleLogin } = require("../controller/LoginUserController");
const { userAuth, checkRole } = require("../middleware/AuthMiddleware");
const {
  handleAllUsers,
  handleSingleUser,
  handleSingleProfile,
} = require("../controller/GetUserController");
const { handleUserUpdate } = require("../controller/UpdateuserController");
const router = express.Router();

router.post("/register", registerValidate, handleregister);
router.post("/login", loginvalidate, handleLogin);
router.get("/verify", userAuth, (req, res) => {
  res.json({ user: req.user, role: req.user.role });
});
router.get("/profile", userAuth, checkRole, handleAllUsers);
router.get("/profile/:id", userAuth, checkRole, handleSingleUser);
router.post("/update/:id", handleUserUpdate);

// userProfile
router.get("/userProfile/:id", userAuth, checkRole, handleSingleProfile);

router.get("/logout", (req, res) => {
  res.clearCookie("sessionId", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  return res.json({ message: "Logged out successfully" });
});
module.exports = router;

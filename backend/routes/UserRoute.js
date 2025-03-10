const express = require("express");
const { handleregister } = require("../controller/UserController");
const { registerValidate, loginvalidate } = require("../helper/Validate");
const { handleLogin } = require("../controller/LoginUserController");
const {
  userAuth,
  checkRole,
  teacherRole,
} = require("../middleware/AuthMiddleware");
const {
  handleAllUsers,
  handleSingleUser,
  handleSingleProfile,
  fetchStudents,
  fetchTotalTeachers,
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
router.post("/update/:id", userAuth, checkRole, handleUserUpdate);

// userProfile
router.get("/userProfile/:id", userAuth, checkRole, handleSingleProfile);

// STUDENTS ROUTE
router.get("/getStudent", userAuth, teacherRole, fetchStudents);
router.get("/getteacher", userAuth, teacherRole, fetchTotalTeachers);

router.get("/logout", (req, res) => {
  res.clearCookie("sessionId", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  return res.json({ message: "Logged out successfully" });
});
module.exports = router;

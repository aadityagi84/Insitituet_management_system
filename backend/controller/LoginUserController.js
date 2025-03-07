const { validationResult } = require("express-validator");
const { db } = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const userData = `SELECT * FROM users WHERE email = ?`;

    db.query(userData, [email], (err, result) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (result.length === 0) {
        return res.status(400).json({ errors: [{ msg: "User Not Found" }] });
      }

      const user = result[0];
      console.log(user);
      if (user.is_verified === 0 || user.is_verified === null) {
        return res.status(400).json({
          errors: [{ msg: "User Not Verified, Please Contact to Institute" }],
        });
      } else {
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Password" }] });
        }
        const token = jwt.sign(
          { id: user.id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );
        res.cookie("sessionId", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "none",
        });

        return res
          .status(200)
          .json({ msg: "Login Success", token: token, user: user });
      }
    });
  } catch (error) {
    console.error("❌ Error in handleLogin:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while logging in" });
  }
};

module.exports = { handleLogin };

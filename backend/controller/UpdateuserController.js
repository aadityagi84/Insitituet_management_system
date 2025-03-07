const util = require("util");
const { db } = require("../config/db");
db.query = util.promisify(db.query); // Promisify db.query

const handleUserUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, phone, address, is_verified } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ status: "error", message: "User ID is required" });
    }
    if (!name || !email) {
      return res
        .status(400)
        .json({ status: "error", message: "Name and email are required" });
    }

    let roleValue;
    let tableName;
    if (role.toLowerCase() === "teacher") {
      roleValue = "1";
      tableName = "teachers";
    } else if (role.toLowerCase() === "student") {
      roleValue = "2";
      tableName = "students";
    } else {
      return res.status(400).json({
        status: "error",
        message: 'Invalid role. Use "teacher" or "student".',
      });
    }

    // Check if the user exists
    const userResult = await db.query(`SELECT * FROM users WHERE id = ?`, [id]);
    if (userResult.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    // Check if email exists in the opposite role table
    const emailCheckQuery =
      roleValue === "1"
        ? `SELECT * FROM students WHERE email = ?`
        : `SELECT * FROM teachers WHERE email = ?`;
    const emailResult = await db.query(emailCheckQuery, [email]);
    if (emailResult.length > 0) {
      return res.status(400).json({
        status: "error",
        message:
          "Email already exists in the other Profession. Cannot switch Profession.",
      });
    }

    // Update user details in users table
    await db.query(
      `UPDATE users SET name = ?, email = ?, phone = ?, address = ?, is_verified = ?, role = ? WHERE id = ?`,
      [name, email, phone, address, is_verified, roleValue, id]
    );

    // Check if user exists in their respective table
    const roleResult = await db.query(
      `SELECT * FROM ${tableName} WHERE email = ?`,
      [email]
    );
    if (roleResult.length > 0) {
      // Update existing entry in role table
      await db.query(
        `UPDATE ${tableName} SET name = ?, phone = ?, address = ? WHERE email = ?`,
        [name, phone, address, email]
      );
    } else {
      // Insert new entry in role table with user_id
      await db.query(
        `INSERT INTO ${tableName} (user_id, name, email, phone, address) VALUES (?, ?, ?, ?, ?)`,
        [id, name, email, phone, address]
      );
    }

    return res.status(200).json({
      status: "success",
      message: "User details updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = { handleUserUpdate };

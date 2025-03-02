const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { db } = require("../config/db");

const handleregister = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password, role, phone, address } = req.body;

    if (!role) {
      return res.status(400).json({ error: "Role is required" });
    }

    let roleValue;
    if (role.toLowerCase() === "teacher") {
      roleValue = "1";
    } else if (role.toLowerCase() === "student") {
      roleValue = "2";
    } else {
      return res
        .status(400)
        .json({ error: 'Invalid role. Use "teacher" or "student".' });
    }

    // Check if email already exists
    db.query("SELECT id FROM users WHERE email = ?", [email], (err, result) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      if (result.length > 0) {
        return res.status(400).json({ error: "Email already registered" });
      }

      // Hash password before storing
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error("Hashing Error:", err);
          return res.status(500).json({ error: "Password hashing failed" });
        }

        // Insert into Users Table
        db.query(
          `INSERT INTO users (name, email, password, role, phone, address) VALUES (?, ?, ?, ?, ?, ?)`,
          [name, email, hashedPassword, roleValue, phone, address],
          (err, result) => {
            if (err) {
              console.error("Database Insert Error:", err);
              return res
                .status(500)
                .json({ error: "User registration failed" });
            }

            const userId = result.insertId;
            console.log("✅ User Inserted with ID:", userId);

            if (roleValue === "1") {
              // Create Teachers Table if not exists
              db.query(
                `CREATE TABLE IF NOT EXISTS teachers (
                  id INT AUTO_INCREMENT PRIMARY KEY,
                  user_id INT NOT NULL,
                  name VARCHAR(255),
                  email VARCHAR(255),
                  phone VARCHAR(20),
                  address TEXT,
                  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
                )`,
                (err) => {
                  if (err) {
                    console.error("Error Creating Teachers Table:", err);
                    return res
                      .status(500)
                      .json({ error: "Table creation failed" });
                  }

                  // Insert into Teachers Table
                  db.query(
                    "INSERT INTO teachers (user_id, name, email, phone, address) VALUES (?, ?, ?, ?, ?)",
                    [userId, name, email, phone, address],
                    (err) => {
                      if (err) {
                        console.error("Error Inserting Teacher:", err);
                        return res
                          .status(500)
                          .json({ error: "Teacher insert failed" });
                      }
                      res.json({
                        message: "Teacher registered successfully",
                        userId,
                      });
                    }
                  );
                }
              );
            } else if (roleValue === "2") {
              db.query(
                `CREATE TABLE IF NOT EXISTS students (
                  id INT AUTO_INCREMENT PRIMARY KEY,
                  user_id INT NOT NULL,
                  name VARCHAR(255),
                  email VARCHAR(255),
                  phone VARCHAR(20),
                  address TEXT,
                  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
                )`,
                (err) => {
                  if (err) {
                    console.error("Error Creating Students Table:", err);
                    return res
                      .status(500)
                      .json({ error: "Table creation failed" });
                  }

                  // Insert into Students Table
                  db.query(
                    "INSERT INTO students (user_id, name, email, phone, address) VALUES (?, ?, ?, ?, ?)",
                    [userId, name, email, phone, address],
                    (err) => {
                      if (err) {
                        console.error("Error Inserting Student:", err);
                        return res
                          .status(500)
                          .json({ error: "Student insert failed" });
                      }
                      res.json({
                        message: "Student registered successfully",
                        userId,
                      });
                    }
                  );
                }
              );
            }
          }
        );
      });
    });
  } catch (error) {
    console.error("❌ Error in handleregister:", error);
    res
      .status(500)
      .json({ error: "An error occurred while registering the user" });
  }
};

module.exports = { handleregister };

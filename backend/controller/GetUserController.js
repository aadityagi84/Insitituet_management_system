const { db } = require("../config/db");

const handleAllUsers = async (req, res) => {
  try {
    const query =
      "SELECT id, name, email, phone, role,address,is_verified  FROM users LIMIT 100";
    db.query(query, (err, result) => {
      if (err) {
        console.error("Error fetching users: " + err.message);
        return res
          .status(500)
          .json({ status: "error", message: "Internal server error" });
      }
      res.status(200).json({ status: "success", data: result });
    });
  } catch (error) {
    console.error("Unexpected error in handleAllUsers: " + error.message);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

const handleSingleUser = async (req, res) => {
  try {
    const { id } = req.params;

    const query =
      "SELECT id, name, email, phone, role, address, is_verified  FROM users WHERE id = ?";
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error(`Error fetching user ${id}: ` + err.message);
        return res
          .status(500)
          .json({ status: "error", message: "Internal server error" });
      }
      if (result.length === 0) {
        return res
          .status(404)
          .json({ status: "error", message: "User not found" });
      }
      res.status(200).json({ status: "success", data: result[0] });
    });
  } catch (error) {
    console.error("Unexpected error in handleSingleUser: " + error.message);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

const handleSingleProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const query =
      "SELECT id, name, email, phone, role, address  FROM users WHERE id = ?";
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error(`Error fetching user ${id}: ` + err.message);
        return res
          .status(500)
          .json({ status: "error", message: "Internal server error" });
      }
      if (result.length === 0) {
        return res
          .status(404)
          .json({ status: "error", message: "User not found" });
      }
      res.status(200).json({ status: "success", data: result[0] });
    });
  } catch (error) {
    console.error("Unexpected error in handleSingleUser: " + error.message);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

const fetchStudents = async (req, res) => {
  try {
    const query = "SELECT * FROM students";
    db.query(query, (err, result) => {
      if (err) {
        console.error(`Error fetching STUDENTS: ` + err.message);
        return res
          .status(500)
          .json({ status: "error", message: "Internal server error" });
      }

      if (result.length === 0) {
        return res
          .status(404)
          .json({ status: "error", message: "No students found" });
      }

      res.status(200).json({ status: "success", data: result });
    });
  } catch (error) {
    console.error("Unexpected error in fetchStudents: " + error.message);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

module.exports = {
  handleAllUsers,
  handleSingleUser,
  handleSingleProfile,
  fetchStudents,
};

const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
});

const dbconnection = () => {
  db.connect((err) => {
    if (err) {
      console.log("Error connecting to the database:", err.message);
      return;
    }
    console.log("Database connection established.");
    db.query(`CREATE DATABASE IF NOT EXISTS basic_message_app`, (err) => {
      if (err) {
        return console.log("Error creating the database:", err.message);
      }
      console.log("Database 'basic_message_app' is ready.");
      db.query(`USE basic_message_app`, (err) => {
        if (err) {
          return console.log("Error switching to the database:", err.message);
        }
        console.log("Switched to database 'basic_message_app'.");
        const createUserTable = `CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          role INT NOT NULL,
          phone VARCHAR(15),
          address TEXT,
          is_verified BOOLEAN DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`;
        db.query(createUserTable, (err) => {
          if (err) {
            return console.log(
              "Error creating the 'users' table:",
              err.message
            );
          }
          console.log("'users' table is ready.");
        });
      });
    });
  });
};

module.exports = { db, dbconnection };

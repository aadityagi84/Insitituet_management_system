const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const promisePool = db.promise();
const dbconnection = () => {
  promisePool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to the database:", err.message);
      return;
    }
    console.log("Database connection established.");

    // Create the database if it doesn't exist
    connection.query(
      "CREATE DATABASE IF NOT EXISTS basic_message_app",
      (err) => {
        if (err) {
          console.error("Error creating the database:", err.message);
          connection.release();
          return;
        }
        console.log("Database 'basic_message_app' is ready.");

        // Use the created database
        connection.changeUser({ database: "basic_message_app" }, (err) => {
          if (err) {
            console.error("Error switching to the database:", err.message);
            connection.release();
            return;
          }
          console.log("Switched to database 'basic_message_app'.");

          // Create the 'users' table
          const createUserTable = ` CREATE TABLE IF NOT EXISTS users (
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

          connection.query(createUserTable, (err) => {
            if (err) {
              console.error("Error creating the 'users' table:", err.message);
            } else {
              console.log("'users' table is ready.");
            }
            connection.release(); // Always release the connection
          });
        });
      }
    );
  });
};

module.exports = { pool: promisePool, dbconnection };

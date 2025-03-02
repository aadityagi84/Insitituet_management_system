const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const cookie = require("cookie-parser");

const userRoute = require("./routes/UserRoute");
const { dbconnection } = require("./config/db");

// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookie());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// db
dbconnection();

// routes
app.use("/api", userRoute);
app.get("/", (req, res) => {
  res.send("<h1>Hello from Server </h1>");
});
// server port
app.listen(PORT, () => {
  console.log(`Server  will be worked on http://localhost:${PORT}`);
});

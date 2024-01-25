const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

// middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(
  bodyParser.urlencoded({ limit: "30mb", extended: true })
);
app.use(cors());

// routers
const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/task");
const { connection } = require("./database/db");

// use of routers
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

// database connection
connection();

// server running
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

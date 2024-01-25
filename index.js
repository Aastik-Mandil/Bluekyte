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
const bookRoutes = require("./routes/book");
const { connection } = require("./database/db");

// use of routers
app.use("/books", bookRoutes);

// database connection
connection();

// server running
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

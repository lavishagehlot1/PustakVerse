// What is dotenv?
// dotenv is a Node.js package that loads the .env file into process.env.
// That means, after calling dotenv.config(), you can access your variables anywhere in your app like this:
// process.env.MONGO_URL
// process.env.PORT

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// 🔑 1. LOAD ENV VARIABLES FIRST (FORCED PATH)
dotenv.config({ path: __dirname + "/.env" });

// ✅ 2. VERIFY ENV (REMOVE AFTER DEBUGGING)
//console.log("ENV CHECK → CLOUD_API_KEY:", process.env.CLOUD_API_KEY);
//console.log("ENV CHECK → CLOUD_NAME:", process.env.CLOUD_NAME);

const connectDB = require("./config/db");
const allRoutes = require("./Routes/allRoutes");

const app = express();

// 🔹 MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔹 CONNECT DATABASE
connectDB();

// 🔹 ROUTES
app.use("/api", allRoutes);

// 🔹 START SERVER
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth"); // Import the auth routes
const db = require("./db"); // Import database connection

const app = express();

// ✅ Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Allow frontend requests
app.use(express.json()); // Allow JSON parsing

// ✅ Use authentication routes
app.use("/api/auth", authRoutes);

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

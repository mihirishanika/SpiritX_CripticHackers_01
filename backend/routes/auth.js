require("dotenv").config();
const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY || "your_default_secret_key";

// ✅ Check Username Route
router.post("/check-username", async (req, res) => {
    const { username } = req.body;

    if (!username || username.length < 8) {
        return res.status(400).json({ error: "Username must be at least 8 characters long" });
    }

    const checkUserQuery = "SELECT * FROM users WHERE username = ?";
    db.query(checkUserQuery, [username], (err, results) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length > 0) {
            return res.status(400).json({ error: "Username already exists" });
        }

        return res.status(200).json({ message: "Username is available" });
    });
});

// ✅ Signup Route
router.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    console.log("📥 Received Signup Request: ", req.body);

    if (!username || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    if (username.length < 8) {
        return res.status(400).json({ error: "Username must be at least 8 characters long" });
    }

    const checkUserQuery = "SELECT * FROM users WHERE username = ?";
    db.query(checkUserQuery, [username], async (err, results) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length > 0) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("🔑 Hashed Password:", hashedPassword);

        const insertUserQuery = "INSERT INTO users (username, password) VALUES (?, ?)";
        db.query(insertUserQuery, [username, hashedPassword], (err, result) => {
            if (err) {
                console.error("❌ Error creating user:", err);
                return res.status(500).json({ error: "Error creating user" });
            }

            console.log("✅ User created successfully:", result);
            res.status(201).json({ message: "Signup successful" });
        });
    });
});

// ✅ Login Route
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const findUserQuery = "SELECT * FROM users WHERE username = ?";
    db.query(findUserQuery, [username], async (err, results) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token });
    });
});

module.exports = router;


const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("JWT Authentication API is running!");
});

const users = new Map();
const JWT_SECRET = "my_lab_secret_key_12345678901234567890";

// Register
app.post("/register", async (req, res) => {
  const { username, password } = req.body || {};

  if (
    typeof username !== "string" ||
    !username.trim() ||
    typeof password !== "string" ||
    password.length < 6
  ) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const name = username.trim();

  if (users.has(name)) {
    return res.status(409).json({
      error: "Username already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.set(name, { password: hashedPassword });

  res.status(201).json({ message: "User registered" });
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body || {};
  const name = typeof username === "string" ? username.trim() : "";
  const user = users.get(name);

  if (
    !user ||
    typeof password !== "string" ||
    !(await bcrypt.compare(password, user.password))
  ) {
    return res.status(401).json({
      error: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    { username: name },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({ token });
});

// Protected profile
app.get("/profile", (req, res) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const token = header.slice(7);
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded.username !== "string") {
      return res.status(401).json({ error: "Unauthorized" });
    }

    res.status(200).json({ username: decoded.username });
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.listen(3000, () => {
  console.log("JWT API running at http://localhost:3000");
});

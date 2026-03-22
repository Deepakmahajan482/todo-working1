const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const SECRET = "deepak1234";

const notes = [
  { username: "Deepak", note: "go to gym" },
  { username: "Rahul", note: "dinner" }
];

const users = [
  { username: "Deepak", password: "123" },
  { username: "Rahul", password: "123" }
];

// Signup
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  const userExists = users.find(u => u.username === username);
  if (userExists) {
    return res.status(403).json({ message: "User already exists" });
  }

  users.push({ username, password });
  res.json({ message: "User created" });
});

// Signin
app.post("/signin", (req, res) => {
  const { username, password } = req.body;

  const userExists = users.find(
    u => u.username === username && u.password === password
  );

  if (!userExists) {
    return res.status(403).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username }, SECRET);
  res.json({ token });
});

// Create Note
app.post("/notes", (req, res) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(403).json({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    const username = decoded.username;

    const note = req.body.note;
    notes.push({ username, note });

    res.json({ message: "Note added" });
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
});

// Get Notes
app.get("/notes", (req, res) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(403).json({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    const username = decoded.username;

    const userNotes = notes.filter(n => n.username === username);
    res.json({ notes: userNotes });
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
});

// Pages
app.get("/", (req, res) => {
  res.sendFile("D:/mern/caseStudies/express/notes-app/frontend/index.html");
});

app.get("/signup", (req, res) => {
  res.sendFile("D:/mern/caseStudies/express/notes-app/frontend/signup.html");
});

app.get("/signin", (req, res) => {
  res.sendFile("D:/mern/caseStudies/express/notes-app/frontend/signin.html");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
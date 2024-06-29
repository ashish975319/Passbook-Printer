const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS with specific origin (replace 'http://localhost:5173' with your Vite frontend URL)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"], // Add methods as needed
    allowedHeaders: ["Content-Type"],
  })
);

// Example route for login
app.get("/OlioSwitch/passbook/login", (req, res) => {
  const { userId } = req.query;

  // Dummy response for the login route
  res.json({
    message: "Login successful",
    userId,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

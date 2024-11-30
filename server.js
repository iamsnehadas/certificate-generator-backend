const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const certificateRoutes = require("./routes/certificateRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "https://certificate-generator-frontend-hazel.vercel.app", // Allow frontend URL
    methods: ["GET", "POST"], // Allowed methods
    credentials: true, // Support credentials if needed
  })
);

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://snehadas0819:dTNxextxRMBsNZOM@cluster0.fbrtq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Root Route
app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

// Routes
app.use("/api/certificates", certificateRoutes);

// Server
const PORT = process.env.PORT || 5000; // Use dynamic PORT for deployment
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

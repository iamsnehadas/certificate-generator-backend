const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const certificateRoutes = require("./routes/certificateRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome to the Certificate Generator API");
});
// MongoDB Connection using environment variables
const mongoURI = process.env.MONGO_URI; // MongoDB URI from environment variable
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/certificates", certificateRoutes);

// Server
const PORT = process.env.PORT || 5000; // Dynamic port for Render
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

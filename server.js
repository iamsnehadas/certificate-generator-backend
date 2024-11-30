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

// Routes
app.use("/api/certificates", certificateRoutes);

// Server
const PORT = 5000; // Local development port
app.listen(PORT, () =>
  console.log(`Server running at https://certificate-generator-backend-orcin.vercel.app/`)
);

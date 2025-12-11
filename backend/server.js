import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import replifyRoutes from "./routes/replify.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/replify", replifyRoutes);

app.listen(PORT, () => 
	console.log(
		`Server Running on http://localhost:${PORT}`
	)
	 );
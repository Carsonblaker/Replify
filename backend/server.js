import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import workoutRoutes from "./routes/replify.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
	res.status(200).send("OK");
});

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/workouts", workoutRoutes);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}`

));
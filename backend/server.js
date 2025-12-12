import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import workoutRoutes from "./routes/replify.js";

dotenv.config();

const app = express();

app.use(
	cors({
		// Replace the placeholders with your actual frontend URLs
		origin: ['http://localhost:5173', 'https://replify-4qkc.onrender.com'],
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true,
})
);

app.use(express.json());

//API
app.get("/api/health", (req, res) => {
	res.status(200).send("OK");
});
app.get("/api", (req, res) => {
	res.send("Replify API is running");
});

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/workouts", workoutRoutes);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.use((req, res, next) => {
	res.status(404).send("API Endpoint Not Found");
});

app.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}`

));
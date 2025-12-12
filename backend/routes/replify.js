import express from "express";
import Replify from "../models/Replify.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/* ------------------------------------------------------
   GET /api/workouts
   Gets all workouts for the logged-in user
------------------------------------------------------ */
router.get("/", async (req, res) => {
  try {
    const workouts = await Replify.find({})
      .sort({ createdAt: -1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ------------------------------------------------------
   POST /api/workouts
   Creates a new workout tied to the logged-in user
------------------------------------------------------ */
router.post("/", async (req, res) => {
  try {
    const replify = await Replify.create({
    name: req.body.name,
				exercises: req.body.exercises,
    });
				
    res.status(201).json(replify);
  } catch (error) {
			console.error("Mongoose POST validation Erroe:", error.message);
    res.status(400).json({ error: error.message });
  }
});

/* ------------------------------------------------------
   GET /api/workouts/:id
   Gets a single workout, only if it belongs to the user
------------------------------------------------------ */
router.get("/:id", auth, async (req, res) => {
  try {
    const workout = await Replify.findOne({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!workout) {
      return res.status(404).json({ error: "Workout Not Found" });
    }

    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ------------------------------------------------------
   PATCH /api/workouts/:id
   Updates a workout owned by the user
------------------------------------------------------ */
router.patch("/:id", auth, async (req, res) => {
  try {
    const updatedWorkout = await Replify.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );

    if (!updatedWorkout) {
      return res.status(404).json({ error: "Workout Not Found" });
    }

    res.json(updatedWorkout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* ------------------------------------------------------
   DELETE /api/workouts/:id
   Deletes a workout owned by the user
------------------------------------------------------ */
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Replify.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!deleted) {
      return res.status(404).json({ error: "Workout Not Found" });
    }

    res.json({ message: "Workout Deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
import express from "express";
import Replify from "../models/Replify.js";

const router = express.Router();

/*
GET/API/workouts
Get all past workouts 
*/
router.get("/", async (req, res) => {
	try {
		const replify = await Replify.find().sort({ createdAt: -1 });
		res.json(replify);
		}catch (error) {
			res.status(500).json({ error: error.message });
		}
});

/*
POST /API/ workouts
Creates new workout
*/
router.post("/", async (req, res) => {
	try {
		const replify = new Replify(req.body)
		await replify.save();
		res.status(201).json(replify);
	} catch (error) {
		res.status(400).json({error: error.message });
	}
});

//GET /api/workouts/:id: view the full, detailed log of a single workout.
/*
GET /API/workouts
Views a single Workout
*/
router.get("/:id", async (req, res) => {
	try {
		const workout = await Replify.findById(req.params.id);
		if (!workout) {
			return res.status(404).json({ error: "Workout Not Found"	});
		}
			res.json(workout);
		} catch (error) {
			res.setMaxListeners(500).json({ error: error.message });
		}
});

//PATCH /api/workouts/:id: allow the user to edit and correct any errors in a saved log.
/*
PATCH /API/workouts
Edit a saved Workout
*/
router.patch("/:id" , async (req,res) => {
	try {
		const updateWorkout = await Replify.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true} 
		);
		if (!updateWorkout) {
			return res,staus(404).json ({ error: "Workout Not Found"}) 
		}
		res.json(updateWorkout);

		} catch (error) {
			res.status(400).json({ error: error.message});
		}
});


//DELETE /api/workouts/:id:  let the user remove an incorrect log entry.
/*
DELETE /API/workouts
Deletes a workout
*/
router.delete("/id", async (req,res) => {
	try {
		const deleteWorkout = await Replify.findByIdAndDelete(req.params.id);
			if(!deleteWorkout) {
				return res.status(404).json({ error: "Workout Not Found"})

			}
			res.json({ message: "Workout Deleted" });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
});

export default router;
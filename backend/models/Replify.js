
import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  exercise: String,
  sets: Number,
  reps: Number,
  weight: Number,
  notes: String
});

const replifySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  date: { type: Date, default: Date.now },
  name: String,
  duration: Number,
  totalVolume: Number,
  rating: Number,

  reflection: String,
  mood: String,

  exercises: [exerciseSchema]
}, { timestamps: true });

export default mongoose.model("Replify", replifySchema);
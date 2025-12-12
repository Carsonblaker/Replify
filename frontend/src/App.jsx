import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Home from "./Home";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [form, setForm] = useState({
    exercise: "",
    weight: "",
    reps: "",
    notes: ""
  });

  // Fetch all workouts
  const fetchWorkouts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/workouts/`);
      const data = await res.json();
      setWorkouts(data);
    } catch (err) {
      console.error("Failed to load workouts:", err);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Submit workout
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if(!token)  {
      SpeechRecognitionAlternative("PLease Log in to submit a workout");
      return;
    }

    const exerciseData = {
      exercise: form.exercise,
      sets: 1,
      weight: form.weight === "" ? null : Number(form.weight),
      reps: form.reps === ""? null : Number(form.reps),
      notes: form.notes,
    };

    const payload = {
     name: form.exercise || "New Workout",
     exercises: [exerciseData],
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/workouts/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", 
          "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify(payload),
      });

      if (!res.ok) {

        const errorData = await res.json();
        console.error("failed to add workout:", errorData);
        alert(`Workout submission failed: ${errorData.error || 'Server rejected request'}`);
        return;
      }

        setForm({
          exercise: "",
          weight: "",
          reps: "",
          notes: ""
        });
        fetchWorkouts();
  
    } catch (err) {
      console.error("Error submitting workout", err);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth pages */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* MAIN WORKOUT PAGE */}
        <Route
          path="/"
          element={
            <Home
              form={form}
              workouts={workouts}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
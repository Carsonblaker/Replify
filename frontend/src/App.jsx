import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Home from "./Home"; // your workout page

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

const API_URL = "http://localhost:3000/api/replify";
const API = import.meta.env.VITE_API_URL;

function App() {
  //Replify code here
  const [workouts, setworkouts] = useState([]);
  const [form, setForm] = useState({
    exercise: "",
    weight: "",
    reps: "",
    notes: ""
  });

  
  const fetchWorkouts = async () => {
    try {
      const res = await fetch(`${API}/api/replify`);
      const data = await res.json();
      setWorkouts(data);
    } catch(err) {
      console.error("Failed to load workouts:", error);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/replify`, {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if(res.ok) {
        setForm({
          exercise: "",
          weight: "",
          reps: "",
          notes: ""
        });
        fetchWorkouts();
      }
     }  catch(err) {
      console.error("Error submitting workout", err);
      }
  };
  return (
    //Replify app UI goes here
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
    <h1>REPLIFY</h1>

    {/* FORM */}
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <input
        name="exercise"
        placeholder="Exercise"
        value={form.exercise}
        onChange={handleChange}
      />
      <input
        name="weight"
        placeholder="Weight"
        value={form.weight}
        onChange={handleChange}
      />
      <input
        name="reps"
        placeholder="Reps"
        value={form.reps}
        onChange={handleChange}
      />
     <label className="journal-label"></label>
<textarea
  placeholder="Reflect on how you felt today"
  value={form.notes}
  onChange={(e) => setForm({ ...form, notes: e.target.value })}
/>

      <button type="submit">Add Workout</button>
    </form>

    {/* WORKOUT LIST */}
    <h2>Workout History</h2>
    {workouts.length === 0 ? (
      <p>No workouts logged yet.</p>
    ) : (
      workouts.map((w) => (
        <div
          key={w._id}
          style={{
            padding: "1rem",
            border: "1px solid #ddd",
            marginBottom: "1rem",
            borderRadius: "8px"
          }}
        >
          <h3>{w.exercise}</h3>
          <p>Weight: {w.weight}</p>
          <p>Reps: {w.reps}</p>
          <p>Notes: {w.notes}</p>
          <p><small>{new Date(w.createdAt).toLocaleString()}</small></p>
        </div>
      ))
    )}
  </div>
);
}
export default App

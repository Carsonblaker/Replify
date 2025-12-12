// src/Home.jsx
import React from 'react';

const Home = ({ form, workouts, handleChange, handleSubmit }) => {
  return (
    <div className="home-page">
      <h1>Your Workout Dashboard</h1>

      {/* 1. NEW WORKOUT FORM */}
      <form className="workout-form" onSubmit={handleSubmit}>
        <h2>Log New Workout</h2>
        {/* Input fields using props */}
        <input type="text" name="exercise" value={form.exercise} onChange={handleChange} placeholder="Exercise" required />
        <input type="number" name="weight" value={form.weight} onChange={handleChange} placeholder="Weight" />
        <input type="number" name="reps" value={form.reps} onChange={handleChange} placeholder="Reps" />
        <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" />
        
        <button type="submit">Add Workout</button>
      </form>
      
      <hr/>

      {/* 2. LOGGED WORKOUTS LIST */}
      <section className="workout-list">
        <h2>Logged Workouts ({workouts.length})</h2>
        {workouts.length === 0 ? (
          <p>No workouts found. Log your first one above!</p>
        ) : (
          <ul>
            {workouts.map((workout) => (
              <li key={workout._id} className="workout-item">
                <strong>{workout.exercise}</strong>: {workout.weight} lbs x {workout.reps} reps 
                {workout.notes && <span> ({workout.notes})</span>}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Home;
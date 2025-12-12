📘 Replify
Workout logger to maintain your training, and to calm your thoughts within your jorunal.

🚀 Overview
Briefly describe: This is a workout logger that logs your workouts, add in what you did, for how much weight, and for how many reps and sets you did of that exercise. Then add into your jounral entry or how you feel or however you want to use the journal.

What your application does
Student athletes, Fitness people
The core problem it solves
Example: A full stack development app that helps eveyrday students or athletes to keep a consistent time they go to the gym. This tracker keeps you workouts and lets you see when you did or didnt go to the gym from past workout logs. 

🌐 Live Demo
Type	Link
Frontend (Deployed Site)	https://jolly-peony-3810a7.netlify.app/
Backend (API Base URL)	
Test these in an incognito window before submission.

✨ Features
Log Exercise, weights, reps, journal Notes
Responsive UI with reusable components
Frontend uses (WorkoutCard, AuthForm, )
Backend API with full CRUD operations
POST to create a workout
GET to read workouts
DELETE deletes a workout
PATCH To UPDDATE a workout
Data persisted in MongoDB
Advanced feature: describe yours clearly
My advanced feature is a simple authentication Login and Password with dashes with the password. It is to make sure your logs and journals are private to the user only and no one else. 

📸 Screenshots
Include 2–4 screenshots of your app. Use relative paths (e.g., /screenshots/home.png) or full URLs.
![screenshot](home.png)
![screenshot1](Login.png)
![screenshot2](Signup.png)
🏗️ Project Architecture
Describe how the pieces fit together.

/frontend
  /src
    /App.css
				/App.jsx
				/auth.css
				/index.css
				/main.jsx
				App.css is the home css file to connect to app.jsx. auth.css and index.css are the css for the signup andlogin page

/backend
  /models
		/middleware
  /routes
  server.js
Include a sentence explaining the flow: The flow of the backend is models to middleware to connect the authentication to the routes and then server

The React frontend commincates with the Express backend through the API routes. The Backend interacts with MONGO using Mongoose models, and enviorment variables are used to store secerets.

📦 Installation & Setup
1. Clone the project
git clone https://github.com/Carsonblaker/Replify
cd Replify
2. Environment Variables
Include a .env.example file in both repos.

Backend .env.example:

MONGO_URI=your_mongodb_url
PORT=4000
JWT_SECRET=your_secret_if_using_auth
API_KEY=if_using_external_apis
Frontend .env.example:

VITE_API_URL=https://replify-4qkc.onrender.com
3. Install Dependencies
Frontend:
cd frontend
npm install
npm run dev
Backend:
cd backend
npm install
npm run dev
4. Running Entire App Locally
Start backend on http://localhost:4000
Start frontend on http://localhost:5173
Confirm CORS + API requests are working
🛠 API Documentation
Document the main 3–5 routes:
GET /api/auth

POST/auth

PATCH/auth/:id

DELETE/auth/:is

auth.js

🚀 Deployment Notes
Document where/how you deployed:

Frontend
Vercel / Netlify

Backend
Render / Railway
Note environment variable setup
🎥 Video Walkthrough
Link to Loom/YouTube: https://your-video-link.com

Include quick timestamps if you want extra professionalism:

0:00–0:30 Overview
0:30–1:30 Core features demo
1:30–2:30 Advanced feature
2:30–3:00 Technical challenge solved
🧠 Reflection
(This section is required for grading.)

1. What was the hardest part of this project?
Write 3–5 sentences.

2. What are you most proud of?
Could be a feature, a UI improvement, debugging work, or personal growth.

3. What would you do differently next time?
Think in terms of planning, scoping, or tech choices.

4. How did you incorporate feedback from the 12/5 check-in gallery?
Be explicit (this is graded):

“Based on feedback, I reduced scope by removing X and focused on stabilizing Y.” “I reorganized my components for readability after feedback about structure.”

Acknowledgments / AI Usage Disclosure
Include a brief note on tools used (per academic integrity guidelines):

Examples:

“Used ChatGPT to help troubleshoot a CORS issue.”
“Used Claude for help writing documentation.”
“Used VSCode Copilot for autocomplete suggestions.”
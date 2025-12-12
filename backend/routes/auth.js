import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Make sure all fields exist
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered." });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    // 5. Create JWT token
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Signup successful!",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
	try {
			const { email, password } = req.body;

			// 1. Check for missing fields
			if (!email || !password) {
					return res.status(400).json({ error: "Email and password are required." });
			}

			// 2. Find user by email
			const user = await User.findOne({ email });
			if (!user) {
					return res.status(400).json({ error: "Invalid email or password." });
			}

			// 3. Compare password
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
					return res.status(400).json({ error: "Invalid email or password." });
			}

			// 4. Create JWT token
			const token = jwt.sign(
					{ userId: user._id },
					process.env.JWT_SECRET,
					{ expiresIn: "7d" }
			);

			res.json({
					message: "Login successful!",
					token,
					user: {
							id: user._id,
							username: user.username,
							email: user.email
					}
			});

	} catch (error) {
			res.status(500).json({ error: error.message });
	}
});
export default router;
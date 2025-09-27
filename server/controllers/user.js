// controllers/user.js
import User from './../models/User.js';
import bcrypt from 'bcrypt';       // 🔑 for hashing passwords
import jwt from 'jsonwebtoken';    // 🔑 for JWT

// ------------------ SIGNUP ------------------
const postSignup = async (req, res) => {
  const { name, email, password, city } = req.body;

  // ✅ Validate all fields
  if (!name || !email || !password || !city) {
    return res.status(400).json({
      message: "All fields are required",
      data: null,
      success: false,
    });
  }

  try {
    // ✅ Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
        data: null,
        success: false,
      });
    }

    // 🔑 Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new user with hashed password
    const newUser = new User({ name, email, password: hashedPassword, city });
    const savedUser = await newUser.save();

    return res.status(201).json({
      message: "Signup Successful",
      data: savedUser,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: null,
      success: false,
    });
  }
};

// ------------------ LOGIN ------------------
const postLogin = async (req, res) => {
  const { email, password } = req.body;

  // ✅ Validate email & password
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
      data: null,
      success: false,
    });
  }

  try {
    const user = await User.findOne({ email });

    // ✅ If user not found
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
        data: null,
        success: false,
      });
    }

    // 🔑 Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    // 🔑 Generate JWT token (1h expiry)
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login Successful",
      token, // send token to frontend
      data: user,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: null,
      success: false,
    });
  }
};

export { postSignup, postLogin };

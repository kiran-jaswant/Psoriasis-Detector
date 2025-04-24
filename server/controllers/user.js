import User from './../models/User.js';

const postSignup = async (req, res) => {
  const { name, email, password, city } = req.body;

  if (!name || !email || !password || !city) {
    return res.status(400).json({
      message: "All fields are required",
      data: null,
      success: false,
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
        data: null,
        success: false,
      });
    }

    const newUser = new User({ name, email, password, city });
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

const postLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
      data: null,
      success: false,
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({
        message: "Invalid email or password",
        data: null,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Login Successful",
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

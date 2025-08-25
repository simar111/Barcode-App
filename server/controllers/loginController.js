// controllers/authController.js
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const Staff = require("../models/Staff");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Try finding in Admin first
    let user = await Admin.findOne({ email });
    let role = "admin";

    if (!user) {
      // If not admin, check in Staff
      user = await Staff.findOne({ email });
      role = "staff";
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Success response (Later you can add JWT token here)
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        role,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default login;


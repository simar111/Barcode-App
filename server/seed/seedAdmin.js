// seed/seedAdmin.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import connectDB from "../config/db.js";

dotenv.config();

connectDB();

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      console.log("Admin already exists");
      process.exit();
    }

    const admin = new User({
      name: "Admin User",
      email: "admin@pos.com",
      password: "admin123", // bcrypt se hash hoga model me
      role: "admin",
    });

    await admin.save();
    console.log("Admin created successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();

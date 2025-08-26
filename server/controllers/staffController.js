import bcrypt from "bcryptjs";
import Staff from "../models/staffModel.js";

// Add new staff
export const addStaff = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) {
      return res.status(400).json({ message: "Staff already exists" });
    }

    // 🔥 HASH THE PASSWORD BEFORE SAVING
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const staff = new Staff({ 
      email, 
      password: hashedPassword // Store hashed password
    });
    
    await staff.save();

    res.status(201).json({ 
      message: "Staff created successfully", 
      staff: {
        id: staff._id,
        email: staff.email
        // Don't send password back in response
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all staff
export const getStaff = async (req, res) => {
  try {
    const staff = await Staff.find().select('-password'); // Exclude password from response
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get single staff by ID
export const getStaffById = async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await Staff.findById(id).select('-password'); // Exclude password

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update staff
export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;

    let updateData = { email };
    
    // 🔥 HASH PASSWORD IF PROVIDED
    if (password) {
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(password, saltRounds);
    }

    const updatedStaff = await Staff.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).select('-password'); // Exclude password from response

    if (!updatedStaff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.json({ message: "Staff updated successfully", updatedStaff });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete staff
export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStaff = await Staff.findByIdAndDelete(id);

    if (!deletedStaff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.json({ message: "Staff deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

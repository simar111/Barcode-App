import Staff from "../models/Staff.js";

// Add new staff
export const addStaff = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) {
      return res.status(400).json({ message: "Staff already exists" });
    }

    const staff = new Staff({ email, password });
    await staff.save();

    res.status(201).json({ message: "Staff created successfully", staff });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all staff
export const getStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
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

    const updatedStaff = await Staff.findByIdAndUpdate(
      id,
      { email, password },
      { new: true }
    );

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

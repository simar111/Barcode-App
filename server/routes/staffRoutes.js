import express from "express"
const router = express.Router();
const {
  addStaff,
  deleteStaff,
  updateStaff,
  getStaffs,
  getStaffById
} = require("../controllers/staffController");

// Create new staff
router.post("/add", addStaff);

// Get all staff members
router.get("/", getStaffs);

// Get single staff by ID
router.get("/:id", getStaffById);

// Update staff by ID
router.put("/:id", updateStaff);

// Delete staff by ID
router.delete("/:id", deleteStaff);

export default router;

import express from "express"
const router = express.Router();
import { addStaff,getStaffs,getStaffById,updateStaff,deleteStaff } from "../controllers/staffController.js";                 


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

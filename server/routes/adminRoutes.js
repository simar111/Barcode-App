import express from "express"
const router = express.Router();
import { addAdmin,getAdmins,getAdminById,updateAdmin,deleteAdmin } from "../controllers/adminController";

// Create new admin
router.post("/add", addAdmin);

// Get all admins
router.get("/", getAdmins);

// Get single admin by ID
router.get("/:id", getAdminById);

// Update admin by ID
router.put("/:id", updateAdmin);

// Delete admin by ID
router.delete("/:id", deleteAdmin);

export default router;

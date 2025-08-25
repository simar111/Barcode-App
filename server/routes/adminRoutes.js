const express = require("express");
const router = express.Router();
const {
  addAdmin,
  deleteAdmin,
  updateAdmin,
  getAdmins,
  getAdminById
} = require("../controllers/adminController");

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

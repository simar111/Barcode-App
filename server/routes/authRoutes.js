import express from "express";
import { register, login, getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", getAllUsers);
router.get("/:id", getUserById); 
router.put("/:id", updateUser); 
router.delete("/:id", deleteUser); 

export default router;

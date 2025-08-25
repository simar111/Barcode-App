// server.js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import loginRoutes from "./routes/loginRoutes.js"
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

// Apply CORS middleware (allow all origins by default)
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/login",loginRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./models/user.js";
import authRoutes from "./routes/authroutes.js";
import postRoutes from "./routes/postroutes.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running" });
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
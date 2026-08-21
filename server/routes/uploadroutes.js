import express from "express";
import upload from "../middleware/upload.js";
import verifyToken from "../middleware/verifyToken.js";
const router = express.Router();
router.post("/", verifyToken, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({ url: req.file.path });
});

export default router;

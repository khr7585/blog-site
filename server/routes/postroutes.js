import express from "express";
import verifyToken from "../middleware/verifytoken.js";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postcontrollers.js";

const router = express.Router();
router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", verifyToken, createPost);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);
export default router;

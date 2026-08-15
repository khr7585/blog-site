import express from "express";
import { registerUser, loginUser, deleteUser} from "../controllers/authcontrollers.js";
const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/:id", deleteUser);
export default router;
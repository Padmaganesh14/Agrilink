import express from "express";
import { login, register, updateProfile } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.put("/update", updateProfile);

export default router;

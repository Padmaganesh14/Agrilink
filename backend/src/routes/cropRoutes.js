import express from "express";
import { getCrops, addCrop, deleteCrop } from "../controllers/cropController.js";

const router = express.Router();

router.get("/", getCrops);
router.post("/", addCrop);
router.delete("/:id", deleteCrop);

export default router;

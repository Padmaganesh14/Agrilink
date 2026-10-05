import express from "express";
import { triggerN8nMasterWorkflow } from "../services/n8nService.js";

const router = express.Router();

router.post("/trigger", async (req, res) => {
  const result = await triggerN8nMasterWorkflow(req.body);
  if (result) res.json({ success: true, data: result });
  else res.status(500).json({ success: false, message: "Failed to reach n8n" });
});

export default router;

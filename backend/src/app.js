import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import marketRoutes from "./routes/marketRoutes.js";
import cropRoutes from "./routes/cropRoutes.js";
import promotionRoutes from "./routes/promotionRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import transportRoutes from "./routes/transportRoutes.js";
import trackingRoutes from "./routes/trackingRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(morgan("dev"));

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    service: "AgriLink AI Backend",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// Route Mounts
app.use("/api/auth", authRoutes);
app.use("/api/market", marketRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/promotion", promotionRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/transport", transportRoutes);
app.use("/api/tracking", trackingRoutes);
app.use("/api/stats", statsRoutes);

// Fallback 404
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Central Error Handler
app.use(errorHandler);

export default app;

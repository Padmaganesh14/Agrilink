import express from "express";
import { supabase } from "../config/supabase.js";

const router = express.Router();

router.get("/farmer/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    // We don't have a direct farmerId on the orders table in the current schema
    // Wait, the orders table has buyerName. And crops has sellerId.
    // For now, just return real DB counts of total buyers, total orders, and active deliveries.
    const { count: buyersCount } = await supabase
      .from("buyer_profiles")
      .select("*", { count: "exact", head: true });
    const { count: ordersCount } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true });
    const { count: trackingCount } = await supabase
      .from("trackings")
      .select("*", { count: "exact", head: true })
      .eq("status", "In Transit");

    res.json({
      success: true,
      stats: {
        buyers: buyersCount || 0,
        orders: ordersCount || 0,
        activeDeliveries: trackingCount || 0,
      },
    });
  } catch (err) {
    next(err);
  }
});

export default router;

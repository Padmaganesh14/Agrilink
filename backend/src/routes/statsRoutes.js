import express from "express";
import { supabase } from "../config/supabase.js";

const router = express.Router();

router.get("/farmer/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    // Total buyers interacting with this seller's crops
    // Actually, simple count of buyers in the DB is fine for a marketplace overview,
    // or we can count unique buyers who ordered from this seller. Let's count total orders for this seller.
    const { count: buyersCount } = await supabase
      .from("buyer_profiles")
      .select("*", { count: "exact", head: true });
      
    const { count: ordersCount } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("sellerId", id);

    // Trackings linked to this seller's orders
    const { data: sellerOrders } = await supabase
      .from("orders")
      .select("orderId")
      .eq("sellerId", id);
      
    const orderIds = sellerOrders ? sellerOrders.map(o => o.orderId) : [];
    
    let trackingCount = 0;
    if (orderIds.length > 0) {
      const { count } = await supabase
        .from("trackings")
        .select("*", { count: "exact", head: true })
        .in("orderId", orderIds)
        .eq("status", "In Transit");
      trackingCount = count || 0;
    }

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

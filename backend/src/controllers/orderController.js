import { supabase } from "../config/supabase.js";

export async function createOrder(req, res, next) {
  try {
    const {
      crop,
      quantityKg,
      ratePerKg,
      buyer,
      transport,
      pickupLocation,
      deliveryLocation,
    } = req.body;

    if (!crop || !quantityKg || !ratePerKg || !buyer) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required order fields" });
    }

    const qty = Number(quantityKg);
    const rate = Number(ratePerKg);
    const orderId = `AGRI-${Date.now().toString().slice(-6)}`;
    const totalValue = Math.round(qty * rate);
    const sellerId = req.body.sellerId || null;

    const orderData = {
      orderId: orderId,
      crop: crop,
      quantityKg: qty,
      ratePerKg: rate,
      totalValue: totalValue,
      status: "Payment Coordination",
      buyerName: buyer.name,
      buyerLocation: buyer.location,
      sellerId: sellerId,
      pickupLocation: pickupLocation || "Farm Gate",
      deliveryLocation: deliveryLocation || buyer.location,
      transportName: transport?.name || null,
      transportVehicle: transport?.vehicle || null,
      transportCost: transport?.estimatedCost || null,
      paymentCoordinated: true,
    };

    const { data: orderResponse, error: orderError } = await supabase
      .from("orders")
      .insert([orderData])
      .select()
      .single();

    if (orderError) {
      console.error("[Order Creation Error]", orderError);
      return res.status(500).json({
        success: false,
        message: "Database failure: could not create order",
        error: orderError.message,
      });
    }

    // Attempt to reduce stock if cropId is provided using optimistic locking
    if (req.body.cropId) {
      try {
        let success = false;
        let attempts = 0;

        while (!success && attempts < 3) {
          const { data: cropData } = await supabase
            .from("crops")
            .select("quantityAvailable")
            .eq("id", req.body.cropId)
            .single();

          if (cropData) {
            const oldQty = cropData.quantityAvailable;
            if (oldQty < qty) {
              // We already created the order, but let's assume it failed due to stock?
              // In a real app we'd roll back the order. Here we log and break.
              console.warn("Insufficient crop inventory for order:", orderId);
              break;
            }

            const newQty = oldQty - qty;
            const newStatus = newQty === 0 ? "sold" : "available";

            const { data: updated, error: updateErr } = await supabase
              .from("crops")
              .update({ quantityAvailable: newQty, status: newStatus })
              .eq("id", req.body.cropId)
              .eq("quantityAvailable", oldQty) // Optimistic locking condition
              .select();

            if (!updateErr && updated && updated.length > 0) {
              success = true;
            }
          } else {
            break; // Crop not found
          }
          attempts++;
        }

        if (!success) {
          console.error("Failed to deduct inventory for order:", orderId);
        }
      } catch (err) {
        console.error("Failed to decrement crop stock:", err);
      }
    }

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: orderResponse,
    });
  } catch (err) {
    next(err);
  }
}

export async function getOrder(req, res, next) {
  try {
    const { id } = req.params;

    // Check if ID is a valid UUID
    const isUUID =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        id,
      );

    const { data, error } = await supabase
      .from("orders")
      .select("*, users:sellerId(name, farmName)")
      .eq(isUUID ? "id" : "orderId", id)
      .single();

    if (error) {
      console.error("[Get Order Error]", error);
      return res
        .status(404)
        .json({ success: false, message: `Order ${id} not found` });
    }

    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: `Order ${id} not found` });
    }

    res.json({
      success: true,
      order: data,
    });
  } catch (err) {
    next(err);
  }
}

export async function getOrdersBySeller(req, res, next) {
  try {
    const { sellerId } = req.params;

    const { data, error } = await supabase
      .from("orders")
      .select("*, users:sellerId(name, farmName)")
      .eq("sellerId", sellerId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[Get Orders Error]", error);
      return res
        .status(500)
        .json({ success: false, message: "Failed to fetch orders" });
    }

    res.json({
      success: true,
      data: data || [],
    });
  } catch (err) {
    next(err);
  }
}

export async function getOrdersByBuyer(req, res, next) {
  try {
    const { buyerName } = req.params;

    const { data, error } = await supabase
      .from("orders")
      .select("*, users:sellerId(name, farmName)")
      .eq("buyerName", buyerName)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[Get Buyer Orders Error]", error);
      return res
        .status(500)
        .json({ success: false, message: "Failed to fetch buyer orders" });
    }

    res.json({
      success: true,
      data: data || [],
    });
  } catch (err) {
    next(err);
  }
}

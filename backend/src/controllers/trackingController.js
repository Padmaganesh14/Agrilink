import { supabase } from "../config/supabase.js";

export async function startTracking(req, res, next) {
  try {
    const { orderId, origin, destination, distanceKm, etaHours } = req.body;

    if (!orderId || !origin || !destination) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required tracking fields (orderId, origin, destination)",
      });
    }

    if (!distanceKm || !etaHours) {
      return res.status(400).json({
        success: false,
        message: "Missing required tracking distance or ETA.",
      });
    }

    const trackingId = `TRK-${Date.now().toString().slice(-6)}`;
    const speedKmH = distanceKm / etaHours; // Calculate actual speed based on data

    const trackingData = {
      trackingId,
      orderId, // Use the string directly!
      origin,
      destination,
      currentCheckpoint: origin,
      speedKmH: Math.round(speedKmH),
      distanceKm: distanceKm,
      etaHours: etaHours,
      status: "Awaiting Dispatch", // More logical initial status
    };

    const { data, error } = await supabase
      .from("trackings")
      .insert([trackingData])
      .select()
      .single();

    if (error) {
      console.error("[Tracking Creation Error]", error);
      return res.status(500).json({
        success: false,
        message: "Database failure: could not create tracking record",
        error: error.message,
      });
    }

    res.status(201).json({
      success: true,
      message: "Tracking started",
      tracking: data,
    });
  } catch (err) {
    next(err);
  }
}

export async function getTracking(req, res, next) {
  try {
    const { id } = req.params;

    // We can query by trackingId or orderId depending on what the frontend passes, but let's query by orderId since the route says /tracking/:id and the id usually passed from frontend will be orderId. Wait, let's query by orderId.
    const { data, error } = await supabase
      .from("trackings")
      .select("*")
      .eq("orderId", id)
      .single();

    if (error) {
      console.error("[Get Tracking Error]", error);
      return res.status(404).json({
        success: false,
        message: `Tracking for order ${id} not found`,
      });
    }

    if (!data) {
      return res.status(404).json({
        success: false,
        message: `Tracking for order ${id} not found`,
      });
    }

    res.json({
      success: true,
      tracking: data,
    });
  } catch (err) {
    next(err);
  }
}

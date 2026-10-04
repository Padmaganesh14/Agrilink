import { supabase } from "../config/supabase.js";

export const getCrops = async (req, res, next) => {
  try {
    let query = supabase
      .from("crops")
      .select("*, users:sellerId(name, mobile)")
      .eq("status", "available")
      .order("created_at", { ascending: false });

    // Optional filtering
    if (req.query.sellerId) {
      query = query.eq("sellerId", req.query.sellerId);
    }

    const { data: crops, error } = await query;
    if (error) throw error;

    res.status(200).json({
      success: true,
      count: crops?.length || 0,
      data: crops,
    });
  } catch (error) {
    console.error("Supabase error:", error);
    next(error);
  }
};

export const addCrop = async (req, res, next) => {
  try {
    const {
      cropName,
      tamilName,
      grade,
      location,
      quantityAvailable,
      pricePerKg,
      sellerId,
    } = req.body;

    const { data: crop, error } = await supabase
      .from("crops")
      .insert([
        {
          cropName,
          tamilName,
          grade,
          location,
          quantityAvailable,
          pricePerKg,
          sellerId,
          status: "available",
        },
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      data: crop,
    });
  } catch (error) {
    console.error("Supabase error:", error);
    next(error);
  }
};

export const deleteCrop = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate we are passing an ID
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Crop ID is required" });
    }

    const { error } = await supabase.from("crops").delete().eq("id", id);

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: "Crop deleted successfully",
    });
  } catch (error) {
    console.error("Supabase error:", error);
    next(error);
  }
};

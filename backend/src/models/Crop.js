import mongoose from "mongoose";

const cropSchema = new mongoose.Schema(
  {
    cropName: { type: String, required: true },
    tamilName: { type: String },
    grade: { type: String, required: true },
    location: { type: String, required: true },
    quantityAvailable: { type: Number, required: true },
    pricePerKg: { type: Number, required: true },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "sold", "in-transit"],
      default: "available",
    },
  },
  { timestamps: true },
);

export const Crop = mongoose.model("Crop", cropSchema);

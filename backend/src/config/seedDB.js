import { User } from "../models/User.js";
import { Crop } from "../models/Crop.js";

export async function seedDatabase() {
  try {
    let ramanathan = await User.findOne({ mobile: "0199876444" });
    let koyambedu = await User.findOne({ mobile: "0199876555" });

    if (!ramanathan || !koyambedu) {
      console.log("[Seed] Seeding default users...");
      const users = await User.create([
        {
          name: "Ramanathan",
          mobile: "0199876444",
          password: "qwerew",
          role: "farmer",
        },
        {
          name: "Koyambedu Mart",
          mobile: "0199876555",
          password: "buyer",
          role: "buyer",
        },
      ]);
      ramanathan = users[0];
      koyambedu = users[1];
    }

    const cropCount = await Crop.countDocuments();
    if (cropCount === 0) {
      console.log("[Seed] Seeding dummy crops...");
      await Crop.create([
        {
          cropName: "Tomato",
          grade: "Grade A Premium",
          location: "Trichy",
          quantityAvailable: 5000,
          pricePerKg: 28.5,
          sellerId: ramanathan._id,
          status: "available",
        },
        {
          cropName: "Ponni Rice",
          grade: "Premium Aged",
          location: "Madurai",
          quantityAvailable: 15000,
          pricePerKg: 62.0,
          sellerId: ramanathan._id,
          status: "available",
        },
        {
          cropName: "Small Onion",
          grade: "Grade A Export",
          location: "Coimbatore",
          quantityAvailable: 2500,
          pricePerKg: 45.0,
          sellerId: ramanathan._id,
          status: "available",
        },
      ]);
    }
  } catch (err) {
    console.error("[Seed] Error seeding DB:", err.message);
  }
}

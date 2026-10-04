import { supabase } from "../config/supabase.js";
import axios from "axios";

export async function matchTransport(req, res, next) {
  try {
    const {
      origin = "Trichy",
      destination = "Chennai",
      quantityKg = 2000,
    } = req.body;

    const { data: transporters, error } = await supabase
      .from("transporters")
      .select("*")
      .eq("available", true);

    if (error) throw error;

    let distanceKm = null;
    let transitHoursStr = "Unavailable";

    try {
      // 1. Geocode Origin and Destination
      const getCoords = async (query) => {
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query + ", Tamil Nadu, India")}`,
          { timeout: 3000 },
        );
        if (res.data && res.data.length > 0) {
          return {
            lat: parseFloat(res.data[0].lat),
            lon: parseFloat(res.data[0].lon),
          };
        }
        return null;
      };

      const originCoords = await getCoords(origin);
      const destCoords = await getCoords(destination);

      if (originCoords && destCoords) {
        // 2. Fetch OSRM Route
        const osrmRes = await axios.get(
          `https://router.project-osrm.org/route/v1/driving/${originCoords.lon},${originCoords.lat};${destCoords.lon},${destCoords.lat}?overview=false`,
          { timeout: 3000 },
        );

        if (
          osrmRes.data &&
          osrmRes.data.routes &&
          osrmRes.data.routes.length > 0
        ) {
          const route = osrmRes.data.routes[0];
          distanceKm = Math.round(route.distance / 1000); // meters to km
          const transitMinutes = Math.round(route.duration / 60);
          const hours = Math.floor(transitMinutes / 60);
          const mins = transitMinutes % 60;
          transitHoursStr = `${hours}h ${mins}m`;
        }
      }
    } catch (e) {
      console.warn("Real routing service unavailable:", e.message);
    }

    if (distanceKm === null) {
      // Cannot compute cost without distance
      return res
        .status(503)
        .json({
          success: false,
          message:
            "Routing service unavailable. Cannot calculate transport distance.",
        });
    }

    const transportPartners = transporters.map((t) => ({
      id: t.id,
      name: t.name,
      vehicle: t.vehicle,
      capacityKg: Number(t.capacityKg),
      estimatedCost: Math.round(Number(t.baseRateKm) * distanceKm),
      estimatedRatePerKg: parseFloat(
        ((Number(t.baseRateKm) * distanceKm) / Number(t.capacityKg)).toFixed(2),
      ),
      distanceKm: distanceKm,
      corridor: "Computed Highway Route",
      transitHours: transitHoursStr,
      rating: Number(t.rating),
      available: t.available,
      recommended: Number(t.rating) >= 4.8,
    }));

    res.json({
      success: true,
      origin,
      destination,
      quantityKg,
      partners: transportPartners,
    });
  } catch (err) {
    next(err);
  }
}

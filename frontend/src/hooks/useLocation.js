import { useState, useEffect } from "react";

export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=` +
                position.coords.latitude +
                `&lon=` +
                position.coords.longitude +
                `&format=json`,
            );
            const data = await res.json();
            const city =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.state_district ||
              "Unknown";
            const state = data.address.state || "Unknown";
            setLocation(`${city} • ${state}`);
          } catch (e) {
            console.error(e);
            setLocation("Chennai"); // fallback
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.warn("Geolocation denied/failed, falling back to Chennai");
          setLocation("Chennai");
          setLoading(false);
        },
      );
    } else {
      setLocation("Chennai");
      setLoading(false);
    }
  }, []);

  return { location, loading };
};

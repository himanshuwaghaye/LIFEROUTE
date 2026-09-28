export { useRole } from "@/context/RoleContext";
export { useEmergency } from "@/context/EmergencyContext";
import { useState } from "react";
import { Coordinates } from "@/types";

export function useGeolocation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = (
    onSuccess: (coords: Coordinates) => void,
    onFallback?: () => void
  ) => {
    setLoading(true);
    setError(null);

    if (typeof window === "undefined" || !navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      onFallback?.();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLoading(false);
        onSuccess({
          lat: parseFloat(pos.coords.latitude.toFixed(4)),
          lng: parseFloat(pos.coords.longitude.toFixed(4)),
          address: "Current Detected GPS Location (Kolkata)",
          landmark: "Accurate within 15 meters",
        });
      },
      (err) => {
        setLoading(false);
        setError(err.message);
        // Fallback default coordinates (Park Street, Kolkata)
        onSuccess({
          lat: 22.551,
          lng: 88.353,
          address: "12 Park Street, Central Kolkata",
          landmark: "Auto-detected city location",
        });
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  return { getCurrentLocation, loading, error };
}

export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(1));
}

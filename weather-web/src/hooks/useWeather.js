
import { useState, useEffect, useCallback, useRef } from "react";
import { fetchWeatherByCity, fetchWeatherByCoords } from "../services/weatherService";
 
const LAST_CITY_KEY = "weather_last_city";
 
function getSavedCity() {
  try {
    return localStorage.getItem(LAST_CITY_KEY) || "";
  } catch {
    return "";
  }
}
 
function saveCity(city) {
  try {
    localStorage.setItem(LAST_CITY_KEY, city);
  } catch {
    // Silently fail in restricted environments
  }
}
 
export function useWeather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("metric"); // "metric" = Celsius, "imperial" = Fahrenheit
  const [lastCity, setLastCity] = useState(getSavedCity);
 
  // Refs so callbacks always read the latest values without becoming unstable
  const unitRef = useRef(unit);
  const lastCityRef = useRef(lastCity);
 
  useEffect(() => { unitRef.current = unit; }, [unit]);
  useEffect(() => { lastCityRef.current = lastCity; }, [lastCity]);
 
  // Stable search by city — no unit/lastCity in deps, reads via refs instead
  const searchCity = useCallback(async (city) => {
    const trimmed = city.trim();
    if (!trimmed) return;
 
    let cancelled = false;
    setLoading(true);
    setError(null);
 
    try {
      const data = await fetchWeatherByCity(trimmed, unitRef.current);
      if (cancelled) return;
      setWeatherData(data);
      saveCity(trimmed);
      setLastCity(trimmed);
    } catch (err) {
      if (cancelled) return;
      setError(err.message);
      setWeatherData(null);
    } finally {
      if (!cancelled) setLoading(false);
    }
 
    return () => { cancelled = true; };
  }, []); // stable — never recreated
 
  // Stable fetch by coords — same pattern
  const fetchByCoords = useCallback(async (lat, lon) => {
    let cancelled = false;
    setLoading(true);
    setError(null);
 
    try {
      const data = await fetchWeatherByCoords(lat, lon, unitRef.current);
      if (cancelled) return;
      setWeatherData(data);
 
      // Always record a city label so lastCity matches what's displayed
      const name = data.cityName || `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
      saveCity(name);
      setLastCity(name);
    } catch (err) {
      if (cancelled) return;
      setError(err.message);
      setWeatherData(null);
    } finally {
      if (!cancelled) setLoading(false);
    }
 
    return () => { cancelled = true; };
  }, []); // stable — never recreated
 
  const toggleUnit = useCallback(() => {
    setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));
  }, []);
 
  // Re-fetch when unit changes, using the ref so the value is never stale
  useEffect(() => {
    if (lastCityRef.current) {
      searchCity(lastCityRef.current);
    }
  }, [unit, searchCity]);
 
  // On mount: try geolocation, fall back to last saved city
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchByCoords(pos.coords.latitude, pos.coords.longitude),
        () => {
          if (lastCityRef.current) searchCity(lastCityRef.current);
        },
        { timeout: 8000 }
      );
    } else if (lastCityRef.current) {
      searchCity(lastCityRef.current);
    }
  }, [fetchByCoords, searchCity]); // stable refs, so this only runs on mount
 
  return {
    weatherData,
    loading,
    error,
    unit,
    lastCity,
    searchCity,
    toggleUnit,
  };
}
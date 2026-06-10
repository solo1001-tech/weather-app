const API_KEY = "dc67dc4adf1d0709f33936fadc29be36";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0";
 
/**
 * Fetch current weather + 5-day/3-hour forecast by city name.
 * We simulate a 7-day forecast by grouping the 3-hour blocks by day.
 */
export async function fetchWeatherByCity(city, unit = "metric") {
  const [currentRes, forecastRes] = await Promise.all([
    fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=${unit}&appid=${API_KEY}`),
    fetch(`${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=${unit}&appid=${API_KEY}`),
  ]);
 
  if (!currentRes.ok) {
    if (currentRes.status === 404) throw new Error("City not found. Please check the name and try again.");
    if (currentRes.status === 401) throw new Error("Invalid API key. Please check your .env file.");
    throw new Error("Failed to fetch weather data. Please try again.");
  }
 
  const current = await currentRes.json();
  const forecast = await forecastRes.json();
 
  return {
    current: normalizeCurrentWeather(current, unit),
    forecast: normalizeForecast(forecast.list, unit),
  };
}
 
/**
 * Fetch weather by latitude and longitude (for geolocation).
 */
export async function fetchWeatherByCoords(lat, lon, unit = "metric") {
  const [currentRes, forecastRes, geoRes] = await Promise.all([
    fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`),
    fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`),
    fetch(`${GEO_URL}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`),
  ]);
 
  if (!currentRes.ok) throw new Error("Failed to fetch weather for your location.");
 
  const current = await currentRes.json();
  const forecast = await forecastRes.json();
  const geoData = await geoRes.json();
  const cityName = geoData[0]?.name || current.name;
 
  return {
    current: normalizeCurrentWeather(current, unit),
    forecast: normalizeForecast(forecast.list, unit),
    cityName,
  };
}
 
/**
 * Normalize current weather API response into a clean shape.
 */
function normalizeCurrentWeather(data, unit) {
  return {
    city: data.name,
    country: data.sys.country,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    tempMin: Math.round(data.main.temp_min),
    tempMax: Math.round(data.main.temp_max),
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    windDeg: data.wind.deg,
    visibility: data.visibility ? (data.visibility / 1000).toFixed(1) : null,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    conditionCode: data.weather[0].id,
    conditionMain: data.weather[0].main,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    timezone: data.timezone,
    unit,
  };
}
 
/**
 * Group 3-hour forecast blocks by day and pick noon (or closest) as representative.
 * Returns up to 7 days.
 */
function normalizeForecast(list, unit) {
  const byDay = {};
 
  list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toISOString().split("T")[0];
 
    if (!byDay[dayKey]) {
      byDay[dayKey] = [];
    }
    byDay[dayKey].push(item);
  });
 
  return Object.entries(byDay)
    .slice(0, 7)
    .map(([dateStr, items]) => {
      // Pick the midday reading (12:00) or closest
      const midday = items.reduce((best, item) => {
        const hour = new Date(item.dt * 1000).getHours();
        const bestHour = new Date(best.dt * 1000).getHours();
        return Math.abs(hour - 12) < Math.abs(bestHour - 12) ? item : best;
      });
 
      const temps = items.map((i) => i.main.temp);
      return {
        date: dateStr,
        dt: midday.dt,
        tempHigh: Math.round(Math.max(...temps)),
        tempLow: Math.round(Math.min(...temps)),
        temp: Math.round(midday.main.temp),
        description: midday.weather[0].description,
        icon: midday.weather[0].icon,
        conditionMain: midday.weather[0].main,
        humidity: midday.main.humidity,
        windSpeed: midday.wind.speed,
        pop: Math.round((midday.pop || 0) * 100), // precipitation probability
        unit,
      };
    });
}
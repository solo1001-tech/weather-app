export const getWeatherGradient = (weather) => {
  return "blue"; // example
};
export const unitSymbol = (unit) =>
  unit === "metric" ? "°C" : "°F";

export const capitalize = (str = "") =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const formatDay = (timestamp) =>
  new Date(timestamp * 1000).toLocaleDateString("en-US", {
    weekday: "short",
  });

export const formatTime = (timestamp) =>
  new Date(timestamp * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

export const formatWind = (speed) =>
  `${speed} m/s`;

export const windDirection = (deg) => {
  const directions = [
    "N","NE","E","SE",
    "S","SW","W","NW"
  ];
  return directions[Math.round(deg / 45) % 8];
};
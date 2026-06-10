
export function getWeatherGradient(conditionMain, icon) {
  const isNight = icon?.includes("n");
  if (isNight) return "night";
 
  const map = {
    Clear: "clear",
    Clouds: "cloudy",
    Rain: "rainy",
    Drizzle: "rainy",
    Thunderstorm: "stormy",
    Snow: "snowy",
    Mist: "foggy",
    Smoke: "foggy",
    Haze: "foggy",
    Fog: "foggy",
    Dust: "foggy",
    Sand: "foggy",
    Tornado: "stormy",
  };
  return map[conditionMain] || "clear";
}
 
/**
 * Capitalize first letter of each word.
 */
export function capitalize(str) {
  return str
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
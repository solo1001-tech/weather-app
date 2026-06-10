
 
export default function UnitToggle({ unit, onToggle }) {
  const isCelsius = unit === "metric";
 
  return (
    <button
      className="unit-toggle"
      onClick={onToggle}
      aria-label={`Switch to ${isCelsius ? "Fahrenheit" : "Celsius"}`}
      title={`Switch to ${isCelsius ? "°F" : "°C"}`}
    >
      <span className={isCelsius ? "active-unit" : "inactive-unit"}>°C</span>
      <span className="toggle-divider">|</span>
      <span className={!isCelsius ? "active-unit" : "inactive-unit"}>°F</span>
    </button>
  );
}
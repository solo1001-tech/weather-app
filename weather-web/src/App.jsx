
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import UnitToggle from "./components/UnitToggle";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import EmptyState from "./components/EmptyState";
import { useWeather } from "./hooks/useWeather";
import { getWeatherGradient } from "./utils/helpers";
import "./App.css";
 
export default function App() {
  const { weatherData, loading, error, unit, lastCity, searchCity, toggleUnit } = useWeather();
 
  const gradient = weatherData?.current
    ? getWeatherGradient(weatherData.current.conditionMain, weatherData.current.icon)
    : "default";
 
  return (
    <div className={`app bg-${gradient}`}>
      {/* Header */}
      <header className="app-header">
        <div className="logo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="logo-icon">
            <path d="M17 18a5 5 0 0 0-10 0" />
            <line x1="12" y1="2" x2="12" y2="9" />
            <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
            <line x1="1" y1="18" x2="3" y2="18" />
            <line x1="21" y1="18" x2="23" y2="18" />
            <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
            <polyline points="16 5 12 1 8 5" />
          </svg>
          <span className="logo-text">Skye</span>
        </div>
        <UnitToggle unit={unit} onToggle={toggleUnit} />
      </header>
 
      {/* Search */}
      <div className="search-wrapper">
        <SearchBar onSearch={searchCity} lastCity={lastCity} loading={loading} />
      </div>
 
      {/* Main content */}
      <main className="app-main">
        {loading && <LoadingState />}
 
        {!loading && error && (
          <ErrorState
            message={error}
            onRetry={lastCity ? () => searchCity(lastCity) : undefined}
          />
        )}
 
        {!loading && !error && !weatherData && <EmptyState />}
 
        {!loading && !error && weatherData && (
          <>
            <WeatherCard current={weatherData.current} unit={unit} />
            {weatherData.forecast?.length > 0 && (
              <Forecast forecast={weatherData.forecast} unit={unit} />
            )}
          </>
        )}
      </main>
 
      <footer className="app-footer">
        <p>Data from <a href="https://openweathermap.org" target="_blank" rel="noopener noreferrer">OpenWeatherMap</a></p>
      </footer>
    </div>
  );
}

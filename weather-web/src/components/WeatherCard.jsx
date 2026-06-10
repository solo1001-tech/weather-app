
import { unitSymbol, formatTime, formatWind, windDirection, capitalize } from "../utils/helpers";
 
export default function WeatherCard({ current, unit }) {
  const sym = unitSymbol(unit);
  const iconUrl = `https://openweathermap.org/img/wn/${current.icon}@2x.png`;
 
  return (
    <div className="weather-card">
      {/* Location */}
      <div className="location">
        <svg className="pin-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
        <h1 className="city-name">
          {current.city}
          {current.country && <span className="country">, {current.country}</span>}
        </h1>
      </div>
 
      {/* Main temp + icon */}
      <div className="main-weather">
        <div className="temp-display">
          <span className="temp-value">{current.temp}</span>
          <span className="temp-unit">{sym}</span>
        </div>
        <div className="condition-info">
          <img
            src={iconUrl}
            alt={current.description}
            className="weather-icon-large"
          />
          <p className="condition-label">{capitalize(current.description)}</p>
          <p className="feels-like">Feels like {current.feelsLike}{sym}</p>
        </div>
      </div>
 
      {/* High / Low */}
      <div className="temp-range">
        <span>↑ {current.tempMax}{sym}</span>
        <span className="divider">·</span>
        <span>↓ {current.tempMin}{sym}</span>
      </div>
 
      {/* Stats grid */}
      <div className="stats-grid">
        <StatItem
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
            </svg>
          }
          label="Humidity"
          value={`${current.humidity}%`}
        />
        <StatItem
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
            </svg>
          }
          label="Wind"
          value={`${formatWind(current.windSpeed, unit)} ${windDirection(current.windDeg)}`}
        />
        {current.visibility && (
          <StatItem
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            }
            label="Visibility"
            value={`${current.visibility} km`}
          />
        )}
        <StatItem
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          }
          label="Sunrise"
          value={formatTime(current.sunrise, current.timezone)}
        />
        <StatItem
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 18a5 5 0 0 0-10 0" />
              <line x1="12" y1="2" x2="12" y2="9" />
              <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
              <line x1="1" y1="18" x2="3" y2="18" />
              <line x1="21" y1="18" x2="23" y2="18" />
              <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
              <line x1="23" y1="22" x2="1" y2="22" />
              <polyline points="8 6 12 2 16 6" />
            </svg>
          }
          label="Sunset"
          value={formatTime(current.sunset, current.timezone)}
        />
      </div>
    </div>
  );
}
 
function StatItem({ icon, label, value }) {
  return (
    <div className="stat-item">
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <span className="stat-label">{label}</span>
        <span className="stat-value">{value}</span>
      </div>
    </div>
  );
}
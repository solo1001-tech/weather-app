
import { formatDay, unitSymbol, capitalize } from "../utils/helpers";
 
export default function Forecast({ forecast, unit }) {
  const sym = unitSymbol(unit);
 
  // Find the overall min and max for the progress bar scaling
  const allHighs = forecast.map((d) => d.tempHigh);
  const allLows = forecast.map((d) => d.tempLow);
  const absMax = Math.max(...allHighs);
  const absMin = Math.min(...allLows);
  const range = absMax - absMin || 1;
 
  return (
    <section className="forecast-section" aria-label="7-day forecast">
      <h2 className="section-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="section-icon">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        7-Day Forecast
      </h2>
      <div className="forecast-list">
        {forecast.map((day, idx) => {
          const iconUrl = `https://openweathermap.org/img/wn/${day.icon}.png`;
          // Calculate bar position and width for visual temp range
          const lowPct = ((day.tempLow - absMin) / range) * 100;
          const highPct = ((day.tempHigh - absMin) / range) * 100;
 
          return (
            <div key={day.date} className={`forecast-row ${idx === 0 ? "today" : ""}`}>
              <span className="forecast-day">{formatDay(day.dt)}</span>
 
              <div className="forecast-condition">
                <img src={iconUrl} alt={day.description} className="forecast-icon" />
                <span className="forecast-desc">{capitalize(day.description)}</span>
              </div>
 
              {day.pop > 0 && (
                <span className="precip-chance">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="rain-icon">
                    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
                  </svg>
                  {day.pop}%
                </span>
              )}
              {day.pop === 0 && <span className="precip-chance invisible">—</span>}
 
              <div className="temp-bar-wrap">
                <span className="temp-low">{day.tempLow}{sym}</span>
                <div className="temp-bar-track">
                  <div
                    className="temp-bar-fill"
                    style={{
                      left: `${lowPct}%`,
                      width: `${highPct - lowPct}%`,
                    }}
                    role="presentation"
                  />
                </div>
                <span className="temp-high">{day.tempHigh}{sym}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

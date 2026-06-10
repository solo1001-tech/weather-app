
 
export default function LoadingState() {
  return (
    <div className="loading-state" aria-live="polite" aria-label="Loading weather data">
      <div className="loading-orbs">
        <span className="orb orb-1" />
        <span className="orb orb-2" />
        <span className="orb orb-3" />
      </div>
      <p className="loading-text">Fetching weather…</p>
    </div>
  );
}
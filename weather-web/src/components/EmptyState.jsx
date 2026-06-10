
 
export default function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
          {/* Sun */}
          <circle cx="75" cy="28" r="16" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.6" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 75 + 22 * Math.cos(rad);
            const y1 = 28 + 22 * Math.sin(rad);
            const x2 = 75 + 28 * Math.cos(rad);
            const y2 = 28 + 28 * Math.sin(rad);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="2.5" opacity="0.6" strokeLinecap="round" />;
          })}
          {/* Cloud */}
          <ellipse cx="52" cy="52" rx="26" ry="14" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.8" />
          <circle cx="38" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.8" />
          <circle cx="62" cy="48" r="12" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.8" />
        </svg>
      </div>
      <p className="empty-title">What's the weather like?</p>
      <p className="empty-subtitle">Search a city above or allow location access to get started.</p>
    </div>
  );
}
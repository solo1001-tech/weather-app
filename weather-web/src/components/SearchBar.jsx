import { useState } from "react";
 
export default function SearchBar({ onSearch, lastCity, loading }) {
  const [query, setQuery] = useState("");
 
  function handleSubmit(e) {
    e.preventDefault();
    const city = query.trim() || lastCity;
    if (city) onSearch(city);
  }
 
  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <div className="search-input-wrapper">
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search city…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search for a city"
          autoComplete="off"
          spellCheck="false"
        />
        {query && (
          <button
            type="button"
            className="clear-btn"
            onClick={() => setQuery("")}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
      <button type="submit" className="search-btn" disabled={loading}>
        {loading ? (
          <span className="spinner" aria-label="Loading" />
        ) : (
          "Search"
        )}
      </button>
    </form>
  );
}
 
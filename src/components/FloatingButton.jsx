import { useState, useEffect } from "react";
import { useWatchedDetails } from "../hooks/useWatchedDetails";

export default function FloatingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [watchedIds, setWatchedIds] = useState([]);

  const { details, isLoading } = useWatchedDetails(watchedIds);

  useEffect(() => {
    if (!isOpen) return;

    try {
      const raw = localStorage.getItem("watchedMovies");
      const parsed = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) setWatchedIds(parsed);
    } catch {
      setWatchedIds([]);
    }
  }, [isOpen]);

  return (
    <>
      <button className="floating-btn" onClick={() => setIsOpen(true)}>
        👁️
      </button>

      {isOpen && (
        <div className="popup-overlay" onClick={() => setIsOpen(false)}>
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()} // prevenim închiderea accidentală
          >
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              ×
            </button>
            <h2>Filme vizionate</h2>
            {isLoading ? (
              <p>Se încarcă...</p>
            ) : details.length === 0 ? (
              <p>Nu ai vizionat niciun film.</p>
            ) : (
              <ul className="movie-list">
                {details.map((movie) => (
                  <li key={movie.imdbID}>
                    <strong>{movie.Title}</strong> ({movie.Year}) –{" "}
                    {movie.Genre}
                    <br />
                    IMDb: {movie.imdbRating}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}

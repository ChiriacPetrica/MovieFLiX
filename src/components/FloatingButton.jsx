import { useState } from "react";
import { useWatchedDetails } from "../hooks/useWatchedDetails";
import { useEffect } from "react";

export default function FloatingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [watchedIds, setWatchedIds] = useState([]);

  const { details, isLoading } = useWatchedDetails(watchedIds);

  useEffect(() => {
    if (!isOpen) return;

    try {
      setWatchedIds(JSON.parse(localStorage.getItem("watchedMovies")));
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
        <div className="popup-overlay">
          <div className="popup-content">
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
                    <strong>{movie.Title}</strong> ({movie.Year}) -{" "}
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

import { useState, useEffect } from "react";
import Loader from "./Loader";
import { useLocalCache } from "../hooks/useLocalCache";

const KEY = import.meta.env.VITE_OMBD_KEY;

export default function MovieDetails({ selectedId }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [watchedMovies, setWatchedMovies] = useLocalCache("watchedMovies", []);

  const isWatched = watchedMovies.includes(selectedId);

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!movie.Title) return;
    document.title = `Movie | ${movie.Title}`;

    return () => {
      document.title = "MovieFLiX";
    };
  }, [movie.Title]);

  const toggleWatched = () => {
    if (isWatched) {
      setWatchedMovies(watchedMovies.filter((id) => id !== selectedId));
    } else {
      setWatchedMovies([...watchedMovies, selectedId]);
    }
  };

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <img src={movie.Poster} alt={`Poster of ${movie.Title}`} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐️</span>
                {movie.imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <button
              onClick={toggleWatched}
              className={`watch-button ${isWatched ? "watched" : ""}`}
            >
              {isWatched ? "Vizionat" : "Adaugă la vizionate"}
            </button>

            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>🎭 Distribuție: {movie.Actors}</p>
            <p>🎬 Regizat de: {movie.Director}</p>
            <p>
              {movie.imdbRating > 8
                ? "🌟 Acest film este un must-watch! Nu îl rata!"
                : movie.imdbRating < 5
                ? "❌ Evită acest film, nu merită vizionat."
                : "🎥 Vizionare plăcută!"}
            </p>
          </section>
        </>
      )}
    </div>
  );
}

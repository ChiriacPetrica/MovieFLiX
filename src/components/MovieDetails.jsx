import { useState, useEffect } from "react";
import Loader from "./Loader";

const KEY = "f84fc31d";

export default function MovieDetails({ selectedId }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
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

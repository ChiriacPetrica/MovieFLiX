import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useMovies } from "../hooks/useMovies";

import NavBar from "../components/NavBar";
import Search from "../components/Search";
import NumResults from "../components/NumResults";
import Main from "../components/Main";
import Box from "../components/Box";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import MovieList from "../components/MovieList";
import MovieDetails from "../components/MovieDetails";

export default function App() {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500);
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(debouncedQuery);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>{selectedId && <MovieDetails selectedId={selectedId} />}</Box>
      </Main>
    </>
  );
}

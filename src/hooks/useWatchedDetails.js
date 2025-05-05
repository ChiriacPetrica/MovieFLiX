// useWatchedDetails.js
import { useState, useEffect } from "react";

const KEY = import.meta.env.VITE_OMBD_KEY;

export function useWatchedDetails(ids) {
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchDetails() {
      setIsLoading(true);
      try {
        const promises = ids.map(async (id) => {
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&i=${id}`
          );
          const data = await res.json();
          return data;
        });

        const results = await Promise.all(promises);
        setDetails(results);
      } catch (err) {
        console.error("Eroare la încărcarea detaliilor filmelor:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (ids.length > 0) fetchDetails();
  }, [ids]);

  return { details, isLoading };
}

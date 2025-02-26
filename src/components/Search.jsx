export default function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Introdu numele unui film..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

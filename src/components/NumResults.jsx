export default function NumResults({ movies }) {
  return (
    <p className="num-results">
      <strong>{movies.length}</strong> filme găsite
    </p>
  );
}

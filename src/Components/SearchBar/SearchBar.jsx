import "./SearchBar.css";

export default function SearchBar({ searchEntered, setSearchEntered }) {
  return (
    <div className="search-nav">
      <input
        type="text"
        placeholder="Search"
        className="cards-search"
        value={searchEntered}
        onChange={(event) => setSearchEntered(event.target.value)}
      />
    </div>
  );
}

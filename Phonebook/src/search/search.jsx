function Search({ searchTerm, setSearchTerm, placeholder }) {
  return (
    <div>
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder || "Search by name or number..."}
      />
    </div>
  );
}

export default Search;

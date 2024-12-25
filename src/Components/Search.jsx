import React from "react";

const Search = ({ query, setQuery }) => {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value.trim())}
      type="search"
      className="text-field"
      placeholder="search..."
    />
  );
};

export default Search;

import React, { useState } from 'react';

const SearchExample = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    // Perform search logic using the searchInput value
    if (searchInput.trim() === "") {
      console.log("Please enter a search term.");
    } else {
      console.log("Searching for:", searchInput);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchExample;

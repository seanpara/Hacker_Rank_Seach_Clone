import React from "react";

const SearchFilter = props => {
  return (
    <div>
      <div>
        Search By
        <select>
          <option>Popularity</option>
          <option>Data</option>
        </select>
      </div>
      <div>
        For
        <select>
          <option>All Time</option>
          <option>Past 24h</option>
          <option>Past Week</option>
          <option>Past Month</option>
          <option>Year</option>
        </select>
      </div>
    </div>
  );
};
export default SearchFilter;

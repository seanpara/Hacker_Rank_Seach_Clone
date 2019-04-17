import React, { Component } from "react";

const SearchBar = props => {
  const handleChange = event => {
    props.searchArticles(event.target.value);
  };

  return (
    <div>
      Search Term:
      <form>
        <input
          type="text"
          name="article-serach-bar"
          value={props.searchTerm}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};
export default SearchBar;

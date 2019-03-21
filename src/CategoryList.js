import React from "react";

const CategoryList = props => {
  const renderCategoryButtons = () => {
    const categories = ["New", "Top", "Best", "Ask", "Show", "Job"];

    return categories.map(category => (
      <button
        type="button"
        style={{
          color: "black",
          fontsize: "1em",
          margin: "1em",
          padding: "0.25em 1em",
          border: "2px solid red",
          borderradius: "3px"
        }}
        onClick={() => props.fetchAricleIds(category)}
      >
        {category}
      </button>
    ));
  };

  return (
    <div>
      <h1>Choose A Category</h1>
      <div>{renderCategoryButtons()}</div>
    </div>
  );
};
export default CategoryList;

import React from "react";

const ArticleList = props => {
  console.log(props);

  const renderArticles = () => {
    return props.articleList.map(articleObj => {
      return (
        <div
          key={articleObj.id}
          style={{ border: "2px solid red", margin: "10px" }}
        >
          <a href={articleObj.url}>{articleObj.title}</a>
          <p>By: {articleObj.by}</p>
        </div>
      );
    });
  };
  return <>{renderArticles()}</>;
};
export default ArticleList;

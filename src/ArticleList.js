import React from "react";
import ArticleCard from "./ArticleCard";

const ArticleList = props => {
  console.log(props);

  const renderArticles = () => {
    return props.articleList.map(articleObj => {
      return <ArticleCard key={articleObj.id} articleObj={articleObj} />;
    });
  };
  return <>{renderArticles()}</>;
};
export default ArticleList;

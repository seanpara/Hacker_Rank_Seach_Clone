import React, { Component } from "react";

import ArticleContext from "../ArticleContext"
import ArticleCard from "./ArticleCard";

class ArticleList extends Component {

  static contextType = ArticleContext

  renderArticles = () => {
    return this.props.articleList.map(articleObj => {
      return <ArticleCard key={articleObj.id} articleObj={articleObj} />;
    });
  };

  render() {
    console.log("context is:",this.context);
    return <>{this.renderArticles()}</>;
  }

};
export default ArticleList;

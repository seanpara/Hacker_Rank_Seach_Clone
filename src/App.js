import React, { Component } from "react";
import SearchBar from "./SearchBar";
import ArticleList from "./ArticleList";
import CategoryList from "./CategoryList";

class App extends Component {
  state = {
    articleIds: [],
    searchTerm: "",
    articleList: [],
    filteredArticleList: []
  };

  async componentDidMount() {
    this.fetchAricleIds("top");
  }

  fetchAricleIds = async category => {
    const articleIds = await fetch(
      `https://hacker-news.firebaseio.com/v0/${category.toLowerCase()}stories.json?print=pretty`
    ).then(r => r.json());
    // console.log(articleIds);
    this.setState({ articleIds }, this.fetchArticleData);
  };

  fetchArticleData = async () => {
    const { articleIds } = this.state;

    const articleList = await Promise.all(
      articleIds.slice(0, 10).map(id => this.fetchArticle(id))
    );

    this.setState({ articleList });
  };

  fetchArticle = async id => {
    const article = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    ).then(r => r.json());

    return article;
  };

  searchArticles = searchTerm => {
    this.setState({ searchTerm }, this.filterArticles);
  };

  filterArticles = () => {
    const filteredArticleList = this.state.articleList.filter(articleObj =>
      articleObj.title
        .toLowerCase()
        .includes(this.state.searchTerm.toLowerCase())
    );

    this.setState({ filteredArticleList });
  };

  manageArticleDisplay = () => {
    return this.state.searchTerm
      ? this.state.filteredArticleList
      : this.state.articleList;
  };

  render() {
    return (
      <div>
        <SearchBar searchArticles={this.searchArticles} />
        <CategoryList fetchAricleIds={this.fetchAricleIds} />
        <div>
          {this.state.articleList.length ? (
            <ArticleList articleList={this.manageArticleDisplay()} />
          ) : (
            <div>Loading Articles!</div>
          )}
        </div>
      </div>
    );
  } // end of render method
} // end of app class

export default App;

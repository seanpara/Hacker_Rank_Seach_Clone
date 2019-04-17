import React, { Component } from "react";

import ArticleContext from "../ArticleContext"
import SearchBar from "./SearchBar";
import ArticleList from "./ArticleList";
import CategoryList from "./CategoryList";
import SearchFilter from "./SearchFilter";

class App extends Component {
  state = {
    articleIds: [],
    searchTerm: "",
    articleList: [],
    filteredArticleList: [],
    numFetchedArticles: 20
  };

  async componentDidMount() {
    this.fetchAricleIds("top");
    window.addEventListener("scroll", this.handleScroll);
  }

  fetchAricleIds = async category => {
    if (category !== this.state.category) {
      this.setState({ numFetchedArticles: 20 });
    }
    const articleIds = await fetch(
      `https://hacker-news.firebaseio.com/v0/${category.toLowerCase()}stories.json?print=pretty`
    ).then(r => r.json());
    this.setState({ articleIds }, this.fetchArticleData);
  };

  fetchArticleData = async () => {
    const { articleIds } = this.state;

    const articleList = await Promise.all(
      articleIds
        .slice(0, this.state.numFetchedArticles)
        .map(id => this.fetchArticle(id))
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

    this.setState({ filteredArticleList }, () => this.fetchAricleIds);
  };

  manageArticleDisplay = () => {
    return this.state.searchTerm
      ? this.state.filteredArticleList
      : this.state.articleList;
  };

  handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.setState(
        state => ({
          numFetchedArticles: (state.numFetchedArticles += 20)
        }),
        this.fetchArticleData
      );
      //show loading spinner and make fetch request to api
    }
  };

  render() {
    return (
      <ArticleContext.Provider value={this.state}>
        <SearchBar searchArticles={this.searchArticles} />
        <CategoryList fetchAricleIds={this.fetchAricleIds} />
        <SearchFilter />
        <div>
          {this.state.articleList.length ? (
            <ArticleList articleList={this.manageArticleDisplay()} />
          ) : (
            <div>Loading Articles!</div>
          )}
        </div>
      </ArticleContext.Provider>
    );
  } // end of render method
} // end of app class

export default App;

import React, { Component, createContext } from 'react';

const ArticleContext = createContext({
  articleData: [],
  filteredArticleList: [],
  numFetchedArticles: 20
})

export class ArticleProvider extends Component {
  state = {
    articleData: []
  }

  async componentDidMount() {
    this.fetchAricleIds("top");
  }

  fetchAricleIds = async category => {
    if (category !== this.state.category) {
      this.setState({ numFetchedArticles: 20 });
    }
    const articleIds = await fetch(
      `https://hacker-news.firebaseio.com/v0/${category.toLowerCase()}stories.json?print=pretty`
    ).then(r => r.json());
    // console.log(articleIds);
    this.setState({ articleIds }, this.fetchArticleData);
  };

  fetchArticleData = async () => {
    const { articleIds } = this.state;

    const articleList = await Promise.all(
      articleIds
        .slice(0, this.state.numFetchedArticles)
        .map(id => this.fetchArticle(id))
    );

    this.setState({ articleList }, () =>
      console.log(this.state.articleList, this.state.numFetchedArticles)
    );
  };

  fetchArticle = async id => {
    const article = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    ).then(r => r.json());

    return article;
  };

  render() {
    <ArticleContext.Provider value={this.state}>
      {this.props.children}
    </ArticleContext.Provider>
  }

}// end of article Provider

export const ArcticleConsumer = ArticleContext.Consumer

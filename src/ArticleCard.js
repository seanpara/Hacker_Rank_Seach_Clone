import React, { Component } from "react";
import CommentList from "./CommentList";

class ArticleCard extends Component {
  state = {
    showComments: false
  };
  manageComments = () => {
    return this.props.articleObj.kids ? (
      <div>
        <p>Comments: {this.props.articleObj.kids.length} </p>
        <button type="button" onClick={this.handleComentClick}>
          {this.state.showComments ? "Hide Comments" : "See Comments"}
        </button>
        {this.state.showComments ? (
          <CommentList commentIds={this.props.articleObj.kids} />
        ) : null}
      </div>
    ) : (
      <p>No Comments</p>
    );
  };

  handleComentClick = () => {
    if (!this.state.showComments) {
      this.setState({ showComments: true });
    } else {
      this.setState({ showComments: false });
    }
  };

  render() {
    return (
      <div style={{ border: "2px solid red", margin: "10px" }}>
        <a href={this.props.articleObj.url}>{this.props.articleObj.title}</a>
        <p>By: {this.props.articleObj.by}</p>
        {this.manageComments()}
      </div>
    );
  }
}
export default ArticleCard;

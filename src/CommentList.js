import React, { Component } from "react";

class CommentList extends Component {
  state = {
    commentList: []
  };
  componentDidMount() {
    this.fetchComents();
  }
  fetchComents = async () => {
    const commentList = await Promise.all(
      this.props.commentIds.map(id => this.fetchSingleComment(id))
    );
    this.setState({ commentList }, () => console.log(this.state.commentList));
  }; // end of fetch Comments

  fetchSingleComment = async id => {
    return await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    ).then(r => r.json());
  };

  renderComments = () => {
    //const commentArr = await fetchComents();
    return this.state.commentList.map(comment => (
      <div id={comment.di}>
        {comment.text}
        By: {comment.by}
      </div>
    ));
  };

  render() {
    return <div>{this.renderComments()}</div>;
  }
}
export default CommentList;

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

  cleanseCommentText = text => {
    if (text) {
      return text.replace(/<p>|&#x2F;|&gt;|&quot;|&#x27;/g, " ");
    }
  };

  renderComments = () => {
    //const commentArr = await fetchComents();
    return this.state.commentList.map(comment => (
      <div
        key={comment.id}
        style={{ border: "2px solid green", margin: "5px" }}
      >
        {this.cleanseCommentText(comment.text)}
        <p style={{ border: "1px solid black", margin: "3px" }}>
          By: {comment.by}
        </p>
      </div>
    ));
  };

  render() {
    return <div>{this.renderComments()}</div>;
  }
}
export default CommentList;

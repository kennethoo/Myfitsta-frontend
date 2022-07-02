import React, { Component } from "react";
import MenuComment from "../component/menucommnet";
import Username from "../component/username";
import IconProfile from "../component/iconpicture";
import DataPost from "../component/datePost";

class CommentBox extends Component {
  componentDidMount = () => {
    // document.querySelector(".hold-comment-relater").scrollTop = document.querySelector(".hold-comment-relater").scrollHeight
  };
  render() {
    return (
      <div className="wrapwer-comment-post" key={this.props.item._id}>
        <div className="wjfjsnrt">
          <div className="hold-profile-url">
            <IconProfile user={this.props.item.Userdid} />
          </div>
          <div className="hold-comment">
            <div className="name-commenter">
              <Username user={this.props.item.Userdid} />
              <MenuComment
                removecomment={this.props.removecomment}
                item={this.props.item}
              />
            </div>
            <div className="actuel-comment">{this.props.item.content}</div>
          </div>
        </div>

        <div className="wrepr-cjf">
          <div className="tjtrj">
            <DataPost date={this.props.item.date} />
          </div>
        </div>
      </div>
    );
  }
}
export default CommentBox;

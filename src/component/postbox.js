import React, { Component } from "react";
import LikeButton from "../component/likeButton";
import Username from "../component/username";
import { GoPlus } from "react-icons/go";
import DataPost from "../component/datePost";
import BoxMedia from "../component/boxmedia";
import PostOption from "../component/postoption";
import IconProfile from "../component/iconpicture";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class PostBox extends Component {
  state = {
    likeks: [],
  };
  componentDidMount = () => {};
  render() {
    return (
      <div className="post-box" key={this.props.item._id}>
        <div className="info-profile">
          <div className="img-pro-inf">
            <div className="img-pr">
              <IconProfile user={this.props.item.userId} />
            </div>
            <div className="nbovtitme">
              <Username link={true} user={this.props.item.userId} />
              {this.props.item.date ? (
                <DataPost date={this.props.item.date} />
              ) : (
                ""
              )}
            </div>
          </div>
          <PostOption
            user={this.props.users}
            item={this.props.item}
            handleSetting={this.props.handleSetting}
            friend={this.props.item.userId}
          />
        </div>
        <BoxMedia
          file={this.props.item.filename}
          kind={this.props.item.mediakind}
        />
        <div className="action">
          <div className="wrp-act">
            <LikeButton
              posterId={this.props.item.userId}
              userid={this.props.users.userid}
              filename={this.props.item.filename}
              numberlike={this.props.item.numberlike}
            />
            <div className="comment box-ac">
              <Link
                className="linjgjc"
                to={`/comment/${this.props.item.filename}`}
              >
                <div className="icon">
                  <i className="far fa-comment"></i>
                </div>
                <p>{this.props.item.numberofcomments}</p>
              </Link>
            </div>
            <div
              onClick={() => {
                this.props.openBoxCollection(true, this.props.item.filename);
              }}
              className="share box-ac"
            >
              <div className="icon">
                <GoPlus />
              </div>
            </div>
          </div>
          <div
            onClick={() => {
              this.props.handleSetting(true, this.props.item.filename);
            }}
            className="mmenu-act"
          >
            <i className="fas fa-share"></i>
          </div>
        </div>
        <div className="tgs">
          {this.props.item.tags.map((tag) => {
            return (
              <div key={Math.random() * 5} className="tags">
                <Link to={`/discover/${tag}`}> {tag}</Link>
              </div>
            );
          })}
        </div>
        <div className="caption">
          <p dangerouslySetInnerHTML={{ __html: this.props.item.caption }}></p>
        </div>
      </div>
    );
  }
}

const mapStateProps = (state) => {
  return {
    users: state.user,
  };
};

export default connect(mapStateProps)(PostBox);

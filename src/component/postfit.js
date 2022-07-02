import React, { Component } from "react";
import BoxMedia from "../component/boxmedia";
import { Link } from "react-router-dom";
import LikeButton from "../component/likeButton";
import PostOption from "../component/postoption";
import DataPost from "../component/datePost";
import Username from "../component/username";
import { connect } from "react-redux";
import IconProfile from "../component/iconpicture";
import axios from "axios";
import socket from "../socketConfig";
import { GoPlus } from "react-icons/go";

class Postfit extends Component {
  state = {
    likeks: [],
    data: {
      _id: "6192943b31c3c98ae6fa39b0",
      userId: "6191fc57e7e60916aec12b6b",
      format: "post",
      tags: ["gym", "workout"],
      numberlike: 3,
      numberofcomments: 0,
      filename:
        "b68fc3c3-5c35-46b0-b57e-58bd1bfda618.mp4,51469d9a-32c1-48b4-820e-7f2621e6031b.mp4",
      mediakind: ["video/mp4", "video/mp4"],
      caption: "",
      profileUrl: "54c43745-1fd3-427a-9f60-d5325fb12198.jpeg",
      date: "2021-11-15T12:08:37-05:00",
      __v: { $numberInt: "0" },
    },
  };
  nFormatter = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
  };

  render() {
    return this.state.data !== null ? (
      <div className="post-box">
        <div className="info-profile">
          <div className="img-pro-inf">
            <div className="img-pr">
              <IconProfile user={this.state.data.userId} />
            </div>
            <div className="nbovtitme">
              <Username link={true} user={this.state.data.userId} />
              <DataPost date={this.state.data.date} />
            </div>
          </div>
          <PostOption
            user={this.props.user}
            item={this.state.data}
            handleSetting={this.props.handleSetting}
            friend={this.state.data.userId}
          />
        </div>
        <div className="render-the-posttt">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </div>
        <div className="action">
          <div className="wrp-act">
            <LikeButton
              posterId={this.state.data.userId}
              userid={this.props.user.userid}
              filename={this.state.data.filename}
              numberlike={this.state.data.numberlike}
            />

            <div className="comment box-ac">
              <Link
                className="linjgjc"
                to={`/comment/${this.state.data.filename}`}
              >
                <div className="icon">
                  <i className="far fa-comment"></i>
                </div>
                <p>{this.nFormatter(this.state.data.numberofcomments)}</p>
              </Link>
            </div>
            <div
              onClick={() => {
                this.props.openBoxCollection(true, this.state.data.filename);
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
              this.props.handleSetting(true, this.state.data.filename);
            }}
            className="mmenu-act"
          >
            <i className="fas fa-share"></i>
          </div>
        </div>
        <div className="tgs">
          {this.state.data.tags.map((tag) => {
            return (
              <div key={Math.random() * 5} className="tags">
                <Link to={`/discover/${tag}`}> {tag}</Link>
              </div>
            );
          })}
        </div>
        <div className="caption">
          <p dangerouslySetInnerHTML={{ __html: this.state.data.caption }}></p>
        </div>
      </div>
    ) : (
      ""
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (data) => {
      dispatch({ type: "UPDATE_POSTDATA", data: data });
    },
  };
};
const mapstateToProps = (state) => {
  return {
    postList: state.postData,
  };
};
export default connect(mapstateToProps, mapDispatchToProps)(Postfit);

import React, { Component } from "react";
import Nav from "../component/nav";
import axios from "axios";
import Username from "../component/username";
import IconProfile from "../component/iconpicture";
import { Link } from "react-router-dom";
import BoxMedia from "../component/boxmedia";
import ApiUrl from "../url";
import { InView } from "react-intersection-observer";
import Editable from "../component/editable";
import LoadingSpin from "../component/loadingspin.js";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import { IoSendSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import Report from "../component/report";
import moment from "moment";
import socket from "../socketConfig";
import CommentBox from "../component/commentBox";
let source;
source = axios.CancelToken.source();
class Comment extends Component {
  state = {
    item: {},
    comments: [],
    comment: "",
    counter: 0,
    numberToLoad: 10,
    loadind: false,
  };

  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }
  removecomment = (data) => {
    let list = this.state.comments.filter((item) => item._id !== data.id);
    this.setState(
      {
        comments: list,
        counter: this.state.counter - 1,
      },
      () => {
        socket.emit("update-the-comment", {
          filename: this.state.item.filename,
          count: this.state.counter,
        });
      }
    );
  };

  updatenotification = (data) => {
    let option = {
      userid: this.state.item.userId,
      type: "comment",
      notifiyiId: this.props.user.userid,
      media: this.state.item.filename,
      date: moment().format(),
      extraInfo: this.state.comment,
    };
    if (this.state.item.userId !== this.props.user.userid) {
      axios
        .post(`${ApiUrl.Three}update-notification`, option, {
          cancelToken: source.token,
        })
        .then((res) => {
          socket.emit("update-the-comment", {
            filename: this.state.item.filename,
            count: this.state.counter + 1,
          });
        });
    } else {
      socket.emit("update-the-comment", {
        filename: this.state.item.filename,
        count: this.state.counter + 1,
      });
    }
  };

  goBack = (e) => {
    this.props.history.goBack();
  };
  postComment = () => {
    if (this.state.comment.length > 0) {
      let option = {
        Userdid: this.props.user.userid,
        filename: this.state.item.filename,
        content: this.state.comment,
        date: moment().format(),
      };
      axios
        .post("/api/newcomment", option, { cancelToken: source.token })
        .then((res) => {
          this.updatenotification();
        });

      this.setState({
        comment: "",
      });

      document.querySelector(".hold-edit-bio").innerHTML = "";
    }
  };

  setComment = (event) => {
    this.setState({
      comment: event.target.innerText,
    });
  };

  getComment = () => {
    axios
      .get(`/api/commentt/${this.props.match.params.id}`, {
        withCredentials: true,
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data.filename) {
          this.setState({
            item: res.data,
            counter: res.data.numberofcomments,
          });
          this.loadComment(this.state.numberToLoad);
        }
      });
  };

  checkLoad = (data) => {
    if (data == true) {
      if (this.state.loadind == false) {
        this.setState(
          {
            numberToLoad: this.state.numberToLoad + 10,
          },
          () => {
            this.loadComment(this.state.numberToLoad);
          }
        );
      }
    }
  };
  loadComment = (number) => {
    this.setState({
      loadind: true,
    });
    axios
      .get(`/api/commentonthis/${this.props.match.params.id}/${number}`, {
        withCredentials: true,
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({
            loadind: false,
            comments: res.data,
          });
        } else {
          this.setState({
            loadind: false,
          });
        }
      });
  };

  updatePost = (data) => {
    if (this.props.postList.length > 0) {
      let Updated = this.props.postList.find((item) => item.filename == data);
      if (Updated) {
        Updated.numberofcomments = this.state.counter;
        let list = this.props.postList.filter((item) => item.filename !== data);
        let sortted = [...list, Updated];
        this.props.addPost(sortted);
      } else {
      }
    }
  };
  componentDidMount = () => {
    socket.on("update-this-comment", (data) => {
      if (data.filename == this.state.item.filename) {
        this.setState(
          {
            counter: data.count,
          },
          () => {
            this.updatePost(data.filename);
            this.loadComment(this.state.numberToLoad);
          }
        );
      }
    });

    this.getComment();
  };

  componentWillUnmount = () => {
    if (source) {
      source.cancel("Landing Component got unmounted");
    }
    socket.off("update-this-comment");
  };
  render() {
    return (
      <div className="conatiner">
        <Nav user={this.props.user} />
        <div id="app">
          <div id="body-tabs-comm">
            <div className="wrapper-comment">
              <div className="back-topreviews-page">
                <div onClick={this.goBack} className="close-that">
                  <BiArrowBack />
                </div>
                <div className="title-comment-page">Comment</div>
              </div>

              <div className="hjjjnd">
                <div className="hold-that-image-sjje">
                  {this.state.item.userId ? (
                    <BoxMedia
                      file={this.state.item.filename}
                      kind={this.state.item.mediakind}
                    />
                  ) : (
                    ""
                  )}
                </div>

                <div className="box-wraper-comment">
                  <div className="post-comment-render">
                    <div
                      className="hold-comment-relater"
                      ref={(el) => {
                        this.messagesEnd = el;
                      }}
                    >
                      <div className="nejrrrjr">
                        <div className="detail-abou-comment">
                          <div className="wraper-info-oc-post">
                            <div className="profile-usr-comment">
                              {this.state.item.filename ? (
                                <IconProfile user={this.state.item.userId} />
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="info-commet-detail">
                              <div className="name-pro-dut">
                                {this.state.item.filename ? (
                                  <Username user={this.state.item.userId} />
                                ) : (
                                  ""
                                )}
                              </div>

                              <div className="jfkjt">
                                <p className="name-pro-dut">
                                  {this.state.counter}
                                </p>
                                <p>Comment</p>
                              </div>
                            </div>
                          </div>
                          <div className="tags-input-comment rririr">
                            {this.state.item.tags?.map((tag) => {
                              return (
                                <div key={Math.random() * 5} className="tags">
                                  <Link to={`/discover/${tag}`}> {tag}</Link>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div className="caption-comment-post">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: this.state.item.caption,
                            }}
                          ></p>
                        </div>
                      </div>

                      {this.state.comments?.map((elment, index) => {
                        if (this.state.comments.length == index + 1) {
                          return (
                            <motion.div
                              className="fhknrbhfiknrbhj"
                              layout
                              key={elment._id}
                            >
                              <InView
                                onChange={(inView, entry) =>
                                  this.checkLoad(inView)
                                }
                              >
                                <CommentBox
                                  removecomment={this.removecomment}
                                  item={elment}
                                />
                              </InView>
                            </motion.div>
                          );
                        } else {
                          return (
                            <motion.div
                              className="fhknrbhfiknrbhj"
                              layout
                              key={elment._id}
                            >
                              <CommentBox
                                removecomment={this.removecomment}
                                item={elment}
                              />
                            </motion.div>
                          );
                        }
                      })}
                      {this.state.loadind == true ? (
                        <div className="bixnknfkfjkjrjr">
                          <LoadingSpin />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="type-message-box">
                      <div className="watpr-contnr-mem">
                        <div className="wrappe-mmeshe">
                          <Editable
                            message="Add a comment.."
                            handleBio={this.setComment}
                            html={this.state.comment}
                          />
                          {/*<div onKeyUp={this.setComment} contentEditable="true" data-placeholder="Type a message..." className="hold-message rjj">{this.state.comment}</div>*/}
                          <div onClick={this.postComment} className="send-hold">
                            <button>
                              <IoSendSharp />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Report />
      </div>
    );
  }
}
const mapstateToProps = (state) => {
  return {
    likes: state.likes,
    users: state.user,
    postList: state.postData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addLikes: (data) => {
      dispatch({ type: "ADD_LIKES", data: data });
    },
    addPost: (data) => {
      dispatch({ type: "UPDATE_POSTDATA", data: data });
    },
  };
};
export default connect(
  mapstateToProps,
  mapDispatchToProps
)(withRouter(Comment));

import React, { Component } from "react";
import axios from "axios";
import OptionComment from "../component/optioncommentp";
import { withRouter } from "react-router-dom";
import Username from "../component/username";
import IconProfile from "../component/iconpicture";
import ApiUrl from "../url";
import moment from "moment";
import DataPost from "../component/datePost";
import Editable from "../component/editable";
import { IoSendSharp } from "react-icons/io5";
import { connect } from "react-redux";
class CommentMedia extends Component {
  state = {
    id: "",
    open: true,
    title: "",
    description: "",
    file: null,
    button: false,
    comment: "",
    commentPost: [],
    reply: "",
  };

  postReply = (e, id) => {
    let option = {
      UserId: this.props.user.userid,
      id: id,
      content: this.state.reply,
      numberoflike: 0,
    };

    axios.post(`/api/add-reply`, option).then((res) => {
      let index = this.state.commentPost.findIndex(
        (element) => element._id === id
      );
      let list = this.state.commentPost[index].reply.push(res.data);
    });
  };
  saveReply = (e) => {
    this.setState({
      reply: e.target.innerText,
    });
  };
  reply = (e) => {
    let box = e.currentTarget;
    box.parentElement.parentElement.children[4].classList.add("active");
  };

  loadCommnet = () => {
    axios
      .get(`/api/load-commnetmedia/${this.props.match.params.id}`)
      .then((res) => {
        if (res.data !== "no") {
          this.setState({
            commentPost: res.data,
          });
        }
      });
  };

  handlemessage = (e) => {
    this.setState({
      comment: e.target.innerText,
    });
  };

  postCommnet = () => {
    if (this.state.comment.length > 0) {
      let option = {
        UserId: this.props.user.userid,
        mediaId: this.props.media.file,
        content: this.state.comment,
        numberoflike: 0,
        reply: [],
        date: moment().format(),
      };

      this.setState({
        comment: "",
      });
      document.querySelector(".hold-edit-bio").innerHTML = "";
      axios.post(`/api/add-new-commnetmedia`, option).then((res) => {
        let list = [...this.state.commentPost, res.data];
        this.setState({
          commentPost: list,
        });
      });
    }
  };

  componentDidMount = () => {
    this.loadCommnet();
  };

  render() {
    return (
      <div className="hold-thecomnntjnrn">
        <div className="vardd-bjjrmmmmf">
          <div className="whrhjioskmnrr">
            <div className="holfoof">
              <div className="iocnnf">
                <IconProfile user={this.props.user.userid} />
              </div>
            </div>

            <div className="fjrjrkejrr">
              <div className="type-message-box bbb">
                <div className="watpr-contnr-mem">
                  <div className="wrappe-mmeshe">
                    <Editable
                      message="Add a comment.."
                      handleBio={this.handlemessage}
                      html={this.state.comment}
                    />
                    <div onClick={this.postCommnet} className="send-hold">
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
        <div className="hold-all-those-commnetrns">
          {this.state.commentPost?.map((item) => {
            return (
              <div className="jkrkejrkjjr-conmnrn " key={item._id}>
                <div className="rejn-fjje">
                  <div className="holfoof">
                    <div className="iocnnf">
                      <IconProfile user={item.UserId} />
                    </div>
                  </div>
                  <div className="iu-boxjnf-comn-comnent">
                    <div className="wtrapror">
                      <Username user={item.UserId} />
                      <OptionComment item={item} />
                    </div>
                    <div className="con-tsionnf">{item.content}</div>
                    <div className="barcfpf">
                      <div className="wraprr-ic-like">
                        <DataPost date={item.date} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateProps)(withRouter(CommentMedia));

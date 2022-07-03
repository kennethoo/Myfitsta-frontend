import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Nav from "../component/nav";
import ProfilePromessage from "../component/profilepromessage";
import axios from "axios";
import ApiUrl from "../url";
import ProgramMessage from "../component/programMessage";
import ConversationList from "../component/conversation";
import { BsFillInfoCircleFill, BsPeopleFill } from "react-icons/bs";
import IconProfile from "../component/iconpicture";
import { IoSendSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import Profilemessage from "../component/profilemessage";
import PostMessage from "../component/postmessage";
import ConversationGroup from "../messaging/conversationgroup";
import MessageCon from "../component/messagecon";
import socket from "../socketConfig";
import AddParticipant from "../messaging/addparticipant";
import { connect } from "react-redux";
class Group extends Component {
  state = {
    inbox: [],
    group: null,
    id: "",
    conversation: [],
    message: "",
    open: false,
    add: false,
  };

  handleRemove = (id) => {
    let list = this.state.conversation.filter((item) => item._id !== id);
    this.setState({
      conversation: list,
    });
  };
  handleaddParti = () => {
    this.setState({
      add: !this.state.add,
    });
  };

  goBack = (e) => {
    this.props.history.goBack();
  };
  handleDetail = (data) => {
    this.setState({
      open: data,
    });
  };
  renderConversation = () => {
    axios
      .get(
        `/api/their-conversation/${
          this.state.group.conversationId
        }/${"no"}/${"no"}`
      )
      .then((res) => {
        if (res.data !== "no") {
          res.data.result.forEach((element) => {
            element.message.forEach((item) => {
              let list = [...this.state.conversation, item];
              this.setState({
                conversation: list,
              });
            });
          });
        } else {
        }
      });
  };

  getFriend = (e) => {
    this.setState({
      conversation: [],
    });

    axios
      .get(
        `/api/the-group/${this.props.match.params.id}/${this.props.user.userid}`
      )
      .then((res) => {
        if (res.data) {
          this.setState({
            group: res.data,
            conversation: [],
          });

          if (res.data.conversationId.length > 0) {
            this.renderConversation();
          }
          this.setState({
            inbox: [],
          });
        } else {
          this.props.history.push("/message");
        }
      });
  };

  componentDidMount = (e) => {
    this.getFriend();
    this.messageConnection();
    this.setState({ id: this.props.match.params.id });
  };

  addMessage = (event) => {
    this.setState({
      message: event.target.innerText,
    });
  };

  sendmessage = (event) => {
    if (this.state.message.length > 0) {
      let option = {
        UserId: this.props.user.userid,
        conversationId: this.props.match.params.id,
        message: {
          sender: this.props.user.userid,
          content: this.state.message,
          kind: "message",
        },
      };
      axios.post(`/api/new-message-group`, option).then((res) => {
        if (res.data._id) {
          let message = res.data.message[res.data.message.length - 1];
          message.conversationId = this.props.match.params.id;
          socket.emit("new-message-to-group", {
            members: this.state.group.members,
            content: message,
          });
          this.setState({
            message: "",
          });
          document.querySelector(".hold-message").innerText = "";
          document.querySelector(".hold-message").focus();
        } else {
        }
      });
    }
  };

  messageConnection = () => {
    socket.on("group-new-message", (data) => {
      if (data.conversationId == this.props.match.params.id) {
        let listt = [...this.props.inbox];
        let foundIndex = listt.findIndex(
          (x) => x.conversationId == this.props.match.params.id
        );
        if (foundIndex) {
          let message = this.props.inbox[foundIndex];
          message.data = Date.now();
          listt[foundIndex] = message;
          let sorted = listt.sort((a, b) => {
            return parseInt(b.data) - parseInt(a.data);
          });
          this.props.updateInbox(sorted);
        }

        let list = [...this.state.conversation, data];
        this.setState({
          conversation: list,
        });
      }
    });

    socket.on("new-group-name", (name) => {
      if (this.props.match.params.id == name.conversationId) {
        let newgroup = this.state.group;
        newgroup.name = name.name;
        this.setState({
          group: newgroup,
        });
      }
    });

    socket.on("group-new-icon", (data) => {
      if (this.props.match.params.id == data.conversationId) {
        let groupe = this.state.group;
        groupe.profileGroup = data.content;

        this.setState({
          group: groupe,
        });
      }
    });
  };

  componentDidUpdate(prevProps) {
    if (this.state.id !== this.props.match.params.id) {
      this.getFriend();
      this.setState({ id: this.props.match.params.id });
    }
  }

  render() {
    return (
      <div className="conatiner">
        <Nav user={this.props.user} />
        <div id="app">
          <div id="body-tabss">
            <div className="mesage-box-sessiinon">
              <ConversationList data={true} user={this.props.user} />
              <div className="conversation-seesion-box">
                <div className="bandadat-toshownp-profile">
                  <div onClick={this.goBack} className="back-estcaepe">
                    <BiArrowBack />
                  </div>

                  <div
                    className={`showhis-pp ${
                      this.state.group !== null
                        ? this.state.group.profileGroup.length > 0
                          ? ""
                          : "active"
                        : ""
                    }`}
                  >
                    {this.state.group !== null ? (
                      this.state.group.profileGroup.length > 0 ? (
                        <img
                          src={`${ApiUrl.content}${this.state.group.profileGroup}`}
                          loading="lazy"
                        />
                      ) : (
                        <BsPeopleFill />
                      )
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="show-his-her-name">
                    {this.state.group !== null ? (
                      this.state.group.userid ? (
                        <div className="rkfjrkfmffn">
                          {" "}
                          {this.state.group.userid ? (
                            <p>{this.state.group.name}</p>
                          ) : (
                            ""
                          )}
                        </div>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                    <div className="fjtot">
                      <p className="numttber">
                        {this.state.group !== null
                          ? this.state.group.members
                            ? this.state.group.members.length
                            : ""
                          : ""}
                      </p>
                      <p>Members</p>
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      this.handleDetail(true);
                    }}
                    className="infoitjfj"
                  >
                    <BsFillInfoCircleFill />
                  </div>
                </div>
                <div className="box-hold-convertion">
                  {this.state.conversation?.map((item) => {
                    return (
                      <div
                        key={item._id}
                        className={`${
                          item.sender == this.props.user.userid
                            ? "box-other-me"
                            : "box-other-freind"
                        }`}
                      >
                        {item.sender == this.props.user.userid ? (
                          ""
                        ) : (
                          <div className="box-that-holf-theico">
                            <IconProfile user={item.sender} />
                          </div>
                        )}
                        {item.kind == "message" ? (
                          <MessageCon
                            handleRemove={this.handleRemove}
                            message={item}
                          />
                        ) : item.kind == "post" ? (
                          <PostMessage item={item} />
                        ) : item.kind == "profile" ? (
                          <Profilemessage item={item} />
                        ) : item.kind == "program" ? (
                          <ProgramMessage item={item} />
                        ) : item.kind == "profilepro" ? (
                          <ProfilePromessage item={item} />
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="type-message-box">
                  <div className="watpr-contnr-mem">
                    <div className="wrappe-mmeshe">
                      <div className="send-hold  fnjjrjr butieh">
                        <div className="holfhe-hol-theshh"></div>
                        <button>
                          <AiOutlinePlus />
                        </button>
                      </div>
                      <div
                        contentEditable="true"
                        onKeyUp={this.addMessage}
                        data-placeholder="Type a message..."
                        className="hold-message"
                      ></div>
                      <div className="send-hold fnjjrjr">
                        <button onClick={this.sendmessage}>
                          <IoSendSharp />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {this.state.group !== null ? (
                  this.state.open ? (
                    <ConversationGroup
                      handleaddParti={this.handleaddParti}
                      group={this.state.group}
                      handleDetail={this.handleDetail}
                      open={this.state.open}
                    />
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                {this.state.add == true ? (
                  <AddParticipant
                    group={this.state.group}
                    handleaddParti={this.handleaddParti}
                    user={this.props.user}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapstateToProps = (state) => {
  return {
    inbox: state.inbox,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateInbox: (data) => {
      dispatch({ type: "UPDATE_INBOX", data: data });
    },
  };
};
export default connect(mapstateToProps, mapDispatchToProps)(withRouter(Group));

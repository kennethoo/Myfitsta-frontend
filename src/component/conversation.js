import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import ApiUrl from "../url";
import LoadingSpin from "./loadingspin";
import { BiArrowBack } from "react-icons/bi";
import socket from "../socketConfig";
import Newmessage from "../component/newmessage";
import Groupcard from "../messaging/groupcard";
import Convercard from "../messaging/convercard";
import MessageSetting from "../messaging/messageSetting";
import { connect } from "react-redux";
import { motion } from "framer-motion";
let source;
source = axios.CancelToken.source();
class ConversationList extends Component {
  state = {
    inbox: null,
    open: false,
    group: false,
  };
  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }

  goBack = (e) => {
    this.props.history.goBack();
  };

  handleGroupOpen = () => {
    this.setState({
      group: !this.state.group,
    });
  };

  filterit = (e) => {
    let box = document.querySelectorAll(".box-hold-friend-totalkwith");
    box.forEach((item) => {
      if (
        item.children[2].children[0].children[0].children[0].innerText.includes(
          e.target.value
        )
      ) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  };

  handleopen = (data) => {
    this.setState({
      open: data,
    });
  };
  getConversation = (e) => {
    axios
      .get(`${ApiUrl.Messaging}my-conversation/${this.props.user.userid}`, {
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data !== "no") {
          this.props.updateInbox(res.data);
        } else {
          this.props.updateInbox([]);
        }
      });
  };

  componentDidMount = (e) => {
    this.getConversation();
    socket.on("new-coversation-or-message", (data) => {
      this.getConversation();
    });
  };
  componentWillUnmount = () => {
    socket.off("new-coversation-or-message");
  };

  render() {
    return (
      <div
        className={`your-conversation-box-seesion  ${
          this.props.data == false ? "" : "disp-cht-bo"
        }`}
      >
        <div className="tilte-t-the-message">
          <div className="jrnrjnjrnf">
            <div onClick={this.goBack} className="close-that">
              <BiArrowBack />
            </div>
            <p>Message</p>
          </div>

          <div className="kfket">
            <MessageSetting
              handleGroupOpen={this.handleGroupOpen}
              handleopen={this.handleopen}
            />
          </div>
        </div>
        <div className="header-con-messeh">
          <div className="search-bar-chat">
            <div className="degn-for-chat-ftjdjj">
              <i className="fas fa-search"></i>
            </div>
            <input
              onChange={this.filterit}
              className="find-conv"
              type="text"
              placeholder="Search Conversation"
            />
          </div>
        </div>

        {this.props.inbox !== null ? (
          <div className="people-toak-with-box">
            {this.props.inbox !== null
              ? this.props.inbox !== "no"
                ? this.props.inbox?.map((item) => {
                    return (
                      <motion.div
                        layout
                        className="wrpaittjjtjsiirir"
                        key={item._id}
                      >
                        {item.kind == "inbox" ? (
                          <Convercard
                            item={item}
                            user={this.props.user}
                            key={item._id}
                          />
                        ) : (
                          <Groupcard
                            item={item}
                            user={this.props.user}
                            key={item._id}
                          />
                        )}
                      </motion.div>
                    );
                  })
                : "no"
              : ""}
          </div>
        ) : (
          <div className="bixnknfkfjkjrjr">
            <LoadingSpin />
          </div>
        )}
        {this.state.open == true ? (
          <Newmessage
            user={this.props.user}
            handleopen={this.handleopen}
            open={this.state.open}
          />
        ) : (
          ""
        )}

        {/* <CreatGroupChat user={this.props.user} handleGroupOpen={this.handleGroupOpen} group={this.state.group} />*/}
      </div>
    );
  }
}
const mapstateToProps = (state) => {
  return {
    users: state.user,
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
export default connect(
  mapstateToProps,
  mapDispatchToProps
)(withRouter(ConversationList));

import React, { Component } from "react";
import axios from "axios";
import socket from "../socketConfig";
import ApiUrl from "../url";
class LastMessageGroup extends Component {
  state = {
    lastMessage: null,
  };

  getLastConversation = () => {
    if (this.props.item.conversationId.length > 0) {
      axios
        .get(`/api/last-message/${this.props.item.conversationId}`)
        .then((res) => {
          if (res.data.content) {
            this.setState({
              lastMessage: res.data,
            });
          } else {
            this.setState({
              lastMessage: "",
            });
          }
        });
    }
  };

  messageConnection = () => {
    socket.on("group-new-message", (data) => {
      if (data.conversationId == this.props.item.conversationId) {
        this.setState({
          lastMessage: data,
        });
      }
    });
  };

  componentDidMount = () => {
    this.messageConnection();
    this.getLastConversation();
  };
  render() {
    return (
      <div className="hojj-jjjr">
        {this.state.lastMessage !== null ? (
          this.state.lastMessage.kind == "message" ? (
            this.state.lastMessage.content
          ) : this.state.lastMessage.kind == "post" ? (
            <p className="postg">Post</p>
          ) : this.state.lastMessage.kind == "program" ? (
            <p className="postg">Program</p>
          ) : this.state.lastMessage.kind == "profile" ? (
            <p className="postg">Profile</p>
          ) : this.state.lastMessage.kind == "profilepro" ? (
            <p className="postg">Profile</p>
          ) : (
            "No message"
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default LastMessageGroup;

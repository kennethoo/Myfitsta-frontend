import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import LastMessageGroup from "../messaging/lastmessageGroup";
import socket from "../socketConfig";
import { BsPeopleFill } from "react-icons/bs";
import ApiUrl from "../url";

class Groupcard extends Component {
  state = {
    nope: false,
    name: "",
    profileGroup: "",
  };

  componentWillUnmount = () => {
    socket.off("new-group-name");
    socket.off("group-new-icon");
  };

  componentDidMount = () => {
    this.setState({
      name: this.props.item.name,
      profileGroup: this.props.item.profileGroup,
    });
    socket.on("new-group-name", (data) => {
      if (this.props.item.conversationId == data.conversationId) {
        this.setState({
          name: data.name,
        });
      }
    });

    socket.on("group-new-icon", (data) => {
      if (this.props.item.conversationId == data.conversationId) {
        this.setState({
          profileGroup: data.content,
        });
      }
    });
  };
  render() {
    return this.state.nope == true ? (
      <div
        className={`box-hold-friend-totalkwith ${
          this.props.item.conversationId == this.props.match.params.id
            ? "active"
            : ""
        }`}
        key={this.props.data}
      >
        <Link
          to={`/message/room/${this.props.item.conversationId}`}
          className="redirec-toconver"
        ></Link>
        <div
          className={`profie-img ${
            this.props.item.profileGroup.length > 0 ? "" : "active"
          }`}
        >
          {this.state.profileGroup.length > 0 ? (
            <img
              src={`${ApiUrl.content}${this.state.profileGroup} `}
              loading="lazy"
            />
          ) : (
            <BsPeopleFill />
          )}
        </div>
        <div className="info-about-conversation">
          <div className="name-of-fiend">
            <p className="namr">{this.state.name}</p>
            <p className="daytn"></p>
          </div>
          <div className="last-conversation">
            <LastMessageGroup item={this.props.item} />
          </div>
        </div>
      </div>
    ) : (
      ""
    );
  }
}

export default withRouter(Groupcard);

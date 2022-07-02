import React, { Component } from "react";
import Nav from "../component/nav";
import axios from "axios";
import { GoPlus } from "react-icons/go";
import ConversationList from "../component/conversation";
import "../style/message.css";
import Newmessage from "../component/newmessage";
let source = axios.CancelToken.source();
class Message extends Component {
  state = {
    inbox: [],
    open: false,
  };
  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }

  handleopen = (data) => {
    this.setState({
      open: data,
    });
  };

  componentDidMount = (e) => {};

  componentWillUnmount() {}

  render() {
    return (
      <div className="conatiner">
        <Nav user={this.props.user} />
        <div id="app">
          <div id="body-tabss">
            <div className="mesage-box-sessiinon">
              <ConversationList data={false} user={this.props.user} />
              <div className="conversation-seesion-boxx">
                <div className="selectr-mess">Select a conversation</div>
                <div className="selectr-messguhu">
                  Select one of your existing messages or create a new one
                </div>
                <div className="selecttjitr-mess">
                  <button
                    onClick={() => {
                      this.handleopen(true);
                    }}
                  >
                    <GoPlus /> <p>NEW CONVERSATION</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.open == true ? (
          <Newmessage handleopen={this.handleopen} open={this.state.open} />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Message;

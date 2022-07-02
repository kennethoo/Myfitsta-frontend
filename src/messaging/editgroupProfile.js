import React, { Component } from "react";
import axios from "axios";
import { BsPeopleFill } from "react-icons/bs";
import socket from "../socketConfig";
import ApiUrl from "../url";
import { MdModeEdit } from "react-icons/md";

class EditGroupProfile extends Component {
  state = {
    group: null,
  };

  componentDidMount = () => {
    this.realtime();
    this.setState({
      group: this.props.group,
    });
  };

  realtime = () => {
    socket.on("group-new-icon", (data) => {
      let groupe = this.state.group;
      groupe.profileGroup = data.content;

      this.setState({
        group: groupe,
      });
    });
  };
  handleChangeIncon = (event) => {
    let file = event.target.files;
    if (file[0].type.includes("image")) {
      let formData = new FormData();
      formData.append("file", event.target.files[0]);
      formData.append("conversationId", this.state.group.conversationId);
      axios
        .post(`${ApiUrl.Messaging}change-group-icon`, formData)
        .then((result) => {
          socket.emit("group-new-icon", {
            members: this.state.group.members,
            content: result.data,
            conversationId: this.state.group.conversationId,
          });
        });
    }
  };

  render() {
    return (
      <div className="hold-the-iconfjf">
        <div className="icoofiff">
          {this.state.group !== null ? (
            this.state.group.profileGroup.length > 0 ? (
              <img src={`${ApiUrl.content}${this.state.group.profileGroup}`} />
            ) : (
              <div className="fnensfr">
                <BsPeopleFill />
              </div>
            )
          ) : (
            ""
          )}
        </div>
        <div className="editnsjjfj">
          <div className="edit0buttoor center ">
            <button>
              <label htmlFor="file-profilee">
                <MdModeEdit />
              </label>
            </button>
            <input
              onChange={this.handleChangeIncon}
              id="file-profilee"
              type="file"
              accept="image/x-png,image/gif,image/jpeg"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default EditGroupProfile;

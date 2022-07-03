import React, { Component } from "react";
import axios from "axios";

import { GoCheck } from "react-icons/go";
import socket from "../socketConfig";
import ApiUrl from "../url";
import { MdModeEdit } from "react-icons/md";
class EditName extends Component {
  state = {
    editname: false,
    groupname: "",
  };

  saveChange = (event) => {
    this.setState({
      groupname: event.target.value,
    });
  };
  savename = () => {
    this.editname();
    if (
      this.props.group.name !== this.state.groupname &&
      this.state.groupname.length > 3
    ) {
      let option = {
        conversationId: this.props.group.conversationId,
        name: this.state.groupname,
      };
      axios
        .post(`/api/change-group-name`, option)
        .then((result) => {
          socket.emit("name-group-change", {
            name: this.state.groupname,
            members: this.props.group.members,
            conversationId: this.props.group.conversationId,
          });
        });
    }
  };

  editname = () => {
    this.setState({
      editname: !this.state.editname,
    });
  };
  componentDidMount = () => {
    this.setState({
      groupname: this.props.name,
    });
  };
  render() {
    return (
      <div
        className={`edit-box-profile ${
          this.state.editname == true ? "active" : ""
        }`}
      >
        <div className="wrapefjej">
          <label htmlFor="Website">Group Name</label>
          {this.state.editname == true ? (
            <div onClick={this.savename} className="dibnifif">
              <GoCheck />
            </div>
          ) : (
            <div onClick={this.editname} className="dibnifif">
              <MdModeEdit />
            </div>
          )}
        </div>

        <div className="wrwapwerisiiri">
          {this.state.editname == true ? (
            <input
              onChange={this.saveChange}
              className="website-profile"
              type="text"
              name="website"
              value={this.state.groupname}
            />
          ) : (
            <div className="name-jrjnrn-tkkt">{this.state.groupname}</div>
          )}
        </div>
      </div>
    );
  }
}

export default EditName;

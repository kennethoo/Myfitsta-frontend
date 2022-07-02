import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import ApiUrl from "../url";

import { connect } from "react-redux";
class ChangePassword extends Component {
  state = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    loading: false,
    active: true,
    succes: false,
  };
  goBack = () => {
    this.props.history.goBack();
  };

  CheckPassword = (inputtxt) => {
    var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    if (inputtxt.match(paswd)) {
      return true;
    } else {
      return false;
    }
  };
  handleCurrent = (event) => {
    this.setState({
      currentPassword: event.target.value,
    });
  };
  handlenew = (event) => {
    this.setState({
      newPassword: event.target.value,
    });
  };
  handleConfirm = (event) => {
    this.setState({
      confirmPassword: event.target.value,
    });
  };
  handlecheck = () => {
    if (this.state.loading == false) {
      let StatePaword = this.CheckPassword(this.state.newPassword);
      if (this.state.currentPassword.length > 0) {
        if (this.state.newPassword === this.state.confirmPassword) {
          if (StatePaword) {
            let option = {
              username: this.props.users.Username,
              oldPassword: this.state.currentPassword,
              newPassword: this.state.newPassword,
            };
            axios.post("/api/change-password", option).then((res) => {
              console.log(res);
              if (res.data == "succes") {
                this.setState({
                  succes: true,
                });
              } else {
                this.setState({
                  oldPasswordm: "sorry Password incorrect",
                });
              }
            });
          } else {
            this.setState({
              newPasswordm: "Please increase you password security",
            });
          }
        } else {
          this.setState({
            confoimM: "sorry the passwords are not the same",
          });
        }
      } else {
        this.setState({
          oldPasswordm: "sorry Password incorrect",
        });
      }
    }
  };
  componentDidMount = () => {};
  render() {
    return (
      <div className="wrrapeerr-uoirjr-cham">
        <div className="title-edit">
          <div className="before-edit">
            <div onClick={this.goBack} className="close-that">
              <BiArrowBack />
            </div>
            <p>Change Password</p>
          </div>
        </div>

        <div className="wrpaer-divngjrj">
          <div className="edit-box-profile">
            <p>Current Password</p>
            <input
              onChange={this.handleCurrent}
              placeholder="Current Password"
              className="fullname-profile"
              type="text"
              name="username"
            />
          </div>

          <div className="wfjkwsnf-fjedj">
            <Link to={"/recover"}>Forget your Password?</Link>
          </div>
          <p className="messsage" id="message-password">
            {this.state.oldPasswordm}
          </p>
        </div>
        <div className="wrpaer-divngjrj">
          <div className="edit-box-profile">
            <p>New Password</p>
            <input
              onChange={this.handlenew}
              placeholder="New Password"
              className="fullname-profile"
              type="text"
              name="username"
            />
          </div>
          <p className="messsage" id="message-password">
            {this.state.newPasswordm}
          </p>
          <div className="edit-box-profile">
            <p>Confirm Password</p>
            <input
              onChange={this.handleConfirm}
              placeholder="Confirm Password"
              className="fullname-profile"
              type="text"
              name="username"
            />
          </div>
          <p className="messsage" id="message-password">
            {this.state.confoimM}
          </p>
        </div>

        <div className={`save-option`}>
          <button
            onClick={this.handlecheck}
            className={`update-profile ${
              this.state.active == true ? "active" : ""
            }`}
          >
            {this.state.succes == true ? "PASSWORD CHANGE" : "SAVE CHANGE"}
          </button>
        </div>
      </div>
    );
  }
}

const mapstateToProps = (state) => {
  return {
    users: state.user,
  };
};
export default connect(mapstateToProps)(withRouter(ChangePassword));

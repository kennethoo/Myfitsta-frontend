import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
let source;
source = axios.CancelToken.source();
class Three extends Component {
  state = {
    messagePassword: "",
    password: "",
    repassword: "",
    messageUsername: "",
    loading: false,
  };
  CheckPassword = (inputtxt) => {
    var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    if (inputtxt.match(paswd)) {
      return true;
    } else {
      return false;
    }
  };

  handeSubmit = (e) => {
    e.preventDefault();
    if (this.CheckPassword(this.state.password) == true) {
      if (this.state.password === this.state.repassword) {
      } else {
        this.setState({
          messagePassword: "Password must be the same",
        });
      }
    } else {
      this.setState({
        messageUsername: "😅 I known you can do better",
      });
    }

    if (
      this.CheckPassword(this.state.password) == true &&
      this.state.password === this.state.repassword
    ) {
      let option = {
        email: this.props.email,
        newPassword: this.state.password,
      };
      axios.post("/api/update-password", option).then((result) => {
        if (result.data.succes == true) {
          this.props.history.push("/login");
        }
      });
    } else {
    }
  };
  componentDidMount = () => {};
  handleChange = (e) => {
    if (e.target.name == "password") {
      this.setState({
        password: e.target.value,
      });
    } else {
      this.setState({
        repassword: e.target.value,
      });
    }
  };
  render() {
    return (
      <form onSubmit={this.handeSubmit} id="loginBox">
        <div className="sign">
          Change Password
          <div className="hajfffu"></div>{" "}
        </div>
        <div className="smal-descritptp">
          Alright now you can change your Password
        </div>
        <div className="edit-box-profile">
          <label htmlFor="username">New Password</label>
          <input
            onChange={this.handleChange}
            autoComplete="off"
            className="username-profile"
            type="password"
            name="password"
            placeholder=""
          />
        </div>
        <p className="messsage" id="message-Username">
          {this.state.messageUsername}
        </p>

        <div className="edit-box-profile">
          <label htmlFor="username">Retype Password</label>
          <input
            onChange={this.handleChange}
            autoComplete="off"
            className="username-profile"
            type="password"
            name="repassword"
            placeholder=""
          />
        </div>
        <p className="messsage" id="message-Username">
          {this.state.messagePassword}
        </p>
        <input id="login" type="submit" name="submit" value="CHANGE PASSWORD" />
        <div id="agreement">
          <div className="warer-sin">
            <p>Remember your login?</p>
            <Link to="/login">Click here</Link>
          </div>
        </div>
      </form>
    );
  }
}

export default withRouter(Three);

import React, { Component } from "react";
import axios from "axios";
import "../style/login.css";
import Navland from "../landing/Navland";
import LoadingSpin from "../component/loadingspin";
import logoone from "../logo/logo.png";
import Fade from "react-reveal/Fade";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
let source;
source = axios.CancelToken.source();
class Login extends Component {
  state = {
    username: "",
    password: "",
    messageUsername: "",
    messagepassword: "",
    loading: false,
  };
  source = axios.CancelToken.source();
  openNav = (data) => {
    this.setState({
      nav: data,
    });
  };

  handeSubmit = (e) => {
    e.preventDefault();
    if (this.state.username.length > 0 && this.state.loading == false) {
      this.setState({
        messageUsername: "",
      });
    } else {
      this.setState({
        messageUsername: "Username can not be empty",
      });
    }

    if (this.state.password.length > 0) {
      this.setState({
        messagepassword: "",
      });
    } else {
      this.setState({
        messagepassword: "Password can not be empty",
      });
    }

    if (this.state.username.length > 0 && this.state.password.length > 0) {
      this.setState({
        loading: true,
      });

      const userinfo = {
        username: this.state.username.toLocaleLowerCase(),
        password: this.state.password,
        region: "",
        city: "",
      };
      axios
        .post("/api/login", userinfo)
        .then((res) => {
          if (res.data == "This username do not exist") {
            this.setState({
              loading: false,
              messageUsername: "Sorry 😅 this email  does not exist",
            });
          }

          if (res.data == "Your password is incorect") {
            this.setState({
              loading: false,
              messagepassword: "Sorry 😅 your password is incorrect",
            });
          }

          if (res.data.email) {
            console.log("t")
            window.location.reload();
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
    }
  };
  handleChange = (e) => {
    if (e.target.name.includes("username")) {
      this.setState({
        username: e.target.value,
      });
    } else {
      this.setState({
        password: e.target.value,
      });
    }
  };

  render() {
    return (
      <div id="container">
        <Navland openNav={this.openNav} />
        <div className="div-hold-box">
          <form onSubmit={this.handeSubmit} id="loginBox">
            <div className="sign">
              <Fade left cascade>
                Login
              </Fade>
              <div className="hajfffu">
                <img src={logoone} />
              </div>{" "}
            </div>

            <div className="edit-box-profile">
              <label htmlFor="username">Email</label>
              <input
                onChange={this.handleChange}
                className="username-profile"
                required
                type="email"
                name="username"
                placeholder="Example@gmail.com"
              />
            </div>
            <p className="messsage" id="message-Username">
              {this.state.messageUsername}
            </p>

            <div className="edit-box-profile">
              <label htmlFor="username">Passowrd</label>
              <input
                onChange={this.handleChange}
                className="username-profile"
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <p className="messsage" id="message-password">
              {this.state.messagepassword}
            </p>

            {this.state.loading == false ? (
              <input id="login" type="submit" name="submit" value="Login" />
            ) : (
              <button
                className={`next agreen   ${
                  this.state.loading == true ? "loading" : ""
                }  `}
              >
                {this.state.loading == true ? <LoadingSpin /> : ""}
              </button>
            )}
            <div id="agreement">
              <div className="warer-sin">
                <p>Forget your password?</p>
                <Link to="/recover">Click here</Link>
              </div>
            </div>
          </form>
          <div className="exter-messge">
            <div className="warer-sin">
              <p>Dont' have a account ?</p>
              <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

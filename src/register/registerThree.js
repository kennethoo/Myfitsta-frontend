import React, { Component } from "react";
import axios from "axios";
import logoone from "../logo/logo.png";
import Fade from "react-reveal/Fade";
import LoadingSpin from "../component/loadingspin";
class RegisterThree extends Component {
  state = {
    email: "",
    messagefullname: "",
    messageusername: "",
    messagepassword: "",
    messageeemail: "",
    loading: false,
  };

  componentDidMount = () => {
    this.setState({});
  };
  passwordCheck = (password) => {
    let errors = "";
    if (password.length > 6) {
    } else {
      errors = "Your password must be at least 7 characters";
    }
    if (password.search(/[a-z]/i) < 0) {
      errors = "Your password must contain at least one letter.";
    } else {
    }
    if (password.search(/[0-9]/) < 0) {
      errors = "Your password must contain at least one digit.";
    } else {
    }
    if (password.search(/[^A-Za-z0-9]/) < 0) {
      errors = "Your password must contain at least one special character .";
    } else {
    }
    if (
      password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,100}$/)
    ) {
      errors = "";
    }
    return errors;
  };

  CheckPassword = (inputtxt) => {
    var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,100}$/;
    if (inputtxt.match(paswd)) {
      return true;
    } else {
      return false;
    }
  };
  handleRegister = (e) => {
    e.preventDefault();
    if (this.props.data.fullName.length > 0) {
      this.setState({
        messagefullname: "",
      });
    } else {
      this.setState({
        messagefullname: "Full name must not be empty",
      });
    }
    if (this.props.data.username.length > 2) {
      this.setState({
        messageusername: "",
      });
    } else {
      this.setState({
        messageusername: "Username is too short",
      });
    }

    if (this.props.data.email.length > 0) {
      this.setState({
        messageeemail: "",
      });
    } else {
      this.setState({
        messageeemail: "This email is not  valid",
      });
    }
    let Statepassword = this.CheckPassword(this.props.data.password);
    if (Statepassword === false) {
      this.setState({
        messagepassword: this.passwordCheck(this.props.data.password),
      });
    } else {
      this.setState({
        messagepassword: "",
      });
    }

    if (
      this.props.data.email.length > 0 &&
      this.props.data.fullName.length > 0 &&
      this.props.data.username.length > 2 &&
      Statepassword == true
    ) {
      const userinfo = {
        email: this.props.data.email.trim(),
        password: this.props.data.password,
        username: this.props.data.username.trim().toLowerCase(),
        fullName: this.props.data.fullName,
      };

      this.setState({
        loading: true,
      });

      axios.post("/api/register", userinfo).then((res) => {
        if (res.data == "Username already exist") {
          this.setState({
            messageusername: "😅 Sorry This username is already taken",
          });
        } else {
          this.setState({
            messageusername: "",
          });
        }
        if (res.data == "Email already exist") {
          this.setState({
            messageeemail: "😅 Sorry This email is already taken",
          });
        } else {
          this.setState({
            messageeemail: "",
          });
        }

        if (res.data.User) {
          window.location.reload();
        } else {
          this.setState({
            loading: false,
          });
        }
      });
    }
  };
  render() {
    return (
      <form id="registerbox" onSubmit={this.handleRegister}>
        <div className="dicccn">
          <div className="bulrr"></div>
        </div>
        <div className="sign">
          <Fade left cascade>
            Almost done
          </Fade>
          <div className="hajfffu">
            <img src={logoone} />
          </div>{" "}
        </div>
        <div className="edit-box-profile">
          <label htmlFor="username">Username</label>
          <input
            onChange={this.props.handleChange}
            className="username-profile"
            type="text"
            name="username"
            placeholder="Myfitsta"
            autoComplete="off"
          />
        </div>
        <p className="messsage" id="message-username">
          {this.state.messageusername}
        </p>

        <div className="edit-box-profile">
          <label htmlFor="username">Email</label>
          <input
            required
            className="username-profile"
            type="email"
            value={this.props.data.email}
            name="email"
            placeholder="Email"
            autoComplete="off"
          />
        </div>
        <p className="messsage" id="messagee-email">
          {this.state.messageeemail}
        </p>
        <div className="edit-box-profile">
          <label htmlFor="username">Password</label>
          <input
            onChange={this.props.handleChange}
            className="username-profile"
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="off"
          />
        </div>
        <p className="messsage" id="message-passowrd">
          {this.state.messagepassword}
        </p>
        {this.state.loading == false ? (
          <input id="register" type="submit" value="Join" />
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
          <div id="info-agree">
            <a href="#">
              By signing up, you agree to our Terms , Data Policy and Cookies
              Policy .
            </a>
          </div>
        </div>
      </form>
    );
  }
}

export default RegisterThree;

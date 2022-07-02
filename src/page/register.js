import React, { Component } from "react";
import "../style/login.css";
import RegisterOne from "../register/registerOne";
import RegisterTwo from "../register/registerTwo";
import RegisterThree from "../register/registerThree";
import Navland from "../landing/Navland";
import axios from "axios";
let source;
source = axios.CancelToken.source();
class Register extends Component {
  state = {
    fullName: "",
    username: "",
    password: "",
    email: "",
    messagefullname: "",
    messageusername: "",
    messagepassword: "",
    messageeemail: "",
    age: "",
    dateofBirth: "",
    step: 0,
    locationDetail: null,
  };
  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }
  CheckPassword = (inputtxt) => {
    var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    if (inputtxt.match(paswd)) {
      return true;
    } else {
      return false;
    }
  };

  handleNext = (data) => {
    this.setState({
      step: data,
    });
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
  openNav = (data) => {
    this.setState({
      nav: data,
    });
  };

  handleRegister = (e) => {
    e.preventDefault();
    if (this.state.fullName.length > 0) {
      this.setState({
        messagefullname: "",
      });
    } else {
      this.setState({
        messagefullname: "Full name must not be empty",
      });
    }
    if (this.state.username.length > 2) {
      this.setState({
        messageusername: "",
      });
    } else {
      this.setState({
        messageusername: "Username is too short",
      });
    }

    if (this.state.email.length > 0) {
      this.setState({
        messageeemail: "",
      });
    } else {
      this.setState({
        messageeemail: "This email is not  valid",
      });
    }
    let Statepassword = this.CheckPassword(this.state.password);
    if (Statepassword == false) {
      this.setState({
        messagepassword: this.passwordCheck(this.state.password),
      });
    } else {
      this.setState({
        messagepassword: "",
      });
    }

    if (
      this.state.email.length > 0 &&
      this.state.fullName.length > 0 &&
      this.state.username.length > 2 &&
      Statepassword == true
    ) {
      const userinfo = {
        email: this.state.email.trim(),
        password: this.state.password,
        username: this.state.username.toLowerCase().trim(),
        fullName: this.state.fullName,
      };

      axios.post("/api/register", userinfo).then((res) => {
        console.log(res.data);

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
        }
      });
    }
  };

  handleChange = (e) => {
    if (e.target.name == "password") {
      this.setState({
        password: e.target.value,
      });
    }
    if (e.target.name == "fullName") {
      this.setState({
        fullName: e.target.value,
      });
    }
    if (e.target.name == "email") {
      this.setState({
        email: e.target.value.trim(),
      });
    }
    if (e.target.name == "username") {
      this.setState({
        username: e.target.value.trim(),
      });
    }
  };

  componentDidMount = () => {};
  render() {
    return (
      <div id="container">
        <Navland openNav={this.openNav} />
        <div className="div-hold-box">
          <div className="wrapjrijrr">
            {this.state.step == 0 ? (
              <RegisterOne
                fullName={this.state.fullName}
                email={this.state.email}
                handleNext={this.handleNext}
                handleChange={this.handleChange}
              />
            ) : this.state.step == 1 ? (
              <RegisterTwo
                email={this.state.email}
                handleNext={this.handleNext}
              />
            ) : (
              <RegisterThree
                data={this.state}
                handleNext={this.handleNext}
                handleRegister={this.handleRegister}
                handleRegister={this.props.handleRegister}
                handleChange={this.handleChange}
              />
            )}
          </div>
          <div className="exter-messge">
            <div className="warer-sin">
              <p>Already have a account ?</p>
              <a href="/login">Sign In</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;

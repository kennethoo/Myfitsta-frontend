import React, { Component } from "react";
import axios from "axios";
import logoone from "../logo/logo.png";
import LoadingSpin from "../component/loadingspin";
import ApiUrl from "../url";
import Fade from "react-reveal/Fade";
class RegisterTwo extends Component {
  state = {
    code: "",
    message: "",
    loading: false,
  };
  handleChange = (e) => {
    if (e.target.value.trim().length > 0) {
      this.setState({
        code: e.target.value,
      });
    }
  };
  handleRegister = (e) => {
    e.preventDefault();
    if (this.state.code.length == 6) {
      this.setState({
        loading: true,
      });
      let option = {
        email: this.props.email,
        code: parseInt(this.state.code),
      };
      axios
        .post(`/api/verifie-your-code`, option)
        .then((result) => {
          if (result.data.succes == true) {
            this.props.handleNext(2);
          } else {
            this.setState({
              message: "This code does not match this email",
              loading: false,
            });
          }
        });
    }
  };
  render() {
    return (
      <form id="registerbox" onSubmit={this.handleRegister}>
        <div className="sign">
          <Fade left cascade>
            Verification Code
          </Fade>
          <div className="hajfffu">
            <img src={logoone} />
          </div>{" "}
        </div>
        <div className="smal-descritptpr">
          A code verification will be sent in your email , please enter the code
          to verifies your email{" "}
        </div>
        <div className="edit-box-profile">
          <label htmlFor="username">Code</label>
          <input
            onChange={this.handleChange}
            required
            className="username-profile"
            type="number"
            name="code"
            placeholder="000000"
          />
        </div>
        <p className="messsage" id="message-Username">
          {this.state.message}
        </p>
        {this.state.loading == false ? (
          <input id="login" type="submit" name="submit" value="CHECK CODE" />
        ) : (
          <button
            className={`next agreen   ${
              this.state.loading == true ? "loading" : ""
            }  `}
          >
            {this.state.loading == true ? <LoadingSpin /> : ""}
          </button>
        )}
      </form>
    );
  }
}

export default RegisterTwo;

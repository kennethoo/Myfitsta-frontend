import React, { Component } from "react";
import axios from "axios";
import ApiUrl from "../url";
import { Link } from "react-router-dom";
let source;
source = axios.CancelToken.source();
class Two extends Component {
  state = {
    code: "",
    loading: false,
    messageUsername: "",
  };
  handleChange = (e) => {
    this.setState({
      code: e.target.value,
    });
  };
  handeSubmit = (e) => {
    e.preventDefault();
    if (this.state.code.length == 6) {
      let option = {
        email: this.props.email,
        code: parseInt(this.state.code),
      };
      this.setState({
        loading: true,
      });
      axios
        .post(`${ApiUrl.Recover}verifie-your-code`, option)
        .then((result) => {
          console.log(result);
          if (result.data.succes == true) {
            this.props.move(3);
          } else {
          }
        });
    } else {
      this.setState({
        messageUsername: "code need to be 6 digit",
      });
    }
  };

  componentDidMount = () => {};

  render() {
    return (
      <form onSubmit={this.handeSubmit} id="loginBox">
        <div className="sign">
          Enter the code
          <div className="hajfffu"></div>{" "}
        </div>

        <div className="smal-descritptp">
          A code verification will be sent in your email , please enter the code
          to verifies your email{" "}
        </div>

        <div className="edit-box-profile">
          <label htmlFor="username">Code</label>
          <input
            onChange={this.handleChange}
            className="username-profile"
            type="number"
            name="code"
            placeholder="000000"
          />
        </div>
        <p className="messsage" id="message-Username">
          {this.state.messageUsername}
        </p>

        <input id="login" type="submit" name="submit" value="CHECK CODE" />
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

export default Two;

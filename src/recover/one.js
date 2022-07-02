import React, { Component } from "react";
import axios from "axios";
import ApiUrl from "../url";
import LoadingSpin from "../component/loadingspin";
import { Link } from "react-router-dom";
let source;
source = axios.CancelToken.source();
class One extends Component {
  state = {
    email: "",
    messageUsername: "",
    loading: false,
  };

  componentDidMount = () => {};
  handleChange = (e) => {
    this.setState({
      email: e.target.value,
    });

    this.props.updateEmail(e.target.value);
  };

  handeSubmit = (e) => {
    e.preventDefault();
    let option = {
      email: this.state.email,
    };
    this.setState({
      loading: true,
    });

    axios.post(`${ApiUrl.Recover}recover-my-account`, option).then((result) => {
      if (result.data.succes == true) {
        this.props.move(2);
      }
    });
  };
  render() {
    return (
      <form onSubmit={this.handeSubmit} id="loginBox">
        <div className="sign">
          Recover your account
          <div className="hajfffu"></div>{" "}
        </div>

        <div className="smal-descritptp">
          We can assist you with resetting your password. First, enter the email
          that is connected to your account 
        </div>

        <div className="edit-box-profile">
          <label htmlFor="username">Email</label>
          <input
            required
            onChange={this.handleChange}
            className="username-profile"
            type="email"
            name="username"
            placeholder="Example@gmail.com"
          />
        </div>
        <p className="messsage" id="message-Username">
          {this.state.messageUsername}
        </p>

        {this.state.loading == true ? (
          <div className="controil-theaction">
            <button
              className={`next agreen   ${
                this.state.loading == true ? "loading" : ""
              }  `}
            >
              {this.state.loading == true ? <LoadingSpin /> : "NEXT"}
            </button>
          </div>
        ) : (
          <input id="login" type="submit" name="submit" value="SEND CODE" />
        )}

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

export default One;

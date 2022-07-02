import React, { Component } from "react";
import axios from "axios";
import LoadingSpin from "../component/loadingspin";
import RegistractionTwo from "../setup/registrationtwo";
import BaxBar from "../component/barbox";
import { connect } from "react-redux";
import Sila from "../silaconfig";
class Registraction extends Component {
  state = {
    user: {
      userid: "",
      firstname: "",
      lastName: "",
      address: "",
      City: "",
      State: "P",
      Zip: "",
      ssn: "",
      number: "",
      birth: "",
    },
    nextStep: false,
    loading: false,
    submit: false,
    loadingButtton: false,
  };

  nextStep = () => {
    if (this.state.nextStep == false) {
      if (
        this.state.user.firstname.length > 0 &&
        this.state.user.lastName.length > 0 &&
        this.state.user.birth.length > 0 &&
        this.state.user.ssn.length > 7
      ) {
        this.setState({
          nextStep: true,
        });
      }
    } else {
      if (
        this.state.user.firstname.length > 0 &&
        this.state.user.lastName.length > 0 &&
        this.state.user.address.length > 0 &&
        this.state.user.City.length > 0 &&
        this.state.user.State.length > 0 &&
        this.state.user.ssn.length > 7
      ) {
        this.setState({
          loadingButtton: true,
        });
        this.createWallet();
      }
    }
  };

  createWallet = () => {
    axios
      .post(`/api/register-the-user-info-wallet`, this.state.user, {
        withCredentials: true,
      })
      .then((result) => {
        if (result.data.message == "created") {
          this.props.move(3);
        } else {
          console.log(result);
        }
      });
  };

  handleChange = (e) => {
    let user;
    switch (e.target.name) {
      case "firstname":
        user = this.state.user;
        user.firstname = e.target.value;
        this.setState({
          user: user,
        });
        break;
      case "lastname":
        user = this.state.user;
        user.lastName = e.target.value;
        this.setState({
          user: user,
        });
        break;
      case "address":
        user = this.state.user;
        user.address = e.target.value;
        this.setState({
          user: user,
        });
        break;
      case "City":
        user = this.state.user;
        user.City = e.target.value;
        this.setState({
          user: user,
        });
        break;

      case "State":
        user = this.state.user;
        user.State = e.target.value;
        this.setState({
          user: user,
        });
        break;
      case "Zip":
        user = this.state.user;
        user.Zip = e.target.value;
        this.setState({
          user: user,
        });
        break;
      case "ssn":
        user = this.state.user;
        user.ssn = e.target.value;
        this.setState({
          user: user,
        });
        break;
      case "number":
        user = this.state.user;
        user.number = e.target.value;
        this.setState({
          user: user,
        });
        break;
      case "birth":
        user = this.state.user;
        user.birth = e.target.value;
        this.setState({
          user: user,
        });
        break;

      default:
        this.setState({
          //fullname: e.target.value
        });
    }
  };

  componentDidMount = () => {
    let user = this.state.user;
    user.userid = this.props.user.userid;
    user.Username = this.props.user.Username;
    user.email = this.props.user.email;
    this.setState({
      user: user,
    });
  };
  render() {
    return (
      <div className="wrpaeorrr">
        <BaxBar bar={2} />
        <div className="welcom-title">Now let's register your account </div>
        {this.state.nextStep == false ? (
          <div className="jsjfoijeif">
            <div className="edit-box-profile">
              <p>Legal Fist name</p>
              <input
                onChange={this.handleChange}
                className="email-profile"
                type="text"
                name="firstname"
                placeholder={"Jhon"}
                value={this.state.user.firstname}
              />
            </div>
            <div className="edit-box-profile">
              <p>Legal Last name</p>
              <input
                onChange={this.handleChange}
                className="email-profile"
                type="text"
                name="lastname"
                placeholder={"Doe"}
                value={this.state.user.lastName}
              />
            </div>
            <div className="edit-box-profile">
              <p>Date of Birth</p>
              <input
                onChange={this.handleChange}
                className="email-profile"
                type="date"
                name="birth"
                placeholder={"mm/dd/yyyy"}
                value={this.state.user.birth}
              />
            </div>
            <div className="edit-box-profile">
              <p>Social Security Number</p>
              <input
                onChange={this.handleChange}
                className="email-profile"
                type="password"
                name="ssn"
                placeholder={"XXX - XX - XXX"}
                value={this.state.user.ssn}
              />
            </div>
          </div>
        ) : (
          <RegistractionTwo
            handleChange={this.handleChange}
            user={this.state}
          />
        )}
        {this.state.submit == false ? (
          <div className="controil-theaction">
            <button
              onClick={() => this.nextStep()}
              className={`next agreen   ${
                this.state.loadingButtton == true ? "loading" : ""
              }  `}
            >
              {this.state.loadingButtton == true ? <LoadingSpin /> : "CONTINUE"}
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapstateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapstateToProps)(Registraction);

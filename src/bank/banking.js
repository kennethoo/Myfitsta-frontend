import React, { Component } from "react";
import axios from "axios";
import { IoCloseSharp } from "react-icons/io5";
import LoadingSpin from "../component/loadingspin";
import { connect } from "react-redux";
class Banking extends Component {
  state = {
    loading: false,
    data: {
      userid: "",
      username: "",
      accountType: "",
      accountNumber: "1111222233331111",
      routingNumber: "021000021",
      accountName: "Amzat Gandonou",
    },
  };

  componentDidMount = () => {
    let data = this.state.data;
    data.userid = this.props.users.userid;
    data.username = this.props.users.Username;
    this.setState({
      data: data,
    });
  };
  savedetail = () => {
    if (
      this.state.data.accountNumber.length > 9 &&
      this.state.data.accountNumber.length > 11 &&
      this.state.data.accountName.length > 3
    ) {
      this.setState({
        loading: true,
      });
      axios
        .post(
          "/api/link-your-bank-account-1234-2wwsnn4fjnfr4-secrec",
          this.state.data
        )
        .then((result) => {
          this.setState({
            loading: false,
          });
          this.props.getData();
          this.props.hnddleclick();
        });
    }
  };
  handleChange = (e) => {
    let data;
    switch (e.target.name) {
      case "routingNumber":
        data = this.state.data;
        data.routingNumber = e.target.value;
        this.setState({
          data: data,
        });
        break;
      case "accountNumber":
        data = this.state.data;
        data.accountNumber = e.target.value;
        this.setState({
          data: data,
        });
        break;
      case "accountName":
        data = this.state.data;
        data.accountName = e.target.value;
        this.setState({
          data: data,
        });
        break;

      default:
        this.setState({
          //fullname: e.target.value
        });
    }
  };
  render() {
    return (
      <div className="wraojrikkr-obebe">
        <div className="dnjsjrjrjr">
          <div className="title-of--thise-action">
            <button
              onClick={() => {
                this.props.hnddleclick();
              }}
              className="close-that"
            >
              {" "}
              <IoCloseSharp />
            </button>
            <p>Add your banking details</p>
          </div>

          <div className="wrapunf-roup">
            <div className="edit-box-profile">
              <label htmlFor="username">Routing Number</label>
              <input
                onChange={this.handleChange}
                className="username-profile"
                type="number"
                name="routingNumber"
                placeholder={"123456789"}
                value={this.state.data.routingNumber}
              />
            </div>
            <div className="edit-box-profile">
              <label htmlFor="username">Account Number</label>
              <input
                onChange={this.handleChange}
                className="username-profile"
                type="number"
                name="accountNumber"
                placeholder={"123456789012"}
                value={this.state.data.accountNumber}
              />
            </div>
            <div className="edit-box-profile">
              <label htmlFor="username">Account Type</label>
              <input
                onChange={this.handleChange}
                className="username-profile"
                type="number"
                name="routingNumber"
                placeholder={"123456789"}
                value={this.state.data.routingNumber}
              />
            </div>
            <div className="edit-box-profile">
              <label htmlFor="username">Account Name</label>
              <input
                onChange={this.handleChange}
                className="username-profile"
                type="text"
                name="accountName"
                placeholder={"John Doe"}
                value={this.state.data.accountName}
              />
            </div>
          </div>

          <div className="button-container">
            <input
              type="submit"
              onClick={this.savedetail}
              className={`button button--small button--green ${
                this.state.loading == true ? "loading" : ""
              }`}
              value={`${this.state.loading == true ? "" : "Link bank account"}`}
              id="submit"
            />
            {this.state.loading == true ? (
              <div className="jietiooeo">
                {" "}
                <LoadingSpin />
              </div>
            ) : (
              ""
            )}
          </div>
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
export default connect(mapstateToProps)(Banking);

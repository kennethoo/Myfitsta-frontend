import React, { Component } from "react";
import axios from "axios";
import { IoCloseSharp } from "react-icons/io5";
import LoadingSpin from "../component/loadingspin";
import { connect } from "react-redux";
class Banking extends Component {
  state = {
    loading: false,
    data: {
      email: "",
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
      this.state.data.email.length > 0 
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
    let data={};
    data.email = e.target.value;
    this.setState({
      data: data,
    })
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
            <p>Add Your Paypal Email</p>
          </div>

          <div className="wrapunf-roup">
        
            <div className="edit-box-profile">
              <label htmlFor="username">PayPal Email</label>
              <input
                onChange={this.handleChange}
                className="username-profile"
                required
                type="text"
                name="email"
                placeholder={"name@gmail.com"}
                value={this.state.data.email}
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
              value={`${this.state.loading == true ? "" : "Save Email"}`}
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

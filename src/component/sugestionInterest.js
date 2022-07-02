import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import ApiUrl from "../url";
import LoadingSpin from "../component/loadingspin.js";
import LoadInterest from "../component/LoadInterest";
import SelctedInterest from "../component/seletedInterest";
class Interest extends Component {
  state = {
    selected: [],
    item: null,
  };

  handleCreate = (data) => {
    this.setState({
      item: data,
    });
  };

  handleCheck = () => {
    if (this.props.interest == null) {
    }
    axios
      .get(`${ApiUrl.Three}load-Interest/${this.props.users.userid}`)
      .then((result) => {
        if (result.data.accountId) {
          this.props.UpdateInterest(result.data);
        } else {
          this.props.UpdateInterest({});
        }
      });
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.handleCheck();
    }, 1000);
  };

  render() {
    return (
      <div
        className={`subjection-top-folow-box ${
          this.props.tabs == true ? "active" : ""
        }`}
      >
        {this.props.interest !== null ? (
          this.props.interest.accountId ? (
            <LoadInterest users={this.props.users} />
          ) : (
            <SelctedInterest
              handleCreate={this.handleCreate}
              users={this.props.users}
            />
          )
        ) : (
          <div className="bixnknfkfjkjrjr">
            <LoadingSpin />
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    UpdateInterest: (data) => {
      dispatch({ type: "ADD_TO_INTEREST", data: data });
    },
  };
};

const mapstateToProps = (state) => {
  return {
    users: state.user,
    interest: state.interest,
  };
};
export default connect(mapstateToProps, mapDispatchToProps)(Interest);

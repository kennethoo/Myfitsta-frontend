import React, { Component } from "react";
import axios from "axios";
import { HiLockClosed } from "react-icons/hi";
import { connect } from "react-redux";
import ApiUrl from "../url";
class UnpaidEarning extends Component {
  state = {
    number: 0,
  };
  getdata = () => {
    axios
      .get(`/api/find-my-earning/${this.props.user.userid}`)
      .then((result) => {
        if (result.data !== "no") {
          this.setState({
            number: result.data.unpaid,
          });
        } else {
        }
      });
  };
  componentDidMount = () => {
    this.getdata();
  };
  render() {
    return (
      <div className="box-njfn">
        <div className="gjrjg">
          <div className="iocnjfkf three">
            <HiLockClosed />
          </div>
          <p> Unpaid Earnings</p>
        </div>
        <div className="fjnejt">${this.state.number.toFixed(2)}</div>
      </div>
    );
  }
}
const mapstateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapstateToProps)(UnpaidEarning);

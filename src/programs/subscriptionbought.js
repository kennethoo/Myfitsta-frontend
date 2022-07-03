import React, { Component } from "react";
import axios from "axios";
import ApiUrl from "../url";
import ProgramBought from "../programs/programbougth";
import { connect } from "react-redux";

class SubscriptionBougth extends Component {
  state = {
    list: null,
  };

  getProgram = (e) => {
    axios
      .get(
        `/api/load-my-active-pwo/${this.props.user}/to/${this.props.users.userid}`
      )
      .then((res) => {
        console.log(res);
        if (res.data.length > 0) {
          this.setState({
            list: res.data.reverse(),
          });
        } else {
          this.setState({
            program: "no",
          });
        }
      });
  };
  componentDidMount = () => {
    this.getProgram();
  };
  render() {
    return this.state.list !== null ? (
      this.state.list !== "no" ? (
        this.state.list.length > 0 ? (
          <div className="row-0tjhat-hold-theprojhfnnf">
            {this.state.list.map((data, index) => {
              return <ProgramBought programid={data.programId} key={index} />;
            })}
          </div>
        ) : (
          <div className="wraperififoojfhr">
            <div className="wraperjf-ffkfkr">
              <p>No Programs</p>
              <p>The Author did not publish any program yet</p>
            </div>
          </div>
        )
      ) : (
        ""
      )
    ) : (
      ""
    );
  }
}

const mapstateToProps = (state) => {
  return {
    users: state.user,
  };
};
export default connect(mapstateToProps)(SubscriptionBougth);

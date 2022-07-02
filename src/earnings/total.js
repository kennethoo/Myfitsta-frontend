import React, { Component } from "react";
import { AiFillFolder } from "react-icons/ai";

class TotalEarning extends Component {
  state = {
    data: 0,
  };
  componentDidMount = () => {
    this.setState({
      data: this.props.data.reduce((n, { earn }) => n + earn, 0),
    });
  };
  render() {
    return (
      <div className="box-njfn">
        <div className="gjrjg">
          <div className="iocnjfkf one">
            <AiFillFolder />
          </div>
          <p>Total Earnings</p>
        </div>
        <div className="fjnejt">${this.state.data.toFixed(2)}</div>
      </div>
    );
  }
}

export default TotalEarning;

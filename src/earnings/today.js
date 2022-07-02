import React, { Component } from "react";
import moment from "moment";
import { BsGraphUp } from "react-icons/bs";
class TodayEarning extends Component {
  state = {
    number: 0,
  };

  filterpay = () => {
    let curentdate = moment().format("MMM Do YY");
    let earn = this.props.data.filter(
      (item) => moment(item.date).format("MMM Do YY") === curentdate
    );
    if (earn.length > 0) {
      this.setState({
        number: earn.reduce((n, { earn }) => n + earn, 0),
      });
    }
  };

  componentDidMount = () => {
    this.filterpay();
  };
  render() {
    return (
      <div className="box-njfn">
        <div className="gjrjg">
          <div className="iocnjfkf two">
            <BsGraphUp />
          </div>
          <p> Today Earnings</p>
        </div>
        <div className="fjnejt">${this.state.number.toFixed(2)}</div>
      </div>
    );
  }
}

export default TodayEarning;

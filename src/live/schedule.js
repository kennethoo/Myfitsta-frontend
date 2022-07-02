import React, { Component } from "react";
import TimeZone from "./timeZone";
import Time from "./time";
import DatePicker from "./datePicker";
class Schedule extends Component {
  state = {
    timeZone: "",
    date: "",
    time: "12:00 AM",
  };
  selctedTime = (data) => {
    this.setState({
      timeZone: data,
    });
  };
  selctedTimeDate = (data) => {
    this.setState({
      date: data,
    });
  };
  selctedTimeTime = (data) => {
    this.setState({
      time: data,
    });
  };
  nextPage = () => {
    if (
      this.state.date.length > 0 &&
      this.state.timeZone.length > 0 &&
      this.state.time.length > 0
    ) {
      this.props.nextPage(this.state);
    }
  };
  componentDidMount = () => {};
  render() {
    return (
      <div className="scheule-wraper-box">
        <div className="wraperjjsrr">
          <div className="wraperrh">Date</div>
          <DatePicker selctedTimeDate={this.selctedTimeDate} />
        </div>
        <div className="wraperjjsrr">
          <div className="wraperrh">TimeZone</div>
          <TimeZone selctedTime={this.selctedTime} />
        </div>
        <div className="wraperjjsrr">
          <div className="wraperrh">Time</div>
          <Time selctedTimeTime={this.selctedTimeTime} />
        </div>
        <div className="control-thecancel-the-live">
          <button onClick={this.nextPage} className="go-for-live">
            <i className="fas fa-video"></i>
            <p>Next</p>
          </button>
        </div>
      </div>
    );
  }
}

export default Schedule;

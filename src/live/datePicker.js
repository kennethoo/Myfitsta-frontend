import React, { Component } from "react";
import moment from "moment";
import TimeZone from "./timeZone";
import { BsCalendarCheck } from "react-icons/bs";
class DatePicker extends Component {
  state = {
    dateData: null,
    date: "",
    activate: true,
    currentDate: 0,
    month: null,
    firstDay: [],
    nextDay: 0,
    listProvous: [],
    lastday: 0,
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  };

  selected = (i) => {
    let comporse = `${i}/${this.state.dateData.getMonth()}/${this.state.dateData.getFullYear()}`;
    this.setState(
      {
        currentDate: i,
        date: comporse,
        activate: false,
      },
      () => {
        this.props.selctedTimeDate(comporse);
      }
    );
  };

  change = () => {
    this.setState({
      activate: true,
    });
  };

  loadDay = () => {
    let lastday = new Date(
      this.state.dateData.getFullYear(),
      this.state.dateData.getMonth() + 1,
      0
    ).getDate();
    let firstDay = [];
    let lastDayindex = new Date(
      this.state.dateData.getFullYear(),
      this.state.dateData.getMonth() + 1,
      0
    ).getDay();
    let nextDay = 7 - lastDayindex - 1;
    for (let i = this.state.dateData.getDay(); i > 0; i--) {
      firstDay.push(i);
    }
    this.setState({
      lastday: lastday,
      nextDay: nextDay,
      firstDay: firstDay,
    });
  };
  componentDidMount = () => {
    let date = new Date();
    date.setDate(1);
    this.setState(
      {
        dateData: date,
        month: date.getMonth(),
      },
      () => {
        this.selected(new Date().getDate());
        this.loadDay();
      }
    );
  };

  render() {
    return (
      <div className="scheule-wraper-boxxx">
        {this.state.activate == false ? (
          <div onClick={this.change} className="wraper-boxee">
            <div className="icondrr">
              <BsCalendarCheck />
            </div>
            <div className="inpit0boxs">{this.state.date}</div>
          </div>
        ) : this.state.month !== null ? (
          <div className="wrapoerijr">
            <div className="header-box">
              {this.state.months[this.state.month]},{" "}
              {this.state.dateData.getFullYear()}
            </div>
            <div className="header-box-daty">
              <div>
                <span>Sun</span>
              </div>
              <div>
                {" "}
                <span>Mon</span>
              </div>
              <div>
                {" "}
                <span>Tue</span>
              </div>
              <div>
                {" "}
                <span>Wed</span>
              </div>
              <div>
                {" "}
                <span>Thu</span>
              </div>
              <div>
                {" "}
                <span>Fri</span>
              </div>
              <div>
                {" "}
                <span>Sat</span>
              </div>
            </div>
            <div className="box-date-daty">
              {this.state.firstDay?.map((item, i) => {
                return (
                  <div className="prevjt" key={i}>
                    <span>
                      {new Date(
                        this.state.dateData.getFullYear(),
                        this.state.dateData.getMonth(),
                        0
                      ).getDate() -
                        item +
                        1}
                    </span>
                  </div>
                );
              })}

              {[...Array(this.state.lastday)].map((x, i) => {
                return i + 1 < new Date().getDate() ? (
                  <div className="prevjt" key={i}>
                    <span>{i + 1}</span>
                  </div>
                ) : i + 1 === this.state.currentDate ? (
                  <div
                    onClick={() => {
                      this.selected(i + 1);
                    }}
                    className="active"
                    key={i}
                  >
                    <span>{i + 1}</span>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      this.selected(i + 1);
                    }}
                    key={i}
                  >
                    <span>{i + 1}</span>
                  </div>
                );
              })}

              {[...Array(this.state.nextDay)].map((x, i) => (
                <div className="prevjt" key={i}>
                  <span>{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default DatePicker;

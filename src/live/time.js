import React, { Component } from "react";
import { BiTime } from "react-icons/bi";
class Time extends Component {
  state = {
    activate: false,
    list: [
      "12:00 AM",
      "12:30 AM",
      "01:00 AM",
      "01:30 AM",
      "02:00 AM",
      "02:30 AM",
      "03:00 AM",
      "03:30 AM",
      "04:00 AM",
      "04:30 AM",
      "05:00 AM",
      "05:30 AM",
      "06:00 AM",
      "06:30 AM",
      "07:00 AM",
      "07:30 AM",
      "08:00 AM",
      "08:30 AM",
      "09:00 AM",
      "09:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
      "12:00 PM",
      "12:30 PM",
      "01:00 PM",
      "01:30 PM",
      "02:00 PM",
      "02:30 PM",
      "03:00 PM",
      "03:30 PM",
      "04:00 PM",
      "04:30 PM",
      "05:00 PM",
      "05:30 PM",
      "06:00 PM",
      "06:30 PM",
      "07:00 PM",
      "07:30 PM",
      "08:00 PM",
      "08:30 PM",
      "09:00 PM",
      "09:30 PM",
      "10:00 PM",
      "10:30 PM",
      "11:00 PM",
      "11:30 PM",
    ],
    time: "12:00 AM",
  };
  selected = (data) => {
    this.setState(
      {
        activate: false,
        time: data,
      },
      () => {
        this.props.selctedTimeTime(data);
      }
    );
  };
  change = () => {
    this.setState({
      activate: true,
    });
  };

  render() {
    return (
      <div className="wraper-time">
        {this.state.activate == false ? (
          <div onClick={this.change} className="wraper-boxee">
            <div className="icondrr">
              <BiTime />
            </div>
            <div className="inpit0boxs">{this.state.time}</div>
          </div>
        ) : (
          <div className="box-hold-data">
            {this.state.list?.map((item, index) => {
              return (
                <div
                  onClick={() => {
                    this.selected(item);
                  }}
                  key={index}
                  className="contry-bojn"
                >
                  <div>{item}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default Time;
